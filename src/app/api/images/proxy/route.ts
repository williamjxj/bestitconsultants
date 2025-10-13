/**
 * Image proxy API route
 * Handles image requests with multi-tier fallback (R2 → Cache → Local)
 */

import { promises as fs } from 'fs'
import path from 'path'

import { lookup } from 'mime-types'
import { NextRequest, NextResponse } from 'next/server'

import { ImageService } from '@/services/image-service'

// Initialize image service
let imageService: ImageService | null = null

async function getImageService(): Promise<ImageService> {
  if (!imageService) {
    try {
      imageService = await ImageService.fromEnvironment()
    } catch (error) {
      console.warn(
        'Failed to initialize R2 image service, using local fallback:',
        error
      )
      // Create a mock service for local fallback
      imageService = ImageService.forTesting()
    }
  }
  return imageService
}

// Get image from R2 or local fallback
async function getImage(
  imagePath: string
): Promise<{ data: Buffer; contentType: string } | null> {
  try {
    const service = await getImageService()
    const response = await service.getImage(imagePath)

    return {
      data: response.body,
      contentType: response.contentType,
    }
  } catch (error) {
    console.error(`Failed to get image ${imagePath}:`, error)
    return null
  }
}

// Fallback to local filesystem
async function getLocalImage(
  imagePath: string
): Promise<{ data: Buffer; contentType: string } | null> {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    const data = await fs.readFile(fullPath)
    const contentType = lookup(imagePath) || 'application/octet-stream'

    return { data, contentType }
  } catch (error) {
    console.error(`Failed to read local image ${imagePath}:`, error)
    return null
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Extract image path from URL
    const url = new URL(request.url)
    const imagePath = url.pathname.replace('/api/images/proxy', '')

    // Validate image path
    if (!isValidImagePath(imagePath)) {
      return NextResponse.json({ error: 'Invalid image path' }, { status: 400 })
    }

    // Try to get image from R2 service first, then fallback to local
    let imageData = await getImage(imagePath)

    if (!imageData) {
      // Fallback to local filesystem
      imageData = await getLocalImage(imagePath)
    }

    if (!imageData) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Set response headers
    const headers = new Headers()
    headers.set('Content-Type', imageData.contentType)
    headers.set('Content-Length', imageData.data.length.toString())
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    headers.set('Last-Modified', new Date().toUTCString())

    // Add CORS headers
    const origin = request.headers.get('origin')
    if (origin && isAllowedOrigin(origin)) {
      headers.set('Access-Control-Allow-Origin', origin)
      headers.set('Access-Control-Allow-Methods', 'GET')
      headers.set('Access-Control-Allow-Headers', 'Content-Type')
      headers.set('Access-Control-Max-Age', '3600')
    }

    // Log performance metrics
    const responseTime = Date.now() - startTime
    console.log(`Image served: ${imagePath} in ${responseTime}ms`)

    return new NextResponse(imageData.data, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error(`Image proxy error for ${request.url}:`, error)

    const responseTime = Date.now() - startTime

    // Return appropriate error response
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function HEAD(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const imagePath = url.pathname.replace('/api/images/proxy', '')

    if (!isValidImagePath(imagePath)) {
      return new NextResponse(null, { status: 400 })
    }

    // Check if image exists in R2 or local
    let imageData = await getImage(imagePath)

    if (!imageData) {
      imageData = await getLocalImage(imagePath)
    }

    if (imageData) {
      return new NextResponse(null, { status: 200 })
    } else {
      return new NextResponse(null, { status: 404 })
    }
  } catch (error) {
    console.error(`Image HEAD error for ${request.url}:`, error)
    return new NextResponse(null, { status: 500 })
  }
}

/**
 * Validate image path security
 */
function isValidImagePath(imagePath: string): boolean {
  // Check for directory traversal
  if (imagePath.includes('..') || imagePath.includes('~')) {
    return false
  }

  // Check for valid image path format
  if (!imagePath.match(/^R2 bucket [a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/)) {
    return false
  }

  // Check for suspicious characters
  if (
    imagePath.includes('<') ||
    imagePath.includes('>') ||
    imagePath.includes('"')
  ) {
    return false
  }

  return true
}

/**
 * Check if origin is allowed for CORS
 */
function isAllowedOrigin(origin: string): boolean {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://bestitconsultants.com',
    'https://www.bestitconsultants.com',
  ]

  return allowedOrigins.includes(origin)
}

/**
 * Get service health status
 */
export async function OPTIONS(request: NextRequest) {
  try {
    const service = await getImageService()
    const health = await service.getHealthStatus()

    return NextResponse.json({
      status: health.overall,
      r2: health.r2,
      cache: health.cache,
      local: health.local,
      message:
        health.overall === 'healthy'
          ? 'Service operational'
          : 'Service degraded',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Service health check failed' },
      { status: 500 }
    )
  }
}
