/**
 * Image mapping service for managing image assets across the website
 * Maps context-specific image paths to actual image files
 */

export const imageMapping = {
  // Homepage images
  hero: '/imgs/istockphoto-1212876953-612x612.jpg',
  about: '/imgs/istockphoto-1358835459-612x612.webp',
  services: '/imgs/istockphoto-1350198816-612x612.jpg',
  portfolio: '/imgs/istockphoto-2163952011-612x612.webp',

  // Team images
  teamCollaboration: '/imgs/istockphoto-1145868161-612x612.webp',
  technology: '/imgs/istockphoto-2227310361-612x612.webp',

  // Case studies images
  projectScreenshots: '/imgs/istockphoto-492514758-612x612.webp',
  innovation: '/imgs/kling_20251012_1.png',
  creativity: '/imgs/kling_20251012_2.png',

  // Team member photos
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
