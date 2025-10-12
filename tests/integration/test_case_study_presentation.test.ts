import { describe, it, expect } from '@jest/globals'

describe('Case Study Presentation Integration Tests', () => {
  it('should display case studies with metrics and outcomes', async () => {
    const response = await fetch('/api/case-studies')
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.length).toBeGreaterThan(0)

    // Verify each case study has required fields
    data.data.forEach((caseStudy: any) => {
      expect(caseStudy.title).toBeDefined()
      expect(caseStudy.challenge).toBeDefined()
      expect(caseStudy.solution).toBeDefined()
      expect(caseStudy.result).toBeDefined()
      expect(caseStudy.metrics).toBeDefined()
      expect(caseStudy.technologies).toBeDefined()
      expect(caseStudy.client).toBeDefined()
      expect(caseStudy.category).toBeDefined()
      expect(Array.isArray(caseStudy.metrics)).toBe(true)
    })
  })

  it('should display case study metrics with correct structure', async () => {
    const response = await fetch('/api/case-studies')
    const data = await response.json()

    expect(data.success).toBe(true)

    // Find a case study with metrics
    const caseStudyWithMetrics = data.data.find(
      (caseStudy: any) => caseStudy.metrics && caseStudy.metrics.length > 0
    )

    if (caseStudyWithMetrics) {
      expect(caseStudyWithMetrics.metrics.length).toBeGreaterThan(0)

      caseStudyWithMetrics.metrics.forEach((metric: any) => {
        expect(metric.name).toBeDefined()
        expect(metric.value).toBeDefined()
        expect(metric.unit).toBeDefined()
        expect(metric.improvement).toBeDefined()
        expect(metric.type).toBeDefined()
        expect(['performance', 'cost', 'efficiency', 'quality']).toContain(
          metric.type
        )
      })
    }
  })
})
