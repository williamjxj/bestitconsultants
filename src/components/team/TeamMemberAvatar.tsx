import React from 'react'
import { OptimizedImage } from '@/components/ui/optimized-image'

interface TeamMemberAvatarProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export const TeamMemberAvatar: React.FC<TeamMemberAvatarProps> = ({
  src,
  alt,
  width = 64,
  height = 64,
  className = 'rounded-full object-cover',
  priority = false,
}) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      animation={{
        type: 'scale',
        duration: 0.6,
      }}
      hover={{
        scale: 1.1,
        duration: 0.3,
      }}
    />
  )
}
