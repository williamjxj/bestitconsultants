// Test script to verify Resend API configuration
// Run this with: node test-resend.js

const { Resend } = require('resend')

async function testResend() {
  const resend = new Resend('re_azAhdY7r_HBcqg14GDsmUMbjw8rmWh756')

  try {
    console.log('Testing Resend API...')

    const result = await resend.emails.send({
      from: 'BestITConsulting <onboarding@resend.dev>',
      to: ['williamjxj@gmail.com'],
      subject: 'Test Email from BestITConsulting',
      html: '<h1>Test Email</h1><p>This is a test email to verify Resend configuration.</p>',
    })

    console.log('Email sent successfully!')
    console.log('Result:', result)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

testResend()
