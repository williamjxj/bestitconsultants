// Legacy SEO metadata interface (kept for backward compatibility)
export interface SEOMetadata {
  id: string
  page: string
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  structuredData?: Record<string, unknown>
}

export interface SEOMetadataResponse {
  success: boolean
  data?: SEOMetadata | SEOMetadata[]
  message?: string
  code?: string
}

export interface SEOMetadataError {
  success: false
  message: string
  code: string
  details?: Record<string, unknown>
}

// New SEO type definitions for improved SEO implementation

/**
 * Open Graph metadata for social media sharing
 */
export interface OpenGraphMetadata {
  title: string
  description: string
  image: string | string[]
  url: string
  type: 'website' | 'article' | 'profile'
  siteName?: string
  locale?: string
}

/**
 * Twitter Card metadata for Twitter link previews
 */
export interface TwitterCardMetadata {
  card: 'summary' | 'summary_large_image'
  title: string
  description: string
  image?: string
  site?: string
  creator?: string
}

/**
 * Complete page metadata for SEO
 */
export interface PageMetadata {
  title: string // 50-60 characters
  description: string // 150-160 characters
  keywords?: string[]
  canonicalUrl: string // Absolute URL
  openGraph?: OpenGraphMetadata
  twitter?: TwitterCardMetadata
  structuredData?: StructuredDataSchema
}

/**
 * Base interface for all Schema.org structured data objects
 */
export interface StructuredDataSchema {
  '@context': 'https://schema.org'
  '@type': string
  [key: string]: unknown
}

/**
 * Breadcrumb item for navigation hierarchy
 */
export interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

/**
 * Breadcrumb item schema for structured data
 */
export interface BreadcrumbItemSchema {
  '@type': 'ListItem'
  position: number
  name: string
  item: string // Absolute URL
}

/**
 * Sitemap entry for XML sitemap generation
 */
export interface SitemapEntry {
  url: string // Absolute URL
  lastModified: Date
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number // 0.1-1.0
}
