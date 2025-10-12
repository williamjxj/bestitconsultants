import { describe, it, expect } from '@jest/globals'

describe('Team Member API Contract Tests', () => {
  it('should return specific team member by ID', async () => {
    const teamMemberId = 'william-jiang'
    const response = await fetch(`/api/team/${teamMemberId}`)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(data.data.id).toBe(teamMemberId)
    expect(data.data.name).toBeDefined()
    expect(data.data.title).toBeDefined()
    expect(data.data.prestigeProjects).toBeDefined()
    expect(Array.isArray(data.data.prestigeProjects)).toBe(true)
  })

  it('should return 404 for non-existent team member', async () => {
    const response = await fetch('/api/team/non-existent')
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.success).toBe(false)
    expect(data.message).toBeDefined()
    expect(data.code).toBe('TEAM_MEMBER_NOT_FOUND')
  })

  it('should return prestige projects for team member', async () => {
    const teamMemberId = 'william-jiang'
    const response = await fetch(`/api/team/${teamMemberId}/prestige-projects`)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)

    if (data.data.length > 0) {
      const project = data.data[0]
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('name')
      expect(project).toHaveProperty('type')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('outcome')
      expect(project).toHaveProperty('technologies')
      expect(project).toHaveProperty('year')
    }
  })
})
