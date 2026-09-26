import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'
import { Locale } from '@/i18n/config'

import { mergeOpenGraph } from './mergeOpenGraph'
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

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  locale?: Locale
}): Promise<Metadata> => {
  const { doc, locale } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const localePrefix = locale && locale !== 'en' ? `/${locale}` : ''
  const collectionPrefix = 'heroImage' in (doc || {}) || 'authors' in (doc || {}) ? '/posts' : ''

  const title = doc?.meta?.title
    ? doc?.meta?.title + ` | Payload Website Template${locale ? ` (${locale})` : ''}`
    : `Payload Website Template${locale ? ` (${locale})` : ''}`

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : `/${localePrefix}${collectionPrefix}/${doc?.slug || ''}`,
    }),
    title,
  }
}
