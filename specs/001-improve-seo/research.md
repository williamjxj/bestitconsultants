# SEO Implementation Research

**Feature**: Improve SEO  
**Date**: 2026-01-23  
**Status**: Complete

## Research Decisions

### Decision 1: Next.js Metadata API vs. Custom Head Components

**Decision**: Use Next.js 15 App Router Metadata API exclusively for all SEO metadata

**Rationale**:
- Next.js 15 App Router provides built-in `metadata` export that automatically generates optimal `<head>` tags
- Server-side rendering ensures metadata is available for crawlers
- Type-safe with TypeScript support
- Automatic Open Graph and Twitter Card generation
- No client-side JavaScript required for metadata
- Follows Next.js best practices and constitution requirements

**Alternatives Considered**:
- Custom `<Head>` component from `next/head` - Deprecated in App Router
- React Helmet - Client-side only, not optimal for SEO
- Manual HTML injection - Error-prone and not type-safe

**Implementation**: Export `metadata` object from page `layout.tsx` files using Next.js `Metadata` type

---

### Decision 2: Structured Data Format (JSON-LD vs. Microdata vs. RDFa)

**Decision**: Use JSON-LD (JavaScript Object Notation for Linked Data) format for all structured data

**Rationale**:
- Google's recommended format for structured data
- Clean separation from HTML markup
- Easy to validate and debug
- Type-safe with TypeScript interfaces
- Can be placed in `<head>` or `<body>` without affecting page rendering
- Better maintainability than inline microdata attributes

**Alternatives Considered**:
- Microdata (HTML attributes) - Clutters HTML, harder to maintain
- RDFa - More complex, less widely supported

**Implementation**: Use `<script type="application/ld+json">` tags with JSON-LD structured data objects

---

### Decision 3: Sitemap Generation Strategy

**Decision**: Use Next.js built-in `sitemap.ts` route handler with dynamic generation

**Rationale**:
- Next.js 15 provides `MetadataRoute.Sitemap` type for type-safe sitemap generation
- Automatic XML generation and proper content-type headers
- Can be dynamically generated at build time or request time
- No external dependencies required
- Follows Next.js App Router conventions

**Alternatives Considered**:
- Static XML file - Requires manual updates, error-prone
- Third-party library (next-sitemap) - Additional dependency, may conflict with App Router
- External service - Unnecessary complexity for this use case

**Implementation**: Create `app/sitemap.ts` that exports default function returning `MetadataRoute.Sitemap` array

---

### Decision 4: Breadcrumb Implementation Strategy

**Decision**: Implement breadcrumbs as React component with both visual navigation and structured data

**Rationale**:
- Provides user navigation benefits (UX) and SEO benefits (structured data)
- Can be reused across all pages
- Type-safe with TypeScript
- Follows accessibility best practices with semantic HTML
- Structured data helps search engines understand site hierarchy

**Alternatives Considered**:
- Structured data only (no visual breadcrumbs) - Loses UX benefits
- Visual only (no structured data) - Loses SEO benefits
- Third-party library - Unnecessary dependency for simple component

**Implementation**: Create reusable `Breadcrumb` component in `src/components/seo/` that renders both visual navigation and JSON-LD structured data

---

### Decision 5: Metadata Fallback Strategy

**Decision**: Use homepage metadata as fallback for all missing page-specific metadata fields

**Rationale**:
- Ensures no page has empty or broken metadata
- Provides consistent branding across all pages
- Simple to implement and maintain
- Better than generic fallbacks that don't represent the business
- Aligns with specification clarification

**Alternatives Considered**:
- Generic fallbacks - Less representative of actual business
- Page-specific defaults - More complex, requires more configuration
- No fallbacks - Risk of empty metadata breaking SEO

**Implementation**: Create utility function that merges page-specific metadata with homepage defaults

---

### Decision 6: Image Alt Text Strategy

**Decision**: Require descriptive alt text for all images, with empty alt for decorative images only

**Rationale**:
- Improves accessibility (WCAG 2.1 AA compliance)
- Helps search engines understand image content
- Empty alt for decorative images prevents screen reader verbosity
- Type-safe with TypeScript requiring alt prop

**Alternatives Considered**:
- Always require alt text - May be verbose for decorative images
- Optional alt text - Accessibility and SEO risk
- Auto-generated alt text - Less accurate than manual descriptions

**Implementation**: Enforce alt text requirement in TypeScript types and component props, use empty string for decorative images

---

### Decision 7: Schema.org Type Selection

**Decision**: Use specific Schema.org types per page type:
- Organization (homepage)
- WebPage (all pages)
- BreadcrumbList (all pages with breadcrumbs)
- Service (services page)
- Article (case studies page)

**Rationale**:
- Specific types provide better search result enhancements
- Google supports rich results for these types
- Clear semantic meaning for each page type
- Follows Schema.org best practices

**Alternatives Considered**:
- Generic types only - Less rich result potential
- Too many types per page - May confuse search engines
- Custom types - Not supported by search engines

**Implementation**: Create type-safe utility functions for each Schema.org type with required and optional fields

---

### Decision 8: Canonical URL Strategy

**Decision**: Use absolute URLs for all canonical tags, pointing to production domain

**Rationale**:
- Prevents duplicate content issues
- Clear indication of preferred page version
- Works correctly across all environments
- Required by search engines for proper indexing

**Alternatives Considered**:
- Relative URLs - May cause issues in different environments
- No canonical URLs - Risk of duplicate content penalties
- Dynamic based on environment - Unnecessary complexity

**Implementation**: Use `getBaseUrl()` utility to generate absolute URLs for all canonical tags

---

## Technical Patterns

### Metadata Pattern
```typescript
// app/[page]/layout.tsx
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'Page Title',
  description: 'Page description',
  path: '/page-path',
})
```

### Structured Data Pattern
```typescript
// Component or layout
import { structuredDataScript } from '@/lib/structured-data'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  // ... properties
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: structuredDataScript(schema) }}
/>
```

### Breadcrumb Pattern
```typescript
// Component usage
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Current Page', href: '/services/current' },
  ]}
/>
```

---

## References

- [Next.js Metadata API Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [BreadcrumbList Schema](https://schema.org/BreadcrumbList)
- [SEO Reference Document](../docs/reference/seo-1.md)

---

## Validation Requirements

All implementations must pass:
1. Google Rich Results Test for structured data
2. Facebook Sharing Debugger for Open Graph
3. Twitter Card Validator for Twitter Cards
4. Schema.org Validator for JSON-LD
5. Lighthouse SEO audit (target: >95)
6. Manual verification of all metadata in page source
