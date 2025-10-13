import { NextRequest, NextResponse } from 'next/server'

import { TeamService } from '@/services/teamService'

export async function GET(_request: NextRequest) {
  try {
    const result = await TeamService.getAllTeamMembers()

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
