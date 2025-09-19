'use client'

import { motion } from 'framer-motion'
import AboutSummary from '@/components/home/AboutSummary'
import ContactSnippet from '@/components/home/ContactSnippet'
import HeroSection from '@/components/home/HeroSection'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import ServicesSummary from '@/components/home/ServicesSummary'
import TestimonialsPreview from '@/components/home/TestimonialsPreview'

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
        <HeroSection />
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

      {/* TestimonialsPreview section: Client feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <TestimonialsPreview />
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
