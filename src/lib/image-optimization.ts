/**
 * Image optimization utilities for Next.js applications
 * Provides functions for image processing, format conversion, and optimization
 */

import { MediaFormat } from '@/types/media'

export interface ImageOptimizationOptions {
  width?: number
  height?: number
  format?: MediaFormat
  quality?: number
  progressive?: boolean
  placeholder?: boolean
}

export interface OptimizedImageResult {
  src: string
  width: number
  height: number
  format: MediaFormat
  size: number
  placeholder?: string
}

/**
 * Get optimized image URL with Next.js Image component
 */
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const url = new URL(src, process.env.NEXT_PUBLIC_BASE_URL || '')

  if (options.width) url.searchParams.set('w', options.width.toString())
  if (options.height) url.searchParams.set('h', options.height.toString())
  if (options.format) url.searchParams.set('f', options.format)
  if (options.quality) url.searchParams.set('q', options.quality.toString())
  if (options.progressive) url.searchParams.set('p', '1')

  return url.toString()
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export function getResponsiveSizes(breakpoints: {
  [key: string]: number
}): string {
  return Object.entries(breakpoints)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}px) ${size}px`)
    .join(', ')
}

/**
 * Default responsive breakpoints for common use cases
 */
export const defaultBreakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1280,
  xlarge: 1536,
}

/**
 * Get responsive sizes for common layouts
 */
export const responsiveSizes = {
  hero: getResponsiveSizes({
    [defaultBreakpoints.mobile]: 640,
    [defaultBreakpoints.tablet]: 768,
    [defaultBreakpoints.desktop]: 1024,
    [defaultBreakpoints.large]: 1280,
  }),

  card: getResponsiveSizes({
    [defaultBreakpoints.mobile]: 300,
    [defaultBreakpoints.tablet]: 400,
    [defaultBreakpoints.desktop]: 500,
  }),

  thumbnail: getResponsiveSizes({
    [defaultBreakpoints.mobile]: 150,
    [defaultBreakpoints.tablet]: 200,
    [defaultBreakpoints.desktop]: 250,
  }),

  gallery: getResponsiveSizes({
    [defaultBreakpoints.mobile]: 300,
    [defaultBreakpoints.tablet]: 400,
    [defaultBreakpoints.desktop]: 500,
    [defaultBreakpoints.large]: 600,
  }),
}

/**
 * Generate a low-quality placeholder for lazy loading
 */
export function generatePlaceholder(width: number, height: number): string {
  // Create a simple colored rectangle as placeholder
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f3f4f6')
    gradient.addColorStop(1, '#e5e7eb')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add a subtle pattern
    ctx.fillStyle = '#d1d5db'
    for (let i = 0; i < width; i += 20) {
      for (let j = 0; j < height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10)
        }
      }
    }
  }

  return canvas.toDataURL('image/jpeg', 0.1)
}

/**
 * Generate a blur placeholder using canvas
 */
export function generateBlurPlaceholder(width: number, height: number): string {
  const canvas = document.createElement('canvas')
  canvas.width = Math.min(width, 20)
  canvas.height = Math.min(height, 20)
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return canvas.toDataURL('image/jpeg', 0.1)
}

/**
 * Validate image format
 */
export function isValidImageFormat(format: string): format is MediaFormat {
  return ['webp', 'avif', 'jpeg', 'png'].includes(format.toLowerCase())
}

/**
 * Get image format from file extension
 */
export function getImageFormatFromExtension(filename: string): MediaFormat {
  const extension = filename.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'webp':
      return 'webp'
    case 'avif':
      return 'avif'
    case 'jpg':
    case 'jpeg':
      return 'jpeg'
    case 'png':
      return 'png'
    default:
      return 'jpeg'
  }
}

/**
 * Get optimal image format based on browser support
 */
export function getOptimalImageFormat(): MediaFormat {
  if (typeof window === 'undefined') return 'jpeg'

  // Check for AVIF support
  const avifSupported =
    document
      .createElement('canvas')
      .toDataURL('image/avif')
      .indexOf('data:image/avif') === 0

  if (avifSupported) return 'avif'

  // Check for WebP support
  const webpSupported =
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0

  if (webpSupported) return 'webp'

  return 'jpeg'
}

/**
 * Calculate aspect ratio
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height
}

/**
 * Get dimensions that maintain aspect ratio
 */
export function getAspectRatioDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = calculateAspectRatio(originalWidth, originalHeight)

  let width = maxWidth
  let height = maxWidth / aspectRatio

  if (height > maxHeight) {
    height = maxHeight
    width = maxHeight * aspectRatio
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  }
}

/**
 * Get image loading priority based on position
 */
export function getImagePriority(
  position: 'above-fold' | 'below-fold' | 'hero' | 'background'
): boolean {
  switch (position) {
    case 'above-fold':
    case 'hero':
    case 'background':
      return true
    case 'below-fold':
    default:
      return false
  }
}

/**
 * Get image loading strategy
 */
export function getImageLoadingStrategy(
  position: 'above-fold' | 'below-fold' | 'hero' | 'background'
): 'eager' | 'lazy' {
  return getImagePriority(position) ? 'eager' : 'lazy'
}

/**
 * Generate image metadata for SEO
 */
export function generateImageMetadata(
  src: string,
  alt: string,
  title?: string
): {
  title: string
  description: string
  keywords: string[]
  structuredData: object
} {
  return {
    title: title || alt,
    description: alt,
    keywords: alt
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 3),
    structuredData: {
      '@type': 'ImageObject',
      url: src,
      caption: alt,
      description: alt,
    },
  }
}

/**
 * Optimize image for Core Web Vitals
 */
export function optimizeForCoreWebVitals(
  src: string,
  options: ImageOptimizationOptions = {}
): {
  src: string
  sizes: string
  priority: boolean
  loading: 'eager' | 'lazy'
} {
  return {
    src: getOptimizedImageUrl(src, options),
    sizes: responsiveSizes.card,
    priority: getImagePriority('above-fold'),
    loading: getImageLoadingStrategy('above-fold'),
  }
}

/**
 * Get image dimensions from URL or file
 */
export function getImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`))
    }
    img.src = src
  })
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, as: 'image' = 'image'): void {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = src
  link.as = as
  document.head.appendChild(link)
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImages(selector: string = 'img[data-src]'): void {
  if (typeof window === 'undefined') return

  const images = document.querySelectorAll(selector)

  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))
}
