import { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  const sharedDisallow = ['/api/', '/admin/', '/_next/']
  const aiCrawlers = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'Bytespider',
    'cohere-ai',
    'Meta-ExternalAgent',
    'YouBot',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: sharedDisallow,
      },
      // AI crawlers are explicitly allowed so generative engines can
      // read and cite the site (GEO best practice).
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: sharedDisallow,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
