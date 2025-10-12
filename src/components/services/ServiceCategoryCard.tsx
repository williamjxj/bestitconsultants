import React from 'react'
import { ServiceCategory } from '@/types/service'

interface ServiceCategoryCardProps {
  service: ServiceCategory
}

export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  service,
}) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow'>
      <div className='flex items-center space-x-3 mb-4'>
        {service.icon && (
          <img src={service.icon} alt={service.name} className='w-8 h-8' />
        )}
        <h3 className='text-xl font-bold text-gray-900'>{service.name}</h3>
      </div>

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
  )
}
