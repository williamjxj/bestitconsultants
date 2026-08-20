import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import { structuredDataScript } from '@/lib/structured-data'
import { getBaseUrl } from '@/lib/utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us - BestIT Consultants',
  description:
    'Get in touch with BestIT Consultants for your IT consulting needs. Contact our team to discuss AI solutions, web development, cloud services, and enterprise software projects.',
  path: '/contact-us',
  keywords: [
    'Contact BestIT',
    'IT Consulting Contact',
    'Get Quote',
    'Consultation',
    'Project Inquiry',
  ],
  ogImage: `${getBaseUrl()}/og-images/contact.png`,
  twitterImage: `${getBaseUrl()}/og-images/contact.png`,
})

// FAQ structured data for rich results.
// Answers mirror the FAQ content rendered on the contact page.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is your typical project timeline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project timelines vary based on complexity, but most projects take 2-6 months from start to finish.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide ongoing support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer comprehensive support and maintenance packages for all our projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies do you specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialize in modern web and mobile technologies including React, Node.js, Python, and cloud platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you ensure project quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We follow rigorous testing protocols, code reviews, and agile development methodologies to ensure high quality.',
      },
    },
  ],
} as const

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(faqSchema),
        }}
      />
      {children}
    </>
  )
}
