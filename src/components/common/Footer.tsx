'use client'

import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Presentation } from 'lucide-react'
import { useEffect, useState } from 'react'
import QRCodeSVG from 'react-qr-code'

import { useLanguage } from '@/contexts/LanguageContext'
import { PRESENTATION_URL } from '@/lib/footer-constants'
import { getBaseUrl } from '@/lib/utils'

/**
 * Footer component with company information, links, and contact details
 * Includes internationalization, accessibility features, and SEO structured data
 */
export default function Footer() {
  const { translations } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [websiteUrl, setWebsiteUrl] = useState<string>('')
  const [isClient, setIsClient] = useState(false)

  // Use consistent base URL for organization schema (server-side compatible)
  const baseUrl = getBaseUrl()

  // Get social media links from translations
  const socialLinks = translations.footer.social?.links || []

  // Map social platform names to icons
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase()
    if (platformLower.includes('linkedin')) return Linkedin
    if (platformLower.includes('twitter') || platformLower.includes('x'))
      return Twitter
    if (platformLower.includes('github')) return Github
    return null
  }

  // Organization schema for SEO - use consistent base URL
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Best IT Consultants',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1 (236) 992-3846',
      email: 'service@BestITConsultants.ca',
      contactType: 'customer service',
      areaServed: 'Worldwide',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Great Vancouver',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    sameAs: socialLinks.map(link => link.url),
  }

  // Set website URL on client side only to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
    setWebsiteUrl(
      typeof window !== 'undefined' ? window.location.origin : baseUrl
    )
  }, [baseUrl])

  return (
    <footer
      className='bg-gray-900 text-white py-12 sm:py-16'
      role='contentinfo'
      aria-label='Site footer'
    >
      {/* Structured data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8'>
          {/* Company Info */}
          <div className='col-span-2 sm:col-span-1'>
            <h3 className='text-sm font-semibold mb-4 sm:mb-6 text-white capitalize tracking-wide'>
              Best IT Consultants
            </h3>
            <div className='space-y-2 sm:space-y-3 mb-4 sm:mb-6'>
              <div className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-blue-400 flex-shrink-0' aria-hidden='true' />
                <a
                  href='mailto:service@BestITConsultants.ca'
                  className='text-sm text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                  aria-label='Email us at service@BestITConsultants.ca'
                >
                  service@BestITConsultants.ca
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-blue-400 flex-shrink-0' aria-hidden='true' />
                <a
                  href='tel:+12369923846'
                  className='text-sm text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                  aria-label='Call us at +1 (236) 992-3846'
                >
                  +1 (236) 992-3846
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin className='h-5 w-5 text-blue-400 flex-shrink-0' aria-hidden='true' />
                <p className='text-sm text-gray-300'>Great Vancouver, Canada 🇨🇦</p>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className='flex items-center gap-4' role='list' aria-label='Social media links'>
              {socialLinks.map(link => {
                const IconComponent = getSocialIcon(link.platform)
                if (!IconComponent) return null

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-300 hover:text-white transition-colors duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                    aria-label={`Visit our ${link.platform} page`}
                  >
                    <IconComponent className='h-6 w-6' aria-hidden='true' />
                    <span className='sr-only'>{link.platform}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Sitemap - matches navbar */}
          <nav aria-label='Footer sitemap'>
            <h4 className='text-sm font-semibold mb-3 sm:mb-4 text-white capitalize tracking-wide'>
              sitemap
            </h4>
            <ul className='space-y-1.5 sm:space-y-2' role='list'>
              <li>
                <a
                  href='/'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.home}
                </a>
              </li>
              <li>
                <a
                  href='/services'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.services}
                </a>
              </li>
              <li>
                <a
                  href='/portfolio'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.portfolio}
                </a>
              </li>
              <li>
                <a
                  href='/case-studies'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.caseStudies}
                </a>
              </li>
              <li>
                <a
                  href='/our-team'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.team}
                </a>
              </li>
              <li>
                <a
                  href='/testimonials'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.testimonials || 'Testimonials'}
                </a>
              </li>
              <li>
                <a
                  href='/contact-us'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.contact}
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label='Footer services'>
            <h4 className='text-sm font-semibold mb-3 sm:mb-4 text-white capitalize tracking-wide'>
              services
            </h4>
            <ul className='space-y-1.5 sm:space-y-2' role='list'>
              <li>
                <a
                  href='/services#ai-ml-solutions'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  AI Consulting
                </a>
              </li>
              <li>
                <a
                  href='/services#enterprise-solutions'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Software Outsourcing
                </a>
              </li>
              <li>
                <a
                  href='/services#web-development'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href='/services#cloud-solutions'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Cloud Solutions
                </a>
              </li>
              <li>
                <a
                  href='/services#mobile-development'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href='/services#cloud-solutions'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  DevOps
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label='Footer resources'>
            <h4 className='text-sm font-semibold mb-3 sm:mb-4 text-white capitalize tracking-wide'>
              resources
            </h4>
            <ul className='space-y-1.5 sm:space-y-2' role='list'>
              <li>
                <a
                  href='/portfolio'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href='/case-studies'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href='/testimonials'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href='/contact-us'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href={PRESENTATION_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  <Presentation className='h-4 w-4 text-blue-400 flex-shrink-0' aria-hidden='true' />
                  Presentation
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label='Footer legal'>
            <h4 className='text-sm font-semibold mb-3 sm:mb-4 text-white capitalize tracking-wide'>
              legal
            </h4>
            <ul className='space-y-1.5 sm:space-y-2' role='list'>
              <li>
                <a
                  href='/privacy-policy'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='/terms-of-service'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href='/cookie-policy'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href='/gdpr'
                  className='block text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  GDPR
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Access */}
          <div>
            <section aria-labelledby='mobile-access-heading'>
              <h4
                id='mobile-access-heading'
                className='text-sm font-semibold mb-3 sm:mb-4 text-white capitalize tracking-wide'
              >
                {translations.footer.mobileAccess}
              </h4>
              <div
                className='bg-white p-3 rounded inline-block'
                role='img'
                aria-label='QR code for mobile access'
                suppressHydrationWarning
              >
                {isClient && websiteUrl ? (
                  <QRCodeSVG
                    value={websiteUrl}
                    size={120}
                    level='M'
                    bgColor='#ffffff'
                    fgColor='#000000'
                    className='w-[120px] h-[120px] max-w-full'
                  />
                ) : (
                  <div className='w-[120px] h-[120px] bg-gray-200 animate-pulse rounded' />
                )}
              </div>
              <p className='text-sm text-gray-400 mt-2'>
                {translations.footer.scanQrCode}
              </p>
            </section>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400'>
          <p className='text-sm'>
            {translations.footer.copy.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  )
}
