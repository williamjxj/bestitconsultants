/**
 * Navigation API endpoint
 * GET /api/navigation - Returns navigation menu items
 */

import { NextRequest, NextResponse } from 'next/server'

import { navigationService } from '@/services/navigation'

export async function GET(request: NextRequest) {
  try {
    // Get navigation items
    const items = await navigationService.getNavigationItems()

    // Get categories
    const categories = navigationService.getNavigationCategories()

    // Validate navigation structure
    const isValid = navigationService.validateNavigation()
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid navigation structure' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      items,
      categories,
      total: items.length,
    })
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch navigation',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
