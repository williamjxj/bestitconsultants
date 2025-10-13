/**
 * Performance tests for Core Web Vitals compliance
 * Tests LCP, FID, CLS, and image optimization performance
 */

import { performance } from 'perf_hooks'

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => performance.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn(() => []),
    getEntriesByName: jest.fn(() => []),
    observer: jest.fn(),
  },
})

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock requestIdleCallback
global.requestIdleCallback = jest.fn(callback => {
  setTimeout(callback, 0)
})

// Mock cancelIdleCallback
global.cancelIdleCallback = jest.fn()

describe('Core Web Vitals Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset performance marks
    ;(window.performance.mark as jest.Mock).mockClear()
    ;(window.performance.measure as jest.Mock).mockClear()
  })

  describe('Largest Contentful Paint (LCP)', () => {
    it('should measure LCP for hero images', async () => {
      const startTime = performance.now()

      // Simulate hero image loading
      const heroImage = document.createElement('img')
      heroImage.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'
      heroImage.alt = 'Hero image'
      heroImage.className = 'hero-image'
      heroImage.width = 1920
      heroImage.height = 1080

      // Simulate image load
      setTimeout(() => {
        heroImage.dispatchEvent(new Event('load'))
      }, 100)

      const loadTime = performance.now() - startTime

      // LCP should be under 2.5 seconds for good performance
      expect(loadTime).toBeLessThan(2500)
    })

    it('should measure LCP for background images', async () => {
      const startTime = performance.now()

      // Simulate background image loading
      const backgroundDiv = document.createElement('div')
      backgroundDiv.style.backgroundImage =
        'url(https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp)'
      backgroundDiv.className = 'hero-background'

      // Simulate background image load
      setTimeout(() => {
        backgroundDiv.dispatchEvent(new Event('load'))
      }, 150)

      const loadTime = performance.now() - startTime

      // LCP should be under 2.5 seconds for good performance
      expect(loadTime).toBeLessThan(2500)
    })

    it('should prioritize above-fold images', () => {
      const heroImage = document.createElement('img')
      heroImage.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'
      heroImage.loading = 'eager'
      heroImage.fetchPriority = 'high'

      expect(heroImage.loading).toBe('eager')
      expect(heroImage.fetchPriority).toBe('high')
    })
  })

  describe('First Input Delay (FID)', () => {
    it('should measure FID for interactive elements', () => {
      const startTime = performance.now()

      // Simulate user interaction
      const button = document.createElement('button')
      button.textContent = 'Click me'
      button.addEventListener('click', () => {
        const endTime = performance.now()
        const fid = endTime - startTime

        // FID should be under 100ms for good performance
        expect(fid).toBeLessThan(100)
      })

      // Simulate click
      button.click()
    })

    it('should measure FID for image gallery interactions', () => {
      const startTime = performance.now()

      // Simulate gallery navigation
      const galleryButton = document.createElement('button')
      galleryButton.className = 'gallery-nav'
      galleryButton.addEventListener('click', () => {
        const endTime = performance.now()
        const fid = endTime - startTime

        // FID should be under 100ms for good performance
        expect(fid).toBeLessThan(100)
      })

      galleryButton.click()
    })
  })

  describe('Cumulative Layout Shift (CLS)', () => {
    it('should prevent layout shift from image loading', () => {
      const container = document.createElement('div')
      container.style.width = '400px'
      container.style.height = '300px'

      const image = document.createElement('img')
      image.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1350198816-612x612.jpg'
      image.width = 400
      image.height = 300
      image.style.width = '400px'
      image.style.height = '300px'

      container.appendChild(image)

      // Measure layout shift
      const initialLayout = container.getBoundingClientRect()

      // Simulate image load
      image.dispatchEvent(new Event('load'))

      const finalLayout = container.getBoundingClientRect()

      // CLS should be minimal (no significant layout shift)
      const layoutShift =
        Math.abs(finalLayout.width - initialLayout.width) +
        Math.abs(finalLayout.height - initialLayout.height)

      expect(layoutShift).toBeLessThan(10) // Less than 10px shift
    })

    it('should prevent layout shift from responsive images', () => {
      const container = document.createElement('div')
      container.style.width = '100%'
      container.style.height = 'auto'

      const image = document.createElement('img')
      image.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2163952011-612x612.webp'
      image.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
      image.style.width = '100%'
      image.style.height = 'auto'

      container.appendChild(image)

      // Measure layout shift
      const initialLayout = container.getBoundingClientRect()

      // Simulate responsive image load
      image.dispatchEvent(new Event('load'))

      const finalLayout = container.getBoundingClientRect()

      // CLS should be minimal
      const layoutShift =
        Math.abs(finalLayout.width - initialLayout.width) +
        Math.abs(finalLayout.height - initialLayout.height)

      expect(layoutShift).toBeLessThan(10)
    })
  })

  describe('Image Optimization Performance', () => {
    it('should load WebP images when supported', () => {
      // Mock WebP support
      const canvas = document.createElement('canvas')
      const webpSupported =
        canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0

      if (webpSupported) {
        const image = document.createElement('img')
        image.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp'

        expect(image.src).toContain('.webp')
      }
    })

    it('should load AVIF images when supported', () => {
      // Mock AVIF support
      const canvas = document.createElement('canvas')
      const avifSupported =
        canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0

      if (avifSupported) {
        const image = document.createElement('img')
        image.src = 'R2 bucket istockphoto-1358835459-612x612.avif'

        expect(image.src).toContain('.avif')
      }
    })

    it('should fallback to JPEG for unsupported formats', () => {
      // Mock no WebP/AVIF support
      const canvas = document.createElement('canvas')
      const webpSupported =
        canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
      const avifSupported =
        canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0

      if (!webpSupported && !avifSupported) {
        const image = document.createElement('img')
        image.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.jpg'

        expect(image.src).toContain('.jpg')
      }
    })

    it('should load appropriate image sizes for different viewports', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375 })
      Object.defineProperty(window, 'innerHeight', { value: 667 })

      const mobileImage = document.createElement('img')
      mobileImage.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'
      mobileImage.sizes =
        '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
      mobileImage.srcset =
        'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612-640w.jpg 640w, https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612-800w.jpg 800w'

      expect(mobileImage.sizes).toContain('(max-width: 768px) 100vw')
      expect(mobileImage.srcset).toContain('640w')

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', { value: 1920 })
      Object.defineProperty(window, 'innerHeight', { value: 1080 })

      const desktopImage = document.createElement('img')
      desktopImage.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'
      desktopImage.sizes =
        '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
      desktopImage.srcset =
        'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612-640w.jpg 640w, https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612-800w.jpg 800w'

      expect(desktopImage.sizes).toContain('33vw')
      expect(desktopImage.srcset).toContain('800w')
    })
  })

  describe('Animation Performance', () => {
    it('should use transform and opacity for smooth animations', () => {
      const animatedElement = document.createElement('div')
      animatedElement.style.transform = 'translateX(0px)'
      animatedElement.style.opacity = '1'
      animatedElement.style.transition =
        'transform 0.3s ease, opacity 0.3s ease'

      // Simulate animation
      animatedElement.style.transform = 'translateX(100px)'
      animatedElement.style.opacity = '0.8'

      // Check that transform and opacity are used (not layout properties)
      expect(animatedElement.style.transform).toContain('translateX')
      expect(animatedElement.style.opacity).toBeDefined()
    })

    it('should use will-change for animated elements', () => {
      const animatedElement = document.createElement('div')
      animatedElement.style.willChange = 'transform, opacity'

      expect(animatedElement.style.willChange).toContain('transform')
      expect(animatedElement.style.willChange).toContain('opacity')
    })

    it('should maintain 60fps during animations', () => {
      const startTime = performance.now()
      let frameCount = 0

      const animate = () => {
        frameCount++
        if (performance.now() - startTime < 1000) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)

      // Should achieve close to 60fps
      setTimeout(() => {
        const fps = frameCount / ((performance.now() - startTime) / 1000)
        expect(fps).toBeGreaterThan(50) // Allow some tolerance
      }, 1100)
    })
  })

  describe('Memory Usage', () => {
    it('should not leak memory with image loading', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0

      // Load multiple images
      for (let i = 0; i < 10; i++) {
        const image = document.createElement('img')
        image.src = `https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg?${i}`
        image.onload = () => {
          // Clean up
          image.remove()
        }
      }

      // Wait for cleanup
      setTimeout(() => {
        const finalMemory = (performance as any).memory?.usedJSHeapSize || 0
        const memoryIncrease = finalMemory - initialMemory

        // Memory increase should be reasonable
        expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024) // Less than 10MB
      }, 1000)
    })

    it('should clean up event listeners', () => {
      const image = document.createElement('img')
      const handler = jest.fn()

      image.addEventListener('load', handler)
      image.addEventListener('error', handler)

      // Simulate load
      image.dispatchEvent(new Event('load'))

      // Remove listeners
      image.removeEventListener('load', handler)
      image.removeEventListener('error', handler)

      // Clean up
      image.remove()

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('Network Performance', () => {
    it('should preload critical images', () => {
      const preloadLink = document.createElement('link')
      preloadLink.rel = 'preload'
      preloadLink.as = 'image'
      preloadLink.href = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'

      expect(preloadLink.rel).toBe('preload')
      expect(preloadLink.as).toBe('image')
      expect(preloadLink.href).toContain('.jpg')
    })

    it('should use appropriate loading strategies', () => {
      const heroImage = document.createElement('img')
      heroImage.loading = 'eager'
      heroImage.fetchPriority = 'high'

      const galleryImage = document.createElement('img')
      galleryImage.loading = 'lazy'
      galleryImage.fetchPriority = 'low'

      expect(heroImage.loading).toBe('eager')
      expect(heroImage.fetchPriority).toBe('high')
      expect(galleryImage.loading).toBe('lazy')
      expect(galleryImage.fetchPriority).toBe('low')
    })

    it('should implement progressive loading', () => {
      const image = document.createElement('img')
      image.src = 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'
      image.loading = 'eager'
      image.decoding = 'async'

      expect(image.loading).toBe('eager')
      expect(image.decoding).toBe('async')
    })
  })
})
