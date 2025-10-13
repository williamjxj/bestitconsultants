#!/usr/bin/env ts-node

/**
 * Migration verification script
 * Verifies that image references are working with R2 URLs
 */

import { ImageService } from '../src/services/image-service'
import { promises as fs } from 'fs'
import path from 'path'

async function verifyMigration() {
  console.log('🔍 Verifying image migration...\n')

  try {
    const imageService = await ImageService.fromEnvironment()

    // Get list of images that should be migrated
    const publicDir = path.join(process.cwd(), 'public')
    const imgsDir = path.join(publicDir, 'imgs')

    const files = await fs.readdir(imgsDir)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    console.log(`📸 Checking ${imageFiles.length} images:`)

    const results = {
      total: imageFiles.length,
      r2: 0,
      cache: 0,
      local: 0,
      errors: [] as string[],
    }

    for (const file of imageFiles) {
      const imagePath = `R2 bucket ${file}`
      console.log(`\n🔍 Checking ${imagePath}:`)

      try {
        const exists = await imageService.imageExists(imagePath)

        console.log(`  R2: ${exists.r2 ? '✅' : '❌'}`)
        console.log(`  Cache: ${exists.cache ? '✅' : '❌'}`)
        console.log(`  Local: ${exists.local ? '✅' : '❌'}`)

        if (exists.r2) results.r2++
        if (exists.cache) results.cache++
        if (exists.local) results.local++
      } catch (error) {
        const errorMessage = `Failed to check ${imagePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
        results.errors.push(errorMessage)
        console.error(`  ❌ ${errorMessage}`)
      }
    }

    console.log('\n📊 Verification Results:')
    console.log(`  Total images: ${results.total}`)
    console.log(`  Available in R2: ${results.r2}`)
    console.log(`  Available in cache: ${results.cache}`)
    console.log(`  Available locally: ${results.local}`)

    if (results.errors.length > 0) {
      console.log(`\n❌ Errors: ${results.errors.length}`)
      results.errors.forEach(error => console.log(`  - ${error}`))
    }

    // Test image loading
    console.log('\n🧪 Testing image loading...')
    const testImage = imageFiles[0]
    if (testImage) {
      try {
        const imagePath = `R2 bucket ${testImage}`
        const response = await imageService.getImage(imagePath)

        console.log(`✅ Test image loaded successfully:`)
        console.log(`  Content-Type: ${response.contentType}`)
        console.log(`  Content-Length: ${response.contentLength}`)
        console.log(`  Last-Modified: ${response.lastModified}`)
      } catch (error) {
        console.error(
          `❌ Test image loading failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }

    // Overall status
    const success = results.r2 > 0 || results.cache > 0 || results.local > 0
    console.log(
      `\n${success ? '✅' : '❌'} Migration verification ${success ? 'passed' : 'failed'}`
    )

    if (success) {
      console.log(
        '🎉 Images are accessible through the multi-tier fallback system'
      )
    } else {
      console.log('⚠️  No images are accessible through any tier')
    }
  } catch (error) {
    console.error(
      '❌ Verification failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  }
}

// Run verification
if (require.main === module) {
  verifyMigration().catch(console.error)
}

export { verifyMigration }
