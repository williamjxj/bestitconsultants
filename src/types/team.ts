export interface TeamMember {
  id: string
  name: string
  title: string
  location: string
  experience: number
  avatar: string
  bio: string
  expertise: string[]
  achievements: string[]
  specializations: string[]
  certifications?: string[]
  education?: string
  languages?: string[]
  availability?: string
  prestigeProjects: PrestigeProject[]
}

export interface PrestigeProject {
  id: string
  name: string
  type: 'company' | 'project' | 'award'
  description: string
  outcome: string
  technologies: string[]
  year: number
  logo?: string
  website?: string
}

export interface TeamMemberResponse {
  success: boolean
  data?: TeamMember | TeamMember[]
  message?: string
  code?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}

export interface PrestigeProjectResponse {
  success: boolean
  data?: PrestigeProject | PrestigeProject[]
  message?: string
  code?: string
}

export interface TeamMemberError {
  success: false
  message: string
  code: string
  details?: Record<string, unknown>
}
