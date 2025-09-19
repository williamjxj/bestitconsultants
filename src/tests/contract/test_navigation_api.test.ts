/**
 * Contract test for Navigation API
 * Tests the GET /api/navigation endpoint according to the OpenAPI specification
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Navigation API Contract Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
  const navigationEndpoint = `${API_BASE_URL}/api/navigation`;

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up Navigation API contract tests...');
  });

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up Navigation API contract tests...');
  });

  describe('GET /api/navigation', () => {
    it('should return navigation items with correct structure', async () => {
      const response = await fetch(navigationEndpoint);

      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('application/json');

      const data = await response.json();

      // Validate response structure according to OpenAPI spec
      expect(data).toHaveProperty('items');
      expect(data).toHaveProperty('categories');
      expect(Array.isArray(data.items)).toBe(true);
      expect(Array.isArray(data.categories)).toBe(true);
    });

    it('should return navigation items with required fields', async () => {
      const response = await fetch(navigationEndpoint);
      const data = await response.json();

      if (data.items.length > 0) {
        const item = data.items[0];

        // Validate NavigationItem structure
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('href');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('order');
        expect(item).toHaveProperty('isActive');
        expect(item).toHaveProperty('isVisible');

        // Validate field types
        expect(typeof item.id).toBe('string');
        expect(typeof item.label).toBe('string');
        expect(typeof item.href).toBe('string');
        expect(typeof item.category).toBe('string');
        expect(typeof item.order).toBe('number');
        expect(typeof item.isActive).toBe('boolean');
        expect(typeof item.isVisible).toBe('boolean');
      }
    });

    it('should return valid navigation categories', async () => {
      const response = await fetch(navigationEndpoint);
      const data = await response.json();

      const validCategories = ['main', 'company', 'services', 'work', 'resources'];

      data.items.forEach((item: any) => {
        expect(validCategories).toContain(item.category);
      });
    });

    it('should return maximum 7 navigation items', async () => {
      const response = await fetch(navigationEndpoint);
      const data = await response.json();

      expect(data.items.length).toBeLessThanOrEqual(7);
    });

    it('should handle errors gracefully', async () => {
      // Test with invalid endpoint
      const invalidResponse = await fetch(`${API_BASE_URL}/api/invalid-navigation`);

      // Should return 404 or appropriate error
      expect([404, 500]).toContain(invalidResponse.status);
    });
  });

  describe('Navigation Item Validation', () => {
    it('should have unique IDs for all navigation items', async () => {
      const response = await fetch(navigationEndpoint);
      const data = await response.json();

      const ids = data.items.map((item: any) => item.id);
      const uniqueIds = new Set(ids);

      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have valid href paths', async () => {
      const response = await fetch(navigationEndpoint);
      const data = await response.json();

      data.items.forEach((item: any) => {
        expect(item.href).toMatch(/^\/[a-zA-Z0-9\/-]*$/);
      });
    });

    it('should have positive order values', async () => {
      const response = await fetch(navigationEndpoint);
      const data = await response.json();

      data.items.forEach((item: any) => {
        expect(item.order).toBeGreaterThan(0);
        expect(item.order).toBeLessThanOrEqual(7);
      });
    });
  });
});
