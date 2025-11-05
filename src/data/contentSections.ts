import { ContentSection } from '@/types/content'

export const contentSectionsData: ContentSection[] = [
  {
    id: 'hero-homepage',
    type: 'hero',
    title: 'Elite Enterprise Architects. Startup Speed.',
    subtitle: 'Get Fortune 500 Software Expertise Without the Overhead',
    content:
      'Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent',
    ctaText: 'Get a Free Consultation',
    ctaLink: '/contact-us?title=Free Consultation#contact-form',
    background: 'gradient-blue-indigo',
    order: 1,
    isActive: true,
  },
  {
    id: 'highlights-section',
    type: 'highlight',
    title: 'Why Choose BestIT Consulting',
    subtitle: 'Elite expertise with startup agility',
    content:
      'Our team brings Fortune 500 experience with the flexibility and attention of a startup. We deliver enterprise-grade solutions with the speed and innovation that only a focused team can provide.',
    ctaText: 'Learn More',
    ctaLink: '/testimonials',
    background: 'gradient-gray-blue',
    order: 2,
    isActive: true,
  },
  {
    id: 'testimonial-section',
    type: 'testimonial',
    title: 'Client Success Stories',
    subtitle: 'What our clients say about us',
    content:
      'AI-assisted design completely changed our process and boosted our creativity by 10x. The new platform transformed our business with incredible performance gains.',
    ctaText: 'View Case Studies',
    ctaLink: '/case-studies',
    background: 'gradient-green-blue',
    order: 3,
    isActive: true,
  },
  {
    id: 'cta-section',
    type: 'cta',
    title: 'Ready to Transform Your Business?',
    subtitle: 'Get started with a free consultation',
    content:
      'Let our elite team of experts help you achieve your business goals with cutting-edge technology solutions.',
    ctaText: 'Get Started Today',
    ctaLink: '/contact-us?title=Start Your Project#contact-form',
    background: 'gradient-purple-pink',
    order: 4,
    isActive: true,
  },
]
