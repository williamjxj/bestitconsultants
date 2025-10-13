/**
 * Web scraping service for content management
 * Static implementation without database dependency
 */

export interface ScrapingResult {
  success: boolean
  message: string
  articlesCount: number
  errors?: string[]
}

export interface ContentRefreshResult {
  success: boolean
  message: string
  status: 'processing' | 'completed' | 'failed'
  articlesUpdated: number
}

export class WebScrapingService {
  private static instance: WebScrapingService
  private isRefreshing: boolean = false
  private lastRefreshTime: Date | null = null

  private constructor() {}

  public static getInstance(): WebScrapingService {
    if (!WebScrapingService.instance) {
      WebScrapingService.instance = new WebScrapingService()
    }
    return WebScrapingService.instance
  }

  /**
   * Get articles from static data (replaces database functionality)
   */
  public async getArticlesFromDatabase(
    limit: number = 8
  ): Promise<ScrapingResult> {
    try {
      console.log('Fetching articles from static data...')

      // Simulate static content
      const articlesCount = Math.min(limit, 5) // Simulate 5 available articles

      console.log(`Found ${articlesCount} articles in static data`)

      return {
        success: true,
        message: `Successfully retrieved ${articlesCount} articles from static data`,
        articlesCount,
      }
    } catch (error) {
      console.error('Static data fetch failed:', error)
      return {
        success: false,
        message: 'Failed to fetch articles from static data',
        articlesCount: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      }
    }
  }

  /**
   * Update article trending status (not supported in static mode)
   */
  public async updateTrendingStatus(
    _articleId: string,
    _trending: boolean
  ): Promise<boolean> {
    console.warn('Updating trending status not supported in static mode')
    return false
  }

  /**
   * Get article statistics
   */
  public async getArticleStats(): Promise<{
    total: number
    published: number
    trending: number
    byCategory: Record<string, number>
  }> {
    // Return static statistics
    return {
      total: 5,
      published: 5,
      trending: 2,
      byCategory: {
        'AI Models': 2,
        'Enterprise AI': 1,
        Research: 1,
        'AI Safety': 1,
      },
    }
  }

  /**
   * Refresh content (static implementation)
   */
  public async refreshContent(): Promise<ContentRefreshResult> {
    if (this.isRefreshing) {
      return {
        success: false,
        message: 'Content refresh is already in progress',
        status: 'processing',
        articlesUpdated: 0,
      }
    }

    try {
      this.isRefreshing = true
      console.log('Starting content refresh from static data...')

      const result = await this.getArticlesFromDatabase()

      this.lastRefreshTime = new Date()

      return {
        success: result.success,
        message: result.message,
        status: result.success ? 'completed' : 'failed',
        articlesUpdated: result.articlesCount,
      }
    } catch (error) {
      console.error('Content refresh failed:', error)
      return {
        success: false,
        message: 'Content refresh failed',
        status: 'failed',
        articlesUpdated: 0,
      }
    } finally {
      this.isRefreshing = false
    }
  }

  /**
   * Get refresh status
   */
  public getRefreshStatus(): {
    isRefreshing: boolean
    lastRefreshTime: Date | null
    canRefresh: boolean
  } {
    return {
      isRefreshing: this.isRefreshing,
      lastRefreshTime: this.lastRefreshTime,
      canRefresh: !this.isRefreshing,
    }
  }

  /**
   * Test static data connectivity
   */
  public async testDatabase(): Promise<boolean> {
    try {
      // Simulate successful connectivity test
      console.log('Static data connectivity test passed')
      return true
    } catch (error) {
      console.error('Static data test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const webScrapingService = WebScrapingService.getInstance()
