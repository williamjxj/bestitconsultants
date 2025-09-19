/**
 * AI News API endpoint for specific article
 * GET /api/ai-news/[id] - Returns a specific AI news article by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiNewsService } from '@/services/ai-news';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    // Get article by ID
    const article = await aiNewsService.getArticleById(id);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching AI news article:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch AI news article',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
