/**
 * TypeScript types for contact form data and related entities
 */

export interface ContactFormData {
  name: string
  email: string
  message: string
  company?: string
  phone?: string
  service?: string
  title?: string
}

export interface ContactFormURLParams {
  service?: string
  title?: string
  message?: string
}

export interface ContactFormSubmission extends ContactFormData {
  submittedAt: Date
}

export type ContactFormStatus =
  | 'draft'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error'
