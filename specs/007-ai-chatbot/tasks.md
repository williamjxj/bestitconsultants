# Tasks: AI Chatbot

**Input**: Design documents from `/specs/007-ai-chatbot/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are OPTIONAL and not included in this task list. Add test tasks if TDD approach is desired.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3], [US4])
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency installation

- [x] T001 Install required dependencies (`ai`, `@ai-sdk/react`, `@ai-sdk/deepseek`) via npm install
- [x] T002 [P] Verify environment variables (`AI_GATEWAY_API_KEY`, `DEEPSEEK_API_KEY`) are set in `.env.local`
- [x] T003 [P] Verify `/public/assets/angel.webp` exists and is accessible

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create TypeScript type definitions in `src/types/chat-widget.ts` (WidgetState, Message, MessagePart, RateLimitInfo interfaces)
- [x] T005 [P] Create storage utilities in `src/lib/utils/storage.ts` (saveWidgetState, loadWidgetState, clearWidgetState, isStorageAvailable functions using sessionStorage)
- [x] T006 Create chat widget hook in `src/lib/hooks/use-chat-widget.ts` (useChatWidget hook with sessionStorage persistence, message management, rate limiting tracking)
- [x] T007 [P] Create API route structure in `src/app/api/chat/route.ts` (Edge runtime, basic POST handler skeleton)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Get Instant Answers About Services (Priority: P1) 🎯 MVP

**Goal**: Visitor can open chatbot and get instant answers about company services. Chatbot provides accurate responses based on company information and maintains conversation context.

**Independent Test**: Open chatbot on any page, ask "What services do you offer?", verify chatbot responds with service summary. Ask follow-up question, verify context is maintained. Navigate to different page, verify conversation persists.

### Implementation for User Story 1

- [x] T008 [US1] Create ChatWidgetIcon component in `src/components/chat-widget/chat-widget-icon.tsx` (floating button, bottom-right, uses `/assets/angel.webp`, Framer Motion animations)
- [x] T009 [US1] Create ChatWidgetPanel component skeleton in `src/components/chat-widget/chat-widget-panel.tsx` (basic structure, message display area, input form)
- [x] T010 [US1] Implement message display in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (render messages from useChat hook, user/assistant styling, timestamps)
- [x] T011 [US1] Integrate useChat hook from `@ai-sdk/react` in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (connect to `/api/chat`, handle streaming responses)
- [x] T012 [US1] Implement message input and submission in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (form handling, send button, input validation)
- [x] T013 [US1] Create ChatWidget root component in `src/components/chat-widget/chat-widget.tsx` (manages open/close state, renders icon or panel)
- [x] T014 [US1] Implement basic API route handler in `src/app/api/chat/route.ts` (request validation, Vercel AI Gateway integration, streaming response)
- [x] T015 [US1] Add ChatWidget to root layout in `src/app/layout.tsx` (import and render ChatWidget component)
- [x] T016 [US1] Integrate useChatWidget hook with ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (load persisted messages, sync with useChat, save to sessionStorage)
- [x] T017 [US1] Implement session persistence across page navigation (verify messages persist when navigating between pages using sessionStorage)

**Checkpoint**: At this point, User Story 1 should be fully functional - visitors can open chatbot, ask questions, get AI responses, and conversation persists across navigation

---

## Phase 4: User Story 2 - Navigate to Relevant Pages and Contact Form (Priority: P2)

**Goal**: Chatbot can suggest navigation to relevant pages (services, case studies, contact, team) and help visitors find information or contact the company.

**Independent Test**: Ask "Show me your case studies", verify chatbot suggests navigation to case studies page. Ask "How can I contact you?", verify chatbot provides contact info and suggests contact form. Click suggested link, verify navigation works.

### Implementation for User Story 2

- [x] T018 [US2] Create knowledge base utility in `src/lib/utils/knowledge-base.ts` (extract company info from `src/data/serviceCategories.ts`, `src/data/caseStudies.ts`, `src/data/teamMembers.ts`, `src/lib/footer-constants.ts`)
- [x] T019 [US2] Enhance API route to include company context in `src/app/api/chat/route.ts` (add system message with company information, services, case studies, team, contact details)
- [x] T020 [US2] Implement navigation suggestion detection in API route (`src/app/api/chat/route.ts`) (detect navigation-related questions, include suggested page links in response)
- [x] T021 [US2] Add navigation button rendering in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (detect links in AI responses, render as clickable buttons)
- [x] T022 [US2] Implement navigation handling in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (use Next.js useRouter, navigate to suggested pages, handle widget state on navigation)
- [x] T023 [US2] Add contact form link handling in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (detect contact-related responses, link to `/contact-us` page)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - chatbot can answer questions AND suggest navigation

---

## Phase 5: User Story 3 - Multi-Language Support (Priority: P2)

**Goal**: Chatbot supports multiple languages (English, French, Spanish, Chinese) consistent with website's language support. Chatbot detects language preference and responds in that language.

**Independent Test**: Switch site language to French, open chatbot, verify UI appears in French. Ask question in French, verify response is in French. Switch language mid-conversation, verify subsequent responses use new language.

### Implementation for User Story 3

- [x] T024 [US3] Integrate LanguageContext in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (import useLanguage hook from `src/contexts/LanguageContext.tsx`)
- [x] T025 [US3] Add language to session state in useChatWidget hook (`src/lib/hooks/use-chat-widget.ts`) (store current language in WidgetState, update on language change)
- [x] T026 [US3] Pass language to API route from ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (include language in request body when calling useChat)
- [x] T027 [US3] Handle language parameter in API route (`src/app/api/chat/route.ts`) (accept language from request, pass to AI model for multilingual responses)
- [x] T028 [US3] Translate UI elements in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (welcome message, placeholders, error messages using LanguageContext translations)
- [x] T029 [US3] Implement language switching detection in API route (`src/app/api/chat/route.ts`) (detect explicit language change requests like "Can you speak Spanish?", update response language)

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently - chatbot supports multiple languages

---

## Phase 6: User Story 4 - Handle Edge Cases and Errors Gracefully (Priority: P3)

**Goal**: Chatbot handles errors gracefully with fallback responses, rate limiting, and helpful error messages. System switches to rule-based responses when AI API is unavailable.

**Independent Test**: Disconnect internet, send message, verify fallback response appears. Send 21 messages quickly, verify rate limit error appears. Ask inappropriate question, verify polite redirect. Ask unanswerable question, verify helpful fallback message.

### Implementation for User Story 4

- [x] T030 [US4] Implement rate limiting logic in useChatWidget hook (`src/lib/hooks/use-chat-widget.ts`) (track message count and timestamp in RateLimitInfo, enforce 20 messages/hour limit)
- [x] T031 [US4] Add rate limit check before sending messages in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (check rate limit before calling sendMessage, show error if exceeded)
- [x] T032 [US4] Create rule-based fallback system in `src/lib/utils/fallback-responses.ts` (map common questions to answers, extract from company data)
- [x] T033 [US4] Integrate fallback system in API route (`src/app/api/chat/route.ts`) (detect API failures, check if question matches fallback patterns, return rule-based response)
- [x] T034 [US4] Implement comprehensive error handling in API route (`src/app/api/chat/route.ts`) (handle timeout, rate limits, network errors, API failures with appropriate error responses)
- [x] T035 [US4] Add error display UI in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (show error messages, retry button, alternative contact methods)
- [x] T036 [US4] Implement retry logic in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (retry failed requests, handle retry after rate limit)
- [x] T037 [US4] Add loading state indicators in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (show "Thinking..." when processing, visual feedback during streaming)
- [x] T038 [US4] Implement inappropriate question detection in API route (`src/app/api/chat/route.ts`) (detect off-topic questions, redirect to business topics politely)
- [x] T039 [US4] Add unanswerable question handling in API route (`src/app/api/chat/route.ts`) (detect questions outside knowledge base, suggest alternative resources)

**Checkpoint**: At this point, all user stories should work independently with comprehensive error handling

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories, final polish, and validation

- [x] T040 [P] Add keyboard accessibility (Escape to close, Enter to send, Tab navigation) in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`)
- [x] T041 [P] Add ARIA attributes for screen readers (role="dialog", aria-label, aria-modal) in ChatWidget components
- [x] T042 [P] Implement auto-scroll to bottom when new messages arrive in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`)
- [x] T043 [P] Add message copy functionality in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`) (copy button for each message)
- [x] T044 [P] Optimize performance (lazy load ChatWidget, code splitting) in root layout (`src/app/layout.tsx`)
- [x] T045 [P] Add message trimming logic (limit to 100 messages, remove oldest) in useChatWidget hook (`src/lib/hooks/use-chat-widget.ts`)
- [x] T046 [P] Handle sessionStorage quota exceeded errors gracefully in storage utilities (`src/lib/utils/storage.ts`)
- [x] T047 [P] Add welcome message on first open in ChatWidgetPanel (`src/components/chat-widget/chat-widget-panel.tsx`)
- [x] T048 [P] Validate quickstart.md implementation checklist (verify all steps work correctly)
- [x] T049 [P] Run code quality checks (npm run check-all, fix linting/formatting issues)
- [x] T050 [P] Test all acceptance scenarios from spec.md (verify each user story's acceptance criteria)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P2 → P3)
  - US2 and US3 can potentially run in parallel after US1 (different files, minimal dependencies)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Enhances US1 but independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Enhances all stories but independently testable

### Within Each User Story

- Components before integration
- API route before component integration
- Core functionality before enhancements
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001-T003) can run in parallel
- Foundational tasks T004-T007 can run in parallel (different files)
- After Foundational, US2 and US3 can potentially run in parallel (different concerns)
- All Polish tasks (T040-T050) marked [P] can run in parallel
- Different components within a story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch foundational tasks in parallel:
Task: "Create TypeScript type definitions in src/types/chat-widget.ts"
Task: "Create storage utilities in src/lib/utils/storage.ts"
Task: "Create API route structure in src/app/api/chat/route.ts"

# Launch component creation in parallel:
Task: "Create ChatWidgetIcon component in src/components/chat-widget/chat-widget-icon.tsx"
Task: "Create ChatWidgetPanel component skeleton in src/components/chat-widget/chat-widget-panel.tsx"
Task: "Create ChatWidget root component in src/components/chat-widget/chat-widget.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T007) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T008-T017)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

**MVP Scope**: Basic chatbot that opens, answers questions, and persists conversation. No navigation, no multi-language, no error handling beyond basics.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (Navigation support)
4. Add User Story 3 → Test independently → Deploy/Demo (Multi-language)
5. Add User Story 4 → Test independently → Deploy/Demo (Error handling)
6. Polish → Final validation → Production ready

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (core functionality)
   - Developer B: User Story 2 (navigation) - can start after US1 components exist
   - Developer C: User Story 3 (multi-language) - can start after US1 components exist
3. Developer A: User Story 4 (error handling) - after US1-3 complete
4. All: Polish phase together

---

## Task Summary

**Total Tasks**: 50

**Tasks by Phase**:
- Phase 1 (Setup): 3 tasks
- Phase 2 (Foundational): 4 tasks
- Phase 3 (User Story 1): 10 tasks
- Phase 4 (User Story 2): 6 tasks
- Phase 5 (User Story 3): 6 tasks
- Phase 6 (User Story 4): 10 tasks
- Phase 7 (Polish): 11 tasks

**Tasks by User Story**:
- User Story 1 (P1): 10 tasks
- User Story 2 (P2): 6 tasks
- User Story 3 (P2): 6 tasks
- User Story 4 (P3): 10 tasks

**Parallel Opportunities**: 
- 25+ tasks marked [P] can run in parallel
- Foundational tasks can run in parallel
- US2 and US3 can run in parallel after US1
- All Polish tasks can run in parallel

**Independent Test Criteria**:
- **US1**: Open chatbot, ask service question, verify response, verify persistence
- **US2**: Ask navigation question, verify suggestion, verify navigation works
- **US3**: Switch language, verify UI and responses in that language
- **US4**: Trigger errors, verify graceful handling and fallback responses

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phase 3 (User Story 1 only) = 17 tasks

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify each checkpoint before moving to next phase
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Reference implementation: https://images-hub-pim.vercel.app/
- Match reference UI exactly (bottom-right floating button, same styling, same animations)

