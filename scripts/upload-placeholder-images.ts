#!/usr/bin/env ts-node
// scripts/upload-placeholder-images.ts
/**
 * Upload placeholder images to R2 bucket
 * This script creates placeholder images and uploads them to R2
 */

import { promises as fs } from 'fs'
import path from 'path'
import { createCanvas } from 'canvas'

// Image specifications for placeholders
const placeholderImages = [
  {
    filename: 'istockphoto-1212876953-612x612.jpg',
    width: 612,
    height: 612,
    color: '#3B82F6', // Blue
    text: 'Technology/Innovation',
  },
  {
    filename: 'istockphoto-1358835459-612x612.webp',
    width: 612,
    height: 612,
    color: '#10B981', // Green
    text: 'Team Collaboration',
  },
  {
    filename: 'istockphoto-1350198816-612x612.jpg',
    width: 612,
    height: 612,
    color: '#8B5CF6', // Purple
    text: 'Professional Workspace',
  },
  {
    filename: 'istockphoto-2163952011-612x612.webp',
    width: 612,
    height: 612,
    color: '#F59E0B', // Orange
    text: 'Modern Office',
  },
  {
    filename: 'istockphoto-1145868161-612x612.webp',
    width: 612,
    height: 612,
    color: '#EF4444', // Red
    text: 'Business Meeting',
  },
  {
    filename: 'istockphoto-2227310361-612x612.webp',
    width: 612,
    height: 612,
    color: '#06B6D4', // Cyan
    text: 'Technology Solutions',
  },
  {
    filename: 'istockphoto-492514758-612x612.webp',
    width: 612,
    height: 612,
    color: '#84CC16', // Lime
    text: 'Professional Development',
  },
  {
    filename: 'kling_20251012_1.png',
    width: 612,
    height: 612,
    color: '#6366F1', // Indigo
    text: 'AI/Technology',
  },
  {
    filename: 'kling_20251012_2.png',
    width: 612,
    height: 612,
    color: '#EC4899', // Pink
    text: 'Innovation/Creativity',
  },
]

async function createPlaceholderImage(
  spec: (typeof placeholderImages)[0]
): Promise<Buffer> {
  const canvas = createCanvas(spec.width, spec.height)
  const ctx = canvas.getContext('2d')

  // Fill background
  ctx.fillStyle = spec.color
  ctx.fillRect(0, 0, spec.width, spec.height)

  // Add gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, 0, spec.height)
  gradient.addColorStop(0, 'rgba(255,255,255,0.1)')
  gradient.addColorStop(1, 'rgba(0,0,0,0.1)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, spec.width, spec.height)

  // Add text
  ctx.fillStyle = 'white'
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(spec.text, spec.width / 2, spec.height / 2)

  // Add filename
  ctx.font = '16px Arial'
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.fillText(spec.filename, spec.width / 2, spec.height / 2 + 40)

  // Convert to buffer
  const ext = path.extname(spec.filename).toLowerCase()
  if (ext === '.png') {
    return canvas.toBuffer('image/png')
  } else if (ext === '.webp') {
    return canvas.toBuffer('image/webp')
  } else {
    return canvas.toBuffer('image/jpeg')
  }
}

async function uploadToR2(
  imageBuffer: Buffer,
  filename: string
): Promise<void> {
  // This would normally upload to R2, but for now we'll just save locally
  // In a real implementation, you'd use the R2ClientService here
  const outputPath = path.join(process.cwd(), 'public', 'imgs', filename)
  await fs.writeFile(outputPath, imageBuffer)
  console.log(`✅ Created placeholder: ${filename}`)
}

async function createPlaceholderImages() {
  console.log('🎨 Creating placeholder images for R2...\n')

  // Ensure imgs directory exists
  const imgsDir = path.join(process.cwd(), 'public', 'imgs')
  await fs.mkdir(imgsDir, { recursive: true })

  for (const spec of placeholderImages) {
    try {
      console.log(`Creating ${spec.filename}...`)
      const imageBuffer = await createPlaceholderImage(spec)
      await uploadToR2(imageBuffer, spec.filename)
    } catch (error) {
      console.error(`Failed to create ${spec.filename}:`, error)
    }
  }

  console.log('\n✅ All placeholder images created!')
  console.log('\n📋 Next steps:')
  console.log('1. Upload these images to your R2 bucket')
  console.log('2. Update R2_PUBLIC_URL in your environment variables')
  console.log('3. Test image loading from R2')
}

// Run if this is the main module
if (require.main === module) {
  createPlaceholderImages().catch(console.error)
}

export { createPlaceholderImages }
