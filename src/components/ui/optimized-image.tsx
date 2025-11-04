/**
 * OptimizedImage component
 * Next.js Image component optimized for R2 integration
 */

'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  className?: string
  style?: React.CSSProperties
  sizes?: string
  fill?: boolean
  onLoad?: () => void
  onError?: () => void
  // Additional props for compatibility
  animation?: {
    type?: string
    duration?: number
    delay?: number
  }
  hover?: {
    scale?: number
    duration?: number
  }
  title?: string
  description?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  className,
  style,
  sizes,
  fill = false,
  onLoad,
  onError,
  animation: _animation,
  hover: _hover,
  title: _title,
  description: _description,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Reset state when src changes - force full reset
    setIsLoading(true)
    setHasError(false)
    setImageSrc(src)
    // Small delay to ensure state is fully reset before next render
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Generate optimized src based on environment
  const getOptimizedSrc = (originalSrc: string): string => {
    // If src is already a full URL (R2 or external), use as-is
    if (
      originalSrc.startsWith('http://') ||
      originalSrc.startsWith('https://')
    ) {
      return originalSrc
    }

    // Public folder paths (root-level files only) are served directly by Next.js
    // R2 images are handled via full URLs, offices folder is now in R2
    const publicFolderPaths: string[] = []

    // Root-level public files (like /placeholder.svg, /favicon.ico, etc.)
    const publicFileExtensions = [
      '.svg',
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      '.gif',
      '.ico',
      '.avif',
    ]
    const isRootPublicFile =
      originalSrc.startsWith('/') &&
      publicFileExtensions.some(ext =>
        originalSrc.toLowerCase().endsWith(ext)
      ) &&
      !originalSrc.includes('/api/') &&
      originalSrc.split('/').length === 2 // Root level file (e.g., /placeholder.svg)

    if (
      originalSrc.startsWith('/') &&
      (publicFolderPaths.some(path => originalSrc.startsWith(path)) ||
        isRootPublicFile)
    ) {
      return originalSrc
    }

    // For other local paths, use the proxy API in both development and production
    if (originalSrc.startsWith('/')) {
      return `/api/images/proxy${originalSrc}`
    }

    // For relative paths, assume they're local and use proxy
    return `/api/images/proxy/${originalSrc}`
  }

  const optimizedSrc = getOptimizedSrc(imageSrc)

  // Fallback image for errors
  const fallbackSrc = '/placeholder.svg'

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <div className='absolute inset-0 bg-gray-200 animate-pulse rounded' />
      )}

      <Image
        key={optimizedSrc}
        src={hasError ? fallbackSrc : optimizedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'opacity-50' : ''}`}
        {...props}
      />

      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm'>
          Image unavailable
        </div>
      )}
    </div>
  )
}

/**
 * Hero image component with specific optimizations
 */
export function HeroImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'priority' | 'quality' | 'placeholder'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      priority={true}
      quality={85}
      placeholder='blur'
      className={className}
      {...props}
    />
  )
}

/**
 * Portfolio image component with grid optimizations
 */
export function PortfolioImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'sizes' | 'quality'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      quality={80}
      className={className}
      {...props}
    />
  )
}

/**
 * Thumbnail image component for small images
 */
export function ThumbnailImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'quality' | 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      quality={60}
      sizes='(max-width: 768px) 50vw, 25vw'
      className={className}
      {...props}
    />
  )
}

/**
 * Lazy loaded image component
 */
export function LazyImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'priority'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      priority={false}
      className={className}
      {...props}
    />
  )
}

export default OptimizedImage
