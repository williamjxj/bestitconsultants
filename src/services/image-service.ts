/**
 * Image service with fallback logic
 * Multi-tier fallback strategy: R2 → Cache → Local
 */

import { promises as fs } from 'fs'
import path from 'path'

import { ImageAssetModel } from '../types/image-asset'
import { ImageCacheManager, ImageCacheModel } from '../types/image-cache'
import { ImageServiceOptions, R2Response } from '../types/r2'


import { R2ClientService } from './r2-client'

export class ImageService {
  private r2Client: R2ClientService
  private cache: ImageCacheManager
  private options: ImageServiceOptions

  constructor(
    r2Client: R2ClientService,
    cache: ImageCacheManager,
    options: ImageServiceOptions = {}
  ) {
    this.r2Client = r2Client
    this.cache = cache
    this.options = {
      useCache: true,
      fallbackToLocal: true,
      maxRetries: 3,
      timeout: 5000,
      ...options,
    }
  }

  /**
   * Get image with multi-tier fallback
   */
  async getImage(imagePath: string): Promise<R2Response> {
    const startTime = Date.now()

    try {
      // Tier 1: Try R2
      if (this.r2Client.getConfig().isEnabled) {
        try {
          const r2Response = await this.getFromR2(imagePath)
          await this.cacheImage(imagePath, r2Response)
          return r2Response
        } catch (error) {
          console.warn(`R2 failed for ${imagePath}:`, error)
        }
      }

      // Tier 2: Try cache
      if (this.options.useCache) {
        try {
          const cachedResponse = await this.getFromCache(imagePath)
          if (cachedResponse) {
            return cachedResponse
          }
        } catch (error) {
          console.warn(`Cache failed for ${imagePath}:`, error)
        }
      }

      // Tier 3: Try local fallback
      if (this.options.fallbackToLocal) {
        try {
          const localResponse = await this.getFromLocal(imagePath)
          await this.cacheImage(imagePath, localResponse)
          return localResponse
        } catch (error) {
          console.warn(`Local fallback failed for ${imagePath}:`, error)
        }
      }

      throw new Error(`All tiers failed for ${imagePath}`)
    } catch (error) {
      const responseTime = Date.now() - startTime
      console.error(
        `Image service failed for ${imagePath} after ${responseTime}ms:`,
        error
      )
      throw error
    }
  }

  /**
   * Get image from R2
   */
  private async getFromR2(imagePath: string): Promise<R2Response> {
    const objectKey = this.getObjectKey(imagePath)
    return await this.r2Client.getObject(objectKey)
  }

  /**
   * Get image from cache
   */
  private async getFromCache(imagePath: string): Promise<R2Response | null> {
    const cacheEntry = this.cache.get(imagePath)
    if (!cacheEntry) {
      return null
    }

    return {
      body: cacheEntry.data,
      contentType: cacheEntry.contentType,
      contentLength: cacheEntry.size,
      lastModified: cacheEntry.lastModified,
      etag: `"${cacheEntry.key}"`,
    }
  }

  /**
   * Get image from local filesystem
   */
  private async getFromLocal(imagePath: string): Promise<R2Response> {
    const localPath = path.join(process.cwd(), 'public', imagePath)

    try {
      const data = await fs.readFile(localPath)
      const stats = await fs.stat(localPath)
      const contentType = this.getContentType(imagePath)

      return {
        body: data,
        contentType,
        contentLength: stats.size,
        lastModified: stats.mtime,
        etag: `"${stats.mtime.getTime()}"`,
      }
    } catch (error) {
      throw new Error(`Local file not found: ${localPath}`)
    }
  }

  /**
   * Cache an image response
   */
  private async cacheImage(
    imagePath: string,
    response: R2Response
  ): Promise<void> {
    if (!this.options.useCache) return

    try {
      const cacheEntry = ImageCacheModel.fromImageData(
        imagePath,
        response.body,
        response.contentType,
        24 * 60 * 60 * 1000 // 24 hours
      )

      this.cache.set(imagePath, cacheEntry)
    } catch (error) {
      console.warn(`Failed to cache image ${imagePath}:`, error)
    }
  }

  /**
   * Upload image to R2
   */
  async uploadImage(
    imagePath: string,
    data: Buffer,
    contentType: string
  ): Promise<{
    success: boolean
    r2Url?: string
    error?: string
  }> {
    try {
      const objectKey = this.getObjectKey(imagePath)
      const result = await this.r2Client.putObject(objectKey, data, contentType)

      if (result.success) {
        // Cache the uploaded image
        const cacheEntry = ImageCacheModel.fromImageData(
          imagePath,
          data,
          contentType,
          24 * 60 * 60 * 1000
        )
        this.cache.set(imagePath, cacheEntry)
      }

      return result
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Check if image exists in any tier
   */
  async imageExists(imagePath: string): Promise<{
    r2: boolean
    cache: boolean
    local: boolean
  }> {
    const results = {
      r2: false,
      cache: false,
      local: false,
    }

    // Check R2
    if (this.r2Client.getConfig().isEnabled) {
      try {
        const objectKey = this.getObjectKey(imagePath)
        results.r2 = await this.r2Client.objectExists(objectKey)
      } catch (error) {
        // R2 check failed
      }
    }

    // Check cache
    if (this.options.useCache) {
      results.cache = this.cache.has(imagePath)
    }

    // Check local
    if (this.options.fallbackToLocal) {
      try {
        const localPath = path.join(process.cwd(), 'public', imagePath)
        await fs.access(localPath)
        results.local = true
      } catch (error) {
        // Local file doesn't exist
      }
    }

    return results
  }

  /**
   * Get service health status
   */
  async getHealthStatus(): Promise<{
    r2: 'healthy' | 'degraded' | 'unhealthy'
    cache: 'healthy' | 'degraded' | 'unhealthy'
    local: 'healthy' | 'degraded' | 'unhealthy'
    overall: 'healthy' | 'degraded' | 'unhealthy'
  }> {
    const health: {
      r2: 'healthy' | 'degraded' | 'unhealthy'
      cache: 'healthy' | 'degraded' | 'unhealthy'
      local: 'healthy' | 'degraded' | 'unhealthy'
      overall: 'healthy' | 'degraded' | 'unhealthy'
    } = {
      r2: 'unhealthy',
      cache: 'healthy',
      local: 'healthy',
      overall: 'unhealthy',
    }

    // Check R2 health
    if (this.r2Client.getConfig().isEnabled) {
      try {
        const r2Health = await this.r2Client.getHealthStatus()
        health.r2 = r2Health.status
      } catch (error) {
        health.r2 = 'unhealthy'
      }
    }

    // Check cache health
    try {
      const cacheStats = this.cache.getStats()
      health.cache = cacheStats.totalEntries > 0 ? 'healthy' : 'degraded'
    } catch (error) {
      health.cache = 'unhealthy'
    }

    // Check local health
    try {
      const publicDir = path.join(process.cwd(), 'public')
      await fs.access(publicDir)
      health.local = 'healthy'
    } catch (error) {
      health.local = 'unhealthy'
    }

    // Determine overall health
    const hasHealthy =
      health.r2 === 'healthy' ||
      health.cache === 'healthy' ||
      health.local === 'healthy'
    const hasDegraded =
      health.r2 === 'degraded' ||
      health.cache === 'degraded' ||
      (health.local as 'healthy' | 'degraded' | 'unhealthy') === 'degraded'

    if (hasHealthy) {
      health.overall = 'healthy'
    } else if (hasDegraded) {
      health.overall = 'degraded'
    } else {
      health.overall = 'unhealthy'
    }

    return health
  }

  /**
   * Get service metrics
   */
  getMetrics(): {
    cache: any
    r2: any
    options: ImageServiceOptions
  } {
    return {
      cache: this.cache.getStats(),
      r2: this.r2Client.getConfig(),
      options: this.options,
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Evict expired cache entries
   */
  evictExpiredCache(): number {
    return this.cache.evictExpired()
  }

  /**
   * Get object key from image path
   */
  private getObjectKey(imagePath: string): string {
    // Remove leading slash and ensure it starts with 'imgs/'
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    return cleanPath.startsWith('imgs/') ? cleanPath : `imgs/${cleanPath}`
  }

  /**
   * Get content type from file extension
   */
  private getContentType(imagePath: string): string {
    const extension = path.extname(imagePath).toLowerCase()
    const contentTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
    }
    return contentTypes[extension] || 'application/octet-stream'
  }

  /**
   * Create image service from environment
   */
  static async fromEnvironment(): Promise<ImageService> {
    const r2Client = R2ClientService.fromEnvironment()
    const cache = new ImageCacheManager()

    return new ImageService(r2Client, cache, {
      useCache: true,
      fallbackToLocal: true,
      maxRetries: 3,
      timeout: 5000,
    })
  }

  /**
   * Create image service for testing
   */
  static forTesting(): ImageService {
    const r2Client = R2ClientService.forTesting()
    const cache = new ImageCacheManager()

    return new ImageService(r2Client, cache, {
      useCache: true,
      fallbackToLocal: true,
      maxRetries: 1,
      timeout: 1000,
    })
  }
}
