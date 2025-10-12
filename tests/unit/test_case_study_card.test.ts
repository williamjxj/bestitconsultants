import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { CaseStudyCard } from '../../src/components/case-studies/CaseStudyCard'

describe('CaseStudyCard Component', () => {
  const mockCaseStudy = {
    id: 'ai-textile-design',
    title: 'AI-Powered Transformation in Textile Design',
    challenge: 'Traditional design process took 12 weeks with low creativity and acceptance rates',
    solution: 'Implemented AI-assisted design system with creative style exploration',
    result: 'Reduced design cycle from 12 weeks to 4-6 days, boosted creativity by 10x, increased acceptance rate to 90%',
    metrics: [
      {
        id: 'design-cycle-reduction',
        name: 'Design Cycle Time',
        value: '4-6 days',
        unit: 'days',
        improvement: 'Reduced from 12 weeks to 4-6 days',
        type: 'efficiency' as const
      }
    ],
    technologies: ['AI/ML', 'Python', 'TensorFlow'],
    client: 'Textile Manufacturing Company',
    category: 'AI & Machine Learning Solutions',
    testimonial: 'AI-assisted design completely changed our process and boosted our creativity by 10x'
  }

  it('renders case study information correctly', () => {
    render(<CaseStudyCard caseStudy={mockCaseStudy} />)

    expect(screen.getByText('AI-Powered Transformation in Textile Design')).toBeInTheDocument()
    expect(screen.getByText('AI & Machine Learning Solutions')).toBeInTheDocument()
  })

  it('renders challenge, solution, and result sections', () => {
    render(<CaseStudyCard caseStudy={mockCaseStudy} />)

    expect(screen.getByText('Traditional design process took 12 weeks with low creativity and acceptance rates')).toBeInTheDocument()
    expect(screen.getByText('Implemented AI-assisted design system with creative style exploration')).toBeInTheDocument()
    expect(screen.getByText('Reduced design cycle from 12 weeks to 4-6 days, boosted creativity by 10x, increased acceptance rate to 90%')).toBeInTheDocument()
  })

  it('renders metrics when available', () => {
    render(<CaseStudyCard caseStudy={mockCaseStudy} />)

    expect(screen.getByText('Design Cycle Time')).toBeInTheDocument()
    expect(screen.getByText('4-6 days')).toBeInTheDocument()
    expect(screen.getByText('Reduced from 12 weeks to 4-6 days')).toBeInTheDocument()
  })

  it('renders testimonial when available', () => {
    render(<CaseStudyCard caseStudy={mockCaseStudy} />)

    expect(screen.getByText('"AI-assisted design completely changed our process and boosted our creativity by 10x"')).toBeInTheDocument()
    expect(screen.getByText('- Textile Manufacturing Company')).toBeInTheDocument()
  })
})
