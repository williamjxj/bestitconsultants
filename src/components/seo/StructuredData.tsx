import React from 'react'

export const StructuredData: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BestIT Consulting',
    description: 'Elite IT consulting and AI solutions',
    url: 'https://bestitconsultants.ca',
    logo: 'https://bestitconsultants.ca/logo.png',
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
