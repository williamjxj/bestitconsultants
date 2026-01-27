#!/usr/bin/env node
/**
 * SEO Verification Script
 * Validates SEO configuration for BestIT Consultants website
 */

import fs from 'fs'
import path from 'path'

interface SEOCheck {
  name: string
  passed: boolean
  message: string
  severity: 'critical' | 'warning' | 'info'
}

const checks: SEOCheck[] = []

function addCheck(
  name: string,
  passed: boolean,
  message: string,
  severity: 'critical' | 'warning' | 'info' = 'critical'
) {
  checks.push({ name, passed, message, severity })
}

// Check 1: Favicon files exist in public folder
const faviconFiles = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
]

faviconFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), 'public', file)
  const exists = fs.existsSync(filePath)
  addCheck(
    `Favicon: ${file}`,
    exists,
    exists ? `✓ Found at /${file}` : `✗ Missing: /${file}`,
    'critical'
  )
})

// Check 2: site.webmanifest exists and is valid
const manifestPath = path.join(process.cwd(), 'public', 'site.webmanifest')
const manifestExists = fs.existsSync(manifestPath)
addCheck(
  'Web Manifest',
  manifestExists,
  manifestExists
    ? '✓ site.webmanifest exists'
    : '✗ site.webmanifest missing',
  'critical'
)

if (manifestExists) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    const hasName = !!manifest.name
    const hasIcons = Array.isArray(manifest.icons) && manifest.icons.length > 0
    const hasStartUrl = !!manifest.start_url || manifest.start_url === '/'

    addCheck(
      'Manifest: name',
      hasName,
      hasName ? `✓ Name: ${manifest.name}` : '✗ Missing name',
      'critical'
    )

    addCheck(
      'Manifest: icons',
      hasIcons,
      hasIcons
        ? `✓ ${manifest.icons.length} icons configured`
        : '✗ No icons configured',
      'critical'
    )

    addCheck(
      'Manifest: start_url',
      hasStartUrl,
      hasStartUrl ? '✓ start_url configured' : '✗ Missing start_url',
      'warning'
    )

    // Check if manifest icons point to correct paths
    if (hasIcons) {
      manifest.icons.forEach((icon: any) => {
        const iconPath = path.join(process.cwd(), 'public', icon.src)
        const iconExists = fs.existsSync(iconPath)
        addCheck(
          `Manifest Icon: ${icon.src}`,
          iconExists,
          iconExists
            ? `✓ Icon found: ${icon.src}`
            : `✗ Icon missing: ${icon.src}`,
          'critical'
        )
      })
    }
  } catch (error) {
    addCheck(
      'Manifest: parsing',
      false,
      `✗ Invalid JSON in site.webmanifest`,
      'critical'
    )
  }
}

// Check 3: Layout.tsx configuration
const layoutPath = path.join(process.cwd(), 'src', 'app', 'layout.tsx')
const layoutExists = fs.existsSync(layoutPath)
addCheck(
  'Layout File',
  layoutExists,
  layoutExists ? '✓ layout.tsx exists' : '✗ layout.tsx missing',
  'critical'
)

if (layoutExists) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf-8')

  // Check for metadata export
  const hasMetadata = layoutContent.includes('export const metadata')
  addCheck(
    'Layout: metadata export',
    hasMetadata,
    hasMetadata
      ? '✓ Metadata exported'
      : '✗ No metadata export found',
    'critical'
  )

  // Check for favicon configuration
  const hasFaviconConfig = layoutContent.includes('/')
  addCheck(
    'Layout: favicon paths',
    hasFaviconConfig,
    hasFaviconConfig
      ? '✓ Favicon paths point to /'
      : '⚠ Favicon paths may not be correctly configured',
    'warning'
  )

  // Check for manifest link
  const hasManifest = layoutContent.includes("manifest: '/site.webmanifest'")
  addCheck(
    'Layout: manifest link',
    hasManifest,
    hasManifest
      ? '✓ Manifest linked in metadata'
      : '✗ Manifest not linked',
    'critical'
  )

  // Check for OpenGraph
  const hasOpenGraph = layoutContent.includes('openGraph:')
  addCheck(
    'Layout: OpenGraph',
    hasOpenGraph,
    hasOpenGraph
      ? '✓ OpenGraph metadata configured'
      : '✗ No OpenGraph metadata',
    'warning'
  )

  // Check for Twitter Card
  const hasTwitter = layoutContent.includes('twitter:')
  addCheck(
    'Layout: Twitter Card',
    hasTwitter,
    hasTwitter
      ? '✓ Twitter Card metadata configured'
      : '✗ No Twitter Card metadata',
    'warning'
  )

  // Check for lang attribute
  const hasLangEn = layoutContent.includes("lang='en'") || layoutContent.includes('lang="en"')
  addCheck(
    'Layout: HTML lang',
    hasLangEn,
    hasLangEn
      ? '✓ HTML lang attribute set to "en"'
      : '⚠ HTML lang attribute may not be set',
    'warning'
  )

  // Check for StructuredData component
  const hasStructuredData = layoutContent.includes('StructuredData')
  addCheck(
    'Layout: Structured Data',
    hasStructuredData,
    hasStructuredData
      ? '✓ StructuredData component included'
      : '✗ No StructuredData component',
    'warning'
  )
}

// Check 4: robots.txt configuration
const robotsPath = path.join(process.cwd(), 'src', 'app', 'robots.ts')
const robotsExists = fs.existsSync(robotsPath)
addCheck(
  'robots.ts',
  robotsExists,
  robotsExists ? '✓ robots.ts configured' : '✗ robots.ts missing',
  'warning'
)

// Check 5: sitemap.xml configuration
const sitemapPath = path.join(process.cwd(), 'src', 'app', 'sitemap.ts')
const sitemapExists = fs.existsSync(sitemapPath)
addCheck(
  'sitemap.ts',
  sitemapExists,
  sitemapExists ? '✓ sitemap.ts configured' : '✗ sitemap.ts missing',
  'warning'
)

// Check 6: StructuredData component
const structuredDataPath = path.join(
  process.cwd(),
  'src',
  'components',
  'seo',
  'StructuredData.tsx'
)
const structuredDataExists = fs.existsSync(structuredDataPath)
addCheck(
  'StructuredData Component',
  structuredDataExists,
  structuredDataExists
    ? '✓ StructuredData.tsx exists'
    : '✗ StructuredData.tsx missing',
  'warning'
)

// Generate Report
console.log('\n')
console.log('═══════════════════════════════════════════════════════════')
console.log('                    SEO VERIFICATION REPORT                ')
console.log('═══════════════════════════════════════════════════════════')
console.log('\n')

const criticalChecks = checks.filter((c) => c.severity === 'critical')
const warningChecks = checks.filter((c) => c.severity === 'warning')
const infoChecks = checks.filter((c) => c.severity === 'info')

const criticalPassed = criticalChecks.filter((c) => c.passed).length
const warningPassed = warningChecks.filter((c) => c.passed).length

console.log(`Critical Checks: ${criticalPassed}/${criticalChecks.length} passed`)
console.log(`Warnings: ${warningPassed}/${warningChecks.length} passed`)
console.log(`Info: ${infoChecks.length} items\n`)

// Critical Issues
if (criticalChecks.some((c) => !c.passed)) {
  console.log('🔴 CRITICAL ISSUES:')
  console.log('───────────────────────────────────────────────────────────')
  criticalChecks
    .filter((c) => !c.passed)
    .forEach((check) => {
      console.log(`  ${check.message}`)
    })
  console.log('\n')
}

// Warnings
if (warningChecks.some((c) => !c.passed)) {
  console.log('⚠️  WARNINGS:')
  console.log('───────────────────────────────────────────────────────────')
  warningChecks
    .filter((c) => !c.passed)
    .forEach((check) => {
      console.log(`  ${check.message}`)
    })
  console.log('\n')
}

// Passed Checks
console.log('✅ PASSED CHECKS:')
console.log('───────────────────────────────────────────────────────────')
checks
  .filter((c) => c.passed)
  .forEach((check) => {
    console.log(`  ${check.message}`)
  })

console.log('\n')
console.log('═══════════════════════════════════════════════════════════')

// Summary
const totalPassed = checks.filter((c) => c.passed).length
const totalChecks = checks.length
const passRate = ((totalPassed / totalChecks) * 100).toFixed(1)

console.log(`\nOVERALL: ${totalPassed}/${totalChecks} checks passed (${passRate}%)`)

if (criticalChecks.every((c) => c.passed)) {
  console.log('\n✅ All critical SEO requirements are met!')
} else {
  console.log(
    '\n❌ Critical issues found. Please fix them before deploying.'
  )
  process.exit(1)
}

console.log('\n')
