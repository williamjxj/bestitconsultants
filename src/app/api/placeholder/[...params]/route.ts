import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  const [width, height] = params.params
  const url = new URL(request.url)
  const theme = url.searchParams.get('theme') || 'ai'
  const seed = url.searchParams.get('seed') || Math.floor(Math.random() * 1000)

  // Default dimensions
  const w = parseInt(width) || 400
  const h = parseInt(height) || 250

  // Create a better placeholder with AI/tech theme
  const themes = [
    'ai',
    'tech',
    'data',
    'neural',
    'code',
    'robot',
    'future',
    'smart',
  ]
  const selectedTheme = themes.includes(theme)
    ? theme
    : themes[Math.floor(Math.random() * themes.length)]

  // Generate SVG placeholder instead of external service
  const colors = {
    ai: { bg: '#1e40af', text: '#ffffff', accent: '#3b82f6' },
    tech: { bg: '#059669', text: '#ffffff', accent: '#10b981' },
    data: { bg: '#7c3aed', text: '#ffffff', accent: '#8b5cf6' },
    neural: { bg: '#dc2626', text: '#ffffff', accent: '#ef4444' },
    code: { bg: '#ea580c', text: '#ffffff', accent: '#f97316' },
    robot: { bg: '#0891b2', text: '#ffffff', accent: '#06b6d4' },
    future: { bg: '#be185d', text: '#ffffff', accent: '#ec4899' },
    smart: { bg: '#4338ca', text: '#ffffff', accent: '#6366f1' },
  }

  const themeColors = colors[selectedTheme as keyof typeof colors] || colors.ai

  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${themeColors.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${themeColors.accent};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="${w * 0.5}" cy="${h * 0.4}" r="${Math.min(w, h) * 0.15}" fill="${themeColors.text}" opacity="0.1"/>
      <circle cx="${w * 0.3}" cy="${h * 0.7}" r="${Math.min(w, h) * 0.08}" fill="${themeColors.text}" opacity="0.1"/>
      <circle cx="${w * 0.7}" cy="${h * 0.8}" r="${Math.min(w, h) * 0.06}" fill="${themeColors.text}" opacity="0.1"/>
      <text x="50%" y="50%" text-anchor="middle" fill="${themeColors.text}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(w, h) * 0.08}" font-weight="600" opacity="0.8">${selectedTheme.toUpperCase()}</text>
      <text x="50%" y="60%" text-anchor="middle" fill="${themeColors.text}" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.min(w, h) * 0.04}" opacity="0.6">AI NEWS</text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
