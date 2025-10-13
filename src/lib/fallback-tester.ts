/**
 * Fallback testing utility
 * Tests multi-tier fallback behavior
 */

import { ImageService } from '../services/image-service'
import { R2ClientService } from '../services/r2-client'
import { ImageCacheService } from '../services/image-cache'
import { R2ConfigurationModel } from '../types/r2-config'

export class FallbackTester {
  private imageService: ImageService

  constructor(imageService: ImageService) {
    this.imageService = imageService
  }

  /**
   * Test fallback behavior for a specific image
   */
  async testImageFallback(imagePath: string): Promise<{
    r2: { success: boolean; error?: string; responseTime: number }
    cache: { success: boolean; error?: string; responseTime: number }
    local: { success: boolean; error?: string; responseTime: number }
    overall: { success: boolean; tier: string; responseTime: number }
  }> {
    const results = {
      r2: { success: false, responseTime: 0 },
      cache: { success: false, responseTime: 0 },
      local: { success: false, responseTime: 0 },
      overall: { success: false, tier: '', responseTime: 0 },
    }

    // Test R2 tier
    try {
      const r2Start = Date.now()
      const r2Response = await this.testR2Tier(imagePath)
      results.r2 = {
        success: true,
        responseTime: Date.now() - r2Start,
      }
      results.overall = {
        success: true,
        tier: 'r2',
        responseTime: results.r2.responseTime,
      }
      return results
    } catch (error) {
      results.r2 = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: 0,
      }
    }

    // Test cache tier
    try {
      const cacheStart = Date.now()
      const cacheResponse = await this.testCacheTier(imagePath)
      results.cache = {
        success: true,
        responseTime: Date.now() - cacheStart,
      }
      results.overall = {
        success: true,
        tier: 'cache',
        responseTime: results.cache.responseTime,
      }
      return results
    } catch (error) {
      results.cache = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: 0,
      }
    }

    // Test local tier
    try {
      const localStart = Date.now()
      const localResponse = await this.testLocalTier(imagePath)
      results.local = {
        success: true,
        responseTime: Date.now() - localStart,
      }
      results.overall = {
        success: true,
        tier: 'local',
        responseTime: results.local.responseTime,
      }
      return results
    } catch (error) {
      results.local = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: 0,
      }
    }

    // All tiers failed
    results.overall = {
      success: false,
      tier: 'none',
      responseTime: 0,
    }

    return results
  }

  /**
   * Test R2 tier specifically
   */
  private async testR2Tier(imagePath: string): Promise<any> {
    // This would test R2 directly
    throw new Error('R2 tier not available')
  }

  /**
   * Test cache tier specifically
   */
  private async testCacheTier(imagePath: string): Promise<any> {
    // This would test cache directly
    throw new Error('Cache tier not available')
  }

  /**
   * Test local tier specifically
   */
  private async testLocalTier(imagePath: string): Promise<any> {
    // This would test local files directly
    throw new Error('Local tier not available')
  }

  /**
   * Test fallback behavior with simulated failures
   */
  async testFallbackWithFailures(imagePath: string): Promise<{
    scenarios: Array<{
      name: string
      r2Available: boolean
      cacheAvailable: boolean
      localAvailable: boolean
      result: any
    }>
  }> {
    const scenarios = [
      {
        name: 'All tiers available',
        r2Available: true,
        cacheAvailable: true,
        localAvailable: true,
      },
      {
        name: 'R2 unavailable, cache and local available',
        r2Available: false,
        cacheAvailable: true,
        localAvailable: true,
      },
      {
        name: 'R2 and cache unavailable, local available',
        r2Available: false,
        cacheAvailable: false,
        localAvailable: true,
      },
      {
        name: 'All tiers unavailable',
        r2Available: false,
        cacheAvailable: false,
        localAvailable: false,
      },
    ]

    const results = []

    for (const scenario of scenarios) {
      try {
        // Simulate scenario conditions
        const result = await this.simulateScenario(imagePath, scenario)
        results.push({
          ...scenario,
          result,
        })
      } catch (error) {
        results.push({
          ...scenario,
          result: {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        })
      }
    }

    return { scenarios: results }
  }

  /**
   * Simulate a specific scenario
   */
  private async simulateScenario(
    imagePath: string,
    scenario: any
  ): Promise<any> {
    // This would simulate the scenario conditions
    return {
      success: scenario.localAvailable,
      tier: scenario.localAvailable ? 'local' : 'none',
      responseTime: Math.random() * 100,
    }
  }

  /**
   * Test fallback performance
   */
  async testFallbackPerformance(imagePaths: string[]): Promise<{
    averageResponseTime: number
    successRate: number
    tierDistribution: { [key: string]: number }
  }> {
    const results = []
    const tierCounts: { [key: string]: number } = {}

    for (const imagePath of imagePaths) {
      try {
        const result = await this.testImageFallback(imagePath)
        results.push(result)

        if (result.overall.success) {
          tierCounts[result.overall.tier] =
            (tierCounts[result.overall.tier] || 0) + 1
        }
      } catch (error) {
        // Handle error
      }
    }

    const successfulResults = results.filter(r => r.overall.success)
    const averageResponseTime =
      successfulResults.length > 0
        ? successfulResults.reduce(
            (sum, r) => sum + r.overall.responseTime,
            0
          ) / successfulResults.length
        : 0

    const successRate =
      results.length > 0 ? successfulResults.length / results.length : 0

    return {
      averageResponseTime,
      successRate,
      tierDistribution: tierCounts,
    }
  }
}

/**
 * Create fallback tester from environment
 */
export async function createFallbackTester(): Promise<FallbackTester> {
  const imageService = await ImageService.fromEnvironment()
  return new FallbackTester(imageService)
}

/**
 * Run fallback tests
 */
export async function runFallbackTests(): Promise<void> {
  console.log('🔄 Testing fallback behavior...\n')

  try {
    const tester = await createFallbackTester()

    // Test with sample images
    const testImages = [
      'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg',
      'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
      'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_1.png',
    ]

    console.log('📊 Testing individual images:')
    for (const imagePath of testImages) {
      console.log(`\nTesting ${imagePath}:`)
      const result = await tester.testImageFallback(imagePath)
      console.log(
        `  R2: ${result.r2.success ? '✅' : '❌'} (${result.r2.responseTime}ms)`
      )
      console.log(
        `  Cache: ${result.cache.success ? '✅' : '❌'} (${result.cache.responseTime}ms)`
      )
      console.log(
        `  Local: ${result.local.success ? '✅' : '❌'} (${result.local.responseTime}ms)`
      )
      console.log(
        `  Overall: ${result.overall.success ? '✅' : '❌'} (${result.overall.tier})`
      )
    }

    console.log('\n📈 Performance test:')
    const performance = await tester.testFallbackPerformance(testImages)
    console.log(
      `  Average response time: ${performance.averageResponseTime.toFixed(2)}ms`
    )
    console.log(
      `  Success rate: ${(performance.successRate * 100).toFixed(1)}%`
    )
    console.log(`  Tier distribution:`, performance.tierDistribution)
  } catch (error) {
    console.error(
      '❌ Fallback testing failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
}

// Run tests if called directly
if (require.main === module) {
  runFallbackTests().catch(console.error)
}
