import { HeroCarouselItem } from '@/components/ui/hero-carousel'
import { getR2BaseUrl } from '@/lib/utils'

const R2_BASE_URL = getR2BaseUrl()

export const heroCarouselItems: HeroCarouselItem[] = [
  {
    id: 'enterprise-solutions',
    title: 'Enterprise Software Solutions',
    subtitle: 'Fortune 500 Experience',
    description:
      'Led by industry veterans with 20+ years combined experience, we deliver AI/ML solutions, enterprise systems, and cloud platforms for global clients including Xperi, HSBC, and Credit Suisse.',
    image: `${R2_BASE_URL}/optimized/b1`,
    ctaText: 'Start Your Project',
    ctaLink: '/contact-us',
  },
  {
    id: 'ai-ml-expertise',
    title: 'AI & Machine Learning Excellence',
    subtitle: 'Cutting-Edge Technology',
    description:
      'Transform your business with advanced AI/ML solutions. From data pipelines to real-time processing, we build intelligent systems that drive innovation and competitive advantage.',
    image: `${R2_BASE_URL}/optimized/b2`,
    // Uncomment the line below when you have a video file
    // video: '/videos/ai-technology-demo.mp4',
    ctaText: 'Explore AI Solutions',
    ctaLink: '/services',
  },
  {
    id: 'global-reach',
    title: 'Global Technology Leadership',
    subtitle: 'Worldwide Impact',
    description:
      'Serving clients across US, Canada, China, Singapore, and Europe. Our proven track record includes award-winning projects for FedEx, Tiffany & Co, and government agencies.',
    image: `${R2_BASE_URL}/optimized/b3`,
    ctaText: 'View Our Portfolio',
    ctaLink: '/portfolio',
  },
]
