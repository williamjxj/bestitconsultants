/**
 * Web scraping service using Firecrawl MCP
 * Handles AI news content scraping, processing, and storage
 */

import { firecrawlService } from '@/lib/firecrawl'
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
  private isScraping: boolean = false
  private lastScrapeTime: Date | null = null

  // AI news sources to scrape
  private readonly aiNewsSources = [
    'https://techcrunch.com/category/artificial-intelligence/',
    'https://www.wired.com/tag/ai/',
    'https://openai.com/blog',
    'https://deepmind.google/blog/',
    'https://www.anthropic.com/news',
    'https://www.nvidia.com/en-us/on-demand/ai-podcast/',
    'https://www.technologyreview.com/topic/artificial-intelligence/',
    'https://venturebeat.com/ai/'
  ]

  private constructor() {}

  public static getInstance(): WebScrapingService {
    if (!WebScrapingService.instance) {
      WebScrapingService.instance = new WebScrapingService()
    }
    return WebScrapingService.instance
  }

  /**
   * Scrape AI news articles from configured sources
   */
  public async scrapeAINews(
    sources: string[] = this.aiNewsSources,
    maxArticles: number = 8
  ): Promise<ScrapingResult> {
    if (this.isScraping) {
      return {
        success: false,
        message: 'Scraping is already in progress',
        articlesCount: 0,
        errors: ['Scraping already in progress']
      }
    }

    try {
      this.isScraping = true
      console.log('Starting AI news scraping...')

      const allArticles: AINewsArticle[] = []
      const errors: string[] = []

      // Scrape from each source
      for (const sourceUrl of sources) {
        try {
          console.log(`Scraping from: ${sourceUrl}`)

          const articles = await this.scrapeFromSource(sourceUrl)
          allArticles.push(...articles)

          console.log(`Found ${articles.length} articles from ${sourceUrl}`)
        } catch (error) {
          const errorMessage = `Failed to scrape ${sourceUrl}: ${error instanceof Error ? error.message : 'Unknown error'}`
          console.error(errorMessage)
          errors.push(errorMessage)
        }
      }

      // Process and deduplicate articles
      const processedArticles = this.processArticles(allArticles)
      const uniqueArticles = this.deduplicateArticles(processedArticles)
      const limitedArticles = uniqueArticles.slice(0, maxArticles)

      // Store articles in database
      if (limitedArticles.length > 0) {
        await this.storeArticles(limitedArticles)
      }

      this.lastScrapeTime = new Date()

      console.log(`Scraping completed: ${limitedArticles.length} articles processed`)

      return {
        success: true,
        message: `Successfully scraped ${limitedArticles.length} AI news articles`,
        articlesCount: limitedArticles.length,
        errors: errors.length > 0 ? errors : undefined
      }
    } catch (error) {
      console.error('Scraping failed:', error)
      return {
        success: false,
        message: 'Scraping failed',
        articlesCount: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
    } finally {
      this.isScraping = false
    }
  }

  /**
   * Scrape articles from a single source
   */
  private async scrapeFromSource(sourceUrl: string): Promise<AINewsArticle[]> {
    try {
      const articles = await firecrawlService.extractAINewsArticle(sourceUrl)
      return articles
    } catch (error) {
      console.error(`Error scraping ${sourceUrl}:`, error)
      throw error
    }
  }

  /**
   * Process and clean scraped articles
   */
  private processArticles(articles: AINewsArticle[]): AINewsArticle[] {
    return articles.map(article => ({
      ...article,
      // Ensure required fields
      id: article.id || crypto.randomUUID(),
      title: this.cleanText(article.title),
      excerpt: this.cleanText(article.excerpt),
      content: this.cleanText(article.content),
      category: this.categorizeArticle(article),
      tags: this.extractTags(article),
      trending: this.determineTrending(article),
      read_time: this.calculateReadTime(article.content),
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      scraped_at: new Date().toISOString()
    }))
  }

  /**
   * Deduplicate articles based on title and source URL
   */
  private deduplicateArticles(articles: AINewsArticle[]): AINewsArticle[] {
    const seen = new Set<string>()
    return articles.filter(article => {
      const key = `${article.title.toLowerCase()}-${article.source_url}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  /**
   * Store articles in Supabase database
   */
  private async storeArticles(articles: AINewsArticle[]): Promise<void> {
    try {
      const { error } = await supabase
        .from('ai_news_articles')
        .upsert(articles, {
          onConflict: 'source_url,title',
          ignoreDuplicates: false
        })

      if (error) {
        throw new Error(`Database error: ${error.message}`)
      }

      console.log(`Stored ${articles.length} articles in database`)
    } catch (error) {
      console.error('Error storing articles:', error)
      throw error
    }
  }

  /**
   * Refresh AI news content
   */
  public async refreshContent(): Promise<ContentRefreshResult> {
    try {
      console.log('Starting content refresh...')

      const result = await this.scrapeAINews()

      return {
        success: result.success,
        message: result.message,
        status: result.success ? 'completed' : 'failed',
        articlesUpdated: result.articlesCount
      }
    } catch (error) {
      console.error('Content refresh failed:', error)
      return {
        success: false,
        message: 'Content refresh failed',
        status: 'failed',
        articlesUpdated: 0
      }
    }
  }

  /**
   * Get scraping status
   */
  public getScrapingStatus(): {
    isScraping: boolean
    lastScrapeTime: Date | null
    canScrape: boolean
  } {
    return {
      isScraping: this.isScraping,
      lastScrapeTime: this.lastScrapeTime,
      canScrape: !this.isScraping
    }
  }

  /**
   * Clean and normalize text content
   */
  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?;:()-]/g, '')
      .trim()
  }

  /**
   * Categorize article based on content
   */
  private categorizeArticle(article: AINewsArticle): string {
    const title = article.title.toLowerCase()
    const content = article.content.toLowerCase()
    const text = `${title} ${content}`

    if (text.includes('model') || text.includes('gpt') || text.includes('llm')) {
      return 'AI Models'
    }
    if (text.includes('biotech') || text.includes('medical') || text.includes('health')) {
      return 'Biotech AI'
    }
    if (text.includes('safety') || text.includes('ethics') || text.includes('alignment')) {
      return 'AI Safety'
    }
    if (text.includes('enterprise') || text.includes('business') || text.includes('corporate')) {
      return 'Enterprise AI'
    }
    if (text.includes('research') || text.includes('study') || text.includes('paper')) {
      return 'Research'
    }
    if (text.includes('autonomous') || text.includes('vehicle') || text.includes('driving')) {
      return 'Autonomous Vehicles'
    }

    return 'AI Models' // Default category
  }

  /**
   * Extract tags from article content
   */
  private extractTags(article: AINewsArticle): string[] {
    const text = `${article.title} ${article.content}`.toLowerCase()
    const commonTags = [
      'AI', 'Machine Learning', 'Deep Learning', 'Neural Networks',
      'GPT', 'LLM', 'OpenAI', 'Google', 'Microsoft', 'Meta',
      'Research', 'Innovation', 'Technology', 'Future'
    ]

    return commonTags.filter(tag =>
      text.includes(tag.toLowerCase())
    ).slice(0, 5) // Limit to 5 tags
  }

  /**
   * Determine if article is trending
   */
  private determineTrending(article: AINewsArticle): boolean {
    const title = article.title.toLowerCase()
    const content = article.content.toLowerCase()
    const text = `${title} ${content}`

    const trendingKeywords = [
      'breakthrough', 'revolutionary', 'groundbreaking', 'cutting-edge',
      'latest', 'new', 'advanced', 'state-of-the-art', 'unprecedented'
    ]

    return trendingKeywords.some(keyword => text.includes(keyword))
  }

  /**
   * Calculate estimated read time
   */
  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  /**
   * Schedule automatic content refresh
   */
  public scheduleAutoRefresh(intervalHours: number = 6): void {
    const intervalMs = intervalHours * 60 * 60 * 1000

    setInterval(async () => {
      try {
        console.log('Running scheduled content refresh...')
        await this.refreshContent()
        console.log('Scheduled refresh completed')
      } catch (error) {
        console.error('Scheduled refresh failed:', error)
      }
    }, intervalMs)

    console.log(`Auto-refresh scheduled every ${intervalHours} hours`)
  }

  /**
   * Test scraping functionality
   */
  public async testScraping(): Promise<boolean> {
    try {
      const testSource = 'https://techcrunch.com/category/artificial-intelligence/'
      const articles = await this.scrapeFromSource(testSource)
      return articles.length > 0
    } catch (error) {
      console.error('Scraping test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const webScrapingService = WebScrapingService.getInstance()
