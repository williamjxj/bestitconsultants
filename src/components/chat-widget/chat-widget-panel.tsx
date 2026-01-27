'use client'

/**
 * Chat widget panel component with chat interface
 */

import { useChat } from '@ai-sdk/react'
import DOMPurify from 'dompurify'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Check, Copy, Send, X } from 'lucide-react'
import { marked } from 'marked'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import { useChatWidget } from '@/lib/hooks/use-chat-widget'
import type { Message } from '@/types/chat-widget'

interface ChatWidgetPanelProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Chat widget panel with full chat functionality
 */
export function ChatWidgetPanel({ isOpen, onClose }: ChatWidgetPanelProps) {
  const [input, setInput] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { language, translations } = useLanguage()
  const router = useRouter()
  const {
    messages: persistedMessages,
    addMessage,
    checkRateLimit,
    recordMessage,
  } = useChatWidget(undefined, language)
  const [isInitialized, setIsInitialized] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)

  /**
   * Convert markdown to HTML safely
   */
  const convertMarkdownToHtml = (markdown: string): string => {
    // Configure marked for safer HTML output
    marked.setOptions({
      breaks: true,
      gfm: true,
    })

    const html = marked.parse(markdown) as string
    // Sanitize HTML to prevent XSS attacks
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'u',
        'a',
        'ul',
        'ol',
        'li',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code',
        'pre',
        'blockquote',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    })
  }

  const { messages, sendMessage, status, error, setMessages } = useChat({
    api: '/api/chat',
    body: {
      language,
    },
    onError: error => {
      console.error('Chat error:', error)
    },
  } as Parameters<typeof useChat>[0])

  // Initialize messages from persisted state on mount
  useEffect(() => {
    if (!isInitialized) {
      if (persistedMessages.length > 0 && messages.length === 0) {
        const initialMessages = persistedMessages.map(msg => {
          // Extract text content from parts or use content directly
          const textParts =
            msg.parts?.filter(part => part.type === 'text') || []
          const textContent =
            textParts.length > 0
              ? textParts.map(part => part.text || '').join('')
              : msg.content

          return {
            id: msg.id,
            role: msg.role,
            parts: [{ type: 'text' as const, text: textContent }],
          }
        })
        setMessages(initialMessages)
      }
      setIsInitialized(true)
    }
  }, [persistedMessages, messages.length, setMessages, isInitialized])

  // Sync messages from useChat to persisted state
  useEffect(() => {
    messages.forEach(msg => {
      // Skip system messages
      if (msg.role === 'system') {
        return
      }

      const textParts = msg.parts?.filter(part => part.type === 'text') || []
      const content = textParts
        .map(part => ('text' in part ? part.text : ''))
        .join('')

      if (content && (msg.role === 'user' || msg.role === 'assistant')) {
        // Convert parts to our MessagePart format (only text parts)
        const convertedParts: Message['parts'] = textParts.map(part => ({
          type: 'text' as const,
          text: 'text' in part ? part.text : '',
        }))

        const message: Message = {
          id: msg.id,
          role: msg.role,
          content,
          timestamp: Date.now(),
          parts: convertedParts.length > 0 ? convertedParts : undefined,
        }
        // Only add if not already in persisted messages
        if (!persistedMessages.find(m => m.id === msg.id)) {
          addMessage(message)
        }
      }
    })
  }, [messages, addMessage, persistedMessages])

  const isLoading = status === 'streaming' || status === 'submitted'

  // Auto-scroll to bottom when new messages arrive or when streaming
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop =
            scrollContainerRef.current.scrollHeight
        }
      })
    }
  }, [messages, isOpen, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    // Check rate limit before sending
    const { allowed, rateLimitInfo } = checkRateLimit()
    if (!allowed) {
      // Show rate limit error
      const remainingTime = rateLimitInfo
        ? Math.ceil(
            (rateLimitInfo.windowDuration -
              (Date.now() - rateLimitInfo.windowStart)) /
              60000
          )
        : 60
      alert(
        `Rate limit exceeded. You can send up to ${rateLimitInfo?.limit || 20} messages per hour. Please try again in ${remainingTime} minutes.`
      )
      return
    }

    // Record message for rate limiting
    recordMessage()

    sendMessage({ text: trimmed })
    setInput('')
  }

  const handleCopyMessage = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
    }
  }

  const formatTimestamp = (timestamp?: number) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find(msg => msg.role === 'user')
      if (lastUserMessage) {
        const lastUserIndex = messages.findIndex(
          msg => msg.id === lastUserMessage.id
        )
        setMessages(messages.slice(0, lastUserIndex + 1))
        const textParts =
          lastUserMessage.parts?.filter(part => part.type === 'text') || []
        const messageText = textParts
          .map(part => ('text' in part ? part.text : ''))
          .join('')
        if (messageText) {
          setTimeout(() => {
            sendMessage({ text: messageText })
          }, 100)
        }
      }
    }
  }

  // Handle Escape key to close chat widget
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Extract text content from message parts
  const getMessageContent = (message: (typeof messages)[0]) => {
    const textParts = message.parts?.filter(part => part.type === 'text') || []
    return textParts.map(part => ('text' in part ? part.text : '')).join('')
  }

  // Extract navigation links from message content
  const extractNavigationLinks = (content: string): string[] => {
    const links: string[] = []
    // Look for common page patterns
    const pagePatterns = [
      '/case-studies',
      '/services',
      '/our-team',
      '/contact-us',
      '/portfolio',
    ]
    pagePatterns.forEach(pattern => {
      if (content.toLowerCase().includes(pattern)) {
        links.push(pattern)
      }
    })
    return links
  }

  // Handle navigation to suggested page
  const handleNavigate = (path: string) => {
    router.push(path)
    // Optionally close or minimize widget after navigation
    // onClose() // Uncomment if you want to close widget on navigation
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className='fixed bottom-4 right-4 z-[9999] w-full max-w-md md:w-[450px] h-[calc(100vh-2rem)] max-h-[700px] flex flex-col'
          role='dialog'
          aria-label='AI Assistant Chat'
          aria-modal='true'
        >
          <Card className='flex flex-col h-full shadow-2xl overflow-hidden border-0'>
            <div className='flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-shrink-0'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
                  <Image
                    src='/assets/angel.webp'
                    alt='AI Assistant'
                    width={24}
                    height={24}
                    className='object-cover rounded-full'
                  />
                </div>
                <div>
                  <h2 className='text-lg font-semibold'>
                    {translations.chat?.title || 'AI Assistant'}
                  </h2>
                  <p className='text-xs text-white/80'>Online</p>
                </div>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={onClose}
                aria-label='Close chat'
                className='text-white hover:bg-white/20 rounded-full transition-all hover:scale-110'
              >
                <X className='h-5 w-5' />
              </Button>
            </div>

            <div
              ref={scrollContainerRef}
              className='flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'
            >
              {messages.length === 0 && (
                <div className='text-center text-muted-foreground py-8 px-4'>
                  <p className='text-base font-medium mb-2'>
                    {translations.chat?.welcome || 'Start a conversation!'}
                  </p>
                  <p className='text-sm'>
                    Ask me about our services, case studies, team, or how to
                    contact us.
                  </p>
                </div>
              )}

              {messages.map(message => {
                const content = getMessageContent(message)
                const navigationLinks =
                  message.role === 'assistant'
                    ? extractNavigationLinks(content)
                    : []

                // Get timestamp from persisted messages
                const persistedMessage = persistedMessages.find(
                  m => m.id === message.id
                )
                const timestamp = persistedMessage?.timestamp

                return (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      message.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className='flex items-start justify-between gap-2'>
                        {message.role === 'assistant' ? (
                          <div
                            className='prose prose-sm max-w-none flex-1 [&>p:last-child]:mb-0 [&>p]:mb-2 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-700 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_em]:italic [&_em]:text-gray-700 [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-gray-800 [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-gray-600'
                            dangerouslySetInnerHTML={{
                              __html: convertMarkdownToHtml(content),
                            }}
                          />
                        ) : (
                          <p className='text-sm whitespace-pre-wrap flex-1 leading-relaxed'>
                            {content}
                          </p>
                        )}
                        <div className='flex items-center gap-1 flex-shrink-0'>
                          {timestamp && (
                            <span
                              className={`text-xs ${
                                message.role === 'user'
                                  ? 'text-white/80'
                                  : 'text-gray-500'
                              }`}
                            >
                              {formatTimestamp(timestamp)}
                            </span>
                          )}
                          <Button
                            variant='ghost'
                            size='icon'
                            className={`h-6 w-6 transition-all hover:scale-110 ${
                              message.role === 'user'
                                ? 'text-white/80 hover:text-white hover:bg-white/20'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() =>
                              handleCopyMessage(message.id, content)
                            }
                            aria-label='Copy message'
                          >
                            {copiedMessageId === message.id ? (
                              <Check className='h-3 w-3' />
                            ) : (
                              <Copy className='h-3 w-3' />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    {navigationLinks.length > 0 && (
                      <div className='flex flex-wrap gap-2 mt-2 max-w-[80%]'>
                        {navigationLinks.map(link => {
                          const pageNames: Record<string, string> = {
                            '/case-studies': 'View Case Studies',
                            '/services': 'View Services',
                            '/our-team': 'View Team',
                            '/contact-us': 'Contact Us',
                            '/portfolio': 'View Portfolio',
                          }
                          return (
                            <Button
                              key={link}
                              variant='outline'
                              size='sm'
                              onClick={() => handleNavigate(link)}
                              className='text-xs'
                            >
                              {pageNames[link] || `Go to ${link}`}
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}

              {isLoading && (
                <div className='flex justify-start'>
                  <div className='bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='flex gap-1'>
                        <div className='h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]'></div>
                        <div className='h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]'></div>
                        <div className='h-2 w-2 animate-bounce rounded-full bg-blue-500'></div>
                      </div>
                      <p className='text-sm text-gray-600'>
                        {translations.chat?.thinking || 'Thinking...'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className='bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 max-w-[80%]'>
                  <div className='flex items-start gap-2'>
                    <AlertCircle className='h-5 w-5 text-destructive mt-0.5 shrink-0' />
                    <div className='flex-1'>
                      <p className='text-sm font-semibold text-destructive'>
                        Error
                      </p>
                      <p className='text-sm text-destructive/80 mt-1'>
                        {error.message ||
                          translations.chat?.error ||
                          'An error occurred. Please try again.'}
                      </p>
                      <Button
                        onClick={handleRetry}
                        variant='outline'
                        size='sm'
                        className='mt-2 text-destructive border-destructive/30 hover:bg-destructive/10'
                      >
                        {translations.chat?.retry || 'Retry'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className='px-4 py-4 border-t border-gray-200 bg-white shrink-0'
            >
              <div className='flex gap-2 w-full'>
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={
                    translations.chat?.placeholder || 'Type your message...'
                  }
                  disabled={isLoading}
                  className='flex-1 w-full min-w-0 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all'
                />
                <Button
                  type='submit'
                  disabled={isLoading || !input.trim()}
                  size='icon'
                  className='shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                  aria-label='Send message'
                >
                  <Send className='h-4 w-4' />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
