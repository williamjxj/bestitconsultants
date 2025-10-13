/**
 * ImageCache model implementation
 * In-memory cache for frequently accessed images to improve performance
 */

import { ImageCache } from './r2'

export class ImageCacheModel implements ImageCache {
  key: string
  data: Buffer
  contentType: string
  lastModified: Date
  expiresAt: Date
  hitCount: number
  size: number

  constructor(data: Partial<ImageCache> = {}) {
    this.key = data.key || ''
    this.data = data.data || Buffer.alloc(0)
    this.contentType = data.contentType || 'image/jpeg'
    this.lastModified = data.lastModified || new Date()
    this.expiresAt =
      data.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    this.hitCount = data.hitCount || 0
    this.size = data.size || this.data.length
  }

  /**
   * Validate the cache entry
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validate cache key format
    if (!this.key.match(/^R2 bucket [a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/)) {
      errors.push(
        'Cache key must match pattern: ^R2 bucket [a-zA-Z0-9._-]+\\.(jpg|jpeg|png|webp)$'
      )
    }

    // Validate content type
    if (!this.contentType.match(/^image\/(jpeg|png|webp)$/)) {
      errors.push('Content type must be image/jpeg, image/png, or image/webp')
    }

    // Validate expiration time
    if (this.expiresAt.getTime() <= Date.now()) {
      errors.push('Cache entry has expired')
    }

    // Validate hit count
    if (this.hitCount < 0) {
      errors.push('Hit count must be non-negative')
    }

    // Validate size matches buffer length
    if (this.size !== this.data.length) {
      errors.push('Size must match buffer length')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Check if the cache entry is expired
   */
  isExpired(): boolean {
    return this.expiresAt.getTime() <= Date.now()
  }

  /**
   * Check if the cache entry is valid
   */
  isValid(): boolean {
    return this.validate().isValid && !this.isExpired()
  }

  /**
   * Increment the hit count
   */
  incrementHitCount(): void {
    this.hitCount++
  }

  /**
   * Update the last modified timestamp
   */
  updateLastModified(): void {
    this.lastModified = new Date()
  }

  /**
   * Extend the expiration time
   */
  extendExpiration(ttl: number = 24 * 60 * 60 * 1000): void {
    this.expiresAt = new Date(Date.now() + ttl)
  }

  /**
   * Get the time until expiration in milliseconds
   */
  getTimeUntilExpiration(): number {
    return this.expiresAt.getTime() - Date.now()
  }

  /**
   * Get the cache hit rate for this entry
   */
  getHitRate(totalRequests: number): number {
    if (totalRequests === 0) return 0
    return this.hitCount / totalRequests
  }

  /**
   * Get cache entry metadata
   */
  getMetadata() {
    return {
      key: this.key,
      contentType: this.contentType,
      size: this.size,
      hitCount: this.hitCount,
      lastModified: this.lastModified,
      expiresAt: this.expiresAt,
      isExpired: this.isExpired(),
      timeUntilExpiration: this.getTimeUntilExpiration(),
    }
  }

  /**
   * Create a cache entry from image data
   */
  static fromImageData(
    key: string,
    data: Buffer,
    contentType: string,
    ttl: number = 24 * 60 * 60 * 1000
  ): ImageCacheModel {
    return new ImageCacheModel({
      key,
      data,
      contentType,
      lastModified: new Date(),
      expiresAt: new Date(Date.now() + ttl),
      hitCount: 0,
      size: data.length,
    })
  }

  /**
   * Create a cache entry from R2 response
   */
  static fromR2Response(
    key: string,
    r2Response: { body: Buffer; contentType: string; lastModified: Date },
    ttl: number = 24 * 60 * 60 * 1000
  ): ImageCacheModel {
    return new ImageCacheModel({
      key,
      data: r2Response.body,
      contentType: r2Response.contentType,
      lastModified: r2Response.lastModified,
      expiresAt: new Date(Date.now() + ttl),
      hitCount: 0,
      size: r2Response.body.length,
    })
  }

  /**
   * Create a cache entry from local file
   */
  static fromLocalFile(
    key: string,
    fileData: Buffer,
    contentType: string,
    ttl: number = 24 * 60 * 60 * 1000
  ): ImageCacheModel {
    return new ImageCacheModel({
      key,
      data: fileData,
      contentType,
      lastModified: new Date(),
      expiresAt: new Date(Date.now() + ttl),
      hitCount: 0,
      size: fileData.length,
    })
  }
}

/**
 * Cache manager for handling multiple cache entries
 */
export class ImageCacheManager {
  private cache: Map<string, ImageCacheModel> = new Map()
  private maxSize: number = 100 * 1024 * 1024 // 100MB
  private maxEntries: number = 1000
  private defaultTTL: number = 24 * 60 * 60 * 1000 // 24 hours

  /**
   * Get a cache entry by key
   */
  get(key: string): ImageCacheModel | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (entry.isExpired()) {
      this.cache.delete(key)
      return null
    }

    entry.incrementHitCount()
    return entry
  }

  /**
   * Set a cache entry
   */
  set(key: string, entry: ImageCacheModel): void {
    // Check if we need to evict entries
    this.evictIfNeeded(entry.size)

    this.cache.set(key, entry)
  }

  /**
   * Check if a cache entry exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key)
    return entry ? entry.isValid() : false
  }

  /**
   * Delete a cache entry
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const entries = Array.from(this.cache.values())
    const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0)
    const totalHits = entries.reduce((sum, entry) => sum + entry.hitCount, 0)
    const expiredEntries = entries.filter(entry => entry.isExpired()).length

    return {
      totalEntries: this.cache.size,
      totalSize,
      totalHits,
      expiredEntries,
      averageHitCount: this.cache.size > 0 ? totalHits / this.cache.size : 0,
      cacheUtilization: totalSize / this.maxSize,
    }
  }

  /**
   * Evict expired entries
   */
  evictExpired(): number {
    let evictedCount = 0
    for (const [key, entry] of this.cache.entries()) {
      if (entry.isExpired()) {
        this.cache.delete(key)
        evictedCount++
      }
    }
    return evictedCount
  }

  /**
   * Evict entries using LRU policy
   */
  evictLRU(count: number = 1): number {
    const entries = Array.from(this.cache.entries()).sort(
      ([, a], [, b]) => a.lastModified.getTime() - b.lastModified.getTime()
    )

    let evictedCount = 0
    for (let i = 0; i < Math.min(count, entries.length); i++) {
      this.cache.delete(entries[i][0])
      evictedCount++
    }
    return evictedCount
  }

  /**
   * Evict entries if cache is full
   */
  private evictIfNeeded(newEntrySize: number): void {
    const currentSize = Array.from(this.cache.values()).reduce(
      (sum, entry) => sum + entry.size,
      0
    )

    // Check if we exceed max entries
    if (this.cache.size >= this.maxEntries) {
      this.evictLRU(1)
    }

    // Check if we exceed max size
    if (currentSize + newEntrySize > this.maxSize) {
      const targetSize = this.maxSize - newEntrySize
      let currentSize = Array.from(this.cache.values()).reduce(
        (sum, entry) => sum + entry.size,
        0
      )

      while (currentSize > targetSize && this.cache.size > 0) {
        this.evictLRU(1)
        currentSize = Array.from(this.cache.values()).reduce(
          (sum, entry) => sum + entry.size,
          0
        )
      }
    }
  }

  /**
   * Get cache configuration
   */
  getConfig() {
    return {
      maxSize: this.maxSize,
      maxEntries: this.maxEntries,
      defaultTTL: this.defaultTTL,
    }
  }

  /**
   * Update cache configuration
   */
  updateConfig(config: {
    maxSize?: number
    maxEntries?: number
    defaultTTL?: number
  }): void {
    if (config.maxSize !== undefined) this.maxSize = config.maxSize
    if (config.maxEntries !== undefined) this.maxEntries = config.maxEntries
    if (config.defaultTTL !== undefined) this.defaultTTL = config.defaultTTL
  }
}
