import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

import { PageView } from '@/components/views/PageView'
import { PostView } from '@/components/views/PostView'
import { generateMeta } from '@/utilities/generateMeta'
import { homeStatic } from '@/endpoints/seed/home-static'
import { localizedHref } from '@/i18n/path'
import { queryPageBySlug, queryPostBySlug } from '@/utilities/queries'
import type { Locale } from '@/i18n/config'

/**
 * The draft preview.
 *
 * It is a **separate, dynamic** route: the public routes are statically
 * rendered (ISR), so they cannot read the draft mode — reading a dynamic API
 * would opt them out of the static rendering.
 *
 * `/next/preview` enables the draft mode and redirects here; the admin's live
 * preview refreshes this route when a draft is saved.
 */
export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    locale: Locale
    slug?: string[]
  }>
}

const parseSegments = (segments: string[] | undefined) => {
  const parts = (segments ?? []).filter(Boolean)

  if (parts[0] === 'posts') {
    return { type: 'post' as const, slug: parts[1] ?? '' }
  }

  return { type: 'page' as const, slug: parts[0] ?? 'home' }
}

export default async function PreviewPage({ params: paramsPromise }: Args) {
  const { locale, slug } = await paramsPromise
  const { isEnabled: draft } = await draftMode()

  const { type, slug: contentSlug } = parseSegments(slug)

  // Without the draft mode, the preview URL is just the public URL.
  if (!draft) {
    const publicPath =
      type === 'post'
        ? localizedHref(locale, `posts/${contentSlug}`)
        : localizedHref(locale, contentSlug === 'home' ? '' : contentSlug)

    redirect(publicPath)
  }

  if (type === 'post') {
    const post = await queryPostBySlug({ slug: contentSlug, locale, draft: true })

    if (!post) notFound()

    return <PostView draft locale={locale} post={post} slug={contentSlug} />
  }

  const page = await queryPageBySlug({ slug: contentSlug, locale, draft: true })

  if (!page && contentSlug === 'home') {
    return <PageView draft locale={locale} page={homeStatic} slug="home" />
  }

  if (!page) notFound()

  return <PageView draft locale={locale} page={page} slug={contentSlug} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug } = await paramsPromise
  const { type, slug: contentSlug } = parseSegments(slug)

  if (type === 'post') {
    const post = await queryPostBySlug({ slug: contentSlug, locale, draft: true })

    return generateMeta({ doc: post, locale })
  }

  const page = await queryPageBySlug({ slug: contentSlug, locale, draft: true })

  return generateMeta({ doc: page, locale })
}
