# Quick Start Guide: SEO Implementation

**Feature**: Improve SEO  
**Date**: 2026-01-23

## Overview

This guide provides step-by-step instructions for implementing SEO improvements across all pages of
the BestIT Consultants website.

## Prerequisites

- Next.js 15.2.8+ with App Router
- TypeScript 5.0+ (strict mode)
- Existing page structure in `src/app/`
- Access to Cloudflare R2 for Open Graph images

## Implementation Steps

### Step 1: Create SEO Utility Functions

Create `src/lib/seo-utils.ts` with metadata building and validation functions.

**Key Functions**:

- `buildPageMetadata()` - Builds complete metadata with fallbacks
- `getCanonicalUrl()` - Generates absolute canonical URLs
- `validateMetadata()` - Validates metadata requirements

**See**: `data-model.md` for complete type definitions

---

### Step 2: Create Structured Data Utilities

Create `src/lib/structured-data.ts` with Schema.org structured data generators.

**Key Functions**:

- `createOrganizationSchema()` - Organization structured data
- `createServiceSchema()` - Service structured data
- `createArticleSchema()` - Article structured data
- `createBreadcrumbSchema()` - BreadcrumbList structured data
- `structuredDataScript()` - JSON-LD script generator

**See**: `data-model.md` for complete schema definitions

---

### Step 3: Create Breadcrumb Component

Create `src/components/seo/Breadcrumb.tsx` component.

**Features**:

- Visual breadcrumb navigation
- BreadcrumbList structured data (JSON-LD)
- Accessible semantic HTML
- Tailwind CSS styling

**Usage**:

```typescript
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Current Page', href: '/services/current', isActive: true },
  ]}
/>
```

---

### Step 4: Add Metadata to Each Page

For each page, create or update `layout.tsx` with metadata export.

**Example** (`src/app/services/layout.tsx`):

```typescript
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'
import { createServiceSchema, structuredDataScript } from '@/lib/structured-data'

export const metadata: Metadata = buildPageMetadata({
  title: 'IT Services - BestIT Consultants',
  description: 'Comprehensive IT consulting services including AI/ML, web development, cloud solutions, and digital transformation.',
  path: '/services',
  keywords: ['IT Services', 'AI Consulting', 'Cloud Solutions'],
  ogImage: getR2ImageUrl('imgs/og-services.jpg'),
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const serviceSchema = createServiceSchema({
    name: 'IT Consulting Services',
    description: 'Comprehensive IT consulting services',
    provider: {
      '@type': 'Organization',
      name: 'BestIT Consultants',
      // ... organization details
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataScript(serviceSchema) }}
      />
      {children}
    </>
  )
}
```

**Pages to Update**:

1. ✅ Homepage (`src/app/layout.tsx`) - Already has metadata, enhance Organization schema
2. ⬜ Services (`src/app/services/layout.tsx`) - Add metadata + Service schema
3. ⬜ Portfolio (`src/app/portfolio/layout.tsx`) - Add metadata
4. ⬜ Case Studies (`src/app/case-studies/layout.tsx`) - Add metadata + Article schema
5. ⬜ Team (`src/app/our-team/layout.tsx`) - Add metadata
6. ⬜ Testimonials (`src/app/testimonials/layout.tsx`) - Add metadata
7. ⬜ Contact (`src/app/contact-us/layout.tsx`) - Add metadata

---

### Step 5: Update Sitemap

Update `src/app/sitemap.ts` to include all pages with correct priorities.

**Priority Assignment**:

- Homepage: 1.0
- Main pages (services, case studies): 0.9
- Secondary pages (team, testimonials): 0.8
- Lower priority pages: 0.7

**Fix Issues**:

- Remove duplicate `/case-studies` entry
- Add missing pages (portfolio, testimonials)
- Set appropriate priorities
- Update lastModified dates

---

### Step 6: Add Breadcrumbs to Pages

Add `<Breadcrumb />` component to each page (except homepage).

**Example** (`src/app/services/page.tsx`):

```typescript
import Breadcrumb from '@/components/seo/Breadcrumb'

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services', isActive: true },
        ]}
      />
      {/* Page content */}
    </>
  )
}
```

---

### Step 7: Verify Image Alt Text

Ensure all images have descriptive alt text.

**Check**:

- All `<img>` tags have `alt` attribute
- All Next.js `<Image>` components have `alt` prop
- Decorative images use empty string: `alt=""`
- Descriptive images have meaningful alt text

---

### Step 8: Update Organization Structured Data

Enhance `src/components/seo/StructuredData.tsx` or add to homepage layout.

**Required Fields**:

- name, description, url, logo (required)
- email, sameAs (optional, from clarification)

**See**: `data-model.md` for complete OrganizationSchema definition

---

## Testing Checklist

### Local Testing

- [ ] Build succeeds: `npm run build`
- [ ] Type check passes: `npm run type-check`
- [ ] Lint passes: `npm run lint`
- [ ] All pages load without errors
- [ ] View page source, verify metadata tags present
- [ ] Verify structured data JSON-LD in page source
- [ ] Check sitemap: `http://localhost:3000/sitemap.xml`
- [ ] Check robots.txt: `http://localhost:3000/robots.txt`

### Validation Tools

- [ ] **Google Rich Results Test**: https://search.google.com/test/rich-results
  - Test homepage (Organization schema)
  - Test services page (Service schema)
  - Test case studies page (Article schema)
  - Test any page with breadcrumbs (BreadcrumbList schema)

- [ ] **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
  - Test all pages for Open Graph metadata

- [ ] **Twitter Card Validator**: https://cards-dev.twitter.com/validator
  - Test all pages for Twitter Card metadata

- [ ] **Schema.org Validator**: https://validator.schema.org/
  - Validate all structured data types

- [ ] **Lighthouse SEO Audit**: `npx lighthouse http://localhost:3000 --only-categories=seo`
  - Target score: >95

### Manual Verification

- [ ] All 7 pages have unique titles (50-60 characters)
- [ ] All 7 pages have unique descriptions (150-160 characters)
- [ ] All pages have canonical URLs
- [ ] All pages have Open Graph metadata
- [ ] All pages have Twitter Card metadata
- [ ] Breadcrumbs appear on all pages except homepage
- [ ] Breadcrumb structured data present on all pages with breadcrumbs
- [ ] All images have alt text
- [ ] Sitemap includes all 7 pages, no duplicates
- [ ] Sitemap priorities match specification

---

## Common Issues & Solutions

### Issue: Metadata not appearing in page source

**Solution**: Ensure `metadata` is exported from `layout.tsx`, not `page.tsx`. Next.js App Router
requires metadata in layout files.

### Issue: Structured data validation fails

**Solution**:

- Verify all required fields are present for the schema type
- Check that `@context` and `@type` are correct
- Ensure all URLs are absolute
- Use Schema.org validator to identify missing fields

### Issue: Breadcrumbs not showing

**Solution**:

- Verify Breadcrumb component is imported and used
- Check that items array has at least one item
- Ensure Tailwind CSS classes are applied correctly

### Issue: Sitemap has duplicate entries

**Solution**: Review `sitemap.ts` and remove duplicate URL entries. Each page should appear exactly
once.

### Issue: Images missing alt text

**Solution**: Add `alt` prop to all `<Image>` components. Use empty string for decorative images.

---

## Next Steps After Implementation

1. **Deploy to Production**: Deploy changes to production environment
2. **Submit Sitemap**: Submit sitemap to Google Search Console
3. **Monitor Indexing**: Monitor page indexing in Google Search Console
4. **Validate Production**: Re-run all validation tools on production URLs
5. **Monitor Performance**: Track SEO metrics in Google Search Console

---

## Resources

- **Specification**: `spec.md`
- **Data Model**: `data-model.md`
- **Research**: `research.md`
- **API Contracts**: `contracts/seo-utilities.yaml`
- **SEO Reference**: `../../docs/reference/seo-1.md`

---

## Support

For questions or issues:

1. Review the specification (`spec.md`)
2. Check the data model (`data-model.md`)
3. Review research decisions (`research.md`)
4. Consult Next.js Metadata API documentation
5. Check Schema.org documentation for structured data
