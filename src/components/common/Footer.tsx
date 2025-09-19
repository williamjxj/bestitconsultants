'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { translations } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16'>
      <div className='container mx-auto px-4'>
        {/* Testimonials Section */}
        <div className='mb-12'>
          <h3 className='text-3xl font-bold text-center mb-8 text-blue-400'>
            What Our Clients Say
          </h3>
          <div className='grid md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300'>
              <p className='italic mb-4 text-gray-200'>
                "AI-assisted design completely changed our process. We now explore more ideas in less time."
              </p>
              <span className='font-semibold text-blue-300'>– Ms. Zhang, Textile Director</span>
            </div>
            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300'>
              <p className='italic mb-4 text-gray-200'>
                "The team's responsiveness is impressive. They adapted designs to our needs instantly."
              </p>
              <span className='font-semibold text-blue-300'>– Ms. Wang, Hotel Procurement</span>
            </div>
            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300'>
              <p className='italic mb-4 text-gray-200'>
                "AI brings fresh ideas every season, revitalizing our industry."
              </p>
              <span className='font-semibold text-blue-300'>– Mr. Chen, Fashion Magazine Editor</span>
            </div>
          </div>
        </div>

        <div className='grid md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-2xl font-bold text-blue-400 mb-4'>
              BestITConsulting
            </h3>
            <p className='text-gray-300 mb-4'>
              Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent.
            </p>
            <p className='text-sm text-gray-400'>
              Trusted by enterprises worldwide for AI innovation and IT outsourcing.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className='text-lg font-semibold mb-4 text-blue-300'>
              Contact Info
            </h4>
            <div className='space-y-2 text-gray-300'>
              <p>{translations.footer.vancouver}</p>
              <p>{translations.footer.eastAsia}</p>
              <p>
                <a
                  href={`mailto:${translations.footer.email}`}
                  className='hover:text-blue-400 transition-colors duration-300'
                >
                  {translations.footer.email}
                </a>
              </p>
              <p>
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
              <a href='/about' className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'>
                About Us
              </a>
              <a href='/services' className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'>
                Services
              </a>
              <a href='/portfolio' className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'>
                Portfolio
              </a>
              <a href='/team' className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'>
                Team
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
          <p>
            © {currentYear} Best IT Consulting Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
