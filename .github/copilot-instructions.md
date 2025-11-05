# Copilot Instructions for BestIT Consultants

## Project Overview
- **Framework:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Purpose:** Corporate website for BestIT Consultants, showcasing services, team, portfolio, and case studies.
- **Key Features:** Responsive design, SEO, accessibility, contact form (Resend integration), performance optimization.

## Architecture & Structure
- **App Router:** All pages and API endpoints are under `src/app/`.
  - API endpoints: `src/app/api/*` (team, case-studies, services, content, seo, images, contact)
  - Pages: `src/app/{about,case-studies,contact,our-work,services,team}`
- **Components:** Modular UI in `src/components/` (organized by domain: case-studies, common, home, seo, services, team, ui).
- **Data:** Static fixtures in `src/data/` (case studies, content sections, team members, etc.).
- **Services:** Data/service logic in `src/services/` (e.g., `caseStudyService.ts`, `image-service.ts`).
- **Types:** Shared TypeScript types in `src/types/`.
- **Docs:** Technical and integration guides in `docs/`.

## Developer Workflows
- **Install:** `npm install`
- **Dev Server:** `npm run dev` (Next.js)
- **Build:** `npm run build`
- **Lint:** `npm run lint` / `npm run lint:fix`
- **Format:** `npm run format` (Prettier)
- **Type Check:** `npm run type-check`
- **Quality Check:** `npm run check-all`
- **Deploy:** `npx vercel --prod` (Vercel recommended)

## Contact Form (Resend Integration)
- **API:** `src/app/api/contact/`
- **Env Vars:** `RESEND_API_KEY`, `BUSINESS_EMAIL` (see `docs/CONTACT_SETUP.md`)
- **Email Logic:**
  - Sends business notification and customer auto-reply
  - Fallback to `onboarding@resend.dev` if custom domain fails
  - See [docs/CONTACT_SETUP.md](../docs/CONTACT_SETUP.md) for flowchart and details

## Patterns & Conventions
- **TypeScript:** All logic and components are typed; types in `src/types/`
- **Component Organization:** Domain-driven folders under `src/components/`
- **Data Flow:** Static data in `src/data/`, dynamic via API endpoints/services
- **Error Handling:** API endpoints return structured errors (400/500)
- **SEO:** Metadata via `src/app/api/seo/` and components in `src/components/seo/`
- **Accessibility:** WCAG 2.1 AA compliance for UI components
- **Performance:** Use `lib/performance.ts`, `lib/image-optimization.ts` for optimizations

## External Integrations
- **Resend:** Email delivery for contact form
- **Vercel:** Deployment
- **Google Maps:** Contact page (see `docs/GOOGLE_MAPS.md`)

## Examples
- **Add a new service:**
  - Update `src/data/serviceCategories.ts`
  - Add logic to `src/services/serviceCategoryService.ts`
  - Update UI in `src/components/services/`
- **Add a team member:**
  - Update `src/data/teamMembers.ts`
  - Update UI in `src/components/team/`

## References
- **README.md:** Project overview, setup, scripts
- **docs/CONTACT_SETUP.md:** Contact form/email integration
- **docs/GOOGLE_MAPS.md:** Maps integration
- **src/app/api/**: API endpoint patterns
- **src/components/**: UI conventions

---
**For unclear or missing conventions, review README and docs, or ask for clarification.**
