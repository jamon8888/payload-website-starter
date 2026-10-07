import { locales } from '@/i18n/config'

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com'

/**
 * AI/search crawlers we explicitly welcome. GEO means being citable by AI
 * answer engines, so these get a dedicated, unrestricted rule.
 */
const ALLOWED_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
]

/**
 * Bulk scrapers that republish content without attribution. `CCBot` in
 * particular is OpenAI's training crawler.
 */
const BLOCKED_CRAWLERS = ['CCBot', 'Bytespider', 'PetalBot']

/**
 * This file lives at `app/robots.txt/route.ts`, which makes it a route handler —
 * it has to export `GET`. Exporting a default function (the `MetadataRoute`
 * convention, which belongs in `app/robots.ts`) produced a module with no
 * method exports and failed the build's route validator.
 */
export function GET(): Response {
  const lines: string[] = []

  for (const agent of ALLOWED_CRAWLERS) {
    lines.push(`User-Agent: ${agent}`, 'Allow: /', '')
  }

  for (const agent of BLOCKED_CRAWLERS) {
    lines.push(`User-Agent: ${agent}`, 'Disallow: /', '')
  }

  lines.push(
    'User-Agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /_next/',
    'Disallow: /next/',
    '',
  )

  // The locale-scoped sitemaps carry the real, localized URLs.
  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`

    lines.push(`Sitemap: ${siteUrl}${prefix}/pages-sitemap.xml`)
    lines.push(`Sitemap: ${siteUrl}${prefix}/posts-sitemap.xml`)
  }

  lines.push(`Host: ${siteUrl.replace(/^https?:\/\//, '')}`, '')

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}