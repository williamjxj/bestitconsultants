export interface ContentSection {
  id: string
  type: 'hero' | 'highlight' | 'testimonial' | 'cta'
  title: string
  subtitle?: string
  content: string
  ctaText?: string
  ctaLink?: string
  background?: string
  order: number
  isActive: boolean
}

export interface ContentSectionResponse {
  success: boolean
  data: ContentSection | ContentSection[]
}

export interface ContentSectionError {
  success: false
  message: string
  code: string
  details?: Record<string, unknown>
}
