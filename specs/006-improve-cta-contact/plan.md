# Implementation Plan: Improve CTA and Contact Form

**Branch**: `006-improve-cta-contact` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)  
**Input**: User requirements to redesign contact form with shadcn/ui, simplify fields, remove
newsletter, integrate with CTAs, and optionally save to Supabase

**Note**: This template is filled in by the `/speckit.plan` command. See
`.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Redesign the contact form using shadcn/ui Form component with React Hook Form for improved UX,
validation, and accessibility. Simplify form fields to reduce friction for first-time visitors.
Remove newsletter subscription field. Integrate CTA buttons ("Get Free Consultation") to pre-fill
form fields via URL parameters. Optionally integrate Supabase for contact data persistence if
available.

## Technical Context

**Language/Version**: TypeScript 5.0+, React 19.0+, Next.js 15.2+  
**Primary Dependencies**:

- shadcn/ui Form component (requires react-hook-form, @hookform/resolvers)
- React Hook Form 7.x+ for form state management
- Zod 3.22.4+ for schema validation (already in package.json)
- Supabase JS client (if Supabase integration is needed - NEEDS CLARIFICATION)
- Next.js App Router for URL search params handling

**Storage**:

- Supabase PostgreSQL (if Supabase is configured - NEEDS CLARIFICATION)
- Current: Resend email service for form submissions (existing)

**Testing**:

- Manual testing for form validation and UX
- TypeScript type checking (tsc --noEmit)
- ESLint validation (max-warnings: 0)

**Target Platform**: Web (Next.js App Router), Browser (modern browsers), Responsive
(mobile-first)  
**Project Type**: Web application (Next.js App Router)

**Performance Goals**:

- Form validation feedback within 500ms (per spec SC-007)
- Form submission success rate ≥95% (per spec SC-005)
- Zero bundle size regression (use dynamic imports if needed)

**Constraints**:

- Must maintain existing `/api/contact` route compatibility
- Must support multilingual (EN, FR, ES, CN)
- Must be accessible (WCAG AA compliance)
- Must work on mobile (320px+ width)
- Zero ESLint warnings required

**Scale/Scope**:

- Single contact form page redesign
- CTA integration across multiple pages (homepage, services, portfolio, case studies)
- Optional Supabase table for contact submissions
- Estimated: 5-7 new/modified files, 1-2 new components

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Next.js App Router Architecture ✅

- Contact form page is client component (`'use client'`) - REQUIRED for form interactivity ✅
- Form submission uses existing `/api/contact/route.ts` - follows App Router conventions ✅
- URL search params will use Next.js `useSearchParams` hook - App Router compatible ✅

### II. TypeScript Strict Mode ✅

- All components use TypeScript with proper type annotations ✅
- Form schema will use Zod for runtime validation and TypeScript inference ✅
- No `any` types will be used ✅

### III. Component-Based Design with shadcn/ui ✅

- Will use shadcn/ui Form component (already available in v4) ✅
- Form will be a functional React component with TypeScript ✅
- Tailwind CSS only (no custom CSS) ✅
- Component structure: `src/components/contact/ContactForm.tsx` ✅

### IV. Performance Optimization Standards ✅

- Form component will use dynamic imports if heavy (not expected) ✅
- No image optimization required for this feature ✅
- Code splitting handled by Next.js automatically ✅

### V. Accessibility & Semantic HTML ✅

- shadcn/ui Form provides accessible form structure ✅
- Form inputs will have proper labels and ARIA attributes ✅
- Error messages will be associated with form fields ✅
- Keyboard navigation will be fully supported ✅

**GATE STATUS**: ✅ PASSED - All constitution requirements met

## Project Structure

### Documentation (this feature)

```text
specs/006-improve-cta-contact/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── contact-api.md   # API contract for contact form
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── contact/
│   │   └── page.tsx                    # Contact page (updated to use new form component)
│   └── api/
│       └── contact/
│           └── route.ts                # Existing API route (may need Supabase integration)
├── components/
│   ├── contact/
│   │   └── ContactForm.tsx             # New shadcn/ui form component
│   └── ui/
│       └── form.tsx                    # shadcn/ui form component (if not exists, install)
├── lib/
│   ├── validations.ts                  # Zod schemas for form validation
│   └── supabase.ts                     # Supabase client (if Supabase integration needed)
└── types/
    └── contact.ts                      # TypeScript types for contact form data
```

**Structure Decision**: Web application using Next.js App Router. Single project structure with
components organized by feature. Contact form component will be extracted to
`src/components/contact/ContactForm.tsx` for reusability. Form validation schemas will be in
`src/lib/validations.ts` using Zod.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
