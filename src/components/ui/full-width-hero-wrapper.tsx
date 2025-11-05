/**
 * Full-width hero wrapper component
 * Breaks hero sections out of container constraints to span full viewport width
 */
'use client'

import { ReactNode } from 'react'

interface FullWidthHeroWrapperProps {
  children: ReactNode
  className?: string
}

export function FullWidthHeroWrapper({
  children,
  className = '',
}: FullWidthHeroWrapperProps) {
  return (
    <div
      className={`relative -mx-4 -mt-8 -mb-8 w-screen ${className}`}
      style={{
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
      }}
    >
      {children}
    </div>
  )
}

