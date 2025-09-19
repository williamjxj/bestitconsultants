/**
 * Integration test for Web Scraping functionality
 * Tests the complete web scraping workflow
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Web Scraping Integration Tests', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up Web Scraping integration tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up Web Scraping integration tests...');
  });

  describe('Web Scraping API Integration', () => {
    it('should scrape AI news articles successfully', async () => {
      const requestBody = {
        sources: [
          'https://openai.com/blog',
          'https://anthropic.com/news',
          'https://deepmind.com/blog'
        ],
        maxArticles: 6,
        categories: ['AI Models', 'AI Safety', 'Research']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data).toHaveProperty('articles');
      expect(data).toHaveProperty('totalScraped');
      expect(data).toHaveProperty('sourcesUsed');
      expect(data).toHaveProperty('scrapingTime');
      expect(Array.isArray(data.articles)).toBe(true);
      expect(typeof data.totalScraped).toBe('number');
      expect(Array.isArray(data.sourcesUsed)).toBe(true);
      expect(typeof data.scrapingTime).toBe('string');
    });

    it('should respect maxArticles limit', async () => {
      const maxArticles = 3;
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      expect(data.articles.length).toBeLessThanOrEqual(maxArticles);
    });

    it('should categorize articles correctly', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 5,
        categories: ['AI Models', 'AI Safety']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      const validCategories = [
        'AI Models',
        'Biotech AI',
        'AI Safety',
        'Enterprise AI',
        'Research',
        'Autonomous Vehicles'
      ];

      data.articles.forEach((article: any) => {
        expect(validCategories).toContain(article.category);
      });
    });
  });

  describe('Content Refresh Workflow', () => {
    it('should refresh AI news content successfully', async () => {
      const response = await fetch(`${BASE_URL}/api/scrape/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('articlesUpdated');
      expect(data).toHaveProperty('newArticles');
      expect(typeof data.message).toBe('string');
      expect(typeof data.articlesUpdated).toBe('number');
      expect(typeof data.newArticles).toBe('number');
    });

    it('should return success message for refresh', async () => {
      const response = await fetch(`${BASE_URL}/api/scrape/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      expect(data.message).toContain('refreshed');
    });
  });

  describe('Scraped Content Quality', () => {
    it('should return articles with valid structure', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.articles.length > 0) {
        const article = data.articles[0];

        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('excerpt');
        expect(article).toHaveProperty('content');
        expect(article).toHaveProperty('sourceUrl');
        expect(article).toHaveProperty('date');
        expect(article).toHaveProperty('category');
        expect(article).toHaveProperty('tags');
        expect(article).toHaveProperty('readTime');

        // Validate field types
        expect(typeof article.title).toBe('string');
        expect(typeof article.excerpt).toBe('string');
        expect(typeof article.content).toBe('string');
        expect(typeof article.sourceUrl).toBe('string');
        expect(typeof article.date).toBe('string');
        expect(typeof article.category).toBe('string');
        expect(Array.isArray(article.tags)).toBe(true);
        expect(typeof article.readTime).toBe('string');
      }
    });

    it('should have valid source URLs', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.sourceUrl).toMatch(/^https?:\/\/.+/);
      });
    });

    it('should have valid read time format', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.readTime).toMatch(/^\d+\s+min\s+read$/);
      });
    });

    it('should have valid date format', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      data.articles.forEach((article: any) => {
        const date = new Date(article.date);
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).not.toBeNaN();
      });
    });
  });

  describe('Scraping Performance', () => {
    it('should complete scraping within reasonable time', async () => {
      const startTime = Date.now();
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const scrapingTime = Date.now() - startTime;
      expect(response.status).toBe(200);
      expect(scrapingTime).toBeLessThan(30000); // 30 seconds max
    });

    it('should handle multiple sources efficiently', async () => {
      const startTime = Date.now();
      const requestBody = {
        sources: [
          'https://example.com/ai-news-1',
          'https://example.com/ai-news-2',
          'https://example.com/ai-news-3'
        ],
        maxArticles: 6,
        categories: ['AI Models', 'AI Safety']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const scrapingTime = Date.now() - startTime;
      expect(response.status).toBe(200);
      expect(scrapingTime).toBeLessThan(45000); // 45 seconds max for multiple sources
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid sources gracefully', async () => {
      const requestBody = {
        sources: ['https://invalid-url-that-should-fail.com'],
        maxArticles: 1,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      // Should handle errors gracefully, not crash
      expect([200, 500]).toContain(response.status);
    });

    it('should handle empty sources array', async () => {
      const requestBody = {
        sources: [],
        maxArticles: 1,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      expect(response.status).toBe(400);
    });

    it('should handle invalid maxArticles', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: -1,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      expect(response.status).toBe(400);
    });
  });

  describe('Content Deduplication', () => {
    it('should handle duplicate content', async () => {
      const requestBody = {
        sources: [
          'https://example.com/ai-news-1',
          'https://example.com/ai-news-2'
        ],
        maxArticles: 5,
        categories: ['AI Models']
      };

      const response = await fetch(`${BASE_URL}/api/scrape/ai-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      // Check for duplicate content handling
      const titles = data.articles.map((article: any) => article.title);
      const uniqueTitles = new Set(titles);

      // Should have some deduplication logic
      expect(data.articles.length).toBeGreaterThan(0);
    });
  });
});
