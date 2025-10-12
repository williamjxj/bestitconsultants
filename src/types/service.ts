export interface ServiceCategory {
  id: string
  name: string
  seoTagline: string
  description: string
  benefits: string[]
  technologies: string[]
  useCases: string[]
  pricing?: string
  icon?: string
  order: number
  isActive: boolean
}

export interface ServiceCategoryResponse {
  success: boolean
  data: ServiceCategory | ServiceCategory[]
  meta?: {
    total: number
  }
}

export interface ServiceCategoryError {
  success: false
  message: string
  code: string
  details?: Record<string, unknown>
}
