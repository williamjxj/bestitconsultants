/**
 * Zod validation schemas for form validation
 */

import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters')
    .trim(),
  company: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      'Please enter a valid phone number'
    )
    .trim()
    .optional()
    .or(z.literal('')),
  service: z
    .string()
    .optional()
    .or(z.literal('')),
  title: z
    .string()
    .max(200, 'Title must not exceed 200 characters')
    .trim()
    .optional()
    .or(z.literal('')),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

