/**
 * Knowledge base utility for chatbot
 * Extracts company information from data files for AI context
 */

import { caseStudiesData } from '@/data/caseStudies'
import { serviceCategoriesData } from '@/data/serviceCategories'
import { teamMembersData } from '@/data/teamMembers'

/**
 * Get company services summary for AI context
 */
export function getCompanyServicesSummary(): string {
  const services = serviceCategoriesData
    .filter((cat) => cat.isActive)
    .map((cat) => `- ${cat.name}: ${cat.description}`)
    .join('\n')

  return `Company Services:
${services}`
}

/**
 * Get case studies summary for AI context
 */
export function getCaseStudiesSummary(): string {
  const studies = caseStudiesData
    .slice(0, 5) // Limit to top 5 for context
    .map(
      (study) =>
        `- ${study.title}: ${study.result} (${study.metrics.length} key metrics)`
    )
    .join('\n')

  return `Recent Case Studies:
${studies}`
}

/**
 * Get team summary for AI context
 */
export function getTeamSummary(): string {
  const team = teamMembersData
    .slice(0, 5) // Limit to top 5 for context
    .map(
      (member) =>
        `- ${member.name}: ${member.title} - ${member.bio.substring(0, 100)}...`
    )
    .join('\n')

  return `Key Team Members:
${team}`
}

/**
 * Get contact information for AI context
 */
export function getContactInfo(): string {
  return `Contact Information:
- Website: https://www.bestitconsultants.ca
- Contact Page: /contact-us
- Services Page: /services
- Case Studies Page: /case-studies
- Team Page: /our-team`
}

/**
 * Get complete company knowledge base context for AI
 */
export function getCompanyKnowledgeBase(): string {
  return `${getCompanyServicesSummary()}

${getCaseStudiesSummary()}

${getTeamSummary()}

${getContactInfo()}

The company specializes in AI/ML solutions, enterprise software development, cloud solutions, and digital transformation. We help businesses integrate AI and modern software architectures.`
}

/**
 * Detect if a question is about navigation
 */
export function isNavigationQuestion(question: string): boolean {
  const lowerQuestion = question.toLowerCase()
  const navigationKeywords = [
    'show me',
    'where is',
    'where are',
    'navigate to',
    'go to',
    'take me to',
    'visit',
    'see',
    'view',
    'portfolio',
    'case studies',
    'services',
    'team',
    'contact',
  ]

  return navigationKeywords.some((keyword) => lowerQuestion.includes(keyword))
}

/**
 * Extract suggested page from question
 */
export function extractSuggestedPage(question: string): string | null {
  const lowerQuestion = question.toLowerCase()

  if (
    lowerQuestion.includes('case study') ||
    lowerQuestion.includes('portfolio') ||
    lowerQuestion.includes('project')
  ) {
    return '/case-studies'
  }

  if (
    lowerQuestion.includes('service') ||
    lowerQuestion.includes('what do you offer') ||
    lowerQuestion.includes('what can you do')
  ) {
    return '/services'
  }

  if (
    lowerQuestion.includes('team') ||
    lowerQuestion.includes('who') ||
    lowerQuestion.includes('developer') ||
    lowerQuestion.includes('engineer')
  ) {
    return '/our-team'
  }

  if (
    lowerQuestion.includes('contact') ||
    lowerQuestion.includes('reach') ||
    lowerQuestion.includes('get in touch') ||
    lowerQuestion.includes('start a project') ||
    lowerQuestion.includes('hire')
  ) {
    return '/contact-us'
  }

  return null
}

