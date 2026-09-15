# Contact Form Email Setup

How `/contact-us` delivers mail, and how to move it from Gmail SMTP to Resend
without touching code.

## Files

| Path | Purpose |
| --- | --- |
| `src/app/api/contact/route.ts` | HTTP endpoint: validation, throttling, Supabase, fan-out |
| `src/lib/email/brand.ts` | Brand copy + environment resolution |
| `src/lib/email/transport.ts` | Provider selection, sending, fallback |
| `src/lib/email/templates.ts` | Business notification + customer auto-reply |
| `src/components/contact/ContactForm.tsx` | The form itself (success/error states) |

## Transport selection

`EMAIL_PROVIDER` decides which service sends the mail:

| Value | Behaviour |
| --- | --- |
| `auto` (default) | Uses Resend **only if** the sender's domain is verified in the Resend account. Otherwise uses Gmail SMTP. |
| `smtp` | Always Gmail SMTP. |
| `resend` | Always Resend. |

In `auto`, if the primary transport throws, the other one is tried before the
request fails.

The `From` header adapts to the transport: SMTP sends as
`Best IT Consultants <SMTP_EMAIL>`, while Resend sends as `EMAIL_FROM`, which
must be on a verified domain.

## Environment variables

### In code (no environment variable needed)

Recipients, the sender address, the provider and the confirmation toggle are
plain settings, so they live in
[`src/lib/contact-info.ts`](../src/lib/contact-info.ts). Nothing there has to be
configured for the form to work, and a stale value in the hosting dashboard
cannot break it.

| Setting | Value | Note |
| --- | --- | --- |
| `NOTIFICATION_EMAILS` | `jxjwilliam@gmail.com`, `bestitconsultingca@gmail.com` | **Always** used in full. `ADDITIONAL_BUSINESS_EMAILS` can only add to it - a leftover `BUSINESS_EMAIL` in Vercel cannot shrink it. |
| `PUBLIC_CONTACT_EMAIL` | `bestitconsultingca@gmail.com` | Shown to customers in the UI and in both email templates. |
| `DEFAULT_FROM_ADDRESS` | `Best IT Consultants <contact@bestitconsultants.ca>` | Sender for Resend; only takes effect once that domain is verified. Until then SMTP is used. |
| `DEFAULT_EMAIL_PROVIDER` | `auto` | `auto` \| `smtp` \| `resend`. |
| `DEFAULT_SEND_CUSTOMER_CONFIRMATION` | `true` | Send submitters the automatic reply. |
| `DEFAULT_SMTP_HOST` / `DEFAULT_SMTP_PORT` | `smtp.gmail.com` / `465` | Port 587 switches to STARTTLS automatically. |

### In the environment (credentials only)

| Variable | Required | Notes |
| --- | --- | --- |
| `SMTP_EMAIL` / `SMTP_PASSWORD` | yes, for sending | Gmail address + **app password** (16 characters). |
| `RESEND_API_KEY` | no | `re_...` from [resend.com/api-keys](https://resend.com/api-keys). Only needed once a domain is verified. |

Everything below is an **optional override** of the code setting above. None are
required, and they are the only reason to touch the hosting dashboard later:

| Variable | Overrides |
| --- | --- |
| `ADDITIONAL_BUSINESS_EMAILS` | Adds recipients (never removes any) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address shown to customers |
| `EMAIL_FROM` | Sender used by Resend |
| `EMAIL_PROVIDER` | `auto` \| `smtp` \| `resend` |
| `SEND_CUSTOMER_CONFIRMATION` | `false` to send only the business notification |
| `SMTP_HOST` / `SMTP_PORT` | SMTP endpoint, if it is not Gmail |

## Switching to Resend

1. In the Resend account, add `bestitconsultants.ca` (Resend dashboard -> Domains).
   It has no Resend DNS records today.
2. Add the TXT + DKIM CNAMEs Resend shows at the DNS host (Hostinger nameservers,
   `ns1/ns2.dns-parking.com`). Adding an SPF record is recommended too.
3. Wait until the domain shows as **Verified**.
4. Set `EMAIL_FROM="Best IT Consultants <contact@bestitconsultants.ca>"`.
5. Keep `EMAIL_PROVIDER=auto` - the next submission switches to Resend.

### Important Resend limit

Before a domain is verified, Resend only allows sending from
`onboarding@resend.dev` **to the account owner's own address**, otherwise it
returns `403 validation_error`. That is why `auto` verifies the domain first.

## Diagnostics

```bash
curl -s https://www.bestitconsultants.ca/api/contact | jq
```

Returns the resolved `transportOrder` plus a redacted config summary - no secrets.

## Behaviour of each submission

1. Honeypot field (`website`) filled -> pretend success, nothing is sent.
2. More than 5 submissions from one IP in 15 minutes -> `429`.
3. Zod validation (lengths, email shape, phone shape) -> `400` with the offending
   field name, which the form highlights inline.
4. Supabase insert runs alongside the emails; a database failure is logged and
   never fails the request.
5. Every address in `BUSINESS_EMAIL` is delivered to **independently and in
   parallel** with the customer auto-reply. One bouncing or misconfigured inbox
   never blocks the others; the submission only fails if all of them fail. The
   auto-reply is best-effort: a failed confirmation never blocks the lead.
6. Response includes a `reference` (e.g. `BITC-7B9F0D`) shown in the success
   panel and in both emails, plus `notified` / `failedRecipients` lists.

## Brand constants and published addresses

Display name, logo, accent colour, phone and address live in
`src/lib/email/brand.ts`. The customer-facing address comes from
`src/lib/contact-info.ts`:

```env
NEXT_PUBLIC_CONTACT_EMAIL=bestitconsultingca@gmail.com
```

`service@bestitconsultants.ca` and `service@bestitconsulting.ca` are **not live
mailboxes**, so nothing points at them any more. That single value feeds the
contact sidebar, the footer, the quick-contact link, the JSON-LD structured
data, `public/llms-full.txt` and the support address in both email templates.
When a domain mailbox exists, set the variable in Vercel and redeploy.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `503 Email service is not configured` | Neither `RESEND_API_KEY` nor `SMTP_EMAIL`/`SMTP_PASSWORD` is set. |
| `500 We could not send your message` | Server logs contain `[email] ... delivery failed` with the provider error. |
| No auto-reply to the submitter | `SEND_CUSTOMER_CONFIRMATION` may be off, or the address bounced. |
| Mail lands in spam | Verify the domain in Resend so mail is DKIM-signed, and add SPF/DMARC. |
| Supabase row missing | Only the database copy failed; the email was still sent. Check the logs for `Supabase insert failed`. |
