import React from 'react'

export const QuickHighlights: React.FC = () => {
  const highlights = [
    {
      title: '20+ Years Experience',
      description: 'Full-stack and AI expertise trusted by global enterprises',
      icon: '👥',
    },
    {
      title: 'Cost-Effective Outsourcing',
      description: 'Scale quickly with top-tier global engineering teams',
      icon: '💰',
    },
    {
      title: 'Enterprise-Grade AI',
      description: 'Cloud, automation, and AI-driven business transformation',
      icon: '🤖',
    },
  ]

  return (
    <div className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {highlights.map((highlight, index) => (
            <div key={index} className='text-center'>
              <div className='text-4xl mb-4'>{highlight.icon}</div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                {highlight.title}
              </h3>
              <p className='text-gray-700'>{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
