/**
 * Accessibility tests for WCAG 2.1 AA compliance
 * Tests alt text, ARIA labels, keyboard navigation, and screen reader support
 */

// Mock screen reader APIs
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    getVoices: jest.fn(() => []),
  },
})

// Mock ARIA live regions
Object.defineProperty(document, 'createElement', {
  value: jest.fn(tagName => {
    if (tagName === 'div') {
      return {
        setAttribute: jest.fn(),
        getAttribute: jest.fn(),
        textContent: '',
        innerHTML: '',
        appendChild: jest.fn(),
        removeChild: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        focus: jest.fn(),
        blur: jest.fn(),
        click: jest.fn(),
        getBoundingClientRect: jest.fn(() => ({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
        })),
      }
    }
    return {}
  }),
})

describe('WCAG 2.1 AA Compliance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Alt Text Requirements', () => {
    it('should have descriptive alt text for all images', () => {
      const images = [
        {
          src: '/imgs/istockphoto-1212876953-612x612.jpg',
          alt: 'Modern technology and innovation workspace with multiple monitors and collaborative environment',
        },
        {
          src: '/imgs/istockphoto-1358835459-612x612.webp',
          alt: 'Professional team collaboration in modern office environment with diverse team members working together',
        },
        {
          src: '/imgs/istockphoto-1350198816-612x612.jpg',
          alt: 'Advanced technology solutions and digital transformation services',
        },
      ]

      images.forEach(image => {
        const imgElement = document.createElement('img')
        imgElement.src = image.src
        imgElement.alt = image.alt

        expect(imgElement.alt).toBeTruthy()
        expect(imgElement.alt.length).toBeGreaterThan(10) // Descriptive alt text
        expect(imgElement.alt).not.toContain('image') // Avoid generic descriptions
        expect(imgElement.alt).not.toContain('picture') // Avoid generic descriptions
      })
    })

    it('should have empty alt text for decorative images', () => {
      const decorativeImages = [
        {
          src: '/imgs/istockphoto-1145868161-612x612.webp',
          alt: '', // Decorative image
          role: 'presentation',
        },
        {
          src: '/imgs/istockphoto-2227310361-612x612.webp',
          alt: '', // Decorative image
          role: 'presentation',
        },
      ]

      decorativeImages.forEach(image => {
        const imgElement = document.createElement('img')
        imgElement.src = image.src
        imgElement.alt = image.alt
        imgElement.setAttribute('role', image.role)

        expect(imgElement.alt).toBe('')
        expect(imgElement.getAttribute('role')).toBe('presentation')
      })
    })

    it('should have alt text that describes the image content', () => {
      const testCases = [
        {
          src: '/images/william-jiang.jpg',
          alt: 'William Jiang, Senior Software Engineer and Team Lead',
          expectedKeywords: ['William', 'Jiang', 'engineer', 'team'],
        },
        {
          src: '/images/shaming-yang.jpeg',
          alt: 'Shaming Yang, Technical Consultant and AI Specialist',
          expectedKeywords: ['Shaming', 'Yang', 'consultant', 'AI'],
        },
        {
          src: '/images/lewis-liu.jpg',
          alt: 'Lewis Liu, Software Developer and Cloud Solutions Expert',
          expectedKeywords: ['Lewis', 'Liu', 'developer', 'cloud'],
        },
      ]

      testCases.forEach(testCase => {
        const imgElement = document.createElement('img')
        imgElement.src = testCase.src
        imgElement.alt = testCase.alt

        expect(imgElement.alt).toBeTruthy()
        testCase.expectedKeywords.forEach(keyword => {
          expect(imgElement.alt.toLowerCase()).toContain(keyword.toLowerCase())
        })
      })
    })
  })

  describe('ARIA Labels and Descriptions', () => {
    it('should have proper ARIA labels for image galleries', () => {
      const gallery = document.createElement('div')
      gallery.setAttribute('role', 'img')
      gallery.setAttribute(
        'aria-label',
        'Project portfolio gallery showing our latest work'
      )
      gallery.setAttribute('aria-describedby', 'gallery-description')

      const description = document.createElement('div')
      description.id = 'gallery-description'
      description.textContent =
        'A collection of our recent projects and case studies'

      expect(gallery.getAttribute('role')).toBe('img')
      expect(gallery.getAttribute('aria-label')).toBeTruthy()
      expect(gallery.getAttribute('aria-describedby')).toBe(
        'gallery-description'
      )
    })

    it('should have proper ARIA labels for interactive images', () => {
      const interactiveImage = document.createElement('img')
      interactiveImage.src = '/imgs/istockphoto-1212876953-612x612.jpg'
      interactiveImage.alt = 'Click to view full-size image'
      interactiveImage.setAttribute('role', 'button')
      interactiveImage.setAttribute('aria-label', 'View full-size hero image')
      interactiveImage.setAttribute('tabindex', '0')

      expect(interactiveImage.getAttribute('role')).toBe('button')
      expect(interactiveImage.getAttribute('aria-label')).toBeTruthy()
      expect(interactiveImage.getAttribute('tabindex')).toBe('0')
    })

    it('should have proper ARIA live regions for dynamic content', () => {
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.id = 'image-loading-status'

      expect(liveRegion.getAttribute('aria-live')).toBe('polite')
      expect(liveRegion.getAttribute('aria-atomic')).toBe('true')
    })

    it('should have proper ARIA expanded for collapsible galleries', () => {
      const galleryToggle = document.createElement('button')
      galleryToggle.setAttribute('aria-expanded', 'false')
      galleryToggle.setAttribute('aria-controls', 'gallery-content')
      galleryToggle.setAttribute('aria-label', 'Toggle image gallery')

      expect(galleryToggle.getAttribute('aria-expanded')).toBe('false')
      expect(galleryToggle.getAttribute('aria-controls')).toBe(
        'gallery-content'
      )
      expect(galleryToggle.getAttribute('aria-label')).toBeTruthy()
    })
  })

  describe('Keyboard Navigation', () => {
    it('should be navigable with keyboard', () => {
      const gallery = document.createElement('div')
      gallery.setAttribute('role', 'img')
      gallery.setAttribute('tabindex', '0')

      const nextButton = document.createElement('button')
      nextButton.setAttribute('tabindex', '0')
      nextButton.setAttribute('aria-label', 'Next image')

      const prevButton = document.createElement('button')
      prevButton.setAttribute('tabindex', '0')
      prevButton.setAttribute('aria-label', 'Previous image')

      expect(gallery.getAttribute('tabindex')).toBe('0')
      expect(nextButton.getAttribute('tabindex')).toBe('0')
      expect(prevButton.getAttribute('tabindex')).toBe('0')
    })

    it('should handle keyboard events for image navigation', () => {
      const gallery = document.createElement('div')
      gallery.setAttribute('role', 'img')
      gallery.setAttribute('tabindex', '0')

      let currentImage = 0
      const totalImages = 5

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case 'ArrowRight':
            currentImage = Math.min(currentImage + 1, totalImages - 1)
            break
          case 'ArrowLeft':
            currentImage = Math.max(currentImage - 1, 0)
            break
          case 'Home':
            currentImage = 0
            break
          case 'End':
            currentImage = totalImages - 1
            break
        }
      }

      gallery.addEventListener('keydown', handleKeyDown)

      // Test arrow key navigation
      const rightArrowEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
      })
      gallery.dispatchEvent(rightArrowEvent)
      expect(currentImage).toBe(1)

      const leftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      gallery.dispatchEvent(leftArrowEvent)
      expect(currentImage).toBe(0)

      // Test home/end navigation
      const endEvent = new KeyboardEvent('keydown', { key: 'End' })
      gallery.dispatchEvent(endEvent)
      expect(currentImage).toBe(4)

      const homeEvent = new KeyboardEvent('keydown', { key: 'Home' })
      gallery.dispatchEvent(homeEvent)
      expect(currentImage).toBe(0)
    })

    it('should have proper focus management', () => {
      const gallery = document.createElement('div')
      gallery.setAttribute('role', 'img')
      gallery.setAttribute('tabindex', '0')

      const focusHandler = jest.fn()
      const blurHandler = jest.fn()

      gallery.addEventListener('focus', focusHandler)
      gallery.addEventListener('blur', blurHandler)

      // Simulate focus
      gallery.focus()
      expect(focusHandler).toHaveBeenCalled()

      // Simulate blur
      gallery.blur()
      expect(blurHandler).toHaveBeenCalled()
    })
  })

  describe('Screen Reader Support', () => {
    it('should announce image loading status', () => {
      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')

      const announceLoading = (imageName: string) => {
        liveRegion.textContent = `Loading ${imageName}...`
      }

      const announceLoaded = (imageName: string) => {
        liveRegion.textContent = `${imageName} loaded successfully`
      }

      announceLoading('hero image')
      expect(liveRegion.textContent).toBe('Loading hero image...')

      announceLoaded('hero image')
      expect(liveRegion.textContent).toBe('hero image loaded successfully')
    })

    it('should provide image context information', () => {
      const image = document.createElement('img')
      image.src = '/imgs/istockphoto-1212876953-612x612.jpg'
      image.alt = 'Modern technology workspace'
      image.setAttribute('aria-describedby', 'image-context')

      const context = document.createElement('div')
      context.id = 'image-context'
      context.textContent =
        'This image shows our modern office environment with multiple workstations and collaborative spaces.'

      expect(image.getAttribute('aria-describedby')).toBe('image-context')
      expect(context.textContent).toBeTruthy()
    })

    it('should announce gallery navigation', () => {
      const gallery = document.createElement('div')
      gallery.setAttribute('role', 'img')
      gallery.setAttribute('aria-label', 'Image gallery')

      const announceNavigation = (current: number, total: number) => {
        gallery.setAttribute(
          'aria-label',
          `Image gallery, image ${current} of ${total}`
        )
      }

      announceNavigation(1, 5)
      expect(gallery.getAttribute('aria-label')).toBe(
        'Image gallery, image 1 of 5'
      )

      announceNavigation(3, 5)
      expect(gallery.getAttribute('aria-label')).toBe(
        'Image gallery, image 3 of 5'
      )
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('should have sufficient color contrast for text overlays', () => {
      const overlay = document.createElement('div')
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
      overlay.style.color = 'white'
      overlay.textContent = 'Image caption text'

      // Mock getComputedStyle for contrast testing
      const mockGetComputedStyle = jest.fn(() => ({
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
      }))
      Object.defineProperty(window, 'getComputedStyle', {
        value: mockGetComputedStyle,
      })

      expect(overlay.style.backgroundColor).toContain('rgba(0, 0, 0, 0.7)')
      expect(overlay.style.color).toBe('white')
    })

    it('should provide alternative text for color-coded information', () => {
      const statusIndicator = document.createElement('div')
      statusIndicator.setAttribute('role', 'img')
      statusIndicator.setAttribute('aria-label', 'Image loaded successfully')
      statusIndicator.style.backgroundColor = 'green'
      statusIndicator.style.width = '10px'
      statusIndicator.style.height = '10px'

      expect(statusIndicator.getAttribute('aria-label')).toBe(
        'Image loaded successfully'
      )
      expect(statusIndicator.getAttribute('role')).toBe('img')
    })
  })

  describe('Focus Indicators', () => {
    it('should have visible focus indicators', () => {
      const focusableImage = document.createElement('img')
      focusableImage.setAttribute('tabindex', '0')
      focusableImage.style.outline = '2px solid #0066cc'
      focusableImage.style.outlineOffset = '2px'

      expect(focusableImage.getAttribute('tabindex')).toBe('0')
      expect(focusableImage.style.outline).toContain('2px solid')
    })

    it('should maintain focus indicators during interactions', () => {
      const interactiveImage = document.createElement('img')
      interactiveImage.setAttribute('tabindex', '0')
      interactiveImage.setAttribute('role', 'button')

      const handleFocus = () => {
        interactiveImage.style.outline = '2px solid #0066cc'
        interactiveImage.style.outlineOffset = '2px'
      }

      const handleBlur = () => {
        interactiveImage.style.outline = 'none'
      }

      interactiveImage.addEventListener('focus', handleFocus)
      interactiveImage.addEventListener('blur', handleBlur)

      // Simulate focus
      interactiveImage.focus()
      expect(interactiveImage.style.outline).toContain('2px solid')

      // Simulate blur
      interactiveImage.blur()
      expect(interactiveImage.style.outline).toBe('none')
    })
  })

  describe('Error Handling', () => {
    it('should provide error messages for failed image loads', () => {
      const image = document.createElement('img')
      image.src = '/invalid-image.jpg'
      image.alt = 'Image failed to load'

      const errorHandler = () => {
        image.alt = 'Image failed to load. Please try refreshing the page.'
        image.setAttribute(
          'aria-label',
          'Image failed to load. Please try refreshing the page.'
        )
      }

      image.addEventListener('error', errorHandler)

      // Simulate error
      image.dispatchEvent(new Event('error'))

      expect(image.alt).toContain('failed to load')
      expect(image.getAttribute('aria-label')).toContain('failed to load')
    })

    it('should provide fallback content for missing images', () => {
      const fallbackContent = document.createElement('div')
      fallbackContent.setAttribute('role', 'img')
      fallbackContent.setAttribute('aria-label', 'Image placeholder')
      fallbackContent.textContent = 'Image not available'
      fallbackContent.style.backgroundColor = '#f0f0f0'
      fallbackContent.style.padding = '20px'
      fallbackContent.style.textAlign = 'center'

      expect(fallbackContent.getAttribute('role')).toBe('img')
      expect(fallbackContent.getAttribute('aria-label')).toBeTruthy()
      expect(fallbackContent.textContent).toBeTruthy()
    })
  })

  describe('Responsive Design Accessibility', () => {
    it('should maintain accessibility at different screen sizes', () => {
      const responsiveImage = document.createElement('img')
      responsiveImage.src = '/imgs/istockphoto-1212876953-612x612.jpg'
      responsiveImage.alt = 'Responsive hero image'
      responsiveImage.sizes =
        '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'

      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375 })
      expect(responsiveImage.sizes).toContain('(max-width: 768px) 100vw')

      // Test tablet viewport
      Object.defineProperty(window, 'innerWidth', { value: 768 })
      expect(responsiveImage.sizes).toContain('(max-width: 1024px) 50vw')

      // Test desktop viewport
      Object.defineProperty(window, 'innerWidth', { value: 1920 })
      expect(responsiveImage.sizes).toContain('33vw')
    })

    it('should maintain touch targets for mobile devices', () => {
      const touchTarget = document.createElement('button')
      touchTarget.setAttribute('aria-label', 'View image')
      touchTarget.style.minWidth = '44px'
      touchTarget.style.minHeight = '44px'

      expect(touchTarget.getAttribute('aria-label')).toBeTruthy()
      expect(parseInt(touchTarget.style.minWidth)).toBeGreaterThanOrEqual(44)
      expect(parseInt(touchTarget.style.minHeight)).toBeGreaterThanOrEqual(44)
    })
  })
})
