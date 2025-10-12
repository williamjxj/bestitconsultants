/**
 * Unit tests for MediaService
 * Tests service functionality, API integration, and error handling
 */

import { MediaServiceImpl } from '@/services/media-service'
import { MediaServiceConfig } from '@/types/media'

// Mock fetch
global.fetch = jest.fn()

describe('MediaService', () => {
  let mediaService: MediaServiceImpl
  let mockConfig: MediaServiceConfig

  beforeEach(() => {
    mockConfig = {
      baseUrl: 'http://localhost:3000/api',
      timeout: 10000,
      retries: 3,
    }
    mediaService = new MediaServiceImpl(mockConfig)
    jest.clearAllMocks()
  })

  describe('getAssets', () => {
    it('should fetch assets without parameters', async () => {
      const mockResponse = {
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          pages: 0,
          hasNext: false,
          hasPrev: false,
        },
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.getAssets()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/assets',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('should fetch assets with parameters', async () => {
      const mockResponse = {
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0,
          hasNext: false,
          hasPrev: false,
        },
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.getAssets({
        category: 'team',
        format: 'webp',
        priority: 'high',
        page: 1,
        limit: 10,
      })

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/assets?category=team&format=webp&priority=high&page=1&limit=10',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle fetch errors', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(mediaService.getAssets()).rejects.toThrow('Network error')
    })

    it('should handle HTTP errors', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      await expect(mediaService.getAssets()).rejects.toThrow(
        'HTTP 500: Internal Server Error'
      )
    })
  })

  describe('getAsset', () => {
    it('should fetch a single asset', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          src: '/test.jpg',
          alt: 'Test image',
          width: 400,
          height: 300,
          format: 'jpeg',
          category: 'test',
          priority: 'medium',
          loading: 'lazy',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.getAsset('1')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/assets/1',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('createAsset', () => {
    it('should create a new asset', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '2',
          src: '/new-test.jpg',
          alt: 'New test image',
          width: 400,
          height: 300,
          format: 'jpeg',
          category: 'test',
          priority: 'medium',
          loading: 'lazy',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }

      const formData = new FormData()
      formData.append(
        'file',
        new Blob(['test'], { type: 'image/jpeg' }),
        'test.jpg'
      )
      formData.append('alt', 'New test image')
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.createAsset(formData)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/assets',
        expect.objectContaining({
          method: 'POST',
          body: formData,
          headers: {},
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('updateAsset', () => {
    it('should update an existing asset', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          src: '/test.jpg',
          alt: 'Updated test image',
          width: 400,
          height: 300,
          format: 'jpeg',
          category: 'test',
          priority: 'high',
          loading: 'eager',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }

      const updateData = {
        alt: 'Updated test image',
        priority: 'high' as const,
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.updateAsset('1', updateData)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/assets/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('deleteAsset', () => {
    it('should delete an asset', async () => {
      const mockResponse = {
        success: true,
        message: 'Asset deleted successfully',
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.deleteAsset('1')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/assets/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getGalleries', () => {
    it('should fetch galleries', async () => {
      const mockResponse = {
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          pages: 0,
          hasNext: false,
          hasPrev: false,
        },
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.getGalleries()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/galleries',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getGallery', () => {
    it('should fetch a single gallery', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '1',
          title: 'Test Gallery',
          description: 'Test gallery description',
          assets: [],
          layout: 'grid',
          columns: 3,
          spacing: 16,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.getGallery('1')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/galleries/1',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('createGallery', () => {
    it('should create a new gallery', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: '2',
          title: 'New Gallery',
          description: 'New gallery description',
          assets: [],
          layout: 'grid',
          columns: 3,
          spacing: 16,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }

      const galleryData = {
        title: 'New Gallery',
        description: 'New gallery description',
        assets: [],
        layout: 'grid' as const,
        columns: 3,
        spacing: 16,
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.createGallery(galleryData)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/galleries',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(galleryData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getCategories', () => {
    it('should fetch categories', async () => {
      const mockResponse = {
        success: true,
        data: [
          {
            id: '1',
            name: 'Team',
            description: 'Team member photos',
            icon: 'users',
            color: '#3B82F6',
            tags: ['team', 'people'],
            seoKeywords: ['team', 'staff', 'employees'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.getCategories()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/categories',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('optimizeAssets', () => {
    it('should optimize assets', async () => {
      const mockResponse = {
        success: true,
        data: [
          {
            id: '1',
            src: '/optimized/test.webp',
            alt: 'Optimized test image',
            width: 400,
            height: 300,
            format: 'webp',
            size: 150000,
            category: 'optimized',
            priority: 'medium',
            loading: 'lazy',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      }

      const optimizeRequest = {
        assetIds: ['1'],
        formats: ['webp', 'avif'],
        sizes: [
          { width: 640, height: 480, name: 'mobile' },
          { width: 1280, height: 720, name: 'desktop' },
        ],
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await mediaService.optimizeAssets(optimizeRequest)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/media/optimize',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(optimizeRequest),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('Error handling', () => {
    it('should handle timeout errors', async () => {
      ;(fetch as jest.Mock).mockImplementationOnce(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 100)
          )
      )

      await expect(mediaService.getAssets()).rejects.toThrow('Timeout')
    })

    it('should handle JSON parsing errors', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      })

      await expect(mediaService.getAssets()).rejects.toThrow('Invalid JSON')
    })
  })
})
