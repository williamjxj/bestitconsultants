# API Contract: Contact Form

**Feature**: 006-improve-cta-contact  
**Date**: 2025-01-27  
**Version**: 1.0

## Endpoint

### POST `/api/contact`

Submit a contact form inquiry.

**Request**:

```typescript
POST /api/contact
Content-Type: application/json

{
  "name": string,        // Required, 2-100 characters
  "email": string,       // Required, valid email format
  "message": string,     // Required, 10-2000 characters
  "company"?: string,    // Optional, max 100 characters
  "phone"?: string,      // Optional, valid phone format
  "service"?: string,    // Optional, service category ID
  "source"?: string,     // Optional, page source (homepage, services, etc.)
  "cta"?: string         // Optional, CTA identifier (free-consultation, etc.)
}
```

**Example Request**:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "I'm interested in your AI/ML consulting services for a new project.",
  "company": "Acme Corp",
  "phone": "+1-555-123-4567",
  "service": "ai-ml",
  "source": "homepage",
  "cta": "free-consultation"
}
```

**Response**:

**Success (200 OK)**:

```json
{
  "message": "Emails sent successfully",
  "businessEmailId": "email-id-from-resend",
  "customerEmailId": "email-id-from-resend"
}
```

**Error Responses**:

**400 Bad Request** - Validation Error:

```json
{
  "error": "Name, email, and message are required fields"
}
```

**500 Internal Server Error** - Email Service Error:

```json
{
  "error": "Failed to send email. Please try again later."
}
```

**503 Service Unavailable** - Email Service Not Configured:

```json
{
  "error": "Email service is currently being configured. Please try again later or contact us directly."
}
```

---

## Validation Rules

### Client-Side (Zod Schema)

- **name**: Required, min 2, max 100 characters, trimmed
- **email**: Required, valid email format (RFC 5322), trimmed
- **message**: Required, min 10, max 2000 characters, trimmed
- **company**: Optional, max 100 characters, trimmed (empty string = undefined)
- **phone**: Optional, valid international phone format, trimmed (empty string = undefined)
- **service**: Optional, must match service category IDs (empty string = undefined)
- **source**: Optional, must be one of: `homepage`, `services`, `portfolio`, `case-studies`, `about`
- **cta**: Optional, must be one of: `free-consultation`, `get-quote`, `start-project`, `schedule-call`

### Server-Side (API Route)

- Validates required fields: `name`, `email`, `message`
- Validates email format
- Trims all string fields
- Converts empty strings to `undefined` for optional fields
- Checks Resend API key configuration

---

## Error Handling

### Client-Side Errors

1. **Network Error**: Connection failed, no response from server
   - Display: "Network error. Please check your connection and try again."
   - Action: Allow retry

2. **Validation Error**: Form data fails Zod validation
   - Display: Field-specific error messages
   - Action: Highlight invalid fields, prevent submission

3. **Timeout Error**: Request takes too long (>30 seconds)
   - Display: "Request timed out. Please try again."
   - Action: Allow retry

### Server-Side Errors

1. **400 Bad Request**: Missing required fields or invalid data
   - Response: `{ error: string }`
   - Client displays error message

2. **500 Internal Server Error**: Email service failure or server error
   - Response: `{ error: "Failed to send email. Please try again later." }`
   - Client displays error, allows retry

3. **503 Service Unavailable**: Email service not configured
   - Response: `{ error: "Email service is currently being configured..." }`
   - Client displays error, suggests alternative contact method

---

## Email Notifications

### Business Email (to business owner)

**From**: `BestITConsultants <contact@bestitconsultants.ca>` (or `FROM_EMAIL` env var)  
**To**: `BUSINESS_EMAIL` environment variable (or `williamjxj@gmail.com`)  
**Subject**: `New Contact Form Submission from {name}`  
**Reply-To**: User's email address

**Content**: HTML email with:
- Contact information (name, email, company, phone)
- Project details (service, source, cta)
- Message content

### Customer Auto-Reply (to customer)

**From**: `BestITConsultants <contact@bestitconsultants.ca>`  
**To**: Customer's email address  
**Subject**: `Thank you for contacting BestITConsultants`  
**Reply-To**: Business email

**Content**: HTML email with:
- Thank you message
- Message summary
- Next steps (response within 24 hours)
- Contact information

---

## Optional: Supabase Integration

If Supabase is configured, the API route should also:

1. **Save to Database**:
   ```typescript
   await supabase
     .from('contact_submissions')
     .insert({
       name,
       email,
       message,
       company: company || null,
       phone: phone || null,
       service: service || null,
       source: source || null,
       cta: cta || null,
       ip_address: request.headers.get('x-forwarded-for') || null,
       submitted_at: new Date().toISOString()
     })
   ```

2. **Handle Database Errors**:
   - If database save fails but email succeeds, log error but return success
   - User should still see success message
   - Admin should be notified of database error

---

## Rate Limiting (Future Enhancement)

Consider implementing rate limiting to prevent spam:

- **Max submissions per IP**: 5 per hour
- **Max submissions per email**: 3 per hour
- Return `429 Too Many Requests` if limit exceeded

---

## CORS and Security

- **CORS**: Same-origin only (Next.js App Router handles this)
- **CSRF**: Protected by SameSite cookies (Next.js default)
- **XSS**: Input sanitization on server-side
- **SQL Injection**: N/A (using parameterized queries if Supabase)
- **Email Injection**: Validate email format, sanitize message content

---

## Testing

### Test Cases

1. **Valid Submission**:
   - All required fields provided
   - Optional fields included
   - Expected: 200 OK, emails sent

2. **Missing Required Fields**:
   - Missing `name`, `email`, or `message`
   - Expected: 400 Bad Request

3. **Invalid Email Format**:
   - Invalid email address
   - Expected: Client-side validation error (before submission)

4. **Empty Optional Fields**:
   - Optional fields as empty strings
   - Expected: Converted to `undefined`, 200 OK

5. **Network Error**:
   - Simulate network failure
   - Expected: Client displays network error message

6. **Email Service Down**:
   - Resend API key invalid or service unavailable
   - Expected: 503 Service Unavailable

---

## Changelog

### v1.0 (2025-01-27)
- Initial API contract
- Support for required and optional fields
- Email notifications via Resend
- Optional Supabase integration documented

