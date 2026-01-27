import { createDeepSeek } from '@ai-sdk/deepseek'
import { streamText, convertToModelMessages } from 'ai'

import {
  getFallbackResponse,
  getGenericFallbackResponse,
} from '@/lib/utils/fallback-responses'
import { getCompanyKnowledgeBase } from '@/lib/utils/knowledge-base'

// Using Node.js runtime instead of Edge to avoid compatibility issues with AI SDK dependencies
// Edge runtime has issues with packages that reference browser globals like 'self'
export const runtime = 'nodejs'

// Timeout: 60 seconds (per spec requirement)
const REQUEST_TIMEOUT_MS = 60_000

/**
 * Get the model to use based on environment
 * Production: Use model string format for Vercel AI Gateway routing
 * Local: Use Deepseek provider directly
 */
const getModel = () => {
  // Check if running on Vercel (production)
  const isVercelProduction = process.env.VERCEL === '1'

  if (isVercelProduction) {
    // On Vercel, model string format automatically routes through AI Gateway
    // The DEEPSEEK_API_KEY should be configured in Vercel Dashboard → AI Gateway → Integrations
    return 'deepseek/deepseek-chat'
  } else {
    // Local development: Use Deepseek provider directly with API key from env
    const apiKey = process.env.DEEPSEEK_API_KEY
    if (!apiKey) {
      throw new Error(
        'DEEPSEEK_API_KEY is required for local development. ' +
          'Please set it in your .env.local file or configure it in Vercel Dashboard for production.'
      )
    }
    // Create Deepseek provider with API key
    const provider = createDeepSeek({ apiKey })
    return provider.chat('deepseek-chat')
  }
}

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    // Validate messages array
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

    // Validate message length (approximate token check)
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'user' && lastMessage?.content) {
      const estimatedTokens = lastMessage.content.length / 4 // Approximate: 1 token ≈ 4 characters
      if (estimatedTokens > 8000) {
        return new Response(
          JSON.stringify({
            error: {
              type: 'validation',
              message:
                'Message exceeds token limit. Please shorten your message.',
              retryable: false,
              details: 'Maximum tokens: 8000',
            },
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    // Convert UIMessages to ModelMessages
    const modelMessages = convertToModelMessages(messages)

    // Add system message with company knowledge base
    const systemMessage = {
      role: 'system' as const,
      content: `You are a helpful AI assistant for BestIT Consultants, a premier software outsourcing company specializing in AI/ML solutions, enterprise software development, and digital transformation.

${getCompanyKnowledgeBase()}

Guidelines:
- Provide accurate information about company services, case studies, and team
- When users ask about navigation (e.g., "show me case studies"), suggest the relevant page
- Be professional, helpful, and concise
- If asked about contact, suggest visiting /contact-us page
- Respond in ${language || 'English'} language`,
    }

    const messagesWithContext = [systemMessage, ...modelMessages]

    // Create AbortController for timeout handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      // Stream text using Vercel AI Gateway routing (production) or Deepseek provider (local)
      const result = streamText({
        model: getModel(),
        messages: messagesWithContext,
        temperature: 0.7,
        maxOutputTokens: 2000,
        abortSignal: controller.signal,
      })

      clearTimeout(timeoutId)
      return result.toUIMessageStreamResponse()
    } catch (error) {
      clearTimeout(timeoutId)

      // Handle timeout
      if (error instanceof Error && error.name === 'AbortError') {
        return new Response(
          JSON.stringify({
            error: {
              type: 'timeout',
              message: 'Request timed out. Please try again.',
              retryable: true,
            },
          }),
          { status: 408, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Handle credit card requirement (Vercel AI Gateway)
      if (
        error instanceof Error &&
        (error.message.includes('credit card') ||
          error.message.includes('valid credit card') ||
          error.message.includes('add-credit-card'))
      ) {
        return new Response(
          JSON.stringify({
            error: {
              type: 'configuration',
              message:
                'AI Gateway requires a valid credit card on file. Please add a credit card in Vercel dashboard to unlock free credits.',
              retryable: false,
              details: error.message,
              actionUrl:
                'https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card',
            },
          }),
          { status: 402, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Handle rate limits
      if (
        error instanceof Error &&
        (error.message.includes('rate limit') ||
          error.message.includes('429') ||
          error.message.includes('too many requests'))
      ) {
        const retryAfter = 60 // Default retry after 60 seconds
        return new Response(
          JSON.stringify({
            error: {
              type: 'rate_limit',
              message: 'Rate limit exceeded. Please try again later.',
              retryable: true,
              retryAfter,
            },
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': retryAfter.toString(),
            },
          }
        )
      }

      // Handle other errors - try fallback response
      console.error('Chat API Error:', error)

      // Try to get fallback response for the last user message
      const lastUserMessage = messages.filter(msg => msg.role === 'user').pop()

      if (lastUserMessage && typeof lastUserMessage.content === 'string') {
        const fallback = getFallbackResponse(lastUserMessage.content)
        if (fallback) {
          // Return fallback response as a streaming response
          const fallbackMessage = {
            id: `fallback-${Date.now()}`,
            role: 'assistant' as const,
            content:
              fallback.response +
              (fallback.suggestedPage
                ? `\n\nVisit: ${fallback.suggestedPage}`
                : ''),
          }

          // Create a simple streaming response with the fallback message
          return new Response(
            JSON.stringify({
              messages: [fallbackMessage],
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'X-Fallback-Response': 'true',
              },
            }
          )
        }
      }

      // No fallback available, return generic error
      return new Response(
        JSON.stringify({
          error: {
            type: 'service',
            message:
              'An error occurred processing your request. Please try again.',
            retryable: true,
            details: error instanceof Error ? error.message : 'Unknown error',
            fallback: getGenericFallbackResponse(),
          },
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({
        error: {
          type: 'network',
          message:
            'Network error occurred. Please check your connection and try again.',
          retryable: true,
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
