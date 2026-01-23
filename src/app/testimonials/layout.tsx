import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import { getR2ImageUrl } from '@/lib/utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'Testimonials - BestIT Consultants',
  description:
    'Read client testimonials and success stories from businesses we have helped transform with our IT consulting services and technology solutions.',
  path: '/testimonials',
  keywords: [
    'Testimonials',
    'Client Reviews',
    'Success Stories',
    'Customer Feedback',
    'IT Consulting Reviews',
  ],
  ogImage: getR2ImageUrl('imgs/og-testimonials.jpg'),
  twitterImage: getR2ImageUrl('imgs/og-testimonials.jpg'),
})

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
