import { NextResponse } from 'next/server'

import { getR2ImageUrl } from '@/lib/utils'

export async function GET() {
  try {
    // Fixed 3 office images from R2 bucket offices folder
    const images = [
      getR2ImageUrl('offices/gemini-1.png'),
      getR2ImageUrl('offices/gemini-2.png'),
      getR2ImageUrl('offices/kling-1.jpg'),
    ]

    return NextResponse.json({ success: true, images })
  } catch (err) {
    console.error('Error fetching office images:', err)
    return NextResponse.json({ success: false, images: [] }, { status: 500 })
  }
}


