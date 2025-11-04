import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get base URL for the application
 * @returns Base URL from environment variable or fallback
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  return 'https://bestitconsultants.ca'
}

/**
 * Get R2 bucket URL for an image
 * @param imagePath - Path relative to R2 bucket (e.g., 'selfies/william-jiang.jpg' or 'imgs/grok-1.jpg')
 * @returns Full R2 URL or fallback placeholder
 */
export function getR2ImageUrl(imagePath: string): string {
  const r2BaseUrl =
    process.env.R2_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL ||
    'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev'

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath

  return `${r2BaseUrl}/${cleanPath}`
}
