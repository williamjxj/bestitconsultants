/**
 * Firecrawl MCP integration for web scraping
 * Handles AI news content extraction and processing
 */

import type { AINewsArticle } from '@/types/ai-news'

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY
const FIRECRAWL_BASE_URL = process.env.FIRECRAWL_BASE_URL || 'https://api.firecrawl.dev'

interface ScrapeOptions {
  url: string
  params?: {
    pageOptions?: {
      onlyMainContent?: boolean
    }
    extractorOptions?: {
      mode?: 'llm-extraction' | 'raw'
      llmSchema?: Record<string, any>
    }
  }
}

interface ScrapeResult {
  jobId: string
  url: string
  data: any
}

export class FirecrawlService {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string = FIRECRAWL_API_KEY || '', baseUrl: string = FIRECRAWL_BASE_URL) {
    if (!apiKey) {
      throw new Error('Firecrawl API key is required')
    }
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  /**
   * Make authenticated request to Firecrawl API
   */
  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Firecrawl API error: ${response.status} - ${errorData.message || response.statusText}`)
    }

    return response.json()
  }

  /**
   * Scrape a single URL
   */
  public async scrape(options: ScrapeOptions): Promise<ScrapeResult> {
    return this.request<ScrapeResult>('/v0/scrape', {
      method: 'POST',
      body: JSON.stringify(options),
    })
  }

  /**
   * Scrape multiple URLs in batch
   */
  public async batchScrape(urls: string[], params?: ScrapeOptions['params']): Promise<ScrapeResult[]> {
    return this.request<ScrapeResult[]>('/v0/scrape', {
      method: 'POST',
      body: JSON.stringify({
        urls,
        params,
      }),
    })
  }

  /**
   * Crawl a website to find links and scrape them
   */
  public async crawl(
    url: string,
    options?: {
      depth?: number
      maxPagesToCrawl?: number
      params?: ScrapeOptions['params']
    }
  ): Promise<ScrapeResult[]> {
    return this.request<ScrapeResult[]>('/v0/crawl', {
      method: 'POST',
      body: JSON.stringify({
        url,
        ...options,
      }),
    })
  }

  /**
   * Extract AI news articles from a URL using LLM extraction
   */
  public async extractAINewsArticle(url: string): Promise<AINewsArticle[]> {
    const llmSchema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string" },
          date: { type: "string", format: "date-time" },
          category: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          trending: { type: "boolean" },
          read_time: { type: "string" },
          image_url: { type: "string", format: "uri" },
          source_url: { type: "string", format: "uri" },
        },
        required: ["title", "excerpt", "content", "date", "source_url"],
      },
    }

    try {
      const result = await this.scrape({
        url,
        params: {
          pageOptions: {
            onlyMainContent: true
          },
          extractorOptions: {
            mode: 'llm-extraction',
            llmSchema: llmSchema,
          },
        },
      })

      // Process the extracted data
      if (result && result.data && Array.isArray(result.data)) {
        return result.data.map((item: any) => ({
          id: item.id || crypto.randomUUID(),
          title: item.title || 'Untitled Article',
          excerpt: item.excerpt || 'No excerpt available',
          content: item.content || 'No content available',
          date: item.date || new Date().toISOString(),
          category: item.category || 'AI Models',
          tags: item.tags || [],
          trending: item.trending || false,
          read_time: item.read_time || '5 min read',
          image_url: item.image_url || null,
          source_url: item.source_url || url,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          scraped_at: new Date().toISOString(),
        }))
      }

      return []
    } catch (error) {
      console.error(`Error extracting AI news from ${url}:`, error)
      throw error
    }
  }

  /**
   * Extract articles with custom schema
   */
  public async extractWithSchema(
    url: string,
    schema: Record<string, any>
  ): Promise<any[]> {
    try {
      const result = await this.scrape({
        url,
        params: {
          pageOptions: {
            onlyMainContent: true
          },
          extractorOptions: {
            mode: 'llm-extraction',
            llmSchema: schema,
          },
        },
      })

      return result.data || []
    } catch (error) {
      console.error(`Error extracting with custom schema from ${url}:`, error)
      throw error
    }
  }

  /**
   * Get raw content from a URL
   */
  public async getRawContent(url: string): Promise<string> {
    try {
      const result = await this.scrape({
        url,
        params: {
          pageOptions: {
            onlyMainContent: true
          },
          extractorOptions: {
            mode: 'raw'
          }
        }
      })

      return result.data?.content || ''
    } catch (error) {
      console.error(`Error getting raw content from ${url}:`, error)
      throw error
    }
  }

  /**
   * Test connection to Firecrawl API
   */
  public async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/v0/health`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      })
      return response.ok
    } catch (error) {
      console.error('Firecrawl connection test failed:', error)
      return false
    }
  }

  /**
   * Get API usage statistics
   */
  public async getUsageStats(): Promise<{
    requests: number
    credits: number
    limit: number
  }> {
    try {
      const response = await this.request<{
        requests: number
        credits: number
        limit: number
      }>('/v0/usage', {
        method: 'GET'
      })
      return response
    } catch (error) {
      console.error('Error getting usage stats:', error)
      return {
        requests: 0,
        credits: 0,
        limit: 0
      }
    }
  }
}

// Export singleton instance
export const firecrawlService = new FirecrawlService()
