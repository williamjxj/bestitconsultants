'use client'

import {
  ExternalLink,
  Building2,
  Users,
  Camera,
  Sparkles,
  Code2,
  LayoutDashboard,
  Target,
  ShoppingBag,
  GraduationCap,
  Globe,
  BarChart3,
  ImageIcon,
  Zap,
  Code,
  Heart,
  Baby,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface BookmarkItem {
  id: number
  title: string
  url: string
  description: string
  category: string
  meaningfulIcon?: React.ComponentType<{ className?: string }>
}

const bookmarkData: BookmarkItem[] = [
  {
    id: 1028,
    title: 'Best IT Consulting',
    url: 'https://bestitconsulting.vercel.app',
    description:
      'Professional IT consulting services and digital transformation solutions for modern businesses',
    category: 'Business',
    meaningfulIcon: Building2,
  },
  {
    id: 1029,
    title: 'Best IT Consultants',
    url: 'https://bestitconsultants.vercel.app',
    description:
      'Expert consulting platform connecting businesses with top-tier technology consultants',
    category: 'Business',
    meaningfulIcon: Users,
  },
  {
    id: 1049,
    title: 'Image Gallery App',
    url: 'https://gallery.vercel.app',
    description:
      'Modern image gallery application with advanced filtering, search, and organization features',
    category: 'Media',
    meaningfulIcon: Camera,
  },
  {
    id: 1050,
    title: 'AI Face Fusion',
    url: 'https://facefusion.vercel.app',
    description:
      'Cutting-edge AI-powered face swapping technology with real-time processing capabilities',
    category: 'AI',
    meaningfulIcon: Sparkles,
  },
  {
    id: 1051,
    title: 'Next.js MCP Template',
    url: 'https://nextjs-mcp-template.vercel.app',
    description:
      'Production-ready Next.js template with MCP integration, authentication, and modern development tools',
    category: 'Development',
    meaningfulIcon: Code2,
  },
  {
    id: 1052,
    title: 'Next.js Dashboard',
    url: 'https://nextjs-dashboard.vercel.app',
    description:
      'Comprehensive analytics dashboard built with Next.js featuring real-time data visualization',
    category: 'Development',
    meaningfulIcon: LayoutDashboard,
  },
  {
    id: 1070,
    title: 'BidMaster Hub',
    url: 'https://bidmaster-hub.vercel.app',
    description:
      'Project discovery platform enabling seamless bidding, collaboration, and project management',
    category: 'Business',
    meaningfulIcon: Target,
  },
  {
    id: 1071,
    title: 'Premium Products Gallery',
    url: 'https://products-gallery.vercel.app',
    description:
      'Sophisticated marketplace platform showcasing premium products with advanced e-commerce features',
    category: 'E-commerce',
    meaningfulIcon: ShoppingBag,
  },
  {
    id: 1072,
    title: 'Friendship Corner Daycare',
    url: 'https://friendship-daycare.vercel.app',
    description:
      'Montessori-based daycare services in Coquitlam, BC, focusing on early childhood development',
    category: 'Education',
    meaningfulIcon: GraduationCap,
  },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Business':
      return <BarChart3 className='h-3 w-3' />
    case 'Media':
      return <ImageIcon className='h-3 w-3' />
    case 'AI':
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
      return 'bg-blue-500/20 text-blue-200 border-blue-400/30 backdrop-blur-sm'
    case 'Media':
      return 'bg-purple-500/20 text-purple-200 border-purple-400/30 backdrop-blur-sm'
    case 'AI':
      return 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30 backdrop-blur-sm'
    case 'Development':
      return 'bg-green-500/20 text-green-200 border-green-400/30 backdrop-blur-sm'
    case 'E-commerce':
      return 'bg-pink-500/20 text-pink-200 border-pink-400/30 backdrop-blur-sm'
    case 'Education':
      return 'bg-orange-500/20 text-orange-200 border-orange-400/30 backdrop-blur-sm'
    default:
      return 'bg-gray-500/20 text-gray-200 border-gray-400/30 backdrop-blur-sm'
  }
}

const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return null
  }
}

export default function BookmarkList() {
  const [faviconErrors, setFaviconErrors] = useState<Set<number>>(new Set())

  const handleItemClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleFaviconError = (id: number) => {
    setFaviconErrors(prev => new Set(prev).add(id))
  }

  const renderIcon = (bookmark: BookmarkItem) => {
    const faviconUrl = getFaviconUrl(bookmark.url)
    const shouldUseFavicon = faviconUrl && !faviconErrors.has(bookmark.id)

    if (shouldUseFavicon) {
      return (
        <div className='relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center border border-white/30 shadow-lg backdrop-blur-sm'>
          <Image
            src={faviconUrl || '/placeholder.svg'}
            alt=''
            width={24}
            height={24}
            className='w-6 h-6 object-cover'
            onError={() => handleFaviconError(bookmark.id)}
          />
        </div>
      )
    }

    // Use meaningful icon if favicon fails or doesn't exist
    const IconComponent = bookmark.meaningfulIcon || Globe
    return (
      <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/25 to-blue-500/15 flex items-center justify-center border border-cyan-400/30 shadow-lg group-hover:from-cyan-400/30 group-hover:to-blue-400/20 transition-all duration-300 backdrop-blur-sm'>
        <IconComponent className='h-5 w-5 text-cyan-300' />
      </div>
    )
  }

  return (
    <div className='w-full space-y-4'>
      {bookmarkData.map(bookmark => (
        <Card
          key={bookmark.id}
          className='group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400/50 hover:-translate-y-1 border border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 shadow-xl'
          role='button'
          tabIndex={0}
          title={bookmark.description}
          aria-label={`Open ${bookmark.title}`}
          onClick={() => handleItemClick(bookmark.url)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleItemClick(bookmark.url)
            }
          }}
        >
          <CardContent className='p-5'>
            <div className='flex items-center gap-4'>
              {/* Enhanced Icon */}
              <div className='flex-shrink-0'>{renderIcon(bookmark)}</div>

              {/* Content */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between gap-4'>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-lg text-white truncate group-hover:text-cyan-300 transition-colors duration-200 tracking-tight mb-1'>
                      {bookmark.title}
                    </h3>
                    <p className='text-sm text-blue-200/70 truncate font-medium mb-2'>
                      {bookmark.url
                        .replace('https://', '')
                        .replace('http://', '')}
                    </p>
                    <p className='text-sm text-blue-100/80 leading-relaxed line-clamp-2'>
                      {bookmark.description}
                    </p>
                  </div>

                  <div className='flex items-center gap-3 flex-shrink-0'>
                    {bookmark.category && (
                      <Badge
                        variant='outline'
                        className={`text-xs px-3 py-1.5 border font-medium transition-all duration-200 ${getCategoryColor(bookmark.category)}`}
                      >
                        <span className='mr-1.5'>
                          {getCategoryIcon(bookmark.category)}
                        </span>
                        {bookmark.category}
                      </Badge>
                    )}

                    <ExternalLink className='h-5 w-5 text-blue-200/60 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-200' />
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
