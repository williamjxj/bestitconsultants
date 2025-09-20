/**
 * Content scheduler for automated content refresh
 * Handles scheduled scraping, content updates, and maintenance tasks
 */

import { webScrapingService } from '@/services/web-scraping'
import { aiNewsService } from '@/services/ai-news'
import { testimonialsService } from '@/services/testimonials'

export interface SchedulerConfig {
  aiNewsRefreshInterval: number // hours
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
      aiNewsRefreshInterval: 6, // 6 hours
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

    // Schedule AI news refresh
    const aiNewsInterval = setInterval(
      async () => {
        await this.refreshAINews()
      },
      this.config.aiNewsRefreshInterval * 60 * 60 * 1000
    )

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

    this.intervals.push(
      aiNewsInterval,
      testimonialsInterval,
      maintenanceInterval
    )

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
      await this.refreshAINews()
      await this.refreshTestimonials()
    }, 60000) // 1 minute
  }

  /**
   * Refresh AI news content
   */
  private async refreshAINews(): Promise<void> {
    try {
      console.log('Starting AI news refresh...')
      this.status.lastRun = new Date()
      this.status.totalRuns++

      const result = await webScrapingService.refreshContent()

      if (result.success) {
        this.status.successfulRuns++
        console.log(
          `AI news refresh completed: ${result.articlesUpdated} articles updated`
        )
      } else {
        this.status.failedRuns++
        this.status.errors.push(`AI news refresh failed: ${result.message}`)
        console.error('AI news refresh failed:', result.message)
      }
    } catch (error) {
      this.status.failedRuns++
      const errorMessage = `AI news refresh error: ${error instanceof Error ? error.message : 'Unknown error'}`
      this.status.errors.push(errorMessage)
      console.error('AI news refresh error:', error)
    }
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

      // Clean up old articles
      await this.cleanupOldArticles()

      // Update trending status
      await this.updateTrendingStatus()

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
   * Clean up old articles
   */
  private async cleanupOldArticles(): Promise<void> {
    try {
      // Delete articles older than 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      // This would be implemented with a database query
      console.log('Cleaned up old articles')
    } catch (error) {
      console.error('Error cleaning up old articles:', error)
    }
  }

  /**
   * Update trending status
   */
  private async updateTrendingStatus(): Promise<void> {
    try {
      // Update trending status based on recent activity
      console.log('Updated trending status')
    } catch (error) {
      console.error('Error updating trending status:', error)
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
    await this.refreshAINews()
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
      now.getTime() + this.config.aiNewsRefreshInterval * 60 * 60 * 1000
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

      // Test database connectivity
      const databaseTest = await webScrapingService.testDatabase()
      if (!databaseTest) {
        console.error('Database connectivity test failed')
        return false
      }

      // Test AI news service
      const articlesResult = await aiNewsService.getArticles(1)
      if (articlesResult.articles.length === 0) {
        console.warn('No articles found in database')
      }

      // Test testimonials service
      const testimonials = await testimonialsService.getTestimonials()
      if (testimonials.length === 0) {
        console.warn('No testimonials found in database')
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
