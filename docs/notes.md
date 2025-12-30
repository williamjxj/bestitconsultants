## supabase

- jxjwilliam@gmail.com, cursor-app

## resend, vercel, github

- williamjxj@gmail.com, @resend.dev, @bestitconsultants.ca

## Hero Section & Content Improvements (2025-11-26)

### Hero Section Enhancements

- **Typography**: Increased font sizes with responsive scaling (text-3xl to text-6xl for titles)
- **Buttons**: Enhanced with rounded-full design, improved hover effects (scale 1.08, y: -2), arrow icons, and better shadows
- **Spacing**: Improved margins and padding for better visual hierarchy
- **Animations**: Smoother transitions and hover states
- **Font Size Adjustment**: Reduced from xl:text-8xl to lg:text-6xl to fit within hero section viewport

### Color Changes Applied to Main Content Sections

- **Headings (h1, h2, h3)**: `rgb(53, 17, 69)` - dark purple
- **Subtitles**: `rgb(53, 17, 69)` - dark purple
- **Paragraphs**: `rgb(75, 30, 90)` - lighter purple for better readability

**Applied to:**

- Home page components (AboutSummary, ServicesSummary, PortfolioPreview, QuickHighlights, TestimonialsPreview)
- Services page (all main content sections)
- Portfolio page (project descriptions, stats)
- Contact page (form sections, location info)
- Case Studies page (stats, project descriptions)

**Excluded (as requested):**

- Hero sections (kept white/gradient text)
- Navigation bars
- Footer bars
- Buttons and CTAs
- Animated text (AnimatedTitle component)

### CSS Classes Added

- `.main-content-title` - for main section titles
- `.main-content-subtitle` - for subtitles
- `.main-content-paragraph` - for paragraph text
- Updated `.section-title` and `.section-subtitle` with new colors
