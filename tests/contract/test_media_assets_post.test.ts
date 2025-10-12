/**
 * Contract test for POST /api/media/assets endpoint
 * Tests the API contract for creating new media assets
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'

describe('POST /api/media/assets', () => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'
  const endpoint = `${baseUrl}/api/media/assets`

  beforeAll(async () => {
    // Setup test environment
    console.log('Setting up media assets POST contract test...')
  })

  afterAll(async () => {
    // Cleanup test environment
    console.log('Cleaning up media assets POST contract test...')
  })

  describe('Successful responses', () => {
    it('should create a new media asset with valid data', async () => {
      const formData = new FormData()

      // Create a test image blob
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, 100, 100)
      }

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          resolve(blob!)
        }, 'image/png')
      })

      formData.append('file', blob, 'test-image.png')
      formData.append('alt', 'Test image for contract testing')
      formData.append('title', 'Test Image')
      formData.append('description', 'A test image for contract testing')
      formData.append('category', 'test')
      formData.append('priority', 'medium')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      expect(response.status).toBe(201)
      expect(response.headers.get('content-type')).toContain('application/json')

      const data = await response.json()

      // Validate response structure
      expect(data).toHaveProperty('success')
      expect(data).toHaveProperty('data')
      expect(data.success).toBe(true)

      // Validate created asset structure
      const asset = data.data
      expect(asset).toHaveProperty('id')
      expect(asset).toHaveProperty('src')
      expect(asset).toHaveProperty('alt')
      expect(asset).toHaveProperty('title')
      expect(asset).toHaveProperty('description')
      expect(asset).toHaveProperty('width')
      expect(asset).toHaveProperty('height')
      expect(asset).toHaveProperty('format')
      expect(asset).toHaveProperty('category')
      expect(asset).toHaveProperty('priority')
      expect(asset).toHaveProperty('loading')
      expect(asset).toHaveProperty('createdAt')
      expect(asset).toHaveProperty('updatedAt')

      // Validate field values
      expect(asset.alt).toBe('Test image for contract testing')
      expect(asset.title).toBe('Test Image')
      expect(asset.description).toBe('A test image for contract testing')
      expect(asset.category).toBe('test')
      expect(asset.priority).toBe('medium')
    })

    it('should create a media asset with minimal required data', async () => {
      const formData = new FormData()

      // Create a test image blob
      const canvas = document.createElement('canvas')
      canvas.width = 50
      canvas.height = 50
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(0, 0, 50, 50)
      }

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          resolve(blob!)
        }, 'image/png')
      })

      formData.append('file', blob, 'minimal-test.png')
      formData.append('alt', 'Minimal test image')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      expect(response.status).toBe(201)

      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data.alt).toBe('Minimal test image')
    })
  })

  describe('Error responses', () => {
    it('should return 400 for missing file', async () => {
      const formData = new FormData()
      formData.append('alt', 'Test without file')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for missing alt text', async () => {
      const formData = new FormData()

      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, 100, 100)
      }

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          resolve(blob!)
        }, 'image/png')
      })

      formData.append('file', blob, 'no-alt.png')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for invalid priority', async () => {
      const formData = new FormData()

      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, 100, 100)
      }

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          resolve(blob!)
        }, 'image/png')
      })

      formData.append('file', blob, 'invalid-priority.png')
      formData.append('alt', 'Test with invalid priority')
      formData.append('priority', 'invalid')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 413 for file too large', async () => {
      // Create a large test file (simulate)
      const formData = new FormData()

      // Create a large canvas to simulate large file
      const canvas = document.createElement('canvas')
      canvas.width = 10000
      canvas.height = 10000
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, 10000, 10000)
      }

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          resolve(blob!)
        }, 'image/png')
      })

      formData.append('file', blob, 'large-file.png')
      formData.append('alt', 'Large test file')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      // This might return 413 or 400 depending on implementation
      expect([400, 413]).toContain(response.status)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })

    it('should return 400 for unsupported file format', async () => {
      const formData = new FormData()

      // Create a text file instead of image
      const textBlob = new Blob(['This is not an image'], {
        type: 'text/plain',
      })

      formData.append('file', textBlob, 'not-an-image.txt')
      formData.append('alt', 'Not an image file')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      expect(response.status).toBe(400)

      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data).toHaveProperty('error')
      expect(data).toHaveProperty('code')
    })
  })

  describe('MediaAsset creation validation', () => {
    it('should set default values for optional fields', async () => {
      const formData = new FormData()

      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#00ff00'
        ctx.fillRect(0, 0, 200, 200)
      }

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          resolve(blob!)
        }, 'image/png')
      })

      formData.append('file', blob, 'defaults-test.png')
      formData.append('alt', 'Test with defaults')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      expect(response.status).toBe(201)

      const data = await response.json()
      const asset = data.data

      // Check default values
      expect(asset.priority).toBe('medium') // Default priority
      expect(asset.loading).toBe('lazy') // Default loading strategy
      expect(asset.format).toBeDefined()
      expect(asset.width).toBe(200)
      expect(asset.height).toBe(200)
    })

    it('should validate image dimensions', async () => {
      const formData = new FormData()

      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, 1, 1)
      }

      const blob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          resolve(blob!)
        }, 'image/png')
      })

      formData.append('file', blob, 'tiny-image.png')
      formData.append('alt', 'Tiny test image')

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      // Should either succeed or fail with appropriate error
      expect([200, 201, 400]).toContain(response.status)
    })
  })
})
