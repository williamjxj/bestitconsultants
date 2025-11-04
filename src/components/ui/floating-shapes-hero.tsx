'use client'

import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface FloatingShapesHeroProps {
  title: string
  description: string
  badge?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

export function FloatingShapesHero({
  title,
  description,
  badge,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: FloatingShapesHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    // Animate each shape with random floating motion
    shapesRef.current.forEach((shape, index) => {
      if (!shape) return

      // Random duration between 3-6 seconds
      const duration = gsap.utils.random(3, 6)

      // Random movement range
      const xMovement = gsap.utils.random(-100, 100)
      const yMovement = gsap.utils.random(-100, 100)
      const rotation = gsap.utils.random(-180, 180)
      const scale = gsap.utils.random(0.8, 1.2)

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
        delay: index * 0.2,
      })

      // Add subtle opacity pulse
      gsap.to(shape, {
        opacity: gsap.utils.random(0.3, 0.7),
        duration: gsap.utils.random(2, 4),
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
  }, { scope: containerRef })

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPercent = (clientX / window.innerWidth - 0.5) * 2
      const yPercent = (clientY / window.innerHeight - 0.5) * 2

      shapesRef.current.forEach((shape, index) => {
        if (!shape) return

        const speed = (index + 1) * 0.5
        gsap.to(shape, {
          x: `+=${xPercent * speed * 10}`,
          y: `+=${yPercent * speed * 10}`,
          duration: 0.5,
          ease: 'power2.out',
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate random shapes
  const shapes = [
    {
      type: 'circle',
      size: 120,
      color: 'rgba(59, 130, 246, 0.15)',
      top: '10%',
      left: '15%',
    },
    {
      type: 'square',
      size: 100,
      color: 'rgba(139, 92, 246, 0.15)',
      top: '20%',
      left: '75%',
    },
    {
      type: 'triangle',
      size: 140,
      color: 'rgba(236, 72, 153, 0.15)',
      top: '60%',
      left: '10%',
    },
    {
      type: 'circle',
      size: 80,
      color: 'rgba(34, 197, 94, 0.15)',
      top: '70%',
      left: '80%',
    },
    {
      type: 'square',
      size: 90,
      color: 'rgba(251, 146, 60, 0.15)',
      top: '40%',
      left: '50%',
    },
    {
      type: 'circle',
      size: 110,
      color: 'rgba(168, 85, 247, 0.15)',
      top: '85%',
      left: '45%',
    },
    {
      type: 'triangle',
      size: 70,
      color: 'rgba(14, 165, 233, 0.15)',
      top: '25%',
      left: '30%',
    },
    {
      type: 'square',
      size: 95,
      color: 'rgba(244, 63, 94, 0.15)',
      top: '50%',
      left: '85%',
    },
  ]

  return (
    <div
      ref={containerRef}
      className='relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden'
    >
      {/* Floating Shapes */}
      {shapes.map((shape, index) => (
        <div
          key={index}
          ref={el => (shapesRef.current[index] = el)}
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
              className='w-full h-full rounded-full blur-xl'
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className='w-full h-full rounded-2xl blur-xl'
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className='w-full h-full blur-xl'
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                backgroundColor: shape.color,
              }}
            />
          )}
        </div>
      ))}

      {/* Hero Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-6'>
        {badge && (
          <span className='inline-block px-4 py-2 mb-6 text-sm font-semibold text-white bg-blue-600/30 backdrop-blur-sm rounded-full border border-blue-400/30'>
            {badge}
          </span>
        )}
        <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg'>
          {title}
        </h1>
        <p className='text-lg md:text-xl text-gray-200 max-w-3xl mb-8 drop-shadow-md leading-relaxed'>
          {description}
        </p>
        {(ctaText || secondaryCtaText) && (
          <div className='flex flex-col sm:flex-row gap-4 mt-4'>
            {ctaText && (
              <a
                href={ctaLink || '#'}
                className='px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
              >
                {ctaText}
              </a>
            )}
            {secondaryCtaText && (
              <a
                href={secondaryCtaLink || '#'}
                className='px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-lg font-semibold transition-all duration-300 border border-white/20 hover:border-white/30'
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50 pointer-events-none' />
    </div>
  )
}

