'use client'

import { useState, useEffect } from 'react'

import { useLanguage } from '@/contexts/LanguageContext'
import { testimonialsService } from '@/services/testimonials'
import type { Testimonial } from '@/types/testimonial'

export default function Footer() {
  const { translations } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load testimonials from service
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await testimonialsService.getTestimonials()
        setTestimonials(data)
      } catch (err) {
        console.error('Error loading testimonials:', err)
        setError('Failed to load testimonials')
        // Fallback to static testimonials
        setTestimonials(getFallbackTestimonials())
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  // Fallback testimonials
  const getFallbackTestimonials = (): Testimonial[] => [
    {
      id: 'fallback-1',
      quote:
        'AI-assisted design completely changed our process. We now explore more ideas in less time.',
      author: 'Ms. Zhang',
      title: 'Textile Director',
      company: 'Shanghai Textile Co.',
      isVisible: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'fallback-2',
      quote:
        "The team's responsiveness is impressive. They adapted designs to our needs instantly.",
      author: 'Ms. Wang',
      title: 'Hotel Procurement',
      company: 'Luxury Hotels Group',
      isVisible: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'fallback-3',
      quote: 'AI brings fresh ideas every season, revitalizing our industry.',
      author: 'Mr. Chen',
      title: 'Fashion Magazine Editor',
      company: 'Style Weekly',
      isVisible: true,
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  return (
    <footer className='bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16'>
      <div className='container mx-auto px-4'>
        {/* Testimonials Section */}
        <div className='mb-12'>
          <h3 className='text-3xl font-bold text-center mb-8 text-blue-400'>
            What Our Clients Say
          </h3>
          {isLoading ? (
            <div className='grid md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20'
                >
                  <div className='h-4 bg-gray-300 rounded animate-pulse mb-4'></div>
                  <div className='h-4 bg-gray-300 rounded animate-pulse mb-4'></div>
                  <div className='h-4 bg-gray-300 rounded animate-pulse w-3/4'></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className='text-center text-gray-300'>
              <p>Unable to load testimonials at this time.</p>
            </div>
          ) : (
            <div className='grid md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className='italic mb-4 text-gray-200'>
                    "{testimonial.quote}"
                  </p>
                  <span className='font-semibold text-blue-300'>
                    – {testimonial.author}, {testimonial.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

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
                AI/ML Solutions
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
              <a
                href='/about'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                About Us
              </a>
              <a
                href='/services'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                Services
              </a>
              <a
                href='/our-work'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                Our Work
              </a>
              <a
                href='/case-studies'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                Case Studies
              </a>
              <a
                href='/team'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                Team
              </a>
              <a
                href='/contact'
                className='block text-gray-300 hover:text-blue-400 transition-colors duration-300'
              >
                Contact
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
