import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Dynamic import of Supabase client (optional)
async function getSupabaseInstance() {
  try {
    const { supabase } = await import('@/lib/supabase')
    return supabase
  } catch (error) {
    console.warn('Supabase not configured:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, service, message, title } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      )
    }

    const smtpUser = process.env.SMTP_EMAIL
    const smtpPass = process.env.SMTP_PASSWORD

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            'Email service not configured. Please contact administrator.',
        },
        { status: 500 }
      )
    }

    const receiverEmailAddress = 'jxjwilliam@gmail.com'
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeCompany = escapeHtml(company || 'Not provided')
    const safePhone = escapeHtml(phone || 'Not provided')
    const safeService = escapeHtml(service || 'Not specified')
    const safeTitle = title ? escapeHtml(title) : ''
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

    // Email template for the business owner
    const businessEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
      </div>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Project Details</h3>
        ${safeTitle ? `<p><strong>Title:</strong> ${safeTitle}</p>` : ''}
        <p><strong>Service:</strong> ${safeService}</p>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Message</h3>
        <p style="white-space: pre-wrap;">${safeMessage}</p>
      </div>

      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This message was sent through the BestITConsultants contact form.
      </p>
    `

    const businessEmailResult = await transporter.sendMail({
      from: smtpUser,
      to: receiverEmailAddress,
      subject: `New Contact Form Submission from ${name}`,
      html: businessEmailHtml,
      replyTo: email,
    })

    // Optionally save to Supabase (optional - doesn't fail if DB save fails)
    const supabase = await getSupabaseInstance()
    if (supabase) {
      try {
        const { error: dbError } = await supabase
          .from('bestitconsultants_contacts')
          .insert({
            name,
            email,
            message,
            company: company || null,
            phone: phone || null,
            service: service || null,
            title: title || null,
            submitted_at: new Date().toISOString(),
          })

        if (dbError) {
          console.error('Error saving to Supabase:', dbError)
          // Don't fail the request if DB save fails, email was already sent
        }
      } catch (dbError) {
        console.error('Error saving to Supabase:', dbError)
        // Don't fail the request if DB save fails, email was already sent
      }
    }

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        messageId: businessEmailResult.messageId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
