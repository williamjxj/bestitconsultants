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
import { useState } from 'react'

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
    url: 'https://bestitconsulting.vercel.app/',
    description: 'IT consulting and services platform',
    category: 'Business',
    icon: Building2,
    status: 'active',
  },
  {
    name: 'Best IT Consultants',
    url: 'https://bestitconsultants.vercel.app/',
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

const getFaviconUrl = (url: string) => {
  try {
    // Extract domain using regex to avoid URL constructor issues
    const domain = url.replace(/^https?:\/\//, '').split('/')[0]
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return null
  }
}

// Screenshot API service for website thumbnails
const getScreenshotUrl = (url: string) => {
  try {
    // Using a free screenshot API service
    const encodedUrl = encodeURIComponent(url)
    // Alternative services you can use:
    // 1. Screenshot API (free tier): https://screenshotapi.net/
    // 2. ScreenshotMachine: https://screenshotmachine.com/
    // 3. Htmlcsstoimage: https://htmlcsstoimage.com/

    // Using screenshotapi.net (free tier)
    return `https://shot.screenshotapi.net/screenshot?token=YOUR_API_TOKEN&url=${encodedUrl}&width=400&height=300&output=image&file_type=png&wait_for_event=load`
  } catch {
    return null
  }
}

// Fallback placeholder for screenshots
const getPlaceholderScreenshot = (category: string) => {
  const placeholders = {
    Business:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
    'AI/ML':
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center',
    Development:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center',
    'E-commerce':
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center',
    Education:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop&crop=center',
  }
  return (
    placeholders[category as keyof typeof placeholders] ||
    placeholders['Development']
  )
}

export default function BookmarkList() {
  const [faviconErrors, setFaviconErrors] = useState<Set<string>>(new Set())
  const [screenshotErrors, setScreenshotErrors] = useState<Set<string>>(
    new Set()
  )

  const handleItemClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleFaviconError = (name: string) => {
    setFaviconErrors(prev => new Set(prev).add(name))
  }

  const handleScreenshotError = (name: string) => {
    setScreenshotErrors(prev => new Set(prev).add(name))
  }

  const renderIcon = (website: Website) => {
    const faviconUrl = getFaviconUrl(website.url)
    const shouldUseFavicon = faviconUrl && !faviconErrors.has(website.name)

    if (shouldUseFavicon) {
      return (
        <div className='relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center border border-gray-200'>
          <Image
            src={faviconUrl || '/placeholder.svg'}
            alt=''
            width={32}
            height={32}
            className='w-8 h-8 object-cover'
            onError={() => handleFaviconError(website.name)}
          />
        </div>
      )
    }

    // Use meaningful icon if favicon fails or doesn't exist
    const IconComponent = website.icon || Globe
    return (
      <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md'>
        <IconComponent className='h-6 w-6 text-white' />
      </div>
    )
  }

  const renderScreenshot = (website: Website) => {
    const screenshotUrl = getScreenshotUrl(website.url)
    const placeholderUrl = getPlaceholderScreenshot(website.category)
    const shouldUseScreenshot =
      screenshotUrl && !screenshotErrors.has(website.name)

    return (
      <div className='relative w-24 h-18 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm flex-shrink-0'>
        <Image
          src={shouldUseScreenshot ? screenshotUrl : placeholderUrl}
          alt={`Screenshot of ${website.name}`}
          width={96}
          height={72}
          className='w-full h-full object-cover'
          onError={() => handleScreenshotError(website.name)}
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
