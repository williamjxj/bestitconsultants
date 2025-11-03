'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import AboutSummary from '@/components/home/AboutSummary'
import ContactSnippet from '@/components/home/ContactSnippet'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import { QuickHighlights } from '@/components/home/QuickHighlights'
import ServicesSummary from '@/components/home/ServicesSummary'
import { HeroCarousel, HeroCarouselItem } from '@/components/ui/hero-carousel'

// HomePage component with animations
export default function HomePage() {
  const [officeImages, setOfficeImages] = useState<string[]>([])
  const [navbarHeight, setNavbarHeight] = useState<number>(88) // Default fallback

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/offices')
        const data = await res.json()
        if (data?.success && Array.isArray(data.images)) {
          setOfficeImages(data.images)
        }
      } catch {
        setOfficeImages([])
      }
    }
    fetchImages()
  }, [])

  // Measure navbar height for full viewport calculation
  useEffect(() => {
    const measureNavbar = () => {
      const navbar = document.querySelector('nav')
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight)
      }
    }
    measureNavbar()
    window.addEventListener('resize', measureNavbar)
    return () => window.removeEventListener('resize', measureNavbar)
  }, [])

  const items: HeroCarouselItem[] = useMemo(() => {
    const firstImage = officeImages[0] || '/placeholder.svg'
    const secondImage = officeImages[1] || firstImage

    const baseCta = {
      ctaText: 'Start Your Project',
      ctaLink: '/contact',
    }

    const slides: HeroCarouselItem[] = [
      {
        id: 'slide-1',
        title: 'Elite Enterprise Architects. Startup Speed.',
        subtitle: 'Get Fortune 500 Software Expertise Without the Overhead',
        description:
          'Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent. Led by industry veterans with 60+ years combined experience, we deliver AI/ML solutions, enterprise systems, and cloud platforms for global clients.',
        image: firstImage,
        ...baseCta,
      },
      {
        id: 'slide-2',
        title:
          'Helping businesses integrate AI and modern software architectures',
        subtitle:
          'From strategy to production — we fuse AI with cloud-native patterns',
        description:
          'We design event-driven, microservices, and data platforms that operationalize AI safely and at scale. Our teams deliver measurable impact with MLOps, vector search, and robust observability.',
        image: secondImage,
        ...baseCta,
      },
    ]

    // Append additional slides for remaining office images
    if (officeImages.length > 2) {
      officeImages.slice(2).forEach((img, idx) => {
        slides.push({
          id: `slide-${idx + 3}`,
          title: 'Modern engineering for real business outcomes',
          subtitle: 'Secure, observable, and scalable by default',
          description:
            'We apply pragmatic patterns, automation, and rigorous testing to ship faster with confidence — from greenfield builds to complex legacy modernization.',
          image: img,
          ...baseCta,
        })
      })
    }

    return slides
  }, [officeImages])

  return (
    <div className='space-y-16 md:space-y-24'>
      {/* Hero section: Main introductory content - Full viewport height with navbar */}
      <div
        className='-mx-4 -mt-8 -mb-8'
        style={{ height: `calc(100vh - ${navbarHeight}px)` }}
      >
        <HeroCarousel items={items} autoPlay autoPlayInterval={8000} />
      </div>

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
