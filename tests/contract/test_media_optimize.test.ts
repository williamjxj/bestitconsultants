/**
 * Contract test for POST /api/media/optimize endpoint
 * Tests the API contract for optimizing media assets
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('POST /api/media/optimize', () => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'
  const endpoint = `${baseUrl}/api/media/optimize`

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up media optimize contract test...')
  })

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up media optimize contract test...')
  })

  describe('Successful responses', () => {
    it('should optimize media assets with valid request', async () => {
      const requestBody = {
        assetIds: ['test-asset-1', 'test-asset-2'],
        formats: ['webp', 'avif'],
        sizes: [
          { width: 640, height: 480, name: 'mobile' },
          { width: 1280, height: 720, name: 'desktop' },
        ],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')

      const data = await response.json()

      // Validate response structure
      expect(data).toHaveProperty('success')
      expect(data).toHaveProperty('data')
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it('should optimize with minimal required data', async () => {
      const requestBody = {
        assetIds: ['test-asset-1'],
        formats: ['webp'],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it('should handle single asset optimization', async () => {
      const requestBody = {
        assetIds: ['single-asset'],
        formats: ['webp', 'avif', 'jpeg'],
        sizes: [{ width: 800, height: 600, name: 'standard' }],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Error responses', () => {
    it('should return 400 for missing assetIds', async () => {
      const requestBody = {
        formats: ['webp'],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for empty assetIds array', async () => {
      const requestBody = {
        assetIds: [],
        formats: ['webp'],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for invalid format', async () => {
      const requestBody = {
        assetIds: ['test-asset'],
        formats: ['invalid-format'],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for invalid size dimensions', async () => {
      const requestBody = {
        assetIds: ['test-asset'],
        formats: ['webp'],
        sizes: [{ width: 0, height: 0, name: 'invalid' }],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for missing required fields', async () => {
      const requestBody = {}

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for invalid JSON', async () => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })
  })

  describe('Request validation', () => {
    it('should validate assetIds array', async () => {
      const requestBody = {
        assetIds: ['valid-id-1', 'valid-id-2', 'valid-id-3'],
        formats: ['webp'],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(200)
    })

    it('should validate formats array', async () => {
      const requestBody = {
        assetIds: ['test-asset'],
        formats: ['webp', 'avif', 'jpeg', 'png'],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(200)
    })

    it('should validate sizes array', async () => {
      const requestBody = {
        assetIds: ['test-asset'],
        formats: ['webp'],
        sizes: [
          { width: 320, height: 240, name: 'thumbnail' },
          { width: 640, height: 480, name: 'medium' },
          { width: 1280, height: 720, name: 'large' },
        ],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(200)
    })
  })

  describe('Response validation', () => {
    it('should return optimized assets with correct structure', async () => {
      const requestBody = {
        assetIds: ['test-asset'],
        formats: ['webp'],
        sizes: [{ width: 800, height: 600, name: 'optimized' }],
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)

      if (data.data.length > 0) {
        const asset = data.data[0]

        // Validate optimized asset structure
        expect(asset).toHaveProperty('id')
        expect(asset).toHaveProperty('src')
        expect(asset).toHaveProperty('format')
        expect(asset).toHaveProperty('width')
        expect(asset).toHaveProperty('height')

        // Validate format is one of the requested formats
        expect(['webp', 'avif', 'jpeg', 'png']).toContain(asset.format)
      }
    })
  })
})
