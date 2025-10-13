/**
 * Image cache service implementation
 * Service for managing image caching with performance optimization
 */

import { ImageCacheManager, ImageCacheModel } from '../types/image-cache'
import { ImageAssetModel } from '../types/image-asset'
import { R2Response } from '../types/r2'

export class ImageCacheService {
  private cache: ImageCacheManager
  private performanceMetrics: {
    hitRate: number
    missRate: number
    averageResponseTime: number
    totalRequests: number
    cacheHits: number
    cacheMisses: number
  }

  constructor(cache?: ImageCacheManager) {
    this.cache = cache || new ImageCacheManager()
    this.performanceMetrics = {
      hitRate: 0,
      missRate: 0,
      averageResponseTime: 0,
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
    }
  }

  /**
   * Get image from cache
   */
  async getImage(imagePath: string): Promise<R2Response | null> {
    const startTime = Date.now()
    this.performanceMetrics.totalRequests++

    try {
      const cacheEntry = this.cache.get(imagePath)

      if (cacheEntry) {
        this.performanceMetrics.cacheHits++
        this.updateMetrics()

        return {
          body: cacheEntry.data,
          contentType: cacheEntry.contentType,
          contentLength: cacheEntry.size,
          lastModified: cacheEntry.lastModified,
          etag: `"${cacheEntry.key}"`,
        }
      } else {
        this.performanceMetrics.cacheMisses++
        this.updateMetrics()
        return null
      }
    } catch (error) {
      console.error(`Cache error for ${imagePath}:`, error)
      this.performanceMetrics.cacheMisses++
      this.updateMetrics()
      return null
    } finally {
      const responseTime = Date.now() - startTime
      this.updateAverageResponseTime(responseTime)
    }
  }

  /**
   * Store image in cache
   */
  async storeImage(
    imagePath: string,
    response: R2Response,
    ttl: number = 24 * 60 * 60 * 1000 // 24 hours
  ): Promise<void> {
    try {
      const cacheEntry = ImageCacheModel.fromImageData(
        imagePath,
        response.body,
        response.contentType,
        ttl
      )

      this.cache.set(imagePath, cacheEntry)
    } catch (error) {
      console.error(`Failed to store image in cache: ${imagePath}`, error)
    }
  }

  /**
   * Store image from R2 response
   */
  async storeFromR2(
    imagePath: string,
    r2Response: R2Response,
    ttl: number = 24 * 60 * 60 * 1000
  ): Promise<void> {
    try {
      const cacheEntry = ImageCacheModel.fromR2Response(
        imagePath,
        r2Response,
        ttl
      )

      this.cache.set(imagePath, cacheEntry)
    } catch (error) {
      console.error(`Failed to store R2 response in cache: ${imagePath}`, error)
    }
  }

  /**
   * Store image from local file
   */
  async storeFromLocal(
    imagePath: string,
    fileData: Buffer,
    contentType: string,
    ttl: number = 24 * 60 * 60 * 1000
  ): Promise<void> {
    try {
      const cacheEntry = ImageCacheModel.fromLocalFile(
        imagePath,
        fileData,
        contentType,
        ttl
      )

      this.cache.set(imagePath, cacheEntry)
    } catch (error) {
      console.error(`Failed to store local file in cache: ${imagePath}`, error)
    }
  }

  /**
   * Check if image exists in cache
   */
  hasImage(imagePath: string): boolean {
    return this.cache.has(imagePath)
  }

  /**
   * Remove image from cache
   */
  removeImage(imagePath: string): boolean {
    return this.cache.delete(imagePath)
  }

  /**
   * Clear all cache entries
   */
  clearCache(): void {
    this.cache.clear()
    this.resetMetrics()
  }

  /**
   * Evict expired entries
   */
  evictExpired(): number {
    return this.cache.evictExpired()
  }

  /**
   * Evict entries using LRU policy
   */
  evictLRU(count: number = 1): number {
    return this.cache.evictLRU(count)
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cache.getStats()
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    return { ...this.performanceMetrics }
  }

  /**
   * Get cache configuration
   */
  getCacheConfig() {
    return this.cache.getConfig()
  }

  /**
   * Update cache configuration
   */
  updateCacheConfig(config: {
    maxSize?: number
    maxEntries?: number
    defaultTTL?: number
  }): void {
    this.cache.updateConfig(config)
  }

  /**
   * Get cache health status
   */
  getHealthStatus(): {
    status: 'healthy' | 'degraded' | 'unhealthy'
    hitRate: number
    utilization: number
    expiredEntries: number
  } {
    const stats = this.cache.getStats()
    const metrics = this.getPerformanceMetrics()

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'

    if (metrics.hitRate < 0.8) {
      status = 'degraded'
    }
    if (stats.cacheUtilization > 0.9) {
      status = 'degraded'
    }
    if (stats.expiredEntries > stats.totalEntries * 0.5) {
      status = 'unhealthy'
    }

    return {
      status,
      hitRate: metrics.hitRate,
      utilization: stats.cacheUtilization,
      expiredEntries: stats.expiredEntries,
    }
  }

  /**
   * Warm up cache with frequently accessed images
   */
  async warmUpCache(
    imagePaths: string[],
    getImageFn: (path: string) => Promise<R2Response>
  ): Promise<void> {
    const warmUpPromises = imagePaths.map(async imagePath => {
      try {
        if (!this.hasImage(imagePath)) {
          const response = await getImageFn(imagePath)
          await this.storeImage(imagePath, response)
        }
      } catch (error) {
        console.warn(`Failed to warm up cache for ${imagePath}:`, error)
      }
    })

    await Promise.allSettled(warmUpPromises)
  }

  /**
   * Preload critical images
   */
  async preloadCriticalImages(
    criticalPaths: string[],
    getImageFn: (path: string) => Promise<R2Response>
  ): Promise<void> {
    const preloadPromises = criticalPaths.map(async imagePath => {
      try {
        const response = await getImageFn(imagePath)
        await this.storeImage(imagePath, response, 7 * 24 * 60 * 60 * 1000) // 7 days for critical images
      } catch (error) {
        console.warn(`Failed to preload critical image ${imagePath}:`, error)
      }
    })

    await Promise.allSettled(preloadPromises)
  }

  /**
   * Get cache entry metadata
   */
  getCacheEntryMetadata(imagePath: string) {
    const cacheEntry = this.cache.get(imagePath)
    return cacheEntry ? cacheEntry.getMetadata() : null
  }

  /**
   * Update performance metrics
   */
  private updateMetrics(): void {
    const { totalRequests, cacheHits, cacheMisses } = this.performanceMetrics

    if (totalRequests > 0) {
      this.performanceMetrics.hitRate = cacheHits / totalRequests
      this.performanceMetrics.missRate = cacheMisses / totalRequests
    }
  }

  /**
   * Update average response time
   */
  private updateAverageResponseTime(responseTime: number): void {
    const { averageResponseTime, totalRequests } = this.performanceMetrics

    if (totalRequests === 1) {
      this.performanceMetrics.averageResponseTime = responseTime
    } else {
      // Calculate running average
      this.performanceMetrics.averageResponseTime =
        (averageResponseTime * (totalRequests - 1) + responseTime) /
        totalRequests
    }
  }

  /**
   * Reset performance metrics
   */
  private resetMetrics(): void {
    this.performanceMetrics = {
      hitRate: 0,
      missRate: 0,
      averageResponseTime: 0,
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
    }
  }

  /**
   * Create cache service with custom configuration
   */
  static create(config: {
    maxSize?: number
    maxEntries?: number
    defaultTTL?: number
  }): ImageCacheService {
    const cache = new ImageCacheManager()
    cache.updateConfig(config)
    return new ImageCacheService(cache)
  }

  /**
   * Create cache service for testing
   */
  static forTesting(): ImageCacheService {
    const cache = new ImageCacheManager()
    cache.updateConfig({
      maxSize: 10 * 1024 * 1024, // 10MB for testing
      maxEntries: 100,
      defaultTTL: 60 * 1000, // 1 minute for testing
    })
    return new ImageCacheService(cache)
  }
}
