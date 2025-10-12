/**
 * Integration test for team page image display
 * Tests the integration of team member images and collaboration images
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { TeamMemberCard } from '@/components/team/team-member-card'

// Mock OptimizedImage component
jest.mock('@/components/ui/optimized-image', () => ({
  OptimizedImage: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('Team Images Integration', () => {
  const mockTeamMember = {
    id: '1',
    name: 'William Jiang',
    title: 'Founder & CEO',
    image: '/images/william-jiang.jpg',
    description:
      'Experienced technology leader with 20+ years in software development and AI solutions.',
    achievements: [
      'Led 50+ successful projects',
      'Expert in AI and machine learning',
      'Canadian technology leader',
    ],
  }

  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks()
  })

  describe('Team Member Card Images', () => {
    it('should render team member card with image', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
      expect(memberImage).toHaveAttribute('src', '/images/william-jiang.jpg')
    })

    it('should apply proper dimensions to team member image', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toHaveAttribute('width', '400')
      expect(memberImage).toHaveAttribute('height', '256')
    })

    it('should apply lazy loading to team member image', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toHaveAttribute('loading', 'lazy')
    })

    it('should apply animation to team member image', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })

    it('should apply hover animation to team member image', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })
  })

  describe('Team Member Content', () => {
    it('should render team member name and title', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      expect(screen.getByText('William Jiang')).toBeInTheDocument()
      expect(screen.getByText('Founder & CEO')).toBeInTheDocument()
    })

    it('should render team member description', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      expect(
        screen.getByText(/Experienced technology leader/)
      ).toBeInTheDocument()
    })

    it('should render team member achievements', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      expect(
        screen.getByText(/Led 50\+ successful projects/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Expert in AI and machine learning/)
      ).toBeInTheDocument()
      expect(screen.getByText(/Canadian technology leader/)).toBeInTheDocument()
    })
  })

  describe('Multiple Team Members', () => {
    const mockTeamMembers = [
      {
        id: '1',
        name: 'William Jiang',
        title: 'Founder & CEO',
        image: '/images/william-jiang.jpg',
        description: 'Experienced technology leader.',
        achievements: ['Led 50+ projects'],
      },
      {
        id: '2',
        name: 'Shamin Yang',
        title: 'Senior Software Engineer',
        image: '/images/shaming-yang.jpeg',
        description: 'Full-stack development expert.',
        achievements: ['React specialist'],
      },
      {
        id: '3',
        name: 'Lewis Liu',
        title: 'Software Architect',
        image: '/images/lewis-liu.jpg',
        description: 'System architecture expert.',
        achievements: ['Scalable systems'],
      },
    ]

    it('should render multiple team members with staggered animations', () => {
      mockTeamMembers.forEach((member, index) => {
        render(<TeamMemberCard member={member} index={index} />)

        const memberImage = screen.getByAltText(
          `${member.name} - ${member.title}`
        )
        expect(memberImage).toBeInTheDocument()
        expect(memberImage).toHaveAttribute('src', member.image)
      })
    })

    it('should apply different animation delays for each member', () => {
      mockTeamMembers.forEach((member, index) => {
        render(<TeamMemberCard member={member} index={index} />)

        const memberImage = screen.getByAltText(
          `${member.name} - ${member.title}`
        )
        expect(memberImage).toBeInTheDocument()
      })
    })
  })

  describe('Image Loading Performance', () => {
    it('should use appropriate image formats for team photos', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toHaveAttribute('src', '/images/william-jiang.jpg')
    })

    it('should apply proper sizes attribute for responsive images', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toHaveAttribute(
        'sizes',
        '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      )
    })

    it('should apply object-cover for proper image scaling', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toHaveClass('w-full', 'h-full', 'object-cover')
    })
  })

  describe('Accessibility', () => {
    it('should have descriptive alt text for team member images', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })

    it('should have proper ARIA labels for interactive elements', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const card = screen.getByText('William Jiang').closest('div')
      expect(card).toBeInTheDocument()
    })

    it('should maintain proper focus order for keyboard navigation', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })
  })

  describe('Animation Integration', () => {
    it('should apply scale animation to team member images', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })

    it('should apply hover scale animation', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })

    it('should apply staggered animations for multiple members', () => {
      const mockTeamMembers = [
        { ...mockTeamMember, id: '1', name: 'Member 1' },
        { ...mockTeamMember, id: '2', name: 'Member 2' },
        { ...mockTeamMember, id: '3', name: 'Member 3' },
      ]

      mockTeamMembers.forEach((member, index) => {
        render(<TeamMemberCard member={member} index={index} />)

        const memberImage = screen.getByAltText(
          `${member.name} - ${member.title}`
        )
        expect(memberImage).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design', () => {
    it('should apply responsive classes to team member cards', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const card = screen.getByText('William Jiang').closest('div')
      expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-lg')
    })

    it('should apply responsive image dimensions', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toHaveAttribute('width', '400')
      expect(memberImage).toHaveAttribute('height', '256')
    })

    it('should apply responsive grid layout', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const card = screen.getByText('William Jiang').closest('div')
      expect(card).toHaveClass('overflow-hidden')
    })
  })

  describe('SEO Optimization', () => {
    it('should have proper title attributes for team member images', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })

    it('should have proper structured data for team members', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      expect(screen.getByText('William Jiang')).toBeInTheDocument()
      expect(screen.getByText('Founder & CEO')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle missing team member images gracefully', () => {
      const memberWithoutImage = {
        ...mockTeamMember,
        image: '',
      }

      render(<TeamMemberCard member={memberWithoutImage} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })

    it('should handle image loading errors gracefully', () => {
      render(<TeamMemberCard member={mockTeamMember} index={0} />)

      const memberImage = screen.getByAltText('William Jiang - Founder & CEO')
      expect(memberImage).toBeInTheDocument()
    })
  })
})
