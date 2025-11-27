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
              posterSrc={`${R2_BASE_URL}/Best IT Consultants.jpg`}
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
            <h2 className='text-3xl md:text-4xl font-bold mb-6 main-content-title'>
              {translations.aboutSummary.title}
            </h2>
            <p className='text-lg mb-6 main-content-paragraph'>
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
            <Link href='/testimonials' className='btn-secondary inline-block'>
              {translations.aboutSummary.learnMore}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
