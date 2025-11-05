# Research: Improve CTA and Contact Form

**Date**: 2025-01-27  
**Feature**: 006-improve-cta-contact

## Research Tasks

### 1. Supabase Integration Status

**Question**: Is Supabase configured and available in this project?

**Research Findings**:
- Searched codebase for Supabase references: Only found one mention in `.cursorignore` (supabase/.temp/, supabase/.env, supabase/migrations/)
- Searched `package.json`: No `@supabase/supabase-js` dependency found
- Constitution mentions Supabase as backend service for "authentication and database when applicable"
- Current contact form uses Resend email service only
- No Supabase client initialization found in codebase

**Decision**: Supabase is **NOT currently configured**. The project references Supabase in documentation but does not have it installed or configured.

**Rationale**: 
- Supabase integration is optional per user requirements ("if supabase still available")
- Current implementation uses Resend for email notifications, which is working
- Adding Supabase would require:
  1. Installing `@supabase/supabase-js` package
  2. Creating Supabase project and getting credentials
  3. Setting up database schema for contacts table
  4. Configuring environment variables
  5. Creating Supabase client utility

**Alternatives Considered**:
1. **Use Resend only** (current approach) - Simple, already working, no database needed
2. **Add Supabase for persistence** - Better for lead tracking, analytics, duplicate detection
3. **Hybrid approach** - Save to Supabase AND send email via Resend

**Recommendation**: Implement form redesign first with Resend only. Add Supabase integration as optional enhancement if user confirms Supabase credentials are available.

---

### 2. shadcn/ui Form Component Installation

**Question**: Does the project already have shadcn/ui Form component installed?

**Research Findings**:
- Checked `src/components/ui/` directory: No `form.tsx` file found
- shadcn/ui v4 has Form component available (confirmed via MCP)
- Form component requires:
  - `react-hook-form` (NOT in package.json currently)
  - `@hookform/resolvers` (for Zod integration)
  - `@radix-ui/react-label` (already installed: `@radix-ui/react-label@^2.1.7`)
  - `@radix-ui/react-slot` (already installed: `@radix-ui/react-slot@^1.2.3`)

**Decision**: Form component needs to be installed via shadcn/ui CLI.

**Rationale**: 
- Form component is a core shadcn/ui component that provides:
  - React Hook Form integration
  - Accessible form structure
  - Error handling and validation display
  - TypeScript support

**Installation Steps**:
```bash
npx shadcn@latest add form
npm install react-hook-form @hookform/resolvers
```

**Alternatives Considered**:
1. **Build custom form** - More work, less accessible, reinventing wheel
2. **Use shadcn/ui Form** - Industry standard, accessible, well-tested ✅

---

### 3. Form Field Simplification Strategy

**Question**: Which fields should be kept vs removed to reduce friction?

**Current Fields**:
- name (required)
- email (required)
- company (optional)
- phone (optional)
- service (optional dropdown)
- budget (optional dropdown)
- timeline (optional dropdown)
- message (required)
- newsletter (to be removed)

**User Requirement**: "reduce the form fields, make it simpler, consider customers dont want to expose their information at first time contacting"

**Decision**: Minimal contact form with only essential fields.

**Simplified Field Structure**:
- **Required**: name, email, message
- **Optional (hidden/collapsible)**: company, phone, service interest
- **Removed**: budget, timeline, newsletter

**Rationale**:
- First contact should be frictionless - name, email, message are sufficient
- Optional fields can be in an "Advanced" or "Tell us more" collapsible section
- Budget and timeline feel too sales-focused for initial contact
- Newsletter removed per user requirement

**Alternatives Considered**:
1. **All fields optional except email** - Too minimal, no context
2. **Keep all fields** - Too much friction for first contact
3. **Two-step form** - Complex, adds steps
4. **Simplified with optional expansion** - Best balance ✅

---

### 4. CTA Integration with URL Parameters

**Question**: How should CTAs pass data to contact form for auto-filling?

**Research Findings**:
- Next.js App Router uses `useSearchParams` hook for URL query parameters
- CTAs appear on: homepage hero, services page, portfolio page, case studies
- CTA text: "Get Free Consultation", "Get a Free Quote", "Start Your Project"

**Decision**: Use URL search parameters to pre-fill form fields.

**URL Parameter Structure**:
```
/contact?source=homepage&service=ai-ml&cta=free-consultation
```

**Supported Parameters**:
- `source`: Where the CTA was clicked (homepage, services, portfolio, case-studies)
- `service`: Service category if applicable (ai-ml, web-dev, mobile, cloud, etc.)
- `cta`: CTA identifier (free-consultation, get-quote, start-project)
- `message`: Pre-filled message template (optional)

**Implementation**:
- Contact page reads `useSearchParams()` to get URL parameters
- Form component uses `defaultValues` from URL params
- Form fields auto-populate on mount if params exist

**Rationale**:
- Simple, no state management needed
- Works across page navigations
- Shareable URLs for specific service inquiries
- No backend changes required

**Alternatives Considered**:
1. **Local storage** - Persists across sessions, but more complex
2. **Context API** - Overkill for this use case
3. **URL parameters** - Simple, shareable, standard approach ✅

---

### 5. Form Validation Strategy

**Question**: What validation rules should be applied to form fields?

**Decision**: Use Zod schema with React Hook Form resolver.

**Validation Rules**:
- **name**: Required, min 2 characters, max 100 characters
- **email**: Required, valid email format
- **message**: Required, min 10 characters, max 2000 characters
- **company**: Optional, max 100 characters if provided
- **phone**: Optional, valid phone format if provided (international format)
- **service**: Optional, must be one of predefined service options

**Rationale**:
- Zod provides type-safe validation
- React Hook Form integration via `@hookform/resolvers/zod`
- Real-time validation feedback
- Error messages can be multilingual

**Alternatives Considered**:
1. **HTML5 validation only** - Less control, basic error messages
2. **Custom validation functions** - More code, less type-safe
3. **Zod schema** - Type-safe, composable, well-tested ✅

---

### 6. Multilingual Support for Form

**Question**: How should form labels and validation messages support multiple languages?

**Decision**: Use existing translation system (`LanguageContext` and `translations.ts`).

**Current Translation Support**:
- Languages: English (en), French (fr), Spanish (es), Chinese (cn)
- Translation structure: `translations.contact.form.*`

**Form Translation Keys Needed**:
```typescript
translations.contact.form = {
  title: string
  subtitle: string
  fields: {
    name: { label, placeholder, error }
    email: { label, placeholder, error }
    message: { label, placeholder, error }
    company: { label, placeholder }
    phone: { label, placeholder, error }
    service: { label, placeholder, options }
  }
  submit: string
  success: string
  error: string
}
```

**Rationale**:
- Leverages existing translation infrastructure
- Consistent with rest of application
- No new dependencies needed

---

## Summary of Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Supabase Integration | Optional (not installed) | Current Resend email works; Supabase can be added later if credentials available |
| Form Component | Install shadcn/ui Form | Industry standard, accessible, well-tested |
| Form Fields | Minimal (name, email, message) + optional expansion | Reduces friction for first contact |
| CTA Integration | URL search parameters | Simple, shareable, no state management needed |
| Validation | Zod + React Hook Form | Type-safe, composable, good error handling |
| Multilingual | Existing translation system | Consistent with app, no new dependencies |

## Dependencies to Install

```json
{
  "react-hook-form": "^7.53.0",
  "@hookform/resolvers": "^3.9.0"
}
```

**Note**: Supabase integration is deferred until user confirms credentials are available.

