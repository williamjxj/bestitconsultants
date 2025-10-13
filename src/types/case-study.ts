export interface CaseStudy {
  id: string
  title: string
  challenge: string
  solution: string
  result: string
  metrics: CaseStudyMetric[]
  technologies: string[]
  client: string
  duration?: string
  teamSize?: number
  image?: string
  testimonial?: string
  category: string
}

export interface CaseStudyMetric {
  id: string
  name: string
  value: string
  unit: string
  improvement: string
  type: 'performance' | 'cost' | 'efficiency' | 'quality'
}

export interface CaseStudyResponse {
  success: boolean
  data?: CaseStudy | CaseStudy[]
  message?: string
  code?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}

export interface CaseStudyMetricsResponse {
  success: boolean
  data?: CaseStudyMetric | CaseStudyMetric[]
  message?: string
  code?: string
}

export interface CaseStudyError {
  success: false
  message: string
  code: string
  details?: Record<string, unknown>
}
