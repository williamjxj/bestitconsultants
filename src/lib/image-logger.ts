/**
 * Image request/response logging
 * Logs image requests for monitoring and debugging
 */

import { NextRequest, NextResponse } from 'next/server'

export interface ImageRequestLog {
  timestamp: Date
  method: string
  path: string
  userAgent: string
  ip: string
  referer?: string
  responseTime: number
  statusCode: number
  contentLength: number
  contentType: string
  cacheStatus: 'hit' | 'miss' | 'bypass'
  tier: 'r2' | 'cache' | 'local' | 'error'
  error?: string
}

export class ImageLogger {
  private logs: ImageRequestLog[] = []
  private maxLogs: number = 1000

  /**
   * Log an image request
   */
  logRequest(
    request: NextRequest,
    response: NextResponse,
    metadata: {
      responseTime: number
      cacheStatus: 'hit' | 'miss' | 'bypass'
      tier: 'r2' | 'cache' | 'local' | 'error'
      error?: string
    }
  ): void {
    const log: ImageRequestLog = {
      timestamp: new Date(),
      method: request.method,
      path: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent') || '',
      ip: this.getClientIP(request),
      referer: request.headers.get('referer') || undefined,
      responseTime: metadata.responseTime,
      statusCode: response.status,
      contentLength: parseInt(response.headers.get('content-length') || '0'),
      contentType: response.headers.get('content-type') || '',
      cacheStatus: metadata.cacheStatus,
      tier: metadata.tier,
      error: metadata.error,
    }

    this.logs.push(log)

    // Maintain log size limit
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🖼️  Image request: ${log.path} (${log.tier}, ${log.responseTime}ms, ${log.statusCode})`
      )
    }
  }

  /**
   * Get client IP address
   */
  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const remoteAddr = request.headers.get('x-remote-addr')

    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }

    return realIP || remoteAddr || 'unknown'
  }

  /**
   * Get recent logs
   */
  getRecentLogs(limit: number = 100): ImageRequestLog[] {
    return this.logs.slice(-limit)
  }

  /**
   * Get logs by time range
   */
  getLogsByTimeRange(start: Date, end: Date): ImageRequestLog[] {
    return this.logs.filter(
      log => log.timestamp >= start && log.timestamp <= end
    )
  }

  /**
   * Get logs by path pattern
   */
  getLogsByPath(pattern: string): ImageRequestLog[] {
    return this.logs.filter(log => log.path.includes(pattern))
  }

  /**
   * Get logs by status code
   */
  getLogsByStatus(statusCode: number): ImageRequestLog[] {
    return this.logs.filter(log => log.statusCode === statusCode)
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): {
    totalRequests: number
    averageResponseTime: number
    successRate: number
    tierDistribution: { [key: string]: number }
    cacheHitRate: number
    errorRate: number
    topPaths: Array<{ path: string; count: number }>
  } {
    const totalRequests = this.logs.length
    if (totalRequests === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        successRate: 0,
        tierDistribution: {},
        cacheHitRate: 0,
        errorRate: 0,
        topPaths: [],
      }
    }

    const successfulRequests = this.logs.filter(log => log.statusCode < 400)
    const averageResponseTime =
      this.logs.reduce((sum, log) => sum + log.responseTime, 0) / totalRequests
    const successRate = successfulRequests.length / totalRequests

    // Tier distribution
    const tierDistribution: { [key: string]: number } = {}
    this.logs.forEach(log => {
      tierDistribution[log.tier] = (tierDistribution[log.tier] || 0) + 1
    })

    // Cache hit rate
    const cacheHits = this.logs.filter(log => log.cacheStatus === 'hit').length
    const cacheHitRate = cacheHits / totalRequests

    // Error rate
    const errors = this.logs.filter(log => log.statusCode >= 400).length
    const errorRate = errors / totalRequests

    // Top paths
    const pathCounts: { [key: string]: number } = {}
    this.logs.forEach(log => {
      pathCounts[log.path] = (pathCounts[log.path] || 0) + 1
    })
    const topPaths = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalRequests,
      averageResponseTime,
      successRate,
      tierDistribution,
      cacheHitRate,
      errorRate,
      topPaths,
    }
  }

  /**
   * Get error analysis
   */
  getErrorAnalysis(): {
    totalErrors: number
    errorTypes: { [key: string]: number }
    errorPaths: Array<{ path: string; count: number }>
    recentErrors: ImageRequestLog[]
  } {
    const errorLogs = this.logs.filter(log => log.statusCode >= 400)
    const totalErrors = errorLogs.length

    // Error types
    const errorTypes: { [key: string]: number } = {}
    errorLogs.forEach(log => {
      const errorType = `${log.statusCode}`
      errorTypes[errorType] = (errorTypes[errorType] || 0) + 1
    })

    // Error paths
    const pathCounts: { [key: string]: number } = {}
    errorLogs.forEach(log => {
      pathCounts[log.path] = (pathCounts[log.path] || 0) + 1
    })
    const errorPaths = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)

    // Recent errors (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recentErrors = errorLogs.filter(log => log.timestamp >= oneDayAgo)

    return {
      totalErrors,
      errorTypes,
      errorPaths,
      recentErrors,
    }
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = []
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  /**
   * Get log summary
   */
  getLogSummary(): {
    totalLogs: number
    timeRange: { start: Date; end: Date }
    performance: any
    errors: any
  } {
    const totalLogs = this.logs.length
    const timeRange =
      totalLogs > 0
        ? {
            start: this.logs[0].timestamp,
            end: this.logs[this.logs.length - 1].timestamp,
          }
        : { start: new Date(), end: new Date() }

    return {
      totalLogs,
      timeRange,
      performance: this.getPerformanceMetrics(),
      errors: this.getErrorAnalysis(),
    }
  }
}

// Global logger instance
export const imageLogger = new ImageLogger()

/**
 * Log image request helper
 */
export function logImageRequest(
  request: NextRequest,
  response: NextResponse,
  metadata: {
    responseTime: number
    cacheStatus: 'hit' | 'miss' | 'bypass'
    tier: 'r2' | 'cache' | 'local' | 'error'
    error?: string
  }
): void {
  imageLogger.logRequest(request, response, metadata)
}
