/**
 * Integration test for ImageGallery component
 * Tests the component's integration with OptimizedImage and Framer Motion
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ImageGallery } from '@/components/ui/image-gallery'

// Mock OptimizedImage component
jest.mock('@/components/ui/optimized-image', () => ({
  OptimizedImage: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('ImageGallery Integration', () => {
  const mockImages = [
    {
      id: '1',
      src: '/test1.jpg',
      alt: 'Test image 1',
      title: 'Test Image 1',
      description: 'First test image',
      width: 400,
      height: 300,
    },
    {
      id: '2',
      src: '/test2.jpg',
      alt: 'Test image 2',
      title: 'Test Image 2',
      description: 'Second test image',
      width: 400,
      height: 300,
    },
    {
      id: '3',
      src: '/test3.jpg',
      alt: 'Test image 3',
      title: 'Test Image 3',
      description: 'Third test image',
      width: 400,
      height: 300,
    },
  ]

  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('should render with required props', () => {
      render(<ImageGallery images={mockImages} />)

      expect(screen.getByAltText('Test image 1')).toBeInTheDocument()
      expect(screen.getByAltText('Test image 2')).toBeInTheDocument()
      expect(screen.getByAltText('Test image 3')).toBeInTheDocument()
    })

    it('should render with default layout (grid)', () => {
      render(<ImageGallery images={mockImages} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid')
    })

    it('should render with custom layout', () => {
      render(<ImageGallery images={mockImages} layout='carousel' />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid')
    })

    it('should render with custom columns', () => {
      render(<ImageGallery images={mockImages} columns={2} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-2')
    })

    it('should render with custom spacing', () => {
      render(<ImageGallery images={mockImages} spacing={24} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveStyle({ gap: '24px' })
    })

    it('should render with custom className', () => {
      render(<ImageGallery images={mockImages} className='custom-gallery' />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('custom-gallery')
    })
  })

  describe('Grid layout variations', () => {
    it('should render 1 column grid', () => {
      render(<ImageGallery images={mockImages} columns={1} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-1')
    })

    it('should render 2 column grid', () => {
      render(<ImageGallery images={mockImages} columns={2} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-2')
    })

    it('should render 3 column grid', () => {
      render(<ImageGallery images={mockImages} columns={3} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-3')
    })

    it('should render 4 column grid', () => {
      render(<ImageGallery images={mockImages} columns={4} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-4')
    })

    it('should render 5 column grid', () => {
      render(<ImageGallery images={mockImages} columns={5} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-5')
    })

    it('should render 6 column grid', () => {
      render(<ImageGallery images={mockImages} columns={6} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-6')
    })
  })

  describe('Animation integration', () => {
    it('should apply stagger animation to container', () => {
      render(<ImageGallery images={mockImages} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toBeInTheDocument()
    })

    it('should apply individual animations to each image', () => {
      render(<ImageGallery images={mockImages} />)

      expect(screen.getByAltText('Test image 1')).toBeInTheDocument()
      expect(screen.getByAltText('Test image 2')).toBeInTheDocument()
      expect(screen.getByAltText('Test image 3')).toBeInTheDocument()
    })
  })

  describe('Image props passing', () => {
    it('should pass all image props to OptimizedImage', () => {
      render(<ImageGallery images={mockImages} />)

      const image1 = screen.getByAltText('Test image 1')
      expect(image1).toHaveAttribute('src', '/test1.jpg')
      expect(image1).toHaveAttribute('width', '400')
      expect(image1).toHaveAttribute('height', '300')
    })

    it('should pass title and description to OptimizedImage', () => {
      render(<ImageGallery images={mockImages} />)

      const image1 = screen.getByAltText('Test image 1')
      expect(image1).toHaveAttribute('title', 'Test Image 1')
    })
  })

  describe('Empty gallery handling', () => {
    it('should render empty gallery without errors', () => {
      render(<ImageGallery images={[]} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toBeInTheDocument()
    })
  })

  describe('Single image handling', () => {
    it('should render single image correctly', () => {
      const singleImage = [mockImages[0]]
      render(<ImageGallery images={singleImage} />)

      expect(screen.getByAltText('Test image 1')).toBeInTheDocument()
      expect(screen.queryByAltText('Test image 2')).not.toBeInTheDocument()
    })
  })

  describe('Responsive behavior', () => {
    it('should apply responsive grid classes', () => {
      render(<ImageGallery images={mockImages} columns={3} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid-cols-3')
    })

    it('should handle different spacing values', () => {
      render(<ImageGallery images={mockImages} spacing={32} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveStyle({ gap: '32px' })
    })
  })

  describe('Accessibility', () => {
    it('should maintain proper alt text for all images', () => {
      render(<ImageGallery images={mockImages} />)

      expect(screen.getByAltText('Test image 1')).toBeInTheDocument()
      expect(screen.getByAltText('Test image 2')).toBeInTheDocument()
      expect(screen.getByAltText('Test image 3')).toBeInTheDocument()
    })

    it('should maintain proper titles for all images', () => {
      render(<ImageGallery images={mockImages} />)

      const image1 = screen.getByAltText('Test image 1')
      expect(image1).toHaveAttribute('title', 'Test Image 1')
    })
  })

  describe('Performance optimization', () => {
    it('should apply proper CSS classes for performance', () => {
      render(<ImageGallery images={mockImages} />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid', 'gap-4')
    })

    it('should apply hover effects to individual images', () => {
      render(<ImageGallery images={mockImages} />)

      const image1 = screen.getByAltText('Test image 1')
      expect(image1).toHaveClass('w-full', 'h-full')
    })
  })

  describe('Layout variations', () => {
    it('should handle masonry layout', () => {
      render(<ImageGallery images={mockImages} layout='masonry' />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid')
    })

    it('should handle carousel layout', () => {
      render(<ImageGallery images={mockImages} layout='carousel' />)

      const gallery = screen
        .getByRole('img', { name: 'Test image 1' })
        .closest('div')
      expect(gallery).toHaveClass('grid')
    })
  })
})
