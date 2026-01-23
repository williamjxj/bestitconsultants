import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import { getR2ImageUrl } from '@/lib/utils'

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
  ogImage: getR2ImageUrl('imgs/og-team.jpg'),
  twitterImage: getR2ImageUrl('imgs/og-team.jpg'),
})

export default function OurTeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
