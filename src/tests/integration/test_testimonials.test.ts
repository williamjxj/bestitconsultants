/**
 * Integration test for Testimonials functionality
 * Tests the complete testimonials user journey in footer
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Testimonials Integration Tests', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up Testimonials integration tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up Testimonials integration tests...');
  });

  describe('Testimonials Footer Display', () => {
    it('should display testimonials in footer section', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for testimonials section in footer
      expect(html).toContain('What Our Clients Say');
      expect(html).toContain('testimonials');
      expect(html).toContain('footer');
    });

    it('should have glass-morphism design for testimonials', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for glass-morphism styling
      expect(html).toContain('backdrop-blur');
      expect(html).toContain('bg-white/10');
      expect(html).toContain('rounded-xl');
    });

    it('should display at least 3 testimonials', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for multiple testimonial cards
      const testimonialCount = (html.match(/testimonial/g) || []).length;
      expect(testimonialCount).toBeGreaterThanOrEqual(3);
    });

    it('should have hover effects on testimonial cards', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for hover effects
      expect(html).toContain('hover:');
      expect(html).toContain('transition');
      expect(html).toContain('duration');
    });
  });

  describe('Testimonials Content Structure', () => {
    it('should have proper testimonial content structure', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for testimonial content elements
      expect(html).toContain('quote');
      expect(html).toContain('author');
      expect(html).toContain('title');
      expect(html).toContain('company');
    });

    it('should have non-empty testimonial quotes', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for actual testimonial content
      expect(html).toContain('"');
      expect(html).toContain('AI');
      expect(html).toContain('design');
    });

    it('should have proper testimonial attribution', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for author names and titles
      expect(html).toContain('Ms. Zhang');
      expect(html).toContain('Director');
      expect(html).toContain('Textile');
    });
  });

  describe('Testimonials Responsive Design', () => {
    it('should be responsive on mobile devices', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for responsive grid layout
      expect(html).toContain('grid');
      expect(html).toContain('md:grid-cols-3');
      expect(html).toContain('gap-6');
    });

    it('should have proper spacing and layout', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for proper spacing classes
      expect(html).toContain('mb-12');
      expect(html).toContain('p-6');
      expect(html).toContain('max-w-6xl');
    });
  });

  describe('Testimonials Performance', () => {
    it('should load testimonials within 200ms', async () => {
      const startTime = Date.now();
      const response = await fetch(`${BASE_URL}/`);
      const loadTime = Date.now() - startTime;

      expect(response.status).toBe(200);
      expect(loadTime).toBeLessThan(200);
    });

    it('should have optimized testimonials rendering', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for optimized implementation
      expect(html).not.toContain('jQuery');
      expect(html).not.toContain('bootstrap');
    });
  });

  describe('Testimonials Accessibility', () => {
    it('should have proper ARIA labels for testimonials', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for accessibility attributes
      expect(html).toContain('aria-label');
      expect(html).toContain('role');
    });

    it('should have proper semantic HTML structure', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for semantic HTML elements
      expect(html).toContain('<blockquote>');
      expect(html).toContain('<cite>');
      expect(html).toContain('<footer>');
    });
  });

  describe('Testimonials Data Integration', () => {
    it('should load testimonials from API', async () => {
      const response = await fetch(`${BASE_URL}/api/testimonials`);
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('testimonials');
      expect(data).toHaveProperty('total');
      expect(Array.isArray(data.testimonials)).toBe(true);
    });

    it('should display only visible testimonials', async () => {
      const response = await fetch(`${BASE_URL}/api/testimonials`);
      const data = await response.json();

      data.testimonials.forEach((testimonial: any) => {
        expect(testimonial.isVisible).toBe(true);
      });
    });

    it('should order testimonials by display order', async () => {
      const response = await fetch(`${BASE_URL}/api/testimonials`);
      const data = await response.json();

      if (data.testimonials.length > 1) {
        const orders = data.testimonials.map((t: any) => t.order);
        const sortedOrders = [...orders].sort((a, b) => a - b);
        expect(orders).toEqual(sortedOrders);
      }
    });
  });

  describe('Testimonials Visual Design', () => {
    it('should have proper color scheme for testimonials', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for proper color classes
      expect(html).toContain('text-blue-400');
      expect(html).toContain('text-gray-200');
      expect(html).toContain('text-blue-300');
    });

    it('should have proper typography for testimonials', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for typography classes
      expect(html).toContain('text-3xl');
      expect(html).toContain('font-bold');
      expect(html).toContain('italic');
    });

    it('should have proper spacing and layout', async () => {
      const response = await fetch(`${BASE_URL}/`);
      const html = await response.text();

      // Check for spacing classes
      expect(html).toContain('mb-8');
      expect(html).toContain('mb-4');
      expect(html).toContain('py-2');
    });
  });
});
