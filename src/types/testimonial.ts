/**
 * Testimonial types for the BestIT Consulting website
 * Based on the data model from specs/001-ui-ux-enhancement/data-model.md
 */

export interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  company: string
  isVisible: boolean
  order?: number
  displayOrder?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TestimonialState {
  testimonials: Testimonial[]
  isLoading: boolean
  error: string | null
}
