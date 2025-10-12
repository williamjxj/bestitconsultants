/**
 * Contract test for GET /api/media/assets endpoint
 * Tests the API contract for retrieving media assets
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('GET /api/media/assets', () => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'
  const endpoint = `${baseUrl}/api/media/assets`

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up media assets contract test...')
  })

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up media assets contract test...')
  })

  describe('Successful responses', () => {
    it('should return 200 with media assets list', async () => {
      const response = await fetch(endpoint)

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')

      const data = await response.json()

      // Validate response structure
      expect(data).toHaveProperty('success')
      expect(data).toHaveProperty('data')
      expect(data).toHaveProperty('pagination')

      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)

      // Validate pagination structure
      expect(data.pagination).toHaveProperty('page')
      expect(data.pagination).toHaveProperty('limit')
      expect(data.pagination).toHaveProperty('total')
      expect(data.pagination).toHaveProperty('pages')
      expect(data.pagination).toHaveProperty('hasNext')
      expect(data.pagination).toHaveProperty('hasPrev')
    })

    it('should return filtered assets by category', async () => {
      const response = await fetch(`${endpoint}?category=team`)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it('should return filtered assets by format', async () => {
      const response = await fetch(`${endpoint}?format=webp`)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it('should return filtered assets by priority', async () => {
      const response = await fetch(`${endpoint}?priority=high`)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })

    it('should support pagination', async () => {
      const response = await fetch(`${endpoint}?page=1&limit=10`)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.pagination.page).toBe(1)
      expect(data.pagination.limit).toBe(10)
    })
  })

  describe('Error responses', () => {
    it('should return 400 for invalid category', async () => {
      const response = await fetch(`${endpoint}?category=invalid`)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for invalid format', async () => {
      const response = await fetch(`${endpoint}?format=invalid`)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for invalid priority', async () => {
      const response = await fetch(`${endpoint}?priority=invalid`)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for invalid pagination parameters', async () => {
      const response = await fetch(`${endpoint}?page=0&limit=0`)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })
  })

  describe('MediaAsset schema validation', () => {
    it('should return valid MediaAsset objects', async () => {
      const response = await fetch(endpoint)
      const data = await response.json()

      if (data.data.length > 0) {
        const asset = data.data[0]

        // Validate required fields
        expect(asset).toHaveProperty('id')
        expect(asset).toHaveProperty('src')
        expect(asset).toHaveProperty('alt')
        expect(asset).toHaveProperty('width')
        expect(asset).toHaveProperty('height')
        expect(asset).toHaveProperty('format')
        expect(asset).toHaveProperty('category')
        expect(asset).toHaveProperty('priority')
        expect(asset).toHaveProperty('loading')
        expect(asset).toHaveProperty('createdAt')
        expect(asset).toHaveProperty('updatedAt')

        // Validate field types
        expect(typeof asset.id).toBe('string')
        expect(typeof asset.src).toBe('string')
        expect(typeof asset.alt).toBe('string')
        expect(typeof asset.width).toBe('number')
        expect(typeof asset.height).toBe('number')
        expect(typeof asset.format).toBe('string')
        expect(typeof asset.category).toBe('string')
        expect(typeof asset.priority).toBe('string')
        expect(typeof asset.loading).toBe('string')

        // Validate enum values
        expect(['webp', 'avif', 'jpeg', 'png']).toContain(asset.format)
        expect(['high', 'medium', 'low']).toContain(asset.priority)
        expect(['eager', 'lazy']).toContain(asset.loading)

        // Validate optional fields if present
        if (asset.title) expect(typeof asset.title).toBe('string')
        if (asset.description) expect(typeof asset.description).toBe('string')
        if (asset.size) expect(typeof asset.size).toBe('number')
        if (asset.placeholder) expect(typeof asset.placeholder).toBe('string')
        if (asset.seoMetadata) expect(typeof asset.seoMetadata).toBe('object')
        if (asset.accessibility)
          expect(typeof asset.accessibility).toBe('object')
        if (asset.animation) expect(typeof asset.animation).toBe('object')
      }
    })
  })
})
