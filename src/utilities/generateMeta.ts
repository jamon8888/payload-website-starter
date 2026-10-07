import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'
import { Locale, locales } from '@/i18n/config'

import { defaultDescription, defaultSiteName, mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
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

  return `${localePrefix}${collectionPrefix}${slug ? `/${slug}` : ''}` || '/'
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: Locale
}): Promise<Metadata> => {
  const { doc, locale } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const collectionPrefix = 'heroImage' in (doc || {}) || 'authors' in (doc || {}) ? '/posts' : ''
  const slug = Array.isArray(doc?.slug) ? doc.slug.join('/') : doc?.slug

  const path = getLocalizedPath({ collectionPrefix, slug, locale })
  const canonicalUrl = `${getServerSideURL()}${path}`

  const title = doc?.meta?.title
    ? doc?.meta?.title + ` | ${defaultSiteName}${locale ? ` (${locale})` : ''}`
    : `${defaultSiteName}${locale ? ` (${locale})` : ''}`

  const description = doc?.meta?.description || defaultDescription

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
    openGraph: mergeOpenGraph({
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
    }),
    title,
  }
}