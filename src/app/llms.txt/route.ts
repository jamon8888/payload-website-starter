import { getPayload } from 'payload'
import config from '@payload-config'

import { locales } from '@/i18n/config'

/** Builds the locale-prefixed path, mirroring `localePrefix: 'as-needed'`. */
const localePrefixFor = (locale: string) => (locale === 'en' ? '' : `/${locale}`)

export async function GET() {
  const payload = await getPayload({ config })

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com'
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Payload Website'

  // Query each locale explicitly rather than relying on a `locale: 'all'`
  // response exposing a per-document locale field, which it does not.
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const localeOptions = {
        locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
        fallbackLocale: 'en' as const,
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 200,
      }

      const [pages, posts] = await Promise.all([
        payload.find({
          ...localeOptions,
          collection: 'pages',
          sort: '-updatedAt',
          where: { _status: { equals: 'published' } },
        }),
        payload.find({
          ...localeOptions,
          collection: 'posts',
          sort: '-updatedAt',
          where: { _status: { equals: 'published' } },
        }),
      ])

      return { locale, pages: pages.docs, posts: posts.docs }
    }),
  )

  const lines = [
    `# ${siteName}`,
    '',
    `> ${process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'An open-source website built with Payload and Next.js.'}`,
    '',
    '## Main Content',
    '',
  ]

  for (const { locale, pages, posts } of perLocale) {
    const prefix = localePrefixFor(locale)

    const pageLines = pages
      .filter((page: any) => page?.slug !== 'home' && page?.aeoSummary)
      .map((page: any) => `- [${page.title}](${siteUrl}${prefix}/${page.slug}): ${page.aeoSummary}`)

    const postLines = posts
      .filter((post: any) => post?.aeoSummary)
      .map((post: any) => `- [${post.title}](${siteUrl}${prefix}/posts/${post.slug}): ${post.aeoSummary}`)

    const sectionLines = [...pageLines, ...postLines]
    if (!sectionLines.length) continue

    lines.push(`### ${locale.toUpperCase()}`, '', ...sectionLines, '')
  }

  lines.push(
    '## Editorial Principles',
    `- [Accessibility statement](${siteUrl}/fr/accessibilite)`,
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}