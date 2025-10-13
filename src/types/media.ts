/**
 * TypeScript interfaces for media assets, galleries, and related functionality
 * Based on the data model from specs/004-add-multiple-images/data-model.md
 */

export interface MediaAsset {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  width: number
  height: number
  format: 'webp' | 'avif' | 'jpeg' | 'png'
  size?: number
  category: string
  priority: 'high' | 'medium' | 'low'
  loading: 'eager' | 'lazy'
  placeholder?: string
  seoMetadata?: SEOImageMetadata
  accessibility?: AccessibilityMetadata
  animation?: AnimationConfig
  createdAt: string
  updatedAt: string
}

export interface MediaGallery {
  id: string
  title: string
  description: string
  assets: MediaAsset[]
  layout: 'grid' | 'carousel' | 'masonry'
  columns: number
  spacing: number
  animation?: GalleryAnimationConfig
  pagination?: PaginationConfig
  filtering?: FilterConfig
  createdAt: string
  updatedAt: string
}

export interface MediaCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  parentCategory?: string
  tags: string[]
  seoKeywords: string[]
  createdAt: string
  updatedAt: string
}

export interface SEOImageMetadata {
  title: string
  description: string
  keywords: string[]
  structuredData?: object
  socialMedia?: SocialMediaMetadata
  canonicalUrl?: string
}

export interface SocialMediaMetadata {
  openGraph?: {
    title: string
    description: string
    image: string
    url: string
  }
  twitter?: {
    card: string
    title: string
    description: string
    image: string
  }
}

export interface AccessibilityMetadata {
  altText: string
  longDescription?: string
  caption?: string
  ariaLabel?: string
  ariaDescribedBy?: string
  role?: string
  tabIndex?: number
  focusable?: boolean
}

export interface AnimationConfig {
  enabled: boolean
  type: 'fade' | 'slide' | 'scale' | 'rotate'
  duration: number
  delay: number
  easing: string
  stagger?: number
  hover?: HoverAnimationConfig
  scroll?: ScrollAnimationConfig
}

export interface GalleryAnimationConfig {
  entrance?: AnimationConfig
  exit?: AnimationConfig
  hover?: HoverAnimationConfig
  scroll?: ScrollAnimationConfig
  stagger: number
  direction: 'up' | 'down' | 'left' | 'right'
}

export interface HoverAnimationConfig {
  scale: number
  translate: { x: number; y: number }
  opacity: number
  duration: number
  easing: string
}

export interface ScrollAnimationConfig {
  trigger: 'viewport' | 'element'
  threshold: number
  rootMargin: string
  once: boolean
  direction: 'up' | 'down' | 'left' | 'right'
}

export interface PaginationConfig {
  enabled: boolean
  itemsPerPage: number
  showPageNumbers: boolean
  showNavigation: boolean
  infiniteScroll: boolean
}

export interface FilterConfig {
  enabled: boolean
  categories: string[]
  tags: string[]
  dateRange?: { start: Date; end: Date }
  sortBy: 'date' | 'name' | 'size' | 'relevance'
  sortOrder: 'asc' | 'desc'
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  code?: string
  details?: object
}

export interface MediaAssetsResponse {
  success: boolean
  data: MediaAsset[]
  pagination: Pagination
}

export interface MediaGalleriesResponse {
  success: boolean
  data: MediaGallery[]
  pagination: Pagination
}

export interface MediaCategoriesResponse {
  success: boolean
  data: MediaCategory[]
}

export interface OptimizeRequest {
  assetIds: string[]
  formats: ('webp' | 'avif' | 'jpeg' | 'png')[]
  sizes?: Array<{
    width: number
    height: number
    name: string
  }>
}

export interface OptimizeResponse {
  success: boolean
  data: MediaAsset[]
}

// Component-specific interfaces
export interface OptimizedImageProps {
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

export interface ImageGalleryProps {
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

export interface MediaServiceConfig {
  baseUrl: string
  timeout: number
  retries: number
}

export interface MediaService {
  getAssets(params?: {
    category?: string
    format?: string
    priority?: string
    page?: number
    limit?: number
  }): Promise<MediaAssetsResponse>

  getAsset(id: string): Promise<ApiResponse<MediaAsset>>

  createAsset(data: Record<string, unknown>): Promise<ApiResponse<MediaAsset>>

  updateAsset(
    id: string,
    data: Partial<MediaAsset>
  ): Promise<ApiResponse<MediaAsset>>

  deleteAsset(id: string): Promise<ApiResponse<void>>

  getGalleries(params?: {
    page?: number
    limit?: number
  }): Promise<MediaGalleriesResponse>

  getGallery(id: string): Promise<ApiResponse<MediaGallery>>

  createGallery(data: Partial<MediaGallery>): Promise<ApiResponse<MediaGallery>>

  getCategories(): Promise<MediaCategoriesResponse>

  optimizeAssets(request: OptimizeRequest): Promise<OptimizeResponse>
}

// Utility types
export type MediaFormat = 'webp' | 'avif' | 'jpeg' | 'png'
export type MediaPriority = 'high' | 'medium' | 'low'
export type MediaLoading = 'eager' | 'lazy'
export type MediaLayout = 'grid' | 'carousel' | 'masonry'
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate'
export type SortBy = 'date' | 'name' | 'size' | 'relevance'
export type SortOrder = 'asc' | 'desc'
export type AnimationDirection = 'up' | 'down' | 'left' | 'right'
