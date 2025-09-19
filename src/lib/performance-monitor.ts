/**
 * Performance monitoring and optimization utilities
 * Tracks Core Web Vitals, loading times, and user experience metrics
 */

export interface PerformanceMetrics {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  fcp: number // First Contentful Paint
  loadTime: number // Total page load time
  domContentLoaded: number // DOM Content Loaded time
}

export interface PerformanceReport {
  metrics: PerformanceMetrics
  score: number // Overall performance score (0-100)
  recommendations: string[]
  timestamp: Date
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetrics | null = null
  private observers: PerformanceObserver[] = []

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  /**
   * Initialize performance monitoring
   */
  public initialize(): void {
    if (typeof window === 'undefined') return

    console.log('Initializing performance monitoring...')

    // Monitor Core Web Vitals
    this.observeLCP()
    this.observeFID()
    this.observeCLS()
    this.observeFCP()
    this.observeTTFB()

    // Monitor page load events
    this.observePageLoad()

    console.log('Performance monitoring initialized')
  }

  /**
   * Observe Largest Contentful Paint (LCP)
   */
  private observeLCP(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number }

        if (lastEntry) {
          this.metrics = {
            ...this.metrics,
            lcp: lastEntry.startTime
          } as PerformanceMetrics
        }
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('LCP observation not supported:', error)
    }
  }

  /**
   * Observe First Input Delay (FID)
   */
  private observeFID(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming
          if (fidEntry.processingStart && fidEntry.startTime) {
            this.metrics = {
              ...this.metrics,
              fid: fidEntry.processingStart - fidEntry.startTime
            } as PerformanceMetrics
          }
        })
      })

      observer.observe({ entryTypes: ['first-input'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('FID observation not supported:', error)
    }
  }

  /**
   * Observe Cumulative Layout Shift (CLS)
   */
  private observeCLS(): void {
    if (!('PerformanceObserver' in window)) return

    let clsValue = 0

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as PerformanceEntry & { value: number }
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
          }
        })

        this.metrics = {
          ...this.metrics,
          cls: clsValue
        } as PerformanceMetrics
      })

      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('CLS observation not supported:', error)
    }
  }

  /**
   * Observe First Contentful Paint (FCP)
   */
  private observeFCP(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')

        if (fcpEntry) {
          this.metrics = {
            ...this.metrics,
            fcp: fcpEntry.startTime
          } as PerformanceMetrics
        }
      })

      observer.observe({ entryTypes: ['paint'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('FCP observation not supported:', error)
    }
  }

  /**
   * Observe Time to First Byte (TTFB)
   */
  private observeTTFB(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const navigationEntry = entries.find(entry => entry.entryType === 'navigation') as PerformanceNavigationTiming

        if (navigationEntry) {
          this.metrics = {
            ...this.metrics,
            ttfb: navigationEntry.responseStart - navigationEntry.requestStart
          } as PerformanceMetrics
        }
      })

      observer.observe({ entryTypes: ['navigation'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('TTFB observation not supported:', error)
    }
  }

  /**
   * Observe page load events
   */
  private observePageLoad(): void {
    if (typeof window === 'undefined') return

    window.addEventListener('load', () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

      if (navigationEntry) {
        this.metrics = {
          ...this.metrics,
          loadTime: navigationEntry.loadEventEnd - navigationEntry.fetchStart,
          domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart
        } as PerformanceMetrics
      }
    })
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics | null {
    return this.metrics
  }

  /**
   * Generate performance report
   */
  public generateReport(): PerformanceReport {
    if (!this.metrics) {
      return {
        metrics: {
          lcp: 0,
          fid: 0,
          cls: 0,
          ttfb: 0,
          fcp: 0,
          loadTime: 0,
          domContentLoaded: 0
        },
        score: 0,
        recommendations: ['No performance data available'],
        timestamp: new Date()
      }
    }

    const score = this.calculateScore(this.metrics)
    const recommendations = this.generateRecommendations(this.metrics)

    return {
      metrics: this.metrics,
      score,
      recommendations,
      timestamp: new Date()
    }
  }

  /**
   * Calculate overall performance score
   */
  private calculateScore(metrics: PerformanceMetrics): number {
    let score = 100

    // LCP scoring (0-2.5s is good)
    if (metrics.lcp > 4000) score -= 30
    else if (metrics.lcp > 2500) score -= 20
    else if (metrics.lcp > 1500) score -= 10

    // FID scoring (0-100ms is good)
    if (metrics.fid > 300) score -= 30
    else if (metrics.fid > 100) score -= 20
    else if (metrics.fid > 50) score -= 10

    // CLS scoring (0-0.1 is good)
    if (metrics.cls > 0.25) score -= 30
    else if (metrics.cls > 0.1) score -= 20
    else if (metrics.cls > 0.05) score -= 10

    // TTFB scoring (0-600ms is good)
    if (metrics.ttfb > 1500) score -= 20
    else if (metrics.ttfb > 1000) score -= 15
    else if (metrics.ttfb > 600) score -= 10

    // FCP scoring (0-1.8s is good)
    if (metrics.fcp > 3000) score -= 20
    else if (metrics.fcp > 1800) score -= 15
    else if (metrics.fcp > 1200) score -= 10

    return Math.max(0, score)
  }

  /**
   * Generate performance recommendations
   */
  private generateRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = []

    if (metrics.lcp > 2500) {
      recommendations.push('Optimize Largest Contentful Paint: Consider image optimization, lazy loading, and critical CSS')
    }

    if (metrics.fid > 100) {
      recommendations.push('Reduce First Input Delay: Minimize JavaScript execution time and use code splitting')
    }

    if (metrics.cls > 0.1) {
      recommendations.push('Improve Cumulative Layout Shift: Reserve space for images and avoid dynamic content insertion')
    }

    if (metrics.ttfb > 600) {
      recommendations.push('Optimize Time to First Byte: Improve server response time and use CDN')
    }

    if (metrics.fcp > 1800) {
      recommendations.push('Improve First Contentful Paint: Optimize critical rendering path and reduce render-blocking resources')
    }

    if (metrics.loadTime > 3000) {
      recommendations.push('Reduce page load time: Optimize images, minify CSS/JS, and use compression')
    }

    if (recommendations.length === 0) {
      recommendations.push('Performance is excellent! Keep up the good work.')
    }

    return recommendations
  }

  /**
   * Clean up observers
   */
  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    console.log('Performance monitoring cleaned up')
  }

  /**
   * Test performance monitoring
   */
  public test(): boolean {
    try {
      console.log('Testing performance monitoring...')

      // Simulate some metrics for testing
      this.metrics = {
        lcp: 1200,
        fid: 50,
        cls: 0.05,
        ttfb: 300,
        fcp: 800,
        loadTime: 1500,
        domContentLoaded: 1000
      }

      const report = this.generateReport()
      console.log('Performance test completed:', report)

      return true
    } catch (error) {
      console.error('Performance test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance()
