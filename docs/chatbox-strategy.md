# Chatbox Strategy & Gitingest Analysis

## Executive Summary

**You do NOT need to use the full Gitingest context.**

While `gitingest` is excellent for coding assistance (like what I do), it is **inefficient and
potentially risky** for a customer-facing chatbot.

## Detailed Answers

### 1. Is it necessary to use the Gitingest context?

**No.**

- **Noise vs. Signal**: Gitingest includes imports, React hooks, CSS classes, and configuration
  files. Your customers don't care about your `useEffect` hooks; they care about your _Services_ and
  _Case Studies_.
- **Token Cost**: Sending 50,000 tokens of code for every "Hello" message is expensive and slow.
- **Security**: You might accidentally leak internal logic or comments that shouldn't be public.

### 2. How to integrate content dynamically?

Instead of dumping raw code, you should use **Structured Data Injection**. You are already doing
this in `src/lib/utils/knowledge-base.ts`, which is the _correct_ approach.

**Better Approach: The "Content Aggregator"** If you want to ensure _all_ text on the website is
included (e.g., marketing copy in `page.tsx`), you should:

1. **Identify Data Sources**: We found `src/data/contentSections.ts` and `src/data/seoMetadata.ts`
   which are currently _not_ being used by the chatbot.
2. **Update Knowledge Base**: Import these files into `knowledge-base.ts` and add them to the system
   prompt.

### 3. How to use Gitingest automatically?

If you still wanted to use it (not recommended for this use case), you would need to:

- Write a script that runs `git ls-files`, reads each file, and concatenates them.
- Run this script during `npm run build`.
- Save the output to `public/context.txt`.
- Have the API route read this file. _Again, I strongly advise against this for a customer-facing
  bot._

### 4. Recommendations for Improvement

#### A. Immediate Wins (Low Effort)

1. **Include Missing Data**: Add `contentSections.ts` (Landing Page Copy) and `seoMetadata.ts` to
   `knowledge-base.ts`.
2. **Refine the Prompt**: The current prompt is good but could be more specific about the "Tone of
   Voice" (e.g., "Professional but approachable").

#### B. Engineering Improvements (Medium Effort)

1. **Build-Time Content Extraction**: Create a script `scripts/generate-context.ts` that imports all
   your data files and generates a optimized `src/generated/ai-context.json`. This ensures the AI
   always has the latest data without runtime overhead.

#### C. Advanced Features (High Effort)

1. **RAG (Retrieval Augmented Generation)**: If you add a **Blog** or have **100+ Case Studies**,
   you must switch to RAG.
   - Store content in a Vector Database (Pinecone/Supabase).
   - Search for relevant chunks before answering.

## Proposed Action Plan

1. **Modify `src/lib/utils/knowledge-base.ts`** to include `contentSections.ts`. This will give the
   AI knowledge of your landing page marketing copy.
2. **Stick with the current architecture**. It is cleaner, faster, and safer than dumping raw code.
