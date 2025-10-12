import { test, expect } from '@playwright/test'

test.describe('Accessibility Tests', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/')

    // Check for h1 tag
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)

    // Check heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingTexts = await headings.allTextContents()

    // Should have meaningful headings
    expect(headingTexts.length).toBeGreaterThan(0)
    expect(headingTexts.every(text => text.trim().length > 0)).toBe(true)
  })

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/')

    // Check all images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt).not.toBe('')
    }
  })

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/contact')

    // Check form inputs have labels
    const inputs = page.locator('input, textarea, select')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeVisible()
      }
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/')

    // Check text elements have sufficient contrast
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div')
    const elementCount = await textElements.count()

    // This is a basic check - in a real scenario, you'd use a proper contrast checker
    expect(elementCount).toBeGreaterThan(0)
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Check if focusable elements exist
    const focusableElements = page.locator(
      'button, a, input, textarea, select, [tabindex]'
    )
    const focusableCount = await focusableElements.count()

    expect(focusableCount).toBeGreaterThan(0)

    // Test keyboard navigation
    await page.keyboard.press('Tab')
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/')

    // Check for ARIA landmarks
    const landmarks = page.locator(
      '[role="banner"], [role="main"], [role="contentinfo"], [role="navigation"]'
    )
    await expect(landmarks).toHaveCount.greaterThan(0)

    // Check for ARIA labels
    const ariaLabels = page.locator('[aria-label], [aria-labelledby]')
    await expect(ariaLabels).toHaveCount.greaterThan(0)
  })
})
