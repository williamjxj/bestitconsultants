# Quickstart Guide: AI Chatbot Feature

**Date**: 2025-01-27  
**Feature**: AI Chatbot  
**Branch**: `007-ai-chatbot`

## Prerequisites

✅ Environment variables already configured:

- `AI_GATEWAY_API_KEY` - Vercel AI Gateway API key
- `DEEPSEEK_API_KEY` - DeepSeek API key for local development

✅ Assets already added:

- `/public/assets/angel.webp` - Chat widget icon image

## Installation Steps

### Step 1: Install Dependencies

```bash
npm install ai @ai-sdk/react @ai-sdk/deepseek
```

**Packages**:

- `ai` - Vercel AI SDK core
- `@ai-sdk/react` - React hooks for AI SDK
- `@ai-sdk/deepseek` - DeepSeek provider for local development

### Step 2: Create Type Definitions

Create `src/types/chat-widget.ts`:

```typescript
export interface WidgetState {
  isOpen: boolean
  messages: Message[]
  lastUpdated: number
  language?: 'en' | 'fr' | 'es' | 'cn'
  rateLimit?: RateLimitInfo
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  parts?: MessagePart[]
}

export interface MessagePart {
  type: 'text' | 'image' | 'tool'
  text?: string
}

export interface RateLimitInfo {
  messageCount: number
  windowStart: number
  limit: number
  windowDuration: number
}
```

### Step 3: Create Storage Utilities

Create `src/lib/utils/storage.ts`:

```typescript
import type { WidgetState } from '@/types/chat-widget'

const STORAGE_KEY = 'chat-widget-state'

export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__'
    sessionStorage.setItem(test, test)
    sessionStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

export function saveWidgetState(state: WidgetState, userId?: string): void {
  if (!isStorageAvailable()) return
  try {
    const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY
    sessionStorage.setItem(key, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save widget state:', error)
  }
}

export function loadWidgetState(userId?: string): WidgetState | null {
  if (!isStorageAvailable()) return null
  try {
    const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY
    const stored = sessionStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Failed to load widget state:', error)
    return null
  }
}

export function clearWidgetState(userId?: string): void {
  if (!isStorageAvailable()) return
  try {
    const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to clear widget state:', error)
  }
}
```

### Step 4: Create Chat Widget Hook

Create `src/lib/hooks/use-chat-widget.ts`:

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import type { WidgetState, Message } from '@/types/chat-widget'
import {
  saveWidgetState,
  loadWidgetState,
  clearWidgetState,
  isStorageAvailable,
} from '@/lib/utils/storage'

const DEBOUNCE_MS = 100
const MAX_MESSAGES = 100

export function useChatWidget(userId?: string) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  // Load state from sessionStorage on mount
  useEffect(() => {
    if (!isStorageAvailable()) return
    try {
      const stored = loadWidgetState(userId)
      if (stored) {
        setIsOpen(stored.isOpen ?? false)
        setMessages(stored.messages ?? [])
      }
    } catch (error) {
      console.error('Failed to load widget state:', error)
    }
  }, [userId])

  // Save state to sessionStorage (debounced)
  useEffect(() => {
    if (!isStorageAvailable()) return
    const timer = setTimeout(() => {
      try {
        const state: WidgetState = {
          isOpen,
          messages,
          lastUpdated: Date.now(),
        }
        saveWidgetState(state, userId)
      } catch (error) {
        console.error('Failed to save widget state:', error)
      }
    }, DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [isOpen, messages, userId])

  const openWidget = useCallback(() => setIsOpen(true), [])
  const closeWidget = useCallback(() => setIsOpen(false), [])
  const toggleWidget = useCallback(() => setIsOpen(prev => !prev), [])

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => {
      const updated = [...prev, message]
      return updated.slice(-MAX_MESSAGES)
    })
  }, [])

  const clearMessages = useCallback(() => setMessages([]), [])

  const clearAll = useCallback(() => {
    setIsOpen(false)
    setMessages([])
    if (isStorageAvailable()) {
      clearWidgetState(userId)
    }
  }, [userId])

  return {
    isOpen,
    messages,
    openWidget,
    closeWidget,
    toggleWidget,
    addMessage,
    clearMessages,
    clearAll,
  }
}
```

### Step 5: Create Chat Widget Components

Create `src/components/chat-widget/chat-widget-icon.tsx`:

```typescript
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChatWidgetIconProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatWidgetIcon({ onClick, isOpen }: ChatWidgetIconProps) {
  return (
    <motion.div
      initial={false}
      animate={{ scale: isOpen ? 0.9 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        variant="ghost"
        className="fixed bottom-6 right-6 z-[9999] h-auto rounded-full shadow-lg hover:shadow-xl transition-shadow p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        <Image
          src="/assets/angel.webp"
          alt="AI Assistant"
          width={80}
          height={80}
          className="object-cover rounded-full"
        />
      </Button>
    </motion.div>
  );
}
```

Create `src/components/chat-widget/chat-widget-panel.tsx` (see reference implementation for full
code - adapt from images-hub).

Create `src/components/chat-widget/chat-widget.tsx`:

```typescript
"use client";

import { useState } from "react";
import { ChatWidgetIcon } from "./chat-widget-icon";
import { ChatWidgetPanel } from "./chat-widget-panel";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
  };

  const closeWidget = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && <ChatWidgetIcon onClick={toggleWidget} isOpen={isOpen} />}
      {isOpen && <ChatWidgetPanel isOpen={isOpen} onClose={closeWidget} />}
    </>
  );
}
```

### Step 6: Create API Route

Create `src/app/api/chat/route.ts`:

```typescript
import { streamText, convertToModelMessages } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export const runtime = 'edge'

const REQUEST_TIMEOUT_MS = 60_000

const getModel = () => {
  const isVercelProduction = process.env.VERCEL === '1'

  if (isVercelProduction) {
    return 'deepseek/deepseek-chat'
  } else {
    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY is required for local development')
    }
    const provider = createDeepSeek({ apiKey })
    return provider.chat('deepseek-chat')
  }
}

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: {
            type: 'validation',
            message: 'Messages array is required and cannot be empty',
            retryable: false,
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const modelMessages = convertToModelMessages(messages)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const result = streamText({
        model: getModel(),
        messages: modelMessages,
        temperature: 0.7,
        maxOutputTokens: 2000,
        abortSignal: controller.signal,
      })

      clearTimeout(timeoutId)
      return result.toUIMessageStreamResponse()
    } catch (error) {
      clearTimeout(timeoutId)
      // Handle errors (timeout, rate limit, etc.)
      // Fallback to rule-based responses if needed
      // See full implementation in reference
    }
  } catch (error) {
    // Handle network errors
  }
}
```

### Step 7: Add to Root Layout

Update `src/app/layout.tsx`:

```typescript
import { ChatWidget } from "@/components/chat-widget/chat-widget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

## Implementation Checklist

- [ ] Install dependencies (`ai`, `@ai-sdk/react`, `@ai-sdk/deepseek`)
- [ ] Create type definitions (`src/types/chat-widget.ts`)
- [ ] Create storage utilities (`src/lib/utils/storage.ts`)
- [ ] Create chat widget hook (`src/lib/hooks/use-chat-widget.ts`)
- [ ] Create chat widget components (icon, panel, main)
- [ ] Create API route (`src/app/api/chat/route.ts`)
- [ ] Add ChatWidget to root layout
- [ ] Implement rate limiting logic
- [ ] Implement rule-based fallback responses
- [ ] Integrate with LanguageContext
- [ ] Test multi-language support
- [ ] Test session persistence
- [ ] Test rate limiting
- [ ] Test error handling
- [ ] Test fallback responses

## Testing

### Manual Testing

1. **Basic Functionality**:
   - Open chatbot (click icon)
   - Send a message
   - Verify response appears
   - Close chatbot

2. **Session Persistence**:
   - Open chatbot and send messages
   - Navigate to different page
   - Verify messages persist
   - Close browser and reopen
   - Verify messages cleared

3. **Rate Limiting**:
   - Send 20 messages quickly
   - Verify 21st message shows rate limit error
   - Wait 1 hour (or modify code to test)
   - Verify can send messages again

4. **Multi-Language**:
   - Switch site language to French
   - Open chatbot
   - Verify UI in French
   - Send message
   - Verify response in French

5. **Error Handling**:
   - Disconnect internet
   - Send message
   - Verify fallback response or error message
   - Reconnect internet
   - Verify normal operation resumes

### Automated Testing

```typescript
// Example test structure
describe('ChatWidget', () => {
  it('opens and closes correctly', () => {
    // Test implementation
  })

  it('persists messages across navigation', () => {
    // Test implementation
  })

  it('enforces rate limiting', () => {
    // Test implementation
  })
})
```

## Troubleshooting

### Issue: API returns 401/403

**Solution**: Check environment variables:

- `AI_GATEWAY_API_KEY` set correctly
- `DEEPSEEK_API_KEY` set for local development
- Vercel AI Gateway configured in production

### Issue: Messages not persisting

**Solution**: Check sessionStorage:

- Browser supports sessionStorage
- Storage quota not exceeded
- Check browser console for errors

### Issue: Rate limiting not working

**Solution**: Verify rate limiting logic:

- Check `RateLimitInfo` in sessionStorage
- Verify timestamp calculations
- Check window duration (3600000ms = 1 hour)

### Issue: Multi-language not working

**Solution**: Check LanguageContext integration:

- Verify `useLanguage()` hook works
- Check language passed to API route
- Verify API route handles language parameter

## Next Steps

After basic implementation:

1. Implement rule-based fallback responses
2. Add knowledge base from company data
3. Add navigation suggestions
4. Polish UI/UX
5. Add analytics (optional)
6. Performance optimization

## References

- Reference Implementation: https://images-hub-pim.vercel.app/
- Source Code: https://github.com/williamjxj/images-hub
- Vercel AI SDK: https://sdk.vercel.ai/docs
- DeepSeek API: https://platform.deepseek.com/docs
