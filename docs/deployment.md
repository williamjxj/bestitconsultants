# Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the BestIT Consulting website.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Vercel account (recommended) or other hosting platform

## Environment Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd bestitconsulting
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Keys (if using external services)
ANTHROPIC_API_KEY=your_anthropic_key
PERPLEXITY_API_KEY=your_perplexity_key
OPENAI_API_KEY=your_openai_key

# Database (if using external database)
DATABASE_URL=your_database_url

# Other environment variables
NEXT_PUBLIC_SITE_URL=https://bestitconsulting.com
```

## Development

### 1. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### 2. Build for Production

```bash
npm run build
# or
yarn build
```

### 3. Start Production Server

```bash
npm start
# or
yarn start
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Environment Variables**:

   - Go to Project Settings > Environment Variables
   - Add all required environment variables

3. **Deploy**:
   - Vercel will automatically deploy on every push to main branch
   - Custom domains can be configured in Project Settings

### Option 2: Netlify

1. **Connect Repository**:

   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your repository

2. **Build Settings**:

   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**:
   - Go to Site Settings > Environment Variables
   - Add all required environment variables

### Option 3: AWS Amplify

1. **Connect Repository**:

   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" > "Host web app"
   - Connect your repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Base directory: `/`
   - Build output directory: `.next`

### Option 4: Docker

1. **Create Dockerfile**:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build and Run**:

```bash
docker build -t bestitconsulting .
docker run -p 3000:3000 bestitconsulting
```

## Performance Optimization

### 1. Image Optimization

- All images are automatically optimized by Next.js
- Use WebP and AVIF formats when possible
- Implement lazy loading for below-the-fold images

### 2. Bundle Optimization

- Code splitting is implemented for all pages
- Dynamic imports are used for heavy components
- Bundle analyzer can be used to identify optimization opportunities

### 3. Caching

- Static assets are cached by CDN
- API responses can be cached using Next.js caching strategies
- Implement Redis caching for frequently accessed data

## Monitoring and Analytics

### 1. Performance Monitoring

- Core Web Vitals are monitored automatically
- Performance metrics are logged to console in development
- Consider implementing real-time monitoring in production

### 2. Error Tracking

- Implement error tracking service (e.g., Sentry)
- Monitor API errors and client-side errors
- Set up alerts for critical errors

### 3. Analytics

- Google Analytics can be integrated
- Custom event tracking for user interactions
- Conversion tracking for contact forms

## Security Considerations

### 1. Environment Variables

- Never commit sensitive environment variables
- Use different values for development and production
- Rotate API keys regularly

### 2. HTTPS

- Ensure all traffic is served over HTTPS
- Configure proper SSL certificates
- Implement HSTS headers

### 3. Security Headers

- Implement Content Security Policy (CSP)
- Set X-Frame-Options header
- Configure X-Content-Type-Options

## Backup and Recovery

### 1. Database Backups

- Regular automated backups of any databases
- Test backup restoration procedures
- Store backups in multiple locations

### 2. Code Backups

- Use Git for version control
- Regular pushes to remote repository
- Tag releases for easy rollback

## Troubleshooting

### Common Issues

1. **Build Failures**:

   - Check Node.js version compatibility
   - Clear node_modules and reinstall dependencies
   - Check for TypeScript errors

2. **Environment Variables**:

   - Verify all required variables are set
   - Check variable names and values
   - Ensure variables are available at build time

3. **Performance Issues**:
   - Monitor Core Web Vitals
   - Check bundle size
   - Optimize images and assets

### Debug Mode

Enable debug mode by setting:

```env
NODE_ENV=development
DEBUG=true
```

## Maintenance

### 1. Regular Updates

- Keep dependencies updated
- Monitor security advisories
- Test updates in staging environment

### 2. Performance Monitoring

- Regular performance audits
- Monitor Core Web Vitals
- Optimize based on real user metrics

### 3. Content Updates

- Regular content updates
- SEO optimization
- User feedback incorporation
