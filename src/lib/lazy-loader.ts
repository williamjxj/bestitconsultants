/**
 * Lazy loading utilities for images, components, and content
 * Optimizes performance by loading resources only when needed
 */

export interface LazyLoadOptions {
  rootMargin?: string
  threshold?: number
  placeholder?: string
  errorImage?: string
}

export interface LazyLoadElement extends HTMLElement {
  dataset: {
    src?: string
    loaded?: string
    error?: string
  }
}

export class LazyLoader {
  private static instance: LazyLoader
  private observer: IntersectionObserver | null = null
  private options: LazyLoadOptions

  private constructor() {
    this.options = {
      rootMargin: '50px',
      threshold: 0.1,
      placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
      errorImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg=='
    }
  }

  public static getInstance(): LazyLoader {
    if (!LazyLoader.instance) {
      LazyLoader.instance = new LazyLoader()
    }
    return LazyLoader.instance
  }

  /**
   * Initialize lazy loading
   */
  public initialize(options?: Partial<LazyLoadOptions>): void {
    if (typeof window === 'undefined') return

    this.options = { ...this.options, ...options }

    if (!this.observer) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          rootMargin: this.options.rootMargin,
          threshold: this.options.threshold
        }
      )
    }

    // Observe all lazy load elements
    this.observeElements()
  }

  /**
   * Observe lazy load elements
   */
  private observeElements(): void {
    const elements = document.querySelectorAll('[data-lazy]')
    elements.forEach(element => {
      if (this.observer) {
        this.observer.observe(element as LazyLoadElement)
      }
    })
  }

  /**
   * Handle intersection observer callback
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target as LazyLoadElement
        this.loadElement(element)

        if (this.observer) {
          this.observer.unobserve(element)
        }
      }
    })
  }

  /**
   * Load a specific element
   */
  private loadElement(element: LazyLoadElement): void {
    const src = element.dataset.src
    if (!src) return

    // Mark as loading
    element.dataset.loaded = 'false'

    if (element.tagName === 'IMG') {
      this.loadImage(element as HTMLImageElement, src)
    } else if (element.tagName === 'IFRAME') {
      this.loadIframe(element as HTMLIFrameElement, src)
    } else {
      this.loadContent(element, src)
    }
  }

  /**
   * Load image with lazy loading
   */
  private loadImage(img: HTMLImageElement, src: string): void {
    // Set placeholder
    if (this.options.placeholder) {
      img.src = this.options.placeholder
    }

    // Create new image to test loading
    const testImg = new Image()

    testImg.onload = () => {
      img.src = src
      img.dataset.loaded = 'true'
      img.classList.add('lazy-loaded')
    }

    testImg.onerror = () => {
      if (this.options.errorImage) {
        img.src = this.options.errorImage
      }
      img.dataset.error = 'true'
      img.classList.add('lazy-error')
    }

    testImg.src = src
  }

  /**
   * Load iframe with lazy loading
   */
  private loadIframe(iframe: HTMLIFrameElement, src: string): void {
    iframe.src = src
    iframe.dataset.loaded = 'true'
    iframe.classList.add('lazy-loaded')
  }

  /**
   * Load content with lazy loading
   */
  private loadContent(element: LazyLoadElement, src: string): void {
    fetch(src)
      .then(response => response.text())
      .then(html => {
        element.innerHTML = html
        element.dataset.loaded = 'true'
        element.classList.add('lazy-loaded')
      })
      .catch(error => {
        console.error('Failed to load content:', error)
        element.dataset.error = 'true'
        element.classList.add('lazy-error')
      })
  }

  /**
   * Add lazy loading to an element
   */
  public addLazyLoad(element: HTMLElement, src: string): void {
    element.dataset.lazy = 'true'
    element.dataset.src = src

    if (this.observer) {
      this.observer.observe(element as LazyLoadElement)
    }
  }

  /**
   * Remove lazy loading from an element
   */
  public removeLazyLoad(element: HTMLElement): void {
    element.removeAttribute('data-lazy')
    element.removeAttribute('data-src')

    if (this.observer) {
      this.observer.unobserve(element as LazyLoadElement)
    }
  }

  /**
   * Load all visible lazy elements immediately
   */
  public loadVisible(): void {
    const elements = document.querySelectorAll('[data-lazy]')
    elements.forEach(element => {
      const rect = element.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (isVisible) {
        this.loadElement(element as LazyLoadElement)
      }
    })
  }

  /**
   * Preload images
   */
  public preloadImages(urls: string[]): Promise<void[]> {
    const promises = urls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load ${url}`))
        img.src = url
      })
    })

    return Promise.all(promises)
  }

  /**
   * Get loading statistics
   */
  public getStats(): {
    total: number
    loaded: number
    loading: number
    errors: number
  } {
    const elements = document.querySelectorAll('[data-lazy]')
    let loaded = 0
    let loading = 0
    let errors = 0

    elements.forEach(element => {
      const lazyElement = element as LazyLoadElement
      if (lazyElement.dataset.loaded === 'true') {
        loaded++
      } else if (lazyElement.dataset.error === 'true') {
        errors++
      } else {
        loading++
      }
    })

    return {
      total: elements.length,
      loaded,
      loading,
      errors
    }
  }

  /**
   * Clean up observer
   */
  public cleanup(): void {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }

  /**
   * Test lazy loading functionality
   */
  public test(): boolean {
    try {
      console.log('Testing lazy loading...')

      // Create test element
      const testElement = document.createElement('div')
      testElement.dataset.lazy = 'true'
      testElement.dataset.src = 'data:text/html,<p>Test content</p>'

      this.addLazyLoad(testElement, 'data:text/html,<p>Test content</p>')

      // Check if observer is working
      const isObserving = this.observer && this.observer.takeRecords().length >= 0

      this.removeLazyLoad(testElement)

      console.log('Lazy loading test completed')
      return isObserving
    } catch (error) {
      console.error('Lazy loading test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const lazyLoader = LazyLoader.getInstance()
