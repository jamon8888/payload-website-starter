import type { Metadata } from 'next'

import type { RequiredDataFromCollectionSlug } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { PageView } from '@/components/views/PageView'
import { generateMeta } from '@/utilities/generateMeta'
import { homeStatic } from '@/endpoints/seed/home-static'
import { localizedHref } from '@/i18n/path'
import { locales, type Locale } from '@/i18n/config'
import { queryPageBySlug } from '@/utilities/queries'

/**
 * The public page is rendered statically and revalidated on demand:
 * - `generateStaticParams` prerenders the known slugs at build time,
 * - `revalidate` is the safety net for the pages a hook could not purge,
 * - the Payload hooks purge the exact path when a page is published
 *   (see `src/collections/Pages/hooks/revalidatePage.ts`).
 *
 * Nothing here may read a dynamic API (`draftMode()`, `headers()`, …) or the
 * route would leave the static rendering. The draft preview lives in its own
 * dynamic route: `/[locale]/(preview)/preview/[[...slug]]`.
 */
export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  // During build, PAYLOAD_SECRET may not be available
  // Return empty params to avoid build failure, rely on ISR for runtime
  if (!process.env.PAYLOAD_SECRET) {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .flatMap(({ slug }) => {
      return locales.map((locale) => ({ locale, slug }))
    })

  return params
}

type Args = {
  params: Promise<{
    locale: Locale
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = localizedHref(locale, decodedSlug === 'home' ? '' : decodedSlug)

  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug: decodedSlug,
    locale,
    draft: false,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects locale={locale} url={url} />
  }

  return <PageView locale={locale} page={page} slug={decodedSlug} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)

  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
    draft: false,
  })

  return generateMeta({ doc: page, locale })
}
