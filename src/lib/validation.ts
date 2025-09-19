/**
 * Input validation utilities using Zod
 */

import { z } from 'zod'

// Scrape request validation
export const scrapeRequestSchema = z.object({
  sources: z.array(z.string().url()).optional(),
  count: z.number().int().min(1).max(20).optional().default(8)
})

// Generic validation function
export function validate<T>(schema: z.ZodSchema<T>, data: any): {
  success: boolean
  data?: T
  errors?: string[]
} {
  try {
    const result = schema.safeParse(data)
    if (result.success) {
      return {
        success: true,
        data: result.data
      }
    } else {
      return {
        success: false,
        errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      }
    }
  } catch (error) {
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Validation error']
    }
  }
}

export function validateScrapeRequest(data: any) {
  return validate(scrapeRequestSchema, data)
}
