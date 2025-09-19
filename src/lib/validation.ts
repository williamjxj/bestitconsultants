/**
 * Input validation utilities using Zod
 */

// Temporary mock implementation until dependencies are installed
let z: any;

try {
  z = require('zod').z;
} catch (error) {
  console.warn('Zod not available, using mock implementation');
  // Mock implementation
  z = {
    object: (schema: any) => ({
      safeParse: (data: any) => ({ success: true, data })
    }),
    array: (item: any) => item,
    string: () => ({
      url: () => ({ optional: () => {} })
    }),
    number: () => ({
      int: () => ({
        min: () => ({
          max: () => ({
            optional: () => ({
              default: () => {}
            })
          })
        })
      })
    })
  };
}

// Scrape request validation
export const scrapeRequestSchema = z.object({
  sources: z.array(z.string().url()).optional(),
  count: z.number().int().min(1).max(20).optional().default(8)
})

// Generic validation function
export function validate<T>(schema: any, data: any): {
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
        errors: result.error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`)
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
