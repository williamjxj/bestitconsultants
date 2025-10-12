export function validateTeamMember(data: any): boolean {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.title === 'string' &&
    typeof data.location === 'string' &&
    typeof data.experience === 'number' &&
    typeof data.avatar === 'string' &&
    typeof data.bio === 'string' &&
    Array.isArray(data.expertise) &&
    Array.isArray(data.achievements) &&
    Array.isArray(data.specializations) &&
    Array.isArray(data.prestigeProjects)
  )
}

export function validateCaseStudy(data: any): boolean {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    typeof data.challenge === 'string' &&
    typeof data.solution === 'string' &&
    typeof data.result === 'string' &&
    Array.isArray(data.metrics) &&
    Array.isArray(data.technologies) &&
    typeof data.client === 'string' &&
    typeof data.category === 'string'
  )
}

export function validateServiceCategory(data: any): boolean {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.seoTagline === 'string' &&
    typeof data.description === 'string' &&
    Array.isArray(data.benefits) &&
    Array.isArray(data.technologies) &&
    Array.isArray(data.useCases) &&
    typeof data.order === 'number' &&
    typeof data.isActive === 'boolean'
  )
}

export function validateContentSection(data: any): boolean {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.type === 'string' &&
    typeof data.title === 'string' &&
    typeof data.content === 'string' &&
    typeof data.order === 'number' &&
    typeof data.isActive === 'boolean'
  )
}

export function validateSEOMetadata(data: any): boolean {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.page === 'string' &&
    typeof data.title === 'string' &&
    typeof data.description === 'string' &&
    Array.isArray(data.keywords)
  )
}
