'use client'

import { useState, useEffect, useRef } from 'react'

interface PictureImageProps {
  srcBase: string // Base name without extension (e.g., '/optimized/b1')
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
  fill?: boolean
}

/**
 * PictureImage component with AVIF/WebP fallback support
 * Uses <picture> element for explicit format control
 */
export function PictureImage({
  srcBase,
  alt,
  width,
  height,
  priority = false,
  className = '',
  style,
  onLoad,
  onError,
  fill = false,
}: PictureImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)

    // Fallback: if image is already loaded (cached), show it immediately
    // Check if image is already loaded after a short delay
    let errorTimeout: number | null = null

    const checkImageLoaded = () => {
      if (imgRef.current) {
        if (imgRef.current.complete && imgRef.current.naturalHeight !== 0) {
          setIsLoading(false)
          setHasError(false)
        } else if (imgRef.current.complete && imgRef.current.naturalHeight === 0) {
          // Image failed to load - but wait a bit more before showing error
          // Sometimes the browser needs time to try all sources in picture element
          errorTimeout = window.setTimeout(() => {
            if (imgRef.current?.complete && imgRef.current.naturalHeight === 0) {
              setIsLoading(false)
              setHasError(true)
            }
          }, 1000)
        }
      }
    }

    // Check after a delay to allow image to start loading
    const timeout = window.setTimeout(checkImageLoaded, 200)
    return () => {
      window.clearTimeout(timeout)
      if (errorTimeout) {
        window.clearTimeout(errorTimeout)
      }
    }
  }, [srcBase])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Only show error if the final fallback (WebP) also fails
    // The browser automatically tries AVIF first, then WebP
    const target = e.currentTarget
    if (process.env.NODE_ENV === 'development') {
      console.error('Image failed to load:', {
        srcBase,
        avifSrc: `${srcBase}.avif`,
        webpSrc: `${srcBase}.webp`,
        attemptedSrc: target.src,
        naturalWidth: target.naturalWidth,
        naturalHeight: target.naturalHeight,
        complete: target.complete,
        error: e,
      })
    }

    // Only set error if image is truly failed (not just loading)
    // Sometimes error fires but image is still loading
    if (target.complete && target.naturalWidth === 0) {
      setIsLoading(false)
      setHasError(true)
      onError?.()
    }
  }

  // Construct paths for AVIF and WebP
  // In Next.js, files in /public are served from root
  const avifSrc = `${srcBase}.avif`
  const webpSrc = `${srcBase}.webp`
  const fallbackSrc = `${srcBase}.webp` // WebP as final fallback

  // Log paths in development for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PictureImage paths:', { srcBase, avifSrc, webpSrc, fallbackSrc })
    }
  }, [srcBase, avifSrc, webpSrc, fallbackSrc])

  const imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    alt,
    onLoad: handleLoad,
    onError: handleError as React.ReactEventHandler<HTMLImageElement>,
    className: `${className}`,
    style: {
      ...style,
      objectFit: 'cover' as const,
      objectPosition: 'center',
      ...(fill
        ? {
            width: '100%',
            height: '100%',
          }
        : {}),
    },
    loading: priority ? ('eager' as const) : ('lazy' as const),
    ...(fill
      ? {}
      : {
          width: width || 1920,
          height: height || 1080,
        }),
  }

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {isLoading && (
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80 z-0' />
      )}

      <picture className={fill ? 'absolute inset-0 w-full h-full z-0' : 'block'}>
        {/* AVIF source - best compression, modern browsers */}
        <source srcSet={avifSrc} type='image/avif' />
        {/* WebP source - good compression, wider support */}
        <source srcSet={webpSrc} type='image/webp' />
        {/* Fallback image */}
        <img
          ref={imgRef}
          src={fallbackSrc}
          alt={alt}
          {...imageProps}
          className={`transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${hasError ? 'opacity-50' : ''} ${fill ? 'absolute inset-0 w-full h-full' : ''} ${imageProps.className}`}
        />
      </picture>

      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm z-10'>
          Image unavailable
        </div>
      )}
    </div>
  )
}

