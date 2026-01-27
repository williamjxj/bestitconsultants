import type { Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'
import type { PageMetadata } from '@/types/seo'

/**
 * Homepage metadata used as fallback for missing page-specific metadata
 */
const homepageMetadata: PageMetadata = {
  title: 'BestIT Consultants - Elite IT Outsourcing & AI Consulting',
  description:
    'Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation. Canadian Quality, Global Talent.',
  keywords: [
    'IT Outsourcing Canada',
    'AI Consulting Services',
    'Global Software Development',
    'Elite IT Consulting',
    'Fortune 500 Experience',
  ],
  canonicalUrl: getBaseUrl(),
  openGraph: {
    title: 'BestIT Consulting - Elite IT Outsourcing & AI Consulting',
    description:
      'Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation.',
    image: `${getBaseUrl()}/og-homepage.jpg`,
    url: getBaseUrl(),
    type: 'website',
    siteName: 'BestIT Consulting',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BestIT Consulting - Elite IT Outsourcing & AI Consulting',
    description:
      'Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation.',
    image: `${getBaseUrl()}/og-homepage.jpg`,
  },
}

/**
 * Build complete page metadata with fallback to homepage metadata
 * @param options - Page-specific metadata options
 * @returns Complete Metadata object for Next.js
 */
export function buildPageMetadata(options: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterImage?: string
}): Metadata {
  const baseUrl = getBaseUrl()
  const canonicalUrl = `${baseUrl}${options.path}`

  // Use provided values or fallback to homepage metadata
  const title = options.title || homepageMetadata.title
  const description = options.description || homepageMetadata.description
  const keywords = options.keywords || homepageMetadata.keywords || []
  const ogImage = options.ogImage || homepageMetadata.openGraph?.image || ''
  const twitterImage =
    options.twitterImage || homepageMetadata.twitter?.image || ogImage

  // Build Open Graph metadata
  // Ensure image is string or string array (Next.js Metadata accepts both)
  const ogImageValue: string | string[] = Array.isArray(ogImage)
    ? ogImage
    : typeof ogImage === 'string'
      ? ogImage
      : ''

  const openGraph = {
    title: title,
    description: description,
    images: Array.isArray(ogImageValue) ? ogImageValue : [ogImageValue],
    url: canonicalUrl,
    type: options.ogType || 'website',
    siteName: homepageMetadata.openGraph?.siteName || 'BestIT Consulting',
    locale: homepageMetadata.openGraph?.locale || 'en_US',
  }

  // Build Twitter Card metadata
  const twitter = {
    card: 'summary_large_image' as const,
    title: title,
    description: description,
    images: typeof twitterImage === 'string' ? [twitterImage] : [],
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph,
    twitter,
  }
}

/**
 * Generate absolute canonical URL for a page path
 * @param path - Page path (e.g., '/services' or '/')
 * @returns Absolute canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = getBaseUrl()
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}

/**
 * Validate metadata meets requirements
 * @param metadata - Page metadata to validate
 * @returns Validation result with errors if any
 */
export function validateMetadata(metadata: {
  title?: string
  description?: string
}): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Validate title length (50-60 characters)
  if (metadata.title) {
    const titleLength = metadata.title.length
    if (titleLength < 50) {
      errors.push(`Title is too short (${titleLength} chars, minimum 50)`)
    } else if (titleLength > 60) {
      errors.push(`Title is too long (${titleLength} chars, maximum 60)`)
    }
  } else {
    errors.push('Title is required')
  }

  // Validate description length (150-160 characters)
  if (metadata.description) {
    const descLength = metadata.description.length
    if (descLength < 150) {
      errors.push(`Description is too short (${descLength} chars, minimum 150)`)
    } else if (descLength > 160) {
      errors.push(`Description is too long (${descLength} chars, maximum 160)`)
    }
  } else {
    errors.push('Description is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
