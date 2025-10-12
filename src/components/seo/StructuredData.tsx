import React from 'react'

export const StructuredData: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BestIT Consulting',
    description: 'Elite IT consulting and AI solutions',
    url: 'https://bestitconsulting.com',
    logo: 'https://bestitconsulting.com/logo.png',
    sameAs: [
      'https://linkedin.com/company/bestitconsulting',
      'https://twitter.com/bestitconsulting',
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
