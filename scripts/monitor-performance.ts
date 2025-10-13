#!/usr/bin/env ts-node

/**
 * Performance monitoring script
 * Monitors performance metrics during migration
 */

import { ImageService } from '../src/services/image-service'
import { ImageCacheService } from '../src/services/image-cache'
import { R2ClientService } from '../src/services/r2-client'
import { R2ConfigurationModel } from '../src/types/r2-config'

interface PerformanceMetrics {
  timestamp: Date
  r2ResponseTime: number
  cacheHitRate: number
  errorRate: number
  totalRequests: number
  averageResponseTime: number
  memoryUsage: NodeJS.MemoryUsage
}

class PerformanceMonitor {
  private imageService: ImageService
  private cacheService: ImageCacheService
  private r2Client: R2ClientService
  private metrics: PerformanceMetrics[] = []
  private isMonitoring: boolean = false
  private monitoringInterval?: NodeJS.Timeout

  constructor(
    imageService: ImageService,
    cacheService: ImageCacheService,
    r2Client: R2ClientService
  ) {
    this.imageService = imageService
    this.cacheService = cacheService
    this.r2Client = r2Client
  }

  /**
   * Start monitoring
   */
  startMonitoring(intervalMs: number = 30000): void {
    if (this.isMonitoring) {
      console.log('⚠️  Monitoring already started')
      return
    }

    this.isMonitoring = true
    console.log(
      `🔍 Starting performance monitoring (interval: ${intervalMs}ms)...`
    )

    this.monitoringInterval = setInterval(async () => {
      try {
        await this.collectMetrics()
      } catch (error) {
        console.error('❌ Failed to collect metrics:', error)
      }
    }, intervalMs)
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = undefined
    }
    this.isMonitoring = false
    console.log('🛑 Performance monitoring stopped')
  }

  /**
   * Collect performance metrics
   */
  private async collectMetrics(): Promise<void> {
    const timestamp = new Date()

    try {
      // Get R2 health
      const r2Health = await this.r2Client.getHealthStatus()

      // Get cache metrics
      const cacheStats = this.cacheService.getCacheStats()
      const cacheMetrics = this.cacheService.getPerformanceMetrics()

      // Get image service health
      const imageHealth = await this.imageService.getHealthStatus()

      // Get memory usage
      const memoryUsage = process.memoryUsage()

      const metrics: PerformanceMetrics = {
        timestamp,
        r2ResponseTime: r2Health.responseTime,
        cacheHitRate: cacheMetrics.hitRate,
        errorRate: 1 - cacheMetrics.hitRate, // Simplified error rate
        totalRequests: cacheMetrics.totalRequests,
        averageResponseTime: cacheMetrics.averageResponseTime,
        memoryUsage,
      }

      this.metrics.push(metrics)

      // Maintain metrics history (keep last 100 entries)
      if (this.metrics.length > 100) {
        this.metrics = this.metrics.slice(-100)
      }

      // Log current metrics
      console.log(`📊 [${timestamp.toISOString()}] Performance Metrics:`)
      console.log(`  R2 Response Time: ${metrics.r2ResponseTime}ms`)
      console.log(
        `  Cache Hit Rate: ${(metrics.cacheHitRate * 100).toFixed(1)}%`
      )
      console.log(`  Error Rate: ${(metrics.errorRate * 100).toFixed(1)}%`)
      console.log(`  Total Requests: ${metrics.totalRequests}`)
      console.log(
        `  Average Response Time: ${metrics.averageResponseTime.toFixed(2)}ms`
      )
      console.log(
        `  Memory Usage: ${(metrics.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`
      )
    } catch (error) {
      console.error('❌ Failed to collect metrics:', error)
    }
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    totalSamples: number
    averageR2ResponseTime: number
    averageCacheHitRate: number
    averageErrorRate: number
    averageResponseTime: number
    peakMemoryUsage: number
    currentMemoryUsage: number
    trends: {
      r2ResponseTime: 'improving' | 'stable' | 'degrading'
      cacheHitRate: 'improving' | 'stable' | 'degrading'
      memoryUsage: 'stable' | 'increasing' | 'decreasing'
    }
  } {
    if (this.metrics.length === 0) {
      return {
        totalSamples: 0,
        averageR2ResponseTime: 0,
        averageCacheHitRate: 0,
        averageErrorRate: 0,
        averageResponseTime: 0,
        peakMemoryUsage: 0,
        currentMemoryUsage: 0,
        trends: {
          r2ResponseTime: 'stable',
          cacheHitRate: 'stable',
          memoryUsage: 'stable',
        },
      }
    }

    const totalSamples = this.metrics.length
    const averageR2ResponseTime =
      this.metrics.reduce((sum, m) => sum + m.r2ResponseTime, 0) / totalSamples
    const averageCacheHitRate =
      this.metrics.reduce((sum, m) => sum + m.cacheHitRate, 0) / totalSamples
    const averageErrorRate =
      this.metrics.reduce((sum, m) => sum + m.errorRate, 0) / totalSamples
    const averageResponseTime =
      this.metrics.reduce((sum, m) => sum + m.averageResponseTime, 0) /
      totalSamples

    const memoryUsages = this.metrics.map(m => m.memoryUsage.heapUsed)
    const peakMemoryUsage = Math.max(...memoryUsages)
    const currentMemoryUsage = memoryUsages[memoryUsages.length - 1]

    // Calculate trends (comparing first half vs second half)
    const halfPoint = Math.floor(totalSamples / 2)
    const firstHalf = this.metrics.slice(0, halfPoint)
    const secondHalf = this.metrics.slice(halfPoint)

    const firstHalfR2 =
      firstHalf.reduce((sum, m) => sum + m.r2ResponseTime, 0) / firstHalf.length
    const secondHalfR2 =
      secondHalf.reduce((sum, m) => sum + m.r2ResponseTime, 0) /
      secondHalf.length
    const r2ResponseTimeTrend =
      secondHalfR2 < firstHalfR2
        ? 'improving'
        : secondHalfR2 > firstHalfR2
          ? 'degrading'
          : 'stable'

    const firstHalfCache =
      firstHalf.reduce((sum, m) => sum + m.cacheHitRate, 0) / firstHalf.length
    const secondHalfCache =
      secondHalf.reduce((sum, m) => sum + m.cacheHitRate, 0) / secondHalf.length
    const cacheHitRateTrend =
      secondHalfCache > firstHalfCache
        ? 'improving'
        : secondHalfCache < firstHalfCache
          ? 'degrading'
          : 'stable'

    const firstHalfMemory =
      firstHalf.reduce((sum, m) => sum + m.memoryUsage.heapUsed, 0) /
      firstHalf.length
    const secondHalfMemory =
      secondHalf.reduce((sum, m) => sum + m.memoryUsage.heapUsed, 0) /
      secondHalf.length
    const memoryUsageTrend =
      secondHalfMemory > firstHalfMemory
        ? 'increasing'
        : secondHalfMemory < firstHalfMemory
          ? 'decreasing'
          : 'stable'

    return {
      totalSamples,
      averageR2ResponseTime,
      averageCacheHitRate,
      averageErrorRate,
      averageResponseTime,
      peakMemoryUsage,
      currentMemoryUsage,
      trends: {
        r2ResponseTime: r2ResponseTimeTrend,
        cacheHitRate: cacheHitRateTrend,
        memoryUsage: memoryUsageTrend,
      },
    }
  }

  /**
   * Get alerts for performance issues
   */
  getAlerts(): string[] {
    const alerts: string[] = []
    const summary = this.getPerformanceSummary()

    if (summary.averageR2ResponseTime > 1000) {
      alerts.push('R2 response time is high (>1000ms)')
    }

    if (summary.averageCacheHitRate < 0.8) {
      alerts.push('Cache hit rate is low (<80%)')
    }

    if (summary.averageErrorRate > 0.1) {
      alerts.push('Error rate is high (>10%)')
    }

    if (summary.averageResponseTime > 500) {
      alerts.push('Average response time is high (>500ms)')
    }

    if (summary.currentMemoryUsage > 100 * 1024 * 1024) {
      // 100MB
      alerts.push('Memory usage is high (>100MB)')
    }

    return alerts
  }

  /**
   * Export metrics to JSON
   */
  exportMetrics(): string {
    return JSON.stringify(this.metrics, null, 2)
  }

  /**
   * Get monitoring status
   */
  getStatus(): {
    isMonitoring: boolean
    totalSamples: number
    timeRange: { start: Date; end: Date } | null
  } {
    return {
      isMonitoring: this.isMonitoring,
      totalSamples: this.metrics.length,
      timeRange:
        this.metrics.length > 0
          ? {
              start: this.metrics[0].timestamp,
              end: this.metrics[this.metrics.length - 1].timestamp,
            }
          : null,
    }
  }
}

async function monitorPerformance() {
  console.log('📊 Starting performance monitoring...\n')

  try {
    // Initialize services
    const imageService = await ImageService.fromEnvironment()
    const cacheService = new ImageCacheService()
    const r2Config = R2ConfigurationModel.fromEnvironment()
    const r2Client = new R2ClientService(r2Config)

    // Create monitor
    const monitor = new PerformanceMonitor(imageService, cacheService, r2Client)

    // Start monitoring
    monitor.startMonitoring(30000) // 30 seconds

    // Set up graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down performance monitor...')
      monitor.stopMonitoring()

      // Show final summary
      const summary = monitor.getPerformanceSummary()
      console.log('\n📊 Final Performance Summary:')
      console.log(`  Total Samples: ${summary.totalSamples}`)
      console.log(
        `  Average R2 Response Time: ${summary.averageR2ResponseTime.toFixed(2)}ms`
      )
      console.log(
        `  Average Cache Hit Rate: ${(summary.averageCacheHitRate * 100).toFixed(1)}%`
      )
      console.log(
        `  Average Error Rate: ${(summary.averageErrorRate * 100).toFixed(1)}%`
      )
      console.log(
        `  Average Response Time: ${summary.averageResponseTime.toFixed(2)}ms`
      )
      console.log(
        `  Peak Memory Usage: ${(summary.peakMemoryUsage / 1024 / 1024).toFixed(2)}MB`
      )
      console.log(
        `  Current Memory Usage: ${(summary.currentMemoryUsage / 1024 / 1024).toFixed(2)}MB`
      )

      // Show trends
      console.log('\n📈 Trends:')
      console.log(`  R2 Response Time: ${summary.trends.r2ResponseTime}`)
      console.log(`  Cache Hit Rate: ${summary.trends.cacheHitRate}`)
      console.log(`  Memory Usage: ${summary.trends.memoryUsage}`)

      // Show alerts
      const alerts = monitor.getAlerts()
      if (alerts.length > 0) {
        console.log('\n⚠️  Performance Alerts:')
        alerts.forEach(alert => console.log(`  - ${alert}`))
      }

      process.exit(0)
    })

    console.log('✅ Performance monitoring started')
    console.log('Press Ctrl+C to stop monitoring and see summary')
  } catch (error) {
    console.error(
      '❌ Failed to start performance monitoring:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    process.exit(1)
  }
}

// Run monitoring
if (require.main === module) {
  monitorPerformance().catch(console.error)
}

export { monitorPerformance, PerformanceMonitor }
