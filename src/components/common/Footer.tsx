'use client'

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Video,
  Music,
  FileText,
  Image as ImageIcon,
  Play,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import { useLanguage } from '@/contexts/LanguageContext'
import { getBaseUrl } from '@/lib/utils'

/**
 * Footer component with company information, links, and contact details
 * Includes internationalization, accessibility features, and SEO structured data
 */
interface Resource {
  key: string
  fileName: string
  extension: string
  fileType: 'video' | 'audio' | 'document' | 'image' | 'other'
  size: number
  lastModified: string
  url: string
}

export default function Footer() {
  const { translations } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [isClient, setIsClient] = useState(false)
  const [resources, setResources] = useState<Resource[]>([])
  const [resourcesLoading, setResourcesLoading] = useState(true)

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
      email: 'service@BestITConsulting.ca',
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

  // Set client-side flag to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fetch resources from R2 bucket
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setResourcesLoading(true)
        const response = await fetch('/api/resources')
        const data = await response.json()
        if (data.success && data.resources) {
          setResources(data.resources)
        }
      } catch (error) {
        console.error('Error fetching resources:', error)
      } finally {
        setResourcesLoading(false)
      }
    }

    fetchResources()
  }, [])

  // Get icon component based on file type
  const getResourceIcon = (fileType: Resource['fileType']) => {
    switch (fileType) {
      case 'video':
        return Video
      case 'audio':
        return Music
      case 'document':
        return FileText
      case 'image':
        return ImageIcon
      default:
        return FileText
    }
  }

  // Transform filename to be more meaningful
  const transformFileName = (fileName: string): string => {
    // Remove extension
    let name = fileName.replace(/\.[^/.]+$/, '')

    // Remove 'bestit' prefix (case insensitive)
    name = name.replace(/^bestit[-_\s]*/i, '')

    // Replace hyphens, underscores, and multiple spaces with single space
    name = name.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ')

    // Title case: capitalize first letter of each word
    name = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

    return name.trim()
  }

  // Handle play button click for media files - opens popup window
  const handlePlayClick = (e: React.MouseEvent, resource: Resource) => {
    e.preventDefault()
    e.stopPropagation()

    // Create popup window with media player
    const popupWidth = 800
    const popupHeight = resource.fileType === 'video' ? 600 : 200
    const left = Math.round((window.screen.width - popupWidth) / 2)
    const top = Math.round((window.screen.height - popupHeight) / 2)

    // Use a unique name to ensure popup window, not tab
    const popupName = `mediaPlayer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Window features string - must include all features to ensure popup
    const features = [
      `width=${popupWidth}`,
      `height=${popupHeight}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=no',
      'toolbar=no',
      'menubar=no',
      'location=no',
      'status=no',
      'directories=no',
    ].join(',')

    const popup = window.open('', popupName, features)

    if (popup) {
      const displayName = transformFileName(resource.fileName)
      const isVideo = resource.fileType === 'video'

      // Escape HTML to prevent XSS
      const escapeHtml = (text: string) => {
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
      }

      popup.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${escapeHtml(displayName)}</title>
            <meta charset="UTF-8">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                background: #111827;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 20px;
              }
              h2 {
                margin-bottom: 20px;
                text-align: center;
                font-size: 18px;
              }
              video, audio {
                width: 100%;
                max-width: 100%;
                border-radius: 8px;
              }
              video {
                max-height: 70vh;
              }
            </style>
          </head>
          <body>
            <h2>${escapeHtml(displayName)}</h2>
            ${
              isVideo
                ? `<video src="${escapeHtml(resource.url)}" controls autoplay style="width: 100%; max-height: 70vh; border-radius: 8px;">
                   Your browser does not support the video tag.
                 </video>`
                : `<audio src="${escapeHtml(resource.url)}" controls autoplay style="width: 100%;">
                   Your browser does not support the audio tag.
                 </audio>`
            }
          </body>
        </html>
      `)
      popup.document.close()

      // Focus the popup window
      popup.focus()
    } else {
      // If popup was blocked, show alert
      alert(
        'Please allow popups for this site to play media in a popup window.'
      )
    }
  }

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
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6'>
          {/* Company Info */}
          <div className='col-span-2 sm:col-span-1 lg:col-span-1'>
            <h3 className='text-sm font-semibold mb-4 sm:mb-6 text-white capitalize tracking-wide text-left ml-8 sm:ml-0'>
              Best IT Consultants
            </h3>
            <div className='space-y-2 sm:space-y-3 mb-4 sm:mb-6 ml-8 sm:ml-0'>
              <div className='flex items-center gap-3'>
                <Mail
                  className='h-5 w-5 text-white flex-shrink-0'
                  aria-hidden='true'
                />
                <a
                  href='mailto:service@BestITConsulting.ca'
                  className='text-xs sm:text-sm text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                  aria-label='Email us at service@BestITConsulting.ca'
                >
                  service@BestITConsulting.ca
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <Phone
                  className='h-5 w-5 text-white flex-shrink-0'
                  aria-hidden='true'
                />
                <a
                  href='tel:+12369923846'
                  className='text-xs sm:text-sm text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                  aria-label='Call us at +1 (236) 992-3846'
                >
                  +1 (236) 992-3846
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin
                  className='h-5 w-5 text-white flex-shrink-0'
                  aria-hidden='true'
                />
                <p className='text-xs sm:text-sm text-gray-300'>
                  Great Vancouver, Canada 🇨🇦
                </p>
              </div>
            </div>
            {/* Social Media Icons */}
            <div
              className='flex items-center gap-4 ml-8 sm:ml-0'
              role='list'
              aria-label='Social media links'
            >
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
          <nav aria-label='Footer sitemap' className='lg:col-span-1'>
            <h4 className='text-sm font-semibold mb-2 sm:mb-3 text-white capitalize tracking-wide text-left ml-8 sm:ml-0'>
              sitemap
            </h4>
            <ul className='space-y-1 sm:space-y-1.5 ml-8 sm:ml-0' role='list'>
              <li>
                <a
                  href='/'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.home}
                </a>
              </li>
              <li>
                <a
                  href='/services'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.services}
                </a>
              </li>
              <li>
                <a
                  href='/portfolio'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.portfolio}
                </a>
              </li>
              <li>
                <a
                  href='/case-studies'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.caseStudies}
                </a>
              </li>
              <li>
                <a
                  href='/our-team'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.team}
                </a>
              </li>
              <li>
                <a
                  href='/testimonials'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.testimonials || 'Testimonials'}
                </a>
              </li>
              <li>
                <a
                  href='/contact-us'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  {translations.navbar.contact}
                </a>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label='Footer services' className='lg:col-span-1'>
            <h4 className='text-sm font-semibold mb-2 sm:mb-3 text-white capitalize tracking-wide text-left ml-8 sm:ml-0'>
              services
            </h4>
            <ul className='space-y-1 sm:space-y-1.5 ml-8 sm:ml-0' role='list'>
              <li>
                <a
                  href='/services#ai-ml-solutions'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  AI Consulting
                </a>
              </li>
              <li>
                <a
                  href='/services#enterprise-solutions'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Software Outsourcing
                </a>
              </li>
              <li>
                <a
                  href='/services#web-development'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href='/services#cloud-solutions'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Cloud Solutions
                </a>
              </li>
              <li>
                <a
                  href='/services#mobile-development'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href='/services#cloud-solutions'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  DevOps
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav
            aria-label='Footer resources'
            className='col-span-1 lg:col-span-1'
          >
            <h4 className='text-sm font-semibold mb-2 sm:mb-3 text-white capitalize tracking-wide text-left ml-8 sm:ml-0'>
              resources
            </h4>
            {resourcesLoading ? (
              <ul className='space-y-1 sm:space-y-1.5 ml-8 sm:ml-0' role='list'>
                {[...Array(3)].map((_, i) => (
                  <li key={i}>
                    <div className='h-5 w-24 bg-gray-700 rounded animate-pulse' />
                  </li>
                ))}
              </ul>
            ) : resources.length > 0 ? (
              <ul className='space-y-1 sm:space-y-1.5 ml-8 sm:ml-0' role='list'>
                {resources.map(resource => {
                  const IconComponent = getResourceIcon(resource.fileType)
                  const displayName = transformFileName(resource.fileName)
                  const isMp4OrM4a =
                    resource.extension === 'mp4' || resource.extension === 'm4a'

                  return (
                    <li key={resource.key}>
                      <a
                        href={resource.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded group'
                        title={resource.fileName}
                        aria-label={`Download ${resource.fileName} (${resource.fileType})`}
                      >
                        <IconComponent
                          className='h-4 w-4 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200'
                          aria-hidden='true'
                        />
                        <span className='truncate'>{displayName}</span>
                        {isMp4OrM4a && (
                          <button
                            onClick={e => handlePlayClick(e, resource)}
                            className='flex-shrink-0 ml-1 p-0.5 text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                            aria-label={`Play ${displayName}`}
                            title={`Play ${displayName}`}
                            type='button'
                          >
                            <Play className='h-3.5 w-3.5' aria-hidden='true' />
                          </button>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className='text-xs sm:text-sm text-gray-500'>
                No resources available
              </p>
            )}
          </nav>

          {/* Legal */}
          <nav aria-label='Footer legal' className='lg:col-span-1'>
            <h4 className='text-sm font-semibold mb-2 sm:mb-3 text-white capitalize tracking-wide text-left ml-8 sm:ml-0'>
              legal
            </h4>
            <ul className='space-y-1 sm:space-y-1.5 ml-8 sm:ml-0' role='list'>
              <li>
                <a
                  href='/privacy-policy'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='/terms-of-service'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href='/cookie-policy'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href='/gdpr'
                  className='block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded'
                >
                  GDPR
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Access */}
          <div className='lg:col-span-1'>
            <section aria-labelledby='mobile-access-heading'>
              <h4
                id='mobile-access-heading'
                className='text-sm font-semibold mb-3 sm:mb-4 text-white capitalize tracking-wide text-left ml-8 sm:ml-0'
              >
                {translations.footer.mobileAccess}
              </h4>
              <div
                className='bg-white p-3 rounded inline-block ml-8 sm:ml-0'
                role='img'
                aria-label='QR code for mobile access'
                suppressHydrationWarning
              >
                {isClient ? (
                  <QRCode
                    value='https://www.bestitconsultants.ca'
                    size={120}
                    level='M'
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  />
                ) : (
                  <div className='w-[120px] h-[120px] bg-gray-200 animate-pulse rounded' />
                )}
              </div>
              <p className='text-xs sm:text-sm text-gray-400 mt-2 text-left ml-8 sm:ml-0'>
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
