/**
 * R2 configuration validator
 * Validates R2 configuration and connection
 */

import { R2ConfigurationModel } from '../types/r2-config'
import { R2ClientService } from '../services/r2-client'
import { ImageService } from '../services/image-service'

export class R2ConfigValidator {
  private config: R2ConfigurationModel
  private r2Client: R2ClientService

  constructor() {
    this.config = R2ConfigurationModel.fromEnvironment()
    this.r2Client = new R2ClientService(this.config)
  }

  /**
   * Validate R2 configuration
   */
  async validateConfiguration(): Promise<{
    isValid: boolean
    errors: string[]
    warnings: string[]
  }> {
    const errors: string[] = []
    const warnings: string[] = []

    // Validate configuration structure
    const configValidation = this.config.validate()
    if (!configValidation.isValid) {
      errors.push(...configValidation.errors)
    }

    // Test R2 connection
    try {
      const connectionTest = await this.r2Client.testConnection()
      if (!connectionTest.success) {
        errors.push(`R2 connection failed: ${connectionTest.error}`)
      }
    } catch (error) {
      errors.push(
        `R2 connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    // Check bucket access
    try {
      const healthStatus = await this.r2Client.getHealthStatus()
      if (healthStatus.status === 'unhealthy') {
        errors.push(`R2 service unhealthy: ${healthStatus.error}`)
      } else if (healthStatus.status === 'degraded') {
        warnings.push(`R2 service degraded: ${healthStatus.error}`)
      }
    } catch (error) {
      warnings.push(
        `R2 health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Test image service integration
   */
  async testImageService(): Promise<{
    success: boolean
    errors: string[]
    metrics: any
  }> {
    const errors: string[] = []

    try {
      const imageService = await ImageService.fromEnvironment()
      const health = await imageService.getHealthStatus()
      const metrics = imageService.getMetrics()

      if (health.overall === 'unhealthy') {
        errors.push('Image service is unhealthy')
      }

      return {
        success: errors.length === 0,
        errors,
        metrics,
      }
    } catch (error) {
      return {
        success: false,
        errors: [
          `Image service test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ],
        metrics: {},
      }
    }
  }

  /**
   * Run comprehensive validation
   */
  async runFullValidation(): Promise<{
    configuration: any
    imageService: any
    overall: {
      success: boolean
      errors: string[]
      warnings: string[]
    }
  }> {
    const configuration = await this.validateConfiguration()
    const imageService = await this.testImageService()

    const allErrors = [...configuration.errors, ...imageService.errors]
    const allWarnings = [...configuration.warnings]

    return {
      configuration,
      imageService,
      overall: {
        success: configuration.isValid && imageService.success,
        errors: allErrors,
        warnings: allWarnings,
      },
    }
  }

  /**
   * Get configuration summary
   */
  getConfigSummary() {
    return {
      config: this.config.getSummary(),
      r2Client: this.r2Client.getConfig(),
    }
  }
}

/**
 * Validate R2 configuration from command line
 */
export async function validateR2Config(): Promise<void> {
  console.log('🔍 Validating R2 configuration...\n')

  try {
    const validator = new R2ConfigValidator()
    const results = await validator.runFullValidation()

    console.log('📋 Configuration Summary:')
    console.log(JSON.stringify(validator.getConfigSummary(), null, 2))

    console.log('\n🔧 Configuration Validation:')
    if (results.configuration.isValid) {
      console.log('✅ Configuration is valid')
    } else {
      console.log('❌ Configuration has errors:')
      results.configuration.errors.forEach(error => console.log(`  - ${error}`))
    }

    if (results.configuration.warnings.length > 0) {
      console.log('⚠️  Configuration warnings:')
      results.configuration.warnings.forEach(warning =>
        console.log(`  - ${warning}`)
      )
    }

    console.log('\n🖼️  Image Service Test:')
    if (results.imageService.success) {
      console.log('✅ Image service is working')
    } else {
      console.log('❌ Image service errors:')
      results.imageService.errors.forEach(error => console.log(`  - ${error}`))
    }

    console.log('\n📊 Overall Status:')
    if (results.overall.success) {
      console.log('✅ All systems operational')
    } else {
      console.log('❌ System has issues:')
      results.overall.errors.forEach(error => console.log(`  - ${error}`))
    }

    if (results.overall.warnings.length > 0) {
      console.log('⚠️  System warnings:')
      results.overall.warnings.forEach(warning => console.log(`  - ${warning}`))
    }
  } catch (error) {
    console.error(
      '❌ Validation failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  }
}

// Run validation if called directly
if (require.main === module) {
  validateR2Config().catch(console.error)
}
