/**
 * Error handling utilities for media operations
 * Provides centralized error handling and logging
 */

import { NextResponse } from 'next/server'
import { ApiResponse } from '@/types/media'

export interface MediaError extends Error {
  code: string
  statusCode: number
  details?: any
}

export class MediaError extends Error implements MediaError {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'MediaError'
  }
}

/**
 * Predefined error types
 */
export const MediaErrors = {
  // File errors
  FILE_NOT_FOUND: new MediaError('File not found', 'FILE_NOT_FOUND', 404),
  FILE_TOO_LARGE: new MediaError('File too large', 'FILE_TOO_LARGE', 413),
  INVALID_FILE_TYPE: new MediaError(
    'Invalid file type',
    'INVALID_FILE_TYPE',
    400
  ),
  FILE_UPLOAD_FAILED: new MediaError(
    'File upload failed',
    'FILE_UPLOAD_FAILED',
    500
  ),

  // Validation errors
  MISSING_REQUIRED_FIELD: new MediaError(
    'Missing required field',
    'MISSING_REQUIRED_FIELD',
    400
  ),
  INVALID_FORMAT: new MediaError('Invalid format', 'INVALID_FORMAT', 400),
  INVALID_DIMENSIONS: new MediaError(
    'Invalid dimensions',
    'INVALID_DIMENSIONS',
    400
  ),
  INVALID_PRIORITY: new MediaError('Invalid priority', 'INVALID_PRIORITY', 400),

  // Asset errors
  ASSET_NOT_FOUND: new MediaError('Asset not found', 'ASSET_NOT_FOUND', 404),
  ASSET_ALREADY_EXISTS: new MediaError(
    'Asset already exists',
    'ASSET_ALREADY_EXISTS',
    409
  ),
  ASSET_DELETE_FAILED: new MediaError(
    'Failed to delete asset',
    'ASSET_DELETE_FAILED',
    500
  ),

  // Gallery errors
  GALLERY_NOT_FOUND: new MediaError(
    'Gallery not found',
    'GALLERY_NOT_FOUND',
    404
  ),
  GALLERY_ALREADY_EXISTS: new MediaError(
    'Gallery already exists',
    'GALLERY_ALREADY_EXISTS',
    409
  ),
  INVALID_GALLERY_LAYOUT: new MediaError(
    'Invalid gallery layout',
    'INVALID_GALLERY_LAYOUT',
    400
  ),

  // Optimization errors
  OPTIMIZATION_FAILED: new MediaError(
    'Optimization failed',
    'OPTIMIZATION_FAILED',
    500
  ),
  UNSUPPORTED_FORMAT: new MediaError(
    'Unsupported format',
    'UNSUPPORTED_FORMAT',
    400
  ),

  // Database errors
  DATABASE_CONNECTION_FAILED: new MediaError(
    'Database connection failed',
    'DATABASE_CONNECTION_FAILED',
    500
  ),
  DATABASE_QUERY_FAILED: new MediaError(
    'Database query failed',
    'DATABASE_QUERY_FAILED',
    500
  ),

  // Authentication errors
  UNAUTHORIZED: new MediaError('Unauthorized', 'UNAUTHORIZED', 401),
  FORBIDDEN: new MediaError('Forbidden', 'FORBIDDEN', 403),

  // Rate limiting
  RATE_LIMIT_EXCEEDED: new MediaError(
    'Rate limit exceeded',
    'RATE_LIMIT_EXCEEDED',
    429
  ),

  // Internal errors
  INTERNAL_ERROR: new MediaError(
    'Internal server error',
    'INTERNAL_ERROR',
    500
  ),
  SERVICE_UNAVAILABLE: new MediaError(
    'Service unavailable',
    'SERVICE_UNAVAILABLE',
    503
  ),
} as const

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  error: MediaError | Error,
  details?: any
): NextResponse<ApiResponse<never>> {
  const mediaError =
    error instanceof MediaError
      ? error
      : new MediaError(error.message, 'INTERNAL_ERROR', 500, details)

  const response: ApiResponse<never> = {
    success: false,
    error: mediaError.message,
    code: mediaError.code,
    details: mediaError.details,
  }

  return NextResponse.json(response, { status: mediaError.statusCode })
}

/**
 * Handle file upload errors
 */
export function handleFileUploadError(error: Error): MediaError {
  if (error.message.includes('File too large')) {
    return MediaErrors.FILE_TOO_LARGE
  }

  if (error.message.includes('Invalid file type')) {
    return MediaErrors.INVALID_FILE_TYPE
  }

  if (error.message.includes('File not found')) {
    return MediaErrors.FILE_NOT_FOUND
  }

  return new MediaError('File upload failed', 'FILE_UPLOAD_FAILED', 500, {
    originalError: error.message,
  })
}

/**
 * Handle validation errors
 */
export function handleValidationError(
  field: string,
  message: string
): MediaError {
  return new MediaError(message, 'VALIDATION_ERROR', 400, { field })
}

/**
 * Handle database errors
 */
export function handleDatabaseError(error: Error): MediaError {
  if (error.message.includes('connection')) {
    return MediaErrors.DATABASE_CONNECTION_FAILED
  }

  if (error.message.includes('query')) {
    return MediaErrors.DATABASE_QUERY_FAILED
  }

  return new MediaError('Database operation failed', 'DATABASE_ERROR', 500, {
    originalError: error.message,
  })
}

/**
 * Handle optimization errors
 */
export function handleOptimizationError(error: Error): MediaError {
  if (error.message.includes('format')) {
    return MediaErrors.UNSUPPORTED_FORMAT
  }

  return MediaErrors.OPTIMIZATION_FAILED
}

/**
 * Log error with context
 */
export function logError(error: MediaError | Error, context?: any): void {
  const timestamp = new Date().toISOString()
  const errorInfo = {
    timestamp,
    message: error.message,
    stack: error.stack,
    context,
  }

  if (error instanceof MediaError) {
    console.error(`[MediaError] ${error.code}:`, errorInfo)
  } else {
    console.error(`[Error] ${error.name}:`, errorInfo)
  }
}

/**
 * Handle async errors
 */
export function handleAsyncError<T>(
  asyncFn: () => Promise<T>,
  errorHandler?: (error: Error) => MediaError
): Promise<T> {
  return asyncFn().catch(error => {
    logError(error)

    if (errorHandler) {
      throw errorHandler(error)
    }

    throw new MediaError('Operation failed', 'ASYNC_ERROR', 500, {
      originalError: error.message,
    })
  })
}

/**
 * Retry mechanism for failed operations
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        throw lastError
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError!
}

/**
 * Validate error response format
 */
export function isValidErrorResponse(
  response: any
): response is ApiResponse<never> {
  return (
    response &&
    typeof response === 'object' &&
    'success' in response &&
    response.success === false &&
    'error' in response &&
    'code' in response
  )
}

/**
 * Extract error code from response
 */
export function getErrorCode(response: ApiResponse<never>): string {
  return response.code || 'UNKNOWN_ERROR'
}

/**
 * Create user-friendly error messages
 */
export function getUserFriendlyMessage(error: MediaError): string {
  const friendlyMessages: Record<string, string> = {
    FILE_NOT_FOUND: 'The requested file could not be found.',
    FILE_TOO_LARGE: 'The file is too large. Please choose a smaller file.',
    INVALID_FILE_TYPE:
      'The file type is not supported. Please use JPEG, PNG, WebP, or AVIF.',
    ASSET_NOT_FOUND: 'The requested media asset could not be found.',
    GALLERY_NOT_FOUND: 'The requested gallery could not be found.',
    UNAUTHORIZED: 'You must be logged in to perform this action.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
    SERVICE_UNAVAILABLE:
      'The service is temporarily unavailable. Please try again later.',
  }

  return (
    friendlyMessages[error.code] ||
    'An unexpected error occurred. Please try again.'
  )
}

/**
 * Error boundary for React components
 */
export function createErrorBoundary() {
  return {
    componentDidCatch(error: Error, errorInfo: any) {
      logError(error, { errorInfo })
    },
  }
}
