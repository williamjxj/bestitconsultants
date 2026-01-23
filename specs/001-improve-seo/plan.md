# Implementation Plan: Improve SEO

**Branch**: `001-improve-seo` | **Date**: 2026-01-23 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-improve-seo/spec.md`

## Summary

Implement comprehensive SEO improvements for BestIT Consultants website including complete metadata coverage for all pages, enhanced structured data (Organization, Service, Article, BreadcrumbList), improved sitemap with proper priorities, breadcrumb navigation, and social media optimization. The implementation uses Next.js 15 App Router Metadata API, JSON-LD structured data, and follows Schema.org best practices to improve search engine visibility and rich result display.

## Technical Context

**Language/Version**: TypeScript 5.0+ (strict mode enabled)  
**Primary Dependencies**: Next.js 15.2.8, React 19, Next.js Metadata API  
**Storage**: N/A (static metadata configuration)  
**Testing**: Manual validation using Google Rich Results Test, Facebook Debugger, Twitter Card Validator, Lighthouse SEO audit  
**Target Platform**: Web (Next.js App Router, server-side rendering)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Lighthouse SEO score >95, zero bundle size impact for metadata (server-side only)  
**Constraints**: Must maintain TypeScript strict mode compliance, zero ESLint warnings, all metadata must be server-side rendered  
**Scale/Scope**: 7 public pages (homepage, services, portfolio, case studies, team, testimonials, contact), all requiring unique metadata and structured data

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### ✅ I. Next.js App Router Architecture
- **Status**: PASS
- **Compliance**: All metadata will use Next.js 15 App Router `metadata` export in `layout.tsx` files. No custom Head components. Server Components by default.

### ✅ II. TypeScript Strict Mode
- **Status**: PASS
- **Compliance**: All new code will have proper TypeScript types. No `any` types. All utilities will be type-safe with proper interfaces.

### ✅ III. Component-Based Design with shadcn/ui
- **Status**: PASS
- **Compliance**: Breadcrumb component will be a functional React component using TypeScript. Uses Tailwind CSS utility classes exclusively.

### ✅ IV. Performance Optimization Standards
- **Status**: PASS
- **Compliance**: All metadata is server-side rendered with zero client-side JavaScript. No bundle size impact. Sitemap generation is server-side only.

### ✅ V. Accessibility & Semantic HTML
- **Compliance**: Breadcrumb component uses semantic HTML (`<nav>`, `<ol>`, `<li>`). All images will have descriptive alt text. ARIA labels where appropriate.

**Constitution Check Result**: ✅ ALL GATES PASS

## Project Structure

### Documentation (this feature)

```text
specs/001-improve-seo/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout (update Organization structured data)
│   ├── page.tsx           # Homepage (already has metadata)
│   ├── services/
│   │   └── layout.tsx     # Services page metadata + Service structured data
│   ├── portfolio/
│   │   └── layout.tsx    # Portfolio page metadata
│   ├── case-studies/
│   │   └── layout.tsx    # Case studies metadata + Article structured data
│   ├── our-team/
│   │   └── layout.tsx    # Team page metadata
│   ├── testimonials/
│   │   └── layout.tsx    # Testimonials page metadata
│   ├── contact-us/
│   │   └── layout.tsx    # Contact page metadata
│   ├── sitemap.ts        # Sitemap generation (update with all pages, fix duplicates, add priorities)
│   └── robots.ts         # Robots.txt (already configured, verify)
├── components/
│   └── seo/
│       ├── Breadcrumb.tsx        # Breadcrumb navigation component (NEW)
│       └── StructuredData.tsx    # Existing structured data component (enhance)
├── lib/
│   ├── seo-utils.ts              # SEO utility functions (NEW)
│   │   ├── buildPageMetadata()  # Metadata builder with fallbacks
│   │   ├── getCanonicalUrl()     # Canonical URL generator
│   │   └── validateMetadata()    # Metadata validation
│   └── structured-data.ts        # Structured data utilities (NEW)
│       ├── createOrganizationSchema()
│       ├── createServiceSchema()
│       ├── createArticleSchema()
│       ├── createBreadcrumbSchema()
│       └── structuredDataScript() # JSON-LD script generator
└── types/
    └── seo.ts            # SEO type definitions (enhance existing)
        ├── PageMetadata
        ├── StructuredDataSchema
        └── BreadcrumbItem
```

**Structure Decision**: Single Next.js App Router project. All SEO functionality is server-side rendered through Next.js Metadata API and React Server Components. No client-side JavaScript required for SEO features. Utilities are organized in `lib/` directory following existing project structure.

## Complexity Tracking

> **No violations detected - all gates pass**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | --------- | ------------------------------------ |
| N/A | N/A | N/A |

## Phase 0: Research Complete ✅

All research decisions documented in `research.md`:
- Next.js Metadata API strategy
- JSON-LD structured data format
- Sitemap generation approach
- Breadcrumb implementation
- Metadata fallback strategy
- Image alt text requirements
- Schema.org type selection
- Canonical URL strategy

## Phase 1: Design & Contracts

See generated artifacts:
- `data-model.md` - Data structures and entity definitions
- `contracts/` - API contracts for SEO utilities
- `quickstart.md` - Developer quick start guide
