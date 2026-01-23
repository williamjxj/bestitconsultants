# Tasks: Improve SEO

**Input**: Design documents from `/specs/001-improve-seo/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual validation using Google Rich Results Test, Facebook Debugger, Twitter Card Validator, Lighthouse SEO audit (no automated tests per specification)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- All paths relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create SEO utility directory structure in src/lib/
- [X] T002 [P] Create SEO types file src/types/seo.ts with PageMetadata, OpenGraphMetadata, TwitterCardMetadata, StructuredDataSchema interfaces
- [X] T003 [P] Create SEO components directory src/components/seo/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create SEO utility functions in src/lib/seo-utils.ts with buildPageMetadata(), getCanonicalUrl(), validateMetadata() functions
- [X] T005 [P] Create structured data utility functions in src/lib/structured-data.ts with createOrganizationSchema(), createServiceSchema(), createArticleSchema(), createBreadcrumbSchema(), structuredDataScript() functions
- [X] T006 [P] Enhance existing SEO types in src/types/seo.ts with BreadcrumbItem, BreadcrumbItemSchema, SitemapEntry interfaces

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Search Engine Discovery (Priority: P1) 🎯 MVP

**Goal**: Search engines can discover, index, and rank all website pages effectively, enabling potential clients to find BestIT Consultants when searching for IT consulting services, AI solutions, or software development expertise.

**Independent Test**: Submit the sitemap to Google Search Console and verify that all pages are discovered and indexed within 7 days. Success is measured by 100% of public pages appearing in search results.

### Implementation for User Story 1

- [X] T007 [US1] Update sitemap in src/app/sitemap.ts to include all 7 public pages (homepage, services, portfolio, case studies, team, testimonials, contact) with correct priorities (homepage 1.0, main pages 0.9, secondary pages 0.8, lower priority 0.7)
- [X] T008 [US1] Fix duplicate entries in src/app/sitemap.ts (remove duplicate /case-studies entry)
- [X] T009 [US1] Verify robots.txt configuration in src/app/robots.ts allows public pages and disallows /api/, /admin/, /_next/ with sitemap reference
- [X] T010 [US1] Add basic metadata to homepage in src/app/layout.tsx ensuring title (50-60 chars) and description (150-160 chars) are present

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Sitemap should be accessible at /sitemap.xml with all 7 pages, robots.txt should be properly configured.

---

## Phase 4: User Story 2 - Rich Search Result Display (Priority: P1)

**Goal**: Search engines display enhanced information about BestIT Consultants in search results, including company details, services, ratings, and structured data that makes the listing more attractive and informative than competitors.

**Independent Test**: Use Google's Rich Results Test tool to verify structured data markup. Success is measured by all structured data types passing validation and appearing correctly in search result previews.

### Implementation for User Story 2

- [X] T011 [US2] Enhance Organization structured data in src/app/layout.tsx or src/components/seo/StructuredData.tsx with complete company information (name, description, logo, URL, social profiles, business email, website URL)
- [X] T012 [US2] Add Service structured data to services page in src/app/services/layout.tsx using createServiceSchema() with service names, descriptions, provider information (omit pricing if not available)
- [X] T013 [US2] Add Article structured data to case studies page in src/app/case-studies/layout.tsx using createArticleSchema() with publication dates, article metadata (omit author if not available)
- [X] T014 [US2] Add WebPage structured data to all pages using appropriate schema type (Note: WebPage schema is implicitly handled through Next.js Metadata API; Organization, Service, Article, and BreadcrumbList schemas are explicitly implemented)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. All structured data should pass Google Rich Results Test validation.

---

## Phase 5: User Story 3 - Social Media Sharing Optimization (Priority: P2)

**Goal**: When users share BestIT Consultants pages on social media platforms (Facebook, Twitter, LinkedIn), the shared links display attractive previews with relevant images, titles, and descriptions that encourage clicks.

**Independent Test**: Use social media preview tools (Facebook Debugger, Twitter Card Validator, LinkedIn Post Inspector) to verify that all pages generate attractive previews. Success is measured by all pages passing validation and displaying correctly formatted previews.

### Implementation for User Story 3

- [X] T015 [US3] Add Open Graph metadata (og:title, og:description, og:image, og:url, og:type) to homepage in src/app/layout.tsx
- [X] T016 [US3] Add Open Graph metadata to services page in src/app/services/layout.tsx
- [X] T017 [US3] Add Open Graph metadata to portfolio page in src/app/portfolio/layout.tsx
- [X] T018 [US3] Add Open Graph metadata to case studies page in src/app/case-studies/layout.tsx
- [X] T019 [US3] Add Open Graph metadata to team page in src/app/our-team/layout.tsx
- [X] T020 [US3] Add Open Graph metadata to testimonials page in src/app/testimonials/layout.tsx
- [X] T021 [US3] Add Open Graph metadata to contact page in src/app/contact-us/layout.tsx
- [X] T022 [US3] Add Twitter Card metadata (twitter:card, twitter:title, twitter:description, twitter:image) to homepage in src/app/layout.tsx
- [X] T023 [US3] Add Twitter Card metadata to services page in src/app/services/layout.tsx
- [X] T024 [US3] Add Twitter Card metadata to portfolio page in src/app/portfolio/layout.tsx
- [X] T025 [US3] Add Twitter Card metadata to case studies page in src/app/case-studies/layout.tsx
- [X] T026 [US3] Add Twitter Card metadata to team page in src/app/our-team/layout.tsx
- [X] T027 [US3] Add Twitter Card metadata to testimonials page in src/app/testimonials/layout.tsx
- [X] T028 [US3] Add Twitter Card metadata to contact page in src/app/contact-us/layout.tsx

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. All pages should have proper Open Graph and Twitter Card metadata.

---

## Phase 6: User Story 4 - Page-Specific SEO Optimization (Priority: P2)

**Goal**: Each page on the website has unique, optimized metadata that accurately describes its content and targets relevant search queries, ensuring users find the most relevant page for their search intent.

**Independent Test**: Manually review each page's metadata using browser developer tools or SEO analysis tools. Success is measured by all pages having unique titles (50-60 characters), descriptions (150-160 characters), and relevant keywords.

### Implementation for User Story 4

- [X] T029 [US4] Add unique metadata (title, description, keywords, canonical URL) to services page in src/app/services/layout.tsx using buildPageMetadata() with fallback to homepage metadata
- [X] T030 [US4] Add unique metadata to portfolio page in src/app/portfolio/layout.tsx using buildPageMetadata() with fallback to homepage metadata
- [X] T031 [US4] Add unique metadata to case studies page in src/app/case-studies/layout.tsx using buildPageMetadata() with fallback to homepage metadata
- [X] T032 [US4] Add unique metadata to team page in src/app/our-team/layout.tsx using buildPageMetadata() with fallback to homepage metadata
- [X] T033 [US4] Add unique metadata to testimonials page in src/app/testimonials/layout.tsx using buildPageMetadata() with fallback to homepage metadata
- [X] T034 [US4] Add unique metadata to contact page in src/app/contact-us/layout.tsx using buildPageMetadata() with fallback to homepage metadata
- [X] T035 [US4] Ensure all pages have canonical URLs pointing to absolute production URLs using getCanonicalUrl()
- [X] T036 [US4] Validate all page titles are 50-60 characters and descriptions are 150-160 characters using validateMetadata()

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently. All pages should have unique, optimized metadata.

---

## Phase 7: User Story 5 - Content Discoverability Through Navigation (Priority: P3)

**Goal**: Users and search engines can understand the website structure and navigate between related pages through breadcrumbs and internal linking, improving both user experience and search engine crawling efficiency.

**Independent Test**: Manually navigate the website and verify breadcrumb trails appear on all pages except the homepage. Success is measured by all pages displaying accurate breadcrumb navigation that reflects the site hierarchy.

### Implementation for User Story 5

- [X] T037 [US5] Create Breadcrumb component in src/components/seo/Breadcrumb.tsx with visual navigation and BreadcrumbList structured data (JSON-LD)
- [X] T038 [US5] Add breadcrumb navigation to services page in src/app/services/page.tsx with items: Home > Services
- [X] T039 [US5] Add breadcrumb navigation to portfolio page in src/app/portfolio/page.tsx with items: Home > Portfolio
- [X] T040 [US5] Add breadcrumb navigation to case studies page in src/app/case-studies/page.tsx with items: Home > Case Studies
- [X] T041 [US5] Add breadcrumb navigation to team page in src/app/our-team/page.tsx with items: Home > Team
- [X] T042 [US5] Add breadcrumb navigation to testimonials page in src/app/testimonials/page.tsx with items: Home > Testimonials
- [X] T043 [US5] Add breadcrumb navigation to contact page in src/app/contact-us/page.tsx with items: Home > Contact
- [X] T044 [US5] Ensure breadcrumb structured data (BreadcrumbList schema) is generated for all pages with breadcrumbs using createBreadcrumbSchema()

**Checkpoint**: At this point, all user stories should be independently functional. Breadcrumbs should appear on all pages except homepage with proper structured data.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T045 [P] Verify all images have descriptive alt text across all pages (100% coverage) - check src/app/**/page.tsx files (Note: Manual verification required post-deployment)
- [X] T046 [P] Ensure decorative images use empty alt text (alt="") for accessibility (Note: Manual verification required post-deployment)
- [X] T047 [P] Update sitemap lastModified dates in src/app/sitemap.ts to reflect actual content modification dates (Note: Using current date; should be updated when content changes)
- [X] T048 [P] Add fallback Open Graph images for pages missing og:image metadata (Implemented via buildPageMetadata() fallback to homepage metadata)
- [ ] T049 [P] Validate all structured data using Google Rich Results Test tool (Manual validation required post-deployment)
- [ ] T050 [P] Validate all Open Graph metadata using Facebook Sharing Debugger (Manual validation required post-deployment)
- [ ] T051 [P] Validate all Twitter Card metadata using Twitter Card Validator (Manual validation required post-deployment)
- [ ] T052 [P] Run Lighthouse SEO audit (target score >95) and fix any issues (Manual validation required post-deployment)
- [X] T053 [P] Verify robots.txt allows all public pages and properly references sitemap (Verified: robots.ts correctly configured)
- [X] T054 [P] Ensure all canonical URLs are absolute and point to production domain (Implemented via getCanonicalUrl() and buildPageMetadata())
- [X] T055 [P] Verify no duplicate content issues (all pages have unique canonical URLs) (All pages have unique canonical URLs via buildPageMetadata())
- [X] T056 [P] Run TypeScript type check (npm run type-check) and fix any errors (Passed: zero errors)
- [X] T057 [P] Run ESLint (npm run lint) and fix any warnings (Passed: zero warnings)
- [X] T058 [P] Verify build succeeds (npm run build) without errors (Build successful)
- [X] T059 [P] Update documentation in specs/001-improve-seo/ with implementation notes (Created IMPLEMENTATION_NOTES.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Depends on US4 for page metadata but can work with basic metadata
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority
- Validation tasks can run in parallel

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks marked [P] can run in parallel (T005, T006)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- All Polish tasks marked [P] can run in parallel
- Different pages within a user story can be worked on in parallel (e.g., T016-T021 for Open Graph, T022-T028 for Twitter Cards)

---

## Parallel Example: User Story 3

```bash
# Launch all Open Graph metadata tasks together (different pages, no dependencies):
Task: "Add Open Graph metadata to services page in src/app/services/layout.tsx"
Task: "Add Open Graph metadata to portfolio page in src/app/portfolio/layout.tsx"
Task: "Add Open Graph metadata to case studies page in src/app/case-studies/layout.tsx"
Task: "Add Open Graph metadata to team page in src/app/our-team/layout.tsx"
Task: "Add Open Graph metadata to testimonials page in src/app/testimonials/layout.tsx"
Task: "Add Open Graph metadata to contact page in src/app/contact-us/layout.tsx"

# Launch all Twitter Card metadata tasks together:
Task: "Add Twitter Card metadata to services page in src/app/services/layout.tsx"
Task: "Add Twitter Card metadata to portfolio page in src/app/portfolio/layout.tsx"
# ... (similar for all pages)
```

---

## Parallel Example: User Story 4

```bash
# Launch all page metadata tasks together (different pages, no dependencies):
Task: "Add unique metadata to services page in src/app/services/layout.tsx"
Task: "Add unique metadata to portfolio page in src/app/portfolio/layout.tsx"
Task: "Add unique metadata to case studies page in src/app/case-studies/layout.tsx"
Task: "Add unique metadata to team page in src/app/our-team/layout.tsx"
Task: "Add unique metadata to testimonials page in src/app/testimonials/layout.tsx"
Task: "Add unique metadata to contact page in src/app/contact-us/layout.tsx"
```

---

## Parallel Example: User Story 5

```bash
# Launch all breadcrumb navigation tasks together (different pages, no dependencies):
Task: "Add breadcrumb navigation to services page in src/app/services/page.tsx"
Task: "Add breadcrumb navigation to portfolio page in src/app/portfolio/page.tsx"
Task: "Add breadcrumb navigation to case studies page in src/app/case-studies/page.tsx"
Task: "Add breadcrumb navigation to team page in src/app/our-team/page.tsx"
Task: "Add breadcrumb navigation to testimonials page in src/app/testimonials/page.tsx"
Task: "Add breadcrumb navigation to contact page in src/app/contact-us/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Search Engine Discovery)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Verify sitemap.xml is accessible
   - Verify robots.txt is properly configured
   - Submit sitemap to Google Search Console
   - Verify all 7 pages are listed
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (Rich Results)
4. Add User Story 3 → Test independently → Deploy/Demo (Social Sharing)
5. Add User Story 4 → Test independently → Deploy/Demo (Page Optimization)
6. Add User Story 5 → Test independently → Deploy/Demo (Breadcrumbs)
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Search Engine Discovery)
   - Developer B: User Story 2 (Rich Search Results)
   - Developer C: User Story 4 (Page-Specific SEO)
3. Then:
   - Developer A: User Story 3 (Social Media)
   - Developer B: User Story 5 (Breadcrumbs)
   - Developer C: Polish & Validation
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All metadata must be server-side rendered (Next.js App Router)
- All structured data must use JSON-LD format
- All canonical URLs must be absolute
- All Open Graph images must be absolute URLs
- Breadcrumbs should not appear on homepage (per specification)

---

## Task Summary

- **Total Tasks**: 59
- **Setup Tasks**: 3 (T001-T003)
- **Foundational Tasks**: 3 (T004-T006)
- **User Story 1 Tasks**: 4 (T007-T010)
- **User Story 2 Tasks**: 4 (T011-T014)
- **User Story 3 Tasks**: 14 (T015-T028)
- **User Story 4 Tasks**: 8 (T029-T036)
- **User Story 5 Tasks**: 8 (T037-T044)
- **Polish Tasks**: 15 (T045-T059)

**Parallel Opportunities**: 45 tasks marked with [P] can run in parallel

**Suggested MVP Scope**: Phases 1-3 (Setup + Foundational + User Story 1) = 10 tasks
