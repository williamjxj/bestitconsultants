# Tasks: Multiple Images and Videos in Webpage

**Input**: Design documents from `/specs/004-add-multiple-images/` **Prerequisites**: plan.md
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

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup

- [ ] T001 Create media components directory structure in src/components/media/
- [ ] T002 Install and configure Framer Motion for animations
- [ ] T003 [P] Configure Next.js Image optimization settings in next.config.js
- [ ] T004 [P] Set up image mapping service in src/services/image-mapping.ts
- [ ] T005 [P] Create animation presets in src/lib/animations.ts

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [ ] T006 [P] Contract test GET /api/media/assets in tests/contract/test_media_assets_get.test.ts
- [ ] T007 [P] Contract test POST /api/media/assets in tests/contract/test_media_assets_post.test.ts
- [ ] T008 [P] Contract test GET /api/media/galleries in
      tests/contract/test_media_galleries_get.test.ts
- [ ] T009 [P] Contract test POST /api/media/optimize in tests/contract/test_media_optimize.test.ts
- [ ] T010 [P] Integration test OptimizedImage component in
      tests/integration/test_optimized_image.test.tsx
- [ ] T011 [P] Integration test ImageGallery component in
      tests/integration/test_image_gallery.test.tsx
- [ ] T012 [P] Integration test homepage image loading in
      tests/integration/test_homepage_images.test.tsx
- [ ] T013 [P] Integration test team page image display in
      tests/integration/test_team_images.test.tsx

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [ ] T014 [P] MediaAsset TypeScript interface in src/types/media.ts
- [ ] T015 [P] MediaGallery TypeScript interface in src/types/media.ts
- [ ] T016 [P] MediaCategory TypeScript interface in src/types/media.ts
- [ ] T017 [P] SEOImageMetadata TypeScript interface in src/types/media.ts
- [ ] T018 [P] AccessibilityMetadata TypeScript interface in src/types/media.ts
- [ ] T019 [P] AnimationConfig TypeScript interface in src/types/media.ts
- [ ] T020 [P] OptimizedImage component in src/components/ui/optimized-image.tsx
- [ ] T021 [P] ImageGallery component in src/components/ui/image-gallery.tsx
- [ ] T022 [P] MediaService for asset management in src/services/media-service.ts
- [ ] T023 [P] Image optimization utility in src/lib/image-optimization.ts
- [ ] T024 GET /api/media/assets endpoint in src/app/api/media/assets/route.ts
- [ ] T025 POST /api/media/assets endpoint in src/app/api/media/assets/route.ts
- [ ] T026 GET /api/media/galleries endpoint in src/app/api/media/galleries/route.ts
- [ ] T027 POST /api/media/optimize endpoint in src/app/api/media/optimize/route.ts
- [ ] T028 Input validation for media endpoints in src/lib/validation.ts
- [ ] T029 Error handling for media operations in src/lib/error-handler.ts

## Phase 3.4: Integration

- [ ] T030 Update HeroSection component with OptimizedImage in src/components/home/hero-section.tsx
- [ ] T031 Update AboutSummary component with OptimizedImage in
      src/components/home/about-summary.tsx
- [ ] T032 Update TeamMemberCard with OptimizedImage in src/components/team/team-member-card.tsx
- [ ] T033 Update ServiceCategoryCard with OptimizedImage in
      src/components/services/service-category-card.tsx
- [ ] T034 Update CaseStudyCard with OptimizedImage in
      src/components/case-studies/case-study-card.tsx
- [ ] T035 Update homepage with image mapping service in src/app/page.tsx
- [ ] T036 Update team page with enhanced image display in src/app/team/page.tsx
- [ ] T037 Update services page with image galleries in src/app/services/page.tsx
- [ ] T038 Update case studies page with project images in src/app/case-studies/page.tsx
- [ ] T039 Add image loading states and error handling
- [ ] T040 Implement lazy loading for below-the-fold images
- [ ] T041 Add animation triggers and scroll-based animations

## Phase 3.5: Polish

- [ ] T042 [P] Unit tests for OptimizedImage component in tests/unit/test_optimized_image.test.tsx
- [ ] T043 [P] Unit tests for ImageGallery component in tests/unit/test_image_gallery.test.tsx
- [ ] T044 [P] Unit tests for MediaService in tests/unit/test_media_service.test.ts
- [ ] T045 [P] Unit tests for image optimization utilities in
      tests/unit/test_image_optimization.test.ts
- [ ] T046 Performance tests for Core Web Vitals compliance
- [ ] T047 Accessibility tests for WCAG 2.1 AA compliance
- [ ] T048 [P] Update component documentation in docs/components.md
- [ ] T049 [P] Update API documentation in docs/api.md
- [ ] T050 [P] Create image optimization guide in docs/image-optimization.md
- [ ] T051 Remove duplicate code and optimize bundle size
- [ ] T052 Run manual testing checklist
- [ ] T053 Validate all images load correctly across devices
- [ ] T054 Test animation performance on mobile devices
- [ ] T055 Verify SEO metadata for all images

## Dependencies

- Tests (T006-T013) before implementation (T014-T029)
- T014-T019 (TypeScript interfaces) before T020-T023 (components and services)
- T020-T023 (core components) before T024-T029 (API endpoints)
- T024-T029 (API endpoints) before T030-T041 (integration)
- T030-T041 (integration) before T042-T055 (polish)

## Parallel Example

```
# Launch T006-T013 together (Contract and Integration Tests):
Task: "Contract test GET /api/media/assets in tests/contract/test_media_assets_get.test.ts"
Task: "Contract test POST /api/media/assets in tests/contract/test_media_assets_post.test.ts"
Task: "Contract test GET /api/media/galleries in tests/contract/test_media_galleries_get.test.ts"
Task: "Contract test POST /api/media/optimize in tests/contract/test_media_optimize.test.ts"
Task: "Integration test OptimizedImage component in tests/integration/test_optimized_image.test.tsx"
Task: "Integration test ImageGallery component in tests/integration/test_image_gallery.test.tsx"
Task: "Integration test homepage image loading in tests/integration/test_homepage_images.test.tsx"
Task: "Integration test team page image display in tests/integration/test_team_images.test.tsx"

# Launch T014-T019 together (TypeScript Interfaces):
Task: "MediaAsset TypeScript interface in src/types/media.ts"
Task: "MediaGallery TypeScript interface in src/types/media.ts"
Task: "MediaCategory TypeScript interface in src/types/media.ts"
Task: "SEOImageMetadata TypeScript interface in src/types/media.ts"
Task: "AccessibilityMetadata TypeScript interface in src/types/media.ts"
Task: "AnimationConfig TypeScript interface in src/types/media.ts"

# Launch T020-T023 together (Core Components and Services):
Task: "OptimizedImage component in src/components/ui/optimized-image.tsx"
Task: "ImageGallery component in src/components/ui/image-gallery.tsx"
Task: "MediaService for asset management in src/services/media-service.ts"
Task: "Image optimization utility in src/lib/image-optimization.ts"
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts
- All image components must be accessible and performant
- Animations must respect user motion preferences
- Images must be optimized for Core Web Vitals

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
