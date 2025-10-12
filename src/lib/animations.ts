/**
 * Animation presets for consistent animations across the application
 * Uses Framer Motion for smooth, performant animations
 */

export const animationPresets = {
  // Basic entrance animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },

  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  slideDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  slideLeft: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },

  slideRight: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  },

  rotateIn: {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.6 },
  },

  // Stagger animations for multiple elements
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerChildrenSlow: {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  },

  // Hover animations
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },

  hoverSubtle: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },

  hoverLift: {
    y: -5,
    transition: { duration: 0.3 },
  },

  // Image-specific animations
  imageHover: {
    scale: 1.1,
    transition: { duration: 0.3 },
  },

  imageLoad: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  // Gallery animations
  galleryItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  galleryContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 },
  },

  // Loading animations
  loading: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },

  // Error animations
  error: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
} as const

/**
 * Get animation preset by name
 * @param name - The animation preset name
 * @returns The animation preset or default fadeIn
 */
export function getAnimationPreset(name: keyof typeof animationPresets) {
  return animationPresets[name] || animationPresets.fadeIn
}

/**
 * Create custom animation with duration and delay
 * @param type - The animation type
 * @param duration - Animation duration in seconds
 * @param delay - Animation delay in seconds
 * @returns Custom animation object
 */
export function createCustomAnimation(
  type: 'fade' | 'slide' | 'scale' | 'rotate',
  duration: number = 0.6,
  delay: number = 0
) {
  const baseAnimation = {
    fade: animationPresets.fadeIn,
    slide: animationPresets.slideUp,
    scale: animationPresets.scaleIn,
    rotate: animationPresets.rotateIn,
  }[type]

  return {
    ...baseAnimation,
    transition: {
      ...baseAnimation.transition,
      duration,
      delay,
    },
  }
}

/**
 * Animation variants for responsive design
 */
export const responsiveAnimations = {
  mobile: {
    duration: 0.4,
    stagger: 0.05,
  },
  tablet: {
    duration: 0.5,
    stagger: 0.08,
  },
  desktop: {
    duration: 0.6,
    stagger: 0.1,
  },
} as const

/**
 * Get responsive animation settings based on screen size
 * @param screenSize - The screen size category
 * @returns Responsive animation settings
 */
export function getResponsiveAnimation(
  screenSize: 'mobile' | 'tablet' | 'desktop'
) {
  return responsiveAnimations[screenSize]
}
