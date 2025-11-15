'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

import { cn } from '@/lib/utils'

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showNavigation?: boolean
  aspectRatio?: 'video' | 'square' | 'auto'
}

export function ImageCarousel({
  images,
  alt,
  className,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
  aspectRatio = 'video',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !images || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images])

  // Safety check: ensure we have images
  if (!images || images.length === 0) {
    return null
  }

  // If only one image, just render it without carousel
  if (images.length === 1) {
    return (
      <div className={cn('relative w-full overflow-hidden', className)}>
        <div
          className={cn(
            'relative w-full',
            aspectRatio === 'video' && 'aspect-video',
            aspectRatio === 'square' && 'aspect-square',
            aspectRatio === 'auto' && 'h-full'
          )}
        >
          <Image
            src={images[0]}
            alt={alt}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    auto: 'h-full',
  }

  return (
    <div className={cn('relative w-full overflow-hidden group', className)}>
      <div className={cn('relative w-full', aspectClasses[aspectRatio])}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='absolute inset-0'
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1}`}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <button
              onClick={goToPrevious}
              className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm'
              aria-label='Previous image'
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToNext}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm'
              aria-label='Next image'
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && (
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1.5'>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
