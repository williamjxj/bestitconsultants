'use client'

import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { OptimizedImage } from './optimized-image'

export interface HeroCarouselItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  video?: string
  ctaText: string
  ctaLink: string
}

interface HeroCarouselProps {
  items: HeroCarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showNavigation?: boolean
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return

    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % items.length)
  }

  const currentItem = items[currentIndex]

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      {/* Carousel Items */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          {/* Background Image/Video */}
          <div className='relative w-full h-full'>
            {currentItem.video ? (
              <video
                className='w-full h-full object-cover'
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={currentItem.video} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : (
              <OptimizedImage
                src={currentItem.image}
                alt={currentItem.title}
                width={1920}
                height={1080}
                priority={currentIndex === 0}
                className='w-full h-full object-cover'
                animation={{
                  type: 'fade',
                  duration: 1.2,
                }}
              />
            )}

            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80' />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='absolute inset-0 flex items-center justify-center z-10'
          >
            <div className='text-center text-white max-w-4xl mx-auto px-4'>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='text-4xl md:text-6xl font-bold mb-4'
              >
                {currentItem.title}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className='text-2xl md:text-3xl font-semibold mb-6 text-blue-200'
              >
                {currentItem.subtitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className='text-lg md:text-xl mb-8 max-w-3xl mx-auto'
              >
                {currentItem.description}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300'
                onClick={() => window.open(currentItem.ctaLink, '_blank')}
              >
                {currentItem.ctaText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showNavigation && items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm'
            aria-label='Previous slide'
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm'
            aria-label='Next slide'
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2'>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && items.length > 1 && (
        <div className='absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20'>
          <motion.div
            className='h-full bg-white'
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  )
}
