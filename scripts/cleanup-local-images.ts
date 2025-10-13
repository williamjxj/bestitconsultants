#!/usr/bin/env ts-node
// scripts/cleanup-local-images.ts
import fs from 'fs/promises'
import path from 'path'
import { ImageMigrationService } from '../src/services/image-migration'
import { ImageAsset } from '../src/types/image-asset'

const publicDir = path.join(process.cwd(), 'public', 'imgs')

const imagesToClean: ImageAsset[] = [
  {
    id: '1',
    filename: 'gemini-1.jpg',
    path: 'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/gemini-1.jpg',
    format: 'jpg',
    size: 0,
    width: 0,
    height: 0,
    altText: '',
    r2Key: 'R2 bucket image',
    r2Url: '',
    localPath: path.join(publicDir, 'gemini-1.jpg'),
    isMigrated: true,
    lastAccessed: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add all other images...
]

async function cleanupLocalImages() {
  console.log('🧹 Starting cleanup of local images...')

  const migrationService = new ImageMigrationService()
  let successCount = 0
  let errorCount = 0

  for (const image of imagesToClean) {
    try {
      await migrationService.removeLocalImage(image)
      successCount++
    } catch (error) {
      console.error(`Failed to remove ${image.filename}:`, error)
      errorCount++
    }
  }

  console.log(`\n✅ Cleanup complete!`)
  console.log(`   - Removed: ${successCount}`)
  console.log(`   - Errors: ${errorCount}`)
}

cleanupLocalImages().catch(console.error)
