/**
 * TypeScript types for chat widget state management
 */

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

