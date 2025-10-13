#!/usr/bin/env ts-node
// scripts/check-migration-status.ts
import fs from 'fs/promises'
import path from 'path'

interface MigrationStatus {
  localImages: string[]
  r2ConfigExists: boolean
  middlewareExists: boolean
  servicesExist: boolean
  documentationExists: boolean
}

async function checkMigrationStatus(): Promise<MigrationStatus> {
  console.log('🔍 Checking Cloudflare R2 migration status...\n')

  const status: MigrationStatus = {
    localImages: [],
    r2ConfigExists: false,
    middlewareExists: false,
    servicesExist: false,
    documentationExists: false,
  }

  // Check local images
  try {
    const imgsDir = path.join(process.cwd(), 'public', 'imgs')
    const files = await fs.readdir(imgsDir)
    status.localImages = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })
    console.log(
      `📸 Found ${status.localImages.length} local images in /publicR2 bucket `
    )
  } catch (error) {
    console.log('❌ Could not read /publicR2 bucket  directory')
  }

  // Check R2 configuration
  try {
    await fs.access(path.join(process.cwd(), 'src', 'config', 'r2-config.ts'))
    status.r2ConfigExists = true
    console.log('✅ R2 configuration exists')
  } catch {
    console.log('❌ R2 configuration missing')
  }

  // Check middleware
  try {
    await fs.access(path.join(process.cwd(), 'middleware.ts'))
    status.middlewareExists = true
    console.log('✅ Middleware exists')
  } catch {
    console.log('❌ Middleware missing')
  }

  // Check services
  const serviceFiles = [
    'src/services/r2-client.ts',
    'src/services/image-service.ts',
    'src/services/image-cache.ts',
    'src/services/image-migration.ts',
  ]

  let servicesCount = 0
  for (const serviceFile of serviceFiles) {
    try {
      await fs.access(path.join(process.cwd(), serviceFile))
      servicesCount++
    } catch {
      console.log(`❌ Missing service: ${serviceFile}`)
    }
  }

  status.servicesExist = servicesCount === serviceFiles.length
  console.log(`✅ ${servicesCount}/${serviceFiles.length} services exist`)

  // Check documentation
  try {
    await fs.access(path.join(process.cwd(), 'docs', 'r2-integration.md'))
    status.documentationExists = true
    console.log('✅ Documentation exists')
  } catch {
    console.log('❌ Documentation missing')
  }

  return status
}

async function generateMigrationReport(status: MigrationStatus) {
  console.log('\n📊 Migration Status Report')
  console.log('='.repeat(50))

  console.log(`\n📸 Local Images (${status.localImages.length}):`)
  status.localImages.forEach(img => console.log(`  - ${img}`))

  console.log('\n🔧 Infrastructure:')
  console.log(`  - R2 Config: ${status.r2ConfigExists ? '✅' : '❌'}`)
  console.log(`  - Middleware: ${status.middlewareExists ? '✅' : '❌'}`)
  console.log(`  - Services: ${status.servicesExist ? '✅' : '❌'}`)
  console.log(`  - Documentation: ${status.documentationExists ? '✅' : '❌'}`)

  const infrastructureComplete =
    status.r2ConfigExists && status.middlewareExists && status.servicesExist

  console.log('\n🎯 Migration Status:')
  if (infrastructureComplete && status.localImages.length > 0) {
    console.log('⚠️  READY FOR MIGRATION')
    console.log('   - Infrastructure is in place')
    console.log('   - Local images need to be uploaded to R2')
    console.log('   - Run: npx ts-node scripts/migrate-images.ts')
  } else if (infrastructureComplete && status.localImages.length === 0) {
    console.log('✅ MIGRATION COMPLETE')
    console.log('   - All infrastructure is in place')
    console.log('   - No local images found (likely migrated)')
  } else {
    console.log('❌ MIGRATION INCOMPLETE')
    console.log('   - Missing infrastructure components')
    console.log('   - Run implementation tasks first')
  }

  console.log('\n📋 Next Steps:')
  if (!infrastructureComplete) {
    console.log('1. Complete infrastructure setup')
    console.log('2. Configure R2 credentials in .env.local')
    console.log('3. Test R2 connection')
  } else if (status.localImages.length > 0) {
    console.log('1. Upload images to R2: npx ts-node scripts/migrate-images.ts')
    console.log('2. Verify migration: npx ts-node scripts/verify-migration.ts')
    console.log('3. Test image loading')
  } else {
    console.log('1. Test image loading from R2')
    console.log('2. Monitor performance metrics')
    console.log('3. Clean up local files if desired')
  }
}

async function main() {
  try {
    const status = await checkMigrationStatus()
    await generateMigrationReport(status)
  } catch (error) {
    console.error('❌ Status check failed:', error)
    process.exit(1)
  }
}

// Run if this is the main module
main().catch(console.error)

export { checkMigrationStatus, generateMigrationReport }
