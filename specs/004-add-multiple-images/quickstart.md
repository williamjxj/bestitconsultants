# Quickstart: Multiple Images and Videos in Webpage

**Feature**: 004-add-multiple-images **Date**: 2024-12-19 **Status**: Ready for Implementation

## Overview

This quickstart guide demonstrates how to implement multiple images and videos throughout the
website, replacing placeholders with meaningful content from the `R2 bucket static-assets` folder,
and adding animations and hover effects using Framer Motion and Tailwind CSS.

## Prerequisites

- Next.js 15+ with App Router
- TypeScript 5.0+
- Framer Motion for animations
- Tailwind CSS for styling
- shadcn/ui components
- Images available in `publicR2 bucket ` folder

## Implementation Steps

### 1. Image Component Setup

#### Create Optimized Image Component

```typescript
// src/components/ui/optimized-image.tsx
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  title?: string
  description?: string
  width: number
  height: number
  priority?: boolean
  className?: string
  animation?: {
    type: 'fade' | 'slide' | 'scale' | 'rotate'
    duration?: number
    delay?: number
    stagger?: number
  }
  hover?: {
    scale?: number
    opacity?: number
    duration?: number
  }
}

export function OptimizedImage({
  src,
  alt,
  title,
  description,
  width,
  height,
  priority = false,
  className,
  animation,
  hover
}: OptimizedImageProps) {
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: animation?.type === 'scale' ? 0.8 : 1,
      y: animation?.type === 'slide' ? 20 : 0,
      rotate: animation?.type === 'rotate' ? -5 : 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: animation?.duration || 0.6,
        delay: animation?.delay || 0,
        ease: "easeOut"
      }
    },
    hover: {
      scale: hover?.scale || 1.05,
      opacity: hover?.opacity || 1,
      transition: {
        duration: hover?.duration || 0.3
      }
    }
  }

  return (
    <motion.div
      variants={imageVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("relative overflow-hidden rounded-lg", className)}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-full object-cover transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {description && (
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-sm p-4 text-center">{description}</p>
        </div>
      )}
    </motion.div>
  )
}
```

### 2. Image Gallery Component

#### Create Responsive Gallery

```typescript
// src/components/ui/image-gallery.tsx
import { motion } from 'framer-motion'
import { OptimizedImage } from './optimized-image'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: Array<{
    id: string
    src: string
    alt: string
    title?: string
    description?: string
    width: number
    height: number
  }>
  layout?: 'grid' | 'carousel' | 'masonry'
  columns?: number
  spacing?: number
  className?: string
}

export function ImageGallery({
  images,
  layout = 'grid',
  columns = 3,
  spacing = 16,
  className
}: ImageGalleryProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "grid gap-4",
        gridCols[columns as keyof typeof gridCols],
        className
      )}
      style={{ gap: `${spacing}px` }}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          className="relative group cursor-pointer"
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            title={image.title}
            description={image.description}
            width={image.width}
            height={image.height}
            animation={{
              type: 'fade',
              duration: 0.6,
              delay: index * 0.1
            }}
            hover={{
              scale: 1.05,
              duration: 0.3
            }}
            className="w-full h-full"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### 3. Homepage Implementation

#### Update Hero Section

```typescript
// src/components/home/hero-section.tsx
import { OptimizedImage } from '@/components/ui/optimized-image'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <OptimizedImage
        src="https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg"
        alt="Modern technology and innovation workspace with multiple monitors and collaborative environment"
        width={1920}
        height={1080}
        priority={true}
        className="absolute inset-0 w-full h-full object-cover"
        animation={{
          type: 'fade',
          duration: 1.2
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Businesses with Elite IT Consulting & AI Innovation
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
        >
          Get a Free Consultation
        </motion.button>
      </motion.div>
    </section>
  )
}
```

#### Update About Summary

```typescript
// src/components/home/about-summary.tsx
import { OptimizedImage } from '@/components/ui/optimized-image'
import { motion } from 'framer-motion'

export function AboutSummary() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <OptimizedImage
              src="https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp"
              alt="Professional team collaboration in modern office environment with diverse team members working together"
              width={612}
              height={612}
              className="rounded-lg shadow-lg"
              animation={{
                type: 'slide',
                duration: 0.8
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About BestIT Consulting
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We are a global IT consulting firm specializing in AI-driven solutions,
              full-stack development, and enterprise systems. Our team combines
              Canadian leadership with world-class talent from around the globe.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">20+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### 4. Team Page Implementation

#### Update Team Member Cards

```typescript
// src/components/team/team-member-card.tsx
import { OptimizedImage } from '@/components/ui/optimized-image'
import { motion } from 'framer-motion'

interface TeamMemberCardProps {
  member: {
    id: string
    name: string
    title: string
    image: string
    description: string
    achievements: string[]
  }
  index: number
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64">
        <OptimizedImage
          src={member.image}
          alt={`${member.name} - ${member.title}`}
          width={400}
          height={256}
          className="w-full h-full object-cover"
          animation={{
            type: 'scale',
            duration: 0.6
          }}
          hover={{
            scale: 1.1,
            duration: 0.3
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
        <p className="text-blue-600 font-semibold mb-4">{member.title}</p>
        <p className="text-gray-600 mb-4">{member.description}</p>

        <ul className="space-y-2">
          {member.achievements.map((achievement, idx) => (
            <li key={idx} className="text-sm text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
```

### 5. Services Page Implementation

#### Update Service Categories

```typescript
// src/components/services/service-category-card.tsx
import { OptimizedImage } from '@/components/ui/optimized-image'
import { motion } from 'framer-motion'

interface ServiceCategoryCardProps {
  category: {
    id: string
    title: string
    description: string
    image: string
    services: string[]
  }
  index: number
}

export function ServiceCategoryCard({ category, index }: ServiceCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-48">
        <OptimizedImage
          src={category.image}
          alt={`${category.title} services and solutions`}
          width={400}
          height={192}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          animation={{
            type: 'fade',
            duration: 0.6
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
        <p className="text-gray-600 mb-4">{category.description}</p>

        <ul className="space-y-2">
          {category.services.map((service, idx) => (
            <li key={idx} className="text-sm text-gray-500 flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              {service}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
```

### 6. Case Studies Page Implementation

#### Update Case Study Cards

```typescript
// src/components/case-studies/case-study-card.tsx
import { OptimizedImage } from '@/components/ui/optimized-image'
import { motion } from 'framer-motion'

interface CaseStudyCardProps {
  caseStudy: {
    id: string
    title: string
    client: string
    image: string
    description: string
    results: string[]
    technologies: string[]
  }
  index: number
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-64">
        <OptimizedImage
          src={caseStudy.image}
          alt={`${caseStudy.title} - ${caseStudy.client} case study`}
          width={400}
          height={256}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          animation={{
            type: 'slide',
            duration: 0.6
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{caseStudy.title}</h3>
        <p className="text-blue-600 font-semibold mb-4">{caseStudy.client}</p>
        <p className="text-gray-600 mb-4">{caseStudy.description}</p>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Results:</h4>
          <ul className="space-y-1">
            {caseStudy.results.map((result, idx) => (
              <li key={idx} className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                {result}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {caseStudy.technologies.map((tech, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
```

### 7. Image Mapping Configuration

#### Create Image Mapping Service

```typescript
// src/services/image-mapping.ts
export const imageMapping = {
  // Homepage images
  hero: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg',
  about: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
  services:
    'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1350198816-612x612.jpg',
  portfolio:
    'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2163952011-612x612.webp',

  // Team images
  teamCollaboration:
    'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1145868161-612x612.webp',
  technology:
    'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2227310361-612x612.webp',

  // Case studies images
  projectScreenshots:
    'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-492514758-612x612.webp',
  innovation: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_1.png',
  creativity: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_2.png',

  // Team member photos
  teamMembers: {
    william: '/images/william-jiang.jpg',
    shamin: '/images/shaming-yang.jpeg',
    lewis: '/images/lewis-liu.jpg',
    james: '/images/james-cheung.jpeg',
    mingchun: '/images/mingchun-hu.jpg',
    wayne: '/images/wayne-li.jpg',
  },
}

export function getImageForContext(context: string): string {
  return imageMapping[context as keyof typeof imageMapping] || '/placeholder.svg'
}
```

### 8. Animation Configuration

#### Create Animation Presets

```typescript
// src/lib/animations.ts
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },

  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  },

  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
}
```

## Testing

### Unit Tests

```typescript
// tests/components/optimized-image.test.tsx
import { render, screen } from '@testing-library/react'
import { OptimizedImage } from '@/components/ui/optimized-image'

describe('OptimizedImage', () => {
  it('renders with correct alt text', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
      />
    )

    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('applies priority loading when specified', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={400}
        height={300}
        priority={true}
      />
    )

    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('loading', 'eager')
  })
})
```

### Integration Tests

```typescript
// tests/integration/image-gallery.test.tsx
import { render, screen } from '@testing-library/react'
import { ImageGallery } from '@/components/ui/image-gallery'

describe('ImageGallery', () => {
  const mockImages = [
    {
      id: '1',
      src: '/test1.jpg',
      alt: 'Test image 1',
      width: 400,
      height: 300
    },
    {
      id: '2',
      src: '/test2.jpg',
      alt: 'Test image 2',
      width: 400,
      height: 300
    }
  ]

  it('renders all images in gallery', () => {
    render(<ImageGallery images={mockImages} />)

    expect(screen.getByAltText('Test image 1')).toBeInTheDocument()
    expect(screen.getByAltText('Test image 2')).toBeInTheDocument()
  })
})
```

## Performance Optimization

### Image Optimization

- Use Next.js Image component for automatic optimization
- Implement lazy loading for below-the-fold images
- Provide multiple image formats (WebP, AVIF)
- Use appropriate image sizes for different breakpoints

### Animation Performance

- Use transform and opacity for smooth animations
- Implement reduced motion support
- Optimize animation duration and easing
- Use GPU acceleration for complex animations

### Accessibility

- Provide descriptive alt text for all images
- Implement keyboard navigation
- Support screen readers
- Ensure color contrast compliance

## Deployment

### Build Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['bestitconsulting.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_IMAGE_DOMAIN=bestitconsulting.com
NEXT_PUBLIC_CDN_URL=https://cdn.bestitconsulting.com
```

## Success Criteria

### Performance Metrics

- [ ] LCP < 2.5 seconds
- [ ] FID < 100 milliseconds
- [ ] CLS < 0.1
- [ ] All images load within 3 seconds

### Accessibility Compliance

- [ ] All images have descriptive alt text
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader compatibility
- [ ] WCAG 2.1 AA compliance

### User Experience

- [ ] Smooth animations at 60fps
- [ ] Responsive design on all devices
- [ ] Fast loading times
- [ ] Intuitive navigation

### SEO Optimization

- [ ] Proper image metadata
- [ ] Structured data implementation
- [ ] Social media optimization
- [ ] Search engine visibility

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and permissions
2. **Slow loading**: Optimize image sizes and formats
3. **Animation performance**: Use transform and opacity
4. **Accessibility issues**: Provide proper alt text and ARIA labels

### Debug Tools

- Chrome DevTools for performance analysis
- Lighthouse for Core Web Vitals
- axe-core for accessibility testing
- React DevTools for component debugging

## Next Steps

1. **Implement image components** following the examples above
2. **Update page components** to use new image components
3. **Add animations** using Framer Motion
4. **Test performance** and accessibility
5. **Deploy and monitor** Core Web Vitals

This quickstart provides a comprehensive foundation for implementing multiple images and videos
throughout the website with proper optimization, animations, and accessibility features.
