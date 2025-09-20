/**
 * Web scraping service for AI news content management
 * Handles content refresh and database operations
 */

import { supabase } from '@/lib/supabase'
import type { AINewsArticle } from '@/types/ai-news'

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
   * Get articles from database (replaces scraping functionality)
   */
  public async getArticlesFromDatabase(
    limit: number = 8
  ): Promise<ScrapingResult> {
    try {
      console.log('Fetching articles from database...')

      const { data: articles, error } = await supabase
        .from('ai_news_articles')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: false })
        .limit(limit)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      console.log(`Found ${articles?.length || 0} articles in database`)

      return {
        success: true,
        message: `Successfully retrieved ${articles?.length || 0} AI news articles from database`,
        articlesCount: articles?.length || 0,
      }
    } catch (error) {
      console.error('Database fetch failed:', error)
      return {
        success: false,
        message: 'Failed to fetch articles from database',
        articlesCount: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      }
    }
  }

  /**
   * Update article trending status
   */
  public async updateTrendingStatus(
    articleId: string,
    trending: boolean
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_news_articles')
        .update({ trending, updated_at: new Date().toISOString() })
        .eq('id', articleId)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      console.log(`Updated trending status for article ${articleId}`)
      return true
    } catch (error) {
      console.error('Error updating trending status:', error)
      return false
    }
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
    try {
      // Get total count
      const { count: total } = await supabase
        .from('ai_news_articles')
        .select('*', { count: 'exact', head: true })

      // Get published count
      const { count: published } = await supabase
        .from('ai_news_articles')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true)

      // Get trending count
      const { count: trending } = await supabase
        .from('ai_news_articles')
        .select('*', { count: 'exact', head: true })
        .eq('trending', true)

      // Get category breakdown
      const { data: categoryData } = await supabase
        .from('ai_news_articles')
        .select('category')
        .eq('is_published', true)

      const byCategory: Record<string, number> = {}
      categoryData?.forEach(item => {
        byCategory[item.category] = (byCategory[item.category] || 0) + 1
      })

      return {
        total: total || 0,
        published: published || 0,
        trending: trending || 0,
        byCategory,
      }
    } catch (error) {
      console.error('Error getting article stats:', error)
      return {
        total: 0,
        published: 0,
        trending: 0,
        byCategory: {},
      }
    }
  }

  /**
   * Refresh AI news content (database refresh)
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
      console.log('Starting content refresh from database...')

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
   * Test database connectivity
   */
  public async testDatabase(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('ai_news_articles')
        .select('count')
        .limit(1)

      if (error) {
        throw new Error(`Database test failed: ${error.message}`)
      }

      console.log('Database connectivity test passed')
      return true
    } catch (error) {
      console.error('Database test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const webScrapingService = WebScrapingService.getInstance()
