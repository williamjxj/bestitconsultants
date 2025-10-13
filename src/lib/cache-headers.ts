/**
 * Cache headers configuration for R2 images
 * Optimizes caching behavior for different image types and scenarios
 */

import { NextResponse } from 'next/server'

export interface CacheConfig {
  maxAge: number
  sMaxAge?: number
  staleWhileRevalidate?: number
  immutable: boolean
  mustRevalidate?: boolean
  noCache?: boolean
  noStore?: boolean
  private?: boolean
  public?: boolean
}

export class CacheHeaderManager {
  private static readonly CACHE_CONFIGS: { [key: string]: CacheConfig } = {
    // Static images (logos, icons, etc.)
    static: {
      maxAge: 31536000, // 1 year
      sMaxAge: 31536000,
      immutable: true,
      public: true,
    },

    // Dynamic images (user uploads, generated content)
    dynamic: {
      maxAge: 86400, // 1 day
      sMaxAge: 86400,
      staleWhileRevalidate: 604800, // 1 week
      public: true,
      immutable: false,
    },

    // Critical images (hero, above-fold)
    critical: {
      maxAge: 604800, // 1 week
      sMaxAge: 604800,
      staleWhileRevalidate: 2592000, // 1 month
      public: true,
      immutable: false,
    },

    // Development/testing
    development: {
      maxAge: 0,
      noCache: true,
      noStore: true,
      immutable: false,
    },

    // Error responses
    error: {
      maxAge: 300, // 5 minutes
      noCache: true,
      mustRevalidate: true,
      immutable: false,
    },
  }

  /**
   * Get cache headers for image type
   */
  static getCacheHeaders(
    imageType: 'static' | 'dynamic' | 'critical' | 'development' | 'error',
    customConfig?: Partial<CacheConfig>
  ): Headers {
    const config = { ...this.CACHE_CONFIGS[imageType], ...customConfig }
    const headers = new Headers()

    // Cache-Control header
    const cacheControlParts: string[] = []

    if (config.public) cacheControlParts.push('public')
    if (config.private) cacheControlParts.push('private')
    if (config.noCache) cacheControlParts.push('no-cache')
    if (config.noStore) cacheControlParts.push('no-store')
    if (config.mustRevalidate) cacheControlParts.push('must-revalidate')
    if (config.immutable) cacheControlParts.push('immutable')

    if (config.maxAge !== undefined) {
      cacheControlParts.push(`max-age=${config.maxAge}`)
    }

    if (config.sMaxAge !== undefined) {
      cacheControlParts.push(`s-maxage=${config.sMaxAge}`)
    }

    if (config.staleWhileRevalidate !== undefined) {
      cacheControlParts.push(
        `stale-while-revalidate=${config.staleWhileRevalidate}`
      )
    }

    headers.set('Cache-Control', cacheControlParts.join(', '))

    // Additional headers
    if (config.immutable) {
      headers.set(
        'Expires',
        new Date(Date.now() + config.maxAge * 1000).toUTCString()
      )
    }

    return headers
  }

  /**
   * Get cache headers for specific image path
   */
  static getHeadersForImage(imagePath: string): Headers {
    // Determine image type based on path
    let imageType: 'static' | 'dynamic' | 'critical' | 'development' | 'error' =
      'dynamic'

    if (imagePath.includes('/logos/') || imagePath.includes('/icons/')) {
      imageType = 'static'
    } else if (imagePath.includes('/hero/') || imagePath.includes('/banner/')) {
      imageType = 'critical'
    } else if (process.env.NODE_ENV === 'development') {
      imageType = 'development'
    }

    return this.getCacheHeaders(imageType)
  }

  /**
   * Get cache headers for R2 images
   */
  static getR2CacheHeaders(
    isMigrated: boolean,
    lastModified: Date,
    etag: string
  ): Headers {
    const headers = new Headers()

    if (isMigrated) {
      // R2 images can be cached aggressively
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      headers.set(
        'Expires',
        new Date(Date.now() + 31536000 * 1000).toUTCString()
      )
    } else {
      // Local images have shorter cache time
      headers.set('Cache-Control', 'public, max-age=86400')
      headers.set('Expires', new Date(Date.now() + 86400 * 1000).toUTCString())
    }

    // ETag for conditional requests
    headers.set('ETag', etag)
    headers.set('Last-Modified', lastModified.toUTCString())

    return headers
  }

  /**
   * Get cache headers for different scenarios
   */
  static getScenarioHeaders(scenario: {
    isR2: boolean
    isCritical: boolean
    isDevelopment: boolean
    hasError: boolean
  }): Headers {
    if (scenario.hasError) {
      return this.getCacheHeaders('error')
    }

    if (scenario.isDevelopment) {
      return this.getCacheHeaders('development')
    }

    if (scenario.isCritical) {
      return this.getCacheHeaders('critical')
    }

    if (scenario.isR2) {
      return this.getCacheHeaders('static')
    }

    return this.getCacheHeaders('dynamic')
  }

  /**
   * Add cache headers to response
   */
  static addCacheHeaders(
    response: NextResponse,
    imagePath: string,
    metadata?: {
      isR2?: boolean
      lastModified?: Date
      etag?: string
      isCritical?: boolean
    }
  ): NextResponse {
    let headers: Headers

    if (metadata?.isR2 && metadata.lastModified && metadata.etag) {
      headers = this.getR2CacheHeaders(
        metadata.isR2,
        metadata.lastModified,
        metadata.etag
      )
    } else {
      headers = this.getHeadersForImage(imagePath)
    }

    // Apply headers to response
    headers.forEach((value, key) => {
      response.headers.set(key, value)
    })

    return response
  }

  /**
   * Get cache configuration for monitoring
   */
  static getCacheConfig(): { [key: string]: CacheConfig } {
    return { ...this.CACHE_CONFIGS }
  }

  /**
   * Validate cache headers
   */
  static validateCacheHeaders(headers: Headers): {
    isValid: boolean
    issues: string[]
    recommendations: string[]
  } {
    const issues: string[] = []
    const recommendations: string[] = []

    const cacheControl = headers.get('Cache-Control')
    if (!cacheControl) {
      issues.push('Missing Cache-Control header')
      recommendations.push('Add Cache-Control header for proper caching')
    } else {
      if (!cacheControl.includes('max-age')) {
        issues.push('Missing max-age directive')
        recommendations.push('Add max-age directive to Cache-Control')
      }

      if (
        cacheControl.includes('no-cache') &&
        cacheControl.includes('max-age')
      ) {
        issues.push('Conflicting cache directives')
        recommendations.push('Remove conflicting cache directives')
      }
    }

    const etag = headers.get('ETag')
    if (!etag && cacheControl?.includes('max-age')) {
      recommendations.push('Add ETag header for conditional requests')
    }

    const lastModified = headers.get('Last-Modified')
    if (!lastModified && cacheControl?.includes('max-age')) {
      recommendations.push('Add Last-Modified header for conditional requests')
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations,
    }
  }
}

/**
 * Cache header presets for common scenarios
 */
export const CACHE_PRESETS = {
  // Hero images - cache for 1 week, revalidate in background
  HERO: CacheHeaderManager.getCacheHeaders('critical'),

  // Portfolio images - cache for 1 day, revalidate in background
  PORTFOLIO: CacheHeaderManager.getCacheHeaders('dynamic'),

  // Logo/icon images - cache for 1 year, immutable
  LOGO: CacheHeaderManager.getCacheHeaders('static'),

  // Development - no caching
  DEVELOPMENT: CacheHeaderManager.getCacheHeaders('development'),

  // Error responses - cache for 5 minutes
  ERROR: CacheHeaderManager.getCacheHeaders('error'),
}

/**
 * Apply cache headers to NextResponse
 */
export function applyCacheHeaders(
  response: NextResponse,
  imagePath: string,
  options?: {
    isR2?: boolean
    lastModified?: Date
    etag?: string
    isCritical?: boolean
  }
): NextResponse {
  return CacheHeaderManager.addCacheHeaders(response, imagePath, options)
}
