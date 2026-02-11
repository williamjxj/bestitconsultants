import { getBaseUrl, getR2ImageUrl } from '@/lib/utils'
import { SEOMetadata } from '@/types/seo'

const baseUrl = getBaseUrl()

export const seoMetadataData: SEOMetadata[] = [
  {
    id: 'homepage-seo',
    page: 'home',
    title: 'BestIT Consulting - Vancouver BC | Elite IT Outsourcing & AI Consulting',
    description:
      'Vancouver, BC, Canada software & IT consulting. Elite IT outsourcing, AI solutions, and SME software development. Canadian Quality, Global Talent. Headquartered in Vancouver.',
    keywords: [
      'Vancouver software company',
      'Vancouver IT consulting',
      'software company Vancouver BC',
      'SME software company Vancouver',
      'IT outsourcing Vancouver Canada',
      'AI consulting Vancouver',
      'IT Outsourcing Canada',
      'AI Consulting Services',
      'Global Software Development',
      'Elite IT Consulting',
      'Fortune 500 Experience',
    ],
    ogTitle: 'BestIT Consulting - Vancouver BC | Elite IT Outsourcing & AI Consulting',
    ogDescription:
      'Vancouver, BC, Canada. Elite IT consulting, outsourcing solutions, and AI innovation. SME software development. Canadian Quality, Global Talent.',
    ogImage: getR2ImageUrl('imgs/og-homepage.jpg'),
    canonicalUrl: baseUrl,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BestIT Consulting',
      description: 'Elite IT consulting and AI solutions. Vancouver, BC, Canada.',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vancouver',
        addressRegion: 'BC',
        addressCountry: 'CA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 49.2827,
        longitude: -123.1207,
      },
    },
  },
  {
    id: 'team-seo',
    page: 'team',
    title: 'Our Expert Team - BestIT Consulting',
    description:
      'Meet our elite team of Fortune 500 experienced professionals. AI experts, full-stack developers, and enterprise architects.',
    keywords: [
      'IT Team Canada',
      'Software Engineers',
      'AI Experts',
      'Enterprise Architects',
      'Fortune 500 Experience',
    ],
    ogTitle: 'Our Expert Team - BestIT Consulting',
    ogDescription:
      'Meet our elite team of Fortune 500 experienced professionals.',
    ogImage: getR2ImageUrl('imgs/og-team.jpg'),
    canonicalUrl: `${baseUrl}/our-team`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Our Expert Team',
      description:
        'Meet our elite team of Fortune 500 experienced professionals',
    },
  },
  {
    id: 'case-studies-seo',
    page: 'case-studies',
    title: 'Success Stories & Case Studies - BestIT Consulting',
    description:
      "Discover how we've helped businesses achieve measurable results through innovative technology solutions.",
    keywords: [
      'IT Case Studies',
      'Success Stories',
      'AI Implementation',
      'Software Development Results',
      'Business Transformation',
    ],
    ogTitle: 'Success Stories & Case Studies - BestIT Consulting',
    ogDescription:
      "Discover how we've helped businesses achieve measurable results.",
    ogImage: getR2ImageUrl('imgs/og-case-studies.jpg'),
    canonicalUrl: `${baseUrl}/case-studies`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Success Stories & Case Studies',
      description:
        "Discover how we've helped businesses achieve measurable results",
    },
  },
]
