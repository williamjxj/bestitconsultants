'use client'

import { motion, useScroll } from 'framer-motion'
import { Search, ClipboardList, Code, Rocket, CheckCircle2 } from 'lucide-react'
import React, { useRef } from 'react'

interface WorkflowStep {
  title: string
  description: string
}

interface WorkflowSectionProps {
  steps: WorkflowStep[]
  language: string
}

const icons = [Search, ClipboardList, Code, Rocket]

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={containerRef} className='relative py-12'>
      {/* Desktop View (Horizontal/Zig-zag) */}
      <div className='hidden lg:block relative'>
        <svg
          className='absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 pointer-events-none'
          viewBox='0 0 1000 100'
          fill='none'
          preserveAspectRatio='none'
        >
          {/* Background Path */}
          <path
            d='M 50 50 Q 150 10, 250 50 T 450 50 T 650 50 T 850 50'
            stroke='url(#gradient-bg)'
            strokeWidth='4'
            strokeLinecap='round'
            fill='none'
            className='opacity-20'
          />
          {/* Animated Path */}
          <motion.path
            d='M 50 50 Q 150 10, 250 50 T 450 50 T 650 50 T 850 50'
            stroke='url(#gradient-flow)'
            strokeWidth='4'
            strokeLinecap='round'
            fill='none'
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id='gradient-bg' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#3b82f6' />
              <stop offset='100%' stopColor='#8b5cf6' />
            </linearGradient>
            <linearGradient
              id='gradient-flow'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop offset='0%' stopColor='#60a5fa' />
              <stop offset='50%' stopColor='#a78bfa' />
              <stop offset='100%' stopColor='#60a5fa' />
            </linearGradient>
          </defs>
        </svg>

        <div className='grid grid-cols-4 gap-8 relative z-10'>
          {steps.map((step, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className='flex flex-col items-center text-center p-6 group focus-within:ring-2 focus-within:ring-blue-500 rounded-3xl'
              >
                <div className='relative mb-6'>
                  {/* Decorative outer ring */}
                  <motion.div
                    className='absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500'
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className='w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-xl relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300'
                    whileHover={{
                      rotate: [3, -3, 3],
                      transition: { duration: 0.3, repeat: Infinity },
                    }}
                  >
                    <Icon className='w-10 h-10' />
                    <div className='absolute -top-2 -right-2 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shadow-md'>
                      0{index + 1}
                    </div>
                  </motion.div>
                </div>
                <h3 className='text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'>
                  {step.title}
                </h3>
                <p className='text-sm text-slate-600 leading-relaxed max-w-[200px] group-hover:text-slate-900 transition-colors'>
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className='absolute top-1/2 -right-4 translate-x-1/2 hidden lg:block'>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <CheckCircle2 className='w-6 h-6 text-blue-400 opacity-30' />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile View (Vertical) */}
      <div className='lg:hidden space-y-12 relative px-4'>
        {/* Continuous Vertical Line */}
        <div className='absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 -translate-x-1/2 opacity-50' />

        {steps.map((step, index) => {
          const Icon = icons[index]
          const isEven = index % 2 === 0
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={`flex items-center gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'} relative z-10`}
            >
              <div className='flex-1 text-right'>
                {isEven && (
                  <div>
                    <h3 className='text-lg font-bold text-blue-700'>
                      {step.title}
                    </h3>
                    <p className='text-sm text-slate-600'>{step.description}</p>
                  </div>
                )}
              </div>

              <div className='relative'>
                <motion.div
                  className='w-14 h-14 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg relative z-10'
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className='w-7 h-7' />
                </motion.div>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500/10 rounded-full blur-xl -z-10' />
              </div>

              <div className='flex-1 text-left'>
                {!isEven && (
                  <div>
                    <h3 className='text-lg font-bold text-purple-700'>
                      {step.title}
                    </h3>
                    <p className='text-sm text-slate-600'>{step.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
