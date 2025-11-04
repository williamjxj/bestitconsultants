import React from 'react'

import { getBaseUrl } from '@/lib/utils'

export const StructuredData: React.FC = () => {
  const baseUrl = getBaseUrl()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BestIT Consulting',
    description: 'Elite IT consulting and AI solutions',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://linkedin.com/company/bestitconsultants',
      'https://twitter.com/bestitconsultants',
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
