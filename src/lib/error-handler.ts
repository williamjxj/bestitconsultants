/**
 * Centralized error handling and logging system
 * Provides consistent error handling across the application
 */

export interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  timestamp: Date
  userAgent?: string
  url?: string
}

export interface ErrorReport {
  id: string
  message: string
  stack?: string
  context: ErrorContext
  severity: 'low' | 'medium' | 'high' | 'critical'
  resolved: boolean
  createdAt: Date
  resolvedAt?: Date
}

export class ErrorHandler {
  private static instance: ErrorHandler
  private errors: ErrorReport[] = []
  private maxErrors: number = 100

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  /**
   * Handle and log an error
   */
  public handleError(
    error: Error | string,
    context: Partial<ErrorContext> = {},
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): ErrorReport {
    const errorMessage = typeof error === 'string' ? error : error.message
    const stack = typeof error === 'string' ? undefined : error.stack

    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      message: errorMessage,
      stack,
      context: {
        timestamp: new Date(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        ...context
      },
      severity,
      resolved: false,
      createdAt: new Date()
    }

    // Add to errors array
    this.errors.push(errorReport)

    // Maintain max errors limit
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors)
    }

    // Log to console based on severity
    this.logError(errorReport)

    // Send to external service if critical
    if (severity === 'critical') {
      this.sendToExternalService(errorReport)
    }

    return errorReport
  }

  /**
   * Handle API errors
   */
  public handleApiError(
    error: any,
    endpoint: string,
    method: string = 'GET'
  ): ErrorReport {
    return this.handleError(
      error,
      {
        component: 'API',
        action: `${method} ${endpoint}`
      },
      'high'
    )
  }

  /**
   * Handle component errors
   */
  public handleComponentError(
    error: Error,
    componentName: string,
    action?: string
  ): ErrorReport {
    return this.handleError(
      error,
      {
        component: componentName,
        action
      },
      'medium'
    )
  }

  /**
   * Handle service errors
   */
  public handleServiceError(
    error: Error,
    serviceName: string,
    action?: string
  ): ErrorReport {
    return this.handleError(
      error,
      {
        component: serviceName,
        action
      },
      'high'
    )
  }

  /**
   * Handle network errors
   */
  public handleNetworkError(
    error: Error,
    url: string,
    method: string = 'GET'
  ): ErrorReport {
    return this.handleError(
      error,
      {
        component: 'Network',
        action: `${method} ${url}`
      },
      'medium'
    )
  }

  /**
   * Get all errors
   */
  public getErrors(): ErrorReport[] {
    return [...this.errors]
  }

  /**
   * Get errors by severity
   */
  public getErrorsBySeverity(severity: ErrorReport['severity']): ErrorReport[] {
    return this.errors.filter(error => error.severity === severity)
  }

  /**
   * Get unresolved errors
   */
  public getUnresolvedErrors(): ErrorReport[] {
    return this.errors.filter(error => !error.resolved)
  }

  /**
   * Mark error as resolved
   */
  public resolveError(errorId: string): boolean {
    const error = this.errors.find(e => e.id === errorId)
    if (error) {
      error.resolved = true
      error.resolvedAt = new Date()
      return true
    }
    return false
  }

  /**
   * Clear resolved errors
   */
  public clearResolvedErrors(): void {
    this.errors = this.errors.filter(error => !error.resolved)
  }

  /**
   * Get error statistics
   */
  public getErrorStats(): {
    total: number
    resolved: number
    unresolved: number
    bySeverity: Record<string, number>
    recent: number
  } {
    const total = this.errors.length
    const resolved = this.errors.filter(e => e.resolved).length
    const unresolved = total - resolved

    const bySeverity: Record<string, number> = {}
    this.errors.forEach(error => {
      bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1
    })

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const recent = this.errors.filter(e => e.createdAt > oneDayAgo).length

    return {
      total,
      resolved,
      unresolved,
      bySeverity,
      recent
    }
  }

  /**
   * Generate error ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Log error to console
   */
  private logError(error: ErrorReport): void {
    const logMessage = `[${error.severity.toUpperCase()}] ${error.message}`

    switch (error.severity) {
      case 'low':
        console.info(logMessage)
        break
      case 'medium':
        console.warn(logMessage)
        break
      case 'high':
        console.error(logMessage)
        break
      case 'critical':
        console.error(logMessage)
        if (error.stack) {
          console.error('Stack trace:', error.stack)
        }
        break
    }
  }

  /**
   * Send critical errors to external service
   */
  private sendToExternalService(error: ErrorReport): void {
    // In a real application, this would send to an error tracking service
    // like Sentry, LogRocket, or Bugsnag
    console.error('Critical error - would send to external service:', error)
  }

  /**
   * Test error handling
   */
  public test(): boolean {
    try {
      console.log('Testing error handling...')

      // Test different error types
      this.handleError('Test error', { component: 'Test' }, 'low')
      this.handleError(new Error('Test exception'), { component: 'Test' }, 'medium')
      this.handleApiError(new Error('API test error'), '/test', 'POST')
      this.handleComponentError(new Error('Component test error'), 'TestComponent')
      this.handleServiceError(new Error('Service test error'), 'TestService')
      this.handleNetworkError(new Error('Network test error'), 'https://test.com')

      const stats = this.getErrorStats()
      console.log('Error handling test completed:', stats)

      return true
    } catch (error) {
      console.error('Error handling test failed:', error)
      return false
    }
  }

  /**
   * Cleanup old errors
   */
  public cleanup(daysToKeep: number = 7): void {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)
    this.errors = this.errors.filter(error => error.createdAt > cutoffDate)
    console.log(`Cleaned up errors older than ${daysToKeep} days`)
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance()
