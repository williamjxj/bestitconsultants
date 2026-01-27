# SEO Validation Checklist

**Feature**: Improve SEO  
**Date**: 2026-01-23  
**Status**: Post-Deployment Validation Required

## Overview

This checklist covers all validation tasks (T049-T052) that require manual testing after deployment.
These tasks cannot be automated because they require:

1. Live production URLs
2. External validation tools (Google, Facebook, Twitter)
3. Manual verification of visual results

---

## Pre-Deployment Validation

Before deploying, run automated checks:

```bash
npm run validate:seo
```

This will verify:

- ✅ Sitemap configuration
- ✅ Robots.txt configuration
- ✅ Page metadata exports
- ✅ Structured data utilities
- ✅ SEO utilities
- ✅ Breadcrumb component

---

## Task T049: Validate Structured Data

**Tool**: [Google Rich Results Test](https://search.google.com/test/rich-results)  
**Status**: ⏳ Pending Deployment

### Test Pages

Test each page below and verify structured data:

#### 1. Homepage (`/`)

- [ ] **Organization Schema**
  - URL: `https://bestitconsultants.ca/`
  - Expected: Organization schema with name, description, logo, URL, email, social profiles
  - Validation: Should show "Organization" in rich results
  - Status: ⬜ Not Started

#### 2. Services Page (`/services`)

- [ ] **Service Schema**
  - URL: `https://bestitconsultants.ca/services`
  - Expected: Service schema with name, description, provider (Organization), serviceType,
    areaServed
  - Validation: Should show "Service" in rich results
  - Status: ⬜ Not Started

- [ ] **Organization Schema** (also present)
  - Validation: Should show Organization schema alongside Service
  - Status: ⬜ Not Started

#### 3. Case Studies Page (`/case-studies`)

- [ ] **Article Schema**
  - URL: `https://bestitconsultants.ca/case-studies`
  - Expected: Article schema with headline, description, datePublished, publisher (Organization)
  - Validation: Should show "Article" in rich results
  - Status: ⬜ Not Started

- [ ] **Organization Schema** (also present)
  - Validation: Should show Organization schema alongside Article
  - Status: ⬜ Not Started

#### 4. All Pages with Breadcrumbs

- [ ] **BreadcrumbList Schema**
  - Test pages: `/services`, `/portfolio`, `/case-studies`, `/our-team`, `/testimonials`,
    `/contact-us`
  - Expected: BreadcrumbList schema with itemListElement array
  - Validation: Should show breadcrumb navigation in search results
  - Status: ⬜ Not Started

### Success Criteria

- ✅ All structured data types validate without errors
- ✅ No warnings or errors in Google Rich Results Test
- ✅ All schemas appear correctly in test results
- ✅ Required fields are present for each schema type

### Common Issues & Fixes

| Issue                   | Fix                                     |
| ----------------------- | --------------------------------------- |
| Missing required fields | Check schema generation in layout files |
| Invalid JSON-LD         | Verify `structuredDataScript()` output  |
| Wrong schema type       | Verify correct schema function is used  |
| Missing Organization    | Ensure `StructuredData.tsx` is included |

---

## Task T050: Validate Open Graph Metadata

**Tool**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)  
**Status**: ⏳ Pending Deployment

### Test Pages

Test all 7 pages and verify Open Graph tags:

#### 1. Homepage (`/`)

- [ ] URL: `https://bestitconsultants.ca/`
- [ ] **og:title**: Should match page title
- [ ] **og:description**: Should match meta description
- [ ] **og:image**: Should display correctly (1200×630px recommended)
- [ ] **og:url**: Should be absolute URL
- [ ] **og:type**: Should be "website"
- [ ] **og:site_name**: Should be "BestIT Consulting"
- [ ] Status: ⬜ Not Started

#### 2. Services Page (`/services`)

- [ ] URL: `https://bestitconsultants.ca/services`
- [ ] Verify all OG tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 3. Portfolio Page (`/portfolio`)

- [ ] URL: `https://bestitconsultants.ca/portfolio`
- [ ] Verify all OG tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 4. Case Studies Page (`/case-studies`)

- [ ] URL: `https://bestitconsultants.ca/case-studies`
- [ ] Verify all OG tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 5. Team Page (`/our-team`)

- [ ] URL: `https://bestitconsultants.ca/our-team`
- [ ] Verify all OG tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 6. Testimonials Page (`/testimonials`)

- [ ] URL: `https://bestitconsultants.ca/testimonials`
- [ ] Verify all OG tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 7. Contact Page (`/contact-us`)

- [ ] URL: `https://bestitconsultants.ca/contact-us`
- [ ] Verify all OG tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

### Success Criteria

- ✅ All pages have complete Open Graph metadata
- ✅ All images display correctly in preview
- ✅ No warnings or errors in Facebook Debugger
- ✅ Preview matches expected content

### Common Issues & Fixes

| Issue                  | Fix                                            |
| ---------------------- | ---------------------------------------------- |
| Image not loading      | Verify image URL is absolute and accessible    |
| Missing og:image       | Check `buildPageMetadata()` fallback logic     |
| Wrong image dimensions | Ensure images are 1200×630px                   |
| Cache issues           | Use "Scrape Again" button in Facebook Debugger |

---

## Task T051: Validate Twitter Card Metadata

**Tool**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)  
**Status**: ⏳ Pending Deployment

### Test Pages

Test all 7 pages and verify Twitter Card tags:

#### 1. Homepage (`/`)

- [ ] URL: `https://bestitconsultants.ca/`
- [ ] **twitter:card**: Should be "summary_large_image"
- [ ] **twitter:title**: Should match page title
- [ ] **twitter:description**: Should match meta description
- [ ] **twitter:image**: Should display correctly
- [ ] Status: ⬜ Not Started

#### 2. Services Page (`/services`)

- [ ] URL: `https://bestitconsultants.ca/services`
- [ ] Verify all Twitter Card tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 3. Portfolio Page (`/portfolio`)

- [ ] URL: `https://bestitconsultants.ca/portfolio`
- [ ] Verify all Twitter Card tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 4. Case Studies Page (`/case-studies`)

- [ ] URL: `https://bestitconsultants.ca/case-studies`
- [ ] Verify all Twitter Card tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 5. Team Page (`/our-team`)

- [ ] URL: `https://bestitconsultants.ca/our-team`
- [ ] Verify all Twitter Card tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 6. Testimonials Page (`/testimonials`)

- [ ] URL: `https://bestitconsultants.ca/testimonials`
- [ ] Verify all Twitter Card tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

#### 7. Contact Page (`/contact-us`)

- [ ] URL: `https://bestitconsultants.ca/contact-us`
- [ ] Verify all Twitter Card tags present and correct
- [ ] Image displays correctly
- [ ] Status: ⬜ Not Started

### Success Criteria

- ✅ All pages have complete Twitter Card metadata
- ✅ All images display correctly in preview
- ✅ No warnings or errors in Twitter Card Validator
- ✅ Preview matches expected content

### Common Issues & Fixes

| Issue                 | Fix                                            |
| --------------------- | ---------------------------------------------- |
| Image not loading     | Verify image URL is absolute and accessible    |
| Missing twitter:image | Check `buildPageMetadata()` fallback logic     |
| Wrong card type       | Verify `twitter:card` is "summary_large_image" |
| Cache issues          | Twitter may cache - wait or use different URL  |

---

## Task T052: Run Lighthouse SEO Audit

**Tool**: Chrome DevTools → Lighthouse  
**Status**: ⏳ Pending Deployment

### Test Pages

Run Lighthouse SEO audit on all 7 pages:

#### 1. Homepage (`/`)

- [ ] URL: `https://bestitconsultants.ca/`
- [ ] SEO Score: Target >95
- [ ] Status: ⬜ Not Started

#### 2. Services Page (`/services`)

- [ ] URL: `https://bestitconsultants.ca/services`
- [ ] SEO Score: Target >95
- [ ] Status: ⬜ Not Started

#### 3. Portfolio Page (`/portfolio`)

- [ ] URL: `https://bestitconsultants.ca/portfolio`
- [ ] SEO Score: Target >95
- [ ] Status: ⬜ Not Started

#### 4. Case Studies Page (`/case-studies`)

- [ ] URL: `https://bestitconsultants.ca/case-studies`
- [ ] SEO Score: Target >95
- [ ] Status: ⬜ Not Started

#### 5. Team Page (`/our-team`)

- [ ] URL: `https://bestitconsultants.ca/our-team`
- [ ] SEO Score: Target >95
- [ ] Status: ⬜ Not Started

#### 6. Testimonials Page (`/testimonials`)

- [ ] URL: `https://bestitconsultants.ca/testimonials`
- [ ] SEO Score: Target >95
- [ ] Status: ⬜ Not Started

#### 7. Contact Page (`/contact-us`)

- [ ] URL: `https://bestitconsultants.ca/contact-us`
- [ ] SEO Score: Target >95
- [ ] Status: ⬜ Not Started

### How to Run Lighthouse

1. Open Chrome DevTools (F12 or Cmd+Option+I)
2. Go to "Lighthouse" tab
3. Select "SEO" category only
4. Click "Analyze page load"
5. Review results and fix any issues

### Key Checks

- [ ] **Meta tags present**: All pages have title and description
- [ ] **Structured data valid**: No errors in structured data
- [ ] **Images have alt text**: 100% coverage
- [ ] **Links are crawlable**: No broken or blocked links
- [ ] **No duplicate content**: All pages have unique canonical URLs
- [ ] **Mobile-friendly**: Responsive design
- [ ] **HTTPS**: Secure connection
- [ ] **Page load speed**: Fast loading times

### Success Criteria

- ✅ All pages score >95 on SEO audit
- ✅ No critical issues
- ✅ All best practices followed

### Common Issues & Fixes

| Issue                    | Fix                                         |
| ------------------------ | ------------------------------------------- |
| Missing meta description | Check `buildPageMetadata()` in layout files |
| Images missing alt text  | Add alt attributes to all images            |
| Duplicate titles         | Ensure unique titles per page               |
| Missing canonical URL    | Verify `getCanonicalUrl()` is used          |
| Slow page load           | Optimize images and code                    |

---

## Additional Validation Tasks

### Google Search Console

- [ ] Submit sitemap: `https://bestitconsultants.ca/sitemap.xml`
- [ ] Request indexing for key pages
- [ ] Monitor indexing status
- [ ] Check for crawl errors
- [ ] Review search performance

### Manual Page Source Verification

For each page, verify in page source:

- [ ] `<title>` tag present and correct
- [ ] `<meta name="description">` present and correct
- [ ] `<link rel="canonical">` present and absolute
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`, etc.)
- [ ] Twitter Card tags present (`twitter:card`, `twitter:title`, etc.)
- [ ] JSON-LD structured data present and valid
- [ ] BreadcrumbList schema present (on pages with breadcrumbs)

### Image Alt Text Verification

- [ ] All images have `alt` attribute
- [ ] Descriptive images have meaningful alt text
- [ ] Decorative images use `alt=""`
- [ ] 100% coverage across all pages

---

## Validation Summary

### Automated Checks (Pre-Deployment)

- ✅ Sitemap configuration
- ✅ Robots.txt configuration
- ✅ Page metadata exports
- ✅ Structured data utilities
- ✅ SEO utilities
- ✅ Breadcrumb component

### Manual Checks (Post-Deployment)

- ⏳ T049: Google Rich Results Test
- ⏳ T050: Facebook Sharing Debugger
- ⏳ T051: Twitter Card Validator
- ⏳ T052: Lighthouse SEO Audit

---

## Notes

- All validations require the site to be deployed to production
- External tools may cache results - use "Scrape Again" or wait for cache to clear
- Some validations may take time to propagate (e.g., Google indexing)
- Keep this checklist updated as validations are completed

---

**Last Updated**: 2026-01-23  
**Next Review**: After deployment
