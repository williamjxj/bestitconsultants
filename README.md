# BestIT Consulting - Corporate Website

A modern, professional website for BestIT Consulting showcasing our software development and digital
transformation services.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Contact Form**: Professional email integration with Resend service
- **Portfolio Showcase**: Interactive project gallery with filtering
- **Team Profiles**: Professional team member presentations
- **Multi-language Ready**: Internationalization support structure
- **Performance Optimized**: Fast loading with modern web standards

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
│   ├── api/contact/       # Contact form API endpoint
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio showcase
│   ├── services/          # Services overview
│   ├── team/              # Team profiles
│   └── testimonials/      # Client testimonials
├── components/            # Reusable UI components
│   ├── common/           # Shared components (Navbar, Footer)
│   ├── home/             # Homepage sections
│   └── ui/               # Base UI components
├── contexts/             # React contexts
├── lib/                  # Utilities and translations
└── types/                # TypeScript type definitions
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

- **Home**: Hero section, services summary, testimonials preview
- **About**: Company overview, mission, vision, values
- **Services**: Comprehensive service catalog
- **Portfolio**: Project showcase with interactive filtering
- **Team**: Professional team member profiles
- **Contact**: Contact form with Google Maps integration
- **Testimonials**: Client feedback and case studies

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is proprietary software owned by BestIT Consulting Ltd.

## 📞 Support

For technical support or questions:

- **Email**: williamjxj@gmail.com
- **Phone**: +1 (236) 992-3846
- **Address**: 9727 152B Street, Surrey, BC V3R 0G5, Canada

---

**BestIT Consulting** - Delivering Excellence Through Technology

This project is licensed under the MIT License. See the LICENSE file for details.
