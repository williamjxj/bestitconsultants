/**
 * AI News service for managing AI news articles
 * Handles CRUD operations, filtering, and real-time updates
 */

import { supabase } from '@/lib/supabase'
import type { AINewsArticle, NewsCategory } from '@/types/ai-news'

export interface ArticlesResult {
  articles: AINewsArticle[]
  total: number
  hasMore: boolean
}

export interface TrendingResult {
  trending: AINewsArticle[]
  total: number
}

export class AINewsService {
  private static instance: AINewsService

  private constructor() {}

  public static getInstance(): AINewsService {
    if (!AINewsService.instance) {
      AINewsService.instance = new AINewsService()
    }
    return AINewsService.instance
  }

  /**
   * Get all published AI news articles
   */
  public async getArticles(
    limit: number = 8,
    offset: number = 0,
    category?: NewsCategory
  ): Promise<ArticlesResult> {
    try {
      let query = supabase
        .from('ai_news_articles')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('date', { ascending: false })
        .range(offset, offset + limit - 1)

      if (category) {
        query = query.eq('category', category)
      }

      const { data, error, count } = await query

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return {
        articles: data || [],
        total: count || 0,
        hasMore: (offset + limit) < (count || 0)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      return {
        articles: [],
        total: 0,
        hasMore: false
      }
    }
  }

  /**
   * Get trending AI news articles
   */
  public async getTrendingArticles(limit: number = 3): Promise<TrendingResult> {
    try {
      const { data, error, count } = await supabase
        .from('ai_news_articles')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .eq('trending', true)
        .order('date', { ascending: false })
        .limit(limit)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return {
        trending: data || [],
        total: count || 0
      }
    } catch (error) {
      console.error('Error fetching trending articles:', error)
      return {
        trending: [],
        total: 0
      }
    }
  }

  /**
   * Get a specific article by ID
   */
  public async getArticleById(id: string): Promise<AINewsArticle | null> {
    try {
      const { data, error } = await supabase
        .from('ai_news_articles')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Article not found
        }
        throw new Error(`Database error: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error)
      return null
    }
  }

  /**
   * Get articles by category
   */
  public async getArticlesByCategory(
    category: NewsCategory,
    limit: number = 8,
    offset: number = 0
  ): Promise<ArticlesResult> {
    return this.getArticles(limit, offset, category)
  }

  /**
   * Search articles by title or content
   */
  public async searchArticles(
    query: string,
    limit: number = 8,
    offset: number = 0
  ): Promise<ArticlesResult> {
    try {
      const { data, error, count } = await supabase
        .from('ai_news_articles')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .order('date', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return {
        articles: data || [],
        total: count || 0,
        hasMore: (offset + limit) < (count || 0)
      }
    } catch (error) {
      console.error('Error searching articles:', error)
      return {
        articles: [],
        total: 0,
        hasMore: false
      }
    }
  }

  /**
   * Get recent articles (last 24 hours)
   */
  public async getRecentArticles(limit: number = 5): Promise<AINewsArticle[]> {
    try {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      const { data, error } = await supabase
        .from('ai_news_articles')
        .select('*')
        .eq('is_published', true)
        .gte('date', yesterday.toISOString())
        .order('date', { ascending: false })
        .limit(limit)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching recent articles:', error)
      return []
    }
  }

  /**
   * Update article trending status
   */
  public async updateTrendingStatus(
    id: string,
    trending: boolean
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_news_articles')
        .update({ trending })
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error updating trending status for ${id}:`, error)
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
        byCategory
      }
    } catch (error) {
      console.error('Error getting article stats:', error)
      return {
        total: 0,
        published: 0,
        trending: 0,
        byCategory: {}
      }
    }
  }

  /**
   * Delete an article
   */
  public async deleteArticle(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_news_articles')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error deleting article ${id}:`, error)
      return false
    }
  }

  /**
   * Update an article
   */
  public async updateArticle(
    id: string,
    updates: Partial<AINewsArticle>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_news_articles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error(`Error updating article ${id}:`, error)
      return false
    }
  }

  /**
   * Create a new article
   */
  public async createArticle(article: Omit<AINewsArticle, 'id' | 'created_at' | 'updated_at'>): Promise<AINewsArticle | null> {
    try {
      const { data, error } = await supabase
        .from('ai_news_articles')
        .insert({
          ...article,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error creating article:', error)
      return null
    }
  }

  /**
   * Get articles by date range
   */
  public async getArticlesByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 8
  ): Promise<AINewsArticle[]> {
    try {
      const { data, error } = await supabase
        .from('ai_news_articles')
        .select('*')
        .eq('is_published', true)
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())
        .order('date', { ascending: false })
        .limit(limit)

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error fetching articles by date range:', error)
      return []
    }
  }
}

// Export singleton instance
export const aiNewsService = AINewsService.getInstance()
