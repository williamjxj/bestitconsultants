# Data Model: SEO Implementation

**Feature**: Improve SEO  
**Date**: 2026-01-23

## Entities

### PageMetadata

Represents complete SEO metadata for a single page.

**Fields**:
- `title: string` - Page title (50-60 characters, required)
- `description: string` - Meta description (150-160 characters, required)
- `keywords?: string[]` - Meta keywords (optional, for legacy support)
- `canonicalUrl: string` - Absolute canonical URL (required)
- `openGraph?: OpenGraphMetadata` - Open Graph properties (optional)
- `twitter?: TwitterCardMetadata` - Twitter Card properties (optional)
- `structuredData?: StructuredDataSchema` - JSON-LD structured data (optional)

**Validation Rules**:
- Title must be between 50-60 characters
- Description must be between 150-160 characters
- Canonical URL must be absolute (include protocol and domain)
- If Open Graph is provided, must include at minimum: title, description, image, url, type
- If Twitter Card is provided, must include at minimum: card type, title, description

**Fallback Behavior**:
- If any field is missing, use homepage metadata as fallback
- Fallback applies to: title, description, openGraph, twitter
- Canonical URL always uses current page URL (no fallback)

---

### OpenGraphMetadata

Open Graph metadata for social media sharing.

**Fields**:
- `title: string` - OG title (required)
- `description: string` - OG description (required)
- `image: string | string[]` - OG image URL(s) (required, absolute URL)
- `url: string` - Page URL (required, absolute URL)
- `type: 'website' | 'article' | 'profile'` - OG type (required, default: 'website')
- `siteName?: string` - Site name (optional)
- `locale?: string` - Locale (optional, default: 'en_US')

**Validation Rules**:
- All URLs must be absolute
- Image URLs must be accessible
- Type must match page content type

---

### TwitterCardMetadata

Twitter Card metadata for Twitter link previews.

**Fields**:
- `card: 'summary' | 'summary_large_image'` - Card type (required)
- `title: string` - Twitter title (required)
- `description: string` - Twitter description (required)
- `image?: string` - Twitter image URL (optional, absolute URL)
- `site?: string` - Twitter site handle (optional, e.g., '@bestitconsultants')
- `creator?: string` - Twitter creator handle (optional)

**Validation Rules**:
- Card type must be appropriate for image availability
- If `summary_large_image` is used, image must be provided
- Image URLs must be absolute

---

### StructuredDataSchema

Base interface for all Schema.org structured data objects.

**Fields**:
- `@context: 'https://schema.org'` - Schema.org context (required, constant)
- `@type: string` - Schema.org type (required, e.g., 'Organization', 'Service', 'Article')
- `[key: string]: unknown` - Additional type-specific properties

**Validation Rules**:
- Must include @context and @type
- All properties must be valid for the specified @type
- Must pass Schema.org validator
- Must pass Google Rich Results Test

**Subtypes**:
- `OrganizationSchema` - Company information
- `ServiceSchema` - Service offerings
- `ArticleSchema` - Case studies and articles
- `BreadcrumbListSchema` - Navigation hierarchy
- `WebPageSchema` - Page metadata

---

### OrganizationSchema

Schema.org Organization structured data for company information.

**Fields**:
- `@context: 'https://schema.org'` - Required
- `@type: 'Organization'` - Required
- `name: string` - Organization name (required)
- `description: string` - Organization description (required)
- `url: string` - Organization website URL (required, absolute)
- `logo: string` - Logo URL (required, absolute)
- `email?: string` - Business email (optional, from clarification)
- `sameAs?: string[]` - Social media profiles (optional, e.g., LinkedIn, Twitter)

**Validation Rules**:
- Must be present on homepage
- Email must be valid business email format
- Logo must be accessible image URL
- sameAs URLs must be valid social media profile URLs

---

### ServiceSchema

Schema.org Service structured data for service pages.

**Fields**:
- `@context: 'https://schema.org'` - Required
- `@type: 'Service'` - Required
- `name: string` - Service name (required)
- `description: string` - Service description (required)
- `provider: OrganizationSchema` - Service provider (required, nested Organization)
- `serviceType?: string` - Type of service (optional)
- `areaServed?: string | string[]` - Geographic area served (optional)
- `offers?: OfferSchema` - Pricing information (optional, only if explicitly available)

**Validation Rules**:
- Must be present on services page
- Provider must be valid Organization schema
- Offers field must be omitted if pricing not available (from clarification)

---

### ArticleSchema

Schema.org Article structured data for case study pages.

**Fields**:
- `@context: 'https://schema.org'` - Required
- `@type: 'Article'` - Required
- `headline: string` - Article headline (required)
- `description: string` - Article description (required)
- `datePublished: string` - Publication date (required, ISO 8601 format)
- `dateModified?: string` - Last modification date (optional, ISO 8601 format)
- `author?: PersonSchema | OrganizationSchema` - Author (optional, only if explicitly available)
- `publisher: OrganizationSchema` - Publisher (required, nested Organization)
- `image?: string | string[]` - Article images (optional, absolute URLs)

**Validation Rules**:
- Must be present on case study pages
- DatePublished must be valid ISO 8601 date
- Author field must be omitted if not explicitly available (from clarification)
- Publisher must be valid Organization schema

---

### BreadcrumbListSchema

Schema.org BreadcrumbList structured data for navigation hierarchy.

**Fields**:
- `@context: 'https://schema.org'` - Required
- `@type: 'BreadcrumbList'` - Required
- `itemListElement: BreadcrumbItemSchema[]` - List of breadcrumb items (required, min 1)

**Validation Rules**:
- Must be present on all pages except homepage
- Must have at least one item (homepage)
- Items must be in hierarchical order
- All URLs must be absolute

---

### BreadcrumbItemSchema

Individual breadcrumb item in BreadcrumbList.

**Fields**:
- `@type: 'ListItem'` - Required
- `position: number` - Position in list (required, 1-based)
- `name: string` - Breadcrumb label (required)
- `item: string` - Breadcrumb URL (required, absolute URL)

**Validation Rules**:
- Position must be sequential (1, 2, 3, ...)
- Name must match visible breadcrumb text
- URL must be absolute and accessible

---

### SitemapEntry

Represents a single URL entry in the XML sitemap.

**Fields**:
- `url: string` - Page URL (required, absolute)
- `lastModified: Date` - Last modification date (required)
- `changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'` - Update frequency (required)
- `priority: number` - Priority value (required, 0.1-1.0)

**Validation Rules**:
- URL must be absolute and return 200 status code
- Priority must be between 0.1 and 1.0
- Priority assignment:
  - Homepage: 1.0
  - Main pages (services, case studies): 0.9
  - Secondary pages (team, testimonials): 0.8
  - Lower priority pages: 0.7
- No duplicate URLs allowed
- lastModified should reflect actual content changes

---

### BreadcrumbItem

Represents a single item in the visual breadcrumb navigation.

**Fields**:
- `label: string` - Display text (required)
- `href: string` - Navigation URL (required, can be relative or absolute)
- `isActive?: boolean` - Whether this is the current page (optional, default: false)

**Validation Rules**:
- Label must be human-readable
- Href must be valid URL
- Last item typically has isActive: true
- First item typically links to homepage

---

## Relationships

- **PageMetadata** → **OpenGraphMetadata** (1:1, optional)
- **PageMetadata** → **TwitterCardMetadata** (1:1, optional)
- **PageMetadata** → **StructuredDataSchema** (1:many, optional)
- **OrganizationSchema** → **ServiceSchema.provider** (1:many)
- **OrganizationSchema** → **ArticleSchema.publisher** (1:many)
- **BreadcrumbListSchema** → **BreadcrumbItemSchema** (1:many, required)
- **BreadcrumbItem** → **BreadcrumbItemSchema** (1:1, for structured data generation)

---

## State Transitions

N/A - All entities are static configuration data with no state transitions.

---

## Data Volume Assumptions

- **Pages**: 7 public pages requiring metadata
- **Structured Data Types**: 5 types (Organization, WebPage, Service, Article, BreadcrumbList)
- **Sitemap Entries**: 7 entries (one per public page)
- **Breadcrumb Items**: Average 2-3 items per page (homepage + 1-2 levels)

---

## Validation Requirements

All data must pass:
1. TypeScript type checking (strict mode)
2. Schema.org validator
3. Google Rich Results Test
4. Metadata length validation (title 50-60 chars, description 150-160 chars)
5. URL accessibility (all absolute URLs must return 200 status)
