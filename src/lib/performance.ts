// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Measure Core Web Vitals
  measureCoreWebVitals(): void {
    if (typeof window === 'undefined') return

    // Largest Contentful Paint (LCP)
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.set('LCP', lastEntry.startTime)
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries()
      entries.forEach(entry => {
        this.metrics.set('FID', entry.processingStart - entry.startTime)
      })
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver(entryList => {
      const entries = entryList.getEntries()
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          this.metrics.set('CLS', clsValue)
        }
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }

  // Get performance metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  // Check if metrics meet Core Web Vitals thresholds
  checkCoreWebVitals(): {
    lcp: { value: number; status: 'good' | 'needs-improvement' | 'poor' }
    fid: { value: number; status: 'good' | 'needs-improvement' | 'poor' }
    cls: { value: number; status: 'good' | 'needs-improvement' | 'poor' }
  } {
    const lcp = this.metrics.get('LCP') || 0
    const fid = this.metrics.get('FID') || 0
    const cls = this.metrics.get('CLS') || 0

    return {
      lcp: {
        value: lcp,
        status:
          lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor',
      },
      fid: {
        value: fid,
        status: fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor',
      },
      cls: {
        value: cls,
        status:
          cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs-improvement' : 'poor',
      },
    }
  }

  // Log performance metrics
  logMetrics(): void {
    const metrics = this.getMetrics()
    const coreWebVitals = this.checkCoreWebVitals()

    console.log('Performance Metrics:', metrics)
    console.log('Core Web Vitals:', coreWebVitals)
  }
}

// Image optimization utilities
export const optimizeImage = (
  src: string,
  width?: number,
  height?: number,
  quality?: number
): string => {
  if (typeof window === 'undefined') return src

  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  if (quality) params.set('q', quality.toString())

  return `${src}?${params.toString()}`
}

// Bundle size monitoring
export const monitorBundleSize = (): void => {
  if (typeof window === 'undefined') return

  const observer = new PerformanceObserver(list => {
    const entries = list.getEntries()
    entries.forEach(entry => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming
        console.log('Bundle size metrics:', {
          domContentLoaded:
            navEntry.domContentLoadedEventEnd -
            navEntry.domContentLoadedEventStart,
          loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
          totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
        })
      }
    })
  })

  observer.observe({ entryTypes: ['navigation'] })
}

// Initialize performance monitoring
export const initializePerformanceMonitoring = (): void => {
  const monitor = PerformanceMonitor.getInstance()
  monitor.measureCoreWebVitals()
  monitorBundleSize()

  // Log metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      monitor.logMetrics()
    }, 1000)
  })
}
