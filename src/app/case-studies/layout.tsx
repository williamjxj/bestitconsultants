import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import {
  createArticleSchema,
  createOrganizationSchema,
  structuredDataScript,
} from '@/lib/structured-data'
import { getBaseUrl, getR2ImageUrl } from '@/lib/utils'

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
  ogImage: getR2ImageUrl('imgs/og-case-studies.jpg'),
  ogType: 'article',
  twitterImage: getR2ImageUrl('imgs/og-case-studies.jpg'),
})

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = getBaseUrl()

  // Organization schema for publisher
  const organizationSchema = createOrganizationSchema({
    name: 'BestIT Consultants',
    description:
      'Elite IT consulting, outsourcing solutions, and AI innovation. Canadian Quality, Global Talent.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    email: process.env.BUSINESS_EMAIL || 'service@bestitconsulting.ca',
    sameAs: [
      'https://linkedin.com/company/bestitconsultants',
      'https://twitter.com/bestitconsultants',
    ],
  })

  // Article schema for case studies page
  // Using current date as publication date since specific dates not available
  // Author omitted as per clarification (only include if explicitly available)
  const articleSchema = createArticleSchema({
    headline: 'Case Studies - Featured Projects & Partnerships',
    description:
      'Discover our external collaborations and featured projects showcasing technical expertise and industry connections across business solutions, AI development, e-commerce platforms, and educational tools.',
    datePublished: new Date().toISOString(),
    publisher: organizationSchema,
    image: getR2ImageUrl('imgs/og-case-studies.jpg'),
  })

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(articleSchema),
        }}
      />
      {children}
    </>
  )
}
