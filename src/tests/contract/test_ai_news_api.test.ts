/**
 * Contract test for AI News API
 * Tests the GET /api/ai-news endpoint according to the OpenAPI specification
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('AI News API Contract Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  const aiNewsEndpoint = `${API_BASE_URL}/api/ai-news`;

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up AI News API contract tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up AI News API contract tests...');
  });

  describe('GET /api/ai-news', () => {
    it('should return AI news articles with correct structure', async () => {
      const response = await fetch(aiNewsEndpoint);

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('application/json');

      const data = await response.json();

      // Validate response structure according to OpenAPI spec
      expect(data).toHaveProperty('articles');
      expect(data).toHaveProperty('total');
      expect(data).toHaveProperty('hasMore');
      expect(Array.isArray(data.articles)).toBe(true);
      expect(typeof data.total).toBe('number');
      expect(typeof data.hasMore).toBe('boolean');
    });

    it('should return AI news articles with required fields', async () => {
      const response = await fetch(aiNewsEndpoint);
      const data = await response.json();

      if (data.articles.length > 0) {
        const article = data.articles[0];

        // Validate AINewsArticle structure
        expect(article).toHaveProperty('id');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('excerpt');
        expect(article).toHaveProperty('content');
        expect(article).toHaveProperty('date');
        expect(article).toHaveProperty('category');
        expect(article).toHaveProperty('tags');
        expect(article).toHaveProperty('trending');
        expect(article).toHaveProperty('readTime');
        expect(article).toHaveProperty('imageUrl');
        expect(article).toHaveProperty('sourceUrl');
        expect(article).toHaveProperty('isPublished');

        // Validate field types
        expect(typeof article.id).toBe('string');
        expect(typeof article.title).toBe('string');
        expect(typeof article.excerpt).toBe('string');
        expect(typeof article.content).toBe('string');
        expect(typeof article.date).toBe('string');
        expect(typeof article.category).toBe('string');
        expect(Array.isArray(article.tags)).toBe(true);
        expect(typeof article.trending).toBe('boolean');
        expect(typeof article.readTime).toBe('string');
        expect(typeof article.sourceUrl).toBe('string');
        expect(typeof article.isPublished).toBe('boolean');
      }
    });

    it('should support category filtering', async () => {
      const category = 'AI Models';
      const response = await fetch(`${aiNewsEndpoint}?category=${encodeURIComponent(category)}`);

      expect(response.status).toBe(200);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.category).toBe(category);
      });
    });

    it('should support trending filter', async () => {
      const response = await fetch(`${aiNewsEndpoint}?trending=true`);

      expect(response.status).toBe(200);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.trending).toBe(true);
      });
    });

    it('should support pagination with limit and offset', async () => {
      const limit = 5;
      const offset = 0;
      const response = await fetch(`${aiNewsEndpoint}?limit=${limit}&offset=${offset}`);

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.articles.length).toBeLessThanOrEqual(limit);
    });

    it('should return only published articles', async () => {
      const response = await fetch(aiNewsEndpoint);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.isPublished).toBe(true);
      });
    });

    it('should have valid category values', async () => {
      const response = await fetch(aiNewsEndpoint);
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

    it('should have valid read time format', async () => {
      const response = await fetch(aiNewsEndpoint);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.readTime).toMatch(/^\d+\s+min\s+read$/);
      });
    });

    it('should handle errors gracefully', async () => {
      // Test with invalid endpoint
      const invalidResponse = await fetch(`${API_BASE_URL}/api/invalid-ai-news`);

      // Should return 404 or appropriate error
      expect([404, 500]).toContain(invalidResponse.status);
    });
  });

  describe('GET /api/ai-news/{id}', () => {
    it('should return specific article by ID', async () => {
      // First get a list to find an ID
      const listResponse = await fetch(aiNewsEndpoint);
      const listData = await listResponse.json();

      if (listData.articles.length > 0) {
        const articleId = listData.articles[0].id;
        const response = await fetch(`${aiNewsEndpoint}/${articleId}`);

        expect(response.status).toBe(200);
        const data = await response.json();

        expect(data.id).toBe(articleId);
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('content');
      }
    });

    it('should return 404 for non-existent article', async () => {
      const response = await fetch(`${aiNewsEndpoint}/non-existent-id`);

      expect(response.status).toBe(404);
    });
  });

  describe('AI News Content Validation', () => {
    it('should have non-empty titles', async () => {
      const response = await fetch(aiNewsEndpoint);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.title.trim().length).toBeGreaterThan(0);
        expect(article.title.length).toBeLessThanOrEqual(100);
      });
    });

    it('should have non-empty excerpts', async () => {
      const response = await fetch(aiNewsEndpoint);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.excerpt.trim().length).toBeGreaterThan(0);
        expect(article.excerpt.length).toBeLessThanOrEqual(300);
      });
    });

    it('should have valid source URLs', async () => {
      const response = await fetch(aiNewsEndpoint);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.sourceUrl).toMatch(/^https?:\/\/.+/);
      });
    });

    it('should have valid date format', async () => {
      const response = await fetch(aiNewsEndpoint);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        const date = new Date(article.date);
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).not.toBeNaN();
      });
    });
  });
});
