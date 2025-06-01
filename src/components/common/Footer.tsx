'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { translations } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-800 text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-2xl font-bold text-blue-400 mb-4'>
              BestITConsulting
            </h3>
            <p className='text-gray-300'>{translations.footer.contactInfo}</p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>
              {translations.footer.contactInfo}
            </h4>
            <div className='space-y-2 text-gray-300'>
              <p>{translations.footer.vancouver}</p>
              <p>{translations.footer.eastAsia}</p>
              <p>
                <a
                  href={`mailto:${translations.footer.email}`}
                  className='hover:text-blue-400'
                >
                  {translations.footer.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${translations.footer.phone}`}
                  className='hover:text-blue-400'
                >
                  {translations.footer.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>
              {translations.footer.followUs}
            </h4>
            <div className='flex space-x-4'>
              <button className='text-gray-300 hover:text-blue-400 cursor-pointer'>
                LinkedIn
              </button>
              <button className='text-gray-300 hover:text-blue-400 cursor-pointer'>
                Twitter
              </button>
              <button className='text-gray-300 hover:text-blue-400 cursor-pointer'>
                GitHub
              </button>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-300'>
          <p>
            {translations.footer.copy.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  )
}
