'use client'

import { useState, useRef, useEffect } from 'react'

interface VideoWithPosterProps {
  videoSrc: string
  posterSrc: string
  alt: string
  width?: number
  height?: number
  className?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  lazy?: boolean
}

/**
 * Video component with poster image for performance
 * Lazy loads video when in viewport, shows poster initially
 */
export function VideoWithPoster({
  videoSrc,
  posterSrc,
  alt,
  width,
  height,
  className = '',
  autoplay = true,
  loop = true,
  muted = true,
  playsInline = true,
  lazy = true,
}: VideoWithPosterProps) {
  const [isInView, setIsInView] = useState(!lazy)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!lazy)
  // eslint-disable-next-line no-undef
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoadVideo) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            setShouldLoadVideo(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, shouldLoadVideo])

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  const handleVideoError = () => {
    // If video fails, keep showing poster
    setIsVideoLoaded(false)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg shadow-lg ${className}`}
      style={{
        width: width || '100%',
        aspectRatio: '4 / 3',
        padding: 0,
        margin: 0,
      }}
    >
      {/* Poster image - shown initially and as fallback */}
      <img
        src={posterSrc}
        alt={alt}
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ margin: 0, padding: 0 }}
        loading='lazy'
      />

      {/* Video - loaded when in view */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ margin: 0, padding: 0 }}
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          preload={isInView ? 'auto' : 'none'}
        />
      )}
    </div>
  )
}

