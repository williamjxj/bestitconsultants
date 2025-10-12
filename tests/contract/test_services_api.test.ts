import { describe, it, expect } from '@jest/globals'

describe('Services API Contract Tests', () => {
  it('should return service categories with correct structure', async () => {
    const response = await fetch('/api/services')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)

    if (data.data.length > 0) {
      const service = data.data[0]
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('name')
      expect(service).toHaveProperty('seoTagline')
      expect(service).toHaveProperty('description')
      expect(service).toHaveProperty('benefits')
      expect(service).toHaveProperty('technologies')
      expect(service).toHaveProperty('useCases')
      expect(service).toHaveProperty('order')
      expect(service).toHaveProperty('isActive')
      expect(Array.isArray(service.benefits)).toBe(true)
      expect(Array.isArray(service.technologies)).toBe(true)
      expect(Array.isArray(service.useCases)).toBe(true)
    }
  })

  it('should return specific service category by ID', async () => {
    const serviceId = 'ai-ml-solutions'
    const response = await fetch(`/api/services/${serviceId}`)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(data.data.id).toBe(serviceId)
  })

  it('should return content sections', async () => {
    const response = await fetch('/api/content')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)

    if (data.data.length > 0) {
      const content = data.data[0]
      expect(content).toHaveProperty('id')
      expect(content).toHaveProperty('type')
      expect(content).toHaveProperty('title')
      expect(content).toHaveProperty('content')
      expect(content).toHaveProperty('order')
      expect(content).toHaveProperty('isActive')
    }
  })

  it('should return SEO metadata', async () => {
    const response = await fetch('/api/seo')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)

    if (data.data.length > 0) {
      const seo = data.data[0]
      expect(seo).toHaveProperty('id')
      expect(seo).toHaveProperty('page')
      expect(seo).toHaveProperty('title')
      expect(seo).toHaveProperty('description')
      expect(seo).toHaveProperty('keywords')
      expect(Array.isArray(seo.keywords)).toBe(true)
    }
  })
})
