import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Locale, locales } from '@/i18n/config'
import { AEOSection } from '@/blocks/AEO'
import { ArticleMarkup, BreadcrumbMarkup } from '@/components/schema'
import { getServerSideURL } from '@/utilities/getURL'

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
  const { isEnabled: draft } = await draftMode()
  const { locale, slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale === 'en' ? '' : locale}/posts/${decodedSlug}`
  const post = await queryPostBySlug({ slug: decodedSlug, locale: locale as Locale })

  if (!post) return <PayloadRedirects locale={locale} url={url} />

  const serverUrl = getServerSideURL()
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const canonicalUrl = `${serverUrl}${localePrefix}/posts/${decodedSlug}`

  const heroImage = post.heroImage
  const imageUrl =
    heroImage && typeof heroImage === 'object'
      ? `${serverUrl}${heroImage.sizes?.og?.url ?? heroImage.url ?? ''}`
      : undefined

  const firstAuthor = post.authors?.[0]
  const firstAuthorUser =
    firstAuthor && typeof firstAuthor === 'object' && 'user' in firstAuthor
      ? (firstAuthor.user as { name?: string | null } | null)
      : null

  return (
    <article className="pt-16 pb-16">
      <ArticleMarkup
        headline={post.title || decodedSlug}
        description={post.aeo?.aeoSummary || undefined}
        image={imageUrl}
        datePublished={post.publishedAt || undefined}
        dateModified={post.updatedAt || undefined}
        authorName={firstAuthorUser?.name || undefined}
        url={canonicalUrl}
      />

      <BreadcrumbMarkup
        items={[
          { name: 'Posts', item: `${serverUrl}${localePrefix}/posts` },
          { name: post.title || decodedSlug, item: canonicalUrl },
        ]}
      />

      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects locale={locale} disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} locale={locale} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />

          <AEOSection aeo={post.aeo} />

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
              locale={locale}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug, locale: locale as Locale })

  return generateMeta({ doc: post, locale })
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

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

  return result.docs?.[0] || null
})