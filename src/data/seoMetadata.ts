import { getBaseUrl } from '@/lib/utils'
import { SEOMetadata } from '@/types/seo'

const baseUrl = getBaseUrl()

export const seoMetadataData: SEOMetadata[] = [
  {
    id: 'homepage-seo',
    page: 'home',
    title: 'BestIT Consultants - Vancouver IT & AI Consulting',
    description:
      'Vancouver BC software and IT consulting. Elite IT outsourcing, AI solutions, and SME software development. Canadian Quality, Global Talent.',
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
    ogTitle: 'BestIT Consultants - Vancouver IT & AI Consulting',
    ogDescription:
      'Vancouver BC software and IT consulting. Elite IT outsourcing, AI solutions, and SME software development. Canadian Quality, Global Talent.',
    ogImage: `${baseUrl}/og-images/home.png`,
    canonicalUrl: baseUrl,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BestIT Consultants',
      description:
        'Elite IT consulting and AI solutions. Surrey, BC (Greater Vancouver), Canada.',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '10355 152 Street',
        addressLocality: 'Surrey',
        addressRegion: 'BC',
        postalCode: 'V3R 7C3',
        addressCountry: 'CA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 49.189201,
        longitude: -122.804169,
      },
    },
  },
  {
    id: 'team-seo',
    page: 'team',
    title: 'Our Team - BestIT Consultants',
    description:
      'Meet our elite team of Fortune 500 experienced professionals. AI experts, full-stack developers, and enterprise architects.',
    keywords: [
      'IT Team Canada',
      'Software Engineers',
      'AI Experts',
      'Enterprise Architects',
      'Fortune 500 Experience',
    ],
    ogTitle: 'Our Team - BestIT Consultants',
    ogDescription:
      'Meet our elite team of Fortune 500 experienced professionals.',
    ogImage: `${baseUrl}/og-images/team.png`,
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
    title: 'Case Studies - BestIT Consultants',
    description:
      "Discover how we've helped businesses achieve measurable results through innovative technology solutions.",
    keywords: [
      'IT Case Studies',
      'Success Stories',
      'AI Implementation',
      'Software Development Results',
      'Business Transformation',
    ],
    ogTitle: 'Case Studies - BestIT Consultants',
    ogDescription:
      "Discover how we've helped businesses achieve measurable results.",
    ogImage: `${baseUrl}/og-images/case-studies.png`,
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
