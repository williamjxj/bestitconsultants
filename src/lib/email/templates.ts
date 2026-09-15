import type { EmailBrand } from './brand'

export interface ContactSubmission {
  /** Human-facing ticket id, e.g. `BIC-4F2A9C`. */
  reference: string
  name: string
  email: string
  company?: string
  phone?: string
  service?: string
  subject?: string
  budget?: string
  timeline?: string
  message: string
  submittedAt: Date
  /** Page the visitor submitted from, when the client sends it. */
  pageUrl?: string
  source?: string
}

export interface RenderedEmail {
  subject: string
  html: string
  text: string
}

const CONTENT_WIDTH = 600

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br />')
}

function firstName(fullName: string): string {
  const trimmed = fullName.trim()
  if (!trimmed) return 'there'
  return trimmed.split(/\s+/)[0]
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Vancouver',
  }).format(date)
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 0;font-size:13px;line-height:20px;color:#64748b;width:132px;vertical-align:top;">${escapeHtml(
        label
      )}</td>
      <td style="padding:6px 0;font-size:14px;line-height:20px;color:#0f172a;font-weight:600;word-break:break-word;">${nl2br(
        value
      )}</td>
    </tr>`
}

function card(title: string, inner: string, brand: EmailBrand): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;">
      <tr>
        <td style="background-color:${brand.accentSoft};border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;">
          <p style="margin:0 0 10px 0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${
            brand.accentDark
          };">${escapeHtml(title)}</p>
          ${inner}
        </td>
      </tr>
    </table>`
}

function button(label: string, href: string, brand: EmailBrand): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
      <tr>
        <td style="background-color:${brand.accent};border-radius:10px;">
          <a href="${href}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">${escapeHtml(
            label
          )}</a>
        </td>
      </tr>
    </table>`
}

interface LayoutOptions {
  brand: EmailBrand
  preheader: string
  heading: string
  subheading: string
  body: string
  footerNote?: string
}

function layout({
  brand,
  preheader,
  heading,
  subheading,
  body,
  footerNote,
}: LayoutOptions): string {
  const year = new Date().getFullYear()
  const address = brand.addressLines.map(escapeHtml).join('<br />')

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${escapeHtml(heading)}</title>
    <!--[if mso]>
      <style type="text/css">
        body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
      </style>
    <![endif]-->
    <style type="text/css">
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f4f6fb; }
      table { border-collapse: collapse !important; }
      img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      a { color: ${brand.accent}; }
      @media only screen and (max-width: 620px) {
        .ec-wrap { padding: 16px 12px !important; }
        .ec-hdr { padding: 26px 22px !important; }
        .ec-body { padding: 24px 20px !important; }
        .ec-h1 { font-size: 21px !important; line-height: 28px !important; }
        .ec-lead { font-size: 15px !important; }
        .ec-stack { display: block !important; width: 100% !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6fb;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <div style="display:none;font-size:1px;color:#f4f6fb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(
      preheader
    )}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6fb;">
      <tr>
        <td class="ec-wrap" align="center" style="padding:28px 16px;">

          <table role="presentation" width="${CONTENT_WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${CONTENT_WIDTH}px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 32px rgba(15,23,42,0.08);">

            <!-- Header -->
            <tr>
              <td class="ec-hdr" style="background-color:${brand.accent};padding:30px 32px;text-align:center;">
                <img src="${brand.logoUrl}" alt="${escapeHtml(
                  brand.name
                )}" width="56" height="56" style="display:block;margin:0 auto 12px auto;border-radius:12px;background-color:#ffffff;" />
                <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#dbeafe;">${escapeHtml(
                  brand.name
                )}</p>
                <h1 class="ec-h1" style="margin:0;font-size:23px;line-height:30px;font-weight:700;color:#ffffff;">${escapeHtml(
                  heading
                )}</h1>
                <p class="ec-lead" style="margin:8px 0 0 0;font-size:15px;line-height:22px;color:#e0ecff;">${escapeHtml(
                  subheading
                )}</p>
              </td>
            </tr>
            <tr>
              <td height="4" style="height:4px;line-height:4px;font-size:0;background-color:#22d3ee;">&nbsp;</td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="ec-body" style="padding:32px;">
                ${body}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:22px 32px;text-align:center;">
                ${
                  footerNote
                    ? `<p style="margin:0 0 10px 0;font-size:13px;line-height:20px;color:#475569;">${footerNote}</p>`
                    : ''
                }
                <p style="margin:0 0 4px 0;font-size:13px;line-height:20px;color:#0f172a;font-weight:700;">${escapeHtml(
                  brand.legalName
                )}</p>
                <p style="margin:0 0 10px 0;font-size:12px;line-height:18px;color:#64748b;">${escapeHtml(
                  brand.tagline
                )}</p>
                <p style="margin:0 0 6px 0;font-size:12px;line-height:18px;color:#64748b;">${address}</p>
                <p style="margin:0;font-size:12px;line-height:18px;color:#64748b;">
                  <a href="mailto:${brand.supportEmail}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(
                    brand.supportEmail
                  )}</a>
                  &nbsp;|&nbsp;
                  <a href="${brand.siteUrl}" style="color:${brand.accent};text-decoration:none;">${escapeHtml(
                    brand.siteUrl.replace('https://', '')
                  )}</a>
                </p>
                <p style="margin:12px 0 0 0;font-size:11px;line-height:16px;color:#94a3b8;">&copy; ${year} ${escapeHtml(
                  brand.legalName
                )}. All rights reserved.</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>`
}

/** Notification that lands in the business inbox. */
export function renderBusinessNotification(
  submission: ContactSubmission,
  brand: EmailBrand
): RenderedEmail {
  const { name, email, reference } = submission
  const submitted = formatDate(submission.submittedAt)

  const contactRows = [
    detailRow('Name', name),
    detailRow('Email', email),
    submission.company ? detailRow('Company', submission.company) : '',
    submission.phone ? detailRow('Phone', submission.phone) : '',
  ].join('')

  const projectRows = [
    submission.subject ? detailRow('Subject', submission.subject) : '',
    submission.service ? detailRow('Service', submission.service) : '',
    submission.budget ? detailRow('Budget', submission.budget) : '',
    submission.timeline ? detailRow('Timeline', submission.timeline) : '',
  ].join('')

  const replySubject = encodeURIComponent(`Re: your enquiry - ${reference}`)
  const replyHref = `mailto:${email}?subject=${replySubject}`

  const body = `
    <p style="margin:0 0 20px 0;font-size:15px;line-height:23px;color:#334155;">
      A new enquiry just came in through <strong>${escapeHtml(
        brand.siteUrl.replace('https://', '')
      )}</strong>. Reply directly to this email to answer <strong>${escapeHtml(
        name
      )}</strong>.
    </p>

    ${button(`Reply to ${name}`, replyHref, brand)}

    <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>

    ${card('Contact information', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${contactRows}</table>`, brand)}

    ${
      projectRows
        ? card(
            'Project details',
            `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${projectRows}</table>`,
            brand
          )
        : ''
    }

    ${card(
      'Message',
      `<div style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:16px;font-size:14px;line-height:22px;color:#1e293b;">${nl2br(
        submission.message
      )}</div>`,
      brand
    )}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;border-top:1px solid #e2e8f0;">
      <tr>
        <td style="padding-top:14px;font-size:12px;line-height:19px;color:#64748b;">
          <strong style="color:#334155;">Reference:</strong> ${escapeHtml(reference)}<br />
          <strong style="color:#334155;">Received:</strong> ${escapeHtml(submitted)} (Pacific)<br />
          ${
            submission.source
              ? `<strong style="color:#334155;">Source:</strong> ${escapeHtml(submission.source)}<br />`
              : ''
          }
          ${
            submission.pageUrl
              ? `<strong style="color:#334155;">Page:</strong> ${escapeHtml(submission.pageUrl)}`
              : ''
          }
        </td>
      </tr>
    </table>`

  const textLines = [
    `New contact enquiry - ${brand.name}`,
    `Reference: ${reference}`,
    `Received: ${submitted} (Pacific)`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    submission.company ? `Company: ${submission.company}` : '',
    submission.phone ? `Phone: ${submission.phone}` : '',
    submission.subject ? `Subject: ${submission.subject}` : '',
    submission.service ? `Service: ${submission.service}` : '',
    submission.budget ? `Budget: ${submission.budget}` : '',
    submission.timeline ? `Timeline: ${submission.timeline}` : '',
    submission.pageUrl ? `Page: ${submission.pageUrl}` : '',
    '',
    'Message:',
    submission.message,
    '',
    `Reply to this email to answer ${name} directly.`,
  ].filter(line => line !== '')

  return {
    subject: `New enquiry: ${name}${submission.service ? ` - ${submission.service}` : ''} [${reference}]`,
    html: layout({
      brand,
      preheader: `${name} sent a new enquiry - reply to them directly from this email.`,
      heading: 'New contact enquiry',
      subheading: `Received ${submitted} (Pacific) - ${reference}`,
      body,
      footerNote:
        'This notification was generated automatically by the website contact form. Reply directly to reach the sender.',
    }),
    text: textLines.join('\n'),
  }
}

/** Auto-reply that lands in the submitter's inbox. */
export function renderCustomerConfirmation(
  submission: ContactSubmission,
  brand: EmailBrand
): RenderedEmail {
  const { name, reference } = submission
  const submitted = formatDate(submission.submittedAt)

  const nextSteps = [
    {
      title: 'We review your message',
      copy: 'A senior engineer with Fortune 500 delivery experience reads it.',
    },
    {
      title: `We reply ${brand.responseWindow}`,
      copy: 'You get a written response with a proposed next step, if it fits.',
    },
    {
      title: 'Free 30-minute technical consultation',
      copy: 'We scope your project on a call - no cost, no obligation.',
    },
  ]

  const stepRows = nextSteps
    .map(
      (step, index) => `
      <tr>
        <td width="34" valign="top" style="padding:0 0 14px 0;">
          <div style="width:26px;height:26px;line-height:26px;border-radius:50%;background-color:${
            brand.accent
          };color:#ffffff;font-size:13px;font-weight:700;text-align:center;">${
            index + 1
          }</div>
        </td>
        <td valign="top" style="padding:0 0 14px 8px;">
          <p style="margin:0;font-size:14px;line-height:20px;color:#0f172a;font-weight:600;">${escapeHtml(
            step.title
          )}</p>
          <p style="margin:2px 0 0 0;font-size:13px;line-height:20px;color:#475569;">${escapeHtml(
            step.copy
          )}</p>
        </td>
      </tr>`
    )
    .join('')

  const summaryRows = [
    detailRow('Reference', reference),
    detailRow('Received', submitted),
    submission.subject ? detailRow('Subject', submission.subject) : '',
    submission.service ? detailRow('Service', submission.service) : '',
  ].join('')

  const body = `
    <p style="margin:0 0 14px 0;font-size:15px;line-height:23px;color:#334155;">
      Hi ${escapeHtml(firstName(name))},
    </p>
    <p style="margin:0 0 22px 0;font-size:15px;line-height:23px;color:#334155;">
      Thanks for reaching out to <strong>${escapeHtml(
        brand.legalName
      )}</strong>. Your message reached a real person - this email confirms it is now with our engineering team.
    </p>

    ${card('What happens next', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}</table>`, brand)}

    ${card('Your submission', `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${summaryRows}</table>`, brand)}

    <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${
      brand.accentDark
    };">Your message</p>
    <div style="background-color:#f8fafc;border-left:3px solid ${
      brand.accent
    };border-radius:0 10px 10px 0;padding:14px 16px;margin:0 0 24px 0;font-size:14px;line-height:22px;color:#334155;">${nl2br(
      submission.message
    )}</div>

    <p style="margin:0 0 16px 0;font-size:15px;line-height:23px;color:#334155;">
      While you wait, take a look at how we have helped other teams ship enterprise software faster.
    </p>

    ${button(brand.primaryCta.label, brand.primaryCta.url, brand)}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;border-top:1px solid #e2e8f0;">
      <tr>
        <td style="padding-top:18px;text-align:center;">
          <p style="margin:0 0 8px 0;font-size:14px;line-height:21px;color:#0f172a;font-weight:600;">Need an answer sooner?</p>
          <p style="margin:0;font-size:14px;line-height:21px;color:#475569;">
            Call <a href="tel:${brand.phone.replace(/[^+\d]/g, '')}" style="color:${
              brand.accent
            };text-decoration:none;font-weight:600;">${escapeHtml(
              brand.phone
            )}</a><br />
            or email <a href="mailto:${brand.supportEmail}?subject=${encodeURIComponent(
              `Question about ${reference}`
            )}" style="color:${brand.accent};text-decoration:none;font-weight:600;">${escapeHtml(
              brand.supportEmail
            )}</a>
          </p>
        </td>
      </tr>
    </table>`

  return {
    subject: `We received your message - ${reference}`,
    html: layout({
      brand,
      preheader: `Thanks ${firstName(
        name
      )} - your message is with our team and we reply ${brand.responseWindow}.`,
      heading: `Thanks, ${firstName(name)} - we have your message`,
      subheading: `Reference ${reference} - we reply ${brand.responseWindow}`,
      body,
      footerNote:
        'You are receiving this because you submitted the contact form on our website.',
    }),
    text: [
      `Hi ${firstName(name)},`,
      '',
      `Thanks for reaching out to ${brand.legalName}. Your message reached a real person and is now in our queue.`,
      '',
      `Reference: ${reference}`,
      `Received: ${submitted} (Pacific)`,
      submission.subject ? `Subject: ${submission.subject}` : '',
      submission.service ? `Service: ${submission.service}` : '',
      '',
      'What happens next:',
      '1. We review your message and route it to the right specialist.',
      `2. We reply ${brand.responseWindow} with a written response.`,
      '3. If useful, we book a free 30-minute consultation.',
      '',
      'Your message:',
      submission.message,
      '',
      `Portfolio: ${brand.primaryCta.url}`,
      `Phone: ${brand.phone}`,
      `Email: ${brand.supportEmail}`,
      '',
      `${brand.legalName} - ${brand.tagline}`,
      brand.siteUrl,
    ]
      .filter(line => line !== '')
      .join('\n'),
  }
}
