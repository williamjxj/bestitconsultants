import { test, expect } from '@playwright/test'

test.describe('Core Web Vitals Performance Tests', () => {
  test('should meet LCP requirements', async ({ page }) => {
    await page.goto('/')

    // Measure Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(entryList => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })

    // LCP should be under 2.5 seconds
    expect(lcp).toBeLessThan(2500)
  })

  test('should meet FID requirements', async ({ page }) => {
    await page.goto('/')

    // Measure First Input Delay
    const fid = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(entryList => {
          const entries = entryList.getEntries()
          entries.forEach(entry => {
            resolve(entry.processingStart - entry.startTime)
          })
        }).observe({ entryTypes: ['first-input'] })
      })
    })

    // FID should be under 100ms
    expect(fid).toBeLessThan(100)
  })

  test('should meet CLS requirements', async ({ page }) => {
    await page.goto('/')

    // Measure Cumulative Layout Shift
    const cls = await page.evaluate(() => {
      return new Promise(resolve => {
        let clsValue = 0
        new PerformanceObserver(entryList => {
          const entries = entryList.getEntries()
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          resolve(clsValue)
        }).observe({ entryTypes: ['layout-shift'] })
      })
    })

    // CLS should be under 0.1
    expect(cls).toBeLessThan(0.1)
  })

  test('should meet TTI requirements', async ({ page }) => {
    await page.goto('/')

    // Measure Time to Interactive
    const tti = await page.evaluate(() => {
      return new Promise(resolve => {
        const observer = new PerformanceObserver(entryList => {
          const entries = entryList.getEntries()
          entries.forEach(entry => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming
              resolve(navEntry.domInteractive - navEntry.fetchStart)
            }
          })
        })
        observer.observe({ entryTypes: ['navigation'] })
      })
    })

    // TTI should be under 3.5 seconds
    expect(tti).toBeLessThan(3500)
  })
})
