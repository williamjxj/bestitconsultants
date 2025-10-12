import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HeroCarousel } from '@/components/ui/hero-carousel'
import { heroCarouselItems } from '@/data/hero-carousel-data'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />
  }
})

describe('HeroCarousel', () => {
  it('renders the first carousel item by default', () => {
    render(<HeroCarousel items={heroCarouselItems} />)

    expect(
      screen.getByText('Enterprise Software Solutions')
    ).toBeInTheDocument()
    expect(screen.getByText('Fortune 500 Experience')).toBeInTheDocument()
  })

  it('displays navigation arrows when showNavigation is true', () => {
    render(<HeroCarousel items={heroCarouselItems} showNavigation={true} />)

    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
  })

  it('displays indicators when showIndicators is true', () => {
    render(<HeroCarousel items={heroCarouselItems} showIndicators={true} />)

    // Should have 3 indicators for 3 items
    const indicators = screen
      .getAllByRole('button')
      .filter(button =>
        button.getAttribute('aria-label')?.includes('Go to slide')
      )
    expect(indicators).toHaveLength(3)
  })

  it('navigates to next slide when next button is clicked', async () => {
    render(<HeroCarousel items={heroCarouselItems} />)

    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(
        screen.getByText('AI & Machine Learning Excellence')
      ).toBeInTheDocument()
    })
  })

  it('navigates to previous slide when previous button is clicked', async () => {
    render(<HeroCarousel items={heroCarouselItems} />)

    const prevButton = screen.getByLabelText('Previous slide')
    fireEvent.click(prevButton)

    await waitFor(() => {
      expect(
        screen.getByText('Global Technology Leadership')
      ).toBeInTheDocument()
    })
  })

  it('navigates to specific slide when indicator is clicked', async () => {
    render(<HeroCarousel items={heroCarouselItems} />)

    const thirdIndicator = screen.getByLabelText('Go to slide 3')
    fireEvent.click(thirdIndicator)

    await waitFor(() => {
      expect(
        screen.getByText('Global Technology Leadership')
      ).toBeInTheDocument()
    })
  })

  it('calls CTA link when button is clicked', () => {
    const mockOpen = jest.fn()
    window.open = mockOpen

    render(<HeroCarousel items={heroCarouselItems} />)

    const ctaButton = screen.getByText('Start Your Project')
    fireEvent.click(ctaButton)

    expect(mockOpen).toHaveBeenCalledWith('/contact', '_blank')
  })

  it('does not show navigation when showNavigation is false', () => {
    render(<HeroCarousel items={heroCarouselItems} showNavigation={false} />)

    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument()
  })

  it('does not show indicators when showIndicators is false', () => {
    render(<HeroCarousel items={heroCarouselItems} showIndicators={false} />)

    const indicators = screen
      .queryAllByRole('button')
      .filter(button =>
        button.getAttribute('aria-label')?.includes('Go to slide')
      )
    expect(indicators).toHaveLength(0)
  })
})
