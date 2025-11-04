<!--
Sync Impact Report:
- Version: 1.0.0 (initial version)
- Principles added: 5 core principles established
- Sections added: Technology Stack, Development Workflow, Quality Assurance
- Templates requiring updates:
  ✅ plan-template.md (constitution check section exists)
  ✅ spec-template.md (aligned with Next.js patterns)
  ✅ tasks-template.md (aligned with development workflow)
- Follow-up TODOs: None
-->

# BestITConsultants Constitution

## Core Principles

### I. Next.js App Router Architecture

All features MUST follow Next.js 15 App Router conventions. Server Components are the default;
Client Components require explicit 'use client' directive. Route handlers MUST be placed in
`app/api/[route]/route.ts`. Pages MUST export default functions. File and folder names MUST use
kebab-case. Server components SHOULD handle data fetching; Client components SHOULD handle
interactivity and browser APIs. Rationale: App Router provides optimal performance through
server-side rendering and automatic code splitting.

### II. TypeScript Strict Mode (NON-NEGOTIABLE)

TypeScript strict mode MUST be enabled. All code MUST pass `tsc --noEmit` with zero errors. Use of
`any` type is PROHIBITED except in exceptional cases with explicit justification. All exported
functions and components MUST have TypeScript type annotations or JSDoc comments. Implicit any MUST
be avoided through proper type definitions. Rationale: Type safety prevents runtime errors and
improves code maintainability and developer experience.

### III. Component-Based Design with shadcn/ui

UI components MUST be functional React components using TypeScript. Prefer shadcn/ui components for
UI primitives; fall back to Headless UI only if required components are missing. All components MUST
be self-contained and reusable. Components MUST use Tailwind CSS utility classes exclusively; custom
CSS is PROHIBITED unless explicitly required. Component files MUST be in `src/components/` with
clear organizational structure. Rationale: Component-based architecture enables reusability,
maintainability, and consistent UI patterns.

### IV. Performance Optimization Standards

Image optimization MUST use Next.js Image component with appropriate `remotePatterns` configuration.
Bundle splitting MUST be configured in `next.config.js`. Dynamic imports MUST be used for heavy
components or libraries. Code splitting MUST be enforced for route-based and component-based chunks.
Performance budgets SHOULD be monitored through build analysis. Lazy loading MUST be implemented for
below-the-fold content. Rationale: Performance directly impacts user experience and SEO rankings.

### V. Accessibility & Semantic HTML

All components MUST generate accessible, semantic HTML. ARIA attributes MUST be included when
needed. Interactive elements MUST be keyboard navigable. Color contrast MUST meet WCAG AA standards.
Form inputs MUST have associated labels. Images MUST include descriptive alt text. Semantic HTML5
elements MUST be used appropriately (header, nav, main, article, section, footer). Rationale:
Accessibility ensures legal compliance and inclusive user experience for all users.

## Technology Stack Standards

**Core Framework**: Next.js 15.2+ (App Router), React 19+, TypeScript 5.0+

**Styling**: Tailwind CSS 3.4+ exclusively; no custom CSS files except global styles

**UI Components**: shadcn/ui (Radix UI primitives), Lucide React icons, Framer Motion for animations

**Backend Services**: Supabase for authentication and database when applicable; Cloudflare R2 for
media storage

**Code Quality**: ESLint with strict rules, Prettier for formatting, TypeScript strict mode

**Environment Variables**: Use `.env.local` for runtime configuration; NEVER expose secrets in
frontend code; use Next.js `process.env` conventions

## Development Workflow

**Code Quality Gates**: All code MUST pass `npm run check-all` (type-check, lint, format-check,
markdown-lint) before commit. Zero ESLint warnings allowed (max-warnings: 0).

**Component Structure**: Server components by default; Client components only when necessary. Clear
separation between data fetching (server) and interactivity (client).

**Import Organization**: Imports MUST follow ESLint import/order rules: builtin → external →
internal → parent → sibling → index, with newlines between groups, alphabetized.

**File Naming**: All files and folders MUST use kebab-case. Component files MUST use PascalCase for
component names but kebab-case for file names.

**Git Workflow**: Feature branches from `main`; meaningful commit messages following conventional
commits format.

## Quality Assurance

**Type Safety**: TypeScript compilation MUST pass with zero errors before merge.

**Linting**: ESLint MUST pass with zero warnings. All React hooks rules MUST be followed. Import
rules MUST be enforced.

**Formatting**: Prettier MUST format all code consistently. Pre-commit hooks SHOULD enforce
formatting.

**Accessibility Testing**: Components SHOULD be tested with screen readers. Automated accessibility
checks SHOULD be integrated.

**Performance Monitoring**: Bundle size analysis SHOULD be performed before production deployment.
Core Web Vitals SHOULD be monitored.

## Governance

This constitution supersedes all other development practices. Amendments require:

1. Documentation of the proposed change and rationale
2. Review and approval from project maintainers
3. Update to this constitution file with version increment
4. Propagation of changes to dependent templates and documentation
5. Migration plan for existing code if principles are modified

**Versioning Policy**: Semantic versioning (MAJOR.MINOR.PATCH):

- MAJOR: Backward incompatible principle removals or redefinitions
- MINOR: New principle/section added or materially expanded guidance
- PATCH: Clarifications, wording improvements, typo fixes

All PRs and code reviews MUST verify compliance with this constitution. Complexity MUST be justified
when deviating from principles. Use `.cursor/rules/` directory for runtime development guidance and
specific implementation patterns.

**Version**: 1.0.0 | **Ratified**: 2025-10-14 | **Last Amended**: 2025-11-02
