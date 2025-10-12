# Component Documentation

## Overview

This document provides comprehensive documentation for all components in the BestIT Consulting
website.

## Team Components

### EnhancedTeamProfile

**Location**: `src/components/team/EnhancedTeamProfile.tsx`

A comprehensive team member profile component that displays detailed information about team members
including their expertise, achievements, and prestige projects.

**Props**:

- `member: TeamMember` - Team member data object

**Features**:

- Displays team member avatar, name, title, and location
- Shows expertise tags and achievements
- Displays prestige projects with detailed information
- Responsive design with hover effects

**Usage**:

```tsx
import { EnhancedTeamProfile } from '@/components/team/EnhancedTeamProfile'
;<EnhancedTeamProfile member={teamMember} />
```

### TeamMemberAvatar

**Location**: `src/components/team/TeamMemberAvatar.tsx`

Optimized avatar component for team members with Next.js Image optimization.

**Props**:

- `src: string` - Image source URL
- `alt: string` - Alt text for accessibility
- `width?: number` - Image width (default: 64)
- `height?: number` - Image height (default: 64)
- `className?: string` - Additional CSS classes

**Features**:

- Next.js Image optimization
- Blur placeholder for loading states
- Responsive sizing
- Accessibility support

## Case Study Components

### CaseStudyCard

**Location**: `src/components/case-studies/CaseStudyCard.tsx`

Displays case study information including challenge, solution, result, and metrics.

**Props**:

- `caseStudy: CaseStudy` - Case study data object

**Features**:

- Challenge, solution, and result sections
- Metrics display with visual indicators
- Client testimonials
- Responsive card layout

## Service Components

### ServiceCategoryCard

**Location**: `src/components/services/ServiceCategoryCard.tsx`

Displays service category information with SEO taglines, benefits, and technologies.

**Props**:

- `service: ServiceCategory` - Service category data object

**Features**:

- SEO-optimized taglines
- Benefits and technologies lists
- Use cases display
- Service icons

## Home Components

### EnhancedHeroSection

**Location**: `src/components/home/EnhancedHeroSection.tsx`

Enhanced hero section with professional messaging and call-to-action.

**Features**:

- Professional headline and tagline
- Call-to-action button
- Gradient background
- Responsive design

### QuickHighlights

**Location**: `src/components/home/QuickHighlights.tsx`

Quick highlights section showcasing key value propositions.

**Features**:

- Three-column layout
- Icon-based highlights
- Responsive grid
- Professional messaging

## SEO Components

### StructuredData

**Location**: `src/components/seo/StructuredData.tsx`

Provides structured data for search engines.

**Features**:

- JSON-LD structured data
- Organization schema
- SEO optimization

## Media Components

### OptimizedImage

**Location**: `src/components/ui/optimized-image.tsx`

Enhanced image component with Next.js Image optimization, Framer Motion animations, and
accessibility features.

**Props**:

- `src: string` - Image source URL
- `alt: string` - Alt text for accessibility
- `width?: number` - Image width
- `height?: number` - Image height
- `priority?: boolean` - Priority loading (default: false)
- `className?: string` - Additional CSS classes
- `animation?: AnimationConfig` - Animation configuration
- `hover?: HoverAnimationConfig` - Hover animation configuration
- `loading?: 'lazy' | 'eager'` - Loading strategy
- `sizes?: string` - Responsive sizes
- `placeholder?: 'blur' | 'empty'` - Placeholder type
- `blurDataURL?: string` - Blur placeholder data

**Features**:

- Next.js Image optimization with WebP/AVIF support
- Framer Motion animations and hover effects
- Accessibility compliance (WCAG 2.1 AA)
- Responsive image loading
- Blur placeholder support
- Performance optimization

**Usage**:

```tsx
import { OptimizedImage } from '@/components/ui/optimized-image'

;<OptimizedImage
  src='/imgs/hero-image.jpg'
  alt='Hero image description'
  width={1920}
  height={1080}
  priority={true}
  animation={{
    type: 'fade',
    duration: 0.6,
  }}
  hover={{
    scale: 1.05,
    duration: 0.3,
  }}
/>
```

### ImageGallery

**Location**: `src/components/ui/image-gallery.tsx`

Responsive image gallery component with multiple layout options and animations.

**Props**:

- `images: MediaAsset[]` - Array of image assets
- `layout?: 'grid' | 'masonry' | 'carousel'` - Gallery layout (default: 'grid')
- `columns?: number` - Number of columns for grid layout (default: 3)
- `gap?: number` - Gap between images in pixels (default: 16)
- `animation?: GalleryAnimationConfig` - Gallery animation configuration
- `pagination?: PaginationConfig` - Pagination configuration
- `filter?: FilterConfig` - Filter configuration
- `className?: string` - Additional CSS classes

**Features**:

- Multiple layout options (grid, masonry, carousel)
- Responsive design with breakpoint-based columns
- Framer Motion animations and transitions
- Pagination and filtering support
- Accessibility compliance
- Performance optimization with lazy loading

**Usage**:

```tsx
import { ImageGallery } from '@/components/ui/image-gallery'

;<ImageGallery
  images={galleryImages}
  layout='grid'
  columns={3}
  animation={{
    type: 'stagger',
    duration: 0.6,
  }}
  pagination={{
    enabled: true,
    itemsPerPage: 12,
  }}
/>
```

## Common Components

### LazySection

**Location**: `src/components/common/LazySection.tsx`

Lazy loading component for below-the-fold content.

**Props**:

- `children: React.ReactNode` - Content to lazy load
- `className?: string` - Additional CSS classes
- `threshold?: number` - Intersection observer threshold (default: 0.1)
- `rootMargin?: string` - Intersection observer root margin (default: '50px')`

**Features**:

- Intersection observer-based lazy loading
- Smooth fade-in animations
- Performance optimization
- Configurable thresholds

## Data Types

### TeamMember

```typescript
interface TeamMember {
  id: string
  name: string
  title: string
  location: string
  experience: number
  avatar: string
  bio: string
  expertise: string[]
  achievements: string[]
  specializations: string[]
  prestigeProjects: PrestigeProject[]
}
```

### CaseStudy

```typescript
interface CaseStudy {
  id: string
  title: string
  challenge: string
  solution: string
  result: string
  metrics: CaseStudyMetric[]
  technologies: string[]
  client: string
  category: string
}
```

### ServiceCategory

```typescript
interface ServiceCategory {
  id: string
  name: string
  seoTagline: string
  description: string
  benefits: string[]
  technologies: string[]
  useCases: string[]
  order: number
  isActive: boolean
}
```

## Best Practices

1. **Accessibility**: All components include proper ARIA attributes and keyboard navigation support
2. **Performance**: Components use lazy loading and image optimization
3. **Responsive Design**: All components are mobile-first and responsive
4. **SEO**: Components include proper semantic HTML and structured data
5. **Type Safety**: All components use TypeScript for type safety
