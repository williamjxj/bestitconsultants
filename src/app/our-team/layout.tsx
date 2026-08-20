import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import { structuredDataScript, VANCOUVER_ADDRESS } from '@/lib/structured-data'
import { getBaseUrl } from '@/lib/utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'Our Team - BestIT Consultants',
  description:
    'Meet our expert team of Fortune 500 experienced professionals. AI experts, full-stack developers, and enterprise architects with proven track records.',
  path: '/our-team',
  keywords: [
    'IT Team Canada',
    'Software Engineers',
    'AI Experts',
    'Enterprise Architects',
    'Fortune 500 Experience',
  ],
  ogImage: `${getBaseUrl()}/og-images/team.png`,
  twitterImage: `${getBaseUrl()}/og-images/team.png`,
})

// Person schema for the founder - strengthens entity understanding
// for search engines and AI engines (GEO).
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'William Jiang',
  jobTitle: 'Founder & Full Stack Engineer, AI Consultant',
  description:
    'Experienced technology professional with 20+ years in full-stack development, software architecture, and AI-driven solutions.',
  worksFor: {
    '@type': 'Organization',
    name: 'BestIT Consultants',
    url: getBaseUrl(),
  },
  address: VANCOUVER_ADDRESS,
  knowsAbout: [
    'React.js',
    'Node.js',
    'Python',
    'Java',
    'Kubernetes',
    'Docker',
    'AWS',
    'MLOps',
    'Microservices',
    'GraphQL',
    'MongoDB',
    'LangChain',
    'LlamaIndex',
    'Hugging Face',
    'Kafka',
    'ElasticSearch',
    'Prometheus',
  ],
} as const

export default function OurTeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(founderSchema),
        }}
      />
      {children}
    </>
  )
}
