'use client'

import { HeroSection, HeroSectionProps } from './hero-section'

// Homepage Hero with Carousel-like features
export function HomepageHero(props: Partial<HeroSectionProps>) {
  return (
    <HeroSection
      variant='carousel'
      background='gradient'
      size='full'
      animation='stagger'
      badge='Fortune 500 Experience • Global Reach'
      {...props}
    />
  )
}

// About Page Hero
export function AboutHero(props: Partial<HeroSectionProps>) {
  return (
    <HeroSection
      variant='centered'
      background='pattern'
      size='lg'
      animation='fade'
      textAlign='center'
      {...props}
    />
  )
}

// Services Page Hero
export function ServicesHero(props: Partial<HeroSectionProps>) {
  return (
    <HeroSection
      variant='default'
      background='gradient'
      size='lg'
      animation='slide'
      textAlign='center'
      {...props}
    />
  )
}

// Team Page Hero
export function TeamHero(props: Partial<HeroSectionProps>) {
  return (
    <HeroSection
      variant='centered'
      background='solid'
      size='md'
      animation='scale'
      textAlign='center'
      {...props}
    />
  )
}

// Portfolio Page Hero
export function PortfolioHero(props: Partial<HeroSectionProps>) {
  return (
    <HeroSection
      variant='default'
      background='gradient-portfolio'
      size='lg'
      animation='slide'
      textAlign='center'
      {...props}
    />
  )
}

// Our Work Page Hero
export function OurWorkHero(props: Partial<HeroSectionProps>) {
  return (
    <HeroSection
      variant='default'
      background='gradient'
      size='lg'
      animation='slide'
      textAlign='center'
      {...props}
    />
  )
}

// Contact Page Hero
export function ContactHero(props: Partial<HeroSectionProps>) {
  return (
    <HeroSection
      variant='default'
      background='gradient'
      size='lg'
      animation='slide'
      textAlign='center'
      {...props}
    />
  )
}
