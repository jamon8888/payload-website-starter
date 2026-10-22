import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { PostView } from '@/components/views/PostView'
import { generateMeta } from '@/utilities/generateMeta'
import { localizedHref } from '@/i18n/path'
import { locales, type Locale } from '@/i18n/config'
import { queryPostBySlug } from '@/utilities/queries'

/**
 * The public article is rendered statically and revalidated on demand — see the
 * comment on the page route. The draft preview lives in its own dynamic route.
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
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.flatMap(({ slug }) => {
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

export default async function Post({ params: paramsPromise }: Args) {
  const { locale, slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = localizedHref(locale, `posts/${decodedSlug}`)

  const post = await queryPostBySlug({
    slug: decodedSlug,
    locale,
    draft: false,
  })

  if (!post) return <PayloadRedirects locale={locale} url={url} />

  return <PostView locale={locale} post={post} slug={decodedSlug} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)

  const post = await queryPostBySlug({
    slug: decodedSlug,
    locale,
    draft: false,
  })

  return generateMeta({ doc: post, locale })
}
