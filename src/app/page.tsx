'use client';

import HeroSection from './components/HeroSection';
import AboutSummary from './components/AboutSummary';
import ServicesSummary from './components/ServicesSummary';
import PortfolioPreview from './components/PortfolioPreview';
import TestimonialsPreview from './components/TestimonialsPreview';
import ContactSnippet from './components/ContactSnippet';

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
