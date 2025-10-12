# Tasks: Website Evolution & Enhancement

**Input**: Design documents from `/specs/003-notebooklm-analytics/` **Prerequisites**: plan.md
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

- **Web application**: `src/`, `tests/` at repository root
- Paths shown below assume Next.js App Router structure

## Phase 3.1: Setup

- [x] T001 Create enhanced team profile types in src/types/team.ts
- [x] T002 Create case study types in src/types/case-study.ts
- [x] T003 Create service category types in src/types/service.ts
- [x] T004 Create content section types in src/types/content.ts
- [x] T005 Create SEO metadata types in src/types/seo.ts

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [x] T006 [P] Contract test GET /api/team in tests/contract/test_team_api.test.ts
- [x] T007 [P] Contract test GET /api/team/{id} in tests/contract/test_team_member_api.test.ts
- [x] T008 [P] Contract test GET /api/case-studies in tests/contract/test_case_studies_api.test.ts
- [x] T009 [P] Contract test GET /api/services in tests/contract/test_services_api.test.ts
- [x] T010 [P] Integration test team profile display in tests/integration/test_team_display.test.ts
- [x] T011 [P] Integration test case study presentation in
      tests/integration/test_case_study_presentation.test.ts
- [x] T012 [P] Integration test service category display in
      tests/integration/test_service_display.test.ts
- [x] T013 [P] Unit test EnhancedTeamProfile component in
      tests/unit/test_enhanced_team_profile.test.ts
- [x] T014 [P] Unit test CaseStudyCard component in tests/unit/test_case_study_card.test.ts
- [x] T015 [P] Unit test ServiceCategoryCard component in
      tests/unit/test_service_category_card.test.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [x] T016 [P] Enhanced team profile component in src/components/team/EnhancedTeamProfile.tsx
- [x] T017 [P] Case study card component in src/components/case-studies/CaseStudyCard.tsx
- [x] T018 [P] Service category card component in src/components/services/ServiceCategoryCard.tsx
- [x] T019 [P] Enhanced hero section component in src/components/home/EnhancedHeroSection.tsx
- [x] T020 [P] Quick highlights section component in src/components/home/QuickHighlights.tsx
- [x] T021 [P] Team member avatar component in src/components/team/TeamMemberAvatar.tsx
- [x] T022 [P] Structured data component in src/components/seo/StructuredData.tsx
- [x] T023 [P] Team profile data service in src/services/teamService.ts
- [x] T024 [P] Case study data service in src/services/caseStudyService.ts
- [x] T025 [P] Service category data service in src/services/serviceCategoryService.ts
- [x] T026 [P] Content section data service in src/services/contentService.ts
- [x] T027 [P] SEO metadata service in src/services/seoService.ts

## Phase 3.4: API Implementation

- [x] T028 GET /api/team endpoint in src/app/api/team/route.ts
- [x] T029 GET /api/team/[id]/route.ts endpoint in src/app/api/team/[id]/route.ts
- [x] T030 GET /api/case-studies endpoint in src/app/api/case-studies/route.ts
- [x] T031 GET /api/services endpoint in src/app/api/services/route.ts
- [x] T032 GET /api/content endpoint in src/app/api/content/route.ts
- [x] T033 GET /api/seo endpoint in src/app/api/seo/route.ts
- [x] T034 Input validation middleware in src/lib/validation.ts
- [x] T035 Error handling middleware in src/lib/errorHandler.ts
- [x] T036 Response formatting utility in src/lib/responseFormatter.ts

## Phase 3.5: Page Integration

- [x] T037 Update team page with enhanced profiles in src/app/team/page.tsx
- [x] T038 Update homepage with enhanced hero section in src/app/page.tsx
- [x] T039 Update services page with enhanced categories in src/app/services/page.tsx
- [x] T040 Create case studies page in src/app/case-studies/page.tsx
- [x] T041 Update layout with enhanced metadata in src/app/layout.tsx
- [x] T042 Update navigation with new menu items in src/components/common/Navbar.tsx
- [x] T043 Update footer with enhanced content in src/components/common/Footer.tsx

## Phase 3.6: Data Integration

- [x] T044 Create team member data fixtures in src/data/teamMembers.ts
- [x] T045 Create case study data fixtures in src/data/caseStudies.ts
- [x] T046 Create service category data fixtures in src/data/serviceCategories.ts
- [x] T047 Create content section data fixtures in src/data/contentSections.ts
- [x] T048 Create SEO metadata fixtures in src/data/seoMetadata.ts
- [x] T049 Update existing team data with prestige projects in src/lib/translations.ts
- [x] T050 Update existing case study data with metrics in src/lib/translations.ts

## Phase 3.7: Performance & Optimization

- [x] T051 [P] Image optimization for team avatars in src/components/team/TeamMemberAvatar.tsx
- [x] T052 [P] Image optimization for case study images in
      src/components/case-studies/CaseStudyCard.tsx
- [x] T053 [P] Code splitting for team components in src/app/team/page.tsx
- [x] T054 [P] Code splitting for case study components in src/app/case-studies/page.tsx
- [x] T055 [P] Lazy loading for below-the-fold content in src/components/common/LazySection.tsx
- [x] T056 [P] Performance monitoring setup in src/lib/performance.ts
- [x] T057 [P] Bundle size optimization in next.config.js

## Phase 3.8: SEO & Accessibility

- [x] T058 [P] SEO metadata implementation in src/app/layout.tsx
- [x] T059 [P] Structured data implementation in src/components/seo/StructuredData.tsx
- [x] T060 [P] Accessibility improvements in src/components/team/EnhancedTeamProfile.tsx
- [x] T061 [P] Accessibility improvements in src/components/case-studies/CaseStudyCard.tsx
- [x] T062 [P] Accessibility improvements in src/components/services/ServiceCategoryCard.tsx
- [x] T063 [P] Sitemap generation in src/app/sitemap.ts
- [x] T064 [P] Robots.txt configuration in src/app/robots.ts

## Phase 3.9: Testing & Validation

- [x] T065 [P] End-to-end tests for team page in tests/e2e/test_team_page.spec.ts
- [x] T066 [P] End-to-end tests for case studies page in tests/e2e/test_case_studies_page.spec.ts
- [x] T067 [P] End-to-end tests for services page in tests/e2e/test_services_page.spec.ts
- [x] T068 [P] Performance tests for Core Web Vitals in
      tests/performance/test_core_web_vitals.test.ts
- [x] T069 [P] Accessibility tests in tests/accessibility/test_a11y.test.ts
- [x] T070 [P] SEO validation tests in tests/seo/test_seo_validation.test.ts

## Phase 3.10: Documentation & Polish

- [x] T071 [P] Update README with new features in README.md
- [x] T072 [P] Create component documentation in docs/components.md
- [x] T073 [P] Create API documentation in docs/api.md
- [x] T074 [P] Update deployment guide in docs/deployment.md
- [x] T075 [P] Create troubleshooting guide in docs/troubleshooting.md
- [x] T076 [P] Final code review and cleanup
- [x] T077 [P] Update package.json with new scripts
- [x] T078 [P] Update .gitignore for new file types

## Dependencies

- Setup (T001-T005) before tests (T006-T015)
- Tests (T006-T015) before implementation (T016-T027)
- Core implementation (T016-T027) before API (T028-T036)
- API implementation (T028-T036) before page integration (T037-T043)
- Page integration (T037-T043) before data integration (T044-T050)
- Data integration (T044-T050) before performance (T051-T057)
- Performance (T051-T057) before SEO (T058-T064)
- SEO (T058-T064) before testing (T065-T070)
- Testing (T065-T070) before documentation (T071-T078)

## Parallel Execution Examples

### Phase 3.2: Tests First (TDD)

```
# Launch T006-T015 together:
Task: "Contract test GET /api/team in tests/contract/test_team_api.test.ts"
Task: "Contract test GET /api/team/{id} in tests/contract/test_team_member_api.test.ts"
Task: "Contract test GET /api/case-studies in tests/contract/test_case_studies_api.test.ts"
Task: "Contract test GET /api/services in tests/contract/test_services_api.test.ts"
Task: "Integration test team profile display in tests/integration/test_team_display.test.ts"
Task: "Integration test case study presentation in tests/integration/test_case_study_presentation.test.ts"
Task: "Integration test service category display in tests/integration/test_service_display.test.ts"
Task: "Unit test EnhancedTeamProfile component in tests/unit/test_enhanced_team_profile.test.ts"
Task: "Unit test CaseStudyCard component in tests/unit/test_case_study_card.test.ts"
Task: "Unit test ServiceCategoryCard component in tests/unit/test_service_category_card.test.ts"
```

### Phase 3.3: Core Implementation

```
# Launch T016-T027 together:
Task: "Enhanced team profile component in src/components/team/EnhancedTeamProfile.tsx"
Task: "Case study card component in src/components/case-studies/CaseStudyCard.tsx"
Task: "Service category card component in src/components/services/ServiceCategoryCard.tsx"
Task: "Enhanced hero section component in src/components/home/EnhancedHeroSection.tsx"
Task: "Quick highlights section component in src/components/home/QuickHighlights.tsx"
Task: "Team member avatar component in src/components/team/TeamMemberAvatar.tsx"
Task: "Structured data component in src/components/seo/StructuredData.tsx"
Task: "Team profile data service in src/services/teamService.ts"
Task: "Case study data service in src/services/caseStudyService.ts"
Task: "Service category data service in src/services/serviceCategoryService.ts"
Task: "Content section data service in src/services/contentService.ts"
Task: "SEO metadata service in src/services/seoService.ts"
```

### Phase 3.7: Performance & Optimization

```
# Launch T051-T057 together:
Task: "Image optimization for team avatars in src/components/team/TeamMemberAvatar.tsx"
Task: "Image optimization for case study images in src/components/case-studies/CaseStudyCard.tsx"
Task: "Code splitting for team components in src/app/team/page.tsx"
Task: "Code splitting for case study components in src/app/case-studies/page.tsx"
Task: "Lazy loading for below-the-fold content in src/components/common/LazySection.tsx"
Task: "Performance monitoring setup in src/lib/performance.ts"
Task: "Bundle size optimization in next.config.js"
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts
- Follow TDD: Red → Green → Refactor cycle
- Maintain TypeScript strict mode
- Ensure WCAG 2.1 AA accessibility compliance
- Optimize for Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)

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
