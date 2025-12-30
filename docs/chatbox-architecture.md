# Chatbox Architecture Analysis

## Overview

The chatbox feature in the **BestIT Consultants** application is a **Next.js-based AI Assistant** powered by **Deepseek** (via Vercel AI SDK). It provides instant answers to user queries about the company's services, team, and case studies.

### Core Technologies
- **Framework**: Next.js App Router
- **AI SDK**: Vercel AI SDK (`ai`, `@ai-sdk/deepseek`)
- **Model**: Deepseek Chat (`deepseek-chat`)
- **Infrastructure**: Vercel AI Gateway (Production) / Direct API (Local)

---

## How It Works

### 1. Request Flow
1.  **User Interaction**: The user types a message in the chat widget (`src/components/chat-widget`).
2.  **API Call**: The frontend sends a POST request to `/api/chat` with the conversation history.
3.  **Context Injection**: The backend constructs a "System Message" containing the company's entire knowledge base.
4.  **LLM Processing**: The request (System Message + User History) is sent to the Deepseek API.
5.  **Streaming Response**: The AI's response is streamed back to the frontend in real-time.

### 2. Does it use RAG (Retrieval-Augmented Generation)?
**No, not in the traditional sense.**

It uses **Context Injection** (also known as "Prompt Engineering with Context").
- **Traditional RAG**: Uses a vector database to search for *relevant* chunks of data and only injects those specific chunks. This is used when the data is too large to fit in the context window (e.g., thousands of PDF pages).
- **Current Implementation**: It loads the **entire** relevant dataset (Services, Top 5 Case Studies, Top 5 Team Members) directly into the System Prompt for *every* request.

**Why this works**: The current dataset is small enough to fit easily within Deepseek's context window (typically 8k-32k tokens). This is faster and simpler than setting up a vector database.

### 3. Website Context Integration

The context is defined in `src/lib/utils/knowledge-base.ts`. It aggregates data from structured data files in the codebase.

**Data Sources:**
- **Services**: `src/data/serviceCategories.ts`
- **Case Studies**: `src/data/caseStudies.ts` (Top 5)
- **Team**: `src/data/teamMembers.ts` (Top 5)
- **Contact Info**: Hardcoded in `getContactInfo()`

**The "Brain" (System Prompt):**
The `getCompanyKnowledgeBase()` function generates a text block like this:
```text
Company Services:
- AI/ML Solutions: Description...
- Web Development: Description...

Recent Case Studies:
- Project A: Result...
- Project B: Result...

Key Team Members:
- Alice: CEO...
- Bob: CTO...

Contact Information:
- Website: ...
```
This block is inserted into the `system` role message sent to Deepseek.

---

## Deepseek & Vercel Integration

The integration is handled in `src/app/api/chat/route.ts`.

### Production vs. Local
- **Production (Vercel)**:
  - Uses **Vercel AI Gateway**.
  - Model: `'deepseek/deepseek-chat'`
  - The request is routed through Vercel's infrastructure, which manages the API keys and caching.
- **Local Development**:
  - Uses **Direct API**.
  - Provider: `createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY })`
  - Connects directly to Deepseek's servers.

---

## How to Improve & Optimize

### 1. Optimize Context (Current Approach)
- **Refine Summaries**: Instead of raw data, create dedicated "AI-ready" summaries in the data files that are more token-efficient.
- **Dynamic Selection**: If the user asks about "Team", inject *all* team members but fewer case studies. This requires a two-step process (classifier -> context selection).

### 2. Upgrade to True RAG (Scalability)
If the dataset grows (e.g., 100+ case studies, full blog posts), the current approach will hit token limits.
- **Solution**: Implement a Vector Database (e.g., Pinecone, Supabase pgvector).
- **Workflow**:
  1. Generate embeddings for all case studies/services.
  2. On user query, search vector DB for "relevant chunks".
  3. Inject only the top 3-5 relevant chunks into the prompt.

### 3. Add "Tools" (Function Calling)
Give the AI the ability to "browse" the site data instead of memorizing it.
- **Implementation**: Define tools like `getCaseStudyDetails(id)` or `searchTeam(skill)`.
- **Benefit**: The AI can fetch specific details only when needed, keeping the initial context light.

### 4. Client-Side Context
- **Current Page Awareness**: Pass the current URL or page content from the frontend to the backend.
- **Benefit**: The AI knows "The user is currently looking at the Pricing page" and can tailor answers (e.g., "As you can see on this page...").

## Summary
The current chatbox is a **lightweight, efficient implementation** suitable for a marketing site. It relies on **Context Injection** rather than complex RAG, which is the correct engineering choice for the current scale of data.
