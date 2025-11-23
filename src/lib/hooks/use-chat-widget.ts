'use client'

/**
 * Hook for managing chat widget state with sessionStorage persistence
 */

import { useState, useEffect, useCallback } from 'react'

import type { Language } from '@/lib/translations'
import {
  saveWidgetState,
  loadWidgetState,
  clearWidgetState,
  isStorageAvailable,
} from '@/lib/utils/storage'
import type { Message, WidgetState, RateLimitInfo } from '@/types/chat-widget'

const DEBOUNCE_MS = 100
const MAX_MESSAGES = 100
const RATE_LIMIT_MESSAGES = 20
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

/**
 * Hook for managing chat widget state
 */
export function useChatWidget(userId?: string, language?: Language) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  // Load state from sessionStorage on mount
  useEffect(() => {
    if (!isStorageAvailable()) {
      return
    }

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
    if (!isStorageAvailable()) {
      return
    }

    const timer = setTimeout(() => {
      try {
        const state: WidgetState = {
          isOpen,
          messages,
          lastUpdated: Date.now(),
          language: language || 'en',
        }
        saveWidgetState(state, userId)
      } catch (error) {
        console.error('Failed to save widget state:', error)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [isOpen, messages, userId, language])

  const openWidget = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeWidget = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleWidget = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const addMessage = useCallback(
    (message: Message) => {
      setMessages((prev) => {
        const updated = [...prev, message]
        // Limit to MAX_MESSAGES, keeping the most recent
        return updated.slice(-MAX_MESSAGES)
      })
    },
    []
  )

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const clearAll = useCallback(() => {
    setIsOpen(false)
    setMessages([])
    if (isStorageAvailable()) {
      clearWidgetState(userId)
    }
  }, [userId])

  // Rate limiting check
  const checkRateLimit = useCallback((): {
    allowed: boolean
    rateLimitInfo: RateLimitInfo | null
  } => {
    if (!isStorageAvailable()) {
      return { allowed: true, rateLimitInfo: null }
    }

    try {
      const stored = loadWidgetState(userId)
      const now = Date.now()

      if (!stored?.rateLimit) {
        // Initialize rate limit
        const rateLimitInfo: RateLimitInfo = {
          messageCount: 1,
          windowStart: now,
          limit: RATE_LIMIT_MESSAGES,
          windowDuration: RATE_LIMIT_WINDOW_MS,
        }
        return { allowed: true, rateLimitInfo }
      }

      const { rateLimit } = stored
      const timeSinceWindowStart = now - rateLimit.windowStart

      // Reset window if expired
      if (timeSinceWindowStart >= rateLimit.windowDuration) {
        const rateLimitInfo: RateLimitInfo = {
          messageCount: 1,
          windowStart: now,
          limit: RATE_LIMIT_MESSAGES,
          windowDuration: RATE_LIMIT_WINDOW_MS,
        }
        return { allowed: true, rateLimitInfo }
      }

      // Check if limit exceeded
      if (rateLimit.messageCount >= rateLimit.limit) {
        return { allowed: false, rateLimitInfo: rateLimit }
      }

      // Increment count
      const rateLimitInfo: RateLimitInfo = {
        ...rateLimit,
        messageCount: rateLimit.messageCount + 1,
      }
      return { allowed: true, rateLimitInfo }
    } catch (error) {
      console.error('Failed to check rate limit:', error)
      return { allowed: true, rateLimitInfo: null }
    }
  }, [userId])

  // Record message for rate limiting
  const recordMessage = useCallback(() => {
    const { rateLimitInfo } = checkRateLimit()
    if (rateLimitInfo && isStorageAvailable()) {
      try {
        const stored = loadWidgetState(userId) || {
          isOpen: false,
          messages: [],
          lastUpdated: Date.now(),
        }
        const state: WidgetState = {
          ...stored,
          rateLimit: rateLimitInfo,
        }
        saveWidgetState(state, userId)
      } catch (error) {
        console.error('Failed to record message for rate limiting:', error)
      }
    }
  }, [checkRateLimit, userId])

  return {
    isOpen,
    messages,
    openWidget,
    closeWidget,
    toggleWidget,
    addMessage,
    clearMessages,
    clearAll,
    checkRateLimit,
    recordMessage,
  }
}

