# SEO Implementation Guide

**Last Updated**: 2026-01-23  
**Status**: Production Ready

## Overview

This document describes the comprehensive SEO implementation for BestIT Consultants website. The
implementation follows Next.js 15 App Router best practices and includes:

- ✅ Complete metadata coverage for all pages
- ✅ Schema.org structured data (JSON-LD)
- ✅ Social media optimization (Open Graph, Twitter Cards)
- ✅ Breadcrumb navigation with structured data
- ✅ Sitemap and robots.txt configuration
- ✅ Canonical URLs and duplicate content prevention

## Architecture

### Core Components

```
src/
├── lib/
│   ├── seo-utils.ts          # Metadata building utilities
│   └── structured-data.ts    # Schema.org generators
├── components/
│   └── seo/
│       ├── Breadcrumb.tsx    # Breadcrumb component
│       └── StructuredData.tsx # Global structured data
└── types/
    └── seo.ts                # TypeScript definitions
```

### Key Features

1. **Metadata Fallback System**: Homepage metadata automatically fills missing page-specific fields
2. **Type-Safe Utilities**: Full TypeScript support with validation
3. **Server-Side Rendering**: All SEO metadata rendered server-side for optimal performance
4. **Structured Data**: JSON-LD format for rich search results

## Quick Start

### Adding SEO to a New Page

#### Step 1: Create Layout File

Create `src/app/your-page/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo-utils'
import { getR2ImageUrl } from '@/lib/utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'Your Page Title - BestIT Consultants',
  description: 'Your page description (150-160 characters recommended)',
  path: '/your-page',
  keywords: ['keyword1', 'keyword2'],
  ogImage: getR2ImageUrl('imgs/og-your-page.jpg'),
  twitterImage: getR2ImageUrl('imgs/og-your-page.jpg'),
})

export default function YourPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
```

#### Step 2: Add Breadcrumb to Page

In `src/app/your-page/page.tsx`:

```typescript
import Breadcrumb from '@/components/seo/Breadcrumb'
import type { BreadcrumbItem } from '@/types/seo'

export default function YourPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Your Page', href: '/your-page', isActive: true },
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      {/* Your page content */}
    </>
  )
}
```

## API Reference

### `buildPageMetadata()`

Builds complete Next.js metadata with fallback support.

**Location**: `src/lib/seo-utils.ts`

**Parameters**:

- `title` (string, required): Page title (50-60 chars recommended)
- `description` (string, required): Meta description (150-160 chars recommended)
- `path` (string, required): Page path (e.g., '/services')
- `keywords` (string[], optional): Meta keywords
- `ogImage` (string, optional): Open Graph image URL
- `ogType` ('website' | 'article' | 'profile', optional): OG type, defaults to 'website'
- `twitterImage` (string, optional): Twitter Card image URL

**Returns**: `Metadata` object for Next.js

**Example**:

```typescript
export const metadata: Metadata = buildPageMetadata({
  title: 'Services - BestIT Consultants',
  description: 'Comprehensive IT consulting services...',
  path: '/services',
  keywords: ['IT Services', 'Consulting'],
  ogImage: getR2ImageUrl('imgs/og-services.jpg'),
})
```

**Fallback Behavior**: Missing fields automatically use homepage metadata values.

### `getCanonicalUrl()`

Generates absolute canonical URL for a page.

**Location**: `src/lib/seo-utils.ts`

**Parameters**:

- `path` (string): Page path

**Returns**: Absolute URL string

**Example**:

```typescript
const canonical = getCanonicalUrl('/services')
// Returns: 'https://bestitconsultants.ca/services'
```

### `validateMetadata()`

Validates metadata meets SEO requirements.

**Location**: `src/lib/seo-utils.ts`

**Parameters**:

- `metadata`: Object with `title` and `description`

**Returns**: `{ valid: boolean, errors: string[] }`

**Example**:

```typescript
const result = validateMetadata({
  title: 'My Page',
  description: 'My description',
})

if (!result.valid) {
  console.error('Validation errors:', result.errors)
}
```

## Structured Data

### Organization Schema

Global organization information (included on all pages via `StructuredData.tsx`).

**Location**: `src/components/seo/StructuredData.tsx`

**Fields**:

- `name`: Company name
- `description`: Company description
- `url`: Website URL
- `logo`: Logo URL
- `email`: Business email (optional)
- `sameAs`: Social media profiles (optional)

**Example**:

```typescript
import { createOrganizationSchema } from '@/lib/structured-data'

const orgSchema = createOrganizationSchema({
  name: 'BestIT Consultants',
  description: 'Elite IT consulting...',
  url: 'https://bestitconsultants.ca',
  logo: 'https://bestitconsultants.ca/logo.png',
  email: 'service@bestitconsultants.ca',
  sameAs: ['https://linkedin.com/company/bestit'],
})
```

### Service Schema

For service pages (e.g., `/services`).

**Location**: `src/lib/structured-data.ts`

**Fields**:

- `name`: Service name
- `description`: Service description
- `provider`: Organization schema
- `serviceType`: Type of service (optional)
- `areaServed`: Geographic area (optional)
- `offers`: Pricing information (optional, only include if available)

**Example**:

```typescript
import { createServiceSchema } from '@/lib/structured-data'

const serviceSchema = createServiceSchema({
  name: 'IT Consulting Services',
  description: 'Comprehensive IT consulting...',
  provider: organizationSchema,
  serviceType: 'IT Consulting',
  areaServed: 'Canada',
  // offers omitted (only include if pricing is available)
})
```

### Article Schema

For blog posts, case studies, or article pages.

**Location**: `src/lib/structured-data.ts`

**Fields**:

- `headline`: Article headline
- `description`: Article description
- `datePublished`: ISO 8601 date string
- `dateModified`: ISO 8601 date string (optional)
- `author`: Person or Organization schema (optional)
- `publisher`: Organization schema
- `image`: Image URL or array (optional)

**Example**:

```typescript
import { createArticleSchema } from '@/lib/structured-data'

const articleSchema = createArticleSchema({
  headline: 'Case Study: Enterprise AI Implementation',
  description: 'How we helped...',
  datePublished: '2026-01-15T00:00:00Z',
  dateModified: '2026-01-20T00:00:00Z',
  publisher: organizationSchema,
  image: getR2ImageUrl('imgs/case-study-1.jpg'),
  // author omitted (only include if available)
})
```

### BreadcrumbList Schema

Automatically generated by `Breadcrumb` component.

**Location**: `src/components/seo/Breadcrumb.tsx`

**Usage**: Pass breadcrumb items to the component, structured data is generated automatically.

**Example**:

```typescript
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'AI Consulting', href: '/services/ai', isActive: true },
  ]}
/>
```

## Best Practices

### Title Tags

- **Length**: 50-60 characters (including site name)
- **Format**: `Page Title - BestIT Consultants`
- **Uniqueness**: Each page must have a unique title
- **Keywords**: Include primary keyword near the beginning

**Good Examples**:

```typescript
title: 'IT Services - BestIT Consultants' // 35 chars ✅
title: 'AI Consulting Services - BestIT Consultants' // 48 chars ✅
```

**Bad Examples**:

```typescript
title: 'Services' // Too short, missing site name ❌
title: 'BestIT Consultants - IT Services - AI Consulting - Cloud Solutions' // Too long ❌
```

### Meta Descriptions

- **Length**: 150-160 characters
- **Uniqueness**: Each page must have a unique description
- **Call-to-Action**: Include a clear CTA when appropriate
- **Keywords**: Naturally include relevant keywords

**Good Examples**:

```typescript
description: 'Comprehensive IT consulting services including AI/ML solutions, web development, and cloud infrastructure. Fortune 500 proven expertise.' // 156 chars ✅
```

**Bad Examples**:

```typescript
description: 'IT services' // Too short ❌
description: 'We offer IT services. Our team has years of experience. Contact us today for a quote. We are the best. Trust us with your business needs.' // Too long, repetitive ❌
```

### Open Graph Images

- **Dimensions**: 1200×630px (recommended)
- **Format**: JPG or PNG
- **File Size**: < 1MB
- **Content**: Include page title or key visual element
- **Storage**: Use R2 image URLs via `getR2ImageUrl()`

**Example**:

```typescript
ogImage: getR2ImageUrl('imgs/og-services.jpg')
```

### Structured Data

- **Format**: Always use JSON-LD (not Microdata or RDFa)
- **Validation**: Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Completeness**: Include all required fields for each schema type
- **Optional Fields**: Only include when data is explicitly available (per clarification)

### Breadcrumbs

- **Homepage**: Don't include breadcrumbs on homepage
- **Depth**: Include all parent pages in hierarchy
- **Active Page**: Mark current page with `isActive: true`
- **Labels**: Use clear, descriptive labels

**Example**:

```typescript
const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'AI Consulting', href: '/services/ai', isActive: true },
]
```

## Sitemap Configuration

**Location**: `src/app/sitemap.ts`

The sitemap is automatically generated by Next.js. Current configuration:

- **Homepage**: Priority 1.0, Monthly updates
- **Main Pages** (services, case-studies): Priority 0.9, Monthly updates
- **Secondary Pages** (team, testimonials, contact): Priority 0.8, Monthly updates
- **Lower Priority** (portfolio): Priority 0.7, Monthly updates

**Adding New Pages**: Add entries to `sitemap.ts`:

```typescript
{
  url: `${baseUrl}/new-page`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
}
```

## Robots.txt Configuration

**Location**: `src/app/robots.ts`

Current configuration:

- ✅ Allows all public pages
- ✅ Disallows API routes, admin, and Next.js internal paths
- ✅ References sitemap URL

**No changes needed** unless adding new restricted paths.

## Validation & Testing

### Pre-Deployment Checks

1. **TypeScript**: `npm run type-check`
2. **ESLint**: `npm run lint`
3. **Build**: `npm run build`

### Post-Deployment Validation

#### 1. Google Rich Results Test

**URL**: https://search.google.com/test/rich-results

**What to Test**:

- Organization structured data
- Service structured data (on `/services`)
- Article structured data (on `/case-studies`)
- BreadcrumbList structured data

**Expected Result**: All schemas should validate without errors.

#### 2. Facebook Sharing Debugger

**URL**: https://developers.facebook.com/tools/debug/

**What to Test**:

- All pages with Open Graph metadata
- Verify images display correctly
- Check title and description

**Expected Result**: All pages show correct OG tags and images.

#### 3. Twitter Card Validator

**URL**: https://cards-dev.twitter.com/validator

**What to Test**:

- All pages with Twitter Card metadata
- Verify images display correctly

**Expected Result**: All pages show correct Twitter Card tags.

#### 4. Lighthouse SEO Audit

**How to Run**:

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "SEO" category
4. Run audit

**Target Score**: >95

**What to Check**:

- Meta tags present
- Structured data valid
- Images have alt text
- Links are crawlable
- No duplicate content

#### 5. Google Search Console

**Actions**:

1. Submit sitemap: `https://bestitconsultants.ca/sitemap.xml`
2. Request indexing for key pages
3. Monitor indexing status
4. Check for crawl errors

## Troubleshooting

### Metadata Not Showing

**Problem**: Page metadata not appearing in search results.

**Solutions**:

1. Verify `layout.tsx` exports `metadata`
2. Check that `buildPageMetadata()` is called correctly
3. Ensure page is deployed and indexed
4. Use [Google Search Console](https://search.google.com/search-console) to check indexing

### Structured Data Errors

**Problem**: Google Rich Results Test shows errors.

**Solutions**:

1. Verify all required fields are present
2. Check JSON-LD syntax (use `structuredDataScript()`)
3. Ensure URLs are absolute
4. Validate schema type matches content

### Images Not Loading in Social Previews

**Problem**: OG images not showing on Facebook/Twitter.

**Solutions**:

1. Verify image URL is absolute and accessible
2. Check image dimensions (1200×630px recommended)
3. Ensure image file size < 1MB
4. Use Facebook Debugger to clear cache
5. Verify `getR2ImageUrl()` returns correct URL

### Breadcrumbs Not Appearing

**Problem**: Breadcrumb component not rendering.

**Solutions**:

1. Verify `Breadcrumb` component is imported
2. Check `items` array is correctly formatted
3. Ensure `BreadcrumbItem` type matches
4. Check for console errors

### Duplicate Content Warnings

**Problem**: Search engines flag duplicate content.

**Solutions**:

1. Verify each page has unique canonical URL
2. Check `buildPageMetadata()` sets correct `path`
3. Ensure sitemap has no duplicate URLs
4. Verify robots.txt allows all public pages

## Environment Variables

Required environment variables for SEO:

```bash
# Base URL (used for canonical URLs and structured data)
NEXT_PUBLIC_BASE_URL=https://bestitconsultants.ca

# Business email (for Organization structured data)
BUSINESS_EMAIL=service@bestitconsultants.ca
# or
CONTACT_EMAIL=service@bestitconsultants.ca
```

## File Structure Reference

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (homepage metadata)
│   ├── sitemap.ts                    # Sitemap configuration
│   ├── robots.ts                     # Robots.txt configuration
│   ├── services/
│   │   ├── layout.tsx                # Services metadata + Service schema
│   │   └── page.tsx                  # Services page + breadcrumb
│   ├── case-studies/
│   │   ├── layout.tsx                # Case studies metadata + Article schema
│   │   └── page.tsx                  # Case studies page + breadcrumb
│   └── [other-pages]/                # Similar structure
├── lib/
│   ├── seo-utils.ts                  # Metadata utilities
│   └── structured-data.ts            # Schema.org generators
├── components/
│   └── seo/
│       ├── Breadcrumb.tsx            # Breadcrumb component
│       └── StructuredData.tsx        # Global Organization schema
└── types/
    └── seo.ts                        # TypeScript definitions
```

## Additional Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

## Support

For questions or issues:

1. Check this documentation
2. Review implementation in `specs/001-improve-seo/`
3. Validate with tools listed in "Validation & Testing" section
4. Check TypeScript types in `src/types/seo.ts`

---

**Last Implementation**: 2026-01-23  
**Specification**: `specs/001-improve-seo/spec.md`  
**Implementation Notes**: `specs/001-improve-seo/IMPLEMENTATION_NOTES.md`
