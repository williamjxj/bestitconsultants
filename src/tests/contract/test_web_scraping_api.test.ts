/**
 * Contract test for Web Scraping API
 * Tests the POST /api/scrape/ai-news and POST /api/scrape/refresh endpoints
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Web Scraping API Contract Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  const scrapeEndpoint = `${API_BASE_URL}/api/scrape/ai-news`;
  const refreshEndpoint = `${API_BASE_URL}/api/scrape/refresh`;

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up Web Scraping API contract tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up Web Scraping API contract tests...');
  });

  describe('POST /api/scrape/ai-news', () => {
    it('should scrape AI news articles with valid request', async () => {
      const requestBody = {
        sources: [
          'https://openai.com/blog',
          'https://anthropic.com/news',
          'https://deepmind.com/blog'
        ],
        maxArticles: 6,
        categories: ['AI Models', 'AI Safety', 'Research']
      };

      const response = await fetch(scrapeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('application/json');

      const data = await response.json();

      // Validate response structure according to OpenAPI spec
      expect(data).toHaveProperty('articles');
      expect(data).toHaveProperty('totalScraped');
      expect(data).toHaveProperty('sourcesUsed');
      expect(data).toHaveProperty('scrapingTime');
      expect(Array.isArray(data.articles)).toBe(true);
      expect(typeof data.totalScraped).toBe('number');
      expect(Array.isArray(data.sourcesUsed)).toBe(true);
      expect(typeof data.scrapingTime).toBe('string');
    });

    it('should return scraped articles with required fields', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(scrapeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.articles.length > 0) {
        const article = data.articles[0];

        // Validate ScrapedArticle structure
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('excerpt');
        expect(article).toHaveProperty('content');
        expect(article).toHaveProperty('sourceUrl');
        expect(article).toHaveProperty('date');
        expect(article).toHaveProperty('category');
        expect(article).toHaveProperty('tags');
        expect(article).toHaveProperty('imageUrl');
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

    it('should respect maxArticles limit', async () => {
      const maxArticles = 3;
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles,
        categories: ['AI Models']
      };

      const response = await fetch(scrapeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      expect(data.articles.length).toBeLessThanOrEqual(maxArticles);
    });

    it('should handle invalid request body', async () => {
      const invalidRequestBody = {
        sources: [], // Empty sources
        maxArticles: -1, // Invalid maxArticles
        categories: [] // Empty categories
      };

      const response = await fetch(scrapeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidRequestBody)
      });

      expect(response.status).toBe(400);
    });

    it('should handle missing required fields', async () => {
      const incompleteRequestBody = {
        sources: ['https://example.com/ai-news']
        // Missing maxArticles and categories
      };

      const response = await fetch(scrapeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incompleteRequestBody)
      });

      expect([400, 422]).toContain(response.status);
    });

    it('should handle server errors gracefully', async () => {
      const requestBody = {
        sources: ['https://invalid-url-that-should-fail.com'],
        maxArticles: 1,
        categories: ['AI Models']
      };

      const response = await fetch(scrapeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      // Should handle errors gracefully, not crash
      expect([200, 500]).toContain(response.status);
    });
  });

  describe('POST /api/scrape/refresh', () => {
    it('should refresh AI news content successfully', async () => {
      const response = await fetch(refreshEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('application/json');

      const data = await response.json();

      // Validate response structure
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('articlesUpdated');
      expect(data).toHaveProperty('newArticles');
      expect(typeof data.message).toBe('string');
      expect(typeof data.articlesUpdated).toBe('number');
      expect(typeof data.newArticles).toBe('number');
    });

    it('should return success message', async () => {
      const response = await fetch(refreshEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      expect(data.message).toContain('refreshed');
    });

    it('should handle server errors gracefully', async () => {
      // Test with invalid endpoint
      const invalidResponse = await fetch(`${API_BASE_URL}/api/scrape/invalid-refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      expect([404, 500]).toContain(invalidResponse.status);
    });
  });

  describe('Scraping Content Validation', () => {
    it('should return articles with valid categories', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 5,
        categories: ['AI Models', 'AI Safety']
      };

      const response = await fetch(scrapeEndpoint, {
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

    it('should return articles with valid read time format', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(scrapeEndpoint, {
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

    it('should return articles with valid source URLs', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(scrapeEndpoint, {
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

    it('should return articles with valid date format', async () => {
      const requestBody = {
        sources: ['https://example.com/ai-news'],
        maxArticles: 3,
        categories: ['AI Models']
      };

      const response = await fetch(scrapeEndpoint, {
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
});
