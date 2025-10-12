import React from 'react'

export const EnhancedHeroSection: React.FC = () => {
  return (
    <div className='bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            Elite Enterprise Architects. Startup Speed.
          </h1>
          <p className='text-xl md:text-2xl mb-8 text-blue-100'>
            Get Fortune 500 Software Expertise Without the Overhead
          </p>
          <p className='text-lg mb-8 text-blue-200'>
            Global IT Outsourcing & AI Consulting – Canadian Quality, Global
            Talent
          </p>
          <button className='bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition-colors'>
            Get a Free Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
