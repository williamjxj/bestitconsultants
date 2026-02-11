import React from 'react'

import {
  createLocalBusinessSchema,
  createOrganizationSchema,
  structuredDataScript,
  VANCOUVER_ADDRESS,
  VANCOUVER_GEO,
} from '@/lib/structured-data'
import { getBaseUrl } from '@/lib/utils'

export const StructuredData: React.FC = () => {
  const baseUrl = getBaseUrl()

  // Get business email from environment or use default
  const businessEmail =
    process.env.BUSINESS_EMAIL ||
    process.env.CONTACT_EMAIL ||
    'service@bestitconsultants.ca'

  const sameAs = [
    'https://linkedin.com/company/bestitconsultants',
    'https://twitter.com/bestitconsultants',
  ]

  const organizationSchema = createOrganizationSchema({
    name: 'BestIT Consultants',
    description:
      'Elite IT consulting, outsourcing solutions, and AI innovation. Vancouver, BC, Canada. Canadian Quality, Global Talent.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: businessEmail,
    sameAs,
    address: VANCOUVER_ADDRESS,
    geo: VANCOUVER_GEO,
  })

  const localBusinessSchema = createLocalBusinessSchema({
    name: 'BestIT Consultants',
    description:
      'Vancouver, BC software and IT consulting. Elite IT outsourcing, AI solutions, and SME software development. Canadian Quality, Global Talent.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: businessEmail,
    sameAs,
    address: VANCOUVER_ADDRESS,
    geo: VANCOUVER_GEO,
    areaServed: ['Vancouver, BC, Canada', 'Canada'],
  })

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(organizationSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(localBusinessSchema),
        }}
      />
    </>
  )
}
