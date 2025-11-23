/**
 * Rule-based fallback responses for common questions
 * Used when AI API is unavailable
 */

import { getCompanyServicesSummary, getContactInfo } from './knowledge-base'

interface FallbackResponse {
  pattern: RegExp
  response: string
  suggestedPage?: string
}

/**
 * Common question patterns and their responses
 */
const fallbackResponses: FallbackResponse[] = [
  {
    pattern: /what.*services|what.*do.*you.*offer|what.*can.*you.*do/i,
    response: `We offer a comprehensive range of software development services:

${getCompanyServicesSummary()}

You can learn more about our services on our Services page.`,
    suggestedPage: '/services',
  },
  {
    pattern: /how.*contact|contact.*you|reach.*you|get.*in.*touch/i,
    response: `You can contact us in several ways:

${getContactInfo()}

Feel free to visit our Contact page to send us a message or start a project.`,
    suggestedPage: '/contact-us',
  },
  {
    pattern: /case.*studies|portfolio|projects|examples/i,
    response: `We have completed numerous successful projects across various industries. Our case studies showcase measurable results including:

- AI Textile Design: Reduced design cycle from 12 weeks to 4-6 days
- E-commerce Modernization: 3x faster page loads, 50% increase in conversions
- Healthcare Portal: Serving 100,000+ users with 99.9% uptime

Visit our Case Studies page to see more examples of our work.`,
    suggestedPage: '/case-studies',
  },
  {
    pattern: /team|who.*are.*you|developers|engineers/i,
    response: `Our team consists of experienced professionals with 20+ years in the industry. We specialize in:

- AI & Machine Learning (MLOps, CUDA, Kubeflow)
- Full-stack development (React, Node.js, Python, Java)
- Cloud solutions and DevOps (Kubernetes, Docker, AWS)
- Enterprise software architecture

Learn more about our team members on our Team page.`,
    suggestedPage: '/our-team',
  },
  {
    pattern: /pricing|cost|price|how.*much/i,
    response: `Our pricing varies based on project scope, complexity, and requirements. We offer custom pricing tailored to each client's needs.

For a detailed quote, please contact us through our Contact page and describe your project requirements.`,
    suggestedPage: '/contact-us',
  },
  {
    pattern: /about|company|who.*are.*you/i,
    response: `BestIT Consultants is a premier software outsourcing company specializing in AI/ML solutions, enterprise software development, and digital transformation.

Headquartered in Vancouver, Canada, with strategic partnerships in Asia, we bridge global talent with your project needs. We deliver Fortune 500 quality software with startup speed.`,
  },
]

/**
 * Check if a question matches a fallback pattern
 */
export function getFallbackResponse(question: string): {
  response: string
  suggestedPage?: string
} | null {
  const lowerQuestion = question.toLowerCase().trim()

  for (const fallback of fallbackResponses) {
    if (fallback.pattern.test(lowerQuestion)) {
      return {
        response: fallback.response,
        suggestedPage: fallback.suggestedPage,
      }
    }
  }

  return null
}

/**
 * Get a generic fallback response when no pattern matches
 */
export function getGenericFallbackResponse(): string {
  return `I apologize, but I'm having trouble processing your request right now. 

Here are some ways I can help:
- Answer questions about our services
- Provide information about our case studies
- Help you contact our team
- Navigate you to relevant pages

You can also visit our Contact page to reach out directly, or try asking your question again.`
}

