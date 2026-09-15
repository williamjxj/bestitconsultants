/**
 * CODE-OWNED CONTACT + EMAIL CONFIGURATION
 *
 * Everything in this file is a plain setting, not a secret, so it lives in code
 * and the deployment environment only has to hold credentials:
 *
 *   required in .env / Vercel : SMTP_EMAIL, SMTP_PASSWORD
 *   optional, later           : RESEND_API_KEY
 *
 * Every value below can still be overridden per environment with the env var
 * named in its comment, but nothing here has to be configured to work.
 *
 * Note: neither `service@bestitconsultants.ca` nor `service@bestitconsulting.ca`
 * is a live mailbox yet, which is why the address customers can actually reach
 * is a Gmail inbox.
 */

/** Shown to customers on the site and in email. Env override: NEXT_PUBLIC_CONTACT_EMAIL */
export const PUBLIC_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'bestitconsultingca@gmail.com'

export const CONTACT_PHONE = '+1 (236) 992-3846'

/** Dial string for `tel:` links. */
export const CONTACT_PHONE_HREF = '+12369923846'

export const CONTACT_ADDRESS_LINES = [
  '10355 152 St',
  'Surrey, BC V3R 7C1',
  'Canada',
]

/**
 * Inboxes that receive every contact form submission. Each one is delivered to
 * independently so a single bouncing address cannot swallow a lead.
 *
 * This list is ALWAYS used in full. The `ADDITIONAL_BUSINESS_EMAILS` env var can
 * only add recipients - so a stale value left over in the hosting dashboard can
 * never reduce the list and silently stop a lead from reaching an inbox.
 */
export const NOTIFICATION_EMAILS = [
  'jxjwilliam@gmail.com',
  'bestitconsultingca@gmail.com',
]

/**
 * Sender for the Resend transport. It only takes effect once this domain is
 * verified in the Resend account; until then the app sends through Gmail SMTP.
 * Env override: EMAIL_FROM
 */
export const DEFAULT_FROM_ADDRESS =
  'Best IT Consultants <contact@bestitconsultants.ca>'

/** Env override: EMAIL_PROVIDER (`auto` | `smtp` | `resend`) */
export const DEFAULT_EMAIL_PROVIDER = 'auto' as const

/** Send submitters the automatic confirmation reply. Env override: SEND_CUSTOMER_CONFIRMATION */
export const DEFAULT_SEND_CUSTOMER_CONFIRMATION = true

/** Env overrides: SMTP_HOST, SMTP_PORT */
export const DEFAULT_SMTP_HOST = 'smtp.gmail.com'
export const DEFAULT_SMTP_PORT = 465
