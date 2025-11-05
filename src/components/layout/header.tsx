import React from 'react'

const Header: React.FC = () => {
  return (
    <header className='bg-gray-800 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Best IT Consultants</h1>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <a href='/' className='hover:underline'>
                Home
              </a>
            </li>
            <li>
              <a href='/testimonials' className='hover:underline'>
                Testimonials
              </a>
            </li>
            <li>
              <a href='/services' className='hover:underline'>
                Services
              </a>
            </li>
            <li>
              <a href='/contact-us' className='hover:underline'>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
