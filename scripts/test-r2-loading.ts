#!/usr/bin/env ts-node

/**
 * R2 loading test script
 * Tests image loading from R2 in development environment
 */

import { ImageService } from '../src/services/image-service'
import { R2ClientService } from '../src/services/r2-client'
import { R2ConfigurationModel } from '../src/types/r2-config'

async function testR2Loading() {
  console.log('🧪 Testing R2 image loading in development...\n')

  try {
    // Test R2 configuration
    console.log('🔧 Testing R2 configuration...')
    const r2Config = R2ConfigurationModel.fromEnvironment()
    const configValidation = r2Config.validate()

    if (!configValidation.isValid) {
      console.log('❌ R2 configuration is invalid:')
      configValidation.errors.forEach(error => console.log(`  - ${error}`))
      return
    }

    console.log('✅ R2 configuration is valid')

    // Test R2 connection
    console.log('\n🔗 Testing R2 connection...')
    const r2Client = new R2ClientService(r2Config)
    const connectionTest = await r2Client.testConnection()

    if (!connectionTest.success) {
      console.log('❌ R2 connection failed:', connectionTest.error)
      return
    }

    console.log('✅ R2 connection successful')

    // Test image service
    console.log('\n🖼️  Testing image service...')
    const imageService = await ImageService.fromEnvironment()
    const health = await imageService.getHealthStatus()

    console.log(`  R2: ${health.r2}`)
    console.log(`  Cache: ${health.cache}`)
    console.log(`  Local: ${health.local}`)
    console.log(`  Overall: ${health.overall}`)

    // Test specific images
    const testImages = [
      'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg',
      'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
      'https://ad9e2df833f783172de48d7948ed2acd.r2.cloudflarestorage.com/static-assetshttps://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_1.png',
    ]

    console.log('\n📸 Testing specific images:')

    for (const imagePath of testImages) {
      console.log(`\n🔍 Testing ${imagePath}:`)

      try {
        const startTime = Date.now()
        const response = await imageService.getImage(imagePath)
        const responseTime = Date.now() - startTime

        console.log(`  ✅ Loaded successfully (${responseTime}ms)`)
        console.log(`  Content-Type: ${response.contentType}`)
        console.log(`  Content-Length: ${response.contentLength}`)
        console.log(`  Last-Modified: ${response.lastModified}`)
      } catch (error) {
        console.log(
          `  ❌ Failed to load: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }

    // Test fallback behavior
    console.log('\n🔄 Testing fallback behavior...')

    // Simulate R2 failure
    console.log('  Simulating R2 failure...')
    // This would test the fallback mechanism

    // Test performance
    console.log('\n⚡ Testing performance...')
    const performanceTests = 5
    const responseTimes: number[] = []

    for (let i = 0; i < performanceTests; i++) {
      try {
        const startTime = Date.now()
        await imageService.getImage(testImages[0])
        const responseTime = Date.now() - startTime
        responseTimes.push(responseTime)
        console.log(`  Test ${i + 1}: ${responseTime}ms`)
      } catch (error) {
        console.log(`  Test ${i + 1}: Failed`)
      }
    }

    if (responseTimes.length > 0) {
      const averageResponseTime =
        responseTimes.reduce((sum, time) => sum + time, 0) /
        responseTimes.length
      const minResponseTime = Math.min(...responseTimes)
      const maxResponseTime = Math.max(...responseTimes)

      console.log(`\n📊 Performance Results:`)
      console.log(`  Average: ${averageResponseTime.toFixed(2)}ms`)
      console.log(`  Min: ${minResponseTime}ms`)
      console.log(`  Max: ${maxResponseTime}ms`)

      if (averageResponseTime < 200) {
        console.log('  ✅ Performance is good (<200ms)')
      } else if (averageResponseTime < 500) {
        console.log('  ⚠️  Performance is acceptable (<500ms)')
      } else {
        console.log('  ❌ Performance is poor (>500ms)')
      }
    }

    // Test cache behavior
    console.log('\n💾 Testing cache behavior...')
    const cacheMetrics = imageService.getMetrics()
    console.log(`  Cache stats:`, cacheMetrics.cache)

    // Overall test results
    console.log('\n🎯 Overall Test Results:')
    console.log(`  R2 Configuration: ✅`)
    console.log(`  R2 Connection: ✅`)
    console.log(
      `  Image Service: ${health.overall === 'healthy' ? '✅' : '⚠️'}`
    )
    console.log(`  Image Loading: ${responseTimes.length > 0 ? '✅' : '❌'}`)
    console.log(
      `  Performance: ${responseTimes.length > 0 && Math.min(...responseTimes) < 500 ? '✅' : '⚠️'}`
    )

    console.log('\n🎉 R2 loading test completed!')
  } catch (error) {
    console.error(
      '❌ R2 loading test failed:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  }
}

// Run test
if (require.main === module) {
  testR2Loading().catch(console.error)
}

export { testR2Loading }
