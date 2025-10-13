# Tasks: Enhanced UI/UX with Simplified Navigation and AI News Integration

**Input**: Design documents from `/specs/001-ui-ux-enhancement/` **Prerequisites**: plan.md
(required), research.md, data-model.md, contracts/

## Execution Flow (main)

```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/`, `tests/` at repository root
- Paths shown below assume Next.js frontend + Supabase backend structure

## Phase 3.1: Setup

- [ ] T001 Create Supabase project and configure environment variables
- [ ] T002 Install new dependencies: framer-motion, tailwindcss-animate, @supabase/supabase-js
- [ ] T003 [P] Configure Firecrawl MCP integration and API credentials
- [ ] T004 [P] Set up database migrations and schema in supabase/migrations/
- [ ] T005 [P] Configure TypeScript types for Supabase database schema

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [ ] T006 [P] Contract test GET /api/navigation in tests/contract/test_navigation_api.test.ts
- [ ] T007 [P] Contract test GET /api/testimonials in tests/contract/test_testimonials_api.test.ts
- [ ] T008 [P] Contract test GET /api/ai-news in tests/contract/test_ai_news_api.test.ts
- [ ] T009 [P] Contract test POST /api/scrape/ai-news in
      tests/contract/test_web_scraping_api.test.ts
- [ ] T010 [P] Integration test navigation menu functionality in
      tests/integration/test_navigation.test.ts
- [ ] T011 [P] Integration test testimonials footer display in
      tests/integration/test_testimonials.test.ts
- [ ] T012 [P] Integration test AI news page with database in tests/integration/test_ai_news.test.ts
- [ ] T013 [P] Integration test web scraping workflow in tests/integration/test_web_scraping.test.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [ ] T014 [P] NavigationItem model in src/types/navigation.ts
- [ ] T015 [P] Testimonial model in src/types/testimonial.ts
- [ ] T016 [P] AINewsArticle model in src/types/ai-news.ts
- [ ] T017 [P] AnimationState model in src/types/animation.ts
- [ ] T018 [P] Supabase client configuration in src/lib/supabase.ts
- [ ] T019 [P] Firecrawl MCP service in src/lib/firecrawl.ts
- [ ] T020 [P] Navigation service in src/services/navigation.ts
- [ ] T021 [P] Testimonials service in src/services/testimonials.ts
- [ ] T022 [P] AI News service in src/services/ai-news.ts
- [ ] T023 [P] Web scraping service in src/services/web-scraping.ts

## Phase 3.4: API Implementation

- [ ] T024 [P] GET /api/navigation endpoint in src/app/api/navigation/route.ts
- [ ] T025 [P] GET /api/testimonials endpoint in src/app/api/testimonials/route.ts
- [ ] T026 [P] GET /api/ai-news endpoint in src/app/api/ai-news/route.ts
- [ ] T027 [P] POST /api/scrape/ai-news endpoint in src/app/api/scrape/ai-news/route.ts
- [ ] T028 [P] POST /api/scrape/refresh endpoint in src/app/api/scrape/refresh/route.ts
- [ ] T029 [P] Input validation middleware in src/lib/validation.ts
- [ ] T030 [P] Error handling and logging in src/lib/error-handler.ts

## Phase 3.5: Database Integration

- [ ] T031 Create ai_news_articles table with proper indexing
- [ ] T032 Create testimonials table with display ordering
- [ ] T033 Create user_preferences table for animation settings
- [ ] T034 [P] Set up Row Level Security (RLS) policies for all tables
- [ ] T035 [P] Create database seed data for initial content
- [ ] T036 [P] Set up real-time subscriptions for content updates

## Phase 3.6: UI Components Implementation

- [ ] T037 [P] Update Navbar component with simplified navigation in
      src/components/common/Navbar.tsx
- [ ] T038 [P] Update Footer component with testimonials section in src/components/common/Footer.tsx
- [ ] T039 [P] Create AI News page component in src/app/ai-news/page.tsx
- [ ] T040 [P] Add Framer Motion animations to homepage in src/app/page.tsx
- [ ] T041 [P] Create AI News article card component in src/components/ai-news/ArticleCard.tsx
- [ ] T042 [P] Create category filter component in src/components/ai-news/CategoryFilter.tsx
- [ ] T043 [P] Create testimonials card component in src/components/common/TestimonialCard.tsx

## Phase 3.7: Web Scraping Integration

- [ ] T044 [P] Implement Firecrawl MCP scraping logic for AI news sources
- [ ] T045 [P] Create content parsing and categorization logic
- [ ] T046 [P] Set up automated content refresh scheduling
- [ ] T047 [P] Implement content deduplication and quality filtering
- [ ] T048 [P] Create content validation and sanitization

## Phase 3.8: Performance and Optimization

- [ ] T049 [P] Implement lazy loading for AI news articles
- [ ] T050 [P] Add image optimization for article thumbnails
- [ ] T051 [P] Set up caching for frequently accessed content
- [ ] T052 [P] Optimize database queries with proper indexing
- [ ] T053 [P] Implement Core Web Vitals monitoring

## Phase 3.9: Integration

- [ ] T054 Connect AI News service to Supabase database
- [ ] T055 Connect testimonials service to Supabase database
- [ ] T056 [P] Set up real-time content synchronization
- [ ] T057 [P] Implement user preference management
- [ ] T058 [P] Add motion preference detection and handling
- [ ] T059 [P] Set up error boundaries for graceful failure handling

## Phase 3.10: Polish

- [ ] T060 [P] Unit tests for all services in tests/unit/
- [ ] T061 [P] Unit tests for all components in tests/unit/
- [ ] T062 [P] Performance tests for Core Web Vitals compliance
- [ ] T063 [P] Accessibility tests for WCAG 2.1 AA compliance
- [ ] T064 [P] Update documentation in README.md
- [ ] T065 [P] Create deployment guide for Supabase integration
- [ ] T066 [P] Remove code duplication and optimize bundle size
- [ ] T067 [P] Run manual testing scenarios from quickstart.md

## Dependencies

- Tests (T006-T013) before implementation (T014-T030)
- Database setup (T031-T036) before API implementation (T024-T030)
- Models (T014-T017) before services (T020-T023)
- Services before API endpoints (T020-T023 blocks T024-T028)
- API endpoints before UI components (T024-T030 blocks T037-T043)
- Database integration (T054-T059) before polish (T060-T067)
- Implementation before polish (T060-T067)

## Parallel Examples

```
# Launch T006-T013 together (Contract and Integration Tests):
Task: "Contract test GET /api/navigation in tests/contract/test_navigation_api.test.ts"
Task: "Contract test GET /api/testimonials in tests/contract/test_testimonials_api.test.ts"
Task: "Contract test GET /api/ai-news in tests/contract/test_ai_news_api.test.ts"
Task: "Contract test POST /api/scrape/ai-news in tests/contract/test_web_scraping_api.test.ts"
Task: "Integration test navigation menu functionality in tests/integration/test_navigation.test.ts"
Task: "Integration test testimonials footer display in tests/integration/test_testimonials.test.ts"
Task: "Integration test AI news page with database in tests/integration/test_ai_news.test.ts"
Task: "Integration test web scraping workflow in tests/integration/test_web_scraping.test.ts"

# Launch T014-T017 together (Model Creation):
Task: "NavigationItem model in src/types/navigation.ts"
Task: "Testimonial model in src/types/testimonial.ts"
Task: "AINewsArticle model in src/types/ai-news.ts"
Task: "AnimationState model in src/types/animation.ts"

# Launch T020-T023 together (Service Creation):
Task: "Navigation service in src/services/navigation.ts"
Task: "Testimonials service in src/services/testimonials.ts"
Task: "AI News service in src/services/ai-news.ts"
Task: "Web scraping service in src/services/web-scraping.ts"
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts
- Supabase integration requires proper environment setup
- Firecrawl MCP requires API key configuration
- Real-time subscriptions need proper error handling

## Task Generation Rules

_Applied during main() execution_

1. **From Contracts**:

   - Each contract file → contract test task [P]
   - Each endpoint → implementation task

2. **From Data Model**:

   - Each entity → model creation task [P]
   - Relationships → service layer tasks

3. **From User Stories**:

   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist

_GATE: Checked by main() before returning_

- [x] All contracts have corresponding tests
- [x] All entities have model tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Supabase integration tasks included
- [x] Web scraping tasks included
- [x] Performance optimization tasks included
- [x] Accessibility compliance tasks included
