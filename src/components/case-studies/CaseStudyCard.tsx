import React from 'react'
import { CaseStudy } from '@/types/case-study'
import { OptimizedImage } from '@/components/ui/optimized-image'
import { motion } from 'framer-motion'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  index?: number
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group'
    >
      {caseStudy.image && (
        <div className='relative h-64'>
          <OptimizedImage
            src={caseStudy.image}
            alt={`${caseStudy.title} - ${caseStudy.client} case study`}
            width={400}
            height={256}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            animation={{
              type: 'slide',
              duration: 0.6,
            }}
          />
        </div>
      )}

      <div className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-xl font-bold text-gray-900'>{caseStudy.title}</h3>
          <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
            {caseStudy.category}
          </span>
        </div>

        <div className='space-y-4'>
          <div>
            <h4 className='font-semibold text-gray-900 mb-2'>Challenge</h4>
            <p className='text-gray-700 text-sm'>{caseStudy.challenge}</p>
          </div>

          <div>
            <h4 className='font-semibold text-gray-900 mb-2'>Solution</h4>
            <p className='text-gray-700 text-sm'>{caseStudy.solution}</p>
          </div>

          <div>
            <h4 className='font-semibold text-gray-900 mb-2'>Result</h4>
            <p className='text-gray-700 text-sm'>{caseStudy.result}</p>
          </div>

          {caseStudy.metrics.length > 0 && (
            <div>
              <h4 className='font-semibold text-gray-900 mb-2'>Key Metrics</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {caseStudy.metrics.map(metric => (
                  <div key={metric.id} className='bg-green-50 p-3 rounded'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-900'>
                        {metric.name}
                      </span>
                      <span className='text-lg font-bold text-green-600'>
                        {metric.value}
                      </span>
                    </div>
                    <p className='text-xs text-gray-600 mt-1'>
                      {metric.improvement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {caseStudy.testimonial && (
            <div className='bg-gray-50 p-4 rounded'>
              <p className='text-gray-700 italic'>"{caseStudy.testimonial}"</p>
              <p className='text-sm text-gray-500 mt-2'>- {caseStudy.client}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
