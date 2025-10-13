/**
 * R2Configuration model implementation
 * Configuration settings for Cloudflare R2 integration
 */

import { R2Configuration, R2ConfigurationState } from './r2'

export class R2ConfigurationModel implements R2Configuration {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  publicUrl: string
  region: string
  endpoint: string
  isEnabled: boolean
  fallbackEnabled: boolean

  constructor(data: Partial<R2Configuration> = {}) {
    this.accountId = data.accountId || ''
    this.accessKeyId = data.accessKeyId || ''
    this.secretAccessKey = data.secretAccessKey || ''
    this.bucketName = data.bucketName || ''
    this.publicUrl = data.publicUrl || ''
    this.region = data.region || 'auto'
    this.endpoint = data.endpoint || ''
    this.isEnabled = data.isEnabled ?? true
    this.fallbackEnabled = data.fallbackEnabled ?? true
  }

  /**
   * Validate the R2 configuration
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validate required fields
    if (!this.accountId) {
      errors.push('Account ID is required')
    }
    if (!this.accessKeyId) {
      errors.push('Access Key ID is required')
    }
    if (!this.secretAccessKey) {
      errors.push('Secret Access Key is required')
    }
    if (!this.bucketName) {
      errors.push('Bucket name is required')
    }
    if (!this.publicUrl) {
      errors.push('Public URL is required')
    }

    // Validate public URL format
    if (
      this.publicUrl &&
      !this.publicUrl.match(
        /^https:\/\/[a-zA-Z0-9.-]+\.r2\.cloudflarestorage\.com$/
      )
    ) {
      errors.push('Public URL must be a valid R2 Cloudflare Storage URL')
    }

    // Validate bucket name format
    if (
      this.bucketName &&
      !this.bucketName.match(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/)
    ) {
      errors.push('Bucket name must follow R2 naming conventions')
    }
    if (
      this.bucketName &&
      (this.bucketName.length < 3 || this.bucketName.length > 63)
    ) {
      errors.push('Bucket name must be between 3 and 63 characters')
    }

    // Validate endpoint format
    if (
      this.endpoint &&
      !this.endpoint.match(
        /^https:\/\/[a-zA-Z0-9-]+\.r2\.cloudflarestorage\.com$/
      )
    ) {
      errors.push('Endpoint must be a valid R2 Cloudflare Storage endpoint')
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Get the current state of the configuration
   */
  getState(): R2ConfigurationState {
    if (!this.isEnabled) {
      return 'disabled'
    }
    if (this.validate().isValid) {
      return 'enabled'
    }
    return 'error'
  }

  /**
   * Enable R2 integration
   */
  enable(): void {
    this.isEnabled = true
  }

  /**
   * Disable R2 integration
   */
  disable(): void {
    this.isEnabled = false
  }

  /**
   * Enable fallback behavior
   */
  enableFallback(): void {
    this.fallbackEnabled = true
  }

  /**
   * Disable fallback behavior
   */
  disableFallback(): void {
    this.fallbackEnabled = false
  }

  /**
   * Get the S3 client configuration
   */
  getS3Config() {
    return {
      region: this.region,
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    }
  }

  /**
   * Get the public URL for a specific object
   */
  getObjectUrl(objectKey: string): string {
    return `${this.publicUrl}/${objectKey}`
  }

  /**
   * Check if the configuration is ready for use
   */
  isReady(): boolean {
    return this.isEnabled && this.validate().isValid
  }

  /**
   * Get configuration summary (without sensitive data)
   */
  getSummary() {
    return {
      accountId: this.accountId,
      bucketName: this.bucketName,
      publicUrl: this.publicUrl,
      region: this.region,
      isEnabled: this.isEnabled,
      fallbackEnabled: this.fallbackEnabled,
      state: this.getState(),
    }
  }

  /**
   * Create configuration from environment variables
   */
  static fromEnvironment(): R2ConfigurationModel {
    const requiredEnvVars = [
      'R2_ACCOUNT_ID',
      'R2_ACCESS_KEY_ID',
      'R2_SECRET_ACCESS_KEY',
      'R2_BUCKET_NAME',
      'R2_PUBLIC_URL',
    ]

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      )
    }

    const accountId = process.env.R2_ACCOUNT_ID!
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`

    return new R2ConfigurationModel({
      accountId,
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      bucketName: process.env.R2_BUCKET_NAME!,
      publicUrl: process.env.R2_PUBLIC_URL!,
      region: process.env.R2_REGION || 'auto',
      endpoint,
      isEnabled: process.env.R2_ENABLED !== 'false',
      fallbackEnabled: process.env.R2_FALLBACK_ENABLED !== 'false',
    })
  }

  /**
   * Create configuration for testing
   */
  static forTesting(): R2ConfigurationModel {
    return new R2ConfigurationModel({
      accountId: 'test-account',
      accessKeyId: 'test-access-key',
      secretAccessKey: 'test-secret-key',
      bucketName: 'test-bucket',
      publicUrl: 'https://test-bucket.r2.cloudflarestorage.com',
      region: 'auto',
      endpoint: 'https://test-account.r2.cloudflarestorage.com',
      isEnabled: false, // Disabled for testing
      fallbackEnabled: true,
    })
  }
}
