import React from 'react'

import {
  createOrganizationSchema,
  structuredDataScript,
} from '@/lib/structured-data'
import { getBaseUrl } from '@/lib/utils'

export const StructuredData: React.FC = () => {
  const baseUrl = getBaseUrl()

  // Get business email from environment or use default
  const businessEmail =
    process.env.BUSINESS_EMAIL ||
    process.env.CONTACT_EMAIL ||
    'service@bestitconsultants.ca'

  const organizationSchema = createOrganizationSchema({
    name: 'BestIT Consultants',
    description:
      'Elite IT consulting, outsourcing solutions, and AI innovation. Canadian Quality, Global Talent.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: businessEmail,
    sameAs: [
      'https://linkedin.com/company/bestitconsultants',
      'https://twitter.com/bestitconsultants',
    ],
  })

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: structuredDataScript(organizationSchema),
      }}
    />
  )
}
