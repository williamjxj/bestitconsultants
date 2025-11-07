'use client'

import { useGSAP } from '@gsap/react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

import { AnimatedTitle } from '@/components/ui/animated-title'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface HeroSectionProps {
  // Content
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  badge?: string

  // Visual
  variant?: 'default' | 'centered' | 'split' | 'minimal' | 'carousel'
  background?:
    | 'gradient'
    | 'gradient-contact'
    | 'gradient-portfolio'
    | 'gradient-our-work'
    | 'image'
    | 'video'
    | 'pattern'
    | 'solid'
  backgroundImage?: string
  backgroundVideo?: string
  overlay?: boolean
  overlayOpacity?: number

  // Animation
  animation?: 'fade' | 'slide' | 'scale' | 'stagger'
  animationDelay?: number
  animationDuration?: number

  // Layout
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  textAlign?: 'left' | 'center' | 'right'

  // Styling
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string

  // Children for custom content
  children?: React.ReactNode
}

const sizeClasses = {
  sm: 'min-h-[400px] py-16',
  md: 'min-h-[500px] py-20',
  lg: 'min-h-[600px] py-24',
  xl: 'min-h-[700px] py-32',
  full: 'h-[calc(100vh-5rem)] py-32',
}

const textAlignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}

const backgroundClasses = {
  gradient: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800',
  'gradient-contact':
    'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700',
  'gradient-portfolio':
    'bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-700',
  'gradient-our-work':
    'bg-gradient-to-br from-rose-600 via-pink-600 to-red-600',
  image: 'bg-cover bg-center bg-no-repeat',
  video: 'relative overflow-hidden',
  pattern: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
  solid: 'bg-slate-900',
}

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  badge,
  variant: _variant = 'default',
  background = 'gradient',
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 0.6,
  animation: _animation = 'slide',
  animationDelay = 0,
  animationDuration: _animationDuration = 0.8,
  size = 'lg',
  textAlign = 'center',
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  children,
}: HeroSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const delay = animationDelay

  const renderBackground = () => {
    if (backgroundVideo) {
      return (
        <div className='absolute inset-0 w-full h-full'>
          <video
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
          >
            <source src={backgroundVideo} type='video/mp4' />
          </video>
          {overlay && (
            <div
              className='absolute inset-0 bg-black'
              style={{ opacity: overlayOpacity }}
            />
          )}
        </div>
      )
    }

    if (backgroundImage) {
      return (
        <>
          <div
            className='absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div
              className='absolute inset-0 bg-black'
              style={{ opacity: overlayOpacity }}
            />
          )}
        </>
      )
    }

    // Add GSAP floating shapes for pattern background
    if (background === 'pattern') {
      return <GSAPFloatingShapes />
    }

    return null
  }

  const renderContent = () => {
    if (children) {
      return children
    }

    return (
      <div
        className={cn(
          'relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
          'flex flex-col justify-center',
          sizeClasses[size],
          textAlignClasses[textAlign]
        )}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: delay + 0.1 }}
            className='mb-6'
          >
            <Badge
              variant='secondary'
              className='px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
            >
              {badge}
            </Badge>
          </motion.div>
        )}

        {/* Title */}
        {title && (
          <div ref={ref}>
            <AnimatedTitle
              title={title}
              className={titleClassName}
              textAlign={textAlign}
            />
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: delay + 0.4 }}
            className={cn(
              'text-xl sm:text-2xl md:text-3xl font-semibold mb-6',
              'text-blue-200 drop-shadow-lg',
              subtitleClassName
            )}
          >
            {subtitle}
          </motion.h2>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: delay + 0.6 }}
            className={cn(
              'text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl',
              'leading-relaxed drop-shadow-md',
              textAlign === 'center' && 'mx-auto',
              descriptionClassName
            )}
          >
            {description}
          </motion.p>
        )}

        {/* CTA Buttons */}
        {(ctaText || secondaryCtaText) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: delay + 0.8 }}
            className={cn(
              'flex flex-col sm:flex-row gap-4',
              textAlign === 'center' && 'justify-center',
              textAlign === 'right' && 'justify-end',
              textAlign === 'left' && 'justify-start'
            )}
          >
            {ctaText && (
              <Button
                asChild
                size='lg'
                className='px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30'
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                }}
              >
                <a href={ctaLink || '#'}>{ctaText}</a>
              </Button>
            )}
            {secondaryCtaText && (
              <Button
                asChild
                variant='outline'
                size='lg'
                className='px-8 py-4 text-lg font-semibold bg-white text-blue-600 border-white hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300'
              >
                <a href={secondaryCtaLink || '#'}>{secondaryCtaText}</a>
              </Button>
            )}
          </motion.div>
        )}

        {/* Floating Elements */}
        <FloatingElements />
      </div>
    )
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        backgroundClasses[background],
        className
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {renderBackground()}
      {renderContent()}
    </section>
  )
}

// Floating elements for visual interest
function FloatingElements() {
  return (
    <>
      {/* Floating circles */}
      <motion.div
        className='absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl'
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className='absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full blur-lg'
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className='absolute bottom-20 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full blur-md'
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </>
  )
}

// GSAP Floating Shapes Background Component
function GSAPFloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<(HTMLDivElement | null)[]>([])

  // Brighter, more visible shapes with higher opacity
  const shapes = [
    {
      type: 'circle',
      size: 120,
      color: 'rgba(96, 165, 250, 0.4)', // Brighter blue
      top: '10%',
      left: '15%',
    },
    {
      type: 'square',
      size: 100,
      color: 'rgba(167, 139, 250, 0.4)', // Brighter purple
      top: '20%',
      left: '75%',
    },
    {
      type: 'triangle',
      size: 140,
      color: 'rgba(251, 113, 133, 0.4)', // Brighter pink
      top: '60%',
      left: '10%',
    },
    {
      type: 'circle',
      size: 80,
      color: 'rgba(74, 222, 128, 0.4)', // Brighter green
      top: '70%',
      left: '80%',
    },
    {
      type: 'square',
      size: 90,
      color: 'rgba(251, 146, 60, 0.4)', // Brighter orange
      top: '40%',
      left: '50%',
    },
    {
      type: 'circle',
      size: 110,
      color: 'rgba(192, 132, 252, 0.4)', // Brighter purple
      top: '85%',
      left: '45%',
    },
  ]

  useGSAP(
    () => {
      // Animate each shape with random floating motion
      shapesRef.current.forEach((shape, index) => {
        if (!shape) return

        // Random duration between 4-7 seconds
        const duration = gsap.utils.random(4, 7)

        // Random movement range (smaller for subtle effect)
        const xMovement = gsap.utils.random(-80, 80)
        const yMovement = gsap.utils.random(-80, 80)
        const rotation = gsap.utils.random(-120, 120)
        const scale = gsap.utils.random(0.85, 1.15)

        // Create floating animation
        gsap.to(shape, {
          x: xMovement,
          y: yMovement,
          rotation: rotation,
          scale: scale,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        })

        // Add subtle opacity pulse
        gsap.to(shape, {
          opacity: gsap.utils.random(0.3, 0.5),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      })

      // Cleanup function
      return () => {
        shapesRef.current.forEach(shape => {
          if (shape) {
            gsap.killTweensOf(shape)
          }
        })
      }
    },
    { scope: containerRef }
  )

  // Mouse parallax effect (subtle)
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const { clientX, clientY } = e
      const xPercent = (clientX / window.innerWidth - 0.5) * 2
      const yPercent = (clientY / window.innerHeight - 0.5) * 2

      shapesRef.current.forEach((shape, index) => {
        if (!shape) return

        const speed = (index + 1) * 0.3 // Subtle parallax
        gsap.to(shape, {
          x: `+=${xPercent * speed * 5}`,
          y: `+=${yPercent * speed * 5}`,
          duration: 0.8,
          ease: 'power2.out',
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'
      style={{ zIndex: 0 }}
    >
      {/* Floating Shapes */}
      {shapes.map((shape, index) => (
        <div
          key={index}
          ref={el => {
            shapesRef.current[index] = el
          }}
          className='absolute'
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
          }}
        >
          {shape.type === 'circle' && (
            <div
              className='w-full h-full rounded-full blur-2xl'
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className='w-full h-full rounded-2xl blur-2xl'
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className='w-full h-full blur-2xl'
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                backgroundColor: shape.color,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
