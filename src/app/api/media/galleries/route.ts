/**
 * API route for media galleries
 * Handles GET and POST requests for media gallery management
 */

import { NextRequest, NextResponse } from 'next/server'

import {
  MediaGallery,
  MediaGalleriesResponse,
  ApiResponse,
} from '@/types/media'

// Mock data for development
const mockGalleries: MediaGallery[] = [
  {
    id: '1',
    title: 'Homepage Hero Images',
    description: 'Collection of hero images for the homepage',
    assets: [
      {
        id: '1',
        src: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1212876953-612x612.jpg',
        alt: 'Modern technology and innovation workspace',
        title: 'Technology Innovation Workspace',
        width: 612,
        height: 612,
        format: 'jpeg',
        category: 'hero',
        priority: 'high',
        loading: 'eager',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    layout: 'grid',
    columns: 1,
    spacing: 16,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Team Collaboration Gallery',
    description: 'Images showcasing team collaboration and workspace',
    assets: [
      {
        id: '2',
        src: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1358835459-612x612.webp',
        alt: 'Professional team collaboration',
        title: 'Team Collaboration',
        width: 612,
        height: 612,
        format: 'webp',
        category: 'about',
        priority: 'medium',
        loading: 'lazy',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        src: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/istockphoto-1350198816-612x612.jpg',
        alt: 'Professional workspace',
        title: 'Professional Workspace',
        width: 612,
        height: 612,
        format: 'jpeg',
        category: 'services',
        priority: 'medium',
        loading: 'lazy',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    layout: 'grid',
    columns: 2,
    spacing: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Team Member Portraits',
    description: 'Professional portraits of team members',
    assets: [
      {
        id: '5',
        src: '/images/william-jiang.jpg',
        alt: 'William Jiang - Founder & CEO',
        title: 'William Jiang - Founder & CEO',
        width: 400,
        height: 400,
        format: 'jpeg',
        category: 'team',
        priority: 'high',
        loading: 'eager',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    layout: 'grid',
    columns: 3,
    spacing: 16,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// GET /api/media/galleries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
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

    // Pagination
    const total = mockGalleries.length
    const pages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedGalleries = mockGalleries.slice(startIndex, endIndex)

    const response: MediaGalleriesResponse = {
      success: true,
      data: paginatedGalleries,
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
    console.error('Error fetching media galleries:', error)
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

// POST /api/media/galleries
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { title, description, assets, layout, columns, spacing } = body

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title is required',
          code: 'MISSING_TITLE',
        },
        { status: 400 }
      )
    }

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Description is required',
          code: 'MISSING_DESCRIPTION',
        },
        { status: 400 }
      )
    }

    if (!assets || !Array.isArray(assets) || assets.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Assets array is required and must not be empty',
          code: 'MISSING_ASSETS',
        },
        { status: 400 }
      )
    }

    // Validate layout
    const validLayouts = ['grid', 'carousel', 'masonry']
    if (layout && !validLayouts.includes(layout)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid layout. Must be one of: grid, carousel, masonry',
          code: 'INVALID_LAYOUT',
        },
        { status: 400 }
      )
    }

    // Validate columns
    if (columns && (columns < 1 || columns > 6)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Columns must be between 1 and 6',
          code: 'INVALID_COLUMNS',
        },
        { status: 400 }
      )
    }

    // Validate spacing
    if (spacing && spacing < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Spacing must be non-negative',
          code: 'INVALID_SPACING',
        },
        { status: 400 }
      )
    }

    // Create new gallery
    const newGallery: MediaGallery = {
      id: (mockGalleries.length + 1).toString(),
      title,
      description,
      assets: [], // Would be populated with actual asset data
      layout: layout || 'grid',
      columns: columns || 3,
      spacing: spacing || 16,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real implementation, you would:
    // 1. Validate that all asset IDs exist
    // 2. Save to database
    // 3. Return the created gallery with populated assets

    const response: ApiResponse<MediaGallery> = {
      success: true,
      data: newGallery,
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating media gallery:', error)
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
