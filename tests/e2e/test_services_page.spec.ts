import { test, expect } from '@playwright/test'

test.describe('Services Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services')
  })

  test('should display service categories with SEO taglines', async ({
    page,
  }) => {
    // Check page title
    await expect(page).toHaveTitle(/Services/)

    // Check main heading
    await expect(page.locator('h1')).toContainText('Our Services')

    // Check service categories are displayed
    const serviceCategories = page.locator('[data-testid="service-category"]')
    await expect(serviceCategories).toHaveCount(5)

    // Check first service category has required fields
    const firstService = serviceCategories.first()
    await expect(firstService.locator('h3')).toBeVisible()
    await expect(
      firstService.locator('[data-testid="seo-tagline"]')
    ).toBeVisible()
    await expect(
      firstService.locator('[data-testid="description"]')
    ).toBeVisible()
  })

  test('should display service benefits and technologies', async ({ page }) => {
    // Check if benefits section exists
    const benefits = page.locator('[data-testid="service-benefits"]')
    await expect(benefits).toHaveCount.greaterThan(0)

    // Check if technologies section exists
    const technologies = page.locator('[data-testid="service-technologies"]')
    await expect(technologies).toHaveCount.greaterThan(0)

    // Check if use cases section exists
    const useCases = page.locator('[data-testid="service-use-cases"]')
    await expect(useCases).toHaveCount.greaterThan(0)
  })

  test('should display service icons', async ({ page }) => {
    // Check if service icons are displayed
    const serviceIcons = page.locator('[data-testid="service-icon"]')
    await expect(serviceIcons).toHaveCount.greaterThan(0)

    // Check icon alt text
    for (let i = 0; i < (await serviceIcons.count()); i++) {
      const alt = await serviceIcons.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
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
    await expect(page.locator('[data-testid="service-category"]')).toBeVisible()

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="service-category"]')).toBeVisible()

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('[data-testid="service-category"]')).toBeVisible()
  })
})
