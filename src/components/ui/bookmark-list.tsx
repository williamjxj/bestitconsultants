'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  Globe,
  Code,
  Heart,
  ShoppingBag,
  Github,
  LayoutGrid,
  List,
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ImageCarousel } from '@/components/ui/image-carousel'
import { getR2ImageUrl } from '@/lib/utils'

interface Website {
  name: string
  url: string
  description: string
  category: string
  icon: React.ComponentType<{ className?: string; size?: string | number }>
  status: string
  githubUrl?: string
  images?: string[] // Optional array of images for carousel
}

const websites: Website[] = [
  {
    name: 'Face Fusion Agent',
    url: 'https://face-fusion-agent.vercel.app',
    description: 'AI-powered face fusion and manipulation tool',
    category: 'AI/ML',
    icon: Code,
    status: 'active',
    githubUrl: 'https://github.com/williamjxj/face-swap-poc',
    images: [
      getR2ImageUrl('optimized/g-25.webp'),
      getR2ImageUrl('optimized/g-21.webp'),
    ],
  },
  {
    name: 'Images Hub',
    url: 'https://images-hub-pim.vercel.app/',
    description:
      'A unified gateway to stunning images from Cloudflare, Unsplash, Pexels, Pixabay, and more—your one-stop source for high-quality visuals, and AI Chatbot assistant!',
    category: 'Development',
    icon: LayoutGrid,
    status: 'active',
    githubUrl: 'https://github.com/williamjxj/images-hub',
    images: [
      getR2ImageUrl('case-studies/images-hub-1.webp'),
      getR2ImageUrl('case-studies/images-hub-2.webp'),
      getR2ImageUrl('case-studies/images-hub-3.webp'),
      getR2ImageUrl('case-studies/images-hub-4.webp'),
    ],
  },
  {
    name: 'Images Synthesis & Online Subscription',
    url: 'https://nextjs-supabase-kappa-nine.vercel.app',
    description: 'Full-stack web application with authentication',
    category: 'Development',
    icon: Code,
    status: 'active',
    githubUrl: 'https://github.com/williamjxj/nextjs-supabase',
    images: [
      getR2ImageUrl('istockphoto-1350198816-612x612.jpg'),
      getR2ImageUrl('optimized/g-17.webp'),
    ],
  },
  {
    name: 'AI Images Cart & Purchase',
    url: 'https://manus-ai-shop.vercel.app',
    description: 'AI-powered e-commerce platform',
    category: 'E-commerce',
    icon: ShoppingBag,
    status: 'active',
    githubUrl: 'https://github.com/williamjxj/manus-ai-shop',
    images: [
      getR2ImageUrl('optimized/g-10.webp'),
      getR2ImageUrl('optimized/g-49.webp'),
    ],
  },
  {
    name: 'BidMaster Hub',
    url: 'https://bidmaster-hub.vercel.app/',
    description: 'Project bidding management platform',
    category: 'Business',
    icon: Building2,
    status: 'active',
    githubUrl: 'https://github.com/williamjxj/bidmaster',
    images: [
      getR2ImageUrl('optimized/g-36.webp'),
      getR2ImageUrl('optimized/g-38.webp'),
      getR2ImageUrl('optimized/g-39.webp'),
    ],
  },
  {
    name: 'Cart & Online Payment',
    url: 'https://nextjs-mcp-template.vercel.app/',
    description: 'Model Context Protocol template application',
    category: 'Development',
    icon: Code,
    status: 'beta',
    githubUrl: 'https://github.com/williamjxj/nextjs-mcp-template',
    images: [getR2ImageUrl('optimized/g-23.webp')],
  },
  {
    name: 'Friendship Daycare',
    url: 'https://friendshipdaycare.vercel.app/',
    description: 'Childcare and daycare management system',
    category: 'Education',
    icon: Heart,
    status: 'active',
    githubUrl: 'https://github.com/williamjxj/friendshipdaycare',
    images: [
      getR2ImageUrl('optimized/g-19.webp'),
      getR2ImageUrl('optimized/g-22.webp'),
      getR2ImageUrl('optimized/g-12.webp'),
    ],
  },
  {
    name: 'Best IT Consulting',
    url: `https://www.bestitconsulting.ca`,
    githubUrl: 'https://github.com/williamjxj/bestitconsulting',
    description: 'IT consulting and services platform',
    category: 'Business',
    icon: Building2,
    status: 'active',
    images: [
      getR2ImageUrl('optimized/g-37.webp'),
      getR2ImageUrl('optimized/g-46.webp'),
    ],
  },
  {
    name: 'Best IT Consultants',
    url: `https://www.bestitconsultants.ca`,
    githubUrl: 'https://github.com/williamjxj/bestitconsultants',
    description: 'Professional IT consulting services',
    category: 'Business',
    icon: Building2,
    status: 'active',
    images: [
      getR2ImageUrl('optimized/g-42.webp'),
      getR2ImageUrl('optimized/g-45.webp'),
    ],
  },
  {
    name: 'Erongdan',
    url: 'https://www.erongdan.com',
    githubUrl: '',
    description:
      'Digital solutions and business services platform for a Fortune 500 company ',
    category: 'Business',
    icon: Building2,
    status: 'active',
    images: [
      getR2ImageUrl('optimized/g-18.webp'),
      getR2ImageUrl('optimized/g-9.webp'),
    ],
  },
  {
    name: 'Admin Portfolio Dashboard',
    url: 'https://cursor-portfolio-dashboard.vercel.app/',
    githubUrl: 'https://github.com/williamjxj/portfolio-dashboard',
    description:
      'AI-powered portfolio dashboard showcasing curated applications',
    category: 'Development',
    icon: Code,
    status: 'active',
    images: [
      getR2ImageUrl('optimized/g-15.webp'),
      getR2ImageUrl('optimized/g-38.webp'),
    ],
  },
]

// Fallback placeholder for screenshots - now using website-specific images from Image2
// This function is kept for backward compatibility but websites now have their own images array
const getPlaceholderScreenshot = (category: string) => {
  const placeholders = {
    Business: getR2ImageUrl('optimized/g-8.webp'), // Fallback for Business category
    'AI/ML': getR2ImageUrl('optimized/g-25.webp'), // Fallback for AI/ML category
    Development: getR2ImageUrl('istockphoto-1350198816-612x612.jpg'), // Fallback for Development category
    'E-commerce': getR2ImageUrl('optimized/g-10.webp'), // Fallback for E-commerce category
    Education: getR2ImageUrl('optimized/g-21.webp'), // Fallback for Education category
  }
  return (
    placeholders[category as keyof typeof placeholders] ||
    placeholders['Development']
  )
}

export default function BookmarkList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className='w-full'>
      {/* View Toggle */}
      <div className='flex justify-end mb-6'>
        <div className='flex items-center gap-2 bg-gray-100 rounded-lg p-1'>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-label='Grid view'
            title='Grid view'
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-label='List view'
            title='List view'
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'flex flex-col gap-6'
        }
      >
        {websites.map((website, index) => {
          // Use website-specific images if available, otherwise fallback to category placeholder
          const images =
            website.images && website.images.length > 0
              ? website.images
              : [getPlaceholderScreenshot(website.category)]

          return (
            <motion.div
              key={website.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={viewMode === 'list' ? 'w-full' : ''}
            >
              <Card
                className={`group hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm overflow-hidden ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                {/* Image Area - Matching Portfolio Style with Carousel */}
                <div
                  className={`relative overflow-hidden ${
                    viewMode === 'list'
                      ? 'w-64 h-48 flex-shrink-0'
                      : 'aspect-video'
                  }`}
                >
                  <ImageCarousel
                    images={images}
                    alt={`Screenshot of ${website.name}`}
                    className='w-full h-full'
                    aspectRatio={viewMode === 'list' ? 'auto' : 'video'}
                    autoPlay={false}
                    showIndicators={images.length > 1}
                    showNavigation={images.length > 1}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none' />
                  {/* Category Badge */}
                  <div className='absolute bottom-4 left-4 text-white z-10'>
                    <Badge variant='secondary'>{website.category}</Badge>
                  </div>
                  {/* Icon */}
                  <div className='absolute top-4 right-4 z-10'>
                    <website.icon size={32} className='text-white/80' />
                  </div>
                </div>

                {/* Card Content */}
                <div
                  className={`flex-1 flex flex-col ${viewMode === 'list' ? 'min-w-0' : ''}`}
                >
                  {/* Card Header - Matching Portfolio Style */}
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='text-xl mb-2'>
                          {website.name}
                        </CardTitle>
                        <CardDescription className='text-gray-600'>
                          {website.description}
                        </CardDescription>
                      </div>
                      {website.status === 'beta' && (
                        <Badge variant='secondary' className='ml-2'>
                          BETA
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  {/* Card Content - Matching Portfolio Style */}
                  <CardContent className='flex-1 flex flex-col justify-between'>
                    <div className='space-y-4'>
                      {/* Footer with Icons */}
                      <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                        <a
                          href={website.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 flex-1 truncate'
                          title={website.url}
                        >
                          Visit Project
                        </a>

                        {/* Icons: GitHub and Web */}
                        <div className='flex items-center gap-3 ml-4'>
                          {/* GitHub Icon */}
                          {website.githubUrl && (
                            <a
                              href={website.githubUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='transition-colors duration-200 rounded-full p-1 hover:opacity-90 cursor-pointer bg-black'
                              title='View on GitHub'
                              aria-label='GitHub repository'
                            >
                              <Github className='h-4 w-4 text-white hover:scale-110 transition-transform duration-200' />
                            </a>
                          )}

                          {/* Web/Internet Icon */}
                          <a
                            href={website.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='transition-colors duration-200 rounded-full p-1 hover:opacity-90 cursor-pointer bg-black'
                            title='Visit website'
                            aria-label='Visit website'
                          >
                            <Globe className='h-4 w-4 text-white hover:scale-110 transition-transform duration-200' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
