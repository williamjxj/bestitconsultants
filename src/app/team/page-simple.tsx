// Simple team page for testing
import React from 'react'

const TeamPage = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8'>Our Expert Team</h1>
        <p className='text-center text-lg text-gray-600 mb-12'>
          Meet our global network of senior engineers and AI innovators.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-xl font-bold mb-2'>William Jiang</h3>
            <p className='text-gray-600'>
              Founder & Senior Full-Stack Engineer
            </p>
            <p className='text-sm text-gray-500 mt-2'>Vancouver, Canada</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-xl font-bold mb-2'>Shamin Yang</h3>
            <p className='text-gray-600'>
              Senior Software Engineer & Solution Architect
            </p>
            <p className='text-sm text-gray-500 mt-2'>Guangzhou, China</p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h3 className='text-xl font-bold mb-2'>Lewis Liu</h3>
            <p className='text-gray-600'>Software Architect & Programmer</p>
            <p className='text-sm text-gray-500 mt-2'>Beijing, China</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamPage




