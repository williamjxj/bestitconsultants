# Component Interfaces: AI Chatbot

**Date**: 2025-01-27  
**Feature**: AI Chatbot

## Overview

This document defines the TypeScript interfaces and component contracts for the AI chatbot feature.

## Component Hierarchy

```
ChatWidget (root)
├── ChatWidgetIcon (when closed)
└── ChatWidgetPanel (when open)
    ├── MessageList
    ├── MessageInput
    └── ErrorDisplay (conditional)
```

## Component Interfaces

### ChatWidget

**File**: `src/components/chat-widget/chat-widget.tsx`

**Props**: None

**State**:
- `isOpen: boolean` - Whether chat panel is open

**Behavior**:
- Renders `ChatWidgetIcon` when closed
- Renders `ChatWidgetPanel` when open
- Manages open/close state

**Exports**:
```typescript
export function ChatWidget(): JSX.Element
```

### ChatWidgetIcon

**File**: `src/components/chat-widget/chat-widget-icon.tsx`

**Props**:
```typescript
interface ChatWidgetIconProps {
  onClick: () => void;
  isOpen: boolean;
}
```

**Behavior**:
- Fixed position bottom-right corner
- Displays `/angel.webp` image
- Animated with Framer Motion
- Accessible (ARIA labels, keyboard support)

**Exports**:
```typescript
export function ChatWidgetIcon({ onClick, isOpen }: ChatWidgetIconProps): JSX.Element
```

### ChatWidgetPanel

**File**: `src/components/chat-widget/chat-widget-panel.tsx`

**Props**:
```typescript
interface ChatWidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**State**:
- `input: string` - Current input value
- `copiedMessageId: string | null` - ID of copied message
- `isInitialized: boolean` - Whether messages loaded from storage

**Behavior**:
- Displays message list
- Handles message input and submission
- Manages streaming responses
- Shows loading/error states
- Auto-scrolls to bottom
- Handles Escape key to close

**Exports**:
```typescript
export function ChatWidgetPanel({ isOpen, onClose }: ChatWidgetPanelProps): JSX.Element
```

## Hook Interfaces

### useChatWidget

**File**: `src/lib/hooks/use-chat-widget.ts`

**Parameters**: None (or optional `userId?: string` for future extensibility)

**Returns**:
```typescript
interface UseChatWidgetReturn {
  isOpen: boolean;
  messages: Message[];
  openWidget: () => void;
  closeWidget: () => void;
  toggleWidget: () => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  clearAll: () => void;
}
```

**Behavior**:
- Manages chat widget state
- Persists to sessionStorage
- Loads from sessionStorage on mount
- Debounces saves (100ms)
- Limits messages to 100

**Exports**:
```typescript
export function useChatWidget(userId?: string): UseChatWidgetReturn
```

## Type Definitions

### Message

**File**: `src/types/chat-widget.ts`

```typescript
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  parts?: MessagePart[];
}
```

### MessagePart

```typescript
interface MessagePart {
  type: "text" | "image" | "tool";
  text?: string;
}
```

### WidgetState

```typescript
interface WidgetState {
  isOpen: boolean;
  messages: Message[];
  lastUpdated: number;
  language?: "en" | "fr" | "es" | "cn";
  rateLimit?: RateLimitInfo;
}
```

### RateLimitInfo

```typescript
interface RateLimitInfo {
  messageCount: number;
  windowStart: number;
  limit: number;
  windowDuration: number;
}
```

## Storage Interfaces

### Storage Utilities

**File**: `src/lib/utils/storage.ts`

**Functions**:
```typescript
export function saveWidgetState(
  state: WidgetState,
  userId?: string
): void

export function loadWidgetState(
  userId?: string
): WidgetState | null

export function clearWidgetState(
  userId?: string
): void

export function isStorageAvailable(): boolean
```

**Storage Key**: `chat-widget-state` (sessionStorage)

## API Integration

### useChat Hook (Vercel AI SDK)

**Package**: `@ai-sdk/react`

**Usage**:
```typescript
const { messages, sendMessage, status, error, setMessages } = useChat({
  transport: new DefaultChatTransport({ api: "/api/chat" }),
  onError: (error) => {
    console.error("Chat error:", error);
  },
});
```

**Returns**:
- `messages`: Array of UI messages from AI SDK
- `sendMessage`: Function to send a message
- `status`: "idle" | "streaming" | "submitted" | "error"
- `error`: Error object if error occurred
- `setMessages`: Function to set messages (for initialization)

## Integration Points

### LanguageContext Integration

**File**: `src/contexts/LanguageContext.tsx`

**Usage**:
```typescript
import { useLanguage } from "@/contexts/LanguageContext";

const { language, translations } = useLanguage();
```

**Integration**:
- Pass `language` to API route via headers or request body
- Use `translations` for UI text (welcome message, placeholders, errors)

### Navigation Integration

**Usage**:
```typescript
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/services");
```

**Integration**:
- Navigate to suggested pages from chatbot responses
- Maintain chat state during navigation (sessionStorage)

## Error Handling Interfaces

### Error Types

```typescript
type ErrorType =
  | "validation"
  | "timeout"
  | "rate_limit"
  | "service"
  | "network"
  | "authentication"
  | "authorization"
  | "configuration";

interface ChatError {
  type: ErrorType;
  message: string;
  retryable: boolean;
  retryAfter?: number;
  details?: string;
  actionUrl?: string;
}
```

### Error Display Component

**Behavior**:
- Shows error message
- Shows retry button if `retryable: true`
- Shows action link if `actionUrl` provided
- Handles different error types appropriately

## Accessibility Requirements

### ARIA Attributes

- `role="dialog"` on ChatWidgetPanel
- `aria-label` on icon button
- `aria-modal="true"` on panel
- `aria-label` on close button
- `aria-label` on send button

### Keyboard Support

- Enter/Space: Open/close widget
- Escape: Close widget
- Enter: Send message (in input)
- Tab: Navigate between elements

### Screen Reader Support

- Announce widget open/close
- Announce new messages
- Announce errors
- Announce loading states

## Performance Considerations

### Lazy Loading

- ChatWidget can be lazy loaded (not critical for initial page load)
- Components loaded on demand

### Debouncing

- Storage saves debounced (100ms)
- Prevents excessive sessionStorage writes

### Message Limiting

- Maximum 100 messages per session
- Older messages trimmed automatically
- Prevents memory issues

## Testing Interfaces

### Component Testing

**Mock Interfaces**:
```typescript
interface MockChatWidgetProps {
  initialIsOpen?: boolean;
  initialMessages?: Message[];
  mockApiResponse?: (messages: Message[]) => Promise<Response>;
}
```

### Hook Testing

**Mock Storage**:
```typescript
interface MockStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}
```

## Future Extensibility

### Potential Additions

- Message reactions (thumbs up/down)
- Message editing
- Conversation export
- Voice input/output
- File attachments
- Tool calls (function calling)

### Interface Compatibility

- MessagePart structure supports future types
- WidgetState can accommodate new fields
- Component props can be extended without breaking changes

