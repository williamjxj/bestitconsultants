'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

interface AnimatedTitleProps {
  title: string
  className?: string
  textAlign?: 'left' | 'center' | 'right'
}

/**
 * Animated title component that animates each character with Framer Motion
 * Each word is wrapped in a div with overflow:hidden
 * Characters animate from above, bounce down, and settle into position
 */
export function AnimatedTitle({
  title,
  className,
  textAlign = 'center',
}: AnimatedTitleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Split title into words
  const words = title.split(' ')

  const justifyClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  // Calculate character indices for stagger animation
  const getCharIndex = (wordIndex: number, charIndex: number): number => {
    let index = 0
    for (let i = 0; i < wordIndex; i++) {
      index += words[i].length + 1 // +1 for space
    }
    return index + charIndex
  }

  return (
    <motion.h1
      ref={ref}
      className={cn(
        'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6',
        'drop-shadow-2xl',
        'flex flex-wrap items-center gap-x-2',
        justifyClasses[textAlign],
        className
      )}
      style={{
        background:
          'linear-gradient(to right, white, rgb(219 234 254), rgb(243 232 255))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {words.map((word, wordIndex) => (
        <div
          key={wordIndex}
          className='overflow-hidden inline-block'
          style={{
            display: 'inline-block',
          }}
        >
          {word.split('').map((char, charIndex) => {
            const globalIndex = getCharIndex(wordIndex, charIndex)
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ y: -150, opacity: 0 }}
                animate={
                  isInView ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }
                }
                transition={{
                  duration: 1,
                  delay: globalIndex * 0.05,
                  ease: [0.68, -0.55, 0.265, 1.55], // bounce-like easing
                }}
                className='inline-block'
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 && (
            <motion.span
              initial={{ y: -150, opacity: 0 }}
              animate={
                isInView ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }
              }
              transition={{
                duration: 1,
                delay: getCharIndex(wordIndex, word.length) * 0.05,
                ease: [0.68, -0.55, 0.265, 1.55],
              }}
              className='inline-block'
            >
              {' '}
            </motion.span>
          )}
        </div>
      ))}
    </motion.h1>
  )
}
