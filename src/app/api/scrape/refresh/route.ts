/**
 * API endpoint for refreshing AI news content
 * POST /api/scrape/refresh
 */

import { NextResponse } from 'next/server'
import { webScrapingService } from '@/services/web-scraping'

export async function POST() {
  try {
    console.log('Initiating content refresh...')

    const result = await webScrapingService.refreshContent()

    if (result.success) {
      return NextResponse.json({
        message: result.message,
        status: result.status,
        articlesUpdated: result.articlesUpdated
      })
    } else {
      return NextResponse.json(
        {
          error: result.message,
          status: result.status
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Content refresh error:', error)
    return NextResponse.json(
      {
        error: 'Content refresh failed',
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
    console.error('Error getting refresh status:', error)
    return NextResponse.json(
      { error: 'Failed to get refresh status' },
      { status: 500 }
    )
  }
}
