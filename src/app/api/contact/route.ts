import { randomUUID } from 'node:crypto'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { serviceCategoriesData } from '@/data/serviceCategories'
import {
  getBrand,
  getBusinessEmails,
  getEmailConfigSummary,
  isCustomerConfirmationEnabled,
} from '@/lib/email/brand'
import {
  renderBusinessNotification,
  renderCustomerConfirmation,
} from '@/lib/email/templates'
import {
  EmailNotConfiguredError,
  resolveProviderOrder,
  sendEmail,
} from '@/lib/email/transport'

// nodemailer (the SMTP fallback) needs the Node.js runtime.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SERVICE_LABELS = new Map(
  serviceCategoriesData.map(category => [category.id, category.name])
)

/** Lenient enough for international formats, strict enough to reject junk. */
const PHONE_PATTERN = /^[+()\d][\d\s().-]{5,}$/

const submissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(254),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters'),
  company: z.string().trim().max(100).optional(),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(value => !value || PHONE_PATTERN.test(value), {
      message: 'Please enter a valid phone number',
    })
    .optional(),
  service: z.string().trim().max(80).optional(),
  title: z.string().trim().max(200).optional(),
  pageUrl: z.string().trim().max(500).optional(),
  source: z.string().trim().max(120).optional(),
})

/** Best-effort throttle; resets on cold start. A WAF rule is the real fix. */
const RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 }
const rateLimitStore = new Map<string, number[]>()

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rateLimitStore.get(ip) ?? []).filter(
    time => now - time < RATE_LIMIT.windowMs
  )

  if (hits.length >= RATE_LIMIT.max) {
    rateLimitStore.set(ip, hits)
    return true
  }

  hits.push(now)
  rateLimitStore.set(ip, hits)

  if (rateLimitStore.size > 5000) {
    for (const [key, value] of rateLimitStore) {
      if (value.every(time => now - time >= RATE_LIMIT.windowMs)) {
        rateLimitStore.delete(key)
      }
    }
  }

  return false
}

function buildReference(): string {
  const random = randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase()
  return `BITC-${random}`
}

async function getSupabaseInstance() {
  try {
    const { supabase } = await import('@/lib/supabase')
    return supabase
  } catch (error) {
    console.warn('Supabase not configured:', error)
    return null
  }
}

function jsonError(
  status: number,
  error: string,
  extra: Record<string, unknown> = {}
) {
  return NextResponse.json({ ok: false, error, ...extra }, { status })
}

/** Settles a promise without throwing, so one failure never aborts the batch. */
async function settle<T>(
  promise: Promise<T>
): Promise<{ ok: true; value: T } | { ok: false; error: unknown }> {
  try {
    return { ok: true, value: await promise }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function POST(request: NextRequest) {
  let raw: unknown

  try {
    raw = await request.json()
  } catch {
    return jsonError(400, 'We could not read that submission. Please try again.')
  }

  const payload = (raw ?? {}) as Record<string, unknown>

  // Honeypot: bots fill hidden fields, humans never see them.
  if (typeof payload.website === 'string' && payload.website.trim()) {
    return NextResponse.json({
      ok: true,
      reference: buildReference(),
      confirmationSent: false,
      message: 'Thanks - your message is on its way.',
    })
  }

  const ip = clientIp(request)
  if (isRateLimited(ip)) {
    return jsonError(
      429,
      'Too many messages from this connection. Please try again in a few minutes or email us directly.',
      { retryAfterSeconds: Math.round(RATE_LIMIT.windowMs / 1000) }
    )
  }

  const parsed = submissionSchema.safeParse(payload)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return jsonError(400, issue?.message ?? 'Invalid submission.', {
      field: issue?.path?.[0] ?? null,
    })
  }

  const data = parsed.data
  const submission = {
    reference: buildReference(),
    name: data.name,
    email: data.email,
    message: data.message,
    submittedAt: new Date(),
    ...(data.company ? { company: data.company } : {}),
    ...(data.phone ? { phone: data.phone } : {}),
    ...(data.title ? { subject: data.title } : {}),
    ...(data.service
      ? { service: SERVICE_LABELS.get(data.service) ?? data.service }
      : {}),
    ...(data.pageUrl ? { pageUrl: data.pageUrl } : {}),
    ...(data.source ? { source: data.source } : {}),
  }

  const businessEmails = getBusinessEmails()
  const brand = getBrand()
  const sendConfirmation = isCustomerConfirmationEnabled()

  const providerOrder = await resolveProviderOrder()
  if (providerOrder.length === 0) {
    console.error('[contact] No email transport configured', {
      config: getEmailConfigSummary(),
    })
    return jsonError(
      503,
      `Our email service is not configured right now. Please call ${brand.phone} or email ${brand.supportEmail}.`
    )
  }

  const business = renderBusinessNotification(submission, brand)
  const confirmation = renderCustomerConfirmation(submission, brand)

  // Persist alongside the email; a database hiccup must never fail a valid lead.
  const persist = async () => {
    const supabase = await getSupabaseInstance()
    if (!supabase) return

    try {
      const { error } = await supabase
        .from('bestitconsultants_contacts')
        .insert({
          name: submission.name,
          email: submission.email,
          message: submission.message,
          company: data.company ?? null,
          phone: data.phone ?? null,
          service: data.service ?? null,
          title: data.title ?? null,
          submitted_at: submission.submittedAt.toISOString(),
        })

      if (error) console.error('[contact] Supabase insert failed', error)
    } catch (error) {
      console.error('[contact] Supabase insert threw', error)
    }
  }

  /*
   * Each internal inbox is delivered to independently. One bouncing or
   * misconfigured address must not stop the others from receiving the lead, and
   * the auto-reply goes out in parallel with the notification.
   */
  const [confirmationOutcome, businessOutcomes, persistOutcome] =
    await Promise.all([
      sendConfirmation
        ? settle(
            sendEmail({
              to: submission.email,
              subject: confirmation.subject,
              html: confirmation.html,
              text: confirmation.text,
              replyTo: businessEmails,
            })
          )
        : Promise.resolve({ ok: true as const, value: null }),
      Promise.all(
        businessEmails.map(to =>
          settle(
            sendEmail({
              to,
              subject: business.subject,
              html: business.html,
              text: business.text,
              replyTo: submission.email,
            })
          )
        )
      ),
      settle(persist()),
    ])

  if (!persistOutcome.ok) {
    console.error('[contact] Supabase persistence failed', persistOutcome.error)
  }

  const notified = businessEmails.filter(
    (_, index) => businessOutcomes[index].ok
  )
  const failedRecipients = businessEmails.filter(
    (_, index) => !businessOutcomes[index].ok
  )

  for (const [index, outcome] of businessOutcomes.entries()) {
    if (outcome.ok) continue
    console.error('[contact] Notification delivery failed', {
      reference: submission.reference,
      recipient: businessEmails[index],
      noTransport: outcome.error instanceof EmailNotConfiguredError,
      reason: outcome.error,
    })
  }

  if (notified.length === 0) {
    const noTransport = businessOutcomes.some(
      outcome => !outcome.ok && outcome.error instanceof EmailNotConfiguredError
    )

    return noTransport
      ? jsonError(
          503,
          `Our email service is not configured right now. Please email ${brand.supportEmail}.`
        )
      : jsonError(
          500,
          `We could not send your message right now. Please try again, or email ${brand.supportEmail}.`
        )
  }

  const firstDelivered = businessOutcomes.find(outcome => outcome.ok)
  const confirmationSent =
    confirmationOutcome.ok && confirmationOutcome.value !== null

  if (!confirmationSent && sendConfirmation) {
    console.error('[contact] Customer confirmation failed', {
      reference: submission.reference,
      reason: confirmationOutcome.ok ? 'skipped' : confirmationOutcome.error,
    })
  }

  return NextResponse.json({
    ok: true,
    reference: submission.reference,
    confirmationSent,
    notified,
    failedRecipients,
    provider: firstDelivered?.ok ? firstDelivered.value.provider : null,
    fallbackUsed: firstDelivered?.ok ? firstDelivered.value.fallbackUsed : false,
    message: `Thanks ${submission.name.split(' ')[0]} - your message is with our team.`,
  })
}

/**
 * Read-only configuration probe: reports which transport the form will use
 * without revealing secrets.
 */
export async function GET() {
  const order = await resolveProviderOrder()

  return NextResponse.json({
    ok: true,
    ready: order.length > 0,
    transportOrder: order,
    config: getEmailConfigSummary(),
  })
}
