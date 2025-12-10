'use client'

import { Brain, CheckCircle2, Cloud, Globe2, Smartphone } from 'lucide-react'
import Link from 'next/link'

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

  return (
    <section className='bg-white py-20 dark:bg-slate-950'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='mb-12 text-center'>
          <h2 className='section-title mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white'>
            {translations.servicesSummary.title}
          </h2>
          <p className='section-subtitle mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400'>
            {translations.servicesSummary.content}
          </p>
        </div>

        <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {services.map((service, index) => {
            const Icon = icons[index] ?? CheckCircle2

            return (
              <Card
                key={service.name ?? index}
                className='group h-full border border-slate-200 bg-white transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900'
              >
                <CardHeader>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700'>
                    <Icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <CardTitle className='text-xl font-semibold text-slate-900 dark:text-white'>
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-slate-600 dark:text-slate-400'>
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className='text-center'>
          <Link
            href='/services'
            className='inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:ring-4 hover:ring-slate-200 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:hover:ring-slate-800'
          >
            {translations.servicesSummary.seeAllServices}
          </Link>
        </div>
      </div>
    </section>
  )
}
