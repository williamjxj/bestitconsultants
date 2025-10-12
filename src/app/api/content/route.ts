import { NextRequest, NextResponse } from 'next/server'
import { ContentService } from '@/services/contentService'

export async function GET(request: NextRequest) {
  try {
    const result = await ContentService.getAllContentSections()

    if (!result.success) {
      return NextResponse.json(result, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    )
  }
}
