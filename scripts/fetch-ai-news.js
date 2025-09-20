#!/usr/bin/env node

/**
 * Daily AI News Fetching Script
 * This script runs as a cronjob to fetch AI news articles and store them in Supabase
 * Usage: node scripts/fetch-ai-news.js
 */

// Load environment variables from .env file
require('dotenv').config()

const { spawn } = require('child_process')
const crypto = require('crypto')
const http = require('http')
const https = require('https')
const { setTimeout, clearTimeout } = require('timers')

const { createClient } = require('@supabase/supabase-js')

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!SUPABASE_URL)
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!SUPABASE_SERVICE_KEY)
  console.error('')
  console.error('💡 To fix this:')
  console.error('   1. Copy env.example to .env: cp env.example .env')
  console.error('   2. Edit .env with your actual Supabase values')
  console.error(
    '   3. Get your values from: https://supabase.com/dashboard/project/[your-project]/settings/api'
  )
  process.exit(1)
}

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// AI news sources to scrape (prioritized for better results)
const AI_NEWS_SOURCES = [
  'https://openai.com/blog',
  'https://www.anthropic.com/news',
  'https://techcrunch.com/category/artificial-intelligence/',
  'https://www.wired.com/tag/ai/',
  'https://deepmind.google/blog/',
  'https://venturebeat.com/ai/',
  'https://www.technologyreview.com/topic/artificial-intelligence/',
  'https://www.nvidia.com/en-us/on-demand/ai-podcast/',
]

// Configuration
const MAX_ARTICLES = 10
const MAX_ARTICLES_PER_SOURCE = 3

/**
 * Fetch content from URL using direct HTTP request
 */
async function fetchUrlContent(url, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const isHttps = urlObj.protocol === 'https:'
    const client = isHttps ? https : http

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        Connection: 'keep-alive',
      },
      timeout: timeoutMs,
    }

    const timeoutId = setTimeout(() => {
      req.destroy()
      reject(new Error(`Request timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    const req = client.request(options, res => {
      clearTimeout(timeoutId)

      let data = ''
      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        resolve({
          content: data,
          statusCode: res.statusCode,
          headers: res.headers,
        })
      })
    })

    req.on('error', error => {
      clearTimeout(timeoutId)
      reject(new Error(`Request failed: ${error.message}`))
    })

    req.on('timeout', () => {
      clearTimeout(timeoutId)
      req.destroy()
      reject(new Error(`Request timed out after ${timeoutMs}ms`))
    })

    req.end()
  })
}

/**
 * Execute Firecrawl MCP command with timeout (fallback method)
 */
async function executeFirecrawlCommand(command, args = [], timeoutMs = 15000) {
  // For now, skip Firecrawl and use direct HTTP requests
  console.log('⚠️  Using fallback HTTP method instead of Firecrawl')
  return null
}

/**
 * Check if article already exists in database
 */
async function checkArticleExists(title, sourceUrl) {
  try {
    const { data, error } = await supabase
      .from('ai_news_articles')
      .select('id')
      .eq('title', title)
      .eq('source_url', sourceUrl)
      .limit(1)

    if (error) {
      console.warn(
        'Warning: Could not check for existing articles:',
        error.message
      )
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.warn(
      'Warning: Could not check for existing articles:',
      error.message
    )
    return false
  }
}

/**
 * Scrape AI news from a single source using Firecrawl
 */
async function scrapeSource(sourceUrl, maxArticles = MAX_ARTICLES_PER_SOURCE) {
  try {
    console.log(`🔍 Scraping: ${sourceUrl}`)

    // Use direct HTTP request instead of Firecrawl
    const result = await fetchUrlContent(sourceUrl, 10000)

    if (!result || !result.content) {
      console.log(`⚠️  No content found for ${sourceUrl}`)
      return []
    }

    // Parse the scraped content to extract articles
    const articles = parseArticlesFromContent(result.content, sourceUrl)

    // Limit articles per source and check for duplicates
    const uniqueArticles = []
    for (const article of articles.slice(0, maxArticles)) {
      const exists = await checkArticleExists(article.title, sourceUrl)
      if (!exists) {
        uniqueArticles.push(article)
      } else {
        console.log(`⏭️  Skipping duplicate: ${article.title}`)
      }
    }

    console.log(
      `✅ Found ${uniqueArticles.length} new articles from ${sourceUrl}`
    )
    return uniqueArticles
  } catch (error) {
    console.error(`❌ Error scraping ${sourceUrl}:`, error.message)
    return []
  }
}

/**
 * Parse articles from scraped content
 */
function parseArticlesFromContent(content, sourceUrl) {
  const articles = []
  const lines = content.split('\n')

  let currentArticle = null
  let inArticle = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Look for article headers (usually start with # or are in all caps)
    if (
      line.match(/^#{1,3}\s+.+/) ||
      (line.length > 20 && line.length < 200 && line.match(/^[A-Z][^.!?]*$/))
    ) {
      if (currentArticle) {
        articles.push(currentArticle)
      }

      const title = line.replace(/^#{1,3}\s+/, '')
      const titleHash = crypto
        .createHash('md5')
        .update(title + sourceUrl)
        .digest('hex')
        .substring(0, 8)

      currentArticle = {
        id: crypto.randomUUID(),
        title: title,
        excerpt: '',
        content: '',
        date: new Date().toISOString(),
        category: categorizeArticle(line),
        tags: extractTags(line),
        trending: determineTrending(line),
        read_time: '5 min read',
        image_url: null,
        source_url: sourceUrl,
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        scraped_at: new Date().toISOString(),
      }
      inArticle = true
    } else if (currentArticle && inArticle) {
      if (line.length > 0) {
        currentArticle.content += line + ' '
        if (!currentArticle.excerpt && line.length > 50) {
          currentArticle.excerpt = line.substring(0, 200) + '...'
        }
      }
    }
  }

  if (currentArticle) {
    articles.push(currentArticle)
  }

  return articles
}

/**
 * Categorize article based on content
 */
function categorizeArticle(title) {
  const text = title.toLowerCase()

  if (text.includes('model') || text.includes('gpt') || text.includes('llm')) {
    return 'AI Models'
  }
  if (
    text.includes('biotech') ||
    text.includes('medical') ||
    text.includes('health')
  ) {
    return 'Biotech AI'
  }
  if (
    text.includes('safety') ||
    text.includes('ethics') ||
    text.includes('alignment')
  ) {
    return 'AI Safety'
  }
  if (
    text.includes('enterprise') ||
    text.includes('business') ||
    text.includes('corporate')
  ) {
    return 'Enterprise AI'
  }
  if (
    text.includes('research') ||
    text.includes('study') ||
    text.includes('paper')
  ) {
    return 'Research'
  }
  if (
    text.includes('autonomous') ||
    text.includes('vehicle') ||
    text.includes('driving')
  ) {
    return 'Autonomous Vehicles'
  }

  return 'AI Models' // Default category
}

/**
 * Extract tags from article content
 */
function extractTags(title) {
  const text = title.toLowerCase()
  const commonTags = [
    'AI',
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'GPT',
    'LLM',
    'OpenAI',
    'Google',
    'Microsoft',
    'Meta',
    'Research',
    'Innovation',
    'Technology',
    'Future',
  ]

  return commonTags.filter(tag => text.includes(tag.toLowerCase())).slice(0, 5)
}

/**
 * Determine if article is trending
 */
function determineTrending(title) {
  const text = title.toLowerCase()
  const trendingKeywords = [
    'breakthrough',
    'revolutionary',
    'groundbreaking',
    'cutting-edge',
    'latest',
    'new',
    'advanced',
    'state-of-the-art',
    'unprecedented',
  ]

  return trendingKeywords.some(keyword => text.includes(keyword))
}

/**
 * Store articles in Supabase
 */
async function storeArticles(articles) {
  if (articles.length === 0) {
    console.log('📝 No articles to store')
    return
  }

  try {
    console.log(`💾 Storing ${articles.length} articles in database...`)

    const { data, error } = await supabase
      .from('ai_news_articles')
      .insert(articles)
      .select()

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    console.log(
      `✅ Successfully stored ${data?.length || articles.length} articles`
    )
  } catch (error) {
    console.error('❌ Error storing articles:', error.message)
    throw error
  }
}

/**
 * Clean up old articles (keep only last 30 days)
 */
async function cleanupOldArticles() {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    console.log('🧹 Cleaning up articles older than 30 days...')

    const { error } = await supabase
      .from('ai_news_articles')
      .delete()
      .lt('created_at', thirtyDaysAgo.toISOString())

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    console.log('✅ Cleanup completed')
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message)
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting daily AI news fetch...')
  console.log(`📅 Date: ${new Date().toISOString()}`)
  console.log(`🎯 Target: ${MAX_ARTICLES} articles maximum`)

  try {
    // Scrape articles from sources until we have enough
    const allArticles = []
    let sourcesProcessed = 0

    for (const sourceUrl of AI_NEWS_SOURCES) {
      // Stop if we already have enough articles
      if (allArticles.length >= MAX_ARTICLES) {
        console.log(
          `🎯 Reached target of ${MAX_ARTICLES} articles, stopping early`
        )
        break
      }

      console.log(`📊 Current articles: ${allArticles.length}/${MAX_ARTICLES}`)

      const articles = await scrapeSource(sourceUrl)
      allArticles.push(...articles)
      sourcesProcessed++

      // Add delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log(
      `📊 Total articles found: ${allArticles.length} from ${sourcesProcessed} sources`
    )

    if (allArticles.length > 0) {
      // Store articles in database
      await storeArticles(allArticles)

      // Clean up old articles
      await cleanupOldArticles()
    } else {
      console.log('ℹ️  No new articles found')
    }

    console.log('✅ Daily AI news fetch completed successfully')
  } catch (error) {
    console.error('❌ Daily AI news fetch failed:', error.message)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error.message)
    process.exit(1)
  })
}

module.exports = { main, scrapeSource, storeArticles }
