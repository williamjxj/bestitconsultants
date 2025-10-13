/**
 * Image mapping service for managing image assets across the website
 * Maps context-specific image paths to R2 bucket URLs
 */

// R2 bucket configuration - Always use R2 URLs
const R2_BASE_URL =
  process.env.R2_PUBLIC_URL ||
  'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev'

// Helper function to get image URL (always use R2 URLs)
function getImageUrl(imageName: string): string {
  return `${R2_BASE_URL}/${imageName}`
}

export const imageMapping = {
  // Homepage images - using R2 URLs directly
  hero: getImageUrl('istockphoto-1212876953-612x612.jpg'),
  about: getImageUrl('istockphoto-1358835459-612x612.webp'),
  services: getImageUrl('istockphoto-1350198816-612x612.jpg'),
  portfolio: getImageUrl('istockphoto-2163952011-612x612.webp'),

  // Team images - using R2 URLs directly
  teamCollaboration: getImageUrl('istockphoto-1145868161-612x612.webp'),
  technology: getImageUrl('istockphoto-2227310361-612x612.webp'),

  // Case studies images - using R2 URLs directly
  projectScreenshots: getImageUrl('istockphoto-492514758-612x612.webp'),
  innovation: getImageUrl('kling_20251012_1.png'),
  creativity: getImageUrl('kling_20251012_2.png'),

  // Team member photos (still using local images for now)
  teamMembers: {
    william: '/images/william-jiang.jpg',
    shamin: '/images/shaming-yang.jpeg',
    lewis: '/images/lewis-liu.jpg',
    james: '/images/james-cheung.jpeg',
    mingchun: '/images/mingchun-hu.jpg',
    wayne: '/images/wayne-li.jpg',
  },
} as const

/**
 * Get image path for a specific context
 * @param context - The context key for the image
 * @returns The image path or placeholder if not found
 */
export function getImageForContext(context: string): string {
  return (
    imageMapping[context as keyof typeof imageMapping] || '/placeholder.svg'
  )
}

/**
 * Get team member image path
 * @param memberName - The team member's name
 * @returns The team member's image path or placeholder if not found
 */
export function getTeamMemberImage(memberName: string): string {
  const normalizedName = memberName.toLowerCase().replace(/\s+/g, '')
  return (
    imageMapping.teamMembers[
      normalizedName as keyof typeof imageMapping.teamMembers
    ] || '/placeholder.svg'
  )
}

/**
 * Get all available image contexts
 * @returns Array of available context keys
 */
export function getAvailableContexts(): string[] {
  return Object.keys(imageMapping).filter(key => key !== 'teamMembers')
}

/**
 * Get all team member names
 * @returns Array of team member names
 */
export function getTeamMemberNames(): string[] {
  return Object.keys(imageMapping.teamMembers)
}
