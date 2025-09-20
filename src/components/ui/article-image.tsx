'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ArticleImageProps {
  src: string | null
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function ArticleImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: ArticleImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Generate a themed placeholder based on the article title
  const getThemedPlaceholder = () => {
    const themes = [
      'ai',
      'tech',
      'data',
      'neural',
      'code',
      'robot',
      'future',
      'smart',
    ]
    const theme = themes[Math.floor(Math.random() * themes.length)]
    const seed =
      alt
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 10) || 'default'
    return `/api/placeholder/${width}/${height}?theme=${theme}&seed=${seed}`
  }

  // Generate a better fallback image using Unsplash
  const getBetterFallback = () => {
    const keywords = [
      'artificial-intelligence',
      'technology',
      'data-science',
      'machine-learning',
      'neural-network',
      'robotics',
      'automation',
      'innovation',
    ]
    const keyword = keywords[Math.floor(Math.random() * keywords.length)]
    return `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=80`
  }

  const imageSrc = imageError || !src ? getBetterFallback() : src

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className='absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center'>
          <div className='w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
        </div>
      )}
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onError={handleError}
        onLoad={handleLoad}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
        priority={priority}
      />
      {imageError && (
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
          <div className='text-center text-gray-500'>
            <div className='w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center'>
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <p className='text-xs'>AI News</p>
          </div>
        </div>
      )}
    </div>
  )
}
