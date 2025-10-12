'use client'

import { HeroCarousel } from '@/components/ui/hero-carousel'
import { heroCarouselItems } from '@/data/hero-carousel-data'

export default function HeroSection() {
  return (
    <section className='relative min-h-screen'>
      <HeroCarousel
        items={heroCarouselItems}
        autoPlay={true}
        autoPlayInterval={6000}
        showIndicators={true}
        showNavigation={true}
      />
    </section>
  )
}
