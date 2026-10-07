import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { getDictionary } from '@/i18n/dictionary'
import { Locale } from '@/i18n/config'
import { getServerSideURL } from '@/utilities/getURL'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam satisfies Locale
  const dict = await getDictionary(locale)
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
    fallbackLocale: 'en',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{dict.posts.title}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
          locale={locale}
        />
      </div>

      <CollectionArchive posts={posts.docs} locale={locale as Locale} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} locale={locale as Locale} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: dict.posts.title,
    alternates: {
      canonical: `${getServerSideURL()}${locale === 'en' ? '' : `/${locale}`}/posts`,
    },
  }
}