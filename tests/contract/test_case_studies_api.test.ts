import { describe, it, expect } from '@jest/globals'

describe('Case Studies API Contract Tests', () => {
  it('should return case studies with correct structure', async () => {
    const response = await fetch('/api/case-studies')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)

    if (data.data.length > 0) {
      const caseStudy = data.data[0]
      expect(caseStudy).toHaveProperty('id')
      expect(caseStudy).toHaveProperty('title')
      expect(caseStudy).toHaveProperty('challenge')
      expect(caseStudy).toHaveProperty('solution')
      expect(caseStudy).toHaveProperty('result')
      expect(caseStudy).toHaveProperty('metrics')
      expect(caseStudy).toHaveProperty('technologies')
      expect(caseStudy).toHaveProperty('client')
      expect(caseStudy).toHaveProperty('category')
      expect(Array.isArray(caseStudy.metrics)).toBe(true)
    }
  })

  it('should return specific case study by ID', async () => {
    const caseStudyId = 'ai-textile-design'
    const response = await fetch(`/api/case-studies/${caseStudyId}`)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(data.data.id).toBe(caseStudyId)
  })

  it('should return case study metrics', async () => {
    const caseStudyId = 'ai-textile-design'
    const response = await fetch(`/api/case-studies/${caseStudyId}/metrics`)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)

    if (data.data.length > 0) {
      const metric = data.data[0]
      expect(metric).toHaveProperty('id')
      expect(metric).toHaveProperty('name')
      expect(metric).toHaveProperty('value')
      expect(metric).toHaveProperty('unit')
      expect(metric).toHaveProperty('improvement')
      expect(metric).toHaveProperty('type')
    }
  })
})
