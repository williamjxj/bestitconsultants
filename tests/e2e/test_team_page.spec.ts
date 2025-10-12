import { test, expect } from '@playwright/test'

test.describe('Team Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/team')
  })

  test('should display team members with enhanced profiles', async ({
    page,
  }) => {
    // Check page title
    await expect(page).toHaveTitle(/Our Expert Team/)

    // Check main heading
    await expect(page.locator('h1')).toContainText('Our Expert Team')

    // Check team members are displayed
    const teamMembers = page.locator('[data-testid="team-member"]')
    await expect(teamMembers).toHaveCount(6)

    // Check first team member has required fields
    const firstMember = teamMembers.first()
    await expect(firstMember.locator('h3')).toBeVisible()
    await expect(firstMember.locator('p')).toBeVisible()
    await expect(firstMember.locator('img')).toBeVisible()
  })

  test('should display prestige projects for team members', async ({
    page,
  }) => {
    // Check if prestige projects section exists
    const prestigeProjects = page.locator('[data-testid="prestige-projects"]')
    await expect(prestigeProjects).toBeVisible()

    // Check prestige project details
    const projectCards = prestigeProjects.locator(
      '[data-testid="prestige-project"]'
    )
    await expect(projectCards).toHaveCount.greaterThan(0)
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
    await expect(page.locator('[data-testid="team-member"]')).toBeVisible()

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('[data-testid="team-member"]')).toBeVisible()

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('[data-testid="team-member"]')).toBeVisible()
  })
})
