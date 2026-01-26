'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { VideoWithPoster } from '@/components/ui/video-with-poster'
import { useLanguage } from '@/contexts/LanguageContext'
import { getR2BaseUrl } from '@/lib/utils'

export default function AboutSummary() {
  const { translations } = useLanguage()
  const R2_BASE_URL = getR2BaseUrl()

  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          {/* Video with poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='relative p-0 m-0 w-full'
          >
            <VideoWithPoster
              videoSrc={`${R2_BASE_URL}/Best IT Consultants.mov`}
              posterSrc={`${R2_BASE_URL}/assets/Best IT Consultants.jpg`}
              alt='Professional team collaboration in modern office environment with diverse team members working together'
              width={612}
              className='rounded-lg shadow-lg w-full'
              autoplay={true}
              loop={true}
              muted={true}
              playsInline={true}
              lazy={true}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='section-title mb-6'>
              {translations.aboutSummary.title}
            </h2>
            <p className='section-subtitle mb-6 text-left'>
              {translations.aboutSummary.content}
            </p>
            <div className='grid grid-cols-2 gap-6 mb-8'>
              <motion.div
                className='text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  20+
                </motion.div>
                <div className='text-sm font-semibold text-gray-700 mt-2'>Years Experience</div>
              </motion.div>
              <motion.div
                className='text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                >
                  50+
                </motion.div>
                <div className='text-sm font-semibold text-gray-700 mt-2'>Projects Completed</div>
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href='/testimonials'
                className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <span>{translations.aboutSummary.learnMore}</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
