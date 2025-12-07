'use client'

import { Brain, CheckCircle2, Cloud, Globe2, Smartphone } from 'lucide-react'
import Link from 'next/link'

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * ServicesSummary
 *
 * Renders the "Our Services" section on the homepage using an Aceternity-style
 * bento grid layout. Content is fully driven by translations and remains
 * consistent with the existing CTA to the main services page.
 */
export default function ServicesSummary() {
  const { translations } = useLanguage()

  const services = translations.servicesSummary.services
  const icons = [Globe2, Smartphone, Cloud, Brain, CheckCircle2]

  const renderHeader = (index: number, service: { name: string }) => {
    if (index === 0) {
      return (
        <div className='relative flex h-full min-h-[6rem] w-full flex-col justify-between overflow-hidden rounded-xl bg-linear-to-br from-violet-500 via-purple-500 to-blue-500 p-6 text-white shadow-lg'>
          <div className='relative z-10'>
            <p className='text-xs font-bold uppercase tracking-wider opacity-90'>
              End-to-end delivery
            </p>
            <p className='mt-2 text-sm font-medium opacity-95'>
              From architecture to launch, we ship production-grade systems.
            </p>
          </div>
          <div className='relative z-10 mt-4 flex items-end justify-between gap-4'>
            <div>
              <p className='text-3xl font-bold leading-none tracking-tight'>
                98%
              </p>
              <p className='mt-1 text-[10px] font-semibold uppercase tracking-wide opacity-80'>
                projects delivered on time
              </p>
            </div>
          </div>
          {/* Decorative background elements */}
          <div className='absolute -right-4 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl' />
          <div className='absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-400/20 blur-xl' />
        </div>
      )
    }

    if (index === 1) {
      return (
        <div className='flex h-full min-h-[6rem] w-full flex-col justify-between rounded-xl bg-slate-900 p-5 text-slate-100 shadow-md'>
          <div className='flex items-start justify-between'>
            <div className='space-y-1'>
              <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
                {service.name}
              </p>
              <p className='text-sm font-medium leading-snug'>
                Ship mobile in weeks, not months
              </p>
            </div>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 ring-1 ring-slate-700'>
              <Smartphone className='h-4 w-4 text-slate-300' />
            </div>
          </div>
          <div className='mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800'>
            <div className='h-full w-3/4 rounded-full bg-linear-to-r from-emerald-400 to-cyan-400' />
          </div>
        </div>
      )
    }

    if (index === 3) {
      return (
        <div className='flex h-full min-h-[6rem] w-full flex-col justify-between rounded-xl bg-slate-950 p-5 text-slate-50 shadow-md dark:bg-slate-900'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
                Sentiment analysis
              </p>
              <p className='mt-1 text-sm font-medium leading-snug'>
                Real-time user feedback
              </p>
            </div>
            <span className='inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-500/20'>
              AI POWERED
            </span>
          </div>

          <div className='mt-4 flex items-start gap-3 rounded-lg bg-slate-900/80 p-3 ring-1 ring-white/5'>
            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-sky-500 text-sm shadow-sm'>
              🙂
            </div>
            <div className='min-w-0 space-y-1'>
              <p className='line-clamp-2 text-xs leading-relaxed text-slate-300'>
                “Our clients sound confident and optimistic about the new
                platform launch.”
              </p>
              <div className='flex items-center gap-2'>
                <div className='h-1 w-1 rounded-full bg-emerald-400' />
                <p className='text-[10px] font-bold uppercase tracking-wide text-emerald-400'>
                  Positive • 0.92 score
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='flex h-full min-h-[6rem] w-full flex-col rounded-xl bg-slate-50 p-5 dark:bg-slate-900/50'>
        <div className='h-full w-full rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800' />
      </div>
    )
  }

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

        <div className='mb-16'>
          <BentoGrid>
            {services.map((service, index) => {
              const Icon = icons[index] ?? CheckCircle2

              // Simple responsive layout: make the first and fourth items a bit wider on md+
              const layoutClasses =
                index === 0
                  ? 'md:col-span-2'
                  : index === 3
                    ? 'md:col-span-2'
                    : ''

              return (
                <BentoGridItem
                  key={service.name ?? index}
                  className={layoutClasses}
                  title={service.name}
                  header={renderHeader(index, service)}
                  description={service.description}
                  icon={
                    <div className='mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-900 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700'>
                      <Icon className='h-5 w-5' aria-hidden='true' />
                    </div>
                  }
                />
              )
            })}
          </BentoGrid>
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
