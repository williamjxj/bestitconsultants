#!/usr/bin/env ts-node
/**
 * SEO Validation Script
 * 
 * Validates SEO implementation programmatically where possible.
 * Some validations require manual testing with external tools (see VALIDATION_CHECKLIST.md).
 * 
 * Usage:
 *   npm run validate:seo
 *   npm run validate:seo -- --url https://bestitconsultants.ca
 */

import { readFileSync } from 'fs'
import { join } from 'path'

interface ValidationResult {
  name: string
  status: 'pass' | 'fail' | 'warning' | 'manual'
  message: string
  details?: string[]
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bestitconsultants.ca'
const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/portfolio', name: 'Portfolio' },
  { path: '/case-studies', name: 'Case Studies' },
  { path: '/our-team', name: 'Team' },
  { path: '/testimonials', name: 'Testimonials' },
  { path: '/contact-us', name: 'Contact' },
]

/**
 * Validate sitemap configuration
 */
function validateSitemap(): ValidationResult {
  try {
    const sitemapPath = join(process.cwd(), 'src/app/sitemap.ts')
    const content = readFileSync(sitemapPath, 'utf-8')
    
    const issues: string[] = []
    
    // Check all pages are included
    const pagePaths = PAGES.map(p => p.path)
    for (const page of pagePaths) {
      // Check for various formats: '/path', "/path", `/path`, or in template literals
      const hasPage =
        content.includes(`'${page}'`) ||
        content.includes(`"${page}"`) ||
        content.includes(`\`${page}\``) ||
        (page === '/' && content.includes('baseUrl')) ||
        (page !== '/' && content.includes(`\${baseUrl}${page}`)) ||
        (page !== '/' && content.includes(`baseUrl}${page}`))
      
      if (!hasPage) {
        issues.push(`Missing page in sitemap: ${page}`)
      }
    }
    
    // Check priorities
    if (!content.includes('priority: 1.0')) {
      issues.push('Homepage priority (1.0) not found')
    }
    
    // Check for duplicates
    const urlCounts = new Map<string, number>()
    const urlMatches = content.matchAll(/url:\s*[`'"]([^`'"]+)[`'"]/g)
    for (const match of urlMatches) {
      const url = match[1]
      urlCounts.set(url, (urlCounts.get(url) || 0) + 1)
    }
    
    for (const [url, count] of urlCounts.entries()) {
      if (count > 1) {
        issues.push(`Duplicate URL in sitemap: ${url}`)
      }
    }
    
    if (issues.length > 0) {
      return {
        name: 'Sitemap Configuration',
        status: 'fail',
        message: 'Sitemap has issues',
        details: issues,
      }
    }
    
    return {
      name: 'Sitemap Configuration',
      status: 'pass',
      message: 'Sitemap configuration is valid',
    }
  } catch (error) {
    return {
      name: 'Sitemap Configuration',
      status: 'fail',
      message: `Error reading sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Validate robots.txt configuration
 */
function validateRobots(): ValidationResult {
  try {
    const robotsPath = join(process.cwd(), 'src/app/robots.ts')
    const content = readFileSync(robotsPath, 'utf-8')
    
    const issues: string[] = []
    
    // Check sitemap reference
    if (!content.includes('sitemap') && !content.includes('Sitemap')) {
      issues.push('Sitemap reference not found in robots.txt')
    }
    
    // Check that public pages are allowed
    if (content.includes("Disallow: '/'")) {
      issues.push('Root path is disallowed - should allow public pages')
    }
    
    if (issues.length > 0) {
      return {
        name: 'Robots.txt Configuration',
        status: 'fail',
        message: 'Robots.txt has issues',
        details: issues,
      }
    }
    
    return {
      name: 'Robots.txt Configuration',
      status: 'pass',
      message: 'Robots.txt configuration is valid',
    }
  } catch (error) {
    return {
      name: 'Robots.txt Configuration',
      status: 'fail',
      message: `Error reading robots.ts: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Validate page layouts have metadata
 */
function validatePageMetadata(): ValidationResult {
  const missing: string[] = []
  
  for (const page of PAGES) {
    if (page.path === '/') {
      // Homepage uses root layout
      const layoutPath = join(process.cwd(), 'src/app/layout.tsx')
      try {
        const content = readFileSync(layoutPath, 'utf-8')
        if (!content.includes('export const metadata') && !content.includes('export const metadata:')) {
          missing.push(page.name)
        }
      } catch {
        missing.push(page.name)
      }
    } else {
      const layoutPath = join(process.cwd(), `src/app${page.path}/layout.tsx`)
      try {
        const content = readFileSync(layoutPath, 'utf-8')
        if (!content.includes('export const metadata') && !content.includes('export const metadata:')) {
          missing.push(page.name)
        }
      } catch {
        missing.push(page.name)
      }
    }
  }
  
  if (missing.length > 0) {
    return {
      name: 'Page Metadata',
      status: 'fail',
      message: `Missing metadata in ${missing.length} page(s)`,
      details: missing,
    }
  }
  
  return {
    name: 'Page Metadata',
    status: 'pass',
    message: 'All pages have metadata exports',
  }
}

/**
 * Validate structured data utilities exist
 */
function validateStructuredDataUtils(): ValidationResult {
  const utilsPath = join(process.cwd(), 'src/lib/structured-data.ts')
  try {
    const content = readFileSync(utilsPath, 'utf-8')
    
    const required = [
      'createOrganizationSchema',
      'createServiceSchema',
      'createArticleSchema',
      'createBreadcrumbSchema',
      'structuredDataScript',
    ]
    
    const missing = required.filter(fn => !content.includes(fn))
    
    if (missing.length > 0) {
      return {
        name: 'Structured Data Utilities',
        status: 'fail',
        message: `Missing functions: ${missing.join(', ')}`,
      }
    }
    
    return {
      name: 'Structured Data Utilities',
      status: 'pass',
      message: 'All structured data utilities exist',
    }
  } catch (error) {
    return {
      name: 'Structured Data Utilities',
      status: 'fail',
      message: `Error reading structured-data.ts: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Validate SEO utilities exist
 */
function validateSeoUtils(): ValidationResult {
  const utilsPath = join(process.cwd(), 'src/lib/seo-utils.ts')
  try {
    const content = readFileSync(utilsPath, 'utf-8')
    
    const required = ['buildPageMetadata', 'getCanonicalUrl', 'validateMetadata']
    const missing = required.filter(fn => !content.includes(fn))
    
    if (missing.length > 0) {
      return {
        name: 'SEO Utilities',
        status: 'fail',
        message: `Missing functions: ${missing.join(', ')}`,
      }
    }
    
    return {
      name: 'SEO Utilities',
      status: 'pass',
      message: 'All SEO utilities exist',
    }
  } catch (error) {
    return {
      name: 'SEO Utilities',
      status: 'fail',
      message: `Error reading seo-utils.ts: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Validate breadcrumb component exists
 */
function validateBreadcrumbComponent(): ValidationResult {
  const componentPath = join(process.cwd(), 'src/components/seo/Breadcrumb.tsx')
  try {
    const content = readFileSync(componentPath, 'utf-8')
    
    if (!content.includes('BreadcrumbList') && !content.includes('createBreadcrumbSchema')) {
      return {
        name: 'Breadcrumb Component',
        status: 'warning',
        message: 'Breadcrumb component may not include structured data',
      }
    }
    
    return {
      name: 'Breadcrumb Component',
      status: 'pass',
      message: 'Breadcrumb component exists with structured data',
    }
  } catch (error) {
    return {
      name: 'Breadcrumb Component',
      status: 'fail',
      message: `Breadcrumb component not found: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}

/**
 * Generate validation URLs for external tools
 */
function generateValidationUrls(): ValidationResult {
  const urls: string[] = []
  
  for (const page of PAGES) {
    const url = `${BASE_URL}${page.path}`
    urls.push(`${page.name}: ${url}`)
  }
  
  return {
    name: 'Validation URLs',
    status: 'manual',
    message: 'URLs for external validation tools',
    details: urls,
  }
}

/**
 * Main validation function
 */
function runValidations(): ValidationResult[] {
  return [
    validateSitemap(),
    validateRobots(),
    validatePageMetadata(),
    validateStructuredDataUtils(),
    validateSeoUtils(),
    validateBreadcrumbComponent(),
    generateValidationUrls(),
  ]
}

/**
 * Print results
 */
function printResults(results: ValidationResult[]): void {
  console.log('\n🔍 SEO Validation Results\n')
  console.log('='.repeat(60))
  
  let passCount = 0
  let failCount = 0
  let warningCount = 0
  let manualCount = 0
  
  for (const result of results) {
    const icon =
      result.status === 'pass'
        ? '✅'
        : result.status === 'fail'
          ? '❌'
          : result.status === 'warning'
            ? '⚠️'
            : '📋'
    
    console.log(`\n${icon} ${result.name}`)
    console.log(`   ${result.message}`)
    
    if (result.details && result.details.length > 0) {
      for (const detail of result.details) {
        console.log(`   - ${detail}`)
      }
    }
    
    if (result.status === 'pass') passCount++
    else if (result.status === 'fail') failCount++
    else if (result.status === 'warning') warningCount++
    else if (result.status === 'manual') manualCount++
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 Summary:')
  console.log(`   ✅ Passed: ${passCount}`)
  console.log(`   ❌ Failed: ${failCount}`)
  console.log(`   ⚠️  Warnings: ${warningCount}`)
  console.log(`   📋 Manual: ${manualCount}`)
  
  if (manualCount > 0) {
    console.log('\n📝 Manual Validation Required:')
    console.log('   See VALIDATION_CHECKLIST.md for detailed instructions')
    console.log('   External tools needed:')
    console.log('   - Google Rich Results Test: https://search.google.com/test/rich-results')
    console.log('   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/')
    console.log('   - Twitter Card Validator: https://cards-dev.twitter.com/validator')
    console.log('   - Lighthouse SEO Audit: Chrome DevTools → Lighthouse')
  }
  
  console.log('')
  
  if (failCount > 0) {
    process.exit(1)
  }
}

// Run validations
const results = runValidations()
printResults(results)
