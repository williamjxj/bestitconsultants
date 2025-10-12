import { test, expect } from '@playwright/test'

test.describe('Case Studies Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/case-studies')
  })

  test('should display case studies with metrics', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Success Stories/)

    // Check main heading
    await expect(page.locator('h1')).toContainText('Our Success Stories')

    // Check case studies are displayed
    const caseStudies = page.locator('[data-testid="case-study"]')
    await expect(caseStudies).toHaveCount(3)

    // Check first case study has required fields
    const firstCaseStudy = caseStudies.first()
    await expect(firstCaseStudy.locator('h3')).toBeVisible()
    await expect(
      firstCaseStudy.locator('[data-testid="challenge"]')
    ).toBeVisible()
    await expect(
      firstCaseStudy.locator('[data-testid="solution"]')
    ).toBeVisible()
    await expect(firstCaseStudy.locator('[data-testid="result"]')).toBeVisible()
  })

  test('should display case study metrics', async ({ page }) => {
    // Check if metrics section exists
    const metrics = page.locator('[data-testid="case-study-metrics"]')
    await expect(metrics).toBeVisible()

    // Check metric cards
    const metricCards = metrics.locator('[data-testid="metric-card"]')
    await expect(metricCards).toHaveCount.greaterThan(0)

    // Check metric values
    for (let i = 0; i < (await metricCards.count()); i++) {
      const card = metricCards.nth(i)
      await expect(card.locator('[data-testid="metric-name"]')).toBeVisible()
      await expect(card.locator('[data-testid="metric-value"]')).toBeVisible()
      await expect(
        card.locator('[data-testid="metric-improvement"]')
      ).toBeVisible()
    }
  })

  test('should display testimonials', async ({ page }) => {
    // Check if testimonials exist
    const testimonials = page.locator('[data-testid="testimonial"]')
    await expect(testimonials).toHaveCount.greaterThan(0)

    // Check testimonial content
    for (let i = 0; i < (await testimonials.count()); i++) {
      const testimonial = testimonials.nth(i)
      await expect(
        testimonial.locator('[data-testid="testimonial-text"]')
      ).toBeVisible()
      await expect(
        testimonial.locator('[data-testid="testimonial-client"]')
      ).toBeVisible()
    }
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    await expect(headings).toHaveCount.greaterThan(0)

    // Check for alt text on images
    const images = page.locator('img')
    for (let i = 0; i < (await images.count()); i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('[data-testid="case-study"]')).toBeVisible()

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="case-study"]')).toBeVisible()

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('[data-testid="case-study"]')).toBeVisible()
  })
})
