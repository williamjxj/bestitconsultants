import { motion } from 'framer-motion'
import React from 'react'

import { OptimizedImage } from '@/components/ui/optimized-image'
import { ServiceCategory } from '@/types/service'

interface ServiceCategoryCardProps {
  service: ServiceCategory
  index?: number
}

export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  service,
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
      <div className='relative h-48'>
        <OptimizedImage
          src={service.icon || '/assets/placeholder.svg'}
          alt={`${service.name} services and solutions`}
          width={400}
          height={192}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          animation={{
            type: 'fade',
            duration: 0.6,
          }}
        />
      </div>

      <div className='p-6'>
        <h3 className='text-xl font-bold text-gray-900 mb-3'>{service.name}</h3>
        <p className='text-blue-600 font-semibold mb-3'>{service.seoTagline}</p>
        <p className='text-gray-700 mb-4'>{service.description}</p>

        <div className='space-y-3'>
          <div>
            <h4 className='font-semibold text-gray-900 mb-2'>Key Benefits</h4>
            <ul className='list-disc list-inside text-sm text-gray-700'>
              {service.benefits.map(benefit => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-gray-900 mb-2'>Technologies</h4>
            <div className='flex flex-wrap gap-2'>
              {service.technologies.map(tech => (
                <span
                  key={tech}
                  className='bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className='font-semibold text-gray-900 mb-2'>Use Cases</h4>
            <ul className='list-disc list-inside text-sm text-gray-700'>
              {service.useCases.map(useCase => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
