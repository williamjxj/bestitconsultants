/**
 * Input validation utilities for media endpoints
 * Provides validation functions for API requests and data
 */

import { MediaFormat, MediaLayout } from '@/types/media'

export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Validation input interfaces
interface MediaAssetData {
  src: string
  alt: string
  width?: number
  height?: number
  format?: string
  quality?: number
  layout?: string
  priority?: string
  loading?: string
}

interface MediaGalleryData {
  title: string
  description?: string
  assets: unknown[]
  layout?: string
  category?: string
  columns?: number
  spacing?: number
}

interface OptimizeRequestData {
  assetIds: string[]
  sizes: Array<{
    width: number
    height: number
    quality?: number
  }>
  format?: string
  formats?: string[]
}

interface PaginationParams {
  page?: number
  limit?: number
}

interface QueryParams {
  category?: string
  search?: string
  sort?: string
  format?: string
  priority?: string
}

/**
 * Validate media asset data
 */
export function validateMediaAsset(data: MediaAssetData): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!data.src || typeof data.src !== 'string') {
    errors.push({
      field: 'src',
      message: 'Source path is required',
      code: 'MISSING_SRC',
    })
  }

  if (!data.alt || typeof data.alt !== 'string') {
    errors.push({
      field: 'alt',
      message: 'Alt text is required',
      code: 'MISSING_ALT',
    })
  }

  if (!data.width || typeof data.width !== 'number' || data.width <= 0) {
    errors.push({
      field: 'width',
      message: 'Width must be a positive number',
      code: 'INVALID_WIDTH',
    })
  }

  if (!data.height || typeof data.height !== 'number' || data.height <= 0) {
    errors.push({
      field: 'height',
      message: 'Height must be a positive number',
      code: 'INVALID_HEIGHT',
    })
  }

  // Optional fields with validation
  if (data.format && !isValidMediaFormat(data.format)) {
    errors.push({
      field: 'format',
      message: 'Invalid format. Must be one of: webp, avif, jpeg, png',
      code: 'INVALID_FORMAT',
    })
  }

  if (data.priority && !isValidMediaPriority(data.priority)) {
    errors.push({
      field: 'priority',
      message: 'Invalid priority. Must be one of: high, medium, low',
      code: 'INVALID_PRIORITY',
    })
  }

  if (data.loading && !['eager', 'lazy'].includes(data.loading)) {
    errors.push({
      field: 'loading',
      message: 'Invalid loading strategy. Must be eager or lazy',
      code: 'INVALID_LOADING',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate media gallery data
 */
export function validateMediaGallery(data: MediaGalleryData): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (!data.title || typeof data.title !== 'string') {
    errors.push({
      field: 'title',
      message: 'Title is required',
      code: 'MISSING_TITLE',
    })
  }

  if (!data.description || typeof data.description !== 'string') {
    errors.push({
      field: 'description',
      message: 'Description is required',
      code: 'MISSING_DESCRIPTION',
    })
  }

  if (!data.assets || !Array.isArray(data.assets) || data.assets.length === 0) {
    errors.push({
      field: 'assets',
      message: 'Assets array is required and must not be empty',
      code: 'MISSING_ASSETS',
    })
  }

  // Optional fields with validation
  if (data.layout && !isValidMediaLayout(data.layout)) {
    errors.push({
      field: 'layout',
      message: 'Invalid layout. Must be one of: grid, carousel, masonry',
      code: 'INVALID_LAYOUT',
    })
  }

  if (
    data.columns &&
    (typeof data.columns !== 'number' || data.columns < 1 || data.columns > 6)
  ) {
    errors.push({
      field: 'columns',
      message: 'Columns must be between 1 and 6',
      code: 'INVALID_COLUMNS',
    })
  }

  if (data.spacing && (typeof data.spacing !== 'number' || data.spacing < 0)) {
    errors.push({
      field: 'spacing',
      message: 'Spacing must be non-negative',
      code: 'INVALID_SPACING',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate optimization request
 */
export function validateOptimizeRequest(
  data: OptimizeRequestData
): ValidationResult {
  const errors: ValidationError[] = []

  // Required fields
  if (
    !data.assetIds ||
    !Array.isArray(data.assetIds) ||
    data.assetIds.length === 0
  ) {
    errors.push({
      field: 'assetIds',
      message: 'Asset IDs array is required and must not be empty',
      code: 'MISSING_ASSET_IDS',
    })
  }

  if (
    !data.formats ||
    !Array.isArray(data.formats) ||
    data.formats.length === 0
  ) {
    errors.push({
      field: 'formats',
      message: 'Formats array is required and must not be empty',
      code: 'MISSING_FORMATS',
    })
  }

  // Validate formats
  if (data.formats) {
    const invalidFormats = data.formats.filter(
      (format: string) => !isValidMediaFormat(format)
    )
    if (invalidFormats.length > 0) {
      errors.push({
        field: 'formats',
        message: `Invalid formats: ${invalidFormats.join(', ')}. Must be one of: webp, avif, jpeg, png`,
        code: 'INVALID_FORMATS',
      })
    }
  }

  // Validate sizes if provided
  if (data.sizes) {
    if (!Array.isArray(data.sizes)) {
      errors.push({
        field: 'sizes',
        message: 'Sizes must be an array',
        code: 'INVALID_SIZES_TYPE',
      })
    } else {
      const invalidSizes = data.sizes.filter(
        (size: { width: number; height: number; quality?: number }) =>
          !size.width ||
          !size.height ||
          typeof size.width !== 'number' ||
          typeof size.height !== 'number' ||
          size.width <= 0 ||
          size.height <= 0
      )
      if (invalidSizes.length > 0) {
        errors.push({
          field: 'sizes',
          message: 'All sizes must have positive width and height values',
          code: 'INVALID_SIZES',
        })
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate pagination parameters
 */
export function validatePaginationParams(
  params: PaginationParams
): ValidationResult {
  const errors: ValidationError[] = []

  if (params.page && (typeof params.page !== 'number' || params.page < 1)) {
    errors.push({
      field: 'page',
      message: 'Page must be a positive integer',
      code: 'INVALID_PAGE',
    })
  }

  if (
    params.limit &&
    (typeof params.limit !== 'number' || params.limit < 1 || params.limit > 100)
  ) {
    errors.push({
      field: 'limit',
      message: 'Limit must be between 1 and 100',
      code: 'INVALID_LIMIT',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: File): ValidationResult {
  const errors: ValidationError[] = []

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  if (!allowedTypes.includes(file.type)) {
    errors.push({
      field: 'file',
      message: 'Invalid file type. Must be JPEG, PNG, WebP, or AVIF',
      code: 'INVALID_FILE_TYPE',
    })
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    errors.push({
      field: 'file',
      message: 'File too large. Maximum size is 5MB',
      code: 'FILE_TOO_LARGE',
    })
  }

  // Check file name
  if (!file.name || file.name.trim() === '') {
    errors.push({
      field: 'file',
      message: 'File name is required',
      code: 'MISSING_FILE_NAME',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate query parameters
 */
export function validateQueryParams(params: QueryParams): ValidationResult {
  const errors: ValidationError[] = []

  // Validate category
  if (params.category && typeof params.category !== 'string') {
    errors.push({
      field: 'category',
      message: 'Category must be a string',
      code: 'INVALID_CATEGORY',
    })
  }

  // Validate format
  if (params.format && !isValidMediaFormat(params.format)) {
    errors.push({
      field: 'format',
      message: 'Invalid format. Must be one of: webp, avif, jpeg, png',
      code: 'INVALID_FORMAT',
    })
  }

  // Validate priority
  if (params.priority && !isValidMediaPriority(params.priority)) {
    errors.push({
      field: 'priority',
      message: 'Invalid priority. Must be one of: high, medium, low',
      code: 'INVALID_PRIORITY',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Helper functions for validation
 */
export function isValidMediaFormat(format: string): format is MediaFormat {
  return ['webp', 'avif', 'jpeg', 'png'].includes(format.toLowerCase())
}

export function isValidMediaPriority(
  priority: string
): priority is 'high' | 'medium' | 'low' {
  return ['high', 'medium', 'low'].includes(priority.toLowerCase())
}

export function isValidMediaLayout(layout: string): layout is MediaLayout {
  return ['grid', 'carousel', 'masonry'].includes(layout.toLowerCase())
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

/**
 * Sanitize HTML input
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate UUID format
 */
export function isValidUuid(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}
