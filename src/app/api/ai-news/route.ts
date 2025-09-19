/**
 * AI News API endpoint
 * GET /api/ai-news - Returns AI news articles with filtering and pagination
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiNewsService } from '@/services/ai-news';
import type { NewsCategory } from '@/types/ai-news';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const category = searchParams.get('category') as NewsCategory | 'All' || 'All';
    const trending = searchParams.get('trending') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate parameters
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 }
      );
    }

    if (offset < 0) {
      return NextResponse.json(
        { error: 'Offset must be non-negative' },
        { status: 400 }
      );
    }

    // Get articles with filtering
    const result = await aiNewsService.getArticles({
      category: category !== 'All' ? category : undefined,
      trending: trending || undefined,
      limit,
      offset
    });

    return NextResponse.json({
      articles: result.articles,
      total: result.total,
      hasMore: result.hasMore,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error fetching AI news:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch AI news',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
