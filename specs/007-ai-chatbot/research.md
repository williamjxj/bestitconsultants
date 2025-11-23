# Research: AI Chatbot Feature

**Date**: 2025-01-27  
**Reference Implementation**: https://images-hub-pim.vercel.app/  
**Source Repository**: https://github.com/williamjxj/images-hub

## Overview

This research document consolidates findings from analyzing the reference implementation and determines the technical approach for migrating the AI chatbot feature to the BestIT Consultants website.

## Reference Implementation Analysis

### Architecture Overview

The reference implementation uses:
- **Next.js 16** with App Router
- **Vercel AI SDK** (`@ai-sdk/react`) for chat functionality
- **DeepSeek LLM** via Vercel AI Gateway (production) or direct API (local)
- **Framer Motion** for animations
- **shadcn/ui** components (Radix UI primitives)
- **localStorage** for session persistence (browser session storage)
- **TypeScript** strict mode

### Component Structure

**Main Components:**
1. `ChatWidget` - Root component that manages open/close state
2. `ChatWidgetIcon` - Floating button (bottom-right) with angel.webp image
3. `ChatWidgetPanel` - Full chat interface panel

**Key Files:**
- `components/chat-widget/chat-widget.tsx` - Main widget component
- `components/chat-widget/chat-widget-icon.tsx` - Icon/trigger button
- `components/chat-widget/chat-widget-panel.tsx` - Chat panel with messages
- `app/api/chat/route.ts` - API route handler
- `lib/hooks/use-chat-widget.ts` - State management hook with localStorage
- `types/chat-widget.ts` - TypeScript type definitions

### Technical Decisions

#### Decision 1: AI Service Architecture
**Decision**: Use Vercel AI Gateway with DeepSeek LLM, with fallback to rule-based responses

**Rationale**:
- Reference implementation uses Vercel AI Gateway for production (cost-effective, reliable)
- DeepSeek provides good quality responses at lower cost than OpenAI/Anthropic
- User already has `AI_GATEWAY_API_KEY` and `DEEPSEEK_API_KEY` configured
- Fallback to rule-based responses ensures availability when API is unavailable

**Alternatives Considered**:
- Direct OpenAI API: Higher cost, no gateway benefits
- Self-hosted model: Requires significant infrastructure
- Hybrid approach: More complex, but provides best reliability

**Implementation Notes**:
- Production: Use model string format `"deepseek/deepseek-chat"` which routes through AI Gateway
- Local: Use `@ai-sdk/deepseek` provider directly with `DEEPSEEK_API_KEY`
- Fallback: Implement rule-based responses for common FAQs when API fails

#### Decision 2: State Management & Persistence
**Decision**: Use browser sessionStorage (not localStorage) for chat persistence

**Rationale**:
- Spec requirement: "Sessions persist within the same browser session"
- sessionStorage automatically clears when browser closes (matches spec)
- Reference uses localStorage but we need sessionStorage per spec
- No server-side persistence needed (out of scope)

**Alternatives Considered**:
- localStorage: Persists across browser sessions (doesn't match spec)
- Server-side storage: Requires authentication (out of scope)
- No persistence: Poor UX, loses context on navigation

**Implementation Notes**:
- Use `sessionStorage` instead of `localStorage` in the hook
- Store messages, timestamps, and session metadata
- Clear on browser close automatically
- Persist across page navigations within same session

#### Decision 3: UI/UX Implementation
**Decision**: Match reference implementation exactly - bottom-right floating button, same animations, same styling

**Rationale**:
- User explicitly requested: "implement the ai-chatbot exactly the same as looks in https://images-hub-pim.vercel.app/"
- Reference has proven UX patterns
- Consistent with modern chatbot implementations
- Uses existing design system (shadcn/ui, Tailwind CSS)

**Key UI Elements**:
- Floating button: Bottom-right corner, fixed position, z-index 9999
- Icon: Uses `/angel.webp` (already added to public folder)
- Panel: Fixed position, max-width 450px, max-height 700px
- Animations: Framer Motion for open/close transitions
- Styling: Tailwind CSS utility classes, shadcn/ui Card component

**Alternatives Considered**:
- Different placement: Doesn't match user requirement
- Different styling: Doesn't match user requirement
- Custom CSS: Violates constitution (Tailwind only)

#### Decision 4: Rate Limiting Strategy
**Decision**: Client-side rate limiting with sessionStorage tracking (20 messages/hour per visitor)

**Rationale**:
- Spec requirement: "Per-visitor rate limiting (e.g., 20 messages per hour)"
- No authentication means client-side tracking is necessary
- Use sessionStorage to track message count and timestamp
- Reset counter after 1 hour window

**Alternatives Considered**:
- Server-side rate limiting: Requires user identification (not available without auth)
- IP-based rate limiting: Less accurate, can affect shared IPs
- No rate limiting: High cost risk, potential abuse

**Implementation Notes**:
- Track message count and first message timestamp in sessionStorage
- Check before sending each message
- Show friendly error message when limit reached
- Suggest alternative contact methods

#### Decision 5: Multi-Language Support
**Decision**: Integrate with existing LanguageContext system

**Rationale**:
- Website already has multi-language support (en, fr, es, cn)
- Spec requires: "consistent with the website's language support"
- Reference implementation doesn't have multi-language (we need to add this)
- Use existing `LanguageContext` from `src/contexts/LanguageContext.tsx`

**Alternatives Considered**:
- Separate language detection: Duplicates existing functionality
- Browser language only: Doesn't respect user's site language choice
- No multi-language: Violates spec requirement

**Implementation Notes**:
- Use `useLanguage()` hook from LanguageContext
- Pass language to API route for AI responses
- Translate UI elements (welcome message, placeholders, errors)
- Support language switching mid-conversation

#### Decision 6: Error Handling & Fallback
**Decision**: Comprehensive error handling with rule-based fallback for common questions

**Rationale**:
- Spec requirement: "fallback to rule-based responses when API is unavailable"
- Reference has good error handling patterns we can adapt
- Rule-based responses ensure availability for common questions
- Graceful degradation improves user experience

**Common Questions for Rule-Based Fallback**:
- "What services do you offer?"
- "How can I contact you?"
- "Where are your case studies?"
- "Tell me about your team"
- General company information

**Alternatives Considered**:
- No fallback: Poor UX when API is down
- Generic error only: Doesn't help users
- Full rule-based system: Too complex, AI is better

#### Decision 7: Dependencies & Packages
**Decision**: Add required packages from reference implementation

**Required Packages**:
- `ai` - Vercel AI SDK core
- `@ai-sdk/react` - React hooks for AI SDK
- `@ai-sdk/deepseek` - DeepSeek provider (for local dev)

**Rationale**:
- Reference uses Vercel AI SDK (industry standard)
- Already compatible with Next.js 15
- Well-maintained, good TypeScript support
- Matches reference implementation

**Alternatives Considered**:
- Custom AI integration: More work, less reliable
- Different AI SDK: Doesn't match reference
- Direct API calls: More complex, less features

## Integration Points

### Existing Systems to Integrate With

1. **LanguageContext** (`src/contexts/LanguageContext.tsx`)
   - Use `useLanguage()` hook
   - Get current language for API requests
   - Translate UI elements

2. **Navigation System**
   - Use Next.js `useRouter()` for page navigation
   - Link to services, case studies, contact pages
   - Maintain navigation state

3. **Contact Form** (`src/components/contact/ContactForm.tsx`)
   - Link to contact form from chatbot
   - Pre-fill form if possible
   - Navigate to `/contact-us`

4. **Company Data** (for knowledge base)
   - `src/data/serviceCategories.ts` - Service information
   - `src/data/caseStudies.ts` - Case study details
   - `src/data/teamMembers.ts` - Team information
   - `src/lib/footer-constants.ts` - Contact details

### API Route Structure

**Route**: `/app/api/chat/route.ts`

**Key Features**:
- Edge runtime for lower latency
- Use Vercel AI Gateway in production
- Use DeepSeek provider directly in local dev
- Rate limiting check (if server-side needed)
- Error handling with fallback
- Multi-language support via request headers

**Request Format**:
```typescript
{
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    parts?: Array<{ type: "text"; text: string }>;
  }>;
  language?: "en" | "fr" | "es" | "cn";
}
```

**Response Format**:
- Streaming response (Vercel AI SDK format)
- Error responses with retry information
- Fallback responses when API unavailable

## Migration Strategy

### Phase 1: Core Components
1. Copy and adapt `ChatWidget`, `ChatWidgetIcon`, `ChatWidgetPanel` components
2. Adapt to use sessionStorage instead of localStorage
3. Integrate with existing LanguageContext
4. Match styling exactly from reference

### Phase 2: API Route
1. Create `/app/api/chat/route.ts`
2. Implement Vercel AI Gateway integration
3. Add fallback to rule-based responses
4. Add rate limiting logic
5. Add multi-language support

### Phase 3: State Management
1. Create `use-chat-widget.ts` hook
2. Adapt to use sessionStorage
3. Add rate limiting tracking
4. Integrate with LanguageContext

### Phase 4: Knowledge Base & Fallback
1. Create rule-based response system
2. Extract company information from data files
3. Create FAQ mapping
4. Implement fallback logic

### Phase 5: Integration & Testing
1. Add ChatWidget to root layout
2. Test multi-language support
3. Test rate limiting
4. Test fallback responses
5. Test session persistence

## Open Questions Resolved

✅ **Q: How to handle authentication?**  
A: No authentication required per spec. Chatbot is public-facing.

✅ **Q: Which AI service to use?**  
A: DeepSeek via Vercel AI Gateway (already configured by user).

✅ **Q: How to persist sessions?**  
A: Browser sessionStorage (clears on browser close, persists across pages).

✅ **Q: How to implement rate limiting without auth?**  
A: Client-side tracking in sessionStorage with timestamp-based windows.

✅ **Q: How to match reference UI exactly?**  
A: Copy component structure, use same animations, same styling, same positioning.

## Risks & Mitigations

**Risk 1**: Vercel AI Gateway costs  
**Mitigation**: Rate limiting (20 messages/hour), fallback to rule-based responses

**Risk 2**: API availability  
**Mitigation**: Comprehensive fallback system for common questions

**Risk 3**: Rate limiting bypass (client-side)  
**Mitigation**: Acceptable risk for MVP; can add server-side validation later if needed

**Risk 4**: Multi-language AI responses  
**Mitigation**: Pass language to API, DeepSeek supports multiple languages

**Risk 5**: SessionStorage limitations  
**Mitigation**: Handle storage quota exceeded errors gracefully

## Next Steps

1. Install required dependencies (`ai`, `@ai-sdk/react`, `@ai-sdk/deepseek`)
2. Create component structure matching reference
3. Implement API route with AI Gateway integration
4. Create state management hook with sessionStorage
5. Implement rule-based fallback system
6. Integrate with LanguageContext
7. Add to root layout
8. Test all scenarios

## References

- Reference Implementation: https://images-hub-pim.vercel.app/
- Source Code: https://github.com/williamjxj/images-hub
- Vercel AI SDK Docs: https://sdk.vercel.ai/docs
- DeepSeek API Docs: https://platform.deepseek.com/docs

