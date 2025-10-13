#!/usr/bin/env ts-node

/**
 * Image migration script
 * Uploads all existing images to R2 bucket
 */

import { ImageMigrationService } from '../src/services/image-migration'
import { promises as fs } from 'fs'
import path from 'path'

async function migrateImages() {
  console.log('🚀 Starting image migration to R2...\n')

  try {
    // Initialize migration service
    const migrationService = await ImageMigrationService.fromEnvironment()

    // Get list of existing images
    const publicDir = path.join(process.cwd(), 'public')
    const imgsDir = path.join(publicDir, 'imgs')

    console.log('📁 Scanning for images in:', imgsDir)

    const files = await fs.readdir(imgsDir)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    console.log(`📸 Found ${imageFiles.length} images to migrate:`)
    imageFiles.forEach(file => console.log(`  - ${file}`))

    if (imageFiles.length === 0) {
      console.log('❌ No images found to migrate')
      return
    }

    // Execute migration
    console.log('\n🔄 Starting migration...')
    const results = await migrationService.migrateAllImages()

    console.log('\n📊 Migration Results:')
    console.log(`  Total: ${results.total}`)
    console.log(`  Migrated: ${results.migrated}`)
    console.log(`  Failed: ${results.failed}`)
    console.log(`  Pending: ${results.pending}`)

    if (results.errors.length > 0) {
      console.log('\n❌ Errors:')
      results.errors.forEach(error => console.log(`  - ${error}`))
    }

    if (results.migrated > 0) {
      console.log('\n✅ Migration completed successfully!')
      console.log('🔗 Images are now available from R2 with the same URLs')
    } else {
      console.log('\n❌ No images were migrated')
    }
  } catch (error) {
    console.error(
      '❌ Migration failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  }
}

// Run migration
if (require.main === module) {
  migrateImages().catch(console.error)
}

export { migrateImages }
