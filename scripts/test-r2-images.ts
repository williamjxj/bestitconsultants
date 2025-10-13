#!/usr/bin/env tsx

/**
 * Script to test R2 image loading
 * This script will test that all images are accessible from R2
 */

import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// R2 Configuration
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!
const PUBLIC_URL = process.env.R2_PUBLIC_URL!

// Test images that should be in R2 bucket
const TEST_IMAGES = [
  'istockphoto-1212876953-612x612.jpg',
  'istockphoto-1358835459-612x612.webp',
  'istockphoto-1350198816-612x612.jpg',
  'istockphoto-2163952011-612x612.webp',
  'istockphoto-1145868161-612x612.webp',
  'istockphoto-2227310361-612x612.webp',
  'istockphoto-492514758-612x612.webp',
  'kling_20251012_1.png',
  'kling_20251012_2.png',
]

// Test if an image exists in R2
async function testImageExists(imageName: string): Promise<boolean> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: imageName, // Direct path in R2 bucket
    })

    const response = await s3Client.send(command)
    return response.$metadata.httpStatusCode === 200
  } catch (error) {
    return false
  }
}

// Test public URL accessibility
async function testPublicUrl(imageName: string): Promise<boolean> {
  try {
    const url = `${PUBLIC_URL}/${imageName}`
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    return false
  }
}

// List all objects in R2 bucket
async function listR2Objects(): Promise<string[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 1000,
    })

    const response = await s3Client.send(command)
    return response.Contents?.map(obj => obj.Key || '') || []
  } catch (error) {
    console.error('❌ Failed to list R2 objects:', error)
    return []
  }
}

// Main test function
async function testR2Images(): Promise<void> {
  console.log('🧪 Testing R2 image loading...')
  console.log(`📦 Bucket: ${BUCKET_NAME}`)
  console.log(`🌐 Public URL: ${PUBLIC_URL}`)

  // List all objects in R2
  console.log('\n📋 Listing all objects in R2 bucket...')
  const allObjects = await listR2Objects()
  console.log(`Found ${allObjects.length} objects in R2 bucket`)

  // Filter for image objects (direct in bucket root)
  const imgObjects = allObjects.filter(key =>
    key.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)
  )
  console.log(`Found ${imgObjects.length} image objects`)

  if (imgObjects.length > 0) {
    console.log('\n📸 Images in R2 bucket:')
    imgObjects.forEach(key => {
      console.log(`   ${key}`)
    })
  }

  console.log('\n🔍 Testing specific images...')

  let r2SuccessCount = 0
  let publicUrlSuccessCount = 0

  for (const imageName of TEST_IMAGES) {
    console.log(`\n🖼️  Testing ${imageName}:`)

    // Test R2 API access
    const r2Exists = await testImageExists(imageName)
    if (r2Exists) {
      console.log(`   ✅ R2 API: Accessible`)
      r2SuccessCount++
    } else {
      console.log(`   ❌ R2 API: Not accessible`)
    }

    // Test public URL access
    const publicUrlAccessible = await testPublicUrl(imageName)
    if (publicUrlAccessible) {
      console.log(`   ✅ Public URL: Accessible`)
      publicUrlSuccessCount++
    } else {
      console.log(`   ❌ Public URL: Not accessible`)
    }

    // Show public URL
    console.log(`   🔗 URL: ${PUBLIC_URL}/${imageName}`)
  }

  console.log('\n📊 Test Summary:')
  console.log(
    `✅ R2 API accessible: ${r2SuccessCount}/${TEST_IMAGES.length} images`
  )
  console.log(
    `✅ Public URLs accessible: ${publicUrlSuccessCount}/${TEST_IMAGES.length} images`
  )

  if (
    r2SuccessCount === TEST_IMAGES.length &&
    publicUrlSuccessCount === TEST_IMAGES.length
  ) {
    console.log('\n🎉 All tests passed! R2 images are working correctly.')
  } else {
    console.log('\n⚠️  Some tests failed. Check the results above.')
  }

  console.log('\n🔗 Your images are available at:')
  TEST_IMAGES.forEach(imageName => {
    console.log(`   ${PUBLIC_URL}/${imageName}`)
  })
}

// Run the test
if (require.main === module) {
  testR2Images()
    .then(() => {
      console.log('\n🎉 R2 image testing completed!')
      process.exit(0)
    })
    .catch(error => {
      console.error('\n💥 Testing failed:', error)
      process.exit(1)
    })
}

export { testR2Images }
