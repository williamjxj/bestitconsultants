/**
 * Contract test for GET /api/media/galleries endpoint
 * Tests the API contract for retrieving media galleries
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('GET /api/media/galleries', () => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'
  const endpoint = `${baseUrl}/api/media/galleries`

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up media galleries contract test...')
  })

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up media galleries contract test...')
  })

  describe('Successful responses', () => {
    it('should return 200 with galleries list', async () => {
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

    it('should support pagination', async () => {
      const response = await fetch(`${endpoint}?page=1&limit=5`)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.pagination.page).toBe(1)
      expect(data.pagination.limit).toBe(5)
    })

    it('should return empty array when no galleries exist', async () => {
      const response = await fetch(endpoint)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(Array.isArray(data.data)).toBe(true)
    })
  })

  describe('Error responses', () => {
    it('should return 400 for invalid pagination parameters', async () => {
      const response = await fetch(`${endpoint}?page=0&limit=0`)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for negative page number', async () => {
      const response = await fetch(`${endpoint}?page=-1`)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for limit exceeding maximum', async () => {
      const response = await fetch(`${endpoint}?limit=1000`)

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })
  })

  describe('MediaGallery schema validation', () => {
    it('should return valid MediaGallery objects', async () => {
      const response = await fetch(endpoint)
      const data = await response.json()

      if (data.data.length > 0) {
        const gallery = data.data[0]

        // Validate required fields
        expect(gallery).toHaveProperty('id')
        expect(gallery).toHaveProperty('title')
        expect(gallery).toHaveProperty('description')
        expect(gallery).toHaveProperty('assets')
        expect(gallery).toHaveProperty('layout')
        expect(gallery).toHaveProperty('columns')
        expect(gallery).toHaveProperty('spacing')
        expect(gallery).toHaveProperty('createdAt')
        expect(gallery).toHaveProperty('updatedAt')

        // Validate field types
        expect(typeof gallery.id).toBe('string')
        expect(typeof gallery.title).toBe('string')
        expect(typeof gallery.description).toBe('string')
        expect(Array.isArray(gallery.assets)).toBe(true)
        expect(typeof gallery.layout).toBe('string')
        expect(typeof gallery.columns).toBe('number')
        expect(typeof gallery.spacing).toBe('number')

        // Validate enum values
        expect(['grid', 'carousel', 'masonry']).toContain(gallery.layout)

        // Validate numeric constraints
        expect(gallery.columns).toBeGreaterThanOrEqual(1)
        expect(gallery.columns).toBeLessThanOrEqual(6)
        expect(gallery.spacing).toBeGreaterThanOrEqual(0)

        // Validate optional fields if present
        if (gallery.animation) {
          expect(typeof gallery.animation).toBe('object')
        }
        if (gallery.pagination) {
          expect(typeof gallery.pagination).toBe('object')
        }
        if (gallery.filtering) {
          expect(typeof gallery.filtering).toBe('object')
        }
      }
    })

    it('should return galleries with valid asset references', async () => {
      const response = await fetch(endpoint)
      const data = await response.json()

      if (data.data.length > 0) {
        const gallery = data.data[0]

        if (gallery.assets.length > 0) {
          const asset = gallery.assets[0]

          // Validate asset structure within gallery
          expect(asset).toHaveProperty('id')
          expect(asset).toHaveProperty('src')
          expect(asset).toHaveProperty('alt')
          expect(asset).toHaveProperty('width')
          expect(asset).toHaveProperty('height')
          expect(asset).toHaveProperty('format')
          expect(asset).toHaveProperty('category')
          expect(asset).toHaveProperty('priority')
          expect(asset).toHaveProperty('loading')
        }
      }
    })
  })

  describe('Pagination behavior', () => {
    it('should handle first page correctly', async () => {
      const response = await fetch(`${endpoint}?page=1&limit=10`)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.pagination.page).toBe(1)
      expect(data.pagination.hasPrev).toBe(false)
    })

    it('should handle last page correctly', async () => {
      // First get total pages
      const firstResponse = await fetch(`${endpoint}?page=1&limit=10`)
      const firstData = await firstResponse.json()

      if (firstData.pagination.pages > 1) {
        const lastPage = firstData.pagination.pages
        const response = await fetch(`${endpoint}?page=${lastPage}&limit=10`)

        expect(response.status).toBe(200)

        const data = await response.json()
        expect(data.pagination.page).toBe(lastPage)
        expect(data.pagination.hasNext).toBe(false)
      }
    })

    it('should return empty data for page beyond total pages', async () => {
      const response = await fetch(`${endpoint}?page=999999&limit=10`)

      expect(response.status).toBe(200)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual([])
    })
  })
})
