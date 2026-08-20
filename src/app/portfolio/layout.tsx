import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo-utils'
import { getBaseUrl } from '@/lib/utils'

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio - BestIT Consultants',
  description:
    'Explore our portfolio of successful projects and client work. Showcasing enterprise software solutions, AI implementations, and digital transformation success stories.',
  path: '/portfolio',
  keywords: [
    'Portfolio',
    'Projects',
    'Client Work',
    'Software Solutions',
    'Digital Transformation',
  ],
  ogImage: `${getBaseUrl()}/og-images/portfolio.png`,
  twitterImage: `${getBaseUrl()}/og-images/portfolio.png`,
})

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
