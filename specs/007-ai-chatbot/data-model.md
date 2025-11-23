# Data Model: AI Chatbot

**Date**: 2025-01-27  
**Feature**: AI Chatbot

## Overview

This document defines the data structures and entities for the AI chatbot feature. The chatbot uses browser sessionStorage for persistence and does not require server-side data storage.

## Entities

### ChatSession

Represents a single conversation session between a visitor and the chatbot.

**Storage**: Browser sessionStorage (key: `chat-widget-state`)

**Fields**:
- `isOpen` (boolean): Whether the chat widget is currently open
- `messages` (Message[]): Array of messages in the conversation
- `lastUpdated` (number): Timestamp of last update (milliseconds since epoch)
- `language` (string, optional): Current language preference ("en" | "fr" | "es" | "cn")
- `rateLimit` (RateLimitInfo, optional): Rate limiting tracking information

**Lifecycle**:
- Created: When visitor first opens chatbot
- Updated: On each message sent/received, widget open/close
- Deleted: Automatically when browser session ends (sessionStorage)

**Validation Rules**:
- `messages` array must not exceed 100 messages (trim oldest if exceeded)
- `lastUpdated` must be a valid timestamp
- `language` must be one of: "en", "fr", "es", "cn" if provided

### Message

Represents a single message in a conversation.

**Storage**: Part of ChatSession.messages array in sessionStorage

**Fields**:
- `id` (string): Unique message identifier (generated client-side)
- `role` ("user" | "assistant"): Message sender role
- `content` (string): Message text content
- `timestamp` (number): Message timestamp (milliseconds since epoch)
- `parts` (MessagePart[], optional): Structured message parts (for future extensibility)

**Lifecycle**:
- Created: When user sends message or AI responds
- Updated: Never (immutable)
- Deleted: When session ends or manually cleared

**Validation Rules**:
- `id` must be unique within the session
- `role` must be "user" or "assistant"
- `content` must be non-empty string
- `timestamp` must be valid timestamp

**Identity & Uniqueness**:
- Uniqueness: `id` field ensures uniqueness within session
- Identity: Messages are identified by `id` field

### MessagePart

Represents a structured part of a message (for future extensibility).

**Storage**: Part of Message.parts array

**Fields**:
- `type` ("text" | "image" | "tool"): Part type
- `text` (string, optional): Text content (required if type is "text")

**Current Usage**:
- Only "text" type is used in initial implementation
- Other types reserved for future features (images, tool calls, etc.)

### RateLimitInfo

Tracks rate limiting information for a session.

**Storage**: Part of ChatSession.rateLimit in sessionStorage

**Fields**:
- `messageCount` (number): Number of messages sent in current window
- `windowStart` (number): Timestamp when current window started (milliseconds)
- `limit` (number): Maximum messages allowed (default: 20)
- `windowDuration` (number): Window duration in milliseconds (default: 3600000 = 1 hour)

**Lifecycle**:
- Created: On first message in a new window
- Updated: On each message sent
- Reset: When window expires (current time - windowStart > windowDuration)

**Validation Rules**:
- `messageCount` must be >= 0 and <= limit
- `windowStart` must be valid timestamp
- `limit` must be positive integer (default: 20)
- `windowDuration` must be positive integer (default: 3600000)

## Data Relationships

```
ChatSession
├── messages: Message[]
│   └── parts: MessagePart[] (optional)
└── rateLimit: RateLimitInfo (optional)
```

**Cardinality**:
- ChatSession has 0..100 Messages
- Message has 0..N MessageParts (currently 0..1, only "text" type)
- ChatSession has 0..1 RateLimitInfo

## State Transitions

### ChatSession State

```
[Initial] → [Open] → [Closed] → [Open] → ...
     ↓         ↓         ↓         ↓
  [Created] [Updated] [Updated] [Updated]
```

**State Changes**:
- `isOpen: false → true`: Widget opened
- `isOpen: true → false`: Widget closed
- `messages.length` increases: New message added
- `lastUpdated` changes: Any state update

### RateLimitInfo State

```
[No Limit] → [Window Started] → [Limit Reached] → [Window Expired] → [New Window]
```

**State Changes**:
- `messageCount` increases: Message sent
- `messageCount >= limit`: Rate limit reached
- `currentTime - windowStart > windowDuration`: Window expired, reset

## Data Volume & Scale Assumptions

**Per Session**:
- Maximum 100 messages per session (trimmed automatically)
- Average message length: ~100 characters
- Estimated session size: ~50KB (well within sessionStorage limits)

**Per Visitor**:
- One active session at a time
- Session cleared on browser close
- No cross-device persistence

**Global Scale**:
- No server-side storage required
- All data stored client-side in sessionStorage
- No database queries needed
- No scalability concerns (client-side only)

## Storage Implementation

### sessionStorage Key Structure

```typescript
// Main session state
"chat-widget-state": {
  isOpen: boolean;
  messages: Message[];
  lastUpdated: number;
  language?: string;
  rateLimit?: RateLimitInfo;
}
```

### Storage Utilities

**Functions Needed**:
- `saveWidgetState(state: WidgetState): void` - Save to sessionStorage
- `loadWidgetState(): WidgetState | null` - Load from sessionStorage
- `clearWidgetState(): void` - Clear sessionStorage
- `isStorageAvailable(): boolean` - Check if sessionStorage is available

**Error Handling**:
- Handle `QuotaExceededError` gracefully
- Fallback to in-memory state if sessionStorage unavailable
- Log errors but don't break functionality

## Data Validation

### Client-Side Validation

**Message Validation**:
- Content must be non-empty after trim
- Content length must be < 8000 tokens (approximate: content.length / 4)
- Role must be "user" or "assistant"

**Session Validation**:
- Messages array length must be <= 100
- Timestamps must be valid (not NaN, not negative)
- Language must be valid if provided

### Server-Side Validation (API Route)

**Request Validation**:
- Messages array must be non-empty
- Last message must be from user
- Message content must be < 8000 tokens
- Language header must be valid if provided

## Privacy & Data Retention

**Data Storage**:
- All data stored client-side only (sessionStorage)
- No server-side persistence
- No PII stored (anonymous sessions)

**Data Retention**:
- SessionStorage automatically cleared on browser close
- No manual cleanup needed
- No data retention policy needed (client-side only)

**Privacy Compliance**:
- No cookies used
- No tracking across sessions
- No third-party data sharing
- Complies with GDPR (no personal data stored)

## Migration Notes

**From Reference Implementation**:
- Reference uses `localStorage` → We use `sessionStorage` (per spec)
- Reference has authentication → We remove auth requirement (per spec)
- Reference has feedback system → We skip for MVP (can add later)
- Reference has Clerk integration → We skip (no auth per spec)

**Type Compatibility**:
- Message structure matches Vercel AI SDK format
- Compatible with `@ai-sdk/react` useChat hook
- Can reuse reference implementation patterns

## Future Extensibility

**Potential Additions**:
- Message attachments (images, files)
- Tool calls (function calling)
- Message reactions/feedback
- Conversation export
- Server-side persistence (if auth added later)
- Analytics tracking (anonymized)

**Data Model Considerations**:
- MessagePart structure supports future types
- RateLimitInfo can be extended for different limits
- Session structure can accommodate new fields

