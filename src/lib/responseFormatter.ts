export function formatSuccessResponse<T>(data: T, meta?: Record<string, any>) {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  }
}

export function formatErrorResponse(
  message: string,
  code: string,
  details?: Record<string, any>
) {
  return {
    success: false,
    message,
    code,
    ...(details && { details }),
  }
}

export function formatPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  limit: number = 10,
  total?: number
) {
  return {
    success: true,
    data,
    meta: {
      total: total || data.length,
      page,
      limit,
      totalPages: Math.ceil((total || data.length) / limit),
    },
  }
}
