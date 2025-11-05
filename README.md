# BestIT Consultants - Corporate Website

A modern, professional website for BestIT Consultants showcasing our software development and
digital transformation services.

## Visual Overview

- [Gamma Presentation (PPT)](https://gamma.app/docs/Best-IT-Consultants-Elite-Enterprise-Architects-Startup-Speed-1v8t3nud1ghb4iq)


## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Contact Form**: Professional email integration with Resend service
- **Portfolio Showcase**: Interactive project gallery with filtering
- **Enhanced Team Profiles**: Professional team member presentations with prestige projects
- **Case Studies**: Detailed success stories with measurable outcomes
- **Our Work Page**: External project showcase with bookmark-style presentation
- **Enhanced Hero Section**: Professional messaging with quick highlights
- **Performance Optimized**: Fast loading with modern web standards
- **SEO Optimized**: Structured data, sitemap, and robots.txt
- **Accessibility**: WCAG 2.1 AA compliant components
- **Documentation**: Comprehensive technical documentation

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI, Lucide React icons
- **Email Service**: Resend for contact form
- **Development**: ESLint, Prettier, Markdown linting

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About us page
│   ├── api/               # API endpoints
│   │   ├── team/          # Team member API
│   │   ├── case-studies/  # Case studies API
│   │   ├── services/      # Services API
│   │   ├── content/       # Content API
│   │   ├── seo/           # SEO metadata API
│   │   ├── images/        # Image proxy API
│   │   └── contact/       # Contact form API
│   ├── case-studies/      # Case studies page
│   ├── contact/           # Contact page
│   ├── our-work/          # Our work showcase
│   ├── services/          # Services overview
│   ├── team/              # Team profiles
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # Reusable UI components
│   ├── case-studies/      # Case study components
│   ├── common/           # Shared components (Navbar, Footer)
│   ├── home/             # Homepage sections
│   ├── seo/              # SEO components
│   ├── services/         # Service components
│   ├── team/             # Team components
│   └── ui/               # Base UI components
├── contexts/             # React contexts
├── data/                 # Static data fixtures
├── lib/                  # Utilities, translations, and core services
├── services/             # Data services
└── types/                # TypeScript type definitions

docs/                     # Project documentation
├── README.md             # Documentation index
├── api.md               # API documentation
├── components.md        # Component reference
├── deployment.md        # Deployment guide
└── ...                  # Additional guides
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/williamjxj/bestitconsultants.git
   cd bestitconsultants
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:

   ```env
   RESEND_API_KEY=your_resend_api_key
   BUSINESS_EMAIL=your_business_email@domain.com
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser** Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Contact Form Setup

The contact form uses Resend for email delivery:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add `RESEND_API_KEY` to your `.env` file
4. Set `BUSINESS_EMAIL` to your business email address

**Email Flow:**

- Business notifications → Your business email
- Customer auto-replies → Customer's email
- Professional templates with company branding

## 🏗️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript checks
npm run check-all    # Run all quality checks
```

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Markdown Lint**: Documentation consistency

## 📱 Pages Overview

- **Home**: Enhanced hero section, quick highlights, services summary, portfolio preview
- **About**: Company overview, mission, vision, values, team statistics
- **Services**: Comprehensive service catalog with enhanced categories
- **Our Work**: External project showcase with bookmark-style presentation
- **Case Studies**: Detailed success stories with measurable outcomes and metrics
- **Team**: Enhanced team member profiles with prestige projects and achievements
- **Contact**: Contact form with Google Maps integration

## 🌐 Deployment

### Vercel (Recommended)

```bash
npx vercel --prod
```

### Other Platforms

The app builds to a standard Next.js production bundle compatible with:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Traditional hosting with Node.js support

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Documentation Index](docs/README.md)** - Complete documentation index
- **[API Reference](docs/api.md)** - All API endpoints
- **[Component Guide](docs/components.md)** - UI components reference
- **[Deployment Guide](docs/deployment.md)** - Production deployment
- **[Contact Setup](docs/CONTACT_SETUP.md)** - Email integration
- **[DNS Configuration](docs/HOSTINGER_VERCEL_DNS_CONFIG.md)** - Domain setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is proprietary software owned by BestIT Consultants Ltd.

## 🧹 Recent Cleanup

The codebase has been cleaned up to remove unused code and fix issues:

- **Fixed malformed R2 URLs**: Corrected concatenated Cloudflare R2 URLs throughout the codebase
- **Removed unused scripts**: Cleaned up one-time migration scripts from `/scripts` directory
- **Removed unused tests**: Eliminated test files that were not configured to run
- **Removed unused services**: Deleted unused service files like `media-service.ts`
- **Removed unused lib files**: Cleaned up complex system files that were planned but not
  implemented
- **Updated documentation**: Refreshed README and specs to reflect current state

## 📞 Support

For technical support or questions:

- **Email**: williamjxj@gmail.com
- **Phone**: +1 (236) 992-3846
- **Address**: 10355 152 St, Surrey, BC, Canada V3R 7C1

---

**BestIT Consultants** - Delivering Excellence Through Technology

This project is licensed under the MIT License. See the LICENSE file for details.
