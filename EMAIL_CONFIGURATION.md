# Email Configuration Guide - BestITConsulting Contact Form

## Current Email Setup

### **Sender Configuration:**

The contact form now uses **Resend's verified default domain** to avoid domain verification issues:

- **From Address**: `BestITConsulting <onboarding@resend.dev>`
- **Service**: Resend API (Professional email service)

### **Email Flow:**

#### 1. **Business Notification Email**

When a customer submits the contact form:

- **FROM**: `BestITConsulting <onboarding@resend.dev>`
- **TO**: `jxjwilliam@gmail.com` (configurable via `BUSINESS_EMAIL` env var)
- **REPLY-TO**: Customer's email address (enables direct replies)
- **SUBJECT**: `New Contact Form Submission from [Customer Name]`

#### 2. **Customer Auto-Reply Email**

Customer receives immediate confirmation:

- **FROM**: `BestITConsulting <onboarding@resend.dev>`
- **TO**: Customer's email address
- **REPLY-TO**: `jxjwilliam@gmail.com` (business email)
- **SUBJECT**: `Thank you for contacting BestITConsulting`

## Environment Variables

### Required Variables in `.env`:

```bash
# Resend API Key (Required)
RESEND_API_KEY="re_azAhdY7r_HBcqg14GDsmUMbjw8rmWh756"

# Business Email Address (Required)
BUSINESS_EMAIL="jxjwilliam@gmail.com"
```

## Contact Information Updated

### Website Contact Details:

- **Address**: 9727 152B Street, Surrey, BC V3R 0G5, Canada
- **Phone**: +1 (236) 992-3846
- **Email**: jxjwilliam@gmail.com
- **Website**: www.bestitconsulting.com

## Email Templates

### Business Notification Template Includes:

- Customer contact information
- Project details (service, budget, timeline)
- Full message content
- Newsletter subscription preference

### Customer Auto-Reply Template Includes:

- Personalized greeting
- Message summary
- Next steps timeline
- Contact information
- Professional signature

## Technical Implementation

### API Endpoint: `/api/contact`

- **Method**: POST
- **Validation**: Name, email, and message are required
- **Error Handling**: Graceful fallbacks for missing Resend package
- **Response**: JSON with email IDs for tracking

### Features:

- ✅ Dual email sending (business + customer)
- ✅ Input validation and sanitization
- ✅ Environment variable configuration
- ✅ Error handling and user feedback
- ✅ Reply-to functionality for easy responses
- ✅ Professional email templates with HTML formatting

## Benefits of Current Setup

1. **No Domain Verification Required**: Uses Resend's verified domain
2. **Professional Branding**: Shows "BestITConsulting" as sender name
3. **Easy Replies**: Reply-to functionality enables direct communication
4. **Reliable Delivery**: Resend ensures high deliverability rates
5. **Environment Configurable**: Easy to change email addresses via env vars

## Future Enhancements (Optional)

If you want to use your own domain in the future:

1. Register and verify `bestitconsultants.ca` with Resend
2. Update sender addresses to use your custom domain
3. Set up DKIM, SPF, and DMARC records for better deliverability

## Testing

The contact form is now ready for production use with:

- ✅ Working email delivery
- ✅ Professional presentation
- ✅ Error handling
- ✅ User feedback
- ✅ Google Maps integration
