import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })

  const [pagesResult, postsResult] = await Promise.all([
    payload.find({
      collection: 'pages',
      locale: 'all',
      limit: 200,
      sort: '-updatedAt',
      where: {
        _status: { equals: 'published' },
      },
    }),
    payload.find({
      collection: 'posts',
      locale: 'all',
      limit: 200,
      sort: '-updatedAt',
      where: {
        _status: { equals: 'published' },
      },
    }),
  ])

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com'
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Payload Website'

  const lines = [
    `# ${siteName}`,
    '',
    `> ${process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'An open-source website built with Payload and Next.js.'}`,
    '',
    '## Main Content',
    '',
    ...pagesResult.docs
      .filter((p: any) => p.slug !== 'home' && p.aeoSummary)
      .map((p: any) => {
        const localePrefix = p.locale === 'en' ? '' : `/${p.locale}`
        return `- [${p.title}](${siteUrl}${localePrefix}/${p.slug}): ${p.aeoSummary}`
      }),
    ...postsResult.docs
      .filter((p: any) => p.aeoSummary)
      .map((p: any) => {
        const localePrefix = p.locale === 'en' ? '' : `/${p.locale}`
        return `- [${p.title}](${siteUrl}${localePrefix}/posts/${p.slug}): ${p.aeoSummary}`
      }),
    '',
    '## Editorial Principles',
    `- ${siteUrl}/methodologie`,
    `- ${siteUrl}/mentions-legales`,
    `- ${siteUrl}/accessibilite`,
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}