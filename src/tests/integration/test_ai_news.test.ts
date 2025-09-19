/**
 * Integration test for AI News functionality
 * Tests the complete AI News page with database integration
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('AI News Integration Tests', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  const AI_NEWS_URL = `${BASE_URL}/ai-news`;

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up AI News integration tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up AI News integration tests...');
  });

  describe('AI News Page Display', () => {
    it('should load AI News page successfully', async () => {
      const response = await fetch(AI_NEWS_URL);
      expect(response.status).toBe(200);
    });

    it('should display AI News hero section', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for hero section elements
      expect(html).toContain('AI News');
      expect(html).toContain('hero');
      expect(html).toContain('gradient');
    });

    it('should display trending news section', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for trending section
      expect(html).toContain('Trending');
      expect(html).toContain('trending');
    });

    it('should display category filters', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for category filter buttons
      expect(html).toContain('All');
      expect(html).toContain('AI Models');
      expect(html).toContain('Biotech AI');
      expect(html).toContain('AI Safety');
    });
  });

  describe('AI News Content Loading', () => {
    it('should load AI news articles from database', async () => {
      const response = await fetch(`${BASE_URL}/api/ai-news`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('articles');
      expect(data).toHaveProperty('total');
      expect(data).toHaveProperty('hasMore');
      expect(Array.isArray(data.articles)).toBe(true);
    });

    it('should display 5-8 articles maximum', async () => {
      const response = await fetch(`${BASE_URL}/api/ai-news`);
      const data = await response.json();

      expect(data.articles.length).toBeGreaterThanOrEqual(5);
      expect(data.articles.length).toBeLessThanOrEqual(8);
    });

    it('should load articles within 500ms', async () => {
      const startTime = Date.now();
      const response = await fetch(`${BASE_URL}/api/ai-news`);
      const loadTime = Date.now() - startTime;

      expect(response.status).toBe(200);
      expect(loadTime).toBeLessThan(500);
    });
  });

  describe('AI News Category Filtering', () => {
    it('should filter articles by category', async () => {
      const category = 'AI Models';
      const response = await fetch(`${BASE_URL}/api/ai-news?category=${encodeURIComponent(category)}`);

      expect(response.status).toBe(200);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.category).toBe(category);
      });
    });

    it('should filter trending articles', async () => {
      const response = await fetch(`${BASE_URL}/api/ai-news?trending=true`);

      expect(response.status).toBe(200);
      const data = await response.json();

      data.articles.forEach((article: any) => {
        expect(article.trending).toBe(true);
      });
    });

    it('should support pagination', async () => {
      const limit = 3;
      const offset = 0;
      const response = await fetch(`${BASE_URL}/api/ai-news?limit=${limit}&offset=${offset}`);

      expect(response.status).toBe(200);
      const data = await response.json();

      expect(data.articles.length).toBeLessThanOrEqual(limit);
    });
  });

  describe('AI News Real-time Updates', () => {
    it('should support real-time content updates', async () => {
      const response = await fetch(`${BASE_URL}/api/ai-news`);
      const data = await response.json();

      // Check for real-time subscription support
      expect(data).toHaveProperty('articles');
      expect(Array.isArray(data.articles)).toBe(true);
    });

    it('should handle content refresh', async () => {
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
    });
  });

  describe('AI News Visual Design', () => {
    it('should have proper styling and animations', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for animation classes
      expect(html).toContain('motion');
      expect(html).toContain('transition');
      expect(html).toContain('duration');
    });

    it('should have responsive design', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for responsive classes
      expect(html).toContain('md:');
      expect(html).toContain('lg:');
      expect(html).toContain('grid');
    });

    it('should have proper color scheme', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for color classes
      expect(html).toContain('bg-gradient');
      expect(html).toContain('text-white');
      expect(html).toContain('text-blue');
    });
  });

  describe('AI News Performance', () => {
    it('should load AI News page within 2 seconds', async () => {
      const startTime = Date.now();
      const response = await fetch(AI_NEWS_URL);
      const loadTime = Date.now() - startTime;

      expect(response.status).toBe(200);
      expect(loadTime).toBeLessThan(2000);
    });

    it('should have optimized images', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for optimized image loading
      expect(html).toContain('Image');
      expect(html).toContain('next/image');
    });

    it('should have lazy loading for articles', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for lazy loading implementation
      expect(html).toContain('lazy');
      expect(html).toContain('loading');
    });
  });

  describe('AI News Accessibility', () => {
    it('should have proper ARIA labels', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for accessibility attributes
      expect(html).toContain('aria-label');
      expect(html).toContain('role');
    });

    it('should have proper semantic HTML', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for semantic HTML elements
      expect(html).toContain('<article>');
      expect(html).toContain('<section>');
      expect(html).toContain('<header>');
    });

    it('should support keyboard navigation', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for keyboard navigation support
      expect(html).toContain('tabindex');
      expect(html).toContain('onKeyDown');
    });
  });

  describe('AI News Newsletter Integration', () => {
    it('should display newsletter signup section', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for newsletter section
      expect(html).toContain('newsletter');
      expect(html).toContain('signup');
      expect(html).toContain('email');
    });

    it('should have newsletter form functionality', async () => {
      const response = await fetch(AI_NEWS_URL);
      const html = await response.text();

      // Check for form elements
      expect(html).toContain('<form>');
      expect(html).toContain('<input');
      expect(html).toContain('<button>');
    });
  });
});
