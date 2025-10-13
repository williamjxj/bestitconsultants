/**
 * R2 client service implementation
 * Service for interacting with Cloudflare R2 using AWS SDK v3
 */

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'

import { R2Response, ImageUploadResult } from '../types/r2'
import { R2ConfigurationModel } from '../types/r2-config'

export class R2ClientService {
  private client: S3Client
  private config: R2ConfigurationModel

  constructor(config: R2ConfigurationModel) {
    this.config = config
    this.client = new S3Client(config.getS3Config())
  }

  /**
   * Get an object from R2
   */
  async getObject(objectKey: string): Promise<R2Response> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.config.bucketName,
        Key: objectKey,
      })

      const response = await this.client.send(command)

      if (!response.Body) {
        throw new Error('No body in response')
      }

      // Convert stream to buffer
      const chunks: Buffer[] = []
      const stream = response.Body as AsyncIterable<Buffer>

      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk))
      }

      const buffer = Buffer.concat(chunks)

      return {
        body: buffer,
        contentType: response.ContentType || 'application/octet-stream',
        contentLength: response.ContentLength || buffer.length,
        lastModified: response.LastModified || new Date(),
        etag: response.ETag || '',
      }
    } catch (error) {
      throw new Error(
        `Failed to get object from R2: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Put an object to R2
   */
  async putObject(
    objectKey: string,
    data: Buffer,
    contentType: string
  ): Promise<ImageUploadResult> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: objectKey,
        Body: data,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      })

      await this.client.send(command)

      return {
        success: true,
        r2Url: this.config.getObjectUrl(objectKey),
        metadata: {
          updatedAt: new Date(),
        },
      }
    } catch (error) {
      return {
        success: false,
        error: `Failed to upload object to R2: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  /**
   * Check if an object exists in R2
   */
  async objectExists(objectKey: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.config.bucketName,
        Key: objectKey,
      })

      await this.client.send(command)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Get object metadata from R2
   */
  async getObjectMetadata(objectKey: string): Promise<{
    exists: boolean
    size?: number
    lastModified?: Date
    contentType?: string
    etag?: string
  }> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.config.bucketName,
        Key: objectKey,
      })

      const response = await this.client.send(command)

      return {
        exists: true,
        size: response.ContentLength,
        lastModified: response.LastModified,
        contentType: response.ContentType,
        etag: response.ETag,
      }
    } catch (error) {
      return {
        exists: false,
      }
    }
  }

  /**
   * List objects in R2 bucket
   */
  async listObjects(
    prefix: string = '',
    maxKeys: number = 1000
  ): Promise<{
    objects: Array<{
      key: string
      size: number
      lastModified: Date
      etag: string
    }>
    isTruncated: boolean
    nextContinuationToken?: string
  }> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.config.bucketName,
        Prefix: prefix,
        MaxKeys: maxKeys,
      })

      const response = await this.client.send(command)

      return {
        objects: (response.Contents || []).map(obj => ({
          key: obj.Key || '',
          size: obj.Size || 0,
          lastModified: obj.LastModified || new Date(),
          etag: obj.ETag || '',
        })),
        isTruncated: response.IsTruncated || false,
        nextContinuationToken: response.NextContinuationToken,
      }
    } catch (error) {
      throw new Error(
        `Failed to list objects from R2: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Upload multiple objects to R2
   */
  async uploadMultipleObjects(
    objects: Array<{
      key: string
      data: Buffer
      contentType: string
    }>
  ): Promise<Array<ImageUploadResult>> {
    const results: ImageUploadResult[] = []

    for (const obj of objects) {
      const result = await this.putObject(obj.key, obj.data, obj.contentType)
      results.push(result)
    }

    return results
  }

  /**
   * Test R2 connection
   */
  async testConnection(): Promise<{
    success: boolean
    error?: string
    bucketExists?: boolean
  }> {
    try {
      // Try to list objects to test connection
      await this.listObjects('', 1)

      return {
        success: true,
        bucketExists: true,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        bucketExists: false,
      }
    }
  }

  /**
   * Get R2 service health
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    responseTime: number
    error?: string
  }> {
    const startTime = Date.now()

    try {
      await this.testConnection()
      const responseTime = Date.now() - startTime

      return {
        status: responseTime < 1000 ? 'healthy' : 'degraded',
        responseTime,
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Get public URL for an object
   */
  getPublicUrl(objectKey: string): string {
    return this.config.getObjectUrl(objectKey)
  }

  /**
   * Get client configuration
   */
  getConfig() {
    return this.config.getSummary()
  }

  /**
   * Update client configuration
   */
  updateConfig(newConfig: R2ConfigurationModel): void {
    this.config = newConfig
    this.client = new S3Client(newConfig.getS3Config())
  }

  /**
   * Create R2 client from environment variables
   */
  static fromEnvironment(): R2ClientService {
    const config = R2ConfigurationModel.fromEnvironment()
    return new R2ClientService(config)
  }

  /**
   * Create R2 client for testing
   */
  static forTesting(): R2ClientService {
    const config = R2ConfigurationModel.forTesting()
    return new R2ClientService(config)
  }
}
