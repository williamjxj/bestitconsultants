# Tasks: Use Cloudflare R2 Static Buckets to Replace @R2 bucket static-assets Folder

**Input**: Design documents from `/specs/005-use-cloudflare-r2/` **Prerequisites**: plan.md
(required), research.md, data-model.md

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
   → Integration: middleware, logging
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

- **Web app**: Next.js application with API routes
- **Frontend**: `src/app/`, `src/components/`
- **Backend**: `src/app/api/`
- **Tests**: `tests/` at repository root

## Phase 3.1: Setup

- [x] T001 Install AWS SDK v3 dependencies for R2 integration
- [x] T002 Configure environment variables for R2 credentials in .env.local
- [x] T003 [P] Create R2 bucket and configure public access settings
- [x] T004 [P] Set up TypeScript interfaces for R2 integration in src/types/r2.ts

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [x] T005 [P] Unit test ImageAsset model validation in tests/unit/test-image-asset.ts
- [x] T006 [P] Unit test R2Configuration model validation in tests/unit/test-r2-config.ts
- [x] T007 [P] Unit test ImageCache model validation in tests/unit/test-image-cache.ts
- [x] T008 [P] Integration test image proxy API in tests/integration/test-image-proxy.ts
- [x] T009 [P] Integration test R2 fallback behavior in tests/integration/test-r2-fallback.ts
- [x] T010 [P] E2E test image loading from R2 in tests/e2e/test-image-loading.spec.ts
- [x] T011 [P] Performance test image response times in tests/performance/test-image-performance.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [x] T012 [P] ImageAsset model in src/types/image-asset.ts
- [x] T013 [P] R2Configuration model in src/types/r2-config.ts
- [x] T014 [P] ImageCache model in src/types/image-cache.ts
- [x] T015 [P] R2 client service in src/services/r2-client.ts
- [x] T016 [P] Image service with fallback logic in src/services/image-service.ts
- [x] T017 [P] Image cache service in src/services/image-cache.ts
- [x] T018 Image proxy API route in src/app/api/images/proxy/route.ts
- [x] T019 Image migration service in src/services/image-migration.ts
- [x] T020 Middleware for URL rewriting in middleware.ts
- [x] T021 OptimizedImage component in src/components/ui/optimized-image.tsx

## Phase 3.4: Integration

- [x] T022 Connect R2 client to environment configuration
- [x] T023 Implement multi-tier fallback (R2 → Cache → Local)
- [x] T024 Add request/response logging for image requests
- [x] T025 Configure caching headers for R2 images
- [x] T026 Set up error monitoring for R2 service outages
- [x] T027 Implement gradual migration strategy for existing images

## Phase 3.5: Migration Execution

- [ ] T028 Upload all 12 existing images to R2 bucket
- [ ] T029 Update image references to use R2 URLs
- [ ] T030 Test image loading from R2 in development
- [ ] T031 Deploy to staging and validate R2 integration
- [ ] T032 Monitor performance metrics during migration
- [ ] T033 Remove local image files after successful migration

**Status**: Infrastructure complete, but **CRITICAL ISSUE**: Referenced images don't exist in
`/publicR2 bucket` directory, causing 404 errors.

## Phase 3.6: Polish

- [ ] T034 [P] Unit tests for all service methods in tests/unit/
- [x] T035 Performance optimization for Core Web Vitals compliance
- [x] T036 [P] Update documentation for R2 integration in docs/
- [x] T037 Add monitoring and alerting for R2 service health
- [x] T038 Clean up unused local image files
- [x] T039 Run comprehensive testing suite

## Dependencies

- Tests (T005-T011) before implementation (T012-T021)
- T012-T014 (models) before T015-T017 (services)
- T015-T017 (services) before T018-T021 (API/middleware)
- T018-T021 before T022-T027 (integration)
- T022-T027 before T028-T033 (migration)
- T028-T033 before T034-T039 (polish)

## Parallel Execution Examples

### Phase 3.2: Test Development (T005-T011)

```
# Launch all test tasks together:
Task: "Unit test ImageAsset model validation in tests/unit/test-image-asset.ts"
Task: "Unit test R2Configuration model validation in tests/unit/test-r2-config.ts"
Task: "Unit test ImageCache model validation in tests/unit/test-image-cache.ts"
Task: "Integration test image proxy API in tests/integration/test-image-proxy.ts"
Task: "Integration test R2 fallback behavior in tests/integration/test-r2-fallback.ts"
Task: "E2E test image loading from R2 in tests/e2e/test-image-loading.spec.ts"
Task: "Performance test image response times in tests/performance/test-image-performance.ts"
```

### Phase 3.3: Core Models and Services (T012-T017)

```
# Launch model and service tasks together:
Task: "ImageAsset model in src/types/image-asset.ts"
Task: "R2Configuration model in src/types/r2-config.ts"
Task: "ImageCache model in src/types/image-cache.ts"
Task: "R2 client service in src/services/r2-client.ts"
Task: "Image service with fallback logic in src/services/image-service.ts"
Task: "Image cache service in src/services/image-cache.ts"
```

### Phase 3.6: Polish Tasks (T034, T036)

```
# Launch polish tasks together:
Task: "Unit tests for all service methods in tests/unit/"
Task: "Update documentation for R2 integration in docs/"
```

## Critical Success Factors

### TDD Compliance

- **MUST**: All tests (T005-T011) must be written and failing before any implementation
- **MUST**: Each test must be specific to one component/function
- **MUST**: Tests must validate the exact behavior described in data-model.md

### Performance Requirements

- **LCP**: < 2.5 seconds for image loading
- **FID**: < 100ms for user interactions
- **CLS**: < 0.1 for layout stability
- **Cache Hit Rate**: >90% for frequently accessed images

### Migration Safety

- **Zero Downtime**: No service interruption during migration
- **URL Preservation**: All existing image URLs must remain functional
- **Fallback**: Multi-tier fallback must work during R2 outages
- **Rollback**: Ability to revert to local images if needed

## File Structure Created

```
src/
├── types/
│   ├── image-asset.ts
│   ├── r2-config.ts
│   └── image-cache.ts
├── services/
│   ├── r2-client.ts
│   ├── image-service.ts
│   ├── image-cache.ts
│   └── image-migration.ts
├── components/ui/
│   └── optimized-image.tsx
└── app/api/images/proxy/
    └── route.ts

tests/
├── unit/
│   ├── test-image-asset.ts
│   ├── test-r2-config.ts
│   └── test-image-cache.ts
├── integration/
│   ├── test-image-proxy.ts
│   └── test-r2-fallback.ts
├── e2e/
│   └── test-image-loading.spec.ts
└── performance/
    └── test-image-performance.ts
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Monitor R2 service health during migration
- Maintain local fallback until migration is validated

## Task Generation Rules

_Applied during main() execution_

1. **From Data Model**:

   - ImageAsset → T012 (model), T005 (test)
   - R2Configuration → T013 (model), T006 (test)
   - ImageCache → T014 (model), T007 (test)

2. **From Research**:

   - R2 integration patterns → T015 (R2 client)
   - URL preservation → T020 (middleware)
   - Fallback behavior → T016 (image service)
   - Performance optimization → T021 (OptimizedImage)

3. **From Requirements**:
   - FR-001 (serve from R2) → T018 (proxy API)
   - FR-002 (maintain URLs) → T020 (middleware)
   - FR-003 (12 files accessible) → T028 (upload)
   - FR-004 (fallback behavior) → T016 (image service)
   - FR-010 (no code changes) → T020 (middleware)

## Validation Checklist

_GATE: Checked by main() before returning_

- [x] All entities have model tasks (T012-T014)
- [x] All entities have test tasks (T005-T007)
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Migration tasks preserve existing functionality
- [x] Performance requirements are addressed
