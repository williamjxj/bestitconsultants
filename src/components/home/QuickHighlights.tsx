import { motion } from 'framer-motion'
import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

export const QuickHighlights: React.FC = () => {
  const highlights = [
    {
      title: '20+ Years Experience',
      description: 'Full-stack and AI expertise trusted by global enterprises',
      icon: '👥',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Cost-Effective Outsourcing',
      description: 'Scale quickly with top-tier global engineering teams',
      icon: '💰',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Enterprise-Grade AI',
      description: 'Cloud, automation, and AI-driven business transformation',
      icon: '🤖',
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <div className='py-20 bg-gradient-to-b from-white via-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group'
            >
              <Card className='relative overflow-hidden h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500'>
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <CardContent className='relative z-10 p-8 text-center h-full flex flex-col items-center justify-center min-h-[280px]'>
                  {/* Icon with gradient background */}
                  <motion.div
                    className={`mb-6 p-5 rounded-3xl bg-gradient-to-br ${highlight.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='text-4xl'>{highlight.icon}</div>
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className='text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 main-content-subtitle'>
                    {highlight.title}
                  </h3>
                  
                  {/* Description */}
                  <p className='text-gray-600 leading-relaxed main-content-paragraph'>
                    {highlight.description}
                  </p>
                </CardContent>
                
                {/* Animated corner accent */}
                <div className='absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${highlight.gradient} opacity-20 rounded-bl-full`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
