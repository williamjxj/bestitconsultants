import { SEOMetadata } from '@/types/seo'

export const seoMetadataData: SEOMetadata[] = [
  {
    id: 'homepage-seo',
    page: 'home',
    title: 'BestIT Consulting - Elite IT Outsourcing & AI Consulting',
    description:
      'Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation. Canadian Quality, Global Talent.',
    keywords: [
      'IT Outsourcing Canada',
      'AI Consulting Services',
      'Global Software Development',
      'Elite IT Consulting',
      'Fortune 500 Experience',
    ],
    ogTitle: 'BestIT Consulting - Elite IT Outsourcing & AI Consulting',
    ogDescription:
      'Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation.',
    ogImage: '/images/og-homepage.jpg',
    canonicalUrl: 'https://bestitconsultants.ca',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BestIT Consulting',
      description: 'Elite IT consulting and AI solutions',
      url: 'https://bestitconsultants.ca',
      logo: 'https://bestitconsultants.ca/logo.png',
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
    ogImage: '/images/og-team.jpg',
    canonicalUrl: 'https://bestitconsultants.ca/team',
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
    ogImage: '/images/og-case-studies.jpg',
    canonicalUrl: 'https://bestitconsultants.ca/case-studies',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Success Stories & Case Studies',
      description:
        "Discover how we've helped businesses achieve measurable results",
    },
  },
]
