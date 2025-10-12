import { describe, it, expect } from '@jest/globals'

describe('Team API Contract Tests', () => {
  it('should return team members with correct structure', async () => {
    const response = await fetch('/api/team')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data).toBeDefined()
    expect(Array.isArray(data.data)).toBe(true)

    if (data.data.length > 0) {
      const teamMember = data.data[0]
      expect(teamMember).toHaveProperty('id')
      expect(teamMember).toHaveProperty('name')
      expect(teamMember).toHaveProperty('title')
      expect(teamMember).toHaveProperty('location')
      expect(teamMember).toHaveProperty('experience')
      expect(teamMember).toHaveProperty('avatar')
      expect(teamMember).toHaveProperty('bio')
      expect(teamMember).toHaveProperty('expertise')
      expect(teamMember).toHaveProperty('achievements')
      expect(teamMember).toHaveProperty('specializations')
      expect(teamMember).toHaveProperty('prestigeProjects'))
    }
  })

  it('should return metadata with team members', async () => {
    const response = await fetch('/api/team')
    const data = await response.json()

    expect(data.meta).toBeDefined()
    expect(data.meta.total).toBeGreaterThan(0)
    expect(data.meta.page).toBe(1)
    expect(data.meta.limit).toBe(10)
  })
})
