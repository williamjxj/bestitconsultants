<!-- Sync Impact Report:
Version change: 1.1.0 → 1.2.0
Modified principles: N/A (no changes to existing principles)
Added sections: Team Structure Standards, Homepage Layout Requirements, Enhanced Service Categories, Case Study Standards
Removed sections: N/A
Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md
Follow-up TODOs: None
-->

# BestIT Consulting Website Constitution

## Core Principles

### I. Component-First Architecture
Every feature MUST be built as reusable, self-contained React components. Components MUST be independently testable, documented with TypeScript interfaces, and follow the established component hierarchy (common/, home/, layout/, ui/). No component should exist without a clear purpose and reusability potential.

### II. TypeScript-First Development
All code MUST be written in TypeScript with strict type checking enabled. No `any` types allowed without explicit justification. Interfaces MUST be defined for all data structures, API responses, and component props. Type safety is non-negotiable for maintainability and developer experience.

### III. Test-Driven Development (NON-NEGOTIABLE)
TDD is mandatory for all features: Tests written → User approved → Tests fail → Then implement. Red-Green-Refactor cycle strictly enforced. Unit tests for components, integration tests for API routes, and end-to-end tests for user workflows.

### IV. Performance-First Web Standards
All pages MUST achieve Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1. Images MUST be optimized with Next.js Image component. Code splitting MUST be implemented for route-based chunks. No JavaScript bundles over 250KB without justification.

### V. Accessibility & SEO Compliance
All components MUST meet WCAG 2.1 AA standards. Semantic HTML required. ARIA labels mandatory for interactive elements. Meta tags, structured data, and sitemap generation MUST be implemented for all pages.

### VI. Business-First Content Strategy
All content MUST align with BestIT's core value proposition: "Canadian Quality, Global Talent." Content MUST emphasize AI-driven solutions, cost-effective outsourcing, and enterprise-grade consulting. Every page MUST include measurable outcomes and clear calls-to-action for consultation requests.

### VII. Global Network Integration
All team and service content MUST reflect the global network model: Canadian leadership with Asian talent. Content MUST showcase the collaboration between William Jiang (founder), Shamin Yang, Lewis Liu, and extended global experts. Partnership highlights with Aochuang Intelligence and Chengdu Zhanying Technology MUST be prominently featured.

## Web Development Standards

### Technology Stack Requirements
- **Framework**: Next.js 15+ with App Router (mandatory)
- **Styling**: Tailwind CSS with component-based design system
- **UI Components**: Radix UI primitives with custom styling
- **Email Service**: Resend for contact form integration
- **Deployment**: Vercel-optimized build configuration

### Code Quality Gates
- ESLint with zero warnings allowed
- Prettier formatting enforced
- TypeScript strict mode enabled
- Markdown linting for documentation
- All quality checks must pass before merge

## Quality Assurance

### Testing Requirements
- Unit tests for all utility functions and custom hooks
- Component tests for all UI components using React Testing Library
- Integration tests for API routes and form submissions
- Visual regression tests for critical user flows
- Performance testing for Core Web Vitals compliance

### Documentation Standards
- README.md with complete setup instructions
- Component documentation with usage examples
- API documentation for all endpoints
- Deployment guides for production environments
- Code comments for complex business logic

## Performance Standards

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5 seconds

### Optimization Requirements
- Image optimization with Next.js Image component
- Code splitting for route-based chunks
- Lazy loading for below-the-fold content
- CDN optimization for static assets
- Bundle size monitoring and alerts

## Business Strategy Standards

### Core Value Proposition
- **Primary Message**: "Empowering businesses with elite IT consulting, outsourcing solutions, and AI innovation"
- **SEO Tagline**: "Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent"
- **Differentiation**: Canadian leadership with global talent network for cost-effective, high-quality solutions

### Service Categories (MANDATORY)
All services MUST be categorized under these five areas:
1. **AI & Machine Learning Solutions** - Custom AI/LLM applications, MLOps, ChatBI
2. **Full-Stack Web & Mobile Development** - React, Node.js, Python, Java, databases
3. **Enterprise Systems & Automation** - Microsoft stack, RPA, system integration
4. **Specialized CAD/BIM/CAE Solutions** - Engineering software, AI for design
5. **IT Outsourcing Models** - Dedicated teams, project-based, hybrid collaboration

### Content Requirements
- Every service page MUST include SEO-optimized taglines
- Case studies MUST include measurable outcomes (e.g., "90% proposal acceptance rate")
- Team profiles MUST highlight global network collaboration
- Contact forms MUST emphasize "Get a Free Consultation" as primary CTA

## Content & SEO Standards

### SEO Keywords (MANDATORY)
All content MUST target these primary keywords:
- IT Outsourcing Canada
- AI Consulting Services
- Global Software Development
- Full-Stack Development Outsourcing
- AI-Powered Enterprise Solutions
- CAD/BIM Software Consulting
- RPA & Workflow Automation
- Offshore Development Teams

### Page Structure Requirements
- **Home**: Hero statement, CTA, expertise highlights
- **About Us**: Mission, global network, Canadian leadership story
- **Services**: Five service categories with SEO taglines
- **Case Studies**: Measurable results and client outcomes
- **Team**: Core team + global network + strategic partners
- **Contact**: Consultation form with clear CTAs

### Content Quality Gates
- All content MUST be written for business stakeholders, not developers
- Every page MUST include measurable outcomes where applicable
- Testimonials MUST be specific and results-oriented
- Case studies MUST include before/after metrics
- Team profiles MUST emphasize expertise and global collaboration

## Team Structure Standards

### Core Team Requirements (MANDATORY)
All team pages MUST include these core members with detailed profiles:

**William Jiang (Founder, Vancouver, Canada)**
- **Title**: AI Consultant, Full Stack Engineer
- **Experience**: 20+ years global experience in full-stack development, software architecture, AI-driven solutions
- **Achievements**: Significant contributor to award-winning FedEx project
- **Services**: Modernizes development platforms with AI-assisted tools, React.js, Node.js, Python, LangChain, Hugging Face
- **Specialization**: Python-based, Kafka-driven microservices in cloud environments

**Shamin Yang (Senior Software Engineer, Guangzhou, China)**
- **Title**: Senior Software Engineer / Solution Architect
- **Experience**: 20+ years in .NET development, MSCT and PMP certified
- **Achievements**: HSBC HTC 2021 award winner, delivered advanced features independently
- **Services**: .NET-based web/windows app development, RPA and automation scripting, database migration
- **Specialization**: System integration (Biztalk, MSMQ, SSIS), CI/CD setup and DevOps

**Lianghua (Lewis) Liu (Software Architect, Beijing, China)**
- **Title**: Software Architect/Programmer
- **Experience**: 26+ years in BIM/CAD/CAE, patent authorization holder
- **Achievements**: Golden Idea Award, 4 books/10+ articles published, expert in Shenzhen Construction Standards Society
- **Services**: CAD/BIM/CAE software development, AI+CAD integration, geometry modeling
- **Specialization**: Parallel computing, parametric modeling, 3D printing/mold development

### Extended Global Network (MANDATORY)
All team pages MUST include these strategic partners:

**James Chueng (Full-Stack Engineer, Hong Kong)**
- **Services**: Full-stack development for web and AI projects, React, Next.js, Angular, Node.js
- **Specialization**: NLP, LLM (LangChain), TensorFlow, JavaScript frameworks

**Ming Chun Hu (Lead Software Developer, Chengdu, China)**
- **Company**: Chengdu Zhanying Technology Co., Ltd.
- **Services**: Custom software development, OA/ERP/MES/EKP systems, mobile app development
- **Specialization**: High-end custom development for mobile (Android/iOS) and embedded systems

**Wayne Li (AI Solutions Architect, Shenzhen, China)**
- **Company**: Aochuang Intelligent Technology Co., Ltd.
- **Services**: AI productivity engine, intelligent interaction solutions, customized AI solutions
- **Specialization**: Government and enterprise AI solutions, model fine-tuning, knowledge base building

## Homepage Layout Requirements

### Hero Section (MANDATORY)
- **Background**: Gradient from blue-600 to indigo-700
- **Main Headline**: "Empowering Businesses with Elite IT Consulting & AI Innovation"
- **Subtitle**: "Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent"
- **CTA Button**: "Get a Free Consultation" (white background, blue text, rounded-2xl)
- **Layout**: Centered text, max-width 2xl, responsive typography (text-4xl md:text-6xl)

### Quick Highlights Section (MANDATORY)
Three-column grid with these exact highlights:
1. **"20+ Years Experience"** - Full-stack and AI expertise trusted by global enterprises
2. **"Cost-Effective Outsourcing"** - Scale quickly with top-tier global engineering teams
3. **"Enterprise-Grade AI"** - Cloud, automation, and AI-driven business transformation

### Testimonials Section (MANDATORY)
- **Background**: Gray-50 background
- **Title**: "What Our Clients Say"
- **Layout**: Three-column grid with these exact testimonials:
  - Ms. Zhang, Textile Director: "AI-assisted design completely changed our process..."
  - Ms. Wang, Hotel Procurement: "The team's responsiveness is impressive..."
  - Mr. Chen, Fashion Magazine Editor: "AI brings fresh ideas every season..."

### Footer Requirements (MANDATORY)
- **Background**: Indigo-900
- **Tagline**: "Trusted by enterprises worldwide for AI innovation and IT outsourcing"
- **Navigation**: Privacy Policy, Sitemap, Contact links
- **Copyright**: "© {current year} Best IT Consulting Inc. All rights reserved"

## Enhanced Service Categories

### AI & Machine Learning Solutions (MANDATORY)
**SEO Tagline**: "Harness AI to automate workflows, unlock insights, and innovate faster."
- Custom AI/LLM Applications (LangChain, Hugging Face, RAG)
- Generative AI & Workflow Automation (ComfyUI, Stable Diffusion)
- MLOps & Data Pipelines (Kubernetes, Docker, AWS)
- ChatBI & Enterprise Assistants for data-driven insights

### Full-Stack Web & Mobile Development (MANDATORY)
**SEO Tagline**: "Modern, scalable, and user-friendly apps for web and mobile."
- Frontend: React.js, Material-UI, Redux, Vue, Angular
- Backend: Node.js, Python, Java, Microservices
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- Mobile Apps: Native & cross-platform

### Enterprise Systems & Automation (MANDATORY)
**SEO Tagline**: "Enterprise-grade automation to streamline business operations."
- Microsoft Stack: .NET, ASP.NET, Blazor, WCF
- System Integration & ETL: BizTalk, MSMQ
- Robotic Process Automation (RPA): UiPath, BluePrism, Workfusion

### Specialized CAD/BIM/CAE Solutions (MANDATORY)
**SEO Tagline**: "Next-gen CAD/BIM engineering powered by AI and HPC."
- CAD/CAE Architecture (Parasolid, OCC, ACIS)
- AI for Engineering (feature recognition, design retrieval)
- High-Performance Algorithms (C++, OpenMP)

### IT Outsourcing Models (MANDATORY)
**SEO Tagline**: "Flexible IT outsourcing – scale teams quickly and reduce costs."
- Dedicated Teams
- Project-Based Outsourcing
- Hybrid Collaboration

## Case Study Standards

### Required Case Studies (MANDATORY)
All case studies MUST include these specific examples with measurable outcomes:

**AI-Powered Transformation in Textile Design**
- **Results**: Reduced design cycle from 12 weeks → 4–6 days
- **Impact**: Boosted creativity by 10x, increased acceptance rate to 90%
- **Technology**: AI-assisted design, creative style exploration

**HSBC ETL Platform (Shamin Yang)**
- **Results**: Automated ETL processes with .NET and RPA
- **Impact**: Improved compliance and reduced manual workload
- **Technology**: .NET, RPA automation, system integration

**Advanced CAD/BIM Modeling (Lewis Liu)**
- **Results**: Developed parallel computing algorithms for CAD
- **Impact**: Improved modeling performance and precision
- **Technology**: Parallel computing, geometry kernels, AI+CAD

### Case Study Content Requirements
- **Measurable Outcomes**: Every case study MUST include specific metrics
- **Before/After Metrics**: Show clear improvement in efficiency, cost, or performance
- **Technology Stack**: Specify exact technologies and tools used
- **Client Results**: Include client testimonials with specific outcomes
- **SEO Blurb**: "Real results: 90% proposal acceptance rate, 30% repeat client growth, and faster innovation cycles"

## Governance

This constitution supersedes all other development practices. Amendments require:
1. Documentation of the change rationale
2. Impact assessment on existing codebase
3. Migration plan for breaking changes
4. Approval from project maintainers

All pull requests MUST verify compliance with these principles. Complexity additions MUST be justified with business value. Use `.specify/templates/` for structured development guidance.

**Version**: 1.2.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
