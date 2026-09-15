import {
  buildFromAddress,
  extractDomain,
  getProviderPreference,
  getResendApiKey,
  getSmtpConfig,
  resolveFromAddress,
  type EmailProviderName,
} from './brand'

export interface OutboundEmail {
  to: string
  subject: string
  html: string
  text: string
  /** Accepts several addresses so replies can reach the whole inbox group. */
  replyTo?: string | string[]
  /** Overrides the provider-derived sender. */
  from?: string
}

export interface SendOutcome {
  id: string
  provider: EmailProviderName
  /** Providers tried, in order - useful when the fallback saved a submission. */
  attempted: EmailProviderName[]
  fallbackUsed: boolean
}

export class EmailNotConfiguredError extends Error {
  constructor(message = 'Email transport is not configured') {
    super(message)
    this.name = 'EmailNotConfiguredError'
  }
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const REQUEST_TIMEOUT_MS = 15_000

let verifiedDomainCache: { domains: string[]; fetchedAt: number } | null = null
const VERIFIED_DOMAIN_TTL_MS = 10 * 60 * 1000

/**
 * Resend refuses to send from an unverified domain (and only allows the account
 * owner's own address from `onboarding@resend.dev`). Checking this up front is
 * what keeps `EMAIL_PROVIDER=auto` from silently breaking a live contact form.
 */
async function getVerifiedResendDomains(apiKey: string): Promise<string[]> {
  if (
    verifiedDomainCache &&
    Date.now() - verifiedDomainCache.fetchedAt < VERIFIED_DOMAIN_TTL_MS
  ) {
    return verifiedDomainCache.domains
  }

  try {
    const response = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: 'no-store',
    })

    if (!response.ok) return []

    const payload = (await response.json()) as {
      data?: Array<{ name?: string; status?: string }>
    }

    const domains = (payload.data ?? [])
      .filter(item => (item.status ?? '').toLowerCase() === 'verified')
      .map(item => (item.name ?? '').toLowerCase())
      .filter(Boolean)

    verifiedDomainCache = { domains, fetchedAt: Date.now() }
    return domains
  } catch {
    return []
  }
}

async function canUseResend(apiKey: string): Promise<boolean> {
  const from = resolveFromAddress()
  const domain = extractDomain(from)
  if (!domain || domain.endsWith('resend.dev')) return false

  const verified = await getVerifiedResendDomains(apiKey)
  return verified.includes(domain)
}

/**
 * Chooses a transport for this request.
 *
 * - `resend` / `smtp` in `EMAIL_PROVIDER` wins outright.
 * - `auto` prefers Resend when the sending domain is verified, else SMTP.
 */
export async function resolveProviderOrder(): Promise<EmailProviderName[]> {
  const preference = getProviderPreference()
  const apiKey = getResendApiKey()
  const smtp = getSmtpConfig()

  if (preference === 'resend') {
    return apiKey ? ['resend'] : smtp ? ['smtp'] : []
  }
  if (preference === 'smtp') {
    return smtp ? ['smtp'] : apiKey ? ['resend'] : []
  }

  const resendReady = apiKey ? await canUseResend(apiKey) : false
  if (resendReady && smtp) return ['resend', 'smtp']
  if (resendReady) return ['resend']
  if (smtp) return ['smtp']
  if (apiKey) return ['resend']
  return []
}

async function sendViaResend(
  email: OutboundEmail,
  apiKey: string
): Promise<string> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: email.from ?? buildFromAddress('resend'),
      to: [email.to],
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(email.replyTo ? { reply_to: email.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  const payload = (await response.json().catch(() => null)) as
    | { id?: string; message?: string }
    | null

  if (!response.ok) {
    throw new Error(
      `Resend rejected the message (${response.status}): ${
        payload?.message ?? 'unknown error'
      }`
    )
  }

  return payload?.id ?? 'resend-unknown-id'
}

async function sendViaSmtp(email: OutboundEmail): Promise<string> {
  const smtp = getSmtpConfig()
  if (!smtp) throw new EmailNotConfiguredError('SMTP credentials are missing')

  // Imported lazily so Resend-only deployments never load nodemailer.
  const { default: nodemailer } = await import('nodemailer')

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
    connectionTimeout: REQUEST_TIMEOUT_MS,
    greetingTimeout: REQUEST_TIMEOUT_MS,
    socketTimeout: REQUEST_TIMEOUT_MS,
  })

  try {
    const info = await transporter.sendMail({
      from: email.from ?? buildFromAddress('smtp'),
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(email.replyTo ? { replyTo: email.replyTo } : {}),
    })
    return info.messageId ?? 'smtp-unknown-id'
  } finally {
    transporter.close()
  }
}

function describeError(error: unknown): Record<string, unknown> {
  if (!(error instanceof Error)) return { message: String(error) }

  const smtpError = error as Error & {
    code?: string
    responseCode?: number
    response?: string
    command?: string
  }

  return {
    message: smtpError.message,
    code: smtpError.code,
    responseCode: smtpError.responseCode,
    command: smtpError.command,
    response: smtpError.response,
  }
}

/**
 * Sends one message, walking the provider order until one succeeds.
 * Never throws for a *primary* failure when a fallback is available.
 */
export async function sendEmail(email: OutboundEmail): Promise<SendOutcome> {
  const order = await resolveProviderOrder()

  if (order.length === 0) {
    throw new EmailNotConfiguredError(
      'No email transport configured. Set RESEND_API_KEY or SMTP_EMAIL/SMTP_PASSWORD.'
    )
  }

  const apiKey = getResendApiKey()
  const attempted: EmailProviderName[] = []
  const failures: Array<{ provider: EmailProviderName; error: unknown }> = []

  for (const provider of order) {
    attempted.push(provider)
    try {
      const id =
        provider === 'resend'
          ? await sendViaResend(email, apiKey)
          : await sendViaSmtp(email)

      return {
        id,
        provider,
        attempted,
        fallbackUsed: attempted.length > 1,
      }
    } catch (error) {
      failures.push({ provider, error })
      console.error(
        `[email] ${provider} delivery failed`,
        describeError(error)
      )
    }
  }

  const lastFailure = failures[failures.length - 1]
  throw new Error(
    `All email transports failed: ${failures
      .map(item => `${item.provider}`)
      .join(', ')} - ${JSON.stringify(describeError(lastFailure?.error))}`
  )
}
