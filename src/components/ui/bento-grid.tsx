import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[20rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={cn(
        'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
        'relative overflow-hidden border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700',
        className
      )}
    >
      {/* Subtle background gradient/noise effect could go here */}
      <div className='absolute inset-0 z-0 bg-linear-to-br from-transparent via-transparent to-slate-100/50 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100 dark:to-slate-800/50' />

      <div className='z-10 transition duration-200 group-hover/bento:translate-y-[-2px]'>
        {header}
      </div>

      <div className='z-10 transition duration-200 group-hover/bento:translate-x-2'>
        {icon}
        <div className='mb-2 mt-2 font-sans font-bold text-slate-700 dark:text-slate-200'>
          {title}
        </div>
        <div className='font-sans text-xs font-normal text-slate-500 dark:text-slate-400'>
          {description}
        </div>
      </div>
    </motion.div>
  )
}
