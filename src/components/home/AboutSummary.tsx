'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { OptimizedImage } from '@/components/ui/optimized-image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getImageForContext } from '@/services/image-mapping'

export default function AboutSummary() {
  const { translations } = useLanguage()

  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <OptimizedImage
              src={getImageForContext('about')}
              alt='Professional team collaboration in modern office environment with diverse team members working together'
              width={612}
              height={612}
              className='rounded-lg shadow-lg'
              animation={{
                type: 'slide',
                duration: 0.8,
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
              {translations.aboutSummary.title}
            </h2>
            <p className='text-lg text-gray-600 mb-6'>
              {translations.aboutSummary.content}
            </p>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600'>20+</div>
                <div className='text-sm text-gray-600'>Years Experience</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600'>50+</div>
                <div className='text-sm text-gray-600'>Projects Completed</div>
              </div>
            </div>
            <Link
              href='/about-us'
              className='btn-secondary inline-block'
            >
              {translations.aboutSummary.learnMore}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
