# Hero Section Background Image Specifications

## Overview
All hero sections now use full-width-screen backgrounds that span the entire viewport width.

## Recommended Image Dimensions

### Primary Recommendation: 1920 x 1080 pixels (16:9 aspect ratio)
- **Width**: 1920px (Full HD standard)
- **Height**: 1080px
- **Aspect Ratio**: 16:9
- **Format**: JPG, PNG, or WebP
- **File Size**: Optimize to under 500KB for web performance

### For Higher Resolution Displays

#### 2K Displays (2560px wide)
- **Dimensions**: 2560 x 1440 pixels
- **Aspect Ratio**: 16:9
- **Use Case**: For displays larger than 1920px width

#### 4K Displays (3840px wide)
- **Dimensions**: 3840 x 2160 pixels
- **Aspect Ratio**: 16:9
- **Use Case**: For ultra-high resolution displays

## Image Coverage

Hero sections use `object-cover` CSS property, which means:
- Images will **cover** the entire hero area
- Images maintain their aspect ratio
- Images may be cropped at edges if aspect ratio doesn't match
- The center of the image is prioritized

## Safe Zone Guidelines

### Text Overlay Area (Safe Zone)
- **Center 60%** of the image width is the primary safe zone for text content
- Keep important visual elements within the **center 1200px** (1920px image) or proportional
- Avoid placing critical visual elements in the outer 20% on each side

### Visual Guidelines
```
┌─────────────────────────────────────────────────┐
│  AVOID (20%)    SAFE ZONE (60%)    AVOID (20%) │
│  ┌─────────────────────────────────────────┐   │
│  │                                         │   │
│  │      Text & Important Elements          │   │
│  │                                         │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Technical Details

### Viewport Heights
- Hero sections use `calc(100vh - navbarHeight)`
- Typical navbar height: ~88px
- Hero section height: ~992px on 1080px viewport
- Actual viewport varies by device

### Image Scaling
- Images are scaled using `object-cover` CSS
- Larger images will be scaled down
- Smaller images will be scaled up (may lose quality)
- Always use images at least 1920px wide for best quality

## Recommendations for Image Generation

### For Best Results:
1. **Create images at 1920 x 1080px** as the base size
2. **Export at 2x resolution (3840 x 2160)** if you want to support high-DPI displays
3. **Use WebP format** for better compression (keep JPG as fallback)
4. **Optimize file size** - aim for 200-500KB per image
5. **Test on multiple screen sizes** - mobile, tablet, desktop

### Content Guidelines:
- **Keep important elements centered** (center 60% of width)
- **Use high contrast** for text overlays
- **Avoid busy patterns** that compete with text
- **Consider dark overlays** - hero sections use gradient overlays (blue-600/80 to indigo-700/80)

## Current Hero Sections

All of these pages use full-width hero backgrounds:
- **Homepage** (`/`) - Hero Carousel with multiple images
- **Services** (`/services`) - ServicesHero component
- **Portfolio** (`/portfolio`) - PortfolioHero component
- **Case Studies** (`/case-studies`) - OurWorkHero component
- **Our Team** (`/our-team`) - TeamHero component
- **Contact** (`/contact-us`) - ContactHero component
- **Testimonials** (`/testimonials`) - AboutHero component

## Example Image Specifications

```
Hero Background Image Specs:
├── Dimensions: 1920 x 1080px (recommended)
├── Aspect Ratio: 16:9
├── Format: WebP (primary), JPG (fallback)
├── File Size: < 500KB
├── Color Space: sRGB
├── Safe Zone: Center 60% (1152px width)
└── Overlay: Gradient overlay applied via CSS
```

## Notes

- Images are set to `background-size: cover` which ensures full coverage
- The gradient overlay (`from-blue-600/80 to-indigo-700/80`) is applied over the background
- Text content is centered and contained within `max-w-4xl` for readability
- Mobile devices will see the same images scaled appropriately

