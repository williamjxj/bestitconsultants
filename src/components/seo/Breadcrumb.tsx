'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {
  createBreadcrumbSchema,
  structuredDataScript,
} from '@/lib/structured-data'
import { cn } from '@/lib/utils'
import type { BreadcrumbItem } from '@/types/seo'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumb navigation component with visual navigation and structured data
 * Provides both user navigation benefits (UX) and SEO benefits (structured data)
 */
export default function Breadcrumb({
  items,
  className,
}: BreadcrumbProps) {
  // Generate BreadcrumbList structured data
  const breadcrumbSchema = createBreadcrumbSchema(items)

  return (
    <>
      {/* BreadcrumbList structured data (JSON-LD) */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: structuredDataScript(breadcrumbSchema),
        }}
      />

      {/* Visual breadcrumb navigation */}
      <nav
        aria-label='Breadcrumb'
        className={cn('mb-4', className)}
      >
        <ol className='flex items-center space-x-2 text-sm text-gray-600'>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isActive = item.isActive || isLast

            return (
              <li
                key={index}
                className='flex items-center'
              >
                {index > 0 && (
                  <ChevronRight className='mx-2 h-4 w-4 text-gray-400' />
                )}
                {isActive ? (
                  <span
                    className={cn(
                      'font-medium',
                      isActive && 'text-gray-900'
                    )}
                    aria-current='page'
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className='hover:text-gray-900 transition-colors'
                  >
                    {index === 0 ? (
                      <span className='flex items-center'>
                        <Home className='h-4 w-4 mr-1' />
                        {item.label}
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
