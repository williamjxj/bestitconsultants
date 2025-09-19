/**
 * Testimonials API endpoint
 * GET /api/testimonials - Returns testimonials for footer display
 */

import { NextRequest, NextResponse } from 'next/server';
import { testimonialsService } from '@/services/testimonials';

export async function GET(request: NextRequest) {
  try {
    // Get visible testimonials
    const testimonials = await testimonialsService.getTestimonials();

    // Get total count
    const total = await testimonialsService.getTestimonialsCount();

    return NextResponse.json({
      testimonials,
      total
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch testimonials',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
