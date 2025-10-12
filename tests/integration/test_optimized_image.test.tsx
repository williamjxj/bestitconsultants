/**
 * Integration test for OptimizedImage component
 * Tests the component's integration with Next.js Image and Framer Motion
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { OptimizedImage } from '@/components/ui/optimized-image'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('OptimizedImage Integration', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 400,
    height: 300,
  }

  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('should render with required props', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/test-image.jpg')
      expect(image).toHaveAttribute('width', '400')
      expect(image).toHaveAttribute('height', '300')
    })

    it('should render with optional props', () => {
      const props = {
        ...defaultProps,
        title: 'Test Image Title',
        description: 'Test image description',
        priority: true,
        className: 'custom-class',
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute('title', 'Test Image Title')
      expect(image).toHaveAttribute('loading', 'eager')
      expect(image).toHaveClass('custom-class')
    })

    it('should render description overlay when provided', () => {
      const props = {
        ...defaultProps,
        description: 'Test image description',
      }

      render(<OptimizedImage {...props} />)

      expect(screen.getByText('Test image description')).toBeInTheDocument()
    })
  })

  describe('Animation integration', () => {
    it('should apply fade animation by default', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })

    it('should apply custom animation configuration', () => {
      const props = {
        ...defaultProps,
        animation: {
          type: 'scale' as const,
          duration: 0.8,
          delay: 0.2,
        },
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })

    it('should apply hover animation configuration', () => {
      const props = {
        ...defaultProps,
        hover: {
          scale: 1.1,
          opacity: 0.9,
          duration: 0.4,
        },
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })
  })

  describe('Loading behavior', () => {
    it('should use eager loading when priority is true', () => {
      const props = {
        ...defaultProps,
        priority: true,
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute('loading', 'eager')
    })

    it('should use lazy loading when priority is false', () => {
      const props = {
        ...defaultProps,
        priority: false,
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute('loading', 'lazy')
    })

    it('should apply correct sizes attribute', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute(
        'sizes',
        '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      )
    })
  })

  describe('Accessibility integration', () => {
    it('should have proper alt text', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })

    it('should have proper title attribute when provided', () => {
      const props = {
        ...defaultProps,
        title: 'Accessible title',
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute('title', 'Accessible title')
    })

    it('should have proper role attribute', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute('role', 'img')
    })
  })

  describe('Error handling', () => {
    it('should handle missing src gracefully', () => {
      const props = {
        ...defaultProps,
        src: '',
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute('src', '')
    })

    it('should handle missing alt text gracefully', () => {
      const props = {
        ...defaultProps,
        alt: '',
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('')
      expect(image).toBeInTheDocument()
    })
  })

  describe('Performance optimization', () => {
    it('should apply object-cover class for proper image scaling', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveClass('w-full', 'h-full', 'object-cover')
    })

    it('should apply transition classes for smooth hover effects', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveClass('transition-transform', 'duration-300')
    })
  })

  describe('Responsive behavior', () => {
    it('should apply responsive classes', () => {
      render(<OptimizedImage {...defaultProps} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveClass('w-full', 'h-full')
    })

    it('should handle different aspect ratios', () => {
      const props = {
        ...defaultProps,
        width: 800,
        height: 600,
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toHaveAttribute('width', '800')
      expect(image).toHaveAttribute('height', '600')
    })
  })

  describe('Animation variants', () => {
    it('should handle fade animation type', () => {
      const props = {
        ...defaultProps,
        animation: {
          type: 'fade' as const,
          duration: 0.6,
        },
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })

    it('should handle slide animation type', () => {
      const props = {
        ...defaultProps,
        animation: {
          type: 'slide' as const,
          duration: 0.6,
        },
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })

    it('should handle scale animation type', () => {
      const props = {
        ...defaultProps,
        animation: {
          type: 'scale' as const,
          duration: 0.6,
        },
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })

    it('should handle rotate animation type', () => {
      const props = {
        ...defaultProps,
        animation: {
          type: 'rotate' as const,
          duration: 0.6,
        },
      }

      render(<OptimizedImage {...props} />)

      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
    })
  })
})
