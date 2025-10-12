export class APIError extends Error {
  public statusCode: number
  public code: string

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message)
    this.statusCode = statusCode
    this.code = code
  }
}

export function handleAPIError(error: unknown): {
  message: string
  statusCode: number
  code: string
} {
  if (error instanceof APIError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
    }
  }

  return {
    message: 'An unknown error occurred',
    statusCode: 500,
    code: 'UNKNOWN_ERROR',
  }
}

export function createErrorResponse(
  message: string,
  statusCode: number = 500,
  code: string = 'INTERNAL_SERVER_ERROR'
) {
  return {
    success: false,
    message,
    code,
    details: {
      timestamp: new Date().toISOString(),
      statusCode,
    },
  }
}
