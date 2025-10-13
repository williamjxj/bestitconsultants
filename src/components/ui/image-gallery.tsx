/**
 * ImageGallery component for displaying collections of images with animations
 * Supports grid, carousel, and masonry layouts with Framer Motion animations
 */

'use client'

import { motion } from 'framer-motion'

import { OptimizedImage } from './optimized-image'

import { cn } from '@/lib/utils'
import { ImageGalleryProps } from '@/types/media'

export function ImageGallery({
  images,
  layout = 'grid',
  columns = 3,
  spacing = 16,
  className,
}: ImageGalleryProps) {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Individual item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Grid column classes mapping
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }

  // Layout-specific classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'carousel':
        return 'flex overflow-x-auto snap-x snap-mandatory'
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 xl:columns-4'
      case 'grid':
      default:
        return `grid gap-4 ${gridCols[columns as keyof typeof gridCols]}`
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      className={cn(getLayoutClasses(), className)}
      style={{ gap: `${spacing}px` }}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          className={cn(
            'relative group cursor-pointer',
            layout === 'masonry' && 'break-inside-avoid mb-4',
            layout === 'carousel' && 'flex-shrink-0 snap-center'
          )}
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            title={image.title}
            description={image.description}
            width={image.width}
            height={image.height}
            animation={{
              type: 'fade',
              duration: 0.6,
              delay: index * 0.1,
            }}
            hover={{
              scale: 1.05,
              duration: 0.3,
            }}
            className='w-full h-full'
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
