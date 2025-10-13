/**
 * ImageAsset model implementation
 * Represents a media file stored in cloud storage with metadata and access information
 */

import { ImageAsset, ImageFormat, ImageAssetState } from './r2'

export class ImageAssetModel implements ImageAsset {
  id: string
  filename: string
  path: string
  format: ImageFormat
  size: number
  width: number
  height: number
  altText: string
  r2Key: string
  r2Url: string
  localPath: string
  isMigrated: boolean
  lastAccessed: Date
  createdAt: Date
  updatedAt: Date

  constructor(data: Partial<ImageAsset> = {}) {
    this.id = data.id || this.generateId()
    this.filename = data.filename || ''
    this.path = data.path || ''
    this.format = data.format || 'jpg'
    this.size = data.size || 0
    this.width = data.width || 0
    this.height = data.height || 0
    this.altText = data.altText || ''
    this.r2Key = data.r2Key || ''
    this.r2Url = data.r2Url || ''
    this.localPath = data.localPath || ''
    this.isMigrated = data.isMigrated || false
    this.lastAccessed = data.lastAccessed || new Date()
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  /**
   * Generate a unique ID for the image asset
   */
  private generateId(): string {
    return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Validate the image asset data
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validate filename pattern
    if (!this.filename.match(/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/)) {
      errors.push(
        'Filename must match pattern: ^[a-zA-Z0-9._-]+\\.(jpg|jpeg|png|webp)$'
      )
    }

    // Validate path starts with R2 bucket 
    if (!this.path.startsWith('R2 bucket ')) {
      errors.push('Path must start with R2 bucket ')
    }

    // Validate size constraints
    if (this.size <= 0) {
      errors.push('Size must be greater than 0')
    }
    if (this.size > 10 * 1024 * 1024) {
      // 10MB
      errors.push('Size must be less than 10MB')
    }

    // Validate dimensions
    if (this.width <= 0 || this.height <= 0) {
      errors.push('Width and height must be greater than 0')
    }
    if (this.width > 8192 || this.height > 8192) {
      errors.push('Width and height must be less than 8192 pixels')
    }

    // Validate R2 key format
    if (
      this.r2Key &&
      !this.r2Key.match(/^imgs\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/)
    ) {
      errors.push(
        'R2 key must match pattern: ^imgs\\/[a-zA-Z0-9._-]+\\.(jpg|jpeg|png|webp)$'
      )
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Update the last accessed timestamp
   */
  updateLastAccessed(): void {
    this.lastAccessed = new Date()
    this.updatedAt = new Date()
  }

  /**
   * Mark the asset as migrated
   */
  markAsMigrated(r2Url: string, r2Key: string): void {
    this.isMigrated = true
    this.r2Url = r2Url
    this.r2Key = r2Key
    this.updatedAt = new Date()
  }

  /**
   * Get the current state of the asset
   */
  getState(): ImageAssetState {
    if (!this.isMigrated && !this.r2Url) {
      return 'local'
    }
    if (this.isMigrated && this.r2Url) {
      return 'r2'
    }
    return 'error'
  }

  /**
   * Get the public URL for the asset
   */
  getPublicUrl(): string {
    if (this.isMigrated && this.r2Url) {
      return this.r2Url
    }
    return this.path // Fallback to local path
  }

  /**
   * Get the local file path
   */
  getLocalPath(): string {
    return this.localPath || `/public${this.path}`
  }

  /**
   * Check if the asset exists locally
   */
  hasLocalFile(): boolean {
    return !!this.localPath
  }

  /**
   * Check if the asset is available in R2
   */
  hasR2File(): boolean {
    return this.isMigrated && !!this.r2Url
  }

  /**
   * Get asset metadata for API responses
   */
  getMetadata() {
    return {
      id: this.id,
      filename: this.filename,
      path: this.path,
      format: this.format,
      size: this.size,
      width: this.width,
      height: this.height,
      altText: this.altText,
      isMigrated: this.isMigrated,
      state: this.getState(),
      lastAccessed: this.lastAccessed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  /**
   * Create a new ImageAsset from file system data
   */
  static fromFileSystem(filePath: string, stats: any): ImageAssetModel {
    const filename = filePath.split('/').pop() || ''
    const path = filePath.replace('/public', '')
    const format =
      (filename.split('.').pop()?.toLowerCase() as ImageFormat) || 'jpg'

    return new ImageAssetModel({
      filename,
      path,
      format,
      size: stats.size,
      width: 0, // Will be set by image processing
      height: 0, // Will be set by image processing
      altText: filename.replace(/\.[^/.]+$/, ''), // Remove extension for alt text
      localPath: filePath,
      isMigrated: false,
    })
  }

  /**
   * Create a new ImageAsset from R2 data
   */
  static fromR2(r2Data: any, publicUrl: string): ImageAssetModel {
    const filename = r2Data.Key.split('/').pop() || ''
    const path = `/${r2Data.Key}`
    const format =
      (filename.split('.').pop()?.toLowerCase() as ImageFormat) || 'jpg'

    return new ImageAssetModel({
      filename,
      path,
      format,
      size: r2Data.Size,
      width: 0, // Will be set by image processing
      height: 0, // Will be set by image processing
      altText: filename.replace(/\.[^/.]+$/, ''),
      r2Key: r2Data.Key,
      r2Url: `${publicUrl}/${r2Data.Key}`,
      isMigrated: true,
    })
  }
}
