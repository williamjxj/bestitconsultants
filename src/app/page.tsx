'use client'

import { motion } from 'framer-motion'

import AboutSummary from '@/components/home/AboutSummary'
import ContactSnippet from '@/components/home/ContactSnippet'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import { QuickHighlights } from '@/components/home/QuickHighlights'
import ServicesSummary from '@/components/home/ServicesSummary'
import { HomepageHero } from '@/components/ui/hero-variants'

// HomePage component with animations
export default function HomePage() {
  return (
    <div className='space-y-16 md:space-y-24 -mt-8'>
      {/* Hero section: Main introductory content */}
      <HomepageHero
        title='Elite Enterprise Architects. Startup Speed.'
        subtitle='Get Fortune 500 Software Expertise Without the Overhead'
        description='Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent. Led by industry veterans with 60+ years combined experience, we deliver AI/ML solutions, enterprise systems, and cloud platforms for global clients.'
        ctaText='Start Your Project'
        ctaLink='/contact'
        secondaryCtaText='View Our Work'
        secondaryCtaLink='/portfolio'
        backgroundImage='https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'
      />

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
