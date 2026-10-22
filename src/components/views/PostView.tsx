import React from 'react'
import { getTranslations } from 'next-intl/server'

import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Post } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { AEOSection } from '@/blocks/AEO'
import { AccessibilityNotice } from '@/components/AccessibilityNotice'
import { ArticleMarkup, BreadcrumbMarkup } from '@/components/schema'
import { Breadcrumb } from '@/components/a11y'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { PostHero } from '@/heros/PostHero'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { getAccessibilityStatementForContent } from '@/utilities/getAccessibilityStatements'
import { getServerSideURL } from '@/utilities/getURL'
import { localizedHref } from '@/i18n/path'
import RichText from '@/components/RichText'

import { HeaderTheme } from '@/components/HeaderTheme'

type Props = {
  post: RequiredDataFromCollectionSlug<'posts'>
  locale: Locale
  slug: string
  draft?: boolean
}

/**
 * Rendering of an article, shared by the public (static) route and the preview
 * (dynamic) route.
 */
export const PostView: React.FC<Props> = async ({ draft = false, locale, post, slug }) => {
  const serverUrl = getServerSideURL()
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const canonicalUrl = `${serverUrl}${localePrefix}/posts/${slug}`
  const url = localizedHref(locale, `posts/${slug}`)
  const t = await getTranslations({ locale, namespace: 'nav' })

  const heroImage = post.heroImage
  const imageUrl =
    heroImage && typeof heroImage === 'object'
      ? `${serverUrl}${heroImage.sizes?.og?.url ?? heroImage.url ?? ''}`
      : undefined

  const firstAuthor = post.authors?.[0]
  const firstAuthorUser =
    firstAuthor && typeof firstAuthor === 'object' && 'user' in firstAuthor
      ? ((firstAuthor.user as { name?: string | null } | null) ?? null)
      : null

  const accessibilityStatement = post.id
    ? await getAccessibilityStatementForContent({
        contentID: post.id,
        relationTo: 'posts',
        locale,
      })
    : null

  return (
    <article className="pt-16 pb-16">
      <ArticleMarkup
        headline={post.title || slug}
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
          { name: post.title || slug, item: canonicalUrl },
        ]}
      />

      <div className="container">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: t('posts'), href: `${serverUrl}${localePrefix}/posts` },
            { label: post.title || slug },
          ]}
        />
      </div>

      <HeaderTheme theme="dark" />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects locale={locale} disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post as unknown as Post} locale={locale} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />

          <AEOSection aeo={post.aeo} />

          <AccessibilityNotice locale={locale} statement={accessibilityStatement} />

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
