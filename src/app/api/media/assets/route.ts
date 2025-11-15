/**
 * API route for media assets
 * Handles GET and POST requests for media asset management
 */

import { NextRequest, NextResponse } from 'next/server'

import { getR2ImageUrl } from '@/lib/utils'
import { MediaAsset, MediaAssetsResponse, ApiResponse } from '@/types/media'

// Mock data for development
const mockAssets: MediaAsset[] = [
  {
    id: '1',
    src: getR2ImageUrl('istockphoto-1212876953-612x612.jpg'),
    alt: 'Modern technology and innovation workspace with multiple monitors and collaborative environment',
    title: 'Technology Innovation Workspace',
    description:
      'Professional workspace showcasing modern technology and collaborative environment',
    width: 612,
    height: 612,
    format: 'jpeg',
    size: 245760,
    category: 'hero',
    priority: 'high',
    loading: 'eager',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    src: getR2ImageUrl('istockphoto-1358835459-612x612.webp'),
    alt: 'Professional team collaboration in modern office environment with diverse team members working together',
    title: 'Team Collaboration',
    description:
      'Diverse team members collaborating in a modern office environment',
    width: 612,
    height: 612,
    format: 'webp',
    size: 180000,
    category: 'about',
    priority: 'medium',
    loading: 'lazy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    src: getR2ImageUrl('istockphoto-1350198816-612x612.jpg'),
    alt: 'Professional workspace with modern technology and clean design',
    title: 'Professional Workspace',
    description:
      'Clean and modern professional workspace with advanced technology',
    width: 612,
    height: 612,
    format: 'jpeg',
    size: 220000,
    category: 'services',
    priority: 'medium',
    loading: 'lazy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    src: getR2ImageUrl('istockphoto-2163952011-612x612.webp'),
    alt: 'Modern office environment with collaborative workspace and technology',
    title: 'Modern Office Environment',
    description:
      'Contemporary office space designed for collaboration and innovation',
    width: 612,
    height: 612,
    format: 'webp',
    size: 195000,
    category: 'portfolio',
    priority: 'medium',
    loading: 'lazy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    src: getR2ImageUrl('selfies/william-jiang.jpg'),
    alt: 'William Jiang - Founder & CEO of BestIT Consulting',
    title: 'William Jiang - Founder & CEO',
    description:
      'Portrait of William Jiang, Founder and CEO of BestIT Consulting',
    width: 400,
    height: 400,
    format: 'jpeg',
    size: 85000,
    category: 'team',
    priority: 'high',
    loading: 'eager',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// GET /api/media/assets
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const category = searchParams.get('category')
    const format = searchParams.get('format')
    const priority = searchParams.get('priority')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Validate parameters
    if (page < 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Page must be greater than 0',
          code: 'INVALID_PAGE',
        },
        { status: 400 }
      )
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Limit must be between 1 and 100',
          code: 'INVALID_LIMIT',
        },
        { status: 400 }
      )
    }

    // Filter assets
    let filteredAssets = [...mockAssets]

    if (category) {
      filteredAssets = filteredAssets.filter(
        asset => asset.category === category
      )
    }

    if (format) {
      const validFormats = ['webp', 'avif', 'jpeg', 'png']
      if (!validFormats.includes(format)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid format. Must be one of: webp, avif, jpeg, png',
            code: 'INVALID_FORMAT',
          },
          { status: 400 }
        )
      }
      filteredAssets = filteredAssets.filter(asset => asset.format === format)
    }

    if (priority) {
      const validPriorities = ['high', 'medium', 'low']
      if (!validPriorities.includes(priority)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid priority. Must be one of: high, medium, low',
            code: 'INVALID_PRIORITY',
          },
          { status: 400 }
        )
      }
      filteredAssets = filteredAssets.filter(
        asset => asset.priority === priority
      )
    }

    // Pagination
    const total = filteredAssets.length
    const pages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedAssets = filteredAssets.slice(startIndex, endIndex)

    const response: MediaAssetsResponse = {
      success: true,
      data: paginatedAssets,
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching media assets:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

// POST /api/media/assets
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Validate required fields
    const file = formData.get('file') as File
    const alt = formData.get('alt') as string

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'File is required',
          code: 'MISSING_FILE',
        },
        { status: 400 }
      )
    }

    if (!alt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Alt text is required',
          code: 'MISSING_ALT',
        },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type. Must be JPEG, PNG, WebP, or AVIF',
          code: 'INVALID_FILE_TYPE',
        },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: 'File too large. Maximum size is 5MB',
          code: 'FILE_TOO_LARGE',
        },
        { status: 413 }
      )
    }

    // Get optional fields
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = (formData.get('category') as string) || 'general'
    const priority = (formData.get('priority') as string) || 'medium'

    // Validate priority
    const validPriorities = ['high', 'medium', 'low']
    if (!validPriorities.includes(priority)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid priority. Must be one of: high, medium, low',
          code: 'INVALID_PRIORITY',
        },
        { status: 400 }
      )
    }

    // Create new asset
    const newAsset: MediaAsset = {
      id: (mockAssets.length + 1).toString(),
      src: `/uploads/${file.name}`,
      alt,
      title,
      description,
      width: 0, // Would be extracted from image metadata
      height: 0, // Would be extracted from image metadata
      format: file.type.split('/')[1] as 'webp' | 'avif' | 'jpeg' | 'png',
      size: file.size,
      category,
      priority: priority as 'high' | 'medium' | 'low',
      loading: priority === 'high' ? 'eager' : 'lazy',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real implementation, you would:
    // 1. Save the file to storage
    // 2. Extract image metadata (width, height)
    // 3. Generate optimized versions
    // 4. Save to database

    const response: ApiResponse<MediaAsset> = {
      success: true,
      data: newAsset,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating media asset:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}
