import { describe, it, expect } from '@jest/globals'

describe('Service Display Integration Tests', () => {
  it('should display service categories with SEO taglines', async () => {
    const response = await fetch('/api/services')
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.length).toBeGreaterThan(0)

    // Verify each service category has required fields
    data.data.forEach((service: any) => {
      expect(service.name).toBeDefined()
      expect(service.seoTagline).toBeDefined()
      expect(service.description).toBeDefined()
      expect(service.benefits).toBeDefined()
      expect(service.technologies).toBeDefined()
      expect(service.useCases).toBeDefined()
      expect(service.order).toBeDefined()
      expect(service.isActive).toBeDefined()
      expect(Array.isArray(service.benefits)).toBe(true)
      expect(Array.isArray(service.technologies)).toBe(true)
      expect(Array.isArray(service.useCases)).toBe(true)
    })
  })

  it('should display content sections with correct types', async () => {
    const response = await fetch('/api/content')
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.length).toBeGreaterThan(0)

    // Verify each content section has required fields
    data.data.forEach((content: any) => {
      expect(content.type).toBeDefined()
      expect(content.title).toBeDefined()
      expect(content.content).toBeDefined()
      expect(content.order).toBeDefined()
      expect(content.isActive).toBeDefined()
      expect(['hero', 'highlight', 'testimonial', 'cta']).toContain(
        content.type
      )
    })
  })

  it('should display SEO metadata for all pages', async () => {
    const response = await fetch('/api/seo')
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.length).toBeGreaterThan(0)

    // Verify each SEO metadata has required fields
    data.data.forEach((seo: any) => {
      expect(seo.page).toBeDefined()
      expect(seo.title).toBeDefined()
      expect(seo.description).toBeDefined()
      expect(seo.keywords).toBeDefined()
      expect(Array.isArray(seo.keywords)).toBe(true)
    })
  })
})
