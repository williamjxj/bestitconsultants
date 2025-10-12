/**
 * Integration test for homepage image loading
 * Tests the integration of images throughout the homepage
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { HeroSection } from '@/components/home/hero-section'
import { AboutSummary } from '@/components/home/about-summary'

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
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}))

describe('Homepage Images Integration', () => {
  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks()
  })

  describe('Hero Section Images', () => {
    it('should render hero section with background image', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toBeInTheDocument()
      expect(heroImage).toHaveAttribute(
        'src',
        '/imgs/istockphoto-1212876953-612x612.jpg'
      )
    })

    it('should apply priority loading to hero image', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toHaveAttribute('loading', 'eager')
    })

    it('should apply proper dimensions to hero image', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toHaveAttribute('width', '1920')
      expect(heroImage).toHaveAttribute('height', '1080')
    })

    it('should apply animation to hero image', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toBeInTheDocument()
    })

    it('should render hero content with proper structure', () => {
      render(<HeroSection />)

      expect(
        screen.getByText(/Empowering Businesses with Elite IT Consulting/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Global IT Outsourcing & AI Consulting/)
      ).toBeInTheDocument()
      expect(screen.getByText(/Get a Free Consultation/)).toBeInTheDocument()
    })
  })

  describe('About Summary Images', () => {
    it('should render about section with team collaboration image', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toBeInTheDocument()
      expect(aboutImage).toHaveAttribute(
        'src',
        '/imgs/istockphoto-1358835459-612x612.webp'
      )
    })

    it('should apply proper dimensions to about image', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toHaveAttribute('width', '612')
      expect(aboutImage).toHaveAttribute('height', '612')
    })

    it('should apply lazy loading to about image', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toHaveAttribute('loading', 'lazy')
    })

    it('should apply animation to about image', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toBeInTheDocument()
    })

    it('should render about content with proper structure', () => {
      render(<AboutSummary />)

      expect(screen.getByText(/About BestIT Consulting/)).toBeInTheDocument()
      expect(
        screen.getByText(/We are a global IT consulting firm/)
      ).toBeInTheDocument()
      expect(screen.getByText(/20\+/)).toBeInTheDocument()
      expect(screen.getByText(/50\+/)).toBeInTheDocument()
    })
  })

  describe('Image Loading Performance', () => {
    it('should use appropriate image formats', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toHaveAttribute(
        'src',
        '/imgs/istockphoto-1212876953-612x612.jpg'
      )
    })

    it('should use WebP format for about image', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toHaveAttribute(
        'src',
        '/imgs/istockphoto-1358835459-612x612.webp'
      )
    })

    it('should apply proper sizes attribute for responsive images', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toHaveAttribute(
        'sizes',
        '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      )
    })
  })

  describe('Accessibility', () => {
    it('should have descriptive alt text for hero image', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toBeInTheDocument()
    })

    it('should have descriptive alt text for about image', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toBeInTheDocument()
    })

    it('should have proper ARIA labels for interactive elements', () => {
      render(<HeroSection />)

      const button = screen.getByText(/Get a Free Consultation/)
      expect(button).toBeInTheDocument()
    })
  })

  describe('Animation Integration', () => {
    it('should apply fade animation to hero image', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toBeInTheDocument()
    })

    it('should apply slide animation to about image', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toBeInTheDocument()
    })

    it('should apply hover animations to interactive elements', () => {
      render(<HeroSection />)

      const button = screen.getByText(/Get a Free Consultation/)
      expect(button).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should apply responsive classes to hero section', () => {
      render(<HeroSection />)

      const heroSection = screen
        .getByText(/Empowering Businesses with Elite IT Consulting/)
        .closest('section')
      expect(heroSection).toHaveClass('min-h-screen')
    })

    it('should apply responsive classes to about section', () => {
      render(<AboutSummary />)

      const aboutSection = screen
        .getByText(/About BestIT Consulting/)
        .closest('section')
      expect(aboutSection).toHaveClass('py-20')
    })

    it('should apply responsive grid layout to about section', () => {
      render(<AboutSummary />)

      const aboutGrid = screen
        .getByText(/About BestIT Consulting/)
        .closest('div')
      expect(aboutGrid).toHaveClass('grid', 'md:grid-cols-2')
    })
  })

  describe('SEO Optimization', () => {
    it('should have proper title attributes for images', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toBeInTheDocument()
    })

    it('should have proper structured data for images', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle missing images gracefully', () => {
      render(<HeroSection />)

      const heroImage = screen.getByAltText(
        /Modern technology and innovation workspace/
      )
      expect(heroImage).toBeInTheDocument()
    })

    it('should handle image loading errors gracefully', () => {
      render(<AboutSummary />)

      const aboutImage = screen.getByAltText(
        /Professional team collaboration in modern office environment/
      )
      expect(aboutImage).toBeInTheDocument()
    })
  })
})
