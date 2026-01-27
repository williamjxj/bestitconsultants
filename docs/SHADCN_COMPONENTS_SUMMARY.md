# shadcn/ui Components Summary

This document provides a summary of all shadcn/ui components currently used in the project and their
sources.

## Component Registry Configuration

The project is configured to use **shadcn/ui** with the following settings:

- **Style**: New York
- **Framework**: Next.js (RSC enabled)
- **TypeScript**: Enabled
- **Tailwind CSS**: Configured with CSS variables
- **Base Color**: Slate
- **Icon Library**: Radix Icons
- **Additional Registry**: Magic UI (`@magicui`)

**Configuration File**: `components.json`

## Currently Used Components

### Core shadcn/ui Components (from shadcn/ui registry)

These are standard shadcn/ui components installed via the shadcn CLI:

#### 1. **Button** (`src/components/ui/button.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `@radix-ui/react-slot`, `class-variance-authority`
- **Usage**: Used throughout the app for interactive buttons
- **Files Using**:
  - `src/app/contact-us/page.tsx`
  - `src/app/portfolio/page.tsx`
  - `src/app/services/page.tsx`
  - `src/components/chat-widget/chat-widget-panel.tsx`
  - `src/components/chat-widget/chat-widget-icon.tsx`
  - `src/components/contact/ContactForm.tsx`
  - `src/components/ui/hero-section.tsx`

#### 2. **Card** (`src/components/ui/card.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: None (pure React component)
- **Usage**: Container components for grouping content
- **Files Using**:
  - `src/app/contact-us/page.tsx`
  - `src/app/portfolio/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/testimonials/page.tsx`
  - `src/components/contact/AnimatedFAQ.tsx`
  - `src/components/chat-widget/chat-widget-panel.tsx`
  - `src/components/ui/bookmark-list.tsx`

#### 3. **Badge** (`src/components/ui/badge.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `class-variance-authority`
- **Usage**: Status indicators and labels
- **Files Using**:
  - `src/app/portfolio/page.tsx`
  - `src/app/services/page.tsx`
  - `src/components/ui/hero-section.tsx`
  - `src/components/ui/bookmark-list.tsx`

#### 4. **Input** (`src/components/ui/input.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: Standard HTML input
- **Usage**: Form input fields
- **Files Using**:
  - `src/components/chat-widget/chat-widget-panel.tsx`
  - `src/components/contact/ContactForm.tsx`

#### 5. **Textarea** (`src/components/ui/textarea.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: Standard HTML textarea
- **Usage**: Multi-line text input
- **Files Using**:
  - `src/components/contact/ContactForm.tsx`

#### 6. **Select** (`src/components/ui/select.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `@radix-ui/react-select`
- **Usage**: Dropdown selection
- **Files Using**:
  - `src/components/contact/ContactForm.tsx`

#### 7. **Label** (`src/components/ui/label.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `@radix-ui/react-label`
- **Usage**: Form labels
- **Files Using**:
  - `src/components/ui/form.tsx`

#### 8. **Form** (`src/components/ui/form.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `react-hook-form`, `@hookform/resolvers`, `zod`
- **Usage**: Form management
- **Files Using**:
  - `src/components/contact/ContactForm.tsx`

#### 9. **Tabs** (`src/components/ui/tabs.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `@radix-ui/react-tabs`
- **Usage**: Tabbed navigation
- **Files Using**:
  - `src/app/portfolio/page.tsx`

#### 10. **Avatar** (`src/components/ui/avatar.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `@radix-ui/react-avatar`
- **Usage**: User profile images
- **Files Using**:
  - `src/components/ui/marquee-3d.tsx`

#### 11. **Checkbox** (`src/components/ui/checkbox.tsx`)

- **Source**: shadcn/ui registry
- **Dependencies**: `@radix-ui/react-checkbox`
- **Usage**: Checkbox inputs (available but may not be actively used)

### Custom/Extended Components

These components are either custom-built or extended from base components:

#### 12. **BorderBeam** (`src/components/ui/border-beam.tsx`)

- **Source**: Likely from Magic UI or custom implementation
- **Dependencies**: `motion/react` (framer-motion)
- **Usage**: Animated border effects
- **Files Using**:
  - `src/components/team/EnhancedTeamProfile.tsx`

#### 13. **Marquee** (`src/components/ui/marquee.tsx`)

- **Source**: Custom implementation or Magic UI
- **Dependencies**: None (pure React)
- **Usage**: Scrolling text/content
- **Files Using**:
  - `src/components/ui/marquee-3d.tsx`

#### 14. **Marquee3D** (`src/components/ui/marquee-3d.tsx`)

- **Source**: Custom component using Marquee
- **Dependencies**: `@/components/ui/marquee`, `@/components/ui/avatar`
- **Usage**: 3D scrolling testimonials
- **Files Using**:
  - `src/app/testimonials/page.tsx`

#### 15. **ShineBorder** (`src/components/ui/shine-border.tsx`)

- **Source**: Likely from Magic UI or custom
- **Dependencies**: None (pure React)
- **Usage**: Animated border with shine effect
- **Files Using**:
  - `src/app/contact-us/page.tsx`

#### 16. **Hero Components** (Multiple variants)

- **Source**: Custom implementations
- **Files**:
  - `src/components/ui/hero-carousel.tsx`
  - `src/components/ui/hero-section.tsx`
  - `src/components/ui/hero-variants.tsx`
  - `src/components/ui/full-width-hero-wrapper.tsx`
- **Usage**: Hero sections across pages
- **Files Using**: Multiple page components

#### 17. **Image Components**

- **Source**: Custom implementations
- **Files**:
  - `src/components/ui/image-carousel.tsx`
  - `src/components/ui/optimized-image.tsx`
  - `src/components/ui/picture-image.tsx`
- **Usage**: Image display and optimization

#### 18. **Other Custom Components**

- `animated-title.tsx` - Animated text component
- `bookmark-list.tsx` - Bookmark/card list component
- `globe.tsx` - 3D globe component (using COBE)
- `simple-accordion.tsx` - Accordion component
- `video-background.tsx` - Video background component
- `video-with-poster.tsx` - Video with poster image

## Component Installation Method

Components are installed using the shadcn CLI:

```bash
npx shadcn@latest add [component-name]
```

Components are copied directly into the project (not installed as npm packages), giving you full
control to customize them.

## Dependencies

Key dependencies for shadcn/ui components:

- `@radix-ui/*` - Headless UI primitives
- `class-variance-authority` - Component variant management
- `clsx` - Conditional class names
- `tailwind-merge` - Tailwind class merging
- `lucide-react` - Icon library
- `framer-motion` / `motion` - Animation library (for animated components)

## Component Locations

All UI components are located in:

```
src/components/ui/
```

## Usage Pattern

Components are imported using the `@/components/ui` alias:

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
```

## Summary Statistics

- **Total shadcn/ui Components**: 11 core components
- **Custom Components**: ~15+ custom/extended components
- **Total UI Components**: ~30 components in `src/components/ui/`
- **Most Used Component**: Button (used in 7+ files)
- **Second Most Used**: Card (used in 6+ files)

## Notes

- All components follow the shadcn/ui pattern of being copied into the project
- Components are fully customizable since they're part of the codebase
- The project uses the "New York" style variant
- Additional components from Magic UI registry are available via `components.json` configuration
