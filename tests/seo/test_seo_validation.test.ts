import { test, expect } from '@playwright/test'

test.describe('SEO Validation Tests', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')

    // Check title tag
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(30)
    expect(title.length).toBeLessThan(60)

    // Check meta description
    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute('content')
    expect(metaDescription).toBeTruthy()
    expect(metaDescription.length).toBeGreaterThan(120)
    expect(metaDescription.length).toBeLessThan(160)

    // Check meta keywords
    const metaKeywords = await page
      .locator('meta[name="keywords"]')
      .getAttribute('content')
    expect(metaKeywords).toBeTruthy()
  })

  test('should have proper Open Graph tags', async ({ page }) => {
    await page.goto('/')

    // Check Open Graph title
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute('content')
    expect(ogTitle).toBeTruthy()

    // Check Open Graph description
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute('content')
    expect(ogDescription).toBeTruthy()

    // Check Open Graph image
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute('content')
    expect(ogImage).toBeTruthy()

    // Check Open Graph URL
    const ogUrl = await page
      .locator('meta[property="og:url"]')
      .getAttribute('content')
    expect(ogUrl).toBeTruthy()
  })

  test('should have proper Twitter Card tags', async ({ page }) => {
    await page.goto('/')

    // Check Twitter Card type
    const twitterCard = await page
      .locator('meta[name="twitter:card"]')
      .getAttribute('content')
    expect(twitterCard).toBeTruthy()

    // Check Twitter title
    const twitterTitle = await page
      .locator('meta[name="twitter:title"]')
      .getAttribute('content')
    expect(twitterTitle).toBeTruthy()

    // Check Twitter description
    const twitterDescription = await page
      .locator('meta[name="twitter:description"]')
      .getAttribute('content')
    expect(twitterDescription).toBeTruthy()

    // Check Twitter image
    const twitterImage = await page
      .locator('meta[name="twitter:image"]')
      .getAttribute('content')
    expect(twitterImage).toBeTruthy()
  })

  test('should have proper structured data', async ({ page }) => {
    await page.goto('/')

    // Check for JSON-LD structured data
    const structuredData = await page
      .locator('script[type="application/ld+json"]')
      .textContent()
    expect(structuredData).toBeTruthy()

    // Parse and validate structured data
    const data = JSON.parse(structuredData)
    expect(data['@context']).toBe('https://schema.org')
    expect(data['@type']).toBe('Organization')
    expect(data.name).toBeTruthy()
    expect(data.description).toBeTruthy()
  })

  test('should have proper canonical URL', async ({ page }) => {
    await page.goto('/')

    // Check canonical URL
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute('href')
    expect(canonical).toBeTruthy()
    expect(canonical).toMatch(/^https:\/\//)
  })

  test('should have proper sitemap', async ({ page }) => {
    await page.goto('/sitemap.xml')

    // Check sitemap is accessible
    await expect(page.locator('urlset')).toBeVisible()

    // Check sitemap contains URLs
    const urls = page.locator('url')
    await expect(urls).toHaveCount.greaterThan(0)
  })

  test('should have proper robots.txt', async ({ page }) => {
    await page.goto('/robots.txt')

    // Check robots.txt is accessible
    const content = await page.textContent('body')
    expect(content).toContain('User-agent: *')
    expect(content).toContain('Allow: /')
    expect(content).toContain('Sitemap:')
  })
})
