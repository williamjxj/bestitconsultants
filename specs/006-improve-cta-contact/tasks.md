# Tasks: Improve CTA and Contact Form

**Feature**: 006-improve-cta-contact  
**Branch**: `006-improve-cta-contact`  
**Date**: 2025-01-27

## Overview

This feature implements a redesigned contact form using shadcn/ui Form component with React Hook Form, simplifies form fields for better UX, removes newsletter subscription, integrates CTA buttons with URL parameters for auto-filling, and optionally adds Supabase persistence.

**MVP Scope**: User Story 3 (Contact Form UX) - Complete form redesign with shadcn/ui, validation, and simplified fields.

## Implementation Strategy

- **MVP First**: Start with User Story 3 (Contact Form UX) to deliver immediate value
- **Incremental Delivery**: Add CTA integration (US2) after form is working
- **Optional Enhancement**: Supabase integration can be added later if credentials available
- **Parallel Opportunities**: Type definitions, validation schemas, and translations can be developed in parallel

## Dependencies

### Story Completion Order

1. **User Story 3** (P1) - Contact Form UX → **MUST complete first** (MVP)
2. **User Story 2** (P1) - CTA Integration → Depends on US3 (needs contact form to link to)
3. **Supabase Integration** (Optional) → Can be added anytime after US3

### Independent Test Criteria

- **US3**: Users can submit contact form with validation feedback, success/error states, and mobile responsiveness
- **US2**: CTAs across pages link to contact form with URL parameters that pre-fill form fields
- **Supabase**: Form submissions are saved to database (if implemented)

---

## Phase 1: Setup

**Goal**: Install dependencies and set up project structure for form development.

### Prerequisites

- [x] T001 Verify Node.js 18+ is installed
- [x] T002 Verify npm or yarn package manager is available
- [x] T003 Check current directory is project root `/Users/william.jiang/my-apps/bestitconsultants`

### Dependencies Installation

- [x] T004 [P] Install react-hook-form package: `npm install react-hook-form`
- [x] T005 [P] Install @hookform/resolvers package: `npm install @hookform/resolvers`
- [x] T006 [P] Install shadcn/ui Form component: `npx shadcn@latest add form`
- [x] T007 [P] Verify shadcn/ui Form component exists at `src/components/ui/form.tsx`
- [x] T008 [P] Verify Zod is installed (check `package.json` for `zod` dependency)

---

## Phase 2: Foundational

**Goal**: Create type definitions, validation schemas, and translation structure. These are prerequisites for form implementation.

### Type Definitions

- [x] T009 [P] Create TypeScript types file at `src/types/contact.ts` with ContactFormData, ContactFormURLParams, ContactFormSubmission, and ContactFormStatus interfaces

### Validation Schema

- [x] T010 [P] Create validation schema file at `src/lib/validations.ts` with contactFormSchema using Zod (name, email, message required; company, phone, service optional)

### Translation Updates

- [x] T011 [P] Update translations in `src/lib/translations.ts` to add contact form field labels, placeholders, error messages, and success/error messages for all languages (EN, FR, ES, CN)

### Supabase Client (Optional)

- [x] T012 [P] Create Supabase client utility at `src/lib/supabase.ts` if Supabase credentials are available (check for NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars)

---

## Phase 3: User Story 3 - Improved Contact Form User Experience

**Priority**: P1  
**Goal**: Redesign contact form with shadcn/ui Form component, simplified fields, real-time validation, and improved UX.

**Independent Test**: Users can complete contact form with clear guidance, helpful validation, and immediate feedback on submission status.

### Form Component Development

- [x] T013 [US3] Create ContactForm component at `src/components/contact/ContactForm.tsx` with 'use client' directive
- [x] T014 [US3] Implement useSearchParams hook in ContactForm to read URL query parameters (source, service, cta, message)
- [x] T015 [US3] Set up React Hook Form with useForm hook using zodResolver and contactFormSchema in ContactForm
- [x] T016 [US3] Configure form defaultValues from URL parameters (pre-fill service and message if provided)
- [x] T017 [US3] Implement required form fields (name, email, message) using shadcn/ui FormField, FormItem, FormLabel, FormControl components
- [x] T018 [US3] Implement optional form fields (company, phone, service) in collapsible "Tell us more" section
- [x] T019 [US3] Remove newsletter checkbox field from form
- [x] T020 [US3] Remove budget and timeline dropdown fields from form
- [x] T021 [US3] Add FormMessage components for field-level error display with proper ARIA attributes
- [x] T022 [US3] Implement form submission handler with loading state and form disable during submission
- [x] T023 [US3] Add success message display after successful submission with expected response timeframe
- [x] T024 [US3] Add error message display for submission failures with actionable guidance
- [x] T025 [US3] Implement form reset on successful submission
- [x] T026 [US3] Add debouncing to prevent duplicate submissions (disable submit button during submission)

### Validation & Error Handling

- [x] T027 [US3] Implement real-time validation feedback (error messages appear within 500ms of user input)
- [x] T028 [US3] Add email format validation with clear error message
- [x] T029 [US3] Add required field validation with clear error messages
- [x] T030 [US3] Add message length validation (min 10, max 2000 characters)
- [x] T031 [US3] Add phone format validation for optional phone field (international format)
- [x] T032 [US3] Implement network error handling with retry option and clear error message
- [x] T033 [US3] Handle timeout errors (requests >30 seconds) with appropriate error message

### Mobile Responsiveness

- [x] T034 [US3] Ensure form fields are properly sized for mobile (320px+ width)
- [x] T035 [US3] Set appropriate keyboard types (email keyboard for email field, tel for phone field)
- [x] T036 [US3] Verify no horizontal scrolling on mobile devices
- [x] T037 [US3] Ensure submit button is accessible and properly sized for touch targets

### Accessibility

- [x] T038 [US3] Verify all form fields have associated labels with FormLabel component
- [x] T039 [US3] Ensure error messages are associated with form fields via ARIA attributes
- [x] T040 [US3] Test keyboard navigation (Tab through all fields, Enter to submit)
- [x] T041 [US3] Verify screen reader announces validation errors properly
- [x] T042 [US3] Ensure color contrast meets WCAG AA standards for form elements

### Multilingual Support

- [x] T043 [US3] Integrate LanguageContext in ContactForm to access current language
- [x] T044 [US3] Use translation keys for all form labels, placeholders, and error messages
- [x] T045 [US3] Test form displays correctly in all supported languages (EN, FR, ES, CN)

### Contact Page Integration

- [x] T046 [US3] Update contact page at `src/app/contact/page.tsx` to use new ContactForm component
- [x] T047 [US3] Remove old form implementation from contact page (keep hero section and contact info sections)
- [x] T048 [US3] Remove newsletter-related code from contact page
- [x] T049 [US3] Wrap ContactForm in Suspense boundary for useSearchParams (Next.js 15 requirement)

---

## Phase 4: User Story 2 - Strategic CTA Placement and Messaging

**Priority**: P1  
**Goal**: Integrate CTA buttons with contact form by adding URL parameters that pre-fill form fields.

**Independent Test**: CTAs across pages link to contact form with URL parameters; form fields auto-populate when URL params are present.

### Homepage CTA Updates

- [x] T050 [US2] Update homepage hero CTA in `src/app/page.tsx` to include URL parameters: `/contact?source=homepage&cta=free-consultation`
- [x] T051 [US2] Update homepage carousel CTAs in `src/app/page.tsx` to include URL parameters with appropriate source and cta values

### Services Page CTA Updates

- [x] T052 [US2] Update services page CTAs in `src/app/services/page.tsx` to include URL parameters: `/contact?source=services&service={serviceId}&cta=free-consultation`
- [x] T053 [US2] Map service categories to service IDs in CTA links (use service category IDs from serviceCategories.ts)

### Portfolio/Case Studies CTA Updates

- [x] T054 [US2] Update portfolio page CTAs in `src/app/portfolio/page.tsx` to include URL parameters: `/contact?source=portfolio&cta=get-quote`
- [x] T055 [US2] Update case studies page CTAs in `src/app/case-studies/page.tsx` to include URL parameters: `/contact?source=case-studies&cta=start-project`

### Content Sections CTA Updates

- [x] T056 [US2] Update content sections CTAs in `src/data/contentSections.ts` to include URL parameters in ctaLink fields
- [x] T057 [US2] Update hero section CTAs in `src/components/ui/hero-variants.tsx` if needed to support URL parameters

### CTA URL Parameter Validation

- [ ] T058 [US2] Verify ContactForm correctly handles all valid source values (homepage, services, portfolio, case-studies, about)
- [ ] T059 [US2] Verify ContactForm correctly handles all valid cta values (free-consultation, get-quote, start-project, schedule-call)
- [ ] T060 [US2] Verify ContactForm ignores invalid URL parameters and uses defaults

---

## Phase 5: Optional - Supabase Integration

**Priority**: Optional  
**Goal**: Add Supabase database persistence for contact form submissions.

**Independent Test**: Form submissions are saved to Supabase contact_submissions table; submissions can be queried.

### Database Schema

- [x] T061 Apply Supabase migration to create contact_submissions table with schema from data-model.md (id, name, email, message, company, phone, service, source, cta, ip_address, submitted_at, created_at)
- [x] T062 Create indexes on contact_submissions table (email, submitted_at DESC, source)

### API Route Updates

- [x] T063 Update contact API route at `src/app/api/contact/route.ts` to import Supabase client from `src/lib/supabase.ts`
- [x] T064 Add Supabase insert operation after successful email send in contact API route
- [x] T065 Handle database errors gracefully (log error but don't fail email submission)
- [x] T066 Extract IP address from request headers (x-forwarded-for) for database storage

### Environment Variables

- [ ] T067 Add NEXT_PUBLIC_SUPABASE_URL to `.env.local` file
- [ ] T068 Add SUPABASE_SERVICE_ROLE_KEY to `.env.local` file
- [ ] T069 Verify environment variables are not exposed in frontend code

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Final touches, testing, and documentation.

### Code Quality

- [x] T070 Run TypeScript type check: `npm run type-check` and fix any errors
- [x] T071 Run ESLint: `npm run lint` and fix any warnings (target: zero warnings)
- [x] T072 Run Prettier format check: `npm run format:check` and fix formatting issues
- [x] T073 Verify all imports follow ESLint import/order rules

### Testing

- [ ] T074 Test form submission with valid data (all required fields)
- [ ] T075 Test form validation with invalid email format
- [ ] T076 Test form validation with missing required fields
- [ ] T077 Test form validation with message too short (<10 characters)
- [ ] T078 Test form validation with message too long (>2000 characters)
- [ ] T079 Test form submission with optional fields filled
- [ ] T080 Test form submission with optional fields empty
- [ ] T081 Test CTA integration from homepage (verify URL params pre-fill form)
- [ ] T082 Test CTA integration from services page (verify service pre-filled)
- [ ] T083 Test form on mobile device (320px width) - verify no horizontal scrolling
- [ ] T084 Test form accessibility with keyboard navigation
- [ ] T085 Test form in all supported languages (EN, FR, ES, CN)
- [ ] T086 Test network error handling (simulate network failure)
- [ ] T087 Test form submission success flow (verify email sent, success message shown)
- [ ] T088 Test form submission error flow (simulate API error, verify error message)

### Documentation

- [ ] T089 Update README.md if needed with new form dependencies
- [ ] T090 Document environment variables needed for Supabase (if implemented)
- [ ] T091 Verify all code follows project constitution (Next.js App Router, TypeScript strict, shadcn/ui, Tailwind CSS only)

### Build Verification

- [ ] T092 Run production build: `npm run build` and verify no build errors
- [ ] T093 Verify bundle size hasn't increased significantly (check for any regressions)
- [ ] T094 Test form in production build locally: `npm run start`

---

## Parallel Execution Examples

### Example 1: Foundational Tasks (Can run in parallel)

```bash
# Terminal 1
T009 - Create types/contact.ts

# Terminal 2  
T010 - Create lib/validations.ts

# Terminal 3
T011 - Update translations.ts
```

### Example 2: Form Component Development (Sequential within component)

Tasks T013-T049 should be completed sequentially as they build on each other within the ContactForm component.

### Example 3: CTA Updates (Can run in parallel after form is complete)

```bash
# Terminal 1
T050, T051 - Homepage CTAs

# Terminal 2
T052, T053 - Services page CTAs

# Terminal 3
T054, T055 - Portfolio/Case studies CTAs

# Terminal 4
T056, T057 - Content sections CTAs
```

---

## Task Summary

- **Total Tasks**: 94
- **Setup Tasks**: 8 (T001-T008)
- **Foundational Tasks**: 4 (T009-T012)
- **User Story 3 Tasks**: 37 (T013-T049)
- **User Story 2 Tasks**: 11 (T050-T060)
- **Supabase Tasks**: 9 (T061-T069)
- **Polish Tasks**: 25 (T070-T094)

### MVP Scope (Minimum Viable Product)

Complete Phases 1-3 for initial delivery:
- Setup (T001-T008)
- Foundational (T009-T012)
- User Story 3 - Contact Form (T013-T049)

**Estimated MVP Tasks**: 49 tasks

### Next Steps After MVP

1. Phase 4: CTA Integration (US2) - 11 tasks
2. Phase 5: Supabase Integration (Optional) - 9 tasks
3. Phase 6: Polish & Testing - 25 tasks

---

## Notes

- All tasks follow strict checklist format with Task ID, optional [P] marker, optional [Story] label, and file paths
- Tasks marked with [P] can be executed in parallel with other [P] tasks
- Tasks without [P] should be completed sequentially
- User Story labels ([US2], [US3]) map to user stories from spec.md
- File paths are absolute or relative to project root
- Supabase integration (Phase 5) is optional and can be skipped if credentials are not available

