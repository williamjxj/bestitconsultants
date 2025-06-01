'use client';

import HeroSection from '@/components/home/HeroSection';
import AboutSummary from '@/components/home/AboutSummary';
import ServicesSummary from '@/components/home/ServicesSummary';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import ContactSnippet from '@/components/home/ContactSnippet';

// HomePage component
export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
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
  );
}
