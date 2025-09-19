/**
 * Centralized logging system
 * Provides structured logging with different levels and contexts
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical'

export interface LogEntry {
  id: string
  level: LogLevel
  message: string
  context?: Record<string, any>
  timestamp: Date
  component?: string
  userId?: string
}

export interface LoggerConfig {
  level: LogLevel
  maxEntries: number
  enableConsole: boolean
  enableStorage: boolean
  enableRemote: boolean
}

export class Logger {
  private static instance: Logger
  private logs: LogEntry[] = []
  private config: LoggerConfig

  private constructor() {
    this.config = {
      level: 'info',
      maxEntries: 1000,
      enableConsole: true,
      enableStorage: true,
      enableRemote: false
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  /**
   * Configure logger
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Log debug message
   */
  public debug(message: string, context?: Record<string, any>, component?: string): void {
    this.log('debug', message, context, component)
  }

  /**
   * Log info message
   */
  public info(message: string, context?: Record<string, any>, component?: string): void {
    this.log('info', message, context, component)
  }

  /**
   * Log warning message
   */
  public warn(message: string, context?: Record<string, any>, component?: string): void {
    this.log('warn', message, context, component)
  }

  /**
   * Log error message
   */
  public error(message: string, context?: Record<string, any>, component?: string): void {
    this.log('error', message, context, component)
  }

  /**
   * Log critical message
   */
  public critical(message: string, context?: Record<string, any>, component?: string): void {
    this.log('critical', message, context, component)
  }

  /**
   * Core logging method
   */
  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, any>,
    component?: string
  ): void {
    // Check if we should log this level
    if (!this.shouldLog(level)) {
      return
    }

    const logEntry: LogEntry = {
      id: this.generateLogId(),
      level,
      message,
      context,
      timestamp: new Date(),
      component
    }

    // Add to logs array
    this.logs.push(logEntry)

    // Maintain max entries limit
    if (this.logs.length > this.config.maxEntries) {
      this.logs = this.logs.slice(-this.config.maxEntries)
    }

    // Console logging
    if (this.config.enableConsole) {
      this.logToConsole(logEntry)
    }

    // Storage logging
    if (this.config.enableStorage) {
      this.logToStorage(logEntry)
    }

    // Remote logging
    if (this.config.enableRemote) {
      this.logToRemote(logEntry)
    }
  }

  /**
   * Check if we should log this level
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'critical']
    const currentLevelIndex = levels.indexOf(this.config.level)
    const messageLevelIndex = levels.indexOf(level)

    return messageLevelIndex >= currentLevelIndex
  }

  /**
   * Log to console
   */
  private logToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString()
    const component = entry.component ? `[${entry.component}]` : ''
    const context = entry.context ? JSON.stringify(entry.context) : ''
    const message = `${timestamp} ${entry.level.toUpperCase()} ${component} ${entry.message} ${context}`

    switch (entry.level) {
      case 'debug':
        console.debug(message)
        break
      case 'info':
        console.info(message)
        break
      case 'warn':
        console.warn(message)
        break
      case 'error':
        console.error(message)
        break
      case 'critical':
        console.error(message)
        break
    }
  }

  /**
   * Log to storage
   */
  private logToStorage(entry: LogEntry): void {
    if (typeof window === 'undefined') return

    try {
      const storageKey = 'app_logs'
      const existingLogs = localStorage.getItem(storageKey)
      const logs = existingLogs ? JSON.parse(existingLogs) : []

      logs.push(entry)

      // Keep only recent logs
      const maxStorageLogs = 100
      if (logs.length > maxStorageLogs) {
        logs.splice(0, logs.length - maxStorageLogs)
      }

      localStorage.setItem(storageKey, JSON.stringify(logs))
    } catch (error) {
      console.error('Failed to log to storage:', error)
    }
  }

  /**
   * Log to remote service
   */
  private logToRemote(entry: LogEntry): void {
    // In a real application, this would send logs to a remote service
    // like LogRocket, Sentry, or a custom logging API
    console.log('Remote logging:', entry)
  }

  /**
   * Get logs
   */
  public getLogs(level?: LogLevel, component?: string): LogEntry[] {
    let filteredLogs = [...this.logs]

    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level)
    }

    if (component) {
      filteredLogs = filteredLogs.filter(log => log.component === component)
    }

    return filteredLogs
  }

  /**
   * Get logs from storage
   */
  public getLogsFromStorage(): LogEntry[] {
    if (typeof window === 'undefined') return []

    try {
      const storageKey = 'app_logs'
      const logs = localStorage.getItem(storageKey)
      return logs ? JSON.parse(logs) : []
    } catch (error) {
      console.error('Failed to get logs from storage:', error)
      return []
    }
  }

  /**
   * Clear logs
   */
  public clearLogs(): void {
    this.logs = []

    if (typeof window !== 'undefined') {
      localStorage.removeItem('app_logs')
    }
  }

  /**
   * Get log statistics
   */
  public getLogStats(): {
    total: number
    byLevel: Record<LogLevel, number>
    byComponent: Record<string, number>
    recent: number
  } {
    const total = this.logs.length
    const byLevel: Record<LogLevel, number> = {
      debug: 0,
      info: 0,
      warn: 0,
      error: 0,
      critical: 0
    }

    const byComponent: Record<string, number> = {}
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    let recent = 0

    this.logs.forEach(log => {
      byLevel[log.level]++

      if (log.component) {
        byComponent[log.component] = (byComponent[log.component] || 0) + 1
      }

      if (log.timestamp > oneHourAgo) {
        recent++
      }
    })

    return {
      total,
      byLevel,
      byComponent,
      recent
    }
  }

  /**
   * Generate log ID
   */
  private generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Test logging functionality
   */
  public test(): boolean {
    try {
      console.log('Testing logger...')

      this.debug('Debug test message', { test: true }, 'TestComponent')
      this.info('Info test message', { test: true }, 'TestComponent')
      this.warn('Warning test message', { test: true }, 'TestComponent')
      this.error('Error test message', { test: true }, 'TestComponent')
      this.critical('Critical test message', { test: true }, 'TestComponent')

      const stats = this.getLogStats()
      console.log('Logger test completed:', stats)

      return true
    } catch (error) {
      console.error('Logger test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const logger = Logger.getInstance()
