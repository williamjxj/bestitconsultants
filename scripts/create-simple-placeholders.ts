#!/usr/bin/env ts-node
// scripts/create-simple-placeholders.ts
/**
 * Create simple placeholder images using SVG
 */

import { promises as fs } from 'fs'
import path from 'path'

const placeholderImages = [
  {
    filename: 'istockphoto-1212876953-612x612.jpg',
    title: 'Technology/Innovation',
    color: '#3B82F6',
  },
  {
    filename: 'istockphoto-1358835459-612x612.webp',
    title: 'Team Collaboration',
    color: '#10B981',
  },
  {
    filename: 'istockphoto-1350198816-612x612.jpg',
    title: 'Professional Workspace',
    color: '#8B5CF6',
  },
  {
    filename: 'istockphoto-2163952011-612x612.webp',
    title: 'Modern Office',
    color: '#F59E0B',
  },
  {
    filename: 'istockphoto-1145868161-612x612.webp',
    title: 'Business Meeting',
    color: '#EF4444',
  },
  {
    filename: 'istockphoto-2227310361-612x612.webp',
    title: 'Technology Solutions',
    color: '#06B6D4',
  },
  {
    filename: 'istockphoto-492514758-612x612.webp',
    title: 'Professional Development',
    color: '#84CC16',
  },
  {
    filename: 'kling_20251012_1.png',
    title: 'AI/Technology',
    color: '#6366F1',
  },
  {
    filename: 'kling_20251012_2.png',
    title: 'Innovation/Creativity',
    color: '#EC4899',
  },
]

function createSVGPlaceholder(spec: (typeof placeholderImages)[0]): string {
  return `
<svg width="612" height="612" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${spec.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${spec.color}CC;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="612" height="612" fill="url(#grad)"/>
  <text x="306" y="280" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">${spec.title}</text>
  <text x="306" y="320" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.8)">${spec.filename}</text>
  <text x="306" y="360" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.6)">BestIT Consultants</text>
</svg>`.trim()
}

async function createPlaceholderImages() {
  console.log('🎨 Creating placeholder images...\n')

  // Ensure imgs directory exists
  const imgsDir = path.join(process.cwd(), 'public', 'imgs')
  await fs.mkdir(imgsDir, { recursive: true })

  for (const spec of placeholderImages) {
    try {
      console.log(`Creating ${spec.filename}...`)
      const svgContent = createSVGPlaceholder(spec)

      // Save as SVG (will work for web display)
      const svgPath = path.join(
        imgsDir,
        spec.filename.replace(/\.(jpg|jpeg|png|webp)$/, '.svg')
      )
      await fs.writeFile(svgPath, svgContent)

      console.log(`✅ Created: ${spec.filename}`)
    } catch (error) {
      console.error(`Failed to create ${spec.filename}:`, error)
    }
  }

  console.log('\n✅ All placeholder images created!')
  console.log('\n📋 Next steps:')
  console.log('1. These are SVG placeholders - replace with actual images')
  console.log('2. Upload real images to your R2 bucket')
  console.log('3. Update R2_PUBLIC_URL in your environment variables')
  console.log('4. Test image loading from R2')
}

// Run the script
createPlaceholderImages().catch(console.error)

export { createPlaceholderImages }
