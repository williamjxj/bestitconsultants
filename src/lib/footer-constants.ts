/**
 * Footer constants and configuration
 */

export const PRESENTATION_URL =
  'https://gamma.app/docs/Best-IT-Consultants-1v8t3nud1ghb4iq'

export const DEFAULT_WEBSITE_URL = 'https://bestitconsultants.com'

/**
 * Get the website URL for QR code generation
 * Uses current origin in browser, falls back to default URL
 */
export function getWebsiteUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return DEFAULT_WEBSITE_URL
}
