'use client'

import { motion } from 'framer-motion'
import { Brain, CheckCircle2, Cloud, Globe2, Smartphone } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * ServicesSummary
 *
 * Renders the "Our Services" section on the homepage with a simple card grid layout.
 * Content is fully driven by translations and matches the live website design.
 */
export default function ServicesSummary() {
  const { translations } = useLanguage()

  const services = translations.servicesSummary.services
  const icons = [Globe2, Smartphone, Cloud, Brain, CheckCircle2]

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
  ]

  return (
    <section className='bg-gradient-to-b from-white via-blue-50/30 to-white py-20 dark:bg-slate-950'>
      <div className='mx-auto max-w-6xl px-4'>
        <motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='section-title mb-4 text-slate-900 dark:text-white'>
            {translations.servicesSummary.title}
          </h2>
          <p className='section-subtitle mx-auto max-w-2xl text-slate-600 dark:text-slate-400'>
            {translations.servicesSummary.content}
          </p>
        </motion.div>

        <div className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, index) => {
            const Icon = icons[index] ?? CheckCircle2
            const gradient = gradients[index % gradients.length]

            return (
              <motion.div
                key={service.name ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className='group'
              >
                <Card className='relative overflow-hidden h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 dark:border-slate-800 dark:bg-slate-900'>
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <CardHeader className='relative z-10'>
                    {/* Icon with gradient background */}
                    <motion.div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className='h-7 w-7 text-white' aria-hidden='true' />
                    </motion.div>
                    <CardTitle className='text-xl font-semibold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 dark:text-white'>
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='relative z-10'>
                    <p className='text-slate-600 leading-relaxed dark:text-slate-400'>
                      {service.description}
                    </p>
                  </CardContent>

                  {/* Animated corner accent */}
                  <div className='absolute bottom-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <div
                      className={`absolute bottom-0 left-0 w-full h-full bg-gradient-to-br ${gradient} opacity-20 rounded-tr-full`}
                    />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size='lg'
              className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base px-8 py-6 shadow-xl hover:shadow-2xl border-0 group'
              asChild
            >
              <Link href='/services' className='flex items-center gap-2'>
                <span className='relative z-10'>
                  {translations.servicesSummary.seeAllServices}
                </span>
                <motion.span
                  className='relative z-10'
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  →
                </motion.span>
                {/* Shine effect */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent'
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
