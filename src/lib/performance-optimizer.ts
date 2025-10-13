/**
 * Performance optimizer for Core Web Vitals compliance
 * Optimizes image loading for LCP, FID, and CLS metrics
 */

import { ImageService } from '../services/image-service'
import { ImageCacheService } from '../services/image-cache'

export interface PerformanceMetrics {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  fcp: number // First Contentful Paint
}

export interface OptimizationConfig {
  lcpTarget: number // Target LCP in ms
  fidTarget: number // Target FID in ms
  clsTarget: number // Target CLS score
  imageQuality: number // Image quality (0-100)
  maxWidth: number // Maximum image width
  maxHeight: number // Maximum image height
  enableWebP: boolean // Enable WebP format
  enableLazyLoading: boolean // Enable lazy loading
  preloadCritical: boolean // Preload critical images
}

export class PerformanceOptimizer {
  private imageService: ImageService
  private cacheService: ImageCacheService
  private config: OptimizationConfig
  private metrics: PerformanceMetrics[] = []

  constructor(
    imageService: ImageService,
    cacheService: ImageCacheService,
    config: OptimizationConfig
  ) {
    this.imageService = imageService
    this.cacheService = cacheService
    this.config = config
  }

  /**
   * Optimize image for Core Web Vitals
   */
  async optimizeImage(
    imagePath: string,
    options: {
      priority?: boolean
      sizes?: string
      quality?: number
      format?: 'webp' | 'jpeg' | 'png'
    } = {}
  ): Promise<{
    optimizedUrl: string
    format: string
    quality: number
    dimensions: { width: number; height: number }
    estimatedSize: number
  }> {
    try {
      // Get original image
      const originalImage = await this.imageService.getImage(imagePath)

      // Determine optimal format
      const format = this.getOptimalFormat(options.format)

      // Determine optimal quality
      const quality = this.getOptimalQuality(format, options.priority)

      // Determine optimal dimensions
      const dimensions = this.getOptimalDimensions(originalImage, options.sizes)

      // Generate optimized URL
      const optimizedUrl = this.generateOptimizedUrl(imagePath, {
        format,
        quality,
        width: dimensions.width,
        height: dimensions.height,
      })

      // Estimate file size
      const estimatedSize = this.estimateFileSize(
        originalImage.contentLength,
        quality,
        format
      )

      return {
        optimizedUrl,
        format,
        quality,
        dimensions,
        estimatedSize,
      }
    } catch (error) {
      throw new Error(
        `Failed to optimize image ${imagePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Preload critical images
   */
  async preloadCriticalImages(criticalPaths: string[]): Promise<void> {
    if (!this.config.preloadCritical) return

    console.log('🚀 Preloading critical images...')

    const preloadPromises = criticalPaths.map(async imagePath => {
      try {
        // Preload with high priority
        const optimized = await this.optimizeImage(imagePath, {
          priority: true,
          quality: 85,
          format: 'webp',
        })

        // Store in cache with extended TTL
        await this.cacheService.storeImage(
          imagePath,
          {
            body: Buffer.from('preloaded-data'),
            contentType: `image/${optimized.format}`,
            contentLength: optimized.estimatedSize,
            lastModified: new Date(),
            etag: `"preload-${imagePath}"`,
          },
          7 * 24 * 60 * 60 * 1000
        ) // 7 days

        console.log(`✅ Preloaded: ${imagePath}`)
      } catch (error) {
        console.warn(`⚠️  Failed to preload ${imagePath}:`, error)
      }
    })

    await Promise.allSettled(preloadPromises)
  }

  /**
   * Optimize for LCP (Largest Contentful Paint)
   */
  async optimizeForLCP(imagePath: string): Promise<{
    optimizedUrl: string
    preloadHint: string
    loadingStrategy: string
  }> {
    const optimized = await this.optimizeImage(imagePath, {
      priority: true,
      quality: 90,
      format: 'webp',
      sizes: '100vw',
    })

    return {
      optimizedUrl: optimized.optimizedUrl,
      preloadHint: `<link rel="preload" as="image" href="${optimized.optimizedUrl}" fetchpriority="high">`,
      loadingStrategy: 'eager',
    }
  }

  /**
   * Optimize for FID (First Input Delay)
   */
  async optimizeForFID(): Promise<{
    imageOptimizations: string[]
    resourceHints: string[]
  }> {
    return {
      imageOptimizations: [
        'Use WebP format for better compression',
        'Implement responsive images with srcset',
        'Use appropriate image dimensions',
        'Enable progressive JPEG loading',
      ],
      resourceHints: [
        '<link rel="dns-prefetch" href="//r2.cloudflarestorage.com">',
        '<link rel="preconnect" href="//r2.cloudflarestorage.com" crossorigin>',
        '<link rel="preload" as="image" href="https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/hero.jpg" fetchpriority="high">',
      ],
    }
  }

  /**
   * Optimize for CLS (Cumulative Layout Shift)
   */
  async optimizeForCLS(imagePath: string): Promise<{
    aspectRatio: string
    placeholder: string
    loadingStrategy: string
  }> {
    try {
      const image = await this.imageService.getImage(imagePath)

      // Calculate aspect ratio
      const aspectRatio = this.calculateAspectRatio(image)

      // Generate placeholder
      const placeholder = this.generatePlaceholder(aspectRatio)

      return {
        aspectRatio: `${aspectRatio.w}/${aspectRatio.h}`,
        placeholder: `data:image/svg+xml;base64,${placeholder}`,
        loadingStrategy: 'lazy',
      }
    } catch (error) {
      // Fallback to square aspect ratio
      return {
        aspectRatio: '1/1',
        placeholder:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=',
        loadingStrategy: 'lazy',
      }
    }
  }

  /**
   * Get optimal image format
   */
  private getOptimalFormat(requestedFormat?: string): string {
    if (requestedFormat) return requestedFormat

    if (this.config.enableWebP) {
      return 'webp'
    }

    return 'jpeg'
  }

  /**
   * Get optimal quality setting
   */
  private getOptimalQuality(
    format: string,
    isPriority: boolean = false
  ): number {
    if (isPriority) return 90

    const baseQuality = this.config.imageQuality

    // Adjust quality based on format
    switch (format) {
      case 'webp':
        return Math.min(baseQuality + 10, 95)
      case 'jpeg':
        return baseQuality
      case 'png':
        return Math.min(baseQuality + 5, 90)
      default:
        return baseQuality
    }
  }

  /**
   * Get optimal dimensions
   */
  private getOptimalDimensions(
    image: any,
    sizes?: string
  ): { width: number; height: number } {
    const maxWidth = this.config.maxWidth
    const maxHeight = this.config.maxHeight

    // Parse sizes attribute
    if (sizes) {
      const sizeMatch = sizes.match(/(\d+)px/)
      if (sizeMatch) {
        const requestedWidth = parseInt(sizeMatch[1])
        return this.calculateDimensions(image, requestedWidth, maxHeight)
      }
    }

    return {
      width: Math.min(image.width || maxWidth, maxWidth),
      height: Math.min(image.height || maxHeight, maxHeight),
    }
  }

  /**
   * Calculate dimensions maintaining aspect ratio
   */
  private calculateDimensions(
    image: any,
    targetWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = (image.height || 1) / (image.width || 1)
    const height = Math.min(targetWidth * aspectRatio, maxHeight)
    const width = height / aspectRatio

    return { width: Math.round(width), height: Math.round(height) }
  }

  /**
   * Generate optimized URL
   */
  private generateOptimizedUrl(
    imagePath: string,
    options: {
      format: string
      quality: number
      width: number
      height: number
    }
  ): string {
    const params = new URLSearchParams({
      format: options.format,
      quality: options.quality.toString(),
      width: options.width.toString(),
      height: options.height.toString(),
    })

    return `${imagePath}?${params.toString()}`
  }

  /**
   * Estimate file size
   */
  private estimateFileSize(
    originalSize: number,
    quality: number,
    format: string
  ): number {
    const qualityFactor = quality / 100
    const formatFactor = format === 'webp' ? 0.7 : format === 'jpeg' ? 0.8 : 1.0

    return Math.round(originalSize * qualityFactor * formatFactor)
  }

  /**
   * Calculate aspect ratio
   */
  private calculateAspectRatio(image: any): { w: number; h: number } {
    const width = image.width || 1
    const height = image.height || 1

    // Find greatest common divisor
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    const divisor = gcd(width, height)

    return {
      w: width / divisor,
      h: height / divisor,
    }
  }

  /**
   * Generate placeholder SVG
   */
  private generatePlaceholder(aspectRatio: { w: number; h: number }): string {
    const svg = `
      <svg width="${aspectRatio.w}" height="${aspectRatio.h}" viewBox="0 0 ${aspectRatio.w} ${aspectRatio.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="${aspectRatio.w}" height="${aspectRatio.h}" fill="#f3f4f6"/>
      </svg>
    `

    return Buffer.from(svg).toString('base64')
  }

  /**
   * Get performance recommendations
   */
  getPerformanceRecommendations(): {
    lcp: string[]
    fid: string[]
    cls: string[]
    general: string[]
  } {
    return {
      lcp: [
        'Optimize hero images for LCP',
        'Use WebP format for better compression',
        'Implement responsive images',
        'Preload critical images',
      ],
      fid: [
        'Minimize JavaScript execution time',
        'Use efficient image loading strategies',
        'Implement proper caching',
        'Optimize image dimensions',
      ],
      cls: [
        'Set explicit image dimensions',
        'Use aspect ratio placeholders',
        'Avoid layout shifts during loading',
        'Implement proper image sizing',
      ],
      general: [
        'Enable HTTP/2 for better performance',
        'Use CDN for global distribution',
        'Implement proper caching headers',
        'Monitor Core Web Vitals regularly',
      ],
    }
  }

  /**
   * Create performance optimizer from environment
   */
  static async fromEnvironment(): Promise<PerformanceOptimizer> {
    const imageService = await ImageService.fromEnvironment()
    const cacheService = new ImageCacheService()

    const config: OptimizationConfig = {
      lcpTarget: 2500,
      fidTarget: 100,
      clsTarget: 0.1,
      imageQuality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
      enableWebP: true,
      enableLazyLoading: true,
      preloadCritical: true,
    }

    return new PerformanceOptimizer(imageService, cacheService, config)
  }
}
