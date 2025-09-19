/**
 * API endpoint for initiating AI news scraping
 * POST /api/scrape/ai-news
 */

import { NextRequest, NextResponse } from 'next/server'
import { webScrapingService } from '@/services/web-scraping'
import { validateScrapeRequest } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validationResult = validateScrapeRequest(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request parameters',
          details: validationResult.errors
        },
        { status: 400 }
      )
    }

    const { sources, count } = validationResult.data

    // Check if scraping is already in progress
    const status = webScrapingService.getScrapingStatus()
    if (status.isScraping) {
      return NextResponse.json(
        {
          error: 'Scraping is already in progress',
          status: 'busy'
        },
        { status: 409 }
      )
    }

    // Initiate scraping
    const result = await webScrapingService.scrapeAINews(sources, count)

    if (result.success) {
      return NextResponse.json({
        message: result.message,
        articlesCount: result.articlesCount,
        taskId: `scrape-${Date.now()}`,
        status: 'completed',
        errors: result.errors
      })
    } else {
      return NextResponse.json(
        {
          error: result.message,
          status: 'failed',
          errors: result.errors
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('AI news scraping error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        status: 'failed'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const status = webScrapingService.getScrapingStatus()

    return NextResponse.json({
      isScraping: status.isScraping,
      lastScrapeTime: status.lastScrapeTime,
      canScrape: status.canScrape
    })
  } catch (error) {
    console.error('Error getting scraping status:', error)
    return NextResponse.json(
      { error: 'Failed to get scraping status' },
      { status: 500 }
    )
  }
}
