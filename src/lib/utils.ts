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

/**
 * Generate a professional avatar URL using UI Avatars service
 * @param name - Full name of the person
 * @param size - Size of the avatar (default: 128)
 * @param background - Background color in hex (default: 3b82f6 - blue)
 * @param color - Text color in hex (default: ffffff - white)
 * @returns URL to the generated avatar
 */
export function getProfessionalAvatarUrl(
  name: string,
  size: number = 128,
  background: string = '3b82f6',
  color: string = 'ffffff'
): string {
  // UI Avatars is a free service that generates avatars from names
  // Format: https://ui-avatars.com/api/?name=John+Doe&size=128&background=3b82f6&color=ffffff
  const encodedName = encodeURIComponent(name.trim())
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=${background}&color=${color}&bold=true&font-size=0.5`
}
