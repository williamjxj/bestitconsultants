/**
 * TypeScript interfaces for Cloudflare R2 integration
 */

export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'webp'

export type ImageAssetState =
  | 'local'
  | 'migrating'
  | 'r2'
  | 'fallback'
  | 'error'

export type R2ConfigurationState =
  | 'disabled'
  | 'enabled'
  | 'maintenance'
  | 'error'

/**
 * ImageAsset interface representing a media file stored in cloud storage
 */
export interface ImageAsset {
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
}

/**
 * R2Configuration interface for Cloudflare R2 integration settings
 */
export interface R2Configuration {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  publicUrl: string
  region: string
  endpoint: string
  isEnabled: boolean
  fallbackEnabled: boolean
}

/**
 * ImageCache interface for in-memory cache of frequently accessed images
 */
export interface ImageCache {
  key: string
  data: Buffer
  contentType: string
  lastModified: Date
  expiresAt: Date
  hitCount: number
  size: number
}

/**
 * R2 client response interface
 */
export interface R2Response {
  body: Buffer
  contentType: string
  contentLength: number
  lastModified: Date
  etag: string
}

/**
 * Image service options interface
 */
export interface ImageServiceOptions {
  useCache?: boolean
  fallbackToLocal?: boolean
  maxRetries?: number
  timeout?: number
}

/**
 * Migration status interface
 */
export interface MigrationStatus {
  total: number
  migrated: number
  failed: number
  pending: number
  errors: string[]
}

/**
 * Image upload result interface
 */
export interface ImageUploadResult {
  success: boolean
  r2Url?: string
  error?: string
  metadata?: Partial<ImageAsset>
}
