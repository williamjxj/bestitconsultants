import {
  CONTACT_ADDRESS_LINES,
  CONTACT_PHONE,
  DEFAULT_EMAIL_PROVIDER,
  DEFAULT_FROM_ADDRESS,
  DEFAULT_SEND_CUSTOMER_CONFIRMATION,
  DEFAULT_SMTP_HOST,
  DEFAULT_SMTP_PORT,
  NOTIFICATION_EMAILS,
  PUBLIC_CONTACT_EMAIL,
} from '@/lib/contact-info'

/**
 * Brand + environment resolution for outbound email.
 *
 * Both marketing sites (bestitconsulting.ca and bestitconsultants.ca) ship the
 * same email layer. Anything that differs per *site* lives in `BRAND`; anything
 * that differs per *deployment* lives in environment variables.
 *
 * Transport selection is deliberately forgiving:
 *   - `EMAIL_PROVIDER=auto` (default) uses Resend only when the sending domain
 *     is actually verified in the Resend account, otherwise it falls back to the
 *     Gmail SMTP credentials. Flipping to Resend later is then a DNS task rather
 *     than a code change.
 *   - `EMAIL_PROVIDER=resend` / `smtp` forces one transport.
 */

export type EmailProviderName = 'resend' | 'smtp'
export type EmailProviderPreference = EmailProviderName | 'auto'

export interface EmailBrand {
  /** Short brand name used in subjects and the email header. */
  name: string
  /** Legal entity used in the footer. */
  legalName: string
  tagline: string
  siteUrl: string
  logoUrl: string
  /** Primary brand colour, also used for buttons. */
  accent: string
  /** Darker shade for headings/tints. */
  accentDark: string
  /** Very light tint used for card backgrounds. */
  accentSoft: string
  supportEmail: string
  phone: string
  addressLines: string[]
  /** Reply promise shown to the submitter. */
  responseWindow: string
  primaryCta: { label: string; url: string }
}

/** Handles values that arrive with stray quotes or whitespace from dashboards. */
export function sanitizeEnv(value?: string | null): string {
  if (!value) return ''
  return value
    .trim()
    .replace(/^['"]+/, '')
    .replace(/['"]+$/, '')
    .trim()
}

function firstNonEmpty(...values: Array<string | undefined | null>): string {
  for (const value of values) {
    const clean = sanitizeEnv(value)
    if (clean) return clean
  }
  return ''
}

export const BRAND: EmailBrand = {
  name: 'Best IT Consultants',
  legalName: 'Best IT Consultants',
  tagline: 'Enterprise software expertise, without the overhead.',
  siteUrl: 'https://www.bestitconsultants.ca',
  logoUrl: 'https://www.bestitconsultants.ca/logo.png',
  accent: '#4B1E5A',
  accentDark: '#351145',
  accentSoft: '#f7f2fa',
  /*
   * Neither `service@bestitconsultants.ca` nor `service@bestitconsulting.ca`
   * is a live mailbox yet, so the address shown to customers has to be one that
   * actually receives mail. Override with PUBLIC_CONTACT_EMAIL once a domain
   * mailbox exists.
   */
  supportEmail: PUBLIC_CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  addressLines: CONTACT_ADDRESS_LINES,
  responseWindow: 'within 24 hours',
  primaryCta: {
    label: 'View our work',
    url: 'https://www.bestitconsultants.ca/portfolio',
  },
}

export function getProviderPreference(): EmailProviderPreference {
  const raw = sanitizeEnv(process.env.EMAIL_PROVIDER).toLowerCase()
  if (raw === 'resend' || raw === 'smtp') return raw
  return DEFAULT_EMAIL_PROVIDER
}

export function getResendApiKey(): string {
  return firstNonEmpty(process.env.RESEND_API_KEY)
}

export interface SmtpConfig {
  user: string
  pass: string
  host: string
  port: number
  secure: boolean
}

export function getSmtpConfig(): SmtpConfig | null {
  const user = firstNonEmpty(process.env.SMTP_EMAIL, process.env.SMTP_USER)
  const pass = firstNonEmpty(process.env.SMTP_PASSWORD, process.env.SMTP_PASS)
  if (!user || !pass) return null

  const explicitPort = Number.parseInt(firstNonEmpty(process.env.SMTP_PORT), 10)
  const port = Number.isFinite(explicitPort)
    ? explicitPort
    : DEFAULT_SMTP_PORT

  return {
    user,
    pass,
    host: firstNonEmpty(process.env.SMTP_HOST) || DEFAULT_SMTP_HOST,
    port,
    // 465 is implicit TLS, 587 upgrades via STARTTLS.
    secure: port !== 587,
  }
}

/**
 * Address configured for Resend. Accepts either `Name <user@domain>` or a bare
 * `user@domain`.
 */
/** A sender address is only useful if its domain can actually be verified. */
function isUsableSender(value: string): boolean {
  const domain = extractDomain(value)
  return Boolean(domain) && !domain.endsWith('resend.dev')
}

/**
 * Sender address for the Resend transport.
 *
 * Order: explicit `EMAIL_FROM` -> a legacy `RESEND_FROM_EMAIL` / `FROM_EMAIL`
 * that points at a real domain -> the branded default from code. Legacy values
 * pointing at `onboarding@resend.dev` are ignored, so a leftover testing value
 * can never block the switch to Resend later.
 */
export function resolveFromAddress(): string {
  const explicit = firstNonEmpty(process.env.EMAIL_FROM)
  if (explicit) {
    return explicit.includes('@') ? explicit : `${BRAND.name} <${explicit}>`
  }

  const legacy = firstNonEmpty(
    process.env.RESEND_FROM_EMAIL,
    process.env.FROM_EMAIL
  )
  if (legacy && isUsableSender(legacy)) return legacy

  return DEFAULT_FROM_ADDRESS
}

/**
 * Inboxes that receive every contact submission.
 *
 * The canonical list lives in `src/lib/contact-info.ts` and is always used in
 * full. `ADDITIONAL_BUSINESS_EMAILS` (plus the legacy `BUSINESS_EMAIL` /
 * `CONTACT_TO_EMAIL` names) can only ADD recipients - so a stale value in the
 * hosting dashboard can never shrink the list and silently drop a lead.
 */
export function getBusinessEmails(): string[] {
  const configured = firstNonEmpty(
    process.env.ADDITIONAL_BUSINESS_EMAILS,
    process.env.BUSINESS_EMAIL,
    process.env.CONTACT_TO_EMAIL
  )

  const seen = new Set<string>()
  const emails: string[] = []

  for (const candidate of [
    ...NOTIFICATION_EMAILS,
    ...configured.split(/[,;\s]+/),
  ]) {
    const email = candidate.trim()
    if (!email) continue
    const key = email.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    emails.push(email)
  }

  return emails
}

export function getPrimaryBusinessEmail(): string {
  return getBusinessEmails()[0]
}

/**
 * Address customers should reply to. Defaults to the brand value because the
 * domain mailboxes are not live yet.
 */
export function getPublicContactEmail(): string {
  return (
    firstNonEmpty(
      process.env.PUBLIC_CONTACT_EMAIL,
      process.env.NEXT_PUBLIC_CONTACT_EMAIL
    ) || BRAND.supportEmail
  )
}

/** Brand with any environment overrides applied. */
export function getBrand(): EmailBrand {
  const supportEmail = getPublicContactEmail()
  return supportEmail === BRAND.supportEmail
    ? BRAND
    : { ...BRAND, supportEmail }
}

export function isCustomerConfirmationEnabled(): boolean {
  const raw = sanitizeEnv(process.env.SEND_CUSTOMER_CONFIRMATION).toLowerCase()
  if (!raw) return DEFAULT_SEND_CUSTOMER_CONFIRMATION
  return !['false', '0', 'no', 'off'].includes(raw)
}

/** Extracts `domain.tld` from `Name <user@domain.tld>` or `user@domain.tld`. */
export function extractDomain(address: string): string {
  const match = address.match(/@([^>\s,;]+)/)
  return match ? match[1].toLowerCase().replace(/[>,;]+$/, '') : ''
}

/**
 * The `From` header depends on the transport: SMTP providers rewrite unknown
 * senders, so we send as the authenticated mailbox but keep the brand display
 * name. Resend requires a verified-domain sender.
 */
export function buildFromAddress(provider: EmailProviderName): string {
  if (provider === 'smtp') {
    const smtp = getSmtpConfig()
    if (smtp) return `${BRAND.name} <${smtp.user}>`
  }
  return resolveFromAddress()
}

/** Safe summary for logs / the diagnostics endpoint - never exposes secrets. */
export function getEmailConfigSummary() {
  const smtp = getSmtpConfig()
  const resendKey = getResendApiKey()

  return {
    preference: getProviderPreference(),
    resend: {
      hasApiKey: Boolean(resendKey),
      sender: resolveFromAddress(),
    },
    smtp: {
      configured: Boolean(smtp),
      user: smtp ? smtp.user : null,
      host: smtp ? smtp.host : null,
      port: smtp ? smtp.port : null,
    },
    businessEmails: getBusinessEmails(),
    publicContactEmail: getPublicContactEmail(),
    customerConfirmation: isCustomerConfirmationEnabled(),
  }
}
