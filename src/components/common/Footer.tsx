'use client'

import { Mail, Phone } from 'lucide-react'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { translations } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-2xl font-bold text-blue-400 mb-4'>
              BestITConsultants
            </h3>
            <p className='text-gray-300 mb-4'>
              Elite Enterprise Architects. Startup Speed. Get Fortune 500
              Software Expertise Without the Overhead.
            </p>
            <p className='text-sm text-gray-400 mb-4'>
              Trusted by enterprises worldwide for AI innovation and IT
              outsourcing. 20+ years Fortune 500 experience with global talent.
            </p>
            <div className='flex flex-wrap gap-2'>
              <span className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'>
                AI Solutions
              </span>
              <span className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'>
                Full-Stack Development
              </span>
              <span className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'>
                Cloud Solutions
              </span>
              <span className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'>
                Enterprise Systems
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-blue-300'>
              Contact Info
            </h4>
            <div className='space-y-2 text-gray-300'>
              <p>{translations.footer.vancouver}</p>
              <p>{translations.footer.eastAsia}</p>
              <p className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-blue-400 flex-shrink-0' />
                <a
                  href={`mailto:${translations.footer.email}`}
                  className='hover:text-blue-400 transition-colors duration-300'
                >
                  {translations.footer.email}
                </a>
              </p>
              <p className='flex items-center gap-2'>
                <Phone className='h-4 w-4 text-blue-400 flex-shrink-0' />
                <a
                  href={`tel:${translations.footer.phone}`}
                  className='hover:text-blue-400 transition-colors duration-300'
                >
                  {translations.footer.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-blue-300'>
              Quick Links
            </h4>
            <div className='space-y-2'>
              <a
                href='/services'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                {translations.navbar.services}
              </a>
              <a
                href='/portfolio'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                {translations.navbar.portfolio}
              </a>
              <a
                href='/case-studies'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                {translations.navbar.caseStudies}
              </a>
              <a
                href='/our-team'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                {translations.navbar.team}
              </a>
              <a
                href='/testimonials'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                {translations.navbar.testimonials || 'Testimonials'}
              </a>
              <a
                href='/contact-us'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                {translations.navbar.contact}
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-blue-300'>
              Follow Us
            </h4>
            <div className='flex space-x-4'>
              <button className='text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300 hover:scale-110'>
                LinkedIn
              </button>
              <button className='text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300 hover:scale-110'>
                Twitter
              </button>
              <button className='text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300 hover:scale-110'>
                GitHub
              </button>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-12 pt-8 text-center text-gray-300'>
          <p>© {currentYear} Best IT Consulting Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
