/**
 * Contract test for Testimonials API
 * Tests the GET /api/testimonials endpoint according to the OpenAPI specification
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Testimonials API Contract Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  const testimonialsEndpoint = `${API_BASE_URL}/api/testimonials`;

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up Testimonials API contract tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up Testimonials API contract tests...');
  });

  describe('GET /api/testimonials', () => {
    it('should return testimonials with correct structure', async () => {
      const response = await fetch(testimonialsEndpoint);

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('application/json');

      const data = await response.json();

      // Validate response structure according to OpenAPI spec
      expect(data).toHaveProperty('testimonials');
      expect(data).toHaveProperty('total');
      expect(Array.isArray(data.testimonials)).toBe(true);
      expect(typeof data.total).toBe('number');
    });

    it('should return testimonials with required fields', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      if (data.testimonials.length > 0) {
        const testimonial = data.testimonials[0];

        // Validate Testimonial structure
        expect(testimonial).toHaveProperty('id');
        expect(testimonial).toHaveProperty('quote');
        expect(testimonial).toHaveProperty('author');
        expect(testimonial).toHaveProperty('title');
        expect(testimonial).toHaveProperty('company');
        expect(testimonial).toHaveProperty('isVisible');
        expect(testimonial).toHaveProperty('order');

        // Validate field types
        expect(typeof testimonial.id).toBe('string');
        expect(typeof testimonial.quote).toBe('string');
        expect(typeof testimonial.author).toBe('string');
        expect(typeof testimonial.title).toBe('string');
        expect(typeof testimonial.company).toBe('string');
        expect(typeof testimonial.isVisible).toBe('boolean');
        expect(typeof testimonial.order).toBe('number');
      }
    });

    it('should return only visible testimonials', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      data.testimonials.forEach((testimonial: any) => {
        expect(testimonial.isVisible).toBe(true);
      });
    });

    it('should return testimonials ordered by display order', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      if (data.testimonials.length > 1) {
        const orders = data.testimonials.map((t: any) => t.order);
        const sortedOrders = [...orders].sort((a, b) => a - b);

        expect(orders).toEqual(sortedOrders);
      }
    });

    it('should have valid quote lengths', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      data.testimonials.forEach((testimonial: any) => {
        expect(testimonial.quote.length).toBeGreaterThan(0);
        expect(testimonial.quote.length).toBeLessThanOrEqual(200);
      });
    });

    it('should handle errors gracefully', async () => {
      // Test with invalid endpoint
      const invalidResponse = await fetch(`${API_BASE_URL}/api/invalid-testimonials`);

      // Should return 404 or appropriate error
      expect([404, 500]).toContain(invalidResponse.status);
    });
  });

  describe('Testimonial Content Validation', () => {
    it('should have non-empty quotes', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      data.testimonials.forEach((testimonial: any) => {
        expect(testimonial.quote.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty author names', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      data.testimonials.forEach((testimonial: any) => {
        expect(testimonial.author.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty company names', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      data.testimonials.forEach((testimonial: any) => {
        expect(testimonial.company.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have positive order values', async () => {
      const response = await fetch(testimonialsEndpoint);
      const data = await response.json();

      data.testimonials.forEach((testimonial: any) => {
        expect(testimonial.order).toBeGreaterThan(0);
      });
    });
  });
});
