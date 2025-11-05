# Data Model: Contact Form

**Feature**: 006-improve-cta-contact  
**Date**: 2025-01-27

## Entities

### ContactFormSubmission

Represents a contact form submission from a user.

**Fields**:

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `name` | `string` | Yes | min: 2, max: 100 | User's full name |
| `email` | `string` | Yes | valid email format | User's email address |
| `message` | `string` | Yes | min: 10, max: 2000 | User's inquiry message |
| `company` | `string` | No | max: 100 | Company name (optional) |
| `phone` | `string` | No | valid phone format | Phone number (optional, international format) |
| `service` | `string` | No | enum: service options | Service interest category (optional) |
| `source` | `string` | No | enum: cta sources | Where the form was accessed from (URL param) |
| `cta` | `string` | No | enum: cta types | Which CTA button was clicked (URL param) |
| `submittedAt` | `Date` | Yes | - | Timestamp of submission (server-side) |
| `ipAddress` | `string` | No | - | User's IP address (server-side, optional) |

**Validation Rules**:
- Name must be at least 2 characters and not exceed 100 characters
- Email must be valid email format (RFC 5322 compliant)
- Message must be at least 10 characters (to avoid spam) and not exceed 2000 characters
- Phone, if provided, must be valid international phone format
- Service must be one of predefined service categories
- All fields are trimmed (whitespace removed) before validation

**State Transitions**:
1. **Draft** → Form is being filled out (client-side only)
2. **Validating** → Form submission initiated, validation in progress
3. **Submitting** → Form data sent to API, awaiting response
4. **Success** → Form submitted successfully, email sent
5. **Error** → Form submission failed, error message displayed

---

### ContactFormURLParams (URL Query Parameters)

Represents URL search parameters passed from CTA buttons to contact form.

**Fields**:

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `source` | `string` | No | Page where CTA was clicked | `homepage`, `services`, `portfolio`, `case-studies` |
| `service` | `string` | No | Service category identifier | `ai-ml`, `web-dev`, `mobile`, `cloud`, `consulting` |
| `cta` | `string` | No | CTA button identifier | `free-consultation`, `get-quote`, `start-project` |
| `message` | `string` | No | Pre-filled message template | Pre-written inquiry text |

**URL Format**:
```
/contact?source=homepage&service=ai-ml&cta=free-consultation
/contact?source=services&service=web-dev
/contact?cta=get-quote
```

**Validation**:
- `source` must be one of: `homepage`, `services`, `portfolio`, `case-studies`, `about`
- `service` must match service category IDs from `serviceCategories.ts`
- `cta` must be one of: `free-consultation`, `get-quote`, `start-project`, `schedule-call`
- `message` is optional and can be any string (will be sanitized)

---

### ServiceCategory (Reference)

Service categories that can be pre-filled in contact form.

**Source**: `src/data/serviceCategories.ts`

**Categories** (from existing data):
- AI & Machine Learning
- Web Development
- Mobile Development
- Cloud Solutions
- DevOps & CI/CD
- Consulting

**Mapping**:
- Service category `id` maps to `service` URL parameter
- Service category `name` displays in form dropdown

---

## Relationships

```
ContactFormSubmission
  ├── source → Page where CTA was clicked (optional)
  ├── service → ServiceCategory.id (optional, if service selected)
  └── cta → CTA button identifier (optional)
```

---

## Database Schema (Optional - Supabase)

If Supabase integration is implemented:

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  company VARCHAR(100),
  phone VARCHAR(50),
  service VARCHAR(50),
  source VARCHAR(50),
  cta VARCHAR(50),
  ip_address INET,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX idx_contact_submissions_source ON contact_submissions(source);
```

**Notes**:
- `id`: UUID for unique identification
- `submitted_at`: When form was submitted
- `created_at`: When record was created (same as submitted_at for new records)
- Indexes on `email` (for duplicate detection), `submitted_at` (for sorting), `source` (for analytics)

---

## TypeScript Types

```typescript
// src/types/contact.ts

export interface ContactFormData {
  name: string
  email: string
  message: string
  company?: string
  phone?: string
  service?: string
}

export interface ContactFormURLParams {
  source?: 'homepage' | 'services' | 'portfolio' | 'case-studies' | 'about'
  service?: string
  cta?: 'free-consultation' | 'get-quote' | 'start-project' | 'schedule-call'
  message?: string
}

export interface ContactFormSubmission extends ContactFormData {
  source?: string
  cta?: string
  submittedAt: Date
  ipAddress?: string
}

export type ContactFormStatus = 
  | 'draft'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error'
```

---

## Validation Schema (Zod)

```typescript
// src/lib/validations.ts

import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters')
    .trim(),
  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      'Please enter a valid phone number'
    )
    .trim()
    .optional()
    .or(z.literal('')),
  service: z
    .string()
    .optional()
    .or(z.literal('')),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
```

---

## Data Flow

1. **User clicks CTA** → URL with query parameters generated
   - Example: `/contact?source=homepage&service=ai-ml&cta=free-consultation`

2. **Contact page loads** → Reads URL parameters via `useSearchParams()`
   - Extracts: `source`, `service`, `cta`, `message`
   - Pre-fills form fields if parameters exist

3. **User fills form** → React Hook Form manages state
   - Real-time validation via Zod schema
   - Error messages displayed per field

4. **User submits** → Form data validated
   - Client-side: Zod schema validation
   - Server-side: API route validates again

5. **API processes** → `/api/contact/route.ts`
   - Validates required fields
   - Sends email via Resend (existing)
   - Optionally saves to Supabase (if configured)

6. **Response** → Success or error message displayed
   - Success: Form resets, success message shown
   - Error: Error message displayed, form remains filled

---

## Edge Cases

1. **Invalid URL parameters**: Ignore invalid values, use defaults
2. **Duplicate submissions**: Debounce submit button, disable during submission
3. **Network errors**: Display error message, allow retry
4. **Very long messages**: Truncate to 2000 characters before validation
5. **Special characters**: Properly encode/decode URL parameters
6. **Empty optional fields**: Convert empty strings to `undefined` before submission

