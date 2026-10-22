import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

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

export const queryPageBySlug = cache(
  async ({ slug, locale, draft = false }: QueryArgs) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
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
  },
)

export const queryPostBySlug = cache(
  async ({ slug, locale, draft = false }: QueryArgs) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
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
  },
)
