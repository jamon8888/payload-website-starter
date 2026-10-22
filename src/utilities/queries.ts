import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'

import type { Page, Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

type QueryArgs = {
  slug: string
  locale: Locale
  /**
   * `false` for the public (static) routes, `true` for the preview route.
   * The public routes must never read the draft mode: `draftMode()` is a
   * dynamic API and would opt them out of the static rendering.
   */
  draft?: boolean
}

const fetchPageBySlug = async (slug: string, locale: string, draft: boolean) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    locale: locale as 'en' | 'de' | 'fr' | 'es',
    fallbackLocale: 'en',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as unknown as Page) ?? null
}

const fetchPostBySlug = async (slug: string, locale: string, draft: boolean) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    locale: locale as 'en' | 'de' | 'fr' | 'es',
    fallbackLocale: 'en',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as unknown as Post) ?? null
}

/**
 * Published content is fetched through the data cache so the collection-level
 * tags power revalidation: purging the tag regenerates every page that reads
 * it, whatever URL the visitor used (the canonical URLs rewrite to internal
 * `/en` paths for English, so URL-based `revalidatePath` silently misses them).
 *
 * `revalidatePost` / `revalidatePage` purge `posts` / `pages` (plus the
 * archives and sitemap tags) on every publish.
 */
const cachedPageBySlug = unstable_cache(
  async (slug: string, locale: string) => fetchPageBySlug(slug, locale, false),
  ['page-by-slug'],
  { tags: ['pages'] },
)

const cachedPostBySlug = unstable_cache(
  async (slug: string, locale: string) => fetchPostBySlug(slug, locale, false),
  ['post-by-slug'],
  { tags: ['posts'] },
)

export const queryPageBySlug = cache(async ({ slug, locale, draft = false }: QueryArgs) => {
  if (draft) {
    return fetchPageBySlug(slug, locale, true)
  }

  return cachedPageBySlug(slug, locale)
})

export const queryPostBySlug = cache(async ({ slug, locale, draft = false }: QueryArgs) => {
  if (draft) {
    return fetchPostBySlug(slug, locale, true)
  }

  return cachedPostBySlug(slug, locale)
})

/**
 * The posts archive (`/posts` and `/posts/page/[n]`). Tagged `posts-archive`
 * and purged by the post hooks whenever the list can change.
 */
const cachedPostsArchive = unstable_cache(
  async (locale: string, pageNumber: number) => {
    const payload = await getPayload({ config: configPromise })

    return payload.find({
      collection: 'posts',
      locale: locale as 'en' | 'de' | 'fr' | 'es',
      fallbackLocale: 'en',
      draft: false,
      depth: 1,
      limit: 12,
      page: pageNumber,
      overrideAccess: false,
    })
  },
  ['posts-archive'],
  { tags: ['posts-archive'] },
)

export const queryPostsArchive = cache(async ({ locale, pageNumber = 1 }: { locale: Locale; pageNumber?: number }) =>
  cachedPostsArchive(locale, pageNumber),
)
