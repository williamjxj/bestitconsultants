/**
 * MediaService for managing media assets, galleries, and optimization
 * Provides API integration for media management functionality
 */

import {
  MediaService,
  MediaServiceConfig,
  MediaAssetsResponse,
  MediaGalleriesResponse,
  MediaCategoriesResponse,
  ApiResponse,
  MediaAsset,
  MediaGallery,
  OptimizeRequest,
  OptimizeResponse,
} from '@/types/media'

class MediaServiceImpl implements MediaService {
  private config: MediaServiceConfig

  constructor(config: MediaServiceConfig) {
    this.config = config
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.config.timeout),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      )
    }

    return response.json()
  }

  async getAssets(params?: {
    category?: string
    format?: string
    priority?: string
    page?: number
    limit?: number
  }): Promise<MediaAssetsResponse> {
    const searchParams = new URLSearchParams()

    if (params?.category) searchParams.append('category', params.category)
    if (params?.format) searchParams.append('format', params.format)
    if (params?.priority) searchParams.append('priority', params.priority)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())

    const endpoint = `/media/assets${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return this.makeRequest<MediaAssetsResponse>(endpoint)
  }

  async getAsset(id: string): Promise<ApiResponse<MediaAsset>> {
    return this.makeRequest<ApiResponse<MediaAsset>>(`/media/assets/${id}`)
  }

  async createAsset(data: FormData): Promise<ApiResponse<MediaAsset>> {
    return this.makeRequest<ApiResponse<MediaAsset>>('/media/assets', {
      method: 'POST',
      body: data,
      headers: {}, // Let fetch set Content-Type for FormData
    })
  }

  async updateAsset(
    id: string,
    data: Partial<MediaAsset>
  ): Promise<ApiResponse<MediaAsset>> {
    return this.makeRequest<ApiResponse<MediaAsset>>(`/media/assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteAsset(id: string): Promise<ApiResponse<void>> {
    return this.makeRequest<ApiResponse<void>>(`/media/assets/${id}`, {
      method: 'DELETE',
    })
  }

  async getGalleries(params?: {
    page?: number
    limit?: number
  }): Promise<MediaGalleriesResponse> {
    const searchParams = new URLSearchParams()

    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())

    const endpoint = `/media/galleries${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return this.makeRequest<MediaGalleriesResponse>(endpoint)
  }

  async getGallery(id: string): Promise<ApiResponse<MediaGallery>> {
    return this.makeRequest<ApiResponse<MediaGallery>>(`/media/galleries/${id}`)
  }

  async createGallery(
    data: Partial<MediaGallery>
  ): Promise<ApiResponse<MediaGallery>> {
    return this.makeRequest<ApiResponse<MediaGallery>>('/media/galleries', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getCategories(): Promise<MediaCategoriesResponse> {
    return this.makeRequest<MediaCategoriesResponse>('/media/categories')
  }

  async optimizeAssets(request: OptimizeRequest): Promise<OptimizeResponse> {
    return this.makeRequest<OptimizeResponse>('/media/optimize', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }
}

// Default configuration
const defaultConfig: MediaServiceConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retries: 3,
}

// Create and export service instance
export const mediaService = new MediaServiceImpl(defaultConfig)

// Export service class for testing
export { MediaServiceImpl }

// Utility functions for common operations
export const mediaUtils = {
  /**
   * Get image URL with optimization parameters
   */
  getOptimizedImageUrl(
    src: string,
    width?: number,
    height?: number,
    format?: string
  ): string {
    const url = new URL(src, window.location.origin)
    if (width) url.searchParams.set('w', width.toString())
    if (height) url.searchParams.set('h', height.toString())
    if (format) url.searchParams.set('f', format)
    return url.toString()
  },

  /**
   * Get responsive image sizes for different breakpoints
   */
  getResponsiveSizes(breakpoints: { [key: string]: number }): string {
    return Object.entries(breakpoints)
      .map(([breakpoint, size]) => `(max-width: ${breakpoint}px) ${size}px`)
      .join(', ')
  },

  /**
   * Generate placeholder for lazy loading
   */
  generatePlaceholder(width: number, height: number): string {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, width, height)
    }
    return canvas.toDataURL('image/jpeg', 0.1)
  },

  /**
   * Validate image format
   */
  isValidImageFormat(format: string): boolean {
    return ['webp', 'avif', 'jpeg', 'png'].includes(format.toLowerCase())
  },

  /**
   * Get image format from file extension
   */
  getImageFormatFromExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'webp':
        return 'webp'
      case 'avif':
        return 'avif'
      case 'jpg':
      case 'jpeg':
        return 'jpeg'
      case 'png':
        return 'png'
      default:
        return 'jpeg'
    }
  },
}
