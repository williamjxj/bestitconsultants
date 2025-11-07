# Quickstart Guide: Improve CTA and Contact Form

**Feature**: 006-improve-cta-contact  
**Date**: 2025-01-27

## Overview

This guide provides step-by-step instructions to implement the redesigned contact form with
shadcn/ui, simplified fields, CTA integration, and optional Supabase persistence.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Access to project repository
- (Optional) Supabase project credentials if implementing database persistence

## Step 1: Install Dependencies

Install required packages for React Hook Form and form validation:

```bash
npm install react-hook-form @hookform/resolvers
```

## Step 2: Install shadcn/ui Form Component

Install the Form component from shadcn/ui:

```bash
npx shadcn@latest add form
```

This will:

- Install the Form component to `src/components/ui/form.tsx`
- Install required dependencies (if not already installed)

**Verify installation**: Check that `src/components/ui/form.tsx` exists.

## Step 3: Create Type Definitions

Create `src/types/contact.ts`:

```typescript
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
```

## Step 4: Create Validation Schema

Create `src/lib/validations.ts`:

```typescript
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z.string().email('Please enter a valid email address').trim(),
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
  service: z.string().optional().or(z.literal('')),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
```

## Step 5: Create Contact Form Component

Create `src/components/contact/ContactForm.tsx`:

**Key Features**:

- Uses shadcn/ui Form component with React Hook Form
- Reads URL search parameters for auto-filling
- Simplified field structure (required: name, email, message)
- Optional fields in collapsible section
- Real-time validation with error messages
- Multilingual support
- Loading states and error handling

**Implementation Steps**:

1. Import dependencies:
   - `react-hook-form` hooks
   - `zodResolver` from `@hookform/resolvers/zod`
   - shadcn/ui Form components
   - Validation schema
   - Type definitions

2. Create component with:
   - `useSearchParams()` to read URL parameters
   - `useForm()` with Zod resolver
   - `defaultValues` from URL params
   - Form fields with validation
   - Submit handler

3. Handle form submission:
   - Validate form data
   - Send POST request to `/api/contact`
   - Display loading state
   - Show success/error messages
   - Reset form on success

**Example Structure**:

```typescript
'use client'

import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormInput } from '@/lib/validations'
// ... other imports

export function ContactForm() {
  const searchParams = useSearchParams()
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: searchParams.get('message') || '',
      service: searchParams.get('service') || '',
      // ... other fields
    },
  })

  // Form submission handler
  // Form JSX with shadcn/ui components
}
```

## Step 6: Update Contact Page

Update `src/app/contact/page.tsx`:

1. Replace existing form with new `ContactForm` component
2. Remove newsletter checkbox field
3. Keep hero section and contact information sections
4. Update translations if needed

**Changes**:

- Import `ContactForm` component
- Replace form JSX with `<ContactForm />`
- Remove newsletter-related code

## Step 7: Update CTA Links

Update CTA buttons across the site to include URL parameters:

**Homepage** (`src/app/page.tsx`):

```typescript
<Button asChild>
  <a href="/contact?source=homepage&cta=free-consultation">
    Get Free Consultation
  </a>
</Button>
```

**Services Page** (`src/app/services/page.tsx`):

```typescript
<Button asChild>
  <a href="/contact?source=services&service=ai-ml&cta=free-consultation">
    Free Consultation
  </a>
</Button>
```

**Other Pages**: Update CTAs similarly with appropriate `source` and `service` parameters.

## Step 8: Update API Route (Optional - Supabase)

If Supabase is configured, update `src/app/api/contact/route.ts`:

1. Import Supabase client:

   ```typescript
   import { createClient } from '@supabase/supabase-js'
   ```

2. Create Supabase client (if not exists):

   ```typescript
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.SUPABASE_SERVICE_ROLE_KEY!
   )
   ```

3. Save submission to database after email success:

   ```typescript
   await supabase.from('contact_submissions').insert({
     name,
     email,
     message,
     company: company || null,
     phone: phone || null,
     service: service || null,
     source: source || null,
     cta: cta || null,
     submitted_at: new Date().toISOString(),
   })
   ```

4. Handle database errors gracefully (don't fail email if DB fails)

## Step 9: Update Translations

Add form translations to `src/lib/translations.ts`:

Update `translations.contact.form` with:

- Field labels
- Placeholders
- Error messages
- Success/error messages
- Submit button text

**Languages**: English, French, Spanish, Chinese

## Step 10: Testing

### Manual Testing Checklist

1. **Form Validation**:
   - [ ] Submit empty form → Shows validation errors
   - [ ] Enter invalid email → Shows email error
   - [ ] Enter short message (<10 chars) → Shows message error
   - [ ] Fill required fields → Validation passes

2. **CTA Integration**:
   - [ ] Click "Get Free Consultation" from homepage → Form pre-fills with `source=homepage`
   - [ ] Click CTA from services page → Form pre-fills with `service` parameter
   - [ ] Direct URL access with params → Form fields populated

3. **Form Submission**:
   - [ ] Submit valid form → Success message displayed
   - [ ] Submit form → Email sent (check inbox)
   - [ ] Submit form with network error → Error message displayed
   - [ ] Submit form → Form resets on success

4. **Mobile Responsiveness**:
   - [ ] Form displays correctly on mobile (320px+)
   - [ ] Fields are properly sized
   - [ ] Submit button is accessible
   - [ ] No horizontal scrolling

5. **Accessibility**:
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces errors
   - [ ] Form labels are associated with inputs
   - [ ] Error messages are announced

6. **Multilingual**:
   - [ ] Switch language → Form labels update
   - [ ] Error messages in correct language
   - [ ] Success messages in correct language

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Build Test

```bash
npm run build
```

## Step 11: Optional - Supabase Setup

If implementing Supabase persistence:

1. **Create Supabase Project** (if not exists):
   - Go to https://supabase.com
   - Create new project
   - Get project URL and service role key

2. **Add Environment Variables**:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Create Database Table**:

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
   ```

4. **Install Supabase Client**:

   ```bash
   npm install @supabase/supabase-js
   ```

5. **Create Supabase Client Utility**: Create `src/lib/supabase.ts`:

   ```typescript
   import { createClient } from '@supabase/supabase-js'

   export const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.SUPABASE_SERVICE_ROLE_KEY!
   )
   ```

## Troubleshooting

### Form Component Not Found

**Error**: `Cannot find module '@/components/ui/form'`

**Solution**: Run `npx shadcn@latest add form` to install the component.

### React Hook Form Errors

**Error**: `Cannot find module 'react-hook-form'`

**Solution**: Run `npm install react-hook-form @hookform/resolvers`.

### URL Parameters Not Working

**Issue**: Form doesn't pre-fill from URL parameters

**Solution**:

- Ensure `ContactForm` is wrapped in `Suspense` (Next.js 15 requirement)
- Check that `useSearchParams()` is called at component level
- Verify URL format: `/contact?source=homepage&service=ai-ml`

### Validation Errors Not Displaying

**Issue**: Form submits even with invalid data

**Solution**:

- Check Zod schema is correctly imported
- Verify `zodResolver` is properly configured
- Ensure `FormField` components are used (not plain inputs)

### Email Not Sending

**Issue**: Form submission succeeds but no email received

**Solution**:

- Check `RESEND_API_KEY` environment variable
- Verify `BUSINESS_EMAIL` is set
- Check Resend dashboard for email logs
- Verify API route is handling errors correctly

## Next Steps

After implementation:

1. **Monitor Form Submissions**: Track conversion rates
2. **A/B Testing**: Test simplified vs. full form
3. **Analytics**: Track CTA click-through rates
4. **Supabase Integration**: Add if credentials available
5. **Rate Limiting**: Implement to prevent spam

## References

- [shadcn/ui Form Documentation](https://ui.shadcn.com/docs/components/form)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Next.js useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
