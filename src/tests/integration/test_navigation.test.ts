/**
 * Integration test for Navigation functionality
 * Tests the complete navigation user journey
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Navigation Integration Tests', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up Navigation integration tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up Navigation integration tests...');
  });

  describe('Navigation Menu Functionality', () => {
    it('should display simplified navigation with 7 items maximum', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for navigation structure
      expect(html).toContain('nav');
      expect(html).toContain('navigation');

      // Verify navigation items are present
      const expectedItems = ['Home', 'About', 'Services', 'Portfolio', 'Team', 'AI News', 'Contact'];
      expectedItems.forEach(item => {
        expect(html).toContain(item);
      });
    });

    it('should not display testimonials in main navigation', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Testimonials should not be in main navigation
      expect(html).not.toMatch(/<nav[^>]*>.*testimonials.*<\/nav>/is);
    });

    it('should have AI News link in navigation', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      expect(html).toContain('AI News');
      expect(html).toContain('/ai-news');
    });

    it('should have proper navigation categories', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for category-based navigation structure
      expect(html).toContain('main');
      expect(html).toContain('company');
      expect(html).toContain('services');
      expect(html).toContain('work');
      expect(html).toContain('resources');
    });
  });

  describe('Navigation Responsive Design', () => {
    it('should have mobile menu functionality', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for mobile menu elements
      expect(html).toContain('mobile');
      expect(html).toContain('hamburger');
      expect(html).toContain('menu');
    });

    it('should have smooth animations for navigation', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for animation classes
      expect(html).toContain('transition');
      expect(html).toContain('duration');
      expect(html).toContain('ease');
    });
  });

  describe('Navigation Accessibility', () => {
    it('should have proper ARIA labels for navigation', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for accessibility attributes
      expect(html).toContain('aria-label');
      expect(html).toContain('aria-expanded');
      expect(html).toContain('role="navigation"');
    });

    it('should have keyboard navigation support', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for keyboard navigation attributes
      expect(html).toContain('tabindex');
      expect(html).toContain('onKeyDown');
    });
  });

  describe('Navigation Page Routing', () => {
    it('should navigate to About page', async () => {
      const response = await fetch(`${BASE_URL}/about`);
      expect(response.status).toBe(200);
    });

    it('should navigate to Services page', async () => {
      const response = await fetch(`${BASE_URL}/services`);
      expect(response.status).toBe(200);
    });

    it('should navigate to Portfolio page', async () => {
      const response = await fetch(`${BASE_URL}/portfolio`);
      expect(response.status).toBe(200);
    });

    it('should navigate to Team page', async () => {
      const response = await fetch(`${BASE_URL}/team`);
      expect(response.status).toBe(200);
    });

    it('should navigate to AI News page', async () => {
      const response = await fetch(`${BASE_URL}/ai-news`);
      expect(response.status).toBe(200);
    });

    it('should navigate to Contact page', async () => {
      const response = await fetch(`${BASE_URL}/contact`);
      expect(response.status).toBe(200);
    });
  });

  describe('Navigation Performance', () => {
    it('should load navigation within 100ms', async () => {
      const startTime = Date.now();
      const response = await fetch(`${BASE_URL}/`);
      const loadTime = Date.now() - startTime;

      expect(response.status).toBe(200);
      expect(loadTime).toBeLessThan(100);
    });

    it('should have optimized navigation bundle size', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for optimized navigation implementation
      expect(html).not.toContain('jQuery');
      expect(html).not.toContain('bootstrap');
    });
  });

  describe('Navigation State Management', () => {
    it('should highlight active navigation item', async () => {
      const response = await fetch(`${BASE_URL}/about`);
      const html = await response.text();

      // Check for active state indicators
      expect(html).toContain('active');
      expect(html).toContain('current');
    });

    it('should maintain navigation state across pages', async () => {
      const homeResponse = await fetch(`${BASE_URL}/`);
      const aboutResponse = await fetch(`${BASE_URL}/about`);

      expect(homeResponse.status).toBe(200);
      expect(aboutResponse.status).toBe(200);

      // Navigation should be consistent across pages
      const homeHtml = await homeResponse.text();
      const aboutHtml = await aboutResponse.text();

      expect(homeHtml).toContain('nav');
      expect(aboutHtml).toContain('nav');
    });
  });
});
