import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { ServiceCategoryCard } from '../../src/components/services/ServiceCategoryCard'

describe('ServiceCategoryCard Component', () => {
  const mockService = {
    id: 'ai-ml-solutions',
    name: 'AI & Machine Learning Solutions',
    seoTagline: 'Harness AI to automate workflows, unlock insights, and innovate faster.',
    description: 'Custom AI/LLM applications, MLOps, ChatBI, and enterprise AI solutions',
    benefits: ['Automated workflows', 'Data-driven insights', 'Faster innovation'],
    technologies: ['LangChain', 'Hugging Face', 'RAG', 'TensorFlow'],
    useCases: ['ChatBI', 'Document processing', 'Predictive analytics'],
    order: 1,
    isActive: true
  }

  it('renders service information correctly', () => {
    render(<ServiceCategoryCard service={mockService} />)

    expect(screen.getByText('AI & Machine Learning Solutions')).toBeInTheDocument()
    expect(screen.getByText('Harness AI to automate workflows, unlock insights, and innovate faster.')).toBeInTheDocument()
    expect(screen.getByText('Custom AI/LLM applications, MLOps, ChatBI, and enterprise AI solutions')).toBeInTheDocument()
  })

  it('renders benefits list', () => {
    render(<ServiceCategoryCard service={mockService} />)

    expect(screen.getByText('Automated workflows')).toBeInTheDocument()
    expect(screen.getByText('Data-driven insights')).toBeInTheDocument()
    expect(screen.getByText('Faster innovation')).toBeInTheDocument()
  })

  it('renders technology tags', () => {
    render(<ServiceCategoryCard service={mockService} />)

    expect(screen.getByText('LangChain')).toBeInTheDocument()
    expect(screen.getByText('Hugging Face')).toBeInTheDocument()
    expect(screen.getByText('RAG')).toBeInTheDocument()
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
  })

  it('renders use cases list', () => {
    render(<ServiceCategoryCard service={mockService} />)

    expect(screen.getByText('ChatBI')).toBeInTheDocument()
    expect(screen.getByText('Document processing')).toBeInTheDocument()
    expect(screen.getByText('Predictive analytics')).toBeInTheDocument()
  })
})
