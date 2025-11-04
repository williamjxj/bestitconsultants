import { getR2ImageUrl } from '@/lib/utils'
import { CaseStudy } from '@/types/case-study'

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'ai-textile-design',
    title: 'AI-Powered Transformation in Textile Design',
    challenge:
      'Traditional design process took 12 weeks with low creativity and acceptance rates',
    solution:
      'Implemented AI-assisted design system with creative style exploration',
    result:
      'Reduced design cycle from 12 weeks to 4-6 days, boosted creativity by 10x, increased acceptance rate to 90%',
    metrics: [
      {
        id: 'design-cycle-reduction',
        name: 'Design Cycle Time',
        value: '4-6 days',
        unit: 'days',
        improvement: 'Reduced from 12 weeks to 4-6 days',
        type: 'efficiency',
      },
      {
        id: 'creativity-boost',
        name: 'Creativity Enhancement',
        value: '10x',
        unit: 'improvement',
        improvement: 'Boosted creativity by 10x',
        type: 'quality',
      },
      {
        id: 'acceptance-rate',
        name: 'Acceptance Rate',
        value: '90%',
        unit: 'percentage',
        improvement: 'Increased acceptance rate to 90%',
        type: 'performance',
      },
    ],
    technologies: ['AI/ML', 'Python', 'TensorFlow', 'Computer Vision'],
    client: 'Textile Manufacturing Company',
    duration: '6 months',
    teamSize: 4,
    image: getR2ImageUrl('imgs/case-studies/ai-textile-design.jpg'),
    testimonial:
      'AI-assisted design completely changed our process and boosted our creativity by 10x',
    category: 'AI & Machine Learning Solutions',
  },
  {
    id: 'ecommerce-modernization',
    title: 'E-commerce Platform Modernization',
    challenge:
      'Legacy platform causing performance issues and poor user experience',
    solution:
      'Complete platform overhaul using Next.js and Node.js with modern architecture',
    result:
      'Achieved 60% performance improvement and 40% increase in user engagement',
    metrics: [
      {
        id: 'performance-improvement',
        name: 'Performance Improvement',
        value: '60%',
        unit: 'percentage',
        improvement: 'Achieved 60% performance improvement',
        type: 'performance',
      },
      {
        id: 'user-engagement',
        name: 'User Engagement',
        value: '40%',
        unit: 'percentage',
        improvement: '40% increase in user engagement',
        type: 'performance',
      },
    ],
    technologies: ['Next.js', 'Node.js', 'React', 'MongoDB', 'AWS'],
    client: 'E-commerce Retailer',
    duration: '8 months',
    teamSize: 6,
    image: getR2ImageUrl('imgs/case-studies/ecommerce-modernization.jpg'),
    testimonial:
      'The new platform transformed our business with incredible performance gains',
    category: 'Web Development & Modernization',
  },
  {
    id: 'ai-logistics-optimization',
    title: 'AI Logistics Optimization',
    challenge: 'High operational fuel costs and inefficient route planning',
    solution:
      'AI/ML route optimizer using Python and TensorFlow for real-time optimization',
    result:
      '15% reduction in fuel costs with rapid ROI and improved delivery times',
    metrics: [
      {
        id: 'fuel-cost-reduction',
        name: 'Fuel Cost Reduction',
        value: '15%',
        unit: 'percentage',
        improvement: '15% reduction in fuel costs',
        type: 'cost',
      },
      {
        id: 'delivery-time',
        name: 'Delivery Time Improvement',
        value: '25%',
        unit: 'percentage',
        improvement: '25% faster delivery times',
        type: 'efficiency',
      },
    ],
    technologies: ['Python', 'TensorFlow', 'Machine Learning', 'APIs', 'Cloud'],
    client: 'Logistics Company',
    duration: '4 months',
    teamSize: 3,
    image: getR2ImageUrl('imgs/case-studies/ai-logistics.jpg'),
    testimonial:
      'AI optimization saved us millions in fuel costs and improved our delivery efficiency',
    category: 'AI & Machine Learning Solutions',
  },
]
