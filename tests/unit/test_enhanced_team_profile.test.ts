import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { EnhancedTeamProfile } from '../../src/components/team/EnhancedTeamProfile'

describe('EnhancedTeamProfile Component', () => {
  const mockTeamMember = {
    id: 'william-jiang',
    name: 'William Jiang',
    title: 'AI Consultant, Full Stack Engineer',
    location: 'Vancouver, Canada',
    experience: 20,
    avatar: '/images/william-jiang.jpg',
    bio: 'AI Consultant with 20+ years experience',
    expertise: ['AI/ML', 'React.js', 'Node.js'],
    achievements: ['Award-winning FedEx project'],
    specializations: ['Python microservices'],
    prestigeProjects: [
      {
        id: 'fedex-project',
        name: 'FedEx Award-Winning Project',
        type: 'project' as const,
        description: 'Led development of award-winning logistics optimization system',
        outcome: 'Significant contributor to award-winning project',
        technologies: ['Python', 'Kafka', 'Microservices'],
        year: 2020
      }
    ]
  }

  it('renders team member information correctly', () => {
    render(<EnhancedTeamProfile member={mockTeamMember} />)

    expect(screen.getByText('William Jiang')).toBeInTheDocument()
    expect(screen.getByText('AI Consultant, Full Stack Engineer')).toBeInTheDocument()
    expect(screen.getByText('Vancouver, Canada')).toBeInTheDocument()
    expect(screen.getByText('AI Consultant with 20+ years experience')).toBeInTheDocument()
  })

  it('renders expertise tags', () => {
    render(<EnhancedTeamProfile member={mockTeamMember} />)

    expect(screen.getByText('AI/ML')).toBeInTheDocument()
    expect(screen.getByText('React.js')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('renders achievements list', () => {
    render(<EnhancedTeamProfile member={mockTeamMember} />)

    expect(screen.getByText('Award-winning FedEx project')).toBeInTheDocument()
  })

  it('renders prestige projects when available', () => {
    render(<EnhancedTeamProfile member={mockTeamMember} />)

    expect(screen.getByText('FedEx Award-Winning Project')).toBeInTheDocument()
    expect(screen.getByText('Led development of award-winning logistics optimization system')).toBeInTheDocument()
    expect(screen.getByText('Significant contributor to award-winning project')).toBeInTheDocument()
  })

  it('renders team member avatar', () => {
    render(<EnhancedTeamProfile member={mockTeamMember} />)

    const avatar = screen.getByAltText('William Jiang')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/images/william-jiang.jpg')
  })
})
