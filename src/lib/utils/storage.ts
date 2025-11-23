/**
 * Storage utilities for chat widget using sessionStorage
 */

import type { WidgetState } from '@/types/chat-widget'

const STORAGE_KEY = 'chat-widget-state'

/**
 * Check if sessionStorage is available
 */
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

/**
 * Save widget state to sessionStorage
 */
export function saveWidgetState(state: WidgetState, userId?: string): void {
  if (!isStorageAvailable()) {
    return
  }

  try {
    const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY
    sessionStorage.setItem(key, JSON.stringify(state))
  } catch (error) {
    // Handle QuotaExceededError gracefully
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('SessionStorage quota exceeded. Clearing old messages.')
      // Try to save with trimmed messages
      const trimmedState: WidgetState = {
        ...state,
        messages: state.messages.slice(-50), // Keep only last 50 messages
      }
      try {
        const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY
        sessionStorage.setItem(key, JSON.stringify(trimmedState))
      } catch (retryError) {
        console.error('Failed to save widget state after trimming:', retryError)
      }
    } else {
      console.error('Failed to save widget state:', error)
    }
  }
}

/**
 * Load widget state from sessionStorage
 */
export function loadWidgetState(userId?: string): WidgetState | null {
  if (!isStorageAvailable()) {
    return null
  }

  try {
    const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY
    const stored = sessionStorage.getItem(key)
    if (!stored) {
      return null
    }
    return JSON.parse(stored) as WidgetState
  } catch (error) {
    console.error('Failed to load widget state:', error)
    return null
  }
}

/**
 * Clear widget state from sessionStorage
 */
export function clearWidgetState(userId?: string): void {
  if (!isStorageAvailable()) {
    return
  }

  try {
    const key = userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to clear widget state:', error)
  }
}

