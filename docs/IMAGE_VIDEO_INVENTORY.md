# Images and Videos Inventory by Page

> **Note**: All R2 image paths are shown without the `getR2ImageUrl()` wrapper. Image sizes are actual file dimensions, while image box sizes are the display dimensions on the page.

---

## 1. Home Page (`/` - `src/app/page.tsx`)

| Component/Section | Image1 | Image1 Size | Image Box Size | Image2 | Image2 Size |
|---|---|---|---|---|---|
| Hero Carousel - Slide 1 | `optimized/b1` (.avif, .webp variants) | ~1920×1080px | Full viewport width × `calc(100vh - 88px)` | | |
| Hero Carousel - Slide 2 | `optimized/b2` (.avif, .webp variants) | ~1920×1080px | Full viewport width × `calc(100vh - 88px)` | | |
| Hero Carousel - Slide 3 | `optimized/b3` (.avif, .webp variants) | ~1920×1080px | Full viewport width × `calc(100vh - 88px)` | | |
| AboutSummary - Video | `Best IT Consultants.mov` | Original video dimensions | 612px width × auto (16:9 aspect ratio) | | |
| AboutSummary - Poster | `Best IT Consultants.jpg` | Original image dimensions | 612px width × auto (16:9 aspect ratio) | | |

**Notes:**
- Hero carousel images use `object-cover` to fill the viewport
- Video component uses lazy loading with poster image fallback

---

## 2. Services Page (`/services` - `src/app/services/page.tsx`)

| Component/Section         | Image1                  | Image1 Size       | Image Box Size                                   | Image2 | Image2 Size |
| --- | --- | --- | --- |---|---|
| Hero Section - Background | `/optimized/hs-1.webp` | 2.35:1 aspect ratio | Full viewport width × min-height 600px (lg size) | | |

**Notes:**
- Hero background images are 2.35:1 aspect ratio (21:9)
- Uses Next.js `Image` component with `object-cover` and `fill` props
- Image brightness: 0.8, contrast: 1.1, parallax enabled
- No overlay, minimal gradient overlay for text readability

---

## 3. Portfolio Page (`/portfolio` - `src/app/portfolio/page.tsx`)

| Component/Section                            | Image1                                | Image1 Size         | Image Box Size                                   | Image2       | Image2 Size |
| --- | --- | --- | --- | --- | --- |
| Hero Section - Background                    | `/optimized/hs-2.webp`                | 2.35:1 aspect ratio | Full viewport width × min-height 600px (lg size) |              |             |
| Portfolio Project - Xperi ML                 | `kling_20251012_1.png`                | Original dimensions | 400px × 225px (aspect-video)                     | g-8.webp<br>g-7.webp   | 1216×832px<br>1216×832px |
| Portfolio Project - Credit Suisse            | `istockphoto-1212876953-612x612.jpg`  | 612×612px           | 400px × 225px (aspect-video)                     | g-5.webp<br>g-18.webp  | 1216×832px<br>1216×832px |
| Portfolio Project - HSBC Banking             | `istockphoto-1358835459-612x612.webp` | 612×612px           | 400px × 225px (aspect-video)                     | g-4.webp<br>g-11.webp  | 1216×832px<br>1216×832px |
| Portfolio Project - HSBC ETL                 | `istockphoto-1350198816-612x612.jpg`  | 612×612px           | 400px × 225px (aspect-video)                     | g-9.webp<br>g-14.webp  | 1216×832px<br>1216×832px |
| Portfolio Project - WebMD                    | `istockphoto-2227310361-612x612.webp` | 612×612px           | 400px × 225px (aspect-video)                     | g-1.webp<br>g-2.webp   | 1216×832px<br>1216×832px |
| Portfolio Project - BestBuy                  | `istockphoto-1145868161-612x612.webp` | 612×612px           | 400px × 225px (aspect-video)                     | g-6.webp<br>g-17.webp  | 1216×832px<br>1216×832px |
| Portfolio Project - FedEx                    | `istockphoto-2163952011-612x612.webp` | 612×612px           | 400px × 225px (aspect-video)                     | g-50.webp<br>g-47.webp | 1216×832px<br>1216×832px |
| Portfolio Project - Tiffany                  | `istockphoto-492514758-612x612.webp`  | 612×612px           | 400px × 225px (aspect-video)                     | g-35.webp<br>g-36.webp | 1216×832px<br>1216×832px |
| Portfolio Project - Netherlands Gov          | `kling_20251012_2.png`                | Original dimensions | 400px × 225px (aspect-video)                     | g-49.webp<br>g-45.webp | 1216×832px<br>1216×832px |
| Portfolio Project - GM (duplicate)           | `istockphoto-1358835459-612x612.webp` | 612×612px           | 400px × 225px (aspect-video)                     | g-48.webp<br>g-42.webp | 1216×832px<br>1216×832px |
| Portfolio Project - Huawei (duplicate)       | `istockphoto-1212876953-612x612.jpg`  | 612×612px           | 400px × 225px (aspect-video)                     | g-39.webp<br>g-40.webp | 1216×832px<br>1216×832px |
| Portfolio Project - Aerospace (duplicate)    | `istockphoto-1350198816-612x612.jpg`  | 612×612px           | 400px × 225px (aspect-video)                     | g-43.webp<br>g-44.webp | 1216×832px<br>1216×832px |
| Portfolio Project - Supply Chain (duplicate) | `istockphoto-2227310361-612x612.webp` | 612×612px           | 400px × 225px (aspect-video)                     | g-30.webp<br>g-29.webp | 1216×832px<br>1216×832px |

**Notes:**
- Portfolio project images use `OptimizedImage` component with `object-cover` class
- Images are displayed in cards with hover effects and scale transforms
- Timeline information (year) has been removed from portfolio cards

---

## 4. Case Studies Page (`/case-studies` - `src/app/case-studies/page.tsx`)

| Component/Section                   | Image1                                | Image1 Size         | Image Box Size                                   | Image2 | Image2 Size |
| --- | --- | --- | --- | --- | --- |
| Hero Section - Background           | `/optimized/hs-3.webp`                | 2.35:1 aspect ratio | Full viewport width × min-height 600px (lg size) |        |             |
| BookmarkList - Business Category    | `istockphoto-1358835459-612x612.webp` | 612×612px           | Full card width × 192px (h-48)                   | g-8.webp    | 1216×832px |
| BookmarkList - AI/ML Category       | `kling_20251012_1.png`                | Original dimensions | Full card width × 192px (h-48)                   | g-25.webp   | 1216×832px |
| BookmarkList - Development Category | `istockphoto-1350198816-612x612.jpg`  | 612×612px           | Full card width × 192px (h-48)                   |        |             |
| BookmarkList - E-commerce Category  | `istockphoto-1145868161-612x612.webp` | 612×612px           | Full card width × 192px (h-48)                   | g-10.webp   | 1216×832px |
| BookmarkList - Education Category   | `istockphoto-2227310361-612x612.webp` | 612×612px           | Full card width × 192px (h-48)                   | g-21.webp   | 1216×832px |

**Notes:**
- BookmarkList images use Next.js `Image` component with `fill` and `object-cover`
- Images serve as category-specific placeholders

---

## 5. Our Team Page (`/our-team` - `src/app/our-team/page.tsx`)

| Component/Section | Image1 | Image1 Size | Image Box Size | Image2 | Image2 Size |
|---|---|---|---|---|---|
| Hero Section - Background | `/optimized/hs-4.webp` | 2.35:1 aspect ratio | Full viewport width × min-height 600px (lg size) | | |
| Team Member - William Jiang | `selfies/william-jiang.jpg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - Vicky Zheng | `selfies/vicky-zheng.png` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - Mingchun Hu | `selfies/mingchun-hu.jpg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - Lewis Liu | `selfies/lewis-liu.jpg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - Shamin Yang | `selfies/shaming-yang.jpeg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - Wayne Li | `selfies/wayne-li.jpg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - James Cheung | `selfies/james-cheung.jpeg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - Vince Chen | `selfies/vince-chen.jpg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |
| Team Member - Jack Lu | `selfies/jack-lu.jpg` | Original dimensions | 64px × 64px (w-16 h-16 rounded-full) | | |

**Notes:**
- Team avatars use standard `<img>` tag with `object-cover` and `rounded-full` classes
- Fallback to initials if image fails to load

---

## 7. Testimonials Page (`/testimonials` - `src/app/testimonials/page.tsx`)

| Component/Section | Image1 | Image1 Size | Image Box Size | Image2 | Image2 Size |
|---|---|---|---|---|---|
| Hero Section - Background | `/optimized/hs-7.webp` | 2.35:1 aspect ratio | Full viewport width × min-height 600px (lg size) | | |
| Mission Card - Background | `imgs/grok-1.jpg` | Original dimensions | Full card width × min-height 400px (with overlay) | | |
| Vision Card - Background | `imgs/grok-2.jpg` | Original dimensions | Full card width × min-height 400px (with overlay) | | |
| Testimonial Avatars | Generated via UI Avatars API | 128×128px (default) | 32px × 32px (h-8 w-8) | | |
| Testimonial Avatars (from translations) | `imgs/testimonial-1.jpg`, `imgs/testimonial-2.jpg`, `imgs/testimonial-3.jpg` | Original dimensions | 32px × 32px (h-8 w-8) | | |

**Notes:**
- Mission/Vision cards use background images with opacity overlays (bg-blue-50/80, bg-green-50/80)
- Testimonial avatars in Marquee3D component use Avatar component with fallback initials
- Globe component has been moved from this page to Contact page

---

## 8. Contact Page (`/contact-us` - `src/app/contact-us/page.tsx`)

| Component/Section | Image1 | Image1 Size | Image Box Size | Image2 | Image2 Size |
|---|---|---|---|---|---|
| Hero Section - Background | `/optimized/hs-6.webp` | 2.35:1 aspect ratio | Full viewport width × min-height 600px (lg size) | | |

**Notes:**
- Contact page uses hero background image
- Globe component from MagicUI is displayed in hero section (80% scale, shifted 30% right)
- Google Maps iframe is embedded (not an image asset)

---

## Hero Background Image Solutions

### Current Implementation
Hero section background images use 2.35:1 aspect ratio (21:9) and are displayed using Next.js `Image` component with:
- `fill` prop for responsive sizing
- `object-cover` class to maintain aspect ratio without deformation
- Full viewport width with min-height 600px (lg size)
- Configurable brightness (default 0.8), contrast (default 1.1), and parallax effects
- Minimal overlay for text readability when overlay={false}

### Recommended Solutions

#### Solution 1: Use `bg-contain` (Show Full Image)
**Pros:** Shows entire image without cropping  
**Cons:** May have letterboxing on wide screens

```tsx
// In hero-section.tsx, change bg-cover to bg-contain
className='absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat'
```

#### Solution 2: Tile/Repeat Image (Your Suggestion)
**Pros:** Fills entire width without distortion  
**Cons:** May look repetitive, requires seamless image edges

```tsx
// Change bg-no-repeat to bg-repeat
className='absolute inset-0 w-full h-full bg-cover bg-center bg-repeat-x'
// Or use CSS background-size with percentage
style={{
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: '33.33% 100%', // Tile 3 copies horizontally
  backgroundRepeat: 'repeat-x',
}}
```

#### Solution 3: Use Wider Aspect Ratio Images (Best Long-term)
**Pros:** No distortion, professional look  
**Cons:** Requires re-exporting images

- Use 16:9 (1920×1080px) or 21:9 (2560×1080px) images (2.35:1)
- Crop 4:3 images to 16:9, focusing on center/important content

#### Solution 4: Smart Cropping with `object-position`
**Pros:** Keeps important content visible  
**Cons:** Still crops edges

```tsx
// Use img tag instead of background-image
<img 
  src={backgroundImage}
  className='absolute inset-0 w-full h-full object-cover object-center'
  style={{ objectPosition: 'center top' }} // Adjust as needed
/>
```

#### Solution 5: Parallax/Scale Effect (Current + Enhancement)
**Pros:** Creates depth, hides minor distortion  
**Cons:** May not fully solve distortion

```tsx
// Current implementation already uses scale(1.05)
// Can enhance with parallax on scroll
style={{
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transform: 'scale(1.1)', // Slightly larger scale
  willChange: 'transform',
}}
```

### Recommendation
**For immediate fix:** Use **Solution 2 (Tile/Repeat)** if images have seamless edges, or **Solution 1 (bg-contain)** if showing full image is acceptable.

**For best results:** Use **Solution 3 (Wider Aspect Ratio)** - re-export hero images at 16:9 or 21:9 ratio for modern full-width displays.

---

## Image Source Summary

### ❌ NOT All Images/Videos Are From R2

**Local Public Folder (`/public/`):**
- `/optimized/hs-1.webp` through `hs-8.webp` - Hero background images (served locally, NOT from R2)
  - `hs-1.webp` - Services page
  - `hs-2.webp` - Portfolio page
  - `hs-3.webp` - Case Studies page
  - `hs-4.webp` - Our Team page
  - `hs-5.webp` - (not currently used)
  - `hs-6.webp` - Contact page
  - `hs-7.webp` - Testimonials page
  - `hs-8.webp` - (available, not currently used)
- `/logo.png` - Logo used in Navbar and Footer
- `/placeholder.svg` - Fallback placeholder image

**R2 Storage:**
- All other images and videos are served from R2 bucket

---

## R2 Folder Structure and Page Usage

| R2 Folder/Path | Images | Used On Pages | Component/Section |
|---|---|---|---|
| **`optimized/`** | `b1`, `b2`, `b3` (with .avif/.webp variants) | Home Page | Hero Carousel (3 slides) |
| **`imgs/`** | See detailed breakdown below | Multiple pages | Various sections |
| **`selfies/`** | 9 team member photos | Our Team Page, Team Page | Team Member Avatars |
| **`offices/`** | 3 office images | API Route Only | Office images (not displayed) |
| **`logos/`** | Client/project logos | Team Pages (optional) | Prestige Project logos |
| **Root Level** | `Best IT Consultants.mov` | Home Page | AboutSummary - Video |
| **Root Level** | `Best IT Consultants.jpg` | Home Page | AboutSummary - Poster |
| **Root Level** | `kling_20251012_1.png` | Portfolio Page, Case Studies Page | Portfolio Project (Xperi ML), BookmarkList (AI/ML category) |
| **Root Level** | `kling_20251012_2.png` | Portfolio Page | Portfolio Project (Netherlands Gov) |
| **Root Level** | `istockphoto-1212876953-612x612.jpg` | Portfolio Page, Case Studies Page | Portfolio Project (Credit Suisse, Huawei), BookmarkList placeholder |
| **Root Level** | `istockphoto-1358835459-612x612.webp` | Portfolio Page, Case Studies Page | Portfolio Project (HSBC Banking, GM), BookmarkList (Business category) |
| **Root Level** | `istockphoto-1350198816-612x612.jpg` | Portfolio Page, Case Studies Page | Portfolio Project (HSBC ETL, Aerospace), BookmarkList (Development category) |
| **Root Level** | `istockphoto-2227310361-612x612.webp` | Portfolio Page, Case Studies Page | Portfolio Project (WebMD, Supply Chain), BookmarkList (Education category) |
| **Root Level** | `istockphoto-1145868161-612x612.webp` | Portfolio Page, Case Studies Page | Portfolio Project (BestBuy), BookmarkList (E-commerce category) |
| **Root Level** | `istockphoto-2163952011-612x612.webp` | Portfolio Page | Portfolio Project (FedEx) |
| **Root Level** | `istockphoto-492514758-612x612.webp` | Portfolio Page | Portfolio Project (Tiffany) |
| **`imgs/`** | `grok-1.jpg` | Testimonials Page | Mission Card Background |
| **`imgs/`** | `grok-2.jpg` | Testimonials Page | Vision Card Background |
| **`imgs/`** | `testimonial-1.jpg` | Testimonials Page, Translations | Testimonial Avatar |
| **`imgs/`** | `testimonial-2.jpg` | Testimonials Page, Translations | Testimonial Avatar |
| **`imgs/`** | `testimonial-3.jpg` | Testimonials Page, Translations | Testimonial Avatar |
| **`imgs/og-homepage.jpg`** | N/A | SEO Metadata (not displayed) | Open Graph image for homepage |
| **`imgs/og-team.jpg`** | N/A | SEO Metadata (not displayed) | Open Graph image for team page |
| **`imgs/og-case-studies.jpg`** | N/A | SEO Metadata (not displayed) | Open Graph image for case studies page |
| **`imgs/case-studies/ai-textile-design.jpg`** | N/A | Case Studies Data (not currently displayed) | Case study image |
| **`imgs/case-studies/ecommerce-modernization.jpg`** | N/A | Case Studies Data (not currently displayed) | Case study image |
| **`imgs/case-studies/ai-logistics.jpg`** | N/A | Case Studies Data (not currently displayed) | Case study image |
| **`selfies/`** | `william-jiang.jpg` | Our Team Page, Team Page, Translations | Team Member Avatar |
| **`selfies/`** | `vicky-zheng.png` | Our Team Page, Team Page | Team Member Avatar |
| **`selfies/`** | `mingchun-hu.jpg` | Our Team Page, Team Page | Team Member Avatar |
| **`selfies/`** | `lewis-liu.jpg` | Our Team Page, Team Page, Translations | Team Member Avatar |
| **`selfies/`** | `shaming-yang.jpeg` | Our Team Page, Team Page, Translations | Team Member Avatar |
| **`selfies/`** | `wayne-li.jpg` | Our Team Page, Team Page, Translations | Team Member Avatar |
| **`selfies/`** | `james-cheung.jpeg` | Our Team Page, Team Page, Translations | Team Member Avatar |
| **`selfies/`** | `vince-chen.jpg` | Our Team Page, Team Page | Team Member Avatar |
| **`selfies/`** | `jack-lu.jpg` | Our Team Page, Team Page | Team Member Avatar |
| **`offices/`** | `gemini-1.png` | API Route Only (`/api/offices`) | Office image (not displayed on pages) |
| **`offices/`** | `gemini-2.png` | API Route Only (`/api/offices`) | Office image (not displayed on pages) |
| **`offices/`** | `kling-1.jpg` | API Route Only (`/api/offices`) | Office image (not displayed on pages) |
| **`logos/`** | Various client/project logos | Team Pages (Prestige Projects), Cache Headers | Project/Company logos for prestige projects (optional field) |

**Notes:**
- **`logos/` folder**: Referenced in cache headers (`/logos/`) for static image caching. Used for prestige project logos in team member profiles (optional `logo` field in `PrestigeProject` interface). Folder exists in R2 bucket but no active image paths found in current codebase.
- **`offices/` folder**: Images are only accessible via API route (`/api/offices`) and not currently displayed on any page.

---

## Additional Notes

1. **Image Format Variants**: Hero carousel images support multiple formats (.avif, .webp) for optimization
2. **Placeholder Fallback**: `/placeholder.svg` is used as fallback in OptimizedImage component (local file)
3. **Logo**: `/logo.png` is used in Navbar and Footer components (local file, not page-specific)
4. **OG Images**: `imgs/og-homepage.jpg`, `imgs/og-team.jpg`, `imgs/og-case-studies.jpg` (used in metadata, not displayed on pages)
5. **R2 URL Configuration**: All R2 image URLs are dynamically generated using `getR2ImageUrl()` function from `@/lib/utils`, which reads from `R2_PUBLIC_URL` or `NEXT_PUBLIC_R2_PUBLIC_URL` environment variables.
6. **Local vs R2**: Hero background images (`hs-1.webp` through `hs-8.webp`) are served from `/public/optimized/` folder locally, NOT from R2. All other images/videos are from R2.
7. **Hero Section Implementation**: All hero sections (except home page) use background images with 2.35:1 aspect ratio, configurable brightness/contrast, and optional parallax effects. No gradient overlays by default, only minimal overlay for text readability.
8. **Globe Component**: MagicUI Globe component is displayed on Contact page hero section (80% scale, positioned 30% right from center).
9. **Offices Folder**: The `offices/` folder contains images that are only accessible via API route (`/api/offices`) and are not currently displayed on any page.
10. **Case Studies Images**: Images in `imgs/case-studies/` folder are defined in data files but may not be actively displayed on the case studies page (check component implementation).
