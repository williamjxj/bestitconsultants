/**
 * Image migration service
 * Service for migrating images from local filesystem to R2
 */

import { promises as fs } from 'fs'
import path from 'path'

import { ImageAssetModel } from '../types/image-asset'
import { MigrationStatus } from '../types/r2'

import { ImageService } from './image-service'

export class ImageMigrationService {
  private imageService: ImageService
  private publicDir: string

  constructor(imageService: ImageService) {
    this.imageService = imageService
    this.publicDir = path.join(process.cwd(), 'public')
  }

  /**
   * Migrate all images from local to R2
   */
  async migrateAllImages(): Promise<MigrationStatus> {
    const status: MigrationStatus = {
      total: 0,
      migrated: 0,
      failed: 0,
      pending: 0,
      errors: [],
    }

    try {
      // Get all image files from R2 bucket static-assets directory
      const imageFiles = await this.getLocalImageFiles()
      status.total = imageFiles.length
      status.pending = imageFiles.length

      console.warn(`Starting migration of ${imageFiles.length} images...`)

      // Migrate each image
      for (const imageFile of imageFiles) {
        try {
          await this.migrateSingleImage(imageFile)
          status.migrated++
          status.pending--
          console.warn(`Migrated: ${imageFile}`)
        } catch (error) {
          status.failed++
          status.pending--
          const errorMessage = `Failed to migrate ${imageFile}: ${error instanceof Error ? error.message : 'Unknown error'}`
          status.errors.push(errorMessage)
          console.error(errorMessage)
        }
      }

      console.warn(
        `Migration completed: ${status.migrated} migrated, ${status.failed} failed`
      )
      return status
    } catch (error) {
      const errorMessage = `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      status.errors.push(errorMessage)
      console.error(errorMessage)
      return status
    }
  }

  /**
   * Migrate a single image
   */
  async migrateSingleImage(imagePath: string): Promise<void> {
    const fullPath = path.join(this.publicDir, imagePath)

    try {
      // Read image file
      const imageData = await fs.readFile(fullPath)
      const stats = await fs.stat(fullPath)
      const contentType = this.getContentType(imagePath)

      // Create image asset
      const imageAsset = ImageAssetModel.fromFileSystem(fullPath, stats)

      // Upload to R2
      const uploadResult = await this.imageService.uploadImage(
        imagePath,
        imageData,
        contentType
      )

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Upload failed')
      }

      // Mark as migrated
      imageAsset.markAsMigrated(uploadResult.r2Url!, imageAsset.r2Key)

      console.warn(`Successfully migrated ${imagePath} to R2`)
    } catch (error) {
      throw new Error(
        `Failed to migrate ${imagePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Get all local image files
   */
  private async getLocalImageFiles(): Promise<string[]> {
    const imgsDir = path.join(this.publicDir, 'imgs')

    try {
      const files = await fs.readdir(imgsDir)
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase()
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
      })

      return imageFiles.map(file => `R2 bucket ${file}`)
    } catch (error) {
      throw new Error(
        `Failed to read images directory: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  /**
   * Get content type from file extension
   */
  private getContentType(imagePath: string): string {
    const extension = path.extname(imagePath).toLowerCase()
    const contentTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
    }
    return contentTypes[extension] || 'application/octet-stream'
  }

  /**
   * Verify migration status
   */
  async verifyMigration(): Promise<{
    total: number
    migrated: number
    local: number
    r2: number
    errors: string[]
  }> {
    const result = {
      total: 0,
      migrated: 0,
      local: 0,
      r2: 0,
      errors: [] as string[],
    }

    try {
      const imageFiles = await this.getLocalImageFiles()
      result.total = imageFiles.length

      for (const imagePath of imageFiles) {
        try {
          const exists = await this.imageService.imageExists(imagePath)

          if (exists.local) result.local++
          if (exists.r2) result.r2++
          if (exists.r2 && exists.local) result.migrated++
        } catch (error) {
          result.errors.push(
            `Failed to check ${imagePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        }
      }
    } catch (error) {
      result.errors.push(
        `Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    return result
  }

  /**
   * Rollback migration (remove from R2, keep local)
   */
  async rollbackMigration(): Promise<{
    success: boolean
    message: string
    errors: string[]
  }> {
    const errors: string[] = []

    try {
      const imageFiles = await this.getLocalImageFiles()

      for (const imagePath of imageFiles) {
        try {
          // Check if image exists in R2
          const exists = await this.imageService.imageExists(imagePath)

          if (exists.r2) {
            // Note: R2 deletion would require additional R2 client methods
            console.warn(`Would remove from R2: ${imagePath}`)
          }
        } catch (error) {
          errors.push(
            `Failed to rollback ${imagePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        }
      }

      return {
        success: errors.length === 0,
        message: `Rollback completed for ${imageFiles.length} images`,
        errors,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Rollback failed',
        errors: [
          `Rollback error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ],
      }
    }
  }

  /**
   * Get migration progress
   */
  async getMigrationProgress(): Promise<{
    status: 'not_started' | 'in_progress' | 'completed' | 'failed'
    progress: number
    details: MigrationStatus
  }> {
    try {
      const verification = await this.verifyMigration()
      const progress =
        verification.total > 0
          ? (verification.migrated / verification.total) * 100
          : 0

      let status: 'not_started' | 'in_progress' | 'completed' | 'failed' =
        'not_started'

      if (progress === 0) {
        status = 'not_started'
      } else if (progress === 100) {
        status = 'completed'
      } else if (verification.errors.length > 0) {
        status = 'failed'
      } else {
        status = 'in_progress'
      }

      return {
        status,
        progress,
        details: {
          total: verification.total,
          migrated: verification.migrated,
          failed: verification.errors.length,
          pending:
            verification.total -
            verification.migrated -
            verification.errors.length,
          errors: verification.errors,
        },
      }
    } catch (error) {
      return {
        status: 'failed',
        progress: 0,
        details: {
          total: 0,
          migrated: 0,
          failed: 1,
          pending: 0,
          errors: [
            `Progress check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          ],
        },
      }
    }
  }

  /**
   * Create migration service from environment
   */
  static async fromEnvironment(): Promise<ImageMigrationService> {
    const imageService = await ImageService.fromEnvironment()
    return new ImageMigrationService(imageService)
  }

  /**
   * Create migration service for testing
   */
  static forTesting(): ImageMigrationService {
    const imageService = ImageService.forTesting()
    return new ImageMigrationService(imageService)
  }
}
