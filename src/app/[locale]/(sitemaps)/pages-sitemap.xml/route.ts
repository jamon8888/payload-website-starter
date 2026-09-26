import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { Locale, locales } from '@/i18n/config'

// Internal function with proper typing
async function fetchPagesSitemap(locale: Locale): Promise<any> {
  // Narrow the locale type to prevent widening
  const localeConst = locale satisfies Locale
  
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  const localePrefix = localeConst === 'en' ? '' : `/${localeConst}`

  const results = await payload.find({
    collection: 'pages',
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

    const defaultSitemap = [
      {
        loc: `${SITE_URL}${localePrefix}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}${localePrefix}/posts`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}${localePrefix}/` : `${SITE_URL}${localePrefix}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
}

// Cache the typed function
async function getPagesSitemapCached(locale: Locale) {
  return fetchPagesSitemap(locale)
}

const getPagesSitemap = unstable_cache(
  getPagesSitemapCached,
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
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
  const sitemap = await getPagesSitemap(locale as Locale)

  return getServerSideSitemap(sitemap)
}