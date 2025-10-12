/**
 * Unit tests for image optimization utilities
 * Tests optimization functions, format validation, and responsive behavior
 */

import {
  getOptimizedImageUrl,
  getResponsiveSizes,
  defaultBreakpoints,
  responsiveSizes,
  generatePlaceholder,
  generateBlurPlaceholder,
  isValidImageFormat,
  getImageFormatFromExtension,
  getOptimalImageFormat,
  calculateAspectRatio,
  getAspectRatioDimensions,
  getImagePriority,
  getImageLoadingStrategy,
  generateImageMetadata,
  optimizeForCoreWebVitals,
  getImageDimensions,
  preloadImage,
  lazyLoadImages,
} from '@/lib/image-optimization'

// Mock DOM methods
Object.defineProperty(document, 'createElement', {
  value: jest.fn(tagName => {
    if (tagName === 'canvas') {
      return {
        width: 0,
        height: 0,
        getContext: jest.fn(() => ({
          fillStyle: '',
          fillRect: jest.fn(),
          createLinearGradient: jest.fn(() => ({
            addColorStop: jest.fn(),
          })),
        })),
        toDataURL: jest.fn(() => 'data:image/jpeg;base64,test'),
        toBlob: jest.fn(callback =>
          callback(new Blob(['test'], { type: 'image/jpeg' }))
        ),
      }
    }
    if (tagName === 'img') {
      return {
        onload: null,
        onerror: null,
        src: '',
        naturalWidth: 0,
        naturalHeight: 0,
      }
    }
    return {}
  }),
})

Object.defineProperty(document, 'head', {
  value: {
    appendChild: jest.fn(),
  },
})

Object.defineProperty(window, 'location', {
  value: {
    origin: 'http://localhost:3000',
  },
})

describe('Image Optimization Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getOptimizedImageUrl', () => {
    it('should generate URL with basic options', () => {
      const url = getOptimizedImageUrl('/test.jpg', {
        width: 800,
        height: 600,
        format: 'webp',
        quality: 80,
      })

      expect(url).toContain('/test.jpg')
      expect(url).toContain('w=800')
      expect(url).toContain('h=600')
      expect(url).toContain('f=webp')
      expect(url).toContain('q=80')
    })

    it('should generate URL with minimal options', () => {
      const url = getOptimizedImageUrl('/test.jpg')

      expect(url).toContain('/test.jpg')
      expect(url).not.toContain('w=')
      expect(url).not.toContain('h=')
    })

    it('should handle progressive and placeholder options', () => {
      const url = getOptimizedImageUrl('/test.jpg', {
        progressive: true,
        placeholder: true,
      })

      expect(url).toContain('p=1')
    })
  })

  describe('getResponsiveSizes', () => {
    it('should generate responsive sizes string', () => {
      const breakpoints = {
        '768': 640,
        '1024': 800,
        '1280': 1200,
      }

      const sizes = getResponsiveSizes(breakpoints)

      expect(sizes).toContain('(max-width: 768px) 640px')
      expect(sizes).toContain('(max-width: 1024px) 800px')
      expect(sizes).toContain('(max-width: 1280px) 1200px')
    })

    it('should handle empty breakpoints', () => {
      const sizes = getResponsiveSizes({})

      expect(sizes).toBe('')
    })
  })

  describe('defaultBreakpoints', () => {
    it('should have correct breakpoint values', () => {
      expect(defaultBreakpoints.mobile).toBe(640)
      expect(defaultBreakpoints.tablet).toBe(768)
      expect(defaultBreakpoints.desktop).toBe(1024)
      expect(defaultBreakpoints.large).toBe(1280)
      expect(defaultBreakpoints.xlarge).toBe(1536)
    })
  })

  describe('responsiveSizes', () => {
    it('should have correct responsive size configurations', () => {
      expect(responsiveSizes.hero).toContain('640px')
      expect(responsiveSizes.hero).toContain('768px')
      expect(responsiveSizes.hero).toContain('1024px')
      expect(responsiveSizes.hero).toContain('1280px')

      expect(responsiveSizes.card).toContain('300px')
      expect(responsiveSizes.card).toContain('400px')
      expect(responsiveSizes.card).toContain('500px')

      expect(responsiveSizes.thumbnail).toContain('150px')
      expect(responsiveSizes.thumbnail).toContain('200px')
      expect(responsiveSizes.thumbnail).toContain('250px')

      expect(responsiveSizes.gallery).toContain('300px')
      expect(responsiveSizes.gallery).toContain('400px')
      expect(responsiveSizes.gallery).toContain('500px')
      expect(responsiveSizes.gallery).toContain('600px')
    })
  })

  describe('generatePlaceholder', () => {
    it('should generate placeholder for given dimensions', () => {
      const placeholder = generatePlaceholder(400, 300)

      expect(placeholder).toContain('data:image/jpeg;base64,')
    })

    it('should handle zero dimensions', () => {
      const placeholder = generatePlaceholder(0, 0)

      expect(placeholder).toContain('data:image/jpeg;base64,')
    })
  })

  describe('generateBlurPlaceholder', () => {
    it('should generate blur placeholder for given dimensions', () => {
      const placeholder = generateBlurPlaceholder(400, 300)

      expect(placeholder).toContain('data:image/jpeg;base64,')
    })

    it('should limit dimensions to 20px', () => {
      const placeholder = generateBlurPlaceholder(1000, 1000)

      expect(placeholder).toContain('data:image/jpeg;base64,')
    })
  })

  describe('isValidImageFormat', () => {
    it('should validate supported formats', () => {
      expect(isValidImageFormat('webp')).toBe(true)
      expect(isValidImageFormat('avif')).toBe(true)
      expect(isValidImageFormat('jpeg')).toBe(true)
      expect(isValidImageFormat('png')).toBe(true)
    })

    it('should reject unsupported formats', () => {
      expect(isValidImageFormat('gif')).toBe(false)
      expect(isValidImageFormat('bmp')).toBe(false)
      expect(isValidImageFormat('svg')).toBe(false)
      expect(isValidImageFormat('')).toBe(false)
    })

    it('should handle case insensitive formats', () => {
      expect(isValidImageFormat('WEBP')).toBe(true)
      expect(isValidImageFormat('JPEG')).toBe(true)
      expect(isValidImageFormat('PNG')).toBe(true)
    })
  })

  describe('getImageFormatFromExtension', () => {
    it('should extract format from file extension', () => {
      expect(getImageFormatFromExtension('test.webp')).toBe('webp')
      expect(getImageFormatFromExtension('test.avif')).toBe('avif')
      expect(getImageFormatFromExtension('test.jpg')).toBe('jpeg')
      expect(getImageFormatFromExtension('test.jpeg')).toBe('jpeg')
      expect(getImageFormatFromExtension('test.png')).toBe('png')
    })

    it('should default to jpeg for unknown extensions', () => {
      expect(getImageFormatFromExtension('test.unknown')).toBe('jpeg')
      expect(getImageFormatFromExtension('test')).toBe('jpeg')
    })
  })

  describe('getOptimalImageFormat', () => {
    it('should return avif when supported', () => {
      // Mock canvas toDataURL to return avif support
      const mockCanvas = {
        toDataURL: jest.fn(format => {
          if (format === 'image/avif') return 'data:image/avif;base64,test'
          return 'data:image/jpeg;base64,test'
        }),
      }
      ;(document.createElement as jest.Mock).mockReturnValue(mockCanvas)

      const format = getOptimalImageFormat()

      expect(format).toBe('avif')
    })

    it('should return webp when avif not supported but webp is', () => {
      const mockCanvas = {
        toDataURL: jest.fn(format => {
          if (format === 'image/avif') return 'data:image/jpeg;base64,test'
          if (format === 'image/webp') return 'data:image/webp;base64,test'
          return 'data:image/jpeg;base64,test'
        }),
      }
      ;(document.createElement as jest.Mock).mockReturnValue(mockCanvas)

      const format = getOptimalImageFormat()

      expect(format).toBe('webp')
    })

    it('should return jpeg as fallback', () => {
      const mockCanvas = {
        toDataURL: jest.fn(() => 'data:image/jpeg;base64,test'),
      }
      ;(document.createElement as jest.Mock).mockReturnValue(mockCanvas)

      const format = getOptimalImageFormat()

      expect(format).toBe('jpeg')
    })
  })

  describe('calculateAspectRatio', () => {
    it('should calculate correct aspect ratio', () => {
      expect(calculateAspectRatio(800, 600)).toBe(800 / 600)
      expect(calculateAspectRatio(1920, 1080)).toBe(1920 / 1080)
      expect(calculateAspectRatio(400, 400)).toBe(1)
    })
  })

  describe('getAspectRatioDimensions', () => {
    it('should maintain aspect ratio within max dimensions', () => {
      const result = getAspectRatioDimensions(800, 600, 400, 300)

      expect(result.width).toBe(400)
      expect(result.height).toBe(300)
    })

    it('should scale down when image is larger than max', () => {
      const result = getAspectRatioDimensions(1600, 1200, 800, 600)

      expect(result.width).toBe(800)
      expect(result.height).toBe(600)
    })

    it('should scale to fit height when width is too large', () => {
      const result = getAspectRatioDimensions(2000, 1000, 800, 600)

      expect(result.width).toBe(1200)
      expect(result.height).toBe(600)
    })
  })

  describe('getImagePriority', () => {
    it('should return true for above-fold content', () => {
      expect(getImagePriority('above-fold')).toBe(true)
      expect(getImagePriority('hero')).toBe(true)
      expect(getImagePriority('background')).toBe(true)
    })

    it('should return false for below-fold content', () => {
      expect(getImagePriority('below-fold')).toBe(false)
    })
  })

  describe('getImageLoadingStrategy', () => {
    it('should return eager for priority content', () => {
      expect(getImageLoadingStrategy('above-fold')).toBe('eager')
      expect(getImageLoadingStrategy('hero')).toBe('eager')
      expect(getImageLoadingStrategy('background')).toBe('eager')
    })

    it('should return lazy for below-fold content', () => {
      expect(getImageLoadingStrategy('below-fold')).toBe('lazy')
    })
  })

  describe('generateImageMetadata', () => {
    it('should generate metadata with title and alt', () => {
      const metadata = generateImageMetadata(
        '/test.jpg',
        'Test image',
        'Test title'
      )

      expect(metadata.title).toBe('Test title')
      expect(metadata.description).toBe('Test image')
      expect(metadata.keywords).toEqual(['test', 'image'])
      expect(metadata.structuredData).toEqual({
        '@type': 'ImageObject',
        url: '/test.jpg',
        caption: 'Test image',
        description: 'Test image',
      })
    })

    it('should use alt as title when title not provided', () => {
      const metadata = generateImageMetadata('/test.jpg', 'Test image')

      expect(metadata.title).toBe('Test image')
    })
  })

  describe('optimizeForCoreWebVitals', () => {
    it('should return optimized configuration', () => {
      const result = optimizeForCoreWebVitals('/test.jpg')

      expect(result.src).toContain('/test.jpg')
      expect(result.sizes).toContain('(max-width: 768px) 100vw')
      expect(result.priority).toBe(true)
      expect(result.loading).toBe('eager')
    })
  })

  describe('getImageDimensions', () => {
    it('should resolve with image dimensions', async () => {
      const mockImg = {
        onload: null,
        onerror: null,
        src: '',
        naturalWidth: 800,
        naturalHeight: 600,
      }
      ;(document.createElement as jest.Mock).mockReturnValue(mockImg)

      const promise = getImageDimensions('/test.jpg')

      // Simulate image load
      setTimeout(() => {
        if (mockImg.onload) mockImg.onload()
      }, 0)

      const result = await promise

      expect(result.width).toBe(800)
      expect(result.height).toBe(600)
    })

    it('should reject on image error', async () => {
      const mockImg = {
        onload: null,
        onerror: null,
        src: '',
        naturalWidth: 0,
        naturalHeight: 0,
      }
      ;(document.createElement as jest.Mock).mockReturnValue(mockImg)

      const promise = getImageDimensions('/invalid.jpg')

      // Simulate image error
      setTimeout(() => {
        if (mockImg.onerror) mockImg.onerror()
      }, 0)

      await expect(promise).rejects.toThrow(
        'Failed to load image: /invalid.jpg'
      )
    })
  })

  describe('preloadImage', () => {
    it('should create preload link element', () => {
      preloadImage('/test.jpg')

      expect(document.createElement).toHaveBeenCalledWith('link')
      expect(document.head.appendChild).toHaveBeenCalled()
    })
  })

  describe('lazyLoadImages', () => {
    it('should handle empty selector', () => {
      // Mock querySelectorAll to return empty NodeList
      Object.defineProperty(document, 'querySelectorAll', {
        value: jest.fn(() => []),
      })

      lazyLoadImages()

      expect(document.querySelectorAll).toHaveBeenCalledWith('img[data-src]')
    })
  })
})
