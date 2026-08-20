import { getBaseUrl } from '@/lib/utils'

/**
 * WebSite structured data (homepage only).
 * Helps search engines and AI engines understand the site as a whole.
 */
export function WebsiteSchema() {
  const baseUrl = getBaseUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BestIT Consultants',
    alternateName: 'BestIT',
    url: baseUrl,
    description:
      'Elite IT consulting, outsourcing solutions, and AI innovation. Vancouver, BC, Canada. Canadian Quality, Global Talent.',
    publisher: {
      '@type': 'Organization',
      name: 'BestIT Consultants',
      url: baseUrl,
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
