/**
 * OptimizedImage component for displaying images with Next.js optimization and Framer Motion animations
 * Provides accessibility, performance, and animation features
 */

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { OptimizedImageProps } from '@/types/media'

export function OptimizedImage({
  src,
  alt,
  title,
  description,
  width,
  height,
  priority = false,
  className,
  animation,
  hover,
}: OptimizedImageProps) {
  // Animation variants based on type
  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        scale: animation?.type === 'scale' ? 0.8 : 1,
        y: animation?.type === 'slide' ? 20 : 0,
        x: animation?.type === 'slide' ? 20 : 0,
        rotate: animation?.type === 'rotate' ? -5 : 0,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        rotate: 0,
        transition: {
          duration: animation?.duration || 0.6,
          delay: animation?.delay || 0,
          ease: 'easeOut',
        },
      },
    }

    if (hover) {
      baseVariants.hover = {
        scale: hover.scale || 1.05,
        opacity: hover.opacity || 1,
        transition: {
          duration: hover.duration || 0.3,
        },
      }
    }

    return baseVariants
  }

  const imageVariants = getAnimationVariants()

  return (
    <motion.div
      variants={imageVariants}
      initial='hidden'
      whileInView='visible'
      whileHover={hover ? 'hover' : undefined}
      viewport={{ once: true, margin: '-100px' }}
      className={cn('relative overflow-hidden rounded-lg', className)}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className='w-full h-full object-cover transition-transform duration-300'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        role='img'
        aria-label={alt}
      />
      {description && (
        <div className='absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <p className='text-white text-sm p-4 text-center'>{description}</p>
        </div>
      )}
    </motion.div>
  )
}
