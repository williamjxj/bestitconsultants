/**
 * Application initializer
 * Orchestrates the initialization of all systems and services
 */

import { integrationManager } from './integration-manager'
import { performanceMonitor } from './performance-monitor'
import { cacheManager } from './cache-manager'
import { lazyLoader } from './lazy-loader'
import { contentScheduler } from './content-scheduler'
import { errorHandler } from './error-handler'
import { logger } from './logger'

export interface AppStatus {
  initialized: boolean
  services: {
    integration: boolean
    performance: boolean
    cache: boolean
    lazyLoading: boolean
    scheduler: boolean
    errorHandling: boolean
    logging: boolean
  }
  health: 'healthy' | 'degraded' | 'unhealthy'
  uptime: number
  lastCheck: Date
}

export class AppInitializer {
  private static instance: AppInitializer
  private isInitialized: boolean = false
  private startTime: Date = new Date()
  private status: AppStatus

  private constructor() {
    this.status = {
      initialized: false,
      services: {
        integration: false,
        performance: false,
        cache: false,
        lazyLoading: false,
        scheduler: false,
        errorHandling: false,
        logging: false
      },
      health: 'unhealthy',
      uptime: 0,
      lastCheck: new Date()
    }
  }

  public static getInstance(): AppInitializer {
    if (!AppInitializer.instance) {
      AppInitializer.instance = new AppInitializer()
    }
    return AppInitializer.instance
  }

  /**
   * Initialize the entire application
   */
  public async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      console.log('Application already initialized')
      return true
    }

    console.log('🚀 Initializing BestIT Consultants application...')

    try {
      // Initialize core systems
      await this.initializeCoreSystems()

      // Initialize services
      await this.initializeServices()

      // Initialize monitoring
      await this.initializeMonitoring()

      // Initialize optimization systems
      await this.initializeOptimization()

      // Final health check
      await this.performHealthCheck()

      this.isInitialized = true
      this.status.initialized = true
      this.status.health = 'healthy'

      console.log('✅ Application initialization completed successfully!')
      return true
    } catch (error) {
      console.error('❌ Application initialization failed:', error)
      this.status.health = 'unhealthy'
      return false
    }
  }

  /**
   * Initialize core systems
   */
  private async initializeCoreSystems(): Promise<void> {
    console.log('🔧 Initializing core systems...')

    // Initialize error handling first
    errorHandler.handleError('Application starting', { component: 'AppInitializer' }, 'info')
    this.status.services.errorHandling = true

    // Initialize logging
    logger.configure({
      level: 'info',
      maxEntries: 1000,
      enableConsole: true,
      enableStorage: true,
      enableRemote: false
    })
    this.status.services.logging = true

    logger.info('Core systems initialized', { component: 'AppInitializer' })
  }

  /**
   * Initialize services
   */
  private async initializeServices(): Promise<void> {
    console.log('🔌 Initializing services...')

    // Initialize integration manager
    const integrationSuccess = await integrationManager.initialize()
    this.status.services.integration = integrationSuccess

    if (!integrationSuccess) {
      throw new Error('Integration manager initialization failed')
    }

    logger.info('Services initialized', { component: 'AppInitializer' })
  }

  /**
   * Initialize monitoring systems
   */
  private async initializeMonitoring(): Promise<void> {
    console.log('📊 Initializing monitoring systems...')

    // Initialize performance monitoring
    performanceMonitor.initialize()
    const performanceTest = performanceMonitor.test()
    this.status.services.performance = performanceTest

    // Initialize content scheduler
    const schedulerTest = await contentScheduler.testScheduler()
    this.status.services.scheduler = schedulerTest

    if (schedulerTest) {
      contentScheduler.start()
    }

    logger.info('Monitoring systems initialized', { component: 'AppInitializer' })
  }

  /**
   * Initialize optimization systems
   */
  private async initializeOptimization(): Promise<void> {
    console.log('⚡ Initializing optimization systems...')

    // Initialize cache manager
    cacheManager.setConfig({
      ttl: 5 * 60 * 1000, // 5 minutes
      maxSize: 100,
      strategy: 'memory'
    })
    this.status.services.cache = true

    // Initialize lazy loader
    lazyLoader.initialize()
    const lazyTest = lazyLoader.test()
    this.status.services.lazyLoading = lazyTest

    logger.info('Optimization systems initialized', { component: 'AppInitializer' })
  }

  /**
   * Perform health check
   */
  private async performHealthCheck(): Promise<void> {
    console.log('🏥 Performing health check...')

    try {
      // Test all systems
      const integrationTest = await integrationManager.testIntegrations()
      const performanceTest = performanceMonitor.test()
      const cacheTest = cacheManager.get('test') === null // Test cache functionality
      const lazyTest = lazyLoader.test()
      const errorTest = errorHandler.test()
      const loggerTest = logger.test()

      const allTests = [
        integrationTest,
        performanceTest,
        cacheTest,
        lazyTest,
        errorTest,
        loggerTest
      ]

      const successCount = allTests.filter(Boolean).length
      const totalTests = allTests.length

      if (successCount === totalTests) {
        this.status.health = 'healthy'
        logger.info('Health check passed', {
          component: 'AppInitializer',
          testsPassed: successCount,
          totalTests
        })
      } else if (successCount >= totalTests * 0.8) {
        this.status.health = 'degraded'
        logger.warn('Health check passed with warnings', {
          component: 'AppInitializer',
          testsPassed: successCount,
          totalTests
        })
      } else {
        this.status.health = 'unhealthy'
        logger.error('Health check failed', {
          component: 'AppInitializer',
          testsPassed: successCount,
          totalTests
        })
      }
    } catch (error) {
      this.status.health = 'unhealthy'
      logger.error('Health check failed with error', {
        component: 'AppInitializer',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  /**
   * Get application status
   */
  public getStatus(): AppStatus {
    this.status.uptime = Date.now() - this.startTime.getTime()
    this.status.lastCheck = new Date()
    return { ...this.status }
  }

  /**
   * Get detailed system information
   */
  public async getSystemInfo(): Promise<{
    status: AppStatus
    integration: any
    performance: any
    cache: any
    errors: any
    logs: any
  }> {
    const status = this.getStatus()
    const integration = integrationManager.getStats()
    const performance = performanceMonitor.generateReport()
    const cache = cacheManager.getStats()
    const errors = errorHandler.getErrorStats()
    const logs = logger.getLogStats()

    return {
      status,
      integration,
      performance,
      cache,
      errors,
      logs
    }
  }

  /**
   * Restart application
   */
  public async restart(): Promise<boolean> {
    console.log('🔄 Restarting application...')

    try {
      // Cleanup existing systems
      await this.cleanup()

      // Reinitialize
      const success = await this.initialize()

      if (success) {
        logger.info('Application restarted successfully', { component: 'AppInitializer' })
      } else {
        logger.error('Application restart failed', { component: 'AppInitializer' })
      }

      return success
    } catch (error) {
      logger.error('Application restart failed with error', {
        component: 'AppInitializer',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      return false
    }
  }

  /**
   * Cleanup application
   */
  public async cleanup(): Promise<void> {
    console.log('🧹 Cleaning up application...')

    try {
      // Cleanup integration manager
      integrationManager.cleanup()

      // Cleanup performance monitoring
      performanceMonitor.cleanup()

      // Cleanup lazy loader
      lazyLoader.cleanup()

      // Clear cache
      cacheManager.clear()

      // Stop scheduler
      contentScheduler.stop()

      // Clear logs
      logger.clearLogs()

      this.isInitialized = false
      this.status.initialized = false
      this.status.health = 'unhealthy'

      logger.info('Application cleanup completed', { component: 'AppInitializer' })
    } catch (error) {
      logger.error('Application cleanup failed', {
        component: 'AppInitializer',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  /**
   * Test application functionality
   */
  public async test(): Promise<boolean> {
    console.log('🧪 Testing application functionality...')

    try {
      const systemInfo = await this.getSystemInfo()

      // Check if all systems are healthy
      const allHealthy = Object.values(systemInfo.status.services).every(Boolean)

      if (allHealthy) {
        logger.info('Application test passed', { component: 'AppInitializer' })
        return true
      } else {
        logger.warn('Application test passed with warnings', {
          component: 'AppInitializer',
          systemInfo
        })
        return true
      }
    } catch (error) {
      logger.error('Application test failed', {
        component: 'AppInitializer',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      return false
    }
  }
}

// Export singleton instance
export const appInitializer = AppInitializer.getInstance()

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
  appInitializer.initialize().then(success => {
    if (success) {
      console.log('🎉 BestIT Consultants application ready!')
    } else {
      console.error('💥 Application initialization failed')
    }
  })
}
