import { getBaseUrl } from '@/lib/utils'
import type {
  BreadcrumbItem,
  BreadcrumbItemSchema,
  StructuredDataSchema,
} from '@/types/seo'

/**
 * Create Organization structured data schema
 * @param options - Organization information
 * @returns Organization structured data object
 */
export function createOrganizationSchema(options: {
  name: string
  description: string
  url: string
  logo: string
  email?: string
  sameAs?: string[]
}): StructuredDataSchema {
  const schema: StructuredDataSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: options.name,
    description: options.description,
    url: options.url,
    logo: options.logo,
  }

  if (options.email) {
    schema.email = options.email
  }

  if (options.sameAs && options.sameAs.length > 0) {
    schema.sameAs = options.sameAs
  }

  return schema
}

/**
 * Create Service structured data schema
 * @param options - Service information
 * @returns Service structured data object
 */
export function createServiceSchema(options: {
  name: string
  description: string
  provider: StructuredDataSchema // Organization schema
  serviceType?: string
  areaServed?: string | string[]
  offers?: {
    price?: string
    priceCurrency?: string
  }
}): StructuredDataSchema {
  const schema: StructuredDataSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    provider: options.provider,
  }

  if (options.serviceType) {
    schema.serviceType = options.serviceType
  }

  if (options.areaServed) {
    schema.areaServed = options.areaServed
  }

  // Only include offers if explicitly provided (per clarification)
  if (options.offers) {
    schema.offers = {
      '@type': 'Offer',
      ...(options.offers.price && { price: options.offers.price }),
      ...(options.offers.priceCurrency && {
        priceCurrency: options.offers.priceCurrency,
      }),
    }
  }

  return schema
}

/**
 * Create Article structured data schema
 * @param options - Article information
 * @returns Article structured data object
 */
export function createArticleSchema(options: {
  headline: string
  description: string
  datePublished: string // ISO 8601 format
  dateModified?: string // ISO 8601 format
  author?: StructuredDataSchema // Person or Organization schema (optional per clarification)
  publisher: StructuredDataSchema // Organization schema
  image?: string | string[]
}): StructuredDataSchema {
  const schema: StructuredDataSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    datePublished: options.datePublished,
    publisher: options.publisher,
  }

  if (options.dateModified) {
    schema.dateModified = options.dateModified
  }

  // Only include author if explicitly provided (per clarification)
  if (options.author) {
    schema.author = options.author
  }

  if (options.image) {
    schema.image = options.image
  }

  return schema
}

/**
 * Create BreadcrumbList structured data schema
 * @param items - Array of breadcrumb items
 * @returns BreadcrumbList structured data object
 */
export function createBreadcrumbSchema(
  items: BreadcrumbItem[]
): StructuredDataSchema {
  const baseUrl = getBaseUrl()

  const itemListElement: BreadcrumbItemSchema[] = items.map((item, index) => {
    // Convert relative URLs to absolute
    const absoluteUrl = item.href.startsWith('http')
      ? item.href
      : `${baseUrl}${item.href.startsWith('/') ? item.href : `/${item.href}`}`

    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl,
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

/**
 * Generate JSON-LD script content from structured data
 * @param schema - Structured data schema object
 * @returns JSON string for use in script tag
 */
export function structuredDataScript(schema: StructuredDataSchema): string {
  return JSON.stringify(schema, null, 2)
}
