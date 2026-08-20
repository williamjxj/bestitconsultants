import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import { structuredDataScript } from '@/lib/structured-data'
import { getBaseUrl } from '@/lib/utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies - BestIT Consultants',
  description:
    'Discover success stories and case studies showcasing our IT consulting expertise. Real-world results from AI/ML implementations, e-commerce modernization, and enterprise solutions.',
  path: '/case-studies',
  keywords: [
    'Case Studies',
    'Success Stories',
    'AI Implementation',
    'Software Development Results',
    'Business Transformation',
  ],
  ogImage: `${getBaseUrl()}/og-images/case-studies.png`,
  ogType: 'article',
  twitterImage: `${getBaseUrl()}/og-images/case-studies.png`,
})

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = getBaseUrl()

  // CollectionPage schema: this is a listing page, not a single article.
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Case Studies - BestIT Consultants',
    description:
      'Discover our external collaborations and featured projects showcasing technical expertise and industry connections across business solutions, AI development, e-commerce platforms, and educational tools.',
    url: `${baseUrl}/case-studies`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'BestIT Consultants',
      url: baseUrl,
    },
  } as const

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(collectionSchema),
        }}
      />
      {children}
    </>
  )
}
