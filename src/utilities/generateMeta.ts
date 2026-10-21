import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'
import { Locale, locales } from '@/i18n/config'

import { defaultDescription, mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getSiteSettings } from './getSiteSettings'

const getImageURL = (
  image?: Media | Config['db']['defaultIDType'] | null,
  fallback?: Media | Config['db']['defaultIDType'] | null,
) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  const candidate = image || fallback

  if (candidate && typeof candidate === 'object' && 'url' in candidate) {
    const ogUrl = candidate.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + candidate.url
  }

  return url
}

/**
 * Applies the title template of the customizer: `%s` is the page title,
 * `{site}` the brand name.
 */
export const applyTitleTemplate = (
  template: string,
  pageTitle: string,
  siteName: string,
  localeSuffix = '',
): string => {
  if (!template) {
    return `${pageTitle} | ${siteName}${localeSuffix}`
  }

  return template
    .replace('%s', pageTitle)
    .replace('{site}', `${siteName}${localeSuffix}`)
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * Builds the locale-prefixed path for a doc. The default locale is served
 * unprefixed, mirroring the rewrites in `src/proxy.ts`.
 */
export const getLocalizedPath = (args: {
  collectionPrefix?: string
  slug?: string | null
  locale?: Locale
}) => {
  const { collectionPrefix = '', slug, locale } = args
  const localePrefix = locale && locale !== 'en' ? `/${locale}` : ''

  // The home page lives at the root of its locale (`/`, `/fr`, `/de`, …).
  // The `home` slug is only how the page is stored, so it must not leak into
  // the canonical URL — `/home` is a second URL for the very same page.
  if (!collectionPrefix && slug === 'home') {
    return localePrefix || '/'
  }

  return `${localePrefix}${collectionPrefix}${slug ? `/${slug}` : ''}` || '/'
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: Locale
}): Promise<Metadata> => {
  const { doc, locale } = args

  // The customizer: brand name, default description and social image come
  // from the `site-settings` global.
  const settings = await getSiteSettings(locale || 'en')
  const siteName = settings.brandName
  const localeSuffix = locale && locale !== 'en' ? ` (${locale})` : ''

  const ogImage = getImageURL(doc?.meta?.image, settings.seo.ogImage)

  const collectionPrefix = 'heroImage' in (doc || {}) || 'authors' in (doc || {}) ? '/posts' : ''
  const slug = Array.isArray(doc?.slug) ? doc.slug.join('/') : doc?.slug

  const path = getLocalizedPath({ collectionPrefix, slug, locale })
  const canonicalUrl = `${getServerSideURL()}${path}`

  const pageTitle = doc?.meta?.title
  const title = pageTitle
    ? applyTitleTemplate(settings.seo.titleTemplate, pageTitle, siteName, localeSuffix)
    : `${siteName}${localeSuffix}`

  const description = doc?.meta?.description || settings.seo.defaultDescription || defaultDescription

  // Point every language at this doc so search engines can pair them up.
  const languages: Record<string, string> = {}
  for (const lang of locales) {
    languages[lang] = `${getServerSideURL()}${getLocalizedPath({
      collectionPrefix,
      slug,
      locale: lang,
    })}`
  }
  languages['x-default'] = `${getServerSideURL()}${getLocalizedPath({
    collectionPrefix,
    slug,
    locale: 'en',
  })}`

  return {
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: mergeOpenGraph(
      {
        description,
        images: ogImage
          ? [
              {
                url: ogImage,
              },
            ]
          : undefined,
        title,
        url: canonicalUrl,
      },
      siteName,
    ),
    twitter: settings.seo.twitterHandle
      ? {
          card: 'summary_large_image',
          site: settings.seo.twitterHandle,
          title,
        }
      : undefined,
    title,
  }
}