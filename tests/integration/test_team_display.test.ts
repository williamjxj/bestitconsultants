import { describe, it, expect } from '@jest/globals'

describe('Team Display Integration Tests', () => {
  it('should display team members with enhanced profiles', async () => {
    // This test will verify that the team page displays all team members
    // with their enhanced profiles including prestige projects
    const response = await fetch('/api/team')
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.length).toBeGreaterThan(0)

    // Verify each team member has required fields
    data.data.forEach((member: any) => {
      expect(member.name).toBeDefined()
      expect(member.title).toBeDefined()
      expect(member.expertise).toBeDefined()
      expect(member.achievements).toBeDefined()
      expect(member.prestigeProjects).toBeDefined()
      expect(Array.isArray(member.prestigeProjects)).toBe(true)
    })
  })

  it('should display prestige projects for team members', async () => {
    const response = await fetch('/api/team')
    const data = await response.json()

    expect(data.success).toBe(true)

    // Find a team member with prestige projects
    const memberWithProjects = data.data.find(
      (member: any) =>
        member.prestigeProjects && member.prestigeProjects.length > 0
    )

    if (memberWithProjects) {
      expect(memberWithProjects.prestigeProjects.length).toBeGreaterThan(0)

      memberWithProjects.prestigeProjects.forEach((project: any) => {
        expect(project.name).toBeDefined()
        expect(project.type).toBeDefined()
        expect(project.description).toBeDefined()
        expect(project.outcome).toBeDefined()
        expect(project.technologies).toBeDefined()
        expect(project.year).toBeDefined()
      })
    }
  })
})
