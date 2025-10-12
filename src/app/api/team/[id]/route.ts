import { NextRequest, NextResponse } from 'next/server'
import { TeamService } from '@/services/teamService'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const result = await TeamService.getTeamMemberById(id)

    if (!result.success) {
      const status = result.code === 'TEAM_MEMBER_NOT_FOUND' ? 404 : 500
      return NextResponse.json(result, { status })
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
