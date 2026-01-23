import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import { getR2ImageUrl } from '@/lib/utils'

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
  ogImage: getR2ImageUrl('imgs/og-contact.jpg'),
  twitterImage: getR2ImageUrl('imgs/og-contact.jpg'),
})

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
