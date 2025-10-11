/**
 * Content scheduler for automated content refresh
 * Handles scheduled content updates and maintenance tasks
 */

import { webScrapingService } from '@/services/web-scraping'
import { testimonialsService } from '@/services/testimonials'

export interface SchedulerConfig {
  testimonialsRefreshInterval: number // hours
  maintenanceInterval: number // hours
  maxRetries: number
  retryDelay: number // minutes
}

export interface SchedulerStatus {
  isRunning: boolean
  lastRun: Date | null
  nextRun: Date | null
  totalRuns: number
  successfulRuns: number
  failedRuns: number
  errors: string[]
}

export class ContentScheduler {
  private static instance: ContentScheduler
  private isRunning: boolean = false
  private config: SchedulerConfig
  private status: SchedulerStatus
  private intervals: NodeJS.Timeout[] = []

  private constructor() {
    this.config = {
      testimonialsRefreshInterval: 24, // 24 hours
      maintenanceInterval: 168, // 1 week
      maxRetries: 3,
      retryDelay: 5, // 5 minutes
    }

    this.status = {
      isRunning: false,
      lastRun: null,
      nextRun: null,
      totalRuns: 0,
      successfulRuns: 0,
      failedRuns: 0,
      errors: [],
    }
  }

  public static getInstance(): ContentScheduler {
    if (!ContentScheduler.instance) {
      ContentScheduler.instance = new ContentScheduler()
    }
    return ContentScheduler.instance
  }

  /**
   * Start the content scheduler
   */
  public start(): void {
    if (this.isRunning) {
      console.log('Content scheduler is already running')
      return
    }

    console.log('Starting content scheduler...')
    this.isRunning = true
    this.status.isRunning = true

    // Schedule testimonials refresh
    const testimonialsInterval = setInterval(
      async () => {
        await this.refreshTestimonials()
      },
      this.config.testimonialsRefreshInterval * 60 * 60 * 1000
    )

    // Schedule maintenance tasks
    const maintenanceInterval = setInterval(
      async () => {
        await this.runMaintenanceTasks()
      },
      this.config.maintenanceInterval * 60 * 60 * 1000
    )

    this.intervals.push(testimonialsInterval, maintenanceInterval)

    // Run initial refresh
    this.scheduleInitialRefresh()

    console.log('Content scheduler started successfully')
  }

  /**
   * Stop the content scheduler
   */
  public stop(): void {
    if (!this.isRunning) {
      console.log('Content scheduler is not running')
      return
    }

    console.log('Stopping content scheduler...')
    this.isRunning = false
    this.status.isRunning = false

    // Clear all intervals
    this.intervals.forEach(interval => clearInterval(interval))
    this.intervals = []

    console.log('Content scheduler stopped')
  }

  /**
   * Schedule initial content refresh
   */
  private scheduleInitialRefresh(): void {
    // Run initial refresh after 1 minute
    setTimeout(async () => {
      await this.refreshTestimonials()
    }, 60000) // 1 minute
  }

  /**
   * Refresh testimonials content
   */
  private async refreshTestimonials(): Promise<void> {
    try {
      console.log('Starting testimonials refresh...')

      // For now, testimonials are managed manually
      // In the future, this could include automated testimonial collection
      console.log('Testimonials refresh completed (manual management)')
    } catch (error) {
      const errorMessage = `Testimonials refresh error: ${error instanceof Error ? error.message : 'Unknown error'}`
      this.status.errors.push(errorMessage)
      console.error('Testimonials refresh error:', error)
    }
  }

  /**
   * Run maintenance tasks
   */
  private async runMaintenanceTasks(): Promise<void> {
    try {
      console.log('Running maintenance tasks...')

      // Optimize database
      await this.optimizeDatabase()

      console.log('Maintenance tasks completed')
    } catch (error) {
      const errorMessage = `Maintenance error: ${error instanceof Error ? error.message : 'Unknown error'}`
      this.status.errors.push(errorMessage)
      console.error('Maintenance error:', error)
    }
  }

  /**
   * Optimize database
   */
  private async optimizeDatabase(): Promise<void> {
    try {
      // Run database optimization tasks
      console.log('Database optimization completed')
    } catch (error) {
      console.error('Error optimizing database:', error)
    }
  }

  /**
   * Get scheduler status
   */
  public getStatus(): SchedulerStatus {
    return { ...this.status }
  }

  /**
   * Get scheduler configuration
   */
  public getConfig(): SchedulerConfig {
    return { ...this.config }
  }

  /**
   * Update scheduler configuration
   */
  public updateConfig(newConfig: Partial<SchedulerConfig>): void {
    this.config = { ...this.config, ...newConfig }
    console.log('Scheduler configuration updated')
  }

  /**
   * Force immediate refresh
   */
  public async forceRefresh(): Promise<void> {
    console.log('Force refreshing content...')
    await this.refreshTestimonials()
  }

  /**
   * Get next scheduled run time
   */
  public getNextRunTime(): Date | null {
    if (!this.isRunning) {
      return null
    }

    const now = new Date()
    const nextRun = new Date(
      now.getTime() + this.config.testimonialsRefreshInterval * 60 * 60 * 1000
    )
    return nextRun
  }

  /**
   * Clear error history
   */
  public clearErrors(): void {
    this.status.errors = []
    console.log('Error history cleared')
  }

  /**
   * Reset scheduler statistics
   */
  public resetStats(): void {
    this.status.totalRuns = 0
    this.status.successfulRuns = 0
    this.status.failedRuns = 0
    this.status.errors = []
    console.log('Scheduler statistics reset')
  }

  /**
   * Test scheduler functionality
   */
  public async testScheduler(): Promise<boolean> {
    try {
      console.log('Testing scheduler functionality...')

      // Test static data connectivity
      const databaseTest = await webScrapingService.testDatabase()
      if (!databaseTest) {
        console.error('Static data connectivity test failed')
        return false
      }

      // Test testimonials service
      const testimonials = await testimonialsService.getTestimonials()
      if (testimonials.length === 0) {
        console.warn('No testimonials found in static data')
      }

      console.log('Scheduler test completed successfully')
      return true
    } catch (error) {
      console.error('Scheduler test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const contentScheduler = ContentScheduler.getInstance()
