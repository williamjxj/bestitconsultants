# Implementation Plan: Use Cloudflare R2 Static Buckets to Replace @R2 bucket static-assets Folder

**Branch**: `005-use-cloudflare-r2` | **Date**: 2025-01-27 | **Spec**:
`/specs/005-use-cloudflare-r2/spec.md` **Input**: Feature specification from
`/specs/005-use-cloudflare-r2/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Migrate static image assets from local `/R2 bucket static-assets` folder to Cloudflare R2 static
buckets while maintaining existing URLs and performance characteristics. The migration involves 12
image files currently referenced across hero carousel, portfolio pages, API endpoints, and UI
components.

## ✅ Implementation Status - COMPLETED

**Date Completed**: January 2025 **Status**: All URL fixes implemented and verified working

### Key Fixes Applied:

1. **Fixed Malformed URLs**: Resolved concatenated R2 URLs across entire codebase
2. **Updated Next.js Config**: Added proper R2 hostname patterns for `.r2.dev` domains
3. **Enhanced Image Proxy API**: Integrated with ImageService for proper R2 → Cache → Local fallback
4. **Fixed OptimizedImage Component**: Improved URL handling for R2 vs local images
5. **Added Metadata Base**: Resolved social media image warnings
6. **Updated All Data Sources**: Fixed URLs in hero carousel, portfolio, API endpoints, and test
   files

### Files Modified:

- `next.config.js` - Added R2 hostname patterns
- `src/app/layout.tsx` - Added metadataBase
- `src/components/ui/bookmark-list.tsx` - Fixed placeholder URLs
- `src/app/api/images/proxy/route.ts` - Enhanced with ImageService integration
- `src/components/ui/optimized-image.tsx` - Improved URL handling
- `src/app/api/media/assets/route.ts` - Fixed mock data URLs
- `src/data/hero-carousel-data.ts` - Fixed hero carousel URLs
- `src/app/portfolio/page.tsx` - Fixed all portfolio image URLs
- `src/app/api/media/galleries/route.ts` - Fixed gallery URLs
- Multiple library files - Fixed test and utility URLs

### Results:

- ✅ No more malformed URL concatenation
- ✅ All images loading correctly from R2 static-assets bucket
- ✅ Proper fallback mechanisms in place
- ✅ No more 400 errors for image requests
- ✅ Metadata warnings resolved

## Technical Context

**Language/Version**: TypeScript 5.0+, Next.js 15+ **Primary Dependencies**: Cloudflare R2 SDK,
Next.js Image component, AWS SDK v3 **Storage**: Cloudflare R2 buckets for static assets, local
fallback for development **Testing**: Jest, React Testing Library, Playwright for E2E **Target
Platform**: Vercel deployment with CDN optimization **Project Type**: web (Next.js application)
**Performance Goals**: Maintain Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
**Constraints**: Zero downtime migration, maintain existing image URLs, preserve API compatibility
**Scale/Scope**: 12 image files, multiple API endpoints, portfolio and hero carousel components

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Core Principles Compliance

- [x] **Component-First Architecture**: Image components will remain reusable and self-contained
- [x] **TypeScript-First Development**: All R2 integration code will use strict TypeScript with
      proper interfaces
- [x] **Test-Driven Development**: Migration will include comprehensive tests for image loading,
      fallback behavior, and API compatibility
- [x] **Performance-First Web Standards**: Migration must maintain or improve Core Web Vitals
      through CDN optimization
- [x] **Accessibility & SEO Compliance**: Image alt text and metadata will be preserved during
      migration

### Web Development Standards Compliance

- [x] **Next.js 15+ with App Router**: Using existing Next.js Image component for optimization
- [x] **Tailwind CSS**: No changes to styling approach
- [x] **Code Quality Gates**: All code will pass ESLint, Prettier, and TypeScript checks

### Performance Standards Compliance

- [x] **Core Web Vitals**: Migration must maintain LCP < 2.5s, FID < 100ms, CLS < 0.1
- [x] **Image Optimization**: Using Next.js Image component with R2 as source
- [x] **CDN Optimization**: Cloudflare R2 provides global CDN distribution

### Business Strategy Compliance

- [x] **Content Strategy**: No impact on content or messaging
- [x] **SEO Optimization**: Image URLs and metadata preserved for SEO
- [x] **Global Network Integration**: No impact on team or service content

**Status**: ✅ PASS - All constitutional requirements can be met with proposed approach

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Option 2 (Web application) - Next.js frontend with API routes

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:

   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:

   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:

   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:

   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:

   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh cursor` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/\*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Each contract → contract test task [P]
- Each entity → model creation task [P]
- Each user story → integration test task
- Implementation tasks to make tests pass

**Ordering Strategy**:

- TDD order: Tests before implementation
- Dependency order: Models before services before UI
- Mark [P] for parallel execution (independent files)

**Estimated Output**: 25-30 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md) **Phase 4**: Implementation (execute
tasks.md following constitutional principles) **Phase 5**: Validation (run tests, execute
quickstart.md, performance validation)

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/tasks command)
- [ ] Phase 3: Implementation execution
- [ ] Phase 4: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_
