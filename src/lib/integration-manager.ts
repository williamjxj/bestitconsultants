/**
 * Integration manager for connecting all services and components
 * Handles service orchestration, real-time updates, and system integration
 */

// Supabase removed - using static data
import { webScrapingService } from '@/services/web-scraping'
import { testimonialsService } from '@/services/testimonials'
import { navigationService } from '@/services/navigation'
import { contentScheduler } from './content-scheduler'
import { performanceMonitor } from './performance-monitor'
import { cacheManager } from './cache-manager'
import { lazyLoader } from './lazy-loader'

export interface IntegrationStatus {
  webScraping: boolean
  testimonials: boolean
  navigation: boolean
  scheduler: boolean
  performance: boolean
  cache: boolean
  lazyLoading: boolean
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  services: IntegrationStatus
  performance: {
    score: number
    recommendations: string[]
  }
  lastCheck: Date
}

export class IntegrationManager {
  private static instance: IntegrationManager
  private status: IntegrationStatus
  private isInitialized: boolean = false

  private constructor() {
    this.status = {
      webScraping: false,
      testimonials: false,
      navigation: false,
      scheduler: false,
      performance: false,
      cache: false,
      lazyLoading: false,
    }
  }

  public static getInstance(): IntegrationManager {
    if (!IntegrationManager.instance) {
      IntegrationManager.instance = new IntegrationManager()
    }
    return IntegrationManager.instance
  }

  /**
   * Initialize all integrations
   */
  public async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      console.log('Integration manager already initialized')
      return true
    }

    console.log('Initializing integration manager...')

    try {
      // Initialize core services
      await this.initializeSupabase()
      await this.initializeServices()
      await this.initializePerformance()
      await this.initializeCache()
      await this.initializeLazyLoading()
      await this.initializeScheduler()

      this.isInitialized = true
      console.log('Integration manager initialized successfully')
      return true
    } catch (error) {
      console.error('Integration initialization failed:', error)
      return false
    }
  }

  /**
   * Initialize static data (Supabase removed)
   */
  private async initializeSupabase(): Promise<void> {
    try {
      // Supabase removed - using static data
      console.log('Using static data - no database connection needed')
    } catch (error) {
      console.error('Static data initialization failed:', error)
    }
  }

  /**
   * Initialize all services
   */
  private async initializeServices(): Promise<void> {
    try {
      // Test web scraping service (now database service)
      const databaseTest = await webScrapingService.testDatabase()
      this.status.webScraping = databaseTest

      // AI News service removed

      // Test testimonials service
      const testimonials = await testimonialsService.getTestimonials()
      this.status.testimonials = true

      // Test navigation service
      const navItems = navigationService.getNavigationItems()
      this.status.navigation = navItems.length > 0

      console.log('Services initialized')
    } catch (error) {
      console.error('Service initialization failed:', error)
    }
  }

  /**
   * Initialize performance monitoring
   */
  private async initializePerformance(): Promise<void> {
    try {
      performanceMonitor.initialize()
      const testResult = performanceMonitor.test()
      this.status.performance = testResult
      console.log('Performance monitoring initialized')
    } catch (error) {
      console.error('Performance monitoring initialization failed:', error)
    }
  }

  /**
   * Initialize cache system
   */
  private async initializeCache(): Promise<void> {
    try {
      cacheManager.setConfig({
        ttl: 5 * 60 * 1000, // 5 minutes
        maxSize: 100,
        strategy: 'memory',
      })
      this.status.cache = true
      console.log('Cache system initialized')
    } catch (error) {
      console.error('Cache initialization failed:', error)
    }
  }

  /**
   * Initialize lazy loading
   */
  private async initializeLazyLoading(): Promise<void> {
    try {
      lazyLoader.initialize()
      const testResult = lazyLoader.test()
      this.status.lazyLoading = testResult
      console.log('Lazy loading initialized')
    } catch (error) {
      console.error('Lazy loading initialization failed:', error)
    }
  }

  /**
   * Initialize content scheduler
   */
  private async initializeScheduler(): Promise<void> {
    try {
      const testResult = await contentScheduler.testScheduler()
      this.status.scheduler = testResult

      if (testResult) {
        contentScheduler.start()
        console.log('Content scheduler started')
      }
    } catch (error) {
      console.error('Scheduler initialization failed:', error)
    }
  }

  /**
   * Get integration status
   */
  public getStatus(): IntegrationStatus {
    return { ...this.status }
  }

  /**
   * Get system health
   */
  public async getSystemHealth(): Promise<SystemHealth> {
    const services = this.getStatus()
    const performanceReport = performanceMonitor.generateReport()

    // Calculate overall health
    const healthyServices = Object.values(services).filter(Boolean).length
    const totalServices = Object.keys(services).length
    const healthPercentage = (healthyServices / totalServices) * 100

    let status: 'healthy' | 'degraded' | 'unhealthy'
    if (healthPercentage >= 90) {
      status = 'healthy'
    } else if (healthPercentage >= 70) {
      status = 'degraded'
    } else {
      status = 'unhealthy'
    }

    return {
      status,
      services,
      performance: {
        score: performanceReport.score,
        recommendations: performanceReport.recommendations,
      },
      lastCheck: new Date(),
    }
  }

  /**
   * Test all integrations
   */
  public async testIntegrations(): Promise<boolean> {
    console.log('Testing all integrations...')

    try {
      // Test Supabase
      const supabaseTest = this.status.supabase
      console.log('Supabase:', supabaseTest ? '✓' : '✗')

      // Test database connectivity
      const databaseTest = await webScrapingService.testDatabase()
      console.log('Database:', databaseTest ? '✓' : '✗')

      // Test AI news
      console.log('AI News: Removed')

      // Test testimonials
      const testimonialsTest = await testimonialsService.getTestimonials()
      console.log('Testimonials:', testimonialsTest.length >= 0 ? '✓' : '✗')

      // Test navigation
      const navTest = navigationService.getNavigationItems()
      console.log('Navigation:', navTest.length > 0 ? '✓' : '✗')

      // Test performance
      const performanceTest = performanceMonitor.test()
      console.log('Performance:', performanceTest ? '✓' : '✗')

      // Test cache
      cacheManager.set('test', 'value')
      const cacheTest = cacheManager.get('test') === 'value'
      console.log('Cache:', cacheTest ? '✓' : '✗')

      // Test lazy loading
      const lazyTest = lazyLoader.test()
      console.log('Lazy Loading:', lazyTest ? '✓' : '✗')

      // Test scheduler
      const schedulerTest = await contentScheduler.testScheduler()
      console.log('Scheduler:', schedulerTest ? '✓' : '✗')

      const allTests = [
        supabaseTest,
        databaseTest,
        articlesTest.articles.length >= 0,
        testimonialsTest.length >= 0,
        navTest.length > 0,
        performanceTest,
        cacheTest,
        lazyTest,
        schedulerTest,
      ]

      const successCount = allTests.filter(Boolean).length
      const totalTests = allTests.length

      console.log(
        `Integration tests completed: ${successCount}/${totalTests} passed`
      )
      return successCount === totalTests
    } catch (error) {
      console.error('Integration tests failed:', error)
      return false
    }
  }

  /**
   * Restart failed services
   */
  public async restartFailedServices(): Promise<void> {
    console.log('Restarting failed services...')

    if (!this.status.supabase) {
      await this.initializeSupabase()
    }

    if (!this.status.webScraping) {
      await this.initializeServices()
    }

    if (!this.status.performance) {
      await this.initializePerformance()
    }

    if (!this.status.cache) {
      await this.initializeCache()
    }

    if (!this.status.lazyLoading) {
      await this.initializeLazyLoading()
    }

    if (!this.status.scheduler) {
      await this.initializeScheduler()
    }

    console.log('Service restart completed')
  }

  /**
   * Cleanup all integrations
   */
  public cleanup(): void {
    console.log('Cleaning up integrations...')

    // Stop scheduler
    contentScheduler.stop()

    // Cleanup performance monitoring
    performanceMonitor.cleanup()

    // Cleanup lazy loading
    lazyLoader.cleanup()

    // Clear cache
    cacheManager.clear()

    this.isInitialized = false
    console.log('Integration cleanup completed')
  }

  /**
   * Get integration statistics
   */
  public getStats(): {
    initialized: boolean
    healthyServices: number
    totalServices: number
    uptime: number
    lastCheck: Date
  } {
    const services = this.getStatus()
    const healthyServices = Object.values(services).filter(Boolean).length
    const totalServices = Object.keys(services).length

    return {
      initialized: this.isInitialized,
      healthyServices,
      totalServices,
      uptime: Date.now() - (this.isInitialized ? Date.now() : 0),
      lastCheck: new Date(),
    }
  }
}

// Export singleton instance
export const integrationManager = IntegrationManager.getInstance()
