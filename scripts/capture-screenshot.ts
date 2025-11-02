#!/usr/bin/env tsx
// scripts/capture-screenshot.ts
import fs from 'fs/promises'
import path from 'path'

import dotenv from 'dotenv'

// Load environment variables from .env.local
// Use override: true to ensure .env.local values take precedence
const envLocalPath = path.join(process.cwd(), '.env.local')
const result = dotenv.config({ path: envLocalPath, override: true })

// Warn if .env.local couldn't be loaded
if (result.error) {
  const errorCode = result.error.code || ''
  if (errorCode.includes('ENOENT') || errorCode.includes('NOT_FOUND')) {
    console.warn('⚠️  Warning: .env.local file not found')
  } else {
    console.warn('⚠️  Warning: Error loading .env.local:', result.error.message)
  }
}

interface ScreenshotOptions {
  url: string
  format?: 'png' | 'jpeg' | 'jpg' | 'webp'
  fullPage?: boolean
  viewportWidth?: number
  viewportHeight?: number
  wait?: number // Wait time in seconds before capturing
  outputPath?: string
}

/**
 * Captures a screenshot of a webpage using ScreenshotAPI service
 */
async function captureScreenshot(
  apiKey: string,
  options: ScreenshotOptions
): Promise<Buffer> {
  const {
    url,
    format = 'png',
    fullPage = true,
    viewportWidth = 1280,
    viewportHeight = 1024,
    wait = 0,
  } = options

  // screenshotapi.net endpoint
  // Note: Returns JSON with screenshot URL, not the image directly
  const apiEndpoints = [
    {
      url: 'https://shot.screenshotapi.net/screenshot',
      authKey: 'token',
      name: 'screenshotapi.net',
    },
  ]

  console.log(`📸 Capturing screenshot of ${url}...`)
  console.log(`   Format: ${format}`)
  console.log(`   Viewport: ${viewportWidth}x${viewportHeight}`)
  console.log(`   Full page: ${fullPage}`)

  let lastError: Error | null = null

  // Try each API endpoint until one works
  for (const endpoint of apiEndpoints) {
    try {
      // Build query parameters
      const params = new URLSearchParams({
        url,
        [endpoint.authKey]: apiKey,
        format,
        full_page: fullPage.toString(),
        viewport_width: viewportWidth.toString(),
        viewport_height: viewportHeight.toString(),
      })

      if (wait > 0) {
        params.append('wait', wait.toString())
      }

      const requestUrl = `${endpoint.url}?${params.toString()}`

      console.log(`   Trying ${endpoint.name}...`)

      const response = await fetch(requestUrl, {
        redirect: 'follow', // Follow redirects
      })

      if (!response.ok) {
        // Clone response before reading body to avoid "Body has already been read" error
        const responseClone = response.clone()
        let errorText = ''
        try {
          errorText = await responseClone.text()
          // Limit error text length
          if (errorText.length > 300) {
            errorText = errorText.substring(0, 300) + '...'
          }
        } catch {
          errorText = 'Could not read error response'
        }

        // For auth errors (401/403), try next endpoint but include error details
        if (response.status === 401 || response.status === 403) {
          lastError = new Error(
            `${endpoint.name}: Authentication failed (${response.status})\nError: ${errorText}`
          )
          continue
        }
        // For other errors, try next endpoint
        lastError = new Error(
          `${endpoint.name}: ${response.status} ${response.statusText}\nError: ${errorText}`
        )
        continue
      }

      // Check response content type
      const contentType = response.headers.get('content-type') || 'unknown'

      // screenshotapi.net returns JSON with a screenshot URL, not the image directly
      if (
        contentType.includes('application/json') ||
        endpoint.url.includes('shot.screenshotapi.net')
      ) {
        try {
          const json = await response.json()

          // Check if response contains a screenshot URL
          if (json.screenshot && typeof json.screenshot === 'string') {
            console.log(`   📥 Fetching screenshot from: ${json.screenshot}`)
            // Fetch the actual image from the provided URL
            const imageResponse = await fetch(json.screenshot)

            if (!imageResponse.ok) {
              throw new Error(
                `Failed to fetch screenshot from URL: ${imageResponse.status}`
              )
            }

            const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())
            console.log(
              `✅ Screenshot captured successfully using ${endpoint.name} (${(imageBuffer.length / 1024).toFixed(2)} KB)`
            )
            return imageBuffer
          } else {
            // JSON response but no screenshot URL - might be an error
            lastError = new Error(
              `${endpoint.name}: JSON response received but no screenshot URL found\nResponse: ${JSON.stringify(json, null, 2)}`
            )
            continue
          }
        } catch (jsonError) {
          lastError = new Error(
            `${endpoint.name}: Failed to parse JSON response: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`
          )
          continue
        }
      }

      // For direct image responses (other APIs)
      if (!contentType.startsWith('image/')) {
        // Read the response body to see what error message we got
        let errorText = ''
        try {
          const text = await response.text()
          try {
            const json = JSON.parse(text)
            errorText = JSON.stringify(json, null, 2)
          } catch {
            errorText =
              text.length > 500 ? text.substring(0, 500) + '...' : text
          }
        } catch (readError) {
          errorText = `Failed to read response: ${readError instanceof Error ? readError.message : String(readError)}`
        }

        lastError = new Error(
          `${endpoint.name}: Expected image but got ${contentType}\nResponse preview: ${errorText}`
        )
        continue
      }

      // Success! Direct image response
      const imageBuffer = Buffer.from(await response.arrayBuffer())
      console.log(
        `✅ Screenshot captured successfully using ${endpoint.name} (${(imageBuffer.length / 1024).toFixed(2)} KB)`
      )
      return imageBuffer
    } catch (error) {
      // Network or other errors - try next endpoint
      if (error instanceof Error) {
        lastError = new Error(`${endpoint.name}: ${error.message}`)
      } else {
        lastError = new Error(`${endpoint.name}: ${String(error)}`)
      }
      continue
    }
  }

  // If we get here, all endpoints failed
  throw new Error(
    `All screenshot API endpoints failed. Last error: ${lastError?.message || 'Unknown error'}`
  )
}

/**
 * Saves screenshot buffer to file
 */
async function saveScreenshot(
  buffer: Buffer,
  outputPath: string
): Promise<string> {
  const fullPath = path.resolve(process.cwd(), outputPath)

  // Ensure directory exists
  const dir = path.dirname(fullPath)
  await fs.mkdir(dir, { recursive: true })

  // Write file
  await fs.writeFile(fullPath, buffer)

  console.log(`💾 Screenshot saved to: ${fullPath}`)
  return fullPath
}

/**
 * Navigation pages from the site navigation menu
 */
const NAVIGATION_PAGES = [
  { id: 'home', href: '/', label: 'Home' },
  { id: 'about', href: '/about', label: 'About' },
  { id: 'services', href: '/services', label: 'Services' },
  { id: 'portfolio', href: '/portfolio', label: 'Portfolio' },
  { id: 'our-work', href: '/our-work', label: 'Our Work' },
  { id: 'team', href: '/team', label: 'Team' },
  { id: 'contact', href: '/contact', label: 'Contact' },
]

/**
 * Captures screenshots for all navigation pages
 */
async function captureAllPages(
  apiKey: string,
  baseUrl: string,
  outputDir: string,
  format: 'png' | 'jpeg' | 'jpg' | 'webp'
): Promise<void> {
  console.log('📸 Capturing screenshots for all navigation pages...\n')
  console.log(`   Base URL: ${baseUrl}`)
  console.log(`   Total pages: ${NAVIGATION_PAGES.length}\n`)

  const results: Array<{
    url: string
    success: boolean
    path?: string
    error?: string
  }> = []

  for (let i = 0; i < NAVIGATION_PAGES.length; i++) {
    const page = NAVIGATION_PAGES[i]
    const fullUrl = `${baseUrl}${page.href}`
    // Use simple filename without timestamp to enable overwriting
    const filename = `${page.id}.${format}`
    const outputPath = path.join(outputDir, filename)

    console.log(
      `[${i + 1}/${NAVIGATION_PAGES.length}] 📄 ${page.label} (${page.href})`
    )

    try {
      const options: ScreenshotOptions = {
        url: fullUrl,
        format,
        fullPage: true,
        viewportWidth: 1920,
        viewportHeight: 1080,
        wait: 2,
      }

      const imageBuffer = await captureScreenshot(apiKey, options)
      const savedPath = await saveScreenshot(imageBuffer, outputPath)

      results.push({ url: fullUrl, success: true, path: savedPath })
      console.log(`   ✅ Success: ${savedPath}\n`)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      results.push({ url: fullUrl, success: false, error: errorMessage })
      console.error(`   ❌ Failed: ${errorMessage}\n`)
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Screenshot Capture Summary')
  console.log('='.repeat(60))
  const successCount = results.filter(r => r.success).length
  const failCount = results.filter(r => !r.success).length
  console.log(`   Total pages: ${results.length}`)
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Failed: ${failCount}`)

  if (successCount > 0) {
    console.log('\n   ✅ Successful captures:')
    results
      .filter(r => r.success)
      .forEach(r => {
        console.log(`      - ${r.url} → ${r.path}`)
      })
  }

  if (failCount > 0) {
    console.log('\n   ❌ Failed captures:')
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`      - ${r.url}: ${r.error}`)
      })
  }

  console.log('='.repeat(60) + '\n')

  if (failCount > 0) {
    process.exit(1)
  }
}

/**
 * Main function to capture and save screenshot
 */
async function main() {
  // Get API key and trim whitespace (common issue with .env files)
  const apiKey = process.env.SCREENSHOT_API_KEY?.trim()

  if (!apiKey) {
    console.error('❌ Error: API key not found')
    console.error('   Please set SCREENSHOT_API_KEY environment variable')
    console.error('   The script automatically loads from:')
    console.error('     - .env.local (checked first)')
    console.error('     - .env (fallback)')
    console.error('   Or set it inline:')
    console.error('npm run capture-screenshot')
    process.exit(1)
  }

  // Debug: Show API key prefix (first 10 chars) for verification
  console.log(`🔑 Using API key: ${apiKey.substring(0, 10)}...`)
  console.log(`   Full key length: ${apiKey.length} characters\n`)

  // Check if --all flag is set to capture all navigation pages
  const captureAll =
    process.argv.includes('--all') || process.argv.includes('-a')

  const baseUrl =
    process.argv.find(arg => arg.startsWith('--base-url='))?.split('=')[1] ||
    process.argv.find(arg => arg.startsWith('--url='))?.split('=')[1] ||
    'https://bestitconsultants.ca'

  const outputDir =
    process.argv.find(arg => arg.startsWith('--output='))?.split('=')[1] ||
    process.argv.find(arg => arg.startsWith('-o='))?.split('=')[1] ||
    'public/screenshots'

  const format =
    (process.argv.find(arg => arg.startsWith('--format='))?.split('=')[1] as
      | 'png'
      | 'jpeg'
      | 'jpg'
      | 'webp') ||
    (process.argv.find(arg => arg.startsWith('-f='))?.split('=')[1] as
      | 'png'
      | 'jpeg'
      | 'jpg'
      | 'webp') ||
    'png'

  // If --all flag, capture all navigation pages
  if (captureAll) {
    await captureAllPages(apiKey, baseUrl, outputDir, format)
    return
  }

  // Otherwise, capture single page (default behavior)
  const targetUrl = process.argv[2] || baseUrl

  // Check if --timestamp flag is set (for single page mode, default is to overwrite)
  const includeTimestamp =
    process.argv.includes('--timestamp') || process.argv.includes('-t')

  // Generate output filename
  const urlSlug = targetUrl
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()

  let filename: string
  if (includeTimestamp) {
    // Include timestamp only if explicitly requested
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .split('T')[0]
    filename = `${urlSlug}-${timestamp}.${format}`
  } else {
    // Default: overwrite existing file (no timestamp)
    filename = `${urlSlug}.${format}`
  }
  const outputPath = path.join(outputDir, filename)

  const options: ScreenshotOptions = {
    url: targetUrl,
    format,
    fullPage: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    wait: 2, // Wait 2 seconds for page to load
  }

  try {
    console.log('🚀 Starting screenshot capture...\n')
    const imageBuffer = await captureScreenshot(apiKey, options)
    const savedPath = await saveScreenshot(imageBuffer, outputPath)

    console.log('\n' + '='.repeat(50))
    console.log('✅ Screenshot captured successfully!')
    console.log(`   URL: ${targetUrl}`)
    console.log(`   Saved to: ${savedPath}`)
    console.log('='.repeat(50))
  } catch (error) {
    console.error('\n❌ Failed to capture screenshot:')
    if (error instanceof Error) {
      console.error(`   ${error.message}`)
      if (error.stack) {
        console.error(`\n   Stack trace:`)
        console.error(error.stack)
      }
    } else {
      console.error(`   ${String(error)}`)
    }
    process.exit(1)
  }
}

// Run if this is the main module
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error)
    process.exit(1)
  })
}

export { captureScreenshot, saveScreenshot }
