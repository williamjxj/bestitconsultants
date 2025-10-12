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
  image: '/imgs/kling_20251012_1.png',
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
