#!/usr/bin/env node

/**
 * Daily AI News Fetching Script
 * This script runs as a cronjob to fetch AI news articles and store them in Supabase
 * Usage: node scripts/fetch-ai-news.js
 */

const { createClient } = require('@supabase/supabase-js');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!SUPABASE_URL);
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!SUPABASE_SERVICE_KEY);
  process.exit(1);
}

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// AI news sources to scrape
const AI_NEWS_SOURCES = [
  'https://techcrunch.com/category/artificial-intelligence/',
  'https://www.wired.com/tag/ai/',
  'https://openai.com/blog',
  'https://deepmind.google/blog/',
  'https://www.anthropic.com/news',
  'https://www.nvidia.com/en-us/on-demand/ai-podcast/',
  'https://www.technologyreview.com/topic/artificial-intelligence/',
  'https://venturebeat.com/ai/'
];

/**
 * Execute Firecrawl MCP command
 */
async function executeFirecrawlCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['firecrawl-mcp', command, ...args], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env }
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          resolve(result);
        } catch (error) {
          reject(new Error(`Failed to parse Firecrawl output: ${error.message}`));
        }
      } else {
        reject(new Error(`Firecrawl command failed with code ${code}: ${stderr}`));
      }
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to start Firecrawl: ${error.message}`));
    });
  });
}

/**
 * Scrape AI news from a single source using Firecrawl
 */
async function scrapeSource(sourceUrl) {
  try {
    console.log(`🔍 Scraping: ${sourceUrl}`);

    const result = await executeFirecrawlCommand('scrape', [
      '--url', sourceUrl,
      '--formats', 'markdown',
      '--onlyMainContent', 'true'
    ]);

    if (!result || !result.content) {
      console.log(`⚠️  No content found for ${sourceUrl}`);
      return [];
    }

    // Parse the scraped content to extract articles
    const articles = parseArticlesFromContent(result.content, sourceUrl);
    console.log(`✅ Found ${articles.length} articles from ${sourceUrl}`);

    return articles;
  } catch (error) {
    console.error(`❌ Error scraping ${sourceUrl}:`, error.message);
    return [];
  }
}

/**
 * Parse articles from scraped content
 */
function parseArticlesFromContent(content, sourceUrl) {
  const articles = [];
  const lines = content.split('\n');

  let currentArticle = null;
  let inArticle = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Look for article headers (usually start with # or are in all caps)
    if (line.match(/^#{1,3}\s+.+/) || (line.length > 20 && line.length < 200 && line.match(/^[A-Z][^.!?]*$/))) {
      if (currentArticle) {
        articles.push(currentArticle);
      }

      currentArticle = {
        id: crypto.randomUUID(),
        title: line.replace(/^#{1,3}\s+/, ''),
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
        scraped_at: new Date().toISOString()
      };
      inArticle = true;
    } else if (currentArticle && inArticle) {
      if (line.length > 0) {
        currentArticle.content += line + ' ';
        if (!currentArticle.excerpt && line.length > 50) {
          currentArticle.excerpt = line.substring(0, 200) + '...';
        }
      }
    }
  }

  if (currentArticle) {
    articles.push(currentArticle);
  }

  return articles;
}

/**
 * Categorize article based on content
 */
function categorizeArticle(title) {
  const text = title.toLowerCase();

  if (text.includes('model') || text.includes('gpt') || text.includes('llm')) {
    return 'AI Models';
  }
  if (text.includes('biotech') || text.includes('medical') || text.includes('health')) {
    return 'Biotech AI';
  }
  if (text.includes('safety') || text.includes('ethics') || text.includes('alignment')) {
    return 'AI Safety';
  }
  if (text.includes('enterprise') || text.includes('business') || text.includes('corporate')) {
    return 'Enterprise AI';
  }
  if (text.includes('research') || text.includes('study') || text.includes('paper')) {
    return 'Research';
  }
  if (text.includes('autonomous') || text.includes('vehicle') || text.includes('driving')) {
    return 'Autonomous Vehicles';
  }

  return 'AI Models'; // Default category
}

/**
 * Extract tags from article content
 */
function extractTags(title) {
  const text = title.toLowerCase();
  const commonTags = [
    'AI', 'Machine Learning', 'Deep Learning', 'Neural Networks',
    'GPT', 'LLM', 'OpenAI', 'Google', 'Microsoft', 'Meta',
    'Research', 'Innovation', 'Technology', 'Future'
  ];

  return commonTags.filter(tag =>
    text.includes(tag.toLowerCase())
  ).slice(0, 5);
}

/**
 * Determine if article is trending
 */
function determineTrending(title) {
  const text = title.toLowerCase();
  const trendingKeywords = [
    'breakthrough', 'revolutionary', 'groundbreaking', 'cutting-edge',
    'latest', 'new', 'advanced', 'state-of-the-art', 'unprecedented'
  ];

  return trendingKeywords.some(keyword => text.includes(keyword));
}

/**
 * Store articles in Supabase
 */
async function storeArticles(articles) {
  if (articles.length === 0) {
    console.log('📝 No articles to store');
    return;
  }

  try {
    console.log(`💾 Storing ${articles.length} articles in database...`);

    const { data, error } = await supabase
      .from('ai_news_articles')
      .upsert(articles, {
        onConflict: 'source_url,title',
        ignoreDuplicates: false
      })
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`✅ Successfully stored ${data?.length || articles.length} articles`);
  } catch (error) {
    console.error('❌ Error storing articles:', error.message);
    throw error;
  }
}

/**
 * Clean up old articles (keep only last 30 days)
 */
async function cleanupOldArticles() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    console.log('🧹 Cleaning up articles older than 30 days...');

    const { error } = await supabase
      .from('ai_news_articles')
      .delete()
      .lt('created_at', thirtyDaysAgo.toISOString());

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    console.log('✅ Cleanup completed');
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting daily AI news fetch...');
  console.log(`📅 Date: ${new Date().toISOString()}`);

  try {
    // Scrape articles from all sources
    const allArticles = [];

    for (const sourceUrl of AI_NEWS_SOURCES) {
      const articles = await scrapeSource(sourceUrl);
      allArticles.push(...articles);

      // Add delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`📊 Total articles found: ${allArticles.length}`);

    if (allArticles.length > 0) {
      // Store articles in database
      await storeArticles(allArticles);

      // Clean up old articles
      await cleanupOldArticles();
    }

    console.log('✅ Daily AI news fetch completed successfully');

  } catch (error) {
    console.error('❌ Daily AI news fetch failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = { main, scrapeSource, storeArticles };
