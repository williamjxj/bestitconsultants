import { TeamMember, TeamMemberResponse } from '@/types/team'

export class TeamService {
  private static teamMembers: TeamMember[] = []

  static async getAllTeamMembers(): Promise<TeamMemberResponse> {
    try {
      return {
        success: true,
        data: this.teamMembers,
        meta: {
          total: this.teamMembers.length,
          page: 1,
          limit: 10,
        },
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch team members',
        code: 'TEAM_FETCH_ERROR',
      }
    }
  }

  static async getTeamMemberById(id: string): Promise<TeamMemberResponse> {
    try {
      const member = this.teamMembers.find(m => m.id === id)

      if (!member) {
        return {
          success: false,
          message: 'Team member not found',
          code: 'TEAM_MEMBER_NOT_FOUND',
        }
      }

      return {
        success: true,
        data: member,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch team member',
        code: 'TEAM_MEMBER_FETCH_ERROR',
      }
    }
  }

  static async getPrestigeProjects(
    memberId: string
  ): Promise<TeamMemberResponse> {
    try {
      const member = this.teamMembers.find(m => m.id === memberId)

      if (!member) {
        return {
          success: false,
          message: 'Team member not found',
          code: 'TEAM_MEMBER_NOT_FOUND',
        }
      }

      return {
        success: true,
        data: member.prestigeProjects,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch prestige projects',
        code: 'PRESTIGE_PROJECTS_FETCH_ERROR',
      }
    }
  }

  static setTeamMembers(members: TeamMember[]): void {
    this.teamMembers = members
  }
}
