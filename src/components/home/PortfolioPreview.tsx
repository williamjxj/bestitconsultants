'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PortfolioPreview() {
  const { translations } = useLanguage()

  const projectGradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
  ]

  return (
    <section className='py-20 bg-gradient-to-b from-white via-purple-50/20 to-white'>
      <div className='max-w-6xl mx-auto px-4'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className='section-title'>
            {translations.portfolioPreview.title}
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {translations.portfolioPreview.projects.map((project, index) => {
            const gradient = projectGradients[index % projectGradients.length]

            return (
              <motion.div
                key={project.id}
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
                  {/* Gradient header */}
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <CardContent className='relative z-10 p-6'>
                    <h3 className='text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 main-content-subtitle'>
                      {project.name}
                    </h3>

                    <Badge
                      className={`mb-4 bg-gradient-to-r ${gradient} text-white border-0`}
                    >
                      {project.tech}
                    </Badge>

                    <p className='mb-6 text-gray-600 leading-relaxed main-content-paragraph'>
                      {project.description}
                    </p>

                    <motion.button
                      className='flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold group/btn'
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{translations.portfolioPreview.viewProject}</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <ArrowRight className='w-4 h-4' />
                      </motion.span>
                    </motion.button>
                  </CardContent>

                  {/* Decorative corner */}
                  <div className='absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <div
                      className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${gradient} opacity-20 rounded-bl-full`}
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
              className='relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-base px-8 py-6 shadow-xl hover:shadow-2xl border-0'
              asChild
            >
              <Link href='/portfolio' className='flex items-center gap-2'>
                <span className='relative z-10'>
                  {translations.portfolioPreview.allProjects}
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
