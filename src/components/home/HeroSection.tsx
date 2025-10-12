'use client'

import { OptimizedImage } from '@/components/ui/optimized-image'
import { motion } from 'framer-motion'
import { getImageForContext } from '@/services/image-mapping'

export default function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <OptimizedImage
        src={getImageForContext('hero')}
        alt='Modern technology and innovation workspace with multiple monitors and collaborative environment'
        width={1920}
        height={1080}
        priority={true}
        className='absolute inset-0 w-full h-full object-cover'
        animation={{
          type: 'fade',
          duration: 1.2,
        }}
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80' />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className='relative z-10 text-center text-white max-w-4xl mx-auto px-4'
      >
        <h1 className='text-4xl md:text-6xl font-bold mb-6'>
          Enterprise Software Solutions with Fortune 500 Experience
        </h1>
        <p className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto'>
          Led by industry veterans with 60+ years combined experience, we
          deliver AI/ML solutions, enterprise systems, and cloud platforms for
          global clients including Xperi, HSBC, and Credit Suisse.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300'
        >
          Start Your Project
        </motion.button>
      </motion.div>
    </section>
  )
}
