'use client'

import { motion } from 'framer-motion'
import AboutSummary from '@/components/home/AboutSummary'
import ContactSnippet from '@/components/home/ContactSnippet'
import { EnhancedHeroSection } from '@/components/home/EnhancedHeroSection'
import { QuickHighlights } from '@/components/home/QuickHighlights'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import ServicesSummary from '@/components/home/ServicesSummary'

// HomePage component with animations
export default function HomePage() {
  return (
    <div className='space-y-16 md:space-y-24'>
      {/* Hero section: Main introductory content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <EnhancedHeroSection />
      </motion.div>

      {/* Quick highlights section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <QuickHighlights />
      </motion.div>

      {/* AboutSummary section: Brief overview of the company */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <AboutSummary />
      </motion.div>

      {/* ServicesSummary section: Highlights of services offered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ServicesSummary />
      </motion.div>

      {/* PortfolioPreview section: Sneak peek of projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <PortfolioPreview />
      </motion.div>

      {/* ContactSnippet section: Quick contact call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ContactSnippet />
      </motion.div>
    </div>
  )
}
