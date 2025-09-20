/**
 * API endpoint for AI news database operations
 * POST /api/scrape/ai-news
 */

import { NextRequest, NextResponse } from 'next/server'
import { webScrapingService } from '@/services/web-scraping'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { limit = 8 } = body

    // Check if refresh is already in progress
    const status = webScrapingService.getRefreshStatus()
    if (status.isRefreshing) {
      return NextResponse.json(
        {
          error: 'Database refresh is already in progress',
          status: 'busy',
        },
        { status: 409 }
      )
    }

    // Get articles from database
    const result = await webScrapingService.getArticlesFromDatabase(limit)

    if (result.success) {
      return NextResponse.json({
        message: result.message,
        articlesCount: result.articlesCount,
        taskId: `db-refresh-${Date.now()}`,
        status: 'completed',
        errors: result.errors,
      })
    } else {
      return NextResponse.json(
        {
          error: result.message,
          status: 'failed',
          errors: result.errors,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('AI news database operation error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        status: 'failed',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const status = webScrapingService.getRefreshStatus()

    return NextResponse.json({
      isRefreshing: status.isRefreshing,
      lastRefreshTime: status.lastRefreshTime,
      canRefresh: status.canRefresh,
    })
  } catch (error) {
    console.error('Error getting refresh status:', error)
    return NextResponse.json(
      { error: 'Failed to get refresh status' },
      { status: 500 }
    )
  }
}
