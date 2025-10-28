'use client'

import {
  ExternalLink,
  Building2,
  Globe,
  BarChart3,
  Zap,
  Code,
  Heart,
  Baby,
  ShoppingBag,
} from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface Website {
  name: string
  url: string
  description: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  status: string
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
    name: 'NextJS Supabase',
    url: 'https://nextjs-supabase-kappa-nine.vercel.app',
    description: 'Full-stack web application with authentication',
    category: 'Development',
    icon: Code,
    status: 'active',
  },
  {
    name: 'Manus AI Shop',
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
    name: 'NextJS MCP Template',
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
    url: 'https://bestitconsultants.ca/',
    description: 'IT consulting and services platform',
    category: 'Business',
    icon: Building2,
    status: 'active',
  },
  {
    name: 'Best IT Consultants',
    url: 'https://bestitconsultants.ca/',
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
    name: 'Cursor Portfolio Dashboard',
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
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const renderIcon = (website: Website) => {
    // Always use the meaningful icon instead of trying to fetch external favicons
    const IconComponent = website.icon || Globe
    return (
      <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md'>
        <IconComponent className='h-6 w-6 text-white' />
      </div>
    )
  }

  const renderScreenshot = (website: Website) => {
    // Always use local placeholder images instead of external screenshots
    const placeholderUrl = getPlaceholderScreenshot(website.category)

    return (
      <div className='relative w-24 h-18 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm flex-shrink-0'>
        <Image
          src={placeholderUrl}
          alt={`Screenshot of ${website.name}`}
          width={96}
          height={72}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
      </div>
    )
  }

  return (
    <div className='w-full space-y-6'>
      {websites.map(website => (
        <Card
          key={website.name}
          className='group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 hover:-translate-y-1 border border-gray-200 bg-white hover:bg-blue-50/30 shadow-sm'
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
          <CardContent className='p-6'>
            <div className='flex items-center gap-6'>
              {/* Screenshot Thumbnail */}
              <div className='flex-shrink-0'>{renderScreenshot(website)}</div>

              {/* Enhanced Icon */}
              <div className='flex-shrink-0'>{renderIcon(website)}</div>

              {/* Content */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-bold text-xl text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-200 tracking-tight mb-2'>
                      {website.name}
                    </h3>
                    <p className='text-sm text-blue-600 truncate font-medium mb-3 group-hover:text-blue-700'>
                      {website.url
                        .replace('https://', '')
                        .replace('http://', '')}
                    </p>
                    <p className='text-base text-gray-700 leading-relaxed line-clamp-2 group-hover:text-gray-800'>
                      {website.description}
                    </p>
                  </div>

                  <div className='flex items-center gap-4 flex-shrink-0'>
                    {website.category && (
                      <Badge
                        variant='outline'
                        className={`text-sm px-4 py-2 border-2 font-semibold transition-all duration-200 ${getCategoryColor(website.category)}`}
                      >
                        <span className='mr-2 text-base'>
                          {getCategoryIcon(website.category)}
                        </span>
                        {website.category}
                      </Badge>
                    )}

                    {website.status === 'beta' && (
                      <Badge
                        variant='outline'
                        className='text-xs px-2 py-1 bg-orange-50 text-orange-700 border-orange-300'
                      >
                        BETA
                      </Badge>
                    )}

                    <ExternalLink className='h-6 w-6 text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-200' />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
