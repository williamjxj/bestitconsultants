import { NextRequest, NextResponse } from 'next/server'

// Dynamic import of Resend to handle cases where it might not be installed
async function getResendInstance() {
  try {
    const { Resend } = await import('resend')
    return new Resend(process.env.RESEND_API_KEY)
  } catch (error) {
    console.error('Resend module not found:', error)
    throw new Error(
      'Email service not configured. Please install resend package.'
    )
  }
}

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

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error: 'Email service not configured. Please contact administrator.',
        },
        { status: 500 }
      )
    }

    // Get business email from environment variable
    // This is where YOU receive contact form submissions
    const businessEmailAddress =
      process.env.BUSINESS_EMAIL ||
      process.env.CONTACT_EMAIL ||
      'williamjxj@gmail.com'

    // Validate business email address
    if (!businessEmailAddress) {
      return NextResponse.json(
        {
          error: 'Business email not configured. Please contact administrator.',
        },
        { status: 500 }
      )
    }

    // Get FROM email address
    const fromEmailAddress =
      process.env.FROM_EMAIL ||
      process.env.RESEND_FROM_EMAIL ||
      'BestITConsultants <contact@bestitconsultants.ca>'

    const resend = await getResendInstance()

    // Email template for the business owner
    const businessEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      </div>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Project Details</h3>
        ${title ? `<p><strong>Title:</strong> ${title}</p>` : ''}
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
      </div>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Message</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>

      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This message was sent through the BestITConsultants contact form.
      </p>
    `

    // Email template for the auto-reply to the customer
    const customerEmailHtml = `
      <h2>Thank you for contacting BestITConsultants!</h2>

      <p>Dear ${name},</p>

      <p>Thank you for reaching out to us. We have received your inquiry and our team will review it shortly.</p>

      <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Your Message Summary:</h3>
        <p><strong>Service Interest:</strong> ${service || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; font-style: italic;">${message}</p>
      </div>

      <p>Here's what happens next:</p>
      <ul>
        <li>Our team will review your inquiry within 24 hours</li>
        <li>We'll respond with initial thoughts and next steps</li>
        <li>If needed, we'll schedule a consultation call to discuss your project in detail</li>
      </ul>

      <p>In the meantime, feel free to explore our portfolio and case studies on our website.</p>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Contact Information</h3>
        <p><strong>Address:</strong> 10355 152 St, Surrey, BC, Canada V3R 7C1</p>
        <p><strong>Phone:</strong> +1 (236) 992-3846</p>
        <p><strong>Email:</strong> ${businessEmailAddress}</p>
      </div>

      <p>Best regards,<br>
      William Jiang<br>
      Founder & CEO<br>
      BestITConsultants Ltd</p>

      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated response. Please do not reply to this email directly.
      </p>
    `

    // Send email to business owner
    const businessEmailResult = await resend.emails.send({
      from: fromEmailAddress,
      to: [businessEmailAddress],
      subject: `New Contact Form Submission from ${name}`,
      html: businessEmailHtml,
      replyTo: email,
    })

    // Send auto-reply to customer
    const customerEmailResult = await resend.emails.send({
      from: fromEmailAddress,
      to: [email],
      subject: 'Thank you for contacting BestITConsultants',
      html: customerEmailHtml,
      replyTo: businessEmailAddress,
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
        message: 'Emails sent successfully',
        businessEmailId: businessEmailResult.data?.id,
        customerEmailId: customerEmailResult.data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)

    // Return different error messages based on the error type
    if (
      error instanceof Error &&
      error.message.includes('Email service not configured')
    ) {
      return NextResponse.json(
        {
          error:
            'Email service is currently being configured. Please try again later or contact us directly.',
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
