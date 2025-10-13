/**
 * Error monitoring for R2 service outages
 * Monitors and alerts on R2 service health issues
 */

import { ImageService } from '../services/image-service'
import { R2ClientService } from '../services/r2-client'

export interface ServiceHealth {
  r2: 'healthy' | 'degraded' | 'unhealthy'
  cache: 'healthy' | 'degraded' | 'unhealthy'
  local: 'healthy' | 'degraded' | 'unhealthy'
  overall: 'healthy' | 'degraded' | 'unhealthy'
}

export interface AlertConfig {
  enabled: boolean
  r2Threshold: number // Response time threshold in ms
  errorRateThreshold: number // Error rate threshold (0-1)
  checkInterval: number // Check interval in ms
  alertChannels: string[] // console, webhook, email
  webhookUrl?: string
  emailRecipients?: string[]
}

export class ErrorMonitor {
  private imageService: ImageService
  private r2Client: R2ClientService
  private config: AlertConfig
  private healthHistory: Array<{
    timestamp: Date
    health: ServiceHealth
    metrics: any
  }> = []
  private isMonitoring: boolean = false
  private monitoringInterval?: NodeJS.Timeout

  constructor(
    imageService: ImageService,
    r2Client: R2ClientService,
    config: AlertConfig
  ) {
    this.imageService = imageService
    this.r2Client = r2Client
    this.config = config
  }

  /**
   * Start monitoring service health
   */
  startMonitoring(): void {
    if (this.isMonitoring) {
      console.warn('Monitoring already started')
      return
    }

    this.isMonitoring = true
    console.log('🔍 Starting R2 service monitoring...')

    this.monitoringInterval = setInterval(async () => {
      try {
        await this.checkServiceHealth()
      } catch (error) {
        console.error('Health check failed:', error)
      }
    }, this.config.checkInterval)
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
    console.log('🛑 Stopped R2 service monitoring')
  }

  /**
   * Check service health
   */
  async checkServiceHealth(): Promise<ServiceHealth> {
    const startTime = Date.now()

    try {
      // Check R2 health
      const r2Health = await this.r2Client.getHealthStatus()
      const r2Status = r2Health.status

      // Check image service health
      const imageHealth = await this.imageService.getHealthStatus()

      const health: ServiceHealth = {
        r2: r2Status,
        cache: imageHealth.cache,
        local: imageHealth.local,
        overall: imageHealth.overall,
      }

      // Store health history
      this.healthHistory.push({
        timestamp: new Date(),
        health,
        metrics: {
          r2ResponseTime: r2Health.responseTime,
          checkDuration: Date.now() - startTime,
        },
      })

      // Maintain history size
      if (this.healthHistory.length > 100) {
        this.healthHistory = this.healthHistory.slice(-100)
      }

      // Check for alerts
      await this.checkAlerts(health)

      return health
    } catch (error) {
      console.error('Health check failed:', error)

      const errorHealth: ServiceHealth = {
        r2: 'unhealthy',
        cache: 'unhealthy',
        local: 'unhealthy',
        overall: 'unhealthy',
      }

      await this.checkAlerts(errorHealth)
      return errorHealth
    }
  }

  /**
   * Check for alert conditions
   */
  private async checkAlerts(health: ServiceHealth): Promise<void> {
    if (!this.config.enabled) return

    const alerts: string[] = []

    // Check R2 health
    if (health.r2 === 'unhealthy') {
      alerts.push('R2 service is unhealthy')
    } else if (health.r2 === 'degraded') {
      alerts.push('R2 service is degraded')
    }

    // Check overall health
    if (health.overall === 'unhealthy') {
      alerts.push('Overall service health is unhealthy')
    }

    // Check error rates
    const recentHealth = this.healthHistory.slice(-10)
    const unhealthyCount = recentHealth.filter(
      h => h.health.overall === 'unhealthy'
    ).length
    const errorRate = unhealthyCount / recentHealth.length

    if (errorRate > this.config.errorRateThreshold) {
      alerts.push(`High error rate detected: ${(errorRate * 100).toFixed(1)}%`)
    }

    // Send alerts if any
    if (alerts.length > 0) {
      await this.sendAlerts(alerts, health)
    }
  }

  /**
   * Send alerts through configured channels
   */
  private async sendAlerts(
    alerts: string[],
    health: ServiceHealth
  ): Promise<void> {
    const alertMessage = {
      timestamp: new Date().toISOString(),
      service: 'R2 Image Service',
      alerts,
      health,
      environment: process.env.NODE_ENV || 'development',
    }

    for (const channel of this.config.alertChannels) {
      try {
        switch (channel) {
          case 'console':
            console.error('🚨 R2 Service Alert:', alertMessage)
            break

          case 'webhook':
            if (this.config.webhookUrl) {
              await this.sendWebhookAlert(alertMessage)
            }
            break

          case 'email':
            if (this.config.emailRecipients) {
              await this.sendEmailAlert(alertMessage)
            }
            break
        }
      } catch (error) {
        console.error(`Failed to send alert via ${channel}:`, error)
      }
    }
  }

  /**
   * Send webhook alert
   */
  private async sendWebhookAlert(alertMessage: any): Promise<void> {
    if (!this.config.webhookUrl) return

    try {
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertMessage),
      })

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status}`)
      }
    } catch (error) {
      console.error('Webhook alert failed:', error)
    }
  }

  /**
   * Send email alert
   */
  private async sendEmailAlert(alertMessage: any): Promise<void> {
    // This would integrate with an email service
    console.log('📧 Email alert would be sent:', alertMessage)
  }

  /**
   * Get health history
   */
  getHealthHistory(limit: number = 50): Array<{
    timestamp: Date
    health: ServiceHealth
    metrics: any
  }> {
    return this.healthHistory.slice(-limit)
  }

  /**
   * Get current health status
   */
  async getCurrentHealth(): Promise<ServiceHealth> {
    return await this.checkServiceHealth()
  }

  /**
   * Get health trends
   */
  getHealthTrends(): {
    uptime: number
    averageResponseTime: number
    errorRate: number
    lastIncident?: Date
  } {
    const now = Date.now()
    const oneHourAgo = new Date(now - 60 * 60 * 1000)

    const recentHealth = this.healthHistory.filter(
      h => h.timestamp >= oneHourAgo
    )
    const unhealthyCount = recentHealth.filter(
      h => h.health.overall === 'unhealthy'
    ).length

    const averageResponseTime =
      recentHealth.length > 0
        ? recentHealth.reduce(
            (sum, h) => sum + (h.metrics.r2ResponseTime || 0),
            0
          ) / recentHealth.length
        : 0

    const errorRate =
      recentHealth.length > 0 ? unhealthyCount / recentHealth.length : 0

    const lastIncident = this.healthHistory
      .filter(h => h.health.overall === 'unhealthy')
      .pop()?.timestamp

    return {
      uptime: 1 - errorRate,
      averageResponseTime,
      errorRate,
      lastIncident,
    }
  }

  /**
   * Update monitoring configuration
   */
  updateConfig(newConfig: Partial<AlertConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Get monitoring status
   */
  getStatus(): {
    isMonitoring: boolean
    config: AlertConfig
    healthHistoryCount: number
  } {
    return {
      isMonitoring: this.isMonitoring,
      config: this.config,
      healthHistoryCount: this.healthHistory.length,
    }
  }
}

/**
 * Create error monitor from environment
 */
export async function createErrorMonitor(): Promise<ErrorMonitor> {
  const imageService = await ImageService.fromEnvironment()
  const r2Client = new R2ClientService(
    await import('../types/r2-config').then(m =>
      m.R2ConfigurationModel.fromEnvironment()
    )
  )

  const config: AlertConfig = {
    enabled: process.env.R2_MONITORING_ENABLED === 'true',
    r2Threshold: parseInt(process.env.R2_RESPONSE_THRESHOLD || '1000'),
    errorRateThreshold: parseFloat(process.env.R2_ERROR_THRESHOLD || '0.1'),
    checkInterval: parseInt(process.env.R2_CHECK_INTERVAL || '60000'),
    alertChannels: (process.env.R2_ALERT_CHANNELS || 'console').split(','),
    webhookUrl: process.env.R2_WEBHOOK_URL,
    emailRecipients: process.env.R2_EMAIL_RECIPIENTS?.split(','),
  }

  return new ErrorMonitor(imageService, r2Client, config)
}

/**
 * Start monitoring if enabled
 */
export async function startMonitoringIfEnabled(): Promise<void> {
  try {
    const monitor = await createErrorMonitor()

    if (monitor.getStatus().config.enabled) {
      monitor.startMonitoring()
      console.log('✅ R2 service monitoring started')
    } else {
      console.log('ℹ️  R2 service monitoring disabled')
    }
  } catch (error) {
    console.error('❌ Failed to start R2 service monitoring:', error)
  }
}
