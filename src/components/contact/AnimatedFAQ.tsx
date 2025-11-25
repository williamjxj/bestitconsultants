'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface AnimatedFAQProps {
  items: FAQItem[]
  className?: string
  title?: string
}

/**
 * AnimatedFAQ component with modern card styles, smooth animations, and ref-based interactions
 * Uses shadcn/ui Card components with enhanced styling and hover effects
 */
export function AnimatedFAQ({
  items,
  className,
  title,
}: AnimatedFAQProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="h-full"
          >
            <Card
              className={cn(
                'group relative overflow-hidden h-full',
                'border-0 shadow-lg',
                'bg-gradient-to-br from-white via-white to-gray-50/50',
                'backdrop-blur-sm',
                'transition-all duration-300 ease-out',
                'hover:shadow-2xl hover:shadow-primary/10',
                'hover:-translate-y-1',
                'before:absolute before:inset-0',
                'before:bg-gradient-to-r before:from-primary/5 before:via-transparent before:to-transparent',
                'before:opacity-0 before:transition-opacity before:duration-300',
                'hover:before:opacity-100',
                'after:absolute after:top-0 after:left-0 after:right-0 after:h-1',
                'after:bg-gradient-to-r after:from-primary/0 after:via-primary/50 after:to-primary/0',
                'after:scale-x-0 after:transition-transform after:duration-500',
                'hover:after:scale-x-100'
              )}
            >
              <CardHeader className="pb-3">
                <CardTitle
                  className={cn(
                    'text-lg font-semibold',
                    'text-gray-900 group-hover:text-primary',
                    'transition-colors duration-300'
                  )}
                >
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={cn(
                    'text-gray-600 leading-relaxed',
                    'text-sm md:text-base'
                  )}
                >
                  {item.answer}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
