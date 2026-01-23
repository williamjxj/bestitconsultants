import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import {
  createOrganizationSchema,
  createServiceSchema,
  structuredDataScript,
} from '@/lib/structured-data'
import { getBaseUrl, getR2ImageUrl } from '@/lib/utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'IT Services - BestIT Consultants',
  description:
    'Comprehensive IT consulting services including AI/ML solutions, web development, cloud infrastructure, and enterprise software. Fortune 500 proven expertise.',
  path: '/services',
  keywords: [
    'IT Services',
    'AI Consulting',
    'Cloud Solutions',
    'Enterprise Software',
    'Web Development',
  ],
  ogImage: getR2ImageUrl('imgs/og-services.jpg'),
  twitterImage: getR2ImageUrl('imgs/og-services.jpg'),
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = getBaseUrl()

  // Organization schema for service provider
  const organizationSchema = createOrganizationSchema({
    name: 'BestIT Consultants',
    description:
      'Elite IT consulting, outsourcing solutions, and AI innovation. Canadian Quality, Global Talent.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: process.env.BUSINESS_EMAIL || 'service@bestitconsultants.ca',
    sameAs: [
      'https://linkedin.com/company/bestitconsultants',
      'https://twitter.com/bestitconsultants',
    ],
  })

  // Service schema for the services page
  const serviceSchema = createServiceSchema({
    name: 'IT Consulting Services',
    description:
      'Comprehensive IT consulting services including AI/ML solutions, web development, cloud infrastructure, and enterprise software development.',
    provider: organizationSchema,
    serviceType: 'IT Consulting',
    areaServed: 'Canada',
    // Pricing omitted as per clarification (only include if explicitly available)
  })

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(serviceSchema),
        }}
      />
      {children}
    </>
  )
}
