# Hero Section Improvements

Here is a summary of the updates made to modernize the hero sections across the application:

## Shared Components

- **`HeroSection`**: Created a versatile, reusable component supporting various layouts (center,
  split, left), dynamic backgrounds, and content slots.
- **`BackgroundBeams`**: Implemented a "neural" particle background effect using `framer-motion`.
- **`Marquee`**: Added an infinite scrolling component for partner logos and trust signals.

## Page Updates

- **Homepage**: Implemented dark mode hero with background beams and trust marquee.
- **Services**: Updated to a centered layout with gradient background.
- **Contact Us**: Implemented split layout with visual elements.
- **Case Studies, Team, Portfolio, Testimonials**: Standardized all these pages to use the new
  `HeroSection` component with consistent branding and gradients.

## Code Cleanup

- Removed legacy `HeroVariants` and `FullWidthHeroWrapper` components.
- Standardized imports and resolved linting issues.
