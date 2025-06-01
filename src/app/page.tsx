'use client'

import AboutSummary from '@/components/home/AboutSummary'
import ContactSnippet from '@/components/home/ContactSnippet'
import HeroSection from '@/components/home/HeroSection'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import ServicesSummary from '@/components/home/ServicesSummary'
import TestimonialsPreview from '@/components/home/TestimonialsPreview'

// HomePage component
export default function HomePage() {
  return (
    <div className='space-y-16 md:space-y-24'>
      {/* Hero section: Main introductory content */}
      <HeroSection />

      {/* AboutSummary section: Brief overview of the company */}
      <AboutSummary />

      {/* ServicesSummary section: Highlights of services offered */}
      <ServicesSummary />

      {/* PortfolioPreview section: Sneak peek of projects */}
      <PortfolioPreview />

      {/* TestimonialsPreview section: Client feedback */}
      <TestimonialsPreview />

      {/* ContactSnippet section: Quick contact call to action */}
      <ContactSnippet />
    </div>
  )
}
