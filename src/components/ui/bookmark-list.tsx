'use client'

import {
  Building2,
  Globe,
  BarChart3,
  Zap,
  Code,
  Heart,
  Baby,
  ShoppingBag,
  Github,
} from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getBaseUrl } from '@/lib/utils'

interface Website {
  name: string
  url: string
  description: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  status: string
  githubUrl?: string
}

const websites: Website[] = [
  {
    name: 'Face Fusion Agent',
    url: 'https://face-fusion-agent.vercel.app',
    description: 'AI-powered face fusion and manipulation tool',
    category: 'AI/ML',
    icon: Code,
    status: 'active',
  },
  {
    name: 'Images Synthesis & Online Subscription',
    url: 'https://nextjs-supabase-kappa-nine.vercel.app',
    description: 'Full-stack web application with authentication',
    category: 'Development',
    icon: Code,
    status: 'active',
  },
  {
    name: 'AI Images Cart & Purchase',
    url: 'https://manus-ai-shop.vercel.app',
    description: 'AI-powered e-commerce platform',
    category: 'E-commerce',
    icon: ShoppingBag,
    status: 'active',
  },
  {
    name: 'BidMaster Hub',
    url: 'https://bidmaster-hub.vercel.app/',
    description: 'Project bidding management platform',
    category: 'Business',
    icon: Building2,
    status: 'active',
  },
  {
    name: 'Cart & Online Payment',
    url: 'https://nextjs-mcp-template.vercel.app/',
    description: 'Model Context Protocol template application',
    category: 'Development',
    icon: Code,
    status: 'beta',
  },
  {
    name: 'Friendship Daycare',
    url: 'https://friendshipdaycare.vercel.app/',
    description: 'Childcare and daycare management system',
    category: 'Education',
    icon: Heart,
    status: 'active',
  },
  {
    name: 'Best IT Consulting',
    url: `${getBaseUrl()}/`,
    description: 'IT consulting and services platform',
    category: 'Business',
    icon: Building2,
    status: 'active',
  },
  {
    name: 'Best IT Consultants',
    url: `${getBaseUrl()}/`,
    description: 'Professional IT consulting services',
    category: 'Business',
    icon: Building2,
    status: 'active',
  },
  {
    name: 'Erongdan',
    url: 'https://www.erongdan.com',
    description: 'Digital solutions and business services platform',
    category: 'Business',
    icon: Building2,
    status: 'active',
  },
  {
    name: 'Admin Portfolio Dashboard',
    url: 'https://cursor-portfolio-dashboard.vercel.app/',
    description:
      'AI-powered portfolio dashboard showcasing curated applications',
    category: 'Development',
    icon: Code,
    status: 'active',
  },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Business':
      return <BarChart3 className='h-3 w-3' />
    case 'AI/ML':
      return <Zap className='h-3 w-3' />
    case 'Development':
      return <Code className='h-3 w-3' />
    case 'E-commerce':
      return <Heart className='h-3 w-3' />
    case 'Education':
      return <Baby className='h-3 w-3' />
    default:
      return <Globe className='h-3 w-3' />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Business':
      return 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100'
    case 'AI/ML':
      return 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100'
    case 'Development':
      return 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
    case 'E-commerce':
      return 'bg-pink-50 text-pink-700 border-pink-300 hover:bg-pink-100'
    case 'Education':
      return 'bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
  }
}

// R2 bucket configuration - Use R2 URLs when configured, fallback to local for development
const R2_BASE_URL =
  process.env.R2_PUBLIC_URL ||
  'https://pub-1234567890abcdef.r2.cloudflarestorage.com'
const R2_ENABLED = process.env.R2_ENABLED === 'true'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// Helper function to get image URL (R2 in production, local in development)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getImageUrl(_imagePath: string): string {
  // This function is currently unused but kept for future R2 integration
  // In production with R2 enabled, use R2 URLs
  if (
    IS_PRODUCTION &&
    R2_ENABLED &&
    R2_BASE_URL &&
    !R2_BASE_URL.includes('1234567890abcdef')
  ) {
    return `${R2_BASE_URL}${_imagePath}`
  }
  // In development or when R2 not configured, use local paths
  return _imagePath
}

// Fallback placeholder for screenshots using R2 images in production, local in development
const getPlaceholderScreenshot = (category: string) => {
  const placeholders = {
    Business:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
    'AI/ML':
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_1.png',
    Development:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1350198816-612x612.jpg',
    'E-commerce':
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1145868161-612x612.webp',
    Education:
      'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2227310361-612x612.webp',
  }
  return (
    placeholders[category as keyof typeof placeholders] ||
    placeholders['Development']
  )
}

export default function BookmarkList() {
  const handleItemClick = (url: string) => {
    // Navigate in same window to avoid losing focus
    window.location.href = url
  }

  const renderScreenshot = (website: Website) => {
    // Always use local placeholder images instead of external screenshots
    const placeholderUrl = getPlaceholderScreenshot(website.category)

    return (
      <div className='relative w-full h-48 rounded-t-lg overflow-hidden bg-gray-100 border-b border-gray-200'>
        <Image
          src={placeholderUrl}
          alt={`Screenshot of ${website.name}`}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
      </div>
    )
  }

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {websites.map(website => (
        <Card
          key={website.name}
          className='group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-400 hover:-translate-y-2 border border-gray-200 bg-white overflow-hidden flex flex-col'
          role='button'
          tabIndex={0}
          title={website.description}
          aria-label={`Open ${website.name}`}
          onClick={() => handleItemClick(website.url)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleItemClick(website.url)
            }
          }}
        >
          {/* Screenshot Thumbnail */}
          {renderScreenshot(website)}

          {/* Content */}
          <CardContent className='p-6 flex-1 flex flex-col'>
            {/* Category Badge */}
            <div className='mb-3'>
              {website.category && (
                <Badge
                  variant='outline'
                  className={`text-xs px-3 py-1 border font-semibold transition-all duration-200 ${getCategoryColor(website.category)}`}
                >
                  <span className='mr-1.5'>
                    {getCategoryIcon(website.category)}
                  </span>
                  {website.category}
                </Badge>
              )}
              {website.status === 'beta' && (
                <Badge
                  variant='outline'
                  className='ml-2 text-xs px-2 py-1 bg-orange-50 text-orange-700 border-orange-300'
                >
                  BETA
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className='font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors duration-200 tracking-tight mb-2'>
              {website.name}
            </h3>

            {/* Description */}
            <p className='text-sm text-gray-600 leading-relaxed mb-4 flex-1 group-hover:text-gray-800'>
              {website.description}
            </p>

            {/* Footer with Icons */}
            <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
              {/* Project name as clickable link */}
              <a
                href={website.url}
                onClick={e => {
                  e.stopPropagation()
                  window.location.href = website.url
                }}
                className='text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 flex-1 truncate'
                title={website.url}
              >
                {website.name}
              </a>

              {/* Icons: GitHub and Web */}
              <div className='flex items-center gap-3 ml-4'>
                {/* GitHub Icon - Always visible and clickable */}
                <a
                  href={website.githubUrl || '#'}
                  onClick={e => {
                    e.stopPropagation()
                    if (website.githubUrl) {
                      window.location.href = website.githubUrl
                    } else {
                      e.preventDefault()
                    }
                  }}
                  className={`transition-colors duration-200 rounded-full p-1 hover:opacity-90 cursor-pointer ${
                    website.githubUrl ? 'bg-black' : 'bg-black/50'
                  }`}
                  title={
                    website.githubUrl
                      ? 'View on GitHub'
                      : 'GitHub repository not available'
                  }
                  aria-label={
                    website.githubUrl
                      ? 'GitHub repository'
                      : 'GitHub repository not available'
                  }
                >
                  <Github
                    className={`h-4 w-4 hover:scale-110 transition-transform duration-200 ${
                      website.githubUrl ? 'text-white' : 'text-white/70'
                    }`}
                  />
                </a>

                {/* Web/Internet Icon */}
                <a
                  href={website.url}
                  onClick={e => {
                    e.stopPropagation()
                    window.location.href = website.url
                  }}
                  className='transition-colors duration-200 rounded-full p-1 hover:opacity-90 cursor-pointer bg-black'
                  title='Visit website'
                  aria-label='Visit website'
                >
                  <Globe className='h-4 w-4 text-white hover:scale-110 transition-transform duration-200' />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
