# Data Model: Multiple Images and Videos in Webpage

**Feature**: 004-add-multiple-images **Date**: 2024-12-19 **Status**: Complete

## Entity Definitions

### MediaAsset

Represents individual image or video files with metadata for optimization and accessibility.

**Fields**:

- `id: string` - Unique identifier for the media asset
- `src: string` - Source path to the media file
- `alt: string` - Alternative text for accessibility
- `title: string` - Title for tooltip and SEO
- `description: string` - Detailed description for screen readers
- `width: number` - Original width in pixels
- `height: number` - Original height in pixels
- `format: 'webp' | 'avif' | 'jpeg' | 'png'` - Image format
- `size: number` - File size in bytes
- `category: MediaCategory` - Classification of the media
- `priority: 'high' | 'medium' | 'low'` - Loading priority
- `loading: 'eager' | 'lazy'` - Loading strategy
- `placeholder: string` - Base64 placeholder for lazy loading
- `seoMetadata: SEOImageMetadata` - SEO optimization data
- `accessibility: AccessibilityMetadata` - Accessibility features
- `animation: AnimationConfig` - Animation configuration

**Validation Rules**:

- `src` must be a valid file path
- `alt` must be descriptive and contextual
- `width` and `height` must be positive numbers
- `format` must be supported by Next.js Image component
- `priority` determines loading order
- `loading` strategy based on viewport position

**State Transitions**:

- `unloaded` → `loading` → `loaded` → `error` (if failed)
- `loading` → `cached` (for subsequent loads)

### MediaGallery

Collection of related media assets organized by page or section.

**Fields**:

- `id: string` - Unique identifier for the gallery
- `title: string` - Gallery title
- `description: string` - Gallery description
- `assets: MediaAsset[]` - Array of media assets
- `layout: 'grid' | 'carousel' | 'masonry'` - Display layout
- `columns: number` - Number of columns for grid layout
- `spacing: number` - Spacing between items
- `animation: GalleryAnimationConfig` - Gallery-specific animations
- `pagination: PaginationConfig` - Pagination settings
- `filtering: FilterConfig` - Filter options

**Validation Rules**:

- `assets` array must not be empty
- `columns` must be between 1 and 6
- `spacing` must be non-negative
- `layout` must be supported by the component

**State Transitions**:

- `empty` → `loading` → `populated` → `filtered` (if filters applied)

### MediaCategory

Classification of media by type and purpose.

**Fields**:

- `id: string` - Unique identifier for the category
- `name: string` - Category name
- `description: string` - Category description
- `icon: string` - Icon identifier for UI
- `color: string` - Theme color for the category
- `parentCategory?: string` - Parent category for hierarchy
- `tags: string[]` - Searchable tags
- `seoKeywords: string[]` - SEO keywords for the category

**Validation Rules**:

- `name` must be unique within the same parent
- `tags` must be non-empty
- `color` must be valid CSS color
- `parentCategory` must reference existing category

### SEOImageMetadata

SEO optimization data for images.

**Fields**:

- `title: string` - SEO title
- `description: string` - Meta description
- `keywords: string[]` - SEO keywords
- `structuredData: object` - JSON-LD structured data
- `socialMedia: SocialMediaMetadata` - Social sharing metadata
- `canonicalUrl: string` - Canonical URL for the image

**Validation Rules**:

- `title` must be under 60 characters
- `description` must be under 160 characters
- `keywords` must be relevant and specific
- `structuredData` must be valid JSON-LD

### AccessibilityMetadata

Accessibility features for media content.

**Fields**:

- `altText: string` - Alternative text for screen readers
- `longDescription: string` - Detailed description for complex images
- `caption: string` - Image caption
- `ariaLabel: string` - ARIA label for interactive elements
- `ariaDescribedBy: string` - Reference to description element
- `role: string` - ARIA role for the element
- `tabIndex: number` - Tab order for keyboard navigation
- `focusable: boolean` - Whether element can receive focus

**Validation Rules**:

- `altText` must be descriptive and contextual
- `longDescription` required for complex images
- `ariaLabel` must be unique and descriptive
- `role` must be valid ARIA role

### AnimationConfig

Animation configuration for media elements.

**Fields**:

- `enabled: boolean` - Whether animations are enabled
- `type: 'fade' | 'slide' | 'scale' | 'rotate'` - Animation type
- `duration: number` - Animation duration in milliseconds
- `delay: number` - Animation delay in milliseconds
- `easing: string` - CSS easing function
- `stagger: number` - Stagger delay for multiple elements
- `hover: HoverAnimationConfig` - Hover animation settings
- `scroll: ScrollAnimationConfig` - Scroll-triggered animations

**Validation Rules**:

- `duration` must be between 100ms and 2000ms
- `delay` must be non-negative
- `easing` must be valid CSS easing function
- `stagger` must be non-negative

### GalleryAnimationConfig

Animation configuration for gallery components.

**Fields**:

- `entrance: AnimationConfig` - Entrance animations
- `exit: AnimationConfig` - Exit animations
- `hover: HoverAnimationConfig` - Hover animations
- `scroll: ScrollAnimationConfig` - Scroll animations
- `stagger: number` - Stagger delay between items
- `direction: 'up' | 'down' | 'left' | 'right'` - Animation direction

### HoverAnimationConfig

Hover animation settings.

**Fields**:

- `scale: number` - Scale factor on hover
- `translate: { x: number, y: number }` - Translation on hover
- `opacity: number` - Opacity change on hover
- `duration: number` - Hover animation duration
- `easing: string` - Hover animation easing

### ScrollAnimationConfig

Scroll-triggered animation settings.

**Fields**:

- `trigger: 'viewport' | 'element'` - Animation trigger
- `threshold: number` - Visibility threshold (0-1)
- `rootMargin: string` - Root margin for intersection observer
- `once: boolean` - Whether animation runs only once
- `direction: 'up' | 'down' | 'left' | 'right'` - Animation direction

### PaginationConfig

Pagination settings for galleries.

**Fields**:

- `enabled: boolean` - Whether pagination is enabled
- `itemsPerPage: number` - Number of items per page
- `showPageNumbers: boolean` - Whether to show page numbers
- `showNavigation: boolean` - Whether to show prev/next buttons
- `infiniteScroll: boolean` - Whether to use infinite scroll

### FilterConfig

Filter options for galleries.

**Fields**:

- `enabled: boolean` - Whether filtering is enabled
- `categories: string[]` - Available filter categories
- `tags: string[]` - Available filter tags
- `dateRange: { start: Date, end: Date }` - Date range filter
- `sortBy: 'date' | 'name' | 'size' | 'relevance'` - Sort option
- `sortOrder: 'asc' | 'desc'` - Sort order

## Relationships

### MediaAsset Relationships:

- **Belongs to**: MediaCategory (many-to-one)
- **Belongs to**: MediaGallery (many-to-many)
- **Has**: SEOImageMetadata (one-to-one)
- **Has**: AccessibilityMetadata (one-to-one)
- **Has**: AnimationConfig (one-to-one)

### MediaGallery Relationships:

- **Contains**: MediaAsset (one-to-many)
- **Has**: GalleryAnimationConfig (one-to-one)
- **Has**: PaginationConfig (one-to-one)
- **Has**: FilterConfig (one-to-one)

### MediaCategory Relationships:

- **Contains**: MediaAsset (one-to-many)
- **Has parent**: MediaCategory (self-referential, one-to-many)
- **Has children**: MediaCategory (self-referential, many-to-one)

## Data Flow

### Image Loading Flow:

1. **Request**: Component requests image by ID
2. **Validation**: Check if image exists and is accessible
3. **Optimization**: Apply format conversion and sizing
4. **Loading**: Load image with appropriate strategy
5. **Caching**: Store in browser cache for future use
6. **Display**: Render with animations and accessibility features

### Gallery Rendering Flow:

1. **Initialization**: Load gallery configuration
2. **Asset Loading**: Load media assets based on pagination
3. **Layout Calculation**: Calculate grid or carousel layout
4. **Animation Setup**: Configure entrance animations
5. **Rendering**: Render gallery with animations
6. **Interaction**: Handle user interactions (hover, click, scroll)

### SEO Optimization Flow:

1. **Metadata Generation**: Create SEO metadata for each image
2. **Structured Data**: Generate JSON-LD structured data
3. **Social Media**: Create Open Graph and Twitter Card metadata
4. **Sitemap**: Include images in XML sitemap
5. **Robots**: Configure robots.txt for image crawling

## Validation Rules

### MediaAsset Validation:

- Source path must exist and be accessible
- Alt text must be descriptive and contextual
- Dimensions must be positive numbers
- Format must be supported by Next.js
- File size must be within acceptable limits

### MediaGallery Validation:

- Must contain at least one media asset
- Layout configuration must be valid
- Animation settings must be performance-optimized
- Pagination settings must be reasonable

### Accessibility Validation:

- Alt text must be present and descriptive
- ARIA labels must be unique and meaningful
- Keyboard navigation must be fully functional
- Screen reader support must be comprehensive

### Performance Validation:

- Images must load within performance budgets
- Animations must maintain 60fps
- Lazy loading must be properly implemented
- Caching must be optimized

## Error Handling

### Image Loading Errors:

- **Network Error**: Display placeholder with retry option
- **Format Error**: Fallback to supported format
- **Size Error**: Resize to acceptable dimensions
- **Accessibility Error**: Provide alternative content

### Gallery Errors:

- **Empty Gallery**: Display appropriate message
- **Loading Error**: Show error state with retry option
- **Animation Error**: Fallback to static display
- **Performance Error**: Disable animations if needed

### SEO Errors:

- **Metadata Error**: Use fallback metadata
- **Structured Data Error**: Validate and fix JSON-LD
- **Sitemap Error**: Exclude problematic images
- **Social Media Error**: Use default Open Graph data
