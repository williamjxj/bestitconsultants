'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactSnippet() {
  const { translations } = useLanguage()

  return (
    <section className='py-20 relative overflow-hidden'>
      <div className='max-w-6xl mx-auto px-4'>
        <motion.div
          className='relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl overflow-hidden'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Animated background elements */}
          <div className='absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48 animate-float' />
          <div
            className='absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-40 translate-y-40 animate-float'
            style={{ animationDelay: '2s' }}
          />
          <div
            className='absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32 animate-float'
            style={{ animationDelay: '1s' }}
          />

          <motion.div
            className='relative z-10 text-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className='section-title mb-6 text-white'>
              {translations.contactSnippet.title}
            </h2>
            <p className='section-subtitle mb-10 opacity-95 text-white max-w-3xl mx-auto'>
              {translations.contactSnippet.description}
            </p>

            <motion.div
              className='flex flex-col sm:flex-row gap-4 justify-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Button
                  size='lg'
                  className='relative overflow-hidden bg-white text-blue-600 hover:text-blue-700 font-bold text-lg px-10 py-7 shadow-2xl hover:shadow-white/30 border-0 group min-w-[240px]'
                  asChild
                >
                  <Link
                    href='/contact-us?title=Contact Us Today#contact-form'
                    className='flex items-center justify-center gap-3'
                  >
                    {/* Pulsing background */}
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white'
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [1, 0.9, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    
                    <span className='relative z-10'>
                      {translations.contactSnippet.cta}
                    </span>
                    
                    {/* Animated sparkle */}
                    <motion.span
                      className='relative z-10 text-2xl'
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      ✨
                    </motion.span>

                    {/* Shine effect */}
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent'
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'linear',
                        repeatDelay: 0.5,
                      }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
