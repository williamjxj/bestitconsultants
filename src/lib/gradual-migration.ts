/**
 * Gradual migration strategy for existing images
 * Implements phased migration to minimize risk and impact
 */

import { ImageMigrationService } from '../services/image-migration'
import { ImageService } from '../services/image-service'
import { ImageAssetModel } from '../types/image-asset'

export interface MigrationPhase {
  name: string
  description: string
  imagePaths: string[]
  priority: 'high' | 'medium' | 'low'
  riskLevel: 'low' | 'medium' | 'high'
  estimatedDuration: number // in minutes
}

export interface MigrationPlan {
  phases: MigrationPhase[]
  totalImages: number
  estimatedTotalDuration: number
  rollbackPlan: string[]
}

export class GradualMigrationManager {
  private migrationService: ImageMigrationService
  private imageService: ImageService
  private migrationPlan: MigrationPlan

  constructor(
    migrationService: ImageMigrationService,
    imageService: ImageService
  ) {
    this.migrationService = migrationService
    this.imageService = imageService
    this.migrationPlan = this.createMigrationPlan()
  }

  /**
   * Create migration plan with phases
   */
  private createMigrationPlan(): MigrationPlan {
    const phases: MigrationPhase[] = [
      {
        name: 'Critical Images',
        description: 'Migrate hero images and above-the-fold content',
        imagePaths: [
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/hero-banner.jpg',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/logo.png',
          'R2 bucket favicon.ico',
        ],
        priority: 'high',
        riskLevel: 'low',
        estimatedDuration: 5,
      },
      {
        name: 'Portfolio Images',
        description: 'Migrate portfolio and case study images',
        imagePaths: [
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1350198816-612x612.jpg',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
        ],
        priority: 'high',
        riskLevel: 'medium',
        estimatedDuration: 10,
      },
      {
        name: 'Gallery Images',
        description: 'Migrate gallery and showcase images',
        imagePaths: [
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_1.png',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_2.png',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2163952011-612x612.webp',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-2227310361-612x612.webp',
        ],
        priority: 'medium',
        riskLevel: 'medium',
        estimatedDuration: 8,
      },
      {
        name: 'Supporting Images',
        description: 'Migrate remaining supporting images',
        imagePaths: [
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-492514758-612x612.webp',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1145868161-612x612.webp',
          'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
        ],
        priority: 'low',
        riskLevel: 'low',
        estimatedDuration: 5,
      },
    ]

    const totalImages = phases.reduce(
      (sum, phase) => sum + phase.imagePaths.length,
      0
    )
    const estimatedTotalDuration = phases.reduce(
      (sum, phase) => sum + phase.estimatedDuration,
      0
    )

    return {
      phases,
      totalImages,
      estimatedTotalDuration,
      rollbackPlan: [
        'Disable R2 integration',
        'Revert to local image serving',
        'Clear R2 cache',
        'Verify local image accessibility',
        'Monitor for 24 hours',
        'Clean up R2 resources if needed',
      ],
    }
  }

  /**
   * Execute migration phase
   */
  async executePhase(phaseIndex: number): Promise<{
    success: boolean
    migrated: number
    failed: number
    errors: string[]
    duration: number
  }> {
    const phase = this.migrationPlan.phases[phaseIndex]
    if (!phase) {
      throw new Error(`Invalid phase index: ${phaseIndex}`)
    }

    console.log(`🚀 Starting phase ${phaseIndex + 1}: ${phase.name}`)
    const startTime = Date.now()

    const results = {
      success: false,
      migrated: 0,
      failed: 0,
      errors: [] as string[],
      duration: 0,
    }

    try {
      // Migrate each image in the phase
      for (const imagePath of phase.imagePaths) {
        try {
          await this.migrationService.migrateSingleImage(imagePath)
          results.migrated++
          console.log(`✅ Migrated: ${imagePath}`)
        } catch (error) {
          results.failed++
          const errorMessage = `Failed to migrate ${imagePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
          results.errors.push(errorMessage)
          console.error(`❌ ${errorMessage}`)
        }
      }

      results.success = results.failed === 0
      results.duration = Date.now() - startTime

      console.log(
        `✅ Phase ${phaseIndex + 1} completed: ${results.migrated} migrated, ${results.failed} failed in ${results.duration}ms`
      )
    } catch (error) {
      results.duration = Date.now() - startTime
      results.errors.push(
        `Phase execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
      console.error(`❌ Phase ${phaseIndex + 1} failed:`, error)
    }

    return results
  }

  /**
   * Execute all migration phases
   */
  async executeAllPhases(): Promise<{
    success: boolean
    totalMigrated: number
    totalFailed: number
    phaseResults: Array<{
      phaseIndex: number
      phaseName: string
      success: boolean
      migrated: number
      failed: number
      duration: number
    }>
    totalDuration: number
  }> {
    console.log('🚀 Starting gradual migration process...')
    const startTime = Date.now()

    const phaseResults: Array<{
      phaseIndex: number
      phaseName: string
      success: boolean
      migrated: number
      failed: number
      duration: number
    }> = []

    let totalMigrated = 0
    let totalFailed = 0

    for (let i = 0; i < this.migrationPlan.phases.length; i++) {
      const phase = this.migrationPlan.phases[i]
      console.log(
        `\n📋 Phase ${i + 1}/${this.migrationPlan.phases.length}: ${phase.name}`
      )
      console.log(`   Description: ${phase.description}`)
      console.log(`   Images: ${phase.imagePaths.length}`)
      console.log(`   Priority: ${phase.priority}`)
      console.log(`   Risk Level: ${phase.riskLevel}`)

      const phaseResult = await this.executePhase(i)

      phaseResults.push({
        phaseIndex: i,
        phaseName: phase.name,
        success: phaseResult.success,
        migrated: phaseResult.migrated,
        failed: phaseResult.failed,
        duration: phaseResult.duration,
      })

      totalMigrated += phaseResult.migrated
      totalFailed += phaseResult.failed

      // Wait between phases for monitoring
      if (i < this.migrationPlan.phases.length - 1) {
        console.log('⏳ Waiting 30 seconds before next phase...')
        await new Promise(resolve => setTimeout(resolve, 30000))
      }
    }

    const totalDuration = Date.now() - startTime
    const overallSuccess = totalFailed === 0

    console.log(`\n🎉 Migration completed:`)
    console.log(`   Total migrated: ${totalMigrated}`)
    console.log(`   Total failed: ${totalFailed}`)
    console.log(`   Total duration: ${totalDuration}ms`)
    console.log(`   Overall success: ${overallSuccess ? '✅' : '❌'}`)

    return {
      success: overallSuccess,
      totalMigrated,
      totalFailed,
      phaseResults,
      totalDuration,
    }
  }

  /**
   * Get migration plan
   */
  getMigrationPlan(): MigrationPlan {
    return this.migrationPlan
  }

  /**
   * Validate migration readiness
   */
  async validateReadiness(): Promise<{
    ready: boolean
    issues: string[]
    recommendations: string[]
  }> {
    const issues: string[] = []
    const recommendations: string[] = []

    try {
      // Check R2 configuration
      const r2Health = await this.imageService.getHealthStatus()
      if (r2Health.r2 === 'unhealthy') {
        issues.push('R2 service is unhealthy')
        recommendations.push('Fix R2 configuration and connectivity')
      }

      // Check local images
      const verification = await this.migrationService.verifyMigration()
      if (verification.local === 0) {
        issues.push('No local images found')
        recommendations.push('Ensure local images exist in /publicR2 bucket ')
      }

      // Check available space
      if (verification.total > 100) {
        recommendations.push(
          'Consider migrating in smaller batches for large image sets'
        )
      }
    } catch (error) {
      issues.push(
        `Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    return {
      ready: issues.length === 0,
      issues,
      recommendations,
    }
  }

  /**
   * Get migration progress
   */
  async getMigrationProgress(): Promise<{
    currentPhase: number
    totalPhases: number
    phaseProgress: number
    overallProgress: number
    nextPhase?: string
  }> {
    const progress = await this.migrationService.getMigrationProgress()
    const currentPhase = Math.floor(progress.progress / 25) // Assuming 4 phases
    const totalPhases = this.migrationPlan.phases.length
    const phaseProgress = (progress.progress % 25) * 4 // Progress within current phase
    const overallProgress = progress.progress
    const nextPhase =
      currentPhase < totalPhases
        ? this.migrationPlan.phases[currentPhase].name
        : undefined

    return {
      currentPhase,
      totalPhases,
      phaseProgress,
      overallProgress,
      nextPhase,
    }
  }

  /**
   * Create rollback plan
   */
  getRollbackPlan(): string[] {
    return this.migrationPlan.rollbackPlan
  }

  /**
   * Execute rollback
   */
  async executeRollback(): Promise<{
    success: boolean
    message: string
    errors: string[]
  }> {
    console.log('🔄 Starting rollback process...')

    try {
      const rollbackResult = await this.migrationService.rollbackMigration()
      console.log(`✅ Rollback completed: ${rollbackResult.message}`)
      return rollbackResult
    } catch (error) {
      const errorMessage = `Rollback failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      console.error(`❌ ${errorMessage}`)
      return {
        success: false,
        message: 'Rollback failed',
        errors: [errorMessage],
      }
    }
  }
}

/**
 * Create gradual migration manager
 */
export async function createGradualMigrationManager(): Promise<GradualMigrationManager> {
  const migrationService = await ImageMigrationService.fromEnvironment()
  const imageService = await ImageService.fromEnvironment()
  return new GradualMigrationManager(migrationService, imageService)
}

/**
 * Run gradual migration
 */
export async function runGradualMigration(): Promise<void> {
  console.log('🚀 Starting gradual migration process...\n')

  try {
    const manager = await createGradualMigrationManager()

    // Validate readiness
    console.log('🔍 Validating migration readiness...')
    const readiness = await manager.validateReadiness()

    if (!readiness.ready) {
      console.log('❌ Migration not ready:')
      readiness.issues.forEach(issue => console.log(`  - ${issue}`))
      console.log('\n💡 Recommendations:')
      readiness.recommendations.forEach(rec => console.log(`  - ${rec}`))
      return
    }

    console.log('✅ Migration ready to proceed\n')

    // Show migration plan
    const plan = manager.getMigrationPlan()
    console.log('📋 Migration Plan:')
    plan.phases.forEach((phase, index) => {
      console.log(`  Phase ${index + 1}: ${phase.name}`)
      console.log(`    Images: ${phase.imagePaths.length}`)
      console.log(`    Priority: ${phase.priority}`)
      console.log(`    Risk: ${phase.riskLevel}`)
      console.log(`    Duration: ${phase.estimatedDuration} minutes`)
    })

    console.log(
      `\nTotal: ${plan.totalImages} images, ${plan.estimatedTotalDuration} minutes\n`
    )

    // Execute migration
    const results = await manager.executeAllPhases()

    console.log('\n📊 Final Results:')
    console.log(`  Success: ${results.success ? '✅' : '❌'}`)
    console.log(`  Migrated: ${results.totalMigrated}`)
    console.log(`  Failed: ${results.totalFailed}`)
    console.log(`  Duration: ${results.totalDuration}ms`)
  } catch (error) {
    console.error(
      '❌ Gradual migration failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
}

// Run migration if called directly
if (require.main === module) {
  runGradualMigration().catch(console.error)
}
