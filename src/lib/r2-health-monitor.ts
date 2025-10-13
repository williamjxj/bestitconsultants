// src/lib/r2-health-monitor.ts
import { R2ClientService } from '../services/r2-client'
import { r2Config } from '../config/r2-config'

interface HealthCheckResult {
  timestamp: Date
  isHealthy: boolean
  responseTime?: number
  error?: string
}

interface AlertConfig {
  emailEnabled: boolean
  webhookUrl?: string
  slackWebhookUrl?: string
  errorThreshold: number // Number of consecutive failures before alerting
  responseTimeThreshold: number // Milliseconds
}

export class R2HealthMonitor {
  private r2Client: R2ClientService
  private healthHistory: HealthCheckResult[] = []
  private consecutiveFailures = 0
  private alertConfig: AlertConfig
  private monitoringInterval?: NodeJS.Timeout

  constructor(alertConfig?: Partial<AlertConfig>) {
    this.r2Client = new R2ClientService()
    this.alertConfig = {
      emailEnabled: false,
      errorThreshold: 3,
      responseTimeThreshold: 5000,
      ...alertConfig,
    }
  }

  /**
   * Start continuous health monitoring
   */
  startMonitoring(intervalMs: number = 60000): void {
    if (this.monitoringInterval) {
      console.warn('Health monitoring already started')
      return
    }

    console.log(`Starting R2 health monitoring (interval: ${intervalMs}ms)`)
    this.monitoringInterval = setInterval(() => {
      this.performHealthCheck()
    }, intervalMs)

    // Perform initial check
    this.performHealthCheck()
  }

  /**
   * Stop continuous health monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = undefined
      console.log('R2 health monitoring stopped')
    }
  }

  /**
   * Perform a single health check
   */
  async performHealthCheck(): Promise<HealthCheckResult> {
    const startTime = Date.now()
    const result: HealthCheckResult = {
      timestamp: new Date(),
      isHealthy: false,
    }

    try {
      // Test R2 connection with a simple HEAD request
      const testKey = '_health_check.txt'
      await this.r2Client.getObject(testKey)

      result.responseTime = Date.now() - startTime
      result.isHealthy = true
      this.consecutiveFailures = 0

      // Check if response time exceeds threshold
      if (result.responseTime > this.alertConfig.responseTimeThreshold) {
        await this.sendAlert(
          'warning',
          `R2 response time high: ${result.responseTime}ms`,
          result
        )
      }
    } catch (error) {
      result.isHealthy = false
      result.error = error instanceof Error ? error.message : String(error)
      this.consecutiveFailures++

      // Send alert if consecutive failures exceed threshold
      if (this.consecutiveFailures >= this.alertConfig.errorThreshold) {
        await this.sendAlert(
          'error',
          `R2 service unhealthy: ${this.consecutiveFailures} consecutive failures`,
          result
        )
      }
    }

    // Store in history (keep last 100 results)
    this.healthHistory.push(result)
    if (this.healthHistory.length > 100) {
      this.healthHistory.shift()
    }

    return result
  }

  /**
   * Get health status summary
   */
  getHealthStatus(): {
    overall: 'healthy' | 'degraded' | 'unhealthy'
    consecutiveFailures: number
    uptime: number
    avgResponseTime: number
    recentChecks: HealthCheckResult[]
  } {
    const recentChecks = this.healthHistory.slice(-10)
    const healthyChecks = recentChecks.filter(c => c.isHealthy).length
    const uptime =
      recentChecks.length > 0 ? healthyChecks / recentChecks.length : 0

    const responseTimes = recentChecks
      .filter(c => c.responseTime !== undefined)
      .map(c => c.responseTime!)
    const avgResponseTime =
      responseTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0

    let overall: 'healthy' | 'degraded' | 'unhealthy'
    if (this.consecutiveFailures >= this.alertConfig.errorThreshold) {
      overall = 'unhealthy'
    } else if (this.consecutiveFailures > 0 || uptime < 0.9) {
      overall = 'degraded'
    } else {
      overall = 'healthy'
    }

    return {
      overall,
      consecutiveFailures: this.consecutiveFailures,
      uptime,
      avgResponseTime,
      recentChecks,
    }
  }

  /**
   * Send alert notifications
   */
  private async sendAlert(
    severity: 'warning' | 'error',
    message: string,
    healthCheck: HealthCheckResult
  ): Promise<void> {
    const alert = {
      severity,
      message,
      timestamp: healthCheck.timestamp,
      responseTime: healthCheck.responseTime,
      error: healthCheck.error,
      consecutiveFailures: this.consecutiveFailures,
    }

    console.error(`[R2 ALERT - ${severity.toUpperCase()}] ${message}`, alert)

    // Send to webhook if configured
    if (this.alertConfig.webhookUrl) {
      try {
        await fetch(this.alertConfig.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alert),
        })
      } catch (error) {
        console.error('Failed to send webhook alert:', error)
      }
    }

    // Send to Slack if configured
    if (this.alertConfig.slackWebhookUrl) {
      try {
        await fetch(this.alertConfig.slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚨 R2 ${severity.toUpperCase()} Alert`,
            attachments: [
              {
                color: severity === 'error' ? 'danger' : 'warning',
                fields: [
                  { title: 'Message', value: message, short: false },
                  {
                    title: 'Response Time',
                    value: healthCheck.responseTime
                      ? `${healthCheck.responseTime}ms`
                      : 'N/A',
                    short: true,
                  },
                  {
                    title: 'Consecutive Failures',
                    value: String(this.consecutiveFailures),
                    short: true,
                  },
                  {
                    title: 'Error',
                    value: healthCheck.error || 'N/A',
                    short: false,
                  },
                ],
                footer: 'BestIT R2 Monitor',
                ts: Math.floor(healthCheck.timestamp.getTime() / 1000),
              },
            ],
          }),
        })
      } catch (error) {
        console.error('Failed to send Slack alert:', error)
      }
    }
  }

  /**
   * Get full health history
   */
  getHealthHistory(): HealthCheckResult[] {
    return [...this.healthHistory]
  }

  /**
   * Clear health history
   */
  clearHistory(): void {
    this.healthHistory = []
    this.consecutiveFailures = 0
  }
}

// Singleton instance for global monitoring
let monitorInstance: R2HealthMonitor | null = null

export function getR2HealthMonitor(
  config?: Partial<AlertConfig>
): R2HealthMonitor {
  if (!monitorInstance) {
    monitorInstance = new R2HealthMonitor(config)
  }
  return monitorInstance
}

export function startGlobalR2Monitoring(intervalMs?: number): void {
  const monitor = getR2HealthMonitor({
    webhookUrl: process.env.R2_ALERT_WEBHOOK_URL,
    slackWebhookUrl: process.env.R2_SLACK_WEBHOOK_URL,
    errorThreshold: Number(process.env.R2_ERROR_THRESHOLD) || 3,
    responseTimeThreshold: Number(process.env.R2_RESPONSE_THRESHOLD) || 5000,
  })
  monitor.startMonitoring(intervalMs)
}
