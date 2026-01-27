# Hero Carousel Videos

This directory contains video files for the hero carousel component.

## Supported Formats

- MP4 (recommended)
- WebM
- OGG

## Video Specifications

- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **Duration**: 10-30 seconds (recommended)
- **File Size**: Keep under 10MB for optimal loading
- **Codec**: H.264 for MP4

## Adding Videos to Carousel

1. Place your video file in this directory
2. Update the carousel data in `src/data/hero-carousel-data.ts`
3. Uncomment and update the `video` property for the desired carousel item

Example:

```typescript
{
  id: 'ai-ml-expertise',
  title: 'AI & Machine Learning Excellence',
  subtitle: 'Cutting-Edge Technology',
  description: 'Transform your business with advanced AI/ML solutions...',
  image: 'https://pub-280494fad9014906948b6a6a70b3466f.r2.dev/kling_20251012_1.png',
  video: '/videos/ai-technology-demo.mp4', // Add your video here
  ctaText: 'Explore AI Solutions',
  ctaLink: '/services',
}
```

## Video Optimization Tips

1. **Compress videos** using tools like HandBrake or FFmpeg
2. **Use multiple formats** for better browser compatibility
3. **Consider using a CDN** for large video files
4. **Add fallback images** for slower connections

## Example Video Sources

- **Technology demos**: Screen recordings of software in action
- **Team introductions**: Short clips of team members
- **Project showcases**: Time-lapse of development processes
- **Client testimonials**: Video testimonials from satisfied clients

## Hero Section background images

Recommended opacity solution

### Homepage hero carousel

- Primary gradient overlay: 55% opacity (from-blue-900/55)
- Secondary overlay: 40% at bottom, 15% at top (gradient)
- Radial vignette: 12% for subtle focus

### Other hero sections (Services, Portfolio, Case Studies, Team, Testimonials, Contact)

- Base overlayOpacity: 50% (0.5)
- Effective opacity: ~60% (50% × 1.2, capped at 65%)
- Secondary overlay: 35% at bottom, 12% at top
- Radial vignette: 10% for subtle focus

### Why this works better

- 50–55% primary overlay: balances background visibility and text readability
- Layered approach: multiple overlays create depth without being too dark
- Gradient from bottom to top: darker at bottom improves text contrast; lighter at top preserves
  background
- Subtle vignette: adds focus without being heavy

### Result

- Background images remain visible
- Text is readable with good contrast
- Professional, balanced appearance
- Consistent across all pages

The **50–55%** range is a common choice for hero sections. If you want to adjust, try **48–52%**for
lighter or **55–58%** for more contrast.
