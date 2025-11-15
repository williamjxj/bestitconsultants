/**
 * API route for media optimization
 * Handles POST requests for optimizing media assets
 */

import { NextRequest, NextResponse } from 'next/server'

import { getR2ImageUrl } from '@/lib/utils'
import { OptimizeRequest, OptimizeResponse } from '@/types/media'

// POST /api/media/optimize
export async function POST(request: NextRequest) {
  try {
    const body: OptimizeRequest = await request.json()

    // Validate required fields
    const { assetIds, formats } = body

    if (!assetIds || !Array.isArray(assetIds) || assetIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Asset IDs array is required and must not be empty',
          code: 'MISSING_ASSET_IDS',
        },
        { status: 400 }
      )
    }

    if (!formats || !Array.isArray(formats) || formats.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Formats array is required and must not be empty',
          code: 'MISSING_FORMATS',
        },
        { status: 400 }
      )
    }

    // Validate formats
    const validFormats = ['webp', 'avif', 'jpeg', 'png']
    const invalidFormats = formats.filter(
      format => !validFormats.includes(format)
    )
    if (invalidFormats.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid formats: ${invalidFormats.join(', ')}. Must be one of: ${validFormats.join(', ')}`,
          code: 'INVALID_FORMATS',
        },
        { status: 400 }
      )
    }

    // Validate sizes if provided
    if (body.sizes) {
      const invalidSizes = body.sizes.filter(
        size =>
          !size.width || !size.height || size.width <= 0 || size.height <= 0
      )
      if (invalidSizes.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: 'All sizes must have positive width and height values',
            code: 'INVALID_SIZES',
          },
          { status: 400 }
        )
      }
    }

    // Mock optimization process
    const optimizedAssets = assetIds.map(assetId => ({
      id: assetId,
      src: getR2ImageUrl(`optimized/${assetId}.webp`),
      alt: `Optimized image ${assetId}`,
      title: `Optimized Image ${assetId}`,
      width: 800,
      height: 600,
      format: 'webp' as const,
      size: 150000,
      category: 'optimized',
      priority: 'medium' as const,
      loading: 'lazy' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    // In a real implementation, you would:
    // 1. Validate that all asset IDs exist
    // 2. Process each asset for each format
    // 3. Generate optimized versions
    // 4. Store optimized assets
    // 5. Return the optimized assets

    const response: OptimizeResponse = {
      success: true,
      data: optimizedAssets,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error optimizing media assets:', error)

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON',
        },
        { status: 400 }
      )
    }

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
