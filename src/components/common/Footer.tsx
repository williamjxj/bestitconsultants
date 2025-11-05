'use client'

import {
  Linkedin,
  Twitter,
  Github,
  Smartphone,
  Presentation,
  Mail,
  Phone,
} from 'lucide-react'
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

  // Use consistent base URL for organization schema (server-side compatible)
  const baseUrl = getBaseUrl()

  // Organization schema for SEO - use consistent base URL
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BestITConsultants',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: translations.footer.phone,
      email: translations.footer.email,
      contactType: 'customer service',
      areaServed: 'Worldwide',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surrey',
      addressRegion: 'BC',
      addressCountry: 'CA',
      streetAddress: '10355 152 St',
      postalCode: 'V3R 7C1',
    },
    sameAs: socialLinks.map((link) => link.url),
  }

  // Set website URL on client side only to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
    setWebsiteUrl(
      typeof window !== 'undefined'
        ? window.location.origin
        : baseUrl
    )
  }, [baseUrl])

  return (
    <footer
      className='bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 sm:py-16'
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-2xl font-bold text-blue-400 mb-4'>
              BestITConsultants
            </h3>
            <p className='text-gray-300 mb-4'>
              {translations.footer.companyDescription}
            </p>
            <p className='text-sm text-gray-400 mb-4'>
              {translations.footer.companyTagline}
            </p>
            <div className='flex flex-wrap gap-2' role='list' aria-label='Service tags'>
              <span
                className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'
                role='listitem'
              >
                {translations.footer.tags.aiSolutions}
              </span>
              <span
                className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'
                role='listitem'
              >
                {translations.footer.tags.fullStack}
              </span>
              <span
                className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'
                role='listitem'
              >
                {translations.footer.tags.cloudSolutions}
              </span>
              <span
                className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs'
                role='listitem'
              >
                {translations.footer.tags.enterpriseSystems}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <address className='not-italic'>
            <h4 className='text-lg font-semibold mb-4 text-blue-300'>
              {translations.footer.contactInfo}
            </h4>
            <div className='space-y-2 text-gray-300'>
              <p>{translations.footer.vancouver}</p>
              <p>{translations.footer.eastAsia}</p>
              <p className='flex items-center gap-2'>
                <Mail
                  className='h-4 w-4 text-blue-400 flex-shrink-0'
                  aria-hidden='true'
                />
                <a
                  href={`mailto:${translations.footer.email}`}
                  className='hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                  aria-label={`Email us at ${translations.footer.email}`}
                >
                  {translations.footer.email}
                </a>
              </p>
              <p className='flex items-center gap-2'>
                <Phone
                  className='h-4 w-4 text-blue-400 flex-shrink-0'
                  aria-hidden='true'
                />
                <a
                  href={`tel:${translations.footer.phone}`}
                  className='hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                  aria-label={`Call us at ${translations.footer.phone}`}
                >
                  {translations.footer.phone}
                </a>
              </p>
            </div>
          </address>

          {/* Quick Links */}
          <nav aria-label='Footer navigation'>
            <h4 className='text-lg font-semibold mb-4 text-blue-300'>
              {translations.footer.quickLinks}
            </h4>
            <ul className='space-y-2' role='list'>
              <li>
                <a
                  href='/services'
                  className='block text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.services}
                </a>
              </li>
              <li>
                <a
                  href='/portfolio'
                  className='block text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.portfolio}
                </a>
              </li>
              <li>
                <a
                  href='/case-studies'
                  className='block text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.caseStudies}
                </a>
              </li>
              <li>
                <a
                  href='/our-team'
                  className='block text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.team}
                </a>
              </li>
              <li>
                <a
                  href='/testimonials'
                  className='block text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.testimonials || 'Testimonials'}
                </a>
              </li>
              <li>
                <a
                  href='/contact-us'
                  className='block text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.contact}
                </a>
              </li>
            </ul>
          </nav>

          {/* Social Media & Mobile Access */}
          <div>
            {/* Social Media Icons & Presentation */}
            <div
              className='flex items-center space-x-3 sm:space-x-4 mb-6 flex-wrap gap-y-2'
              role='list'
              aria-label='Social media and presentation links'
            >
              <a
                href={PRESENTATION_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                aria-label={`Open ${translations.footer.presentation} in new tab`}
              >
                <Presentation
                  className='h-5 w-5 text-blue-400 flex-shrink-0'
                  aria-hidden='true'
                />
                <span className='text-sm'>{translations.footer.presentation}</span>
              </a>
              {socialLinks.map((link) => {
                const IconComponent = getSocialIcon(link.platform)
                if (!IconComponent) return null

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                    aria-label={`Visit our ${link.platform} page`}
                  >
                    <IconComponent className='h-5 w-5' aria-hidden='true' />
                    <span className='sr-only'>{link.platform}</span>
                  </a>
                )
              })}
            </div>

            {/* Mobile Access QR Code */}
            <section aria-labelledby='mobile-access-heading'>
              <div className='flex items-center gap-2 mb-2'>
                <Smartphone
                  className='h-5 w-5 text-blue-300'
                  aria-hidden='true'
                />
                <h4
                  id='mobile-access-heading'
                  className='text-lg font-semibold text-blue-300'
                >
                  {translations.footer.mobileAccess}
                </h4>
              </div>
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

        <div className='border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-300'>
          <p className='text-sm sm:text-base'>
            {translations.footer.copy.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  )
}
