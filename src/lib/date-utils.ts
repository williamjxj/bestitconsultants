/**
 * Date and time utility functions for displaying article timestamps
 */

export function formatArticleDate(dateString: string): {
  date: string
  time: string
  relative: string
  full: string
} {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  // Format date
  const dateStr = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // Format time
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  // Relative time
  let relative = ''
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInMs / (1000 * 60))
    relative = minutes < 1 ? 'Just now' : `${minutes}m ago`
  } else if (diffInHours < 24) {
    relative = `${diffInHours}h ago`
  } else if (diffInDays < 7) {
    relative = `${diffInDays}d ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    relative = `${weeks}w ago`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    relative = `${months}mo ago`
  } else {
    const years = Math.floor(diffInDays / 365)
    relative = `${years}y ago`
  }

  // Full datetime
  const fullStr = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return {
    date: dateStr,
    time: timeStr,
    relative: relative,
    full: fullStr,
  }
}

export function isRecent(dateString: string, hours: number = 24): boolean {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  return diffInHours <= hours
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`
  return `${Math.floor(diffInDays / 365)}y ago`
}
