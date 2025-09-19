/**
 * Cache management system for optimized content delivery
 * Handles caching strategies, cache invalidation, and performance optimization
 */

export interface CacheConfig {
  ttl: number // Time to live in milliseconds
  maxSize: number // Maximum cache size
  strategy: 'memory' | 'localStorage' | 'sessionStorage'
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
  hits: number
}

export class CacheManager {
  private static instance: CacheManager
  private cache: Map<string, CacheEntry<any>> = new Map()
  private config: CacheConfig

  private constructor() {
    this.config = {
      ttl: 5 * 60 * 1000, // 5 minutes
      maxSize: 100,
      strategy: 'memory'
    }
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  /**
   * Set cache configuration
   */
  public setConfig(config: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Get item from cache
   */
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    // Update hit count
    entry.hits++
    this.cache.set(key, entry)

    return entry.data
  }

  /**
   * Set item in cache
   */
  public set<T>(key: string, data: T, ttl?: number): void {
    // Check cache size limit
    if (this.cache.size >= this.config.maxSize) {
      this.evictLeastUsed()
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.ttl,
      hits: 0
    }

    this.cache.set(key, entry)
  }

  /**
   * Check if item exists in cache
   */
  public has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  /**
   * Delete item from cache
   */
  public delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  public clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  public getStats(): {
    size: number
    maxSize: number
    hitRate: number
    totalHits: number
    entries: Array<{ key: string; hits: number; age: number }>
  } {
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      hits: entry.hits,
      age: Date.now() - entry.timestamp
    }))

    const totalHits = entries.reduce((sum, entry) => sum + entry.hits, 0)
    const hitRate = totalHits / Math.max(entries.length, 1)

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hitRate,
      totalHits,
      entries
    }
  }

  /**
   * Evict least used items
   */
  private evictLeastUsed(): void {
    const entries = Array.from(this.cache.entries())
    entries.sort((a, b) => a[1].hits - b[1].hits)

    // Remove 10% of least used items
    const toRemove = Math.ceil(entries.length * 0.1)
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i][0])
    }
  }

  /**
   * Clean expired entries
   */
  public cleanExpired(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Cache with automatic refresh
   */
  public async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    const data = await fetcher()
    this.set(key, data, ttl)
    return data
  }

  /**
   * Cache with background refresh
   */
  public async getWithBackgroundRefresh<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = this.get<T>(key)
    if (cached !== null) {
      // Check if cache is near expiration (80% of TTL)
      const entry = this.cache.get(key)
      if (entry && (Date.now() - entry.timestamp) > (entry.ttl * 0.8)) {
        // Refresh in background
        fetcher().then(data => {
          this.set(key, data, ttl)
        }).catch(error => {
          console.warn('Background refresh failed:', error)
        })
      }
      return cached
    }

    const data = await fetcher()
    this.set(key, data, ttl)
    return data
  }

  /**
   * Invalidate cache by pattern
   */
  public invalidatePattern(pattern: RegExp): void {
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Preload data into cache
   */
  public async preload<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<void> {
    try {
      const data = await fetcher()
      this.set(key, data, ttl)
    } catch (error) {
      console.warn(`Preload failed for key ${key}:`, error)
    }
  }

  /**
   * Get cache size in bytes (approximate)
   */
  public getSizeInBytes(): number {
    let size = 0
    for (const [key, entry] of this.cache.entries()) {
      size += key.length * 2 // UTF-16 characters
      size += JSON.stringify(entry).length * 2
    }
    return size
  }

  /**
   * Export cache data
   */
  public export(): Record<string, any> {
    const data: Record<string, any> = {}
    for (const [key, entry] of this.cache.entries()) {
      data[key] = {
        data: entry.data,
        timestamp: entry.timestamp,
        ttl: entry.ttl,
        hits: entry.hits
      }
    }
    return data
  }

  /**
   * Import cache data
   */
  public import(data: Record<string, any>): void {
    for (const [key, entry] of Object.entries(data)) {
      this.cache.set(key, entry)
    }
  }
}

// Export singleton instance
export const cacheManager = CacheManager.getInstance()
