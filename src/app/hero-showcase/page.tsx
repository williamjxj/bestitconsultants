'use client'

import {
  HomepageHero,
  AboutHero,
  ServicesHero,
  TeamHero,
  ContactHero,
} from '@/components/ui/hero-variants'

export default function HeroShowcasePage() {
  return (
    <div className='space-y-32'>
      {/* Homepage Hero */}
      <section>
        <h2 className='text-2xl font-bold mb-8 text-center'>Homepage Hero</h2>
        <HomepageHero
          title='Elite Enterprise Architects. Startup Speed.'
          subtitle='Get Fortune 500 Software Expertise Without the Overhead'
          description='Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent. Led by industry veterans with 20+ years combined experience.'
          ctaText='Start Your Project'
          ctaLink='/contact-us'
          secondaryCtaText='View Case Studies'
          secondaryCtaLink='/portfolio'
          backgroundImage='https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg'
        />
      </section>

      {/* About Hero */}
      <section>
        <h2 className='text-2xl font-bold mb-8 text-center'>About Hero</h2>
        <AboutHero
          title='About BestITConsultants'
          description='We are a premier software outsourcing company founded by industry veterans with over 60 years of combined experience. Led by CEO William Jiang, our international team has delivered successful projects for Fortune 500 companies.'
          badge='20+ Years Combined Experience'
          ctaText='Meet Our Team'
          ctaLink='/our-team'
          secondaryCtaText='View Our Services'
          secondaryCtaLink='/services'
        />
      </section>

      {/* Services Hero */}
      <section>
        <h2 className='text-2xl font-bold mb-8 text-center'>Services Hero</h2>
        <ServicesHero
          title='Our Services'
          subtitle='Transform Your Business with Cutting-Edge Technology'
          description='Transform your business with our comprehensive suite of enterprise-grade solutions. From AI/ML to cloud infrastructure, we deliver the technology expertise your business needs to succeed.'
          ctaText='Get Started'
          ctaLink='/contact-us'
          secondaryCtaText='View Case Studies'
          secondaryCtaLink='/case-studies'
          badge='Fortune 500 Proven Solutions'
        />
      </section>

      {/* Team Hero */}
      <section>
        <h2 className='text-2xl font-bold mb-8 text-center'>Team Hero</h2>
        <TeamHero
          title='Our Expert Team'
          subtitle='Meet the seasoned professionals with Fortune 500 experience who drive our success'
          description='Our leadership team brings decades of real-world experience from top-tier companies. From AI/ML experts to enterprise architects, we combine North American innovation with Asian efficiency.'
          ctaText='View Our Services'
          ctaLink='/services'
          secondaryCtaText='Contact Us'
          secondaryCtaLink='/contact-us'
          badge='20+ Years Combined Experience'
        />
      </section>

      {/* Contact Hero */}
      <section>
        <h2 className='text-2xl font-bold mb-8 text-center'>Contact Hero</h2>
        <ContactHero
          title='Get In Touch'
          subtitle='Ready to Transform Your Business?'
          description="Ready to transform your business with cutting-edge technology? Let's discuss your project and see how our Fortune 500 expertise can help you achieve your goals."
          ctaText='Schedule a Call'
          ctaLink='/contact-us'
          secondaryCtaText='View Case Studies'
          secondaryCtaLink='/portfolio'
          badge='Free Consultation Available'
        />
      </section>
    </div>
  )
}
