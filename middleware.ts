/**
 * Next.js middleware for general request handling
 * No longer handles R2 bucket  requests as all images are served from R2
 */

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Add any other middleware logic here if needed
  // No more R2 bucket  handling since all images are served from R2

  return NextResponse.next()
}

/**
 * Configure middleware matcher
 * No longer matching R2 bucket  paths
 */
export const config = {
  matcher: [
    // Add other paths that need middleware handling
    // '/api/:path*', // Example: handle API routes
  ],
}
