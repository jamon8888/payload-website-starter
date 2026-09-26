import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { Locale, locales } from '@/i18n/config'

async function fetchPostsSitemap(locale: Locale): Promise<any> {
  const localeConst = locale satisfies Locale
  
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  const localePrefix = localeConst === 'en' ? '' : `/${localeConst}`

  const results = await payload.find({
    collection: 'posts',
    locale: localeConst as 'en' | 'de' | 'fr' | 'es' | 'all',
    fallbackLocale: 'en',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dateFallback = new Date().toISOString()

  const sitemap = results.docs
    ? results.docs
        .filter((post) => Boolean(post?.slug))
        .map((post) => ({
          loc: `${SITE_URL}${localePrefix}/posts/${post?.slug}`,
          lastmod: post.updatedAt || dateFallback,
        }))
    : []

  return sitemap
}

// Cache the typed function
async function getPostsSitemapCached(locale: Locale) {
  return fetchPostsSitemap(locale)
}

const getPostsSitemap = unstable_cache(
  getPostsSitemapCached,
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

interface RouteProps {
  params: Promise<{ locale: Locale }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { locale } = await params
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    return new Response('Invalid locale', { status: 404 })
  }
  const sitemap = await getPostsSitemap(locale as Locale)

  return getServerSideSitemap(sitemap)
}