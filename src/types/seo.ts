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
  data: SEOMetadata | SEOMetadata[]
}

export interface SEOMetadataError {
  success: false
  message: string
  code: string
  details?: Record<string, unknown>
}
