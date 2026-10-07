import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { getDictionary } from '@/i18n/dictionary'
import { Locale } from '@/i18n/config'
import { getServerSideURL } from '@/utilities/getURL'

type Args = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{
    q: string
  }>
}

export default async function Page({ params, searchParams: searchParamsPromise }: Args) {
  const { locale: localeParam } = await params
  const { q: query } = await searchParamsPromise
  const locale = localeParam satisfies Locale
  const dict = await getDictionary(locale)
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
    fallbackLocale: 'en',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">{dict.search.title}</h1>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} locale={locale as Locale} />
      ) : (
        <div className="container">{dict.search.noResults}</div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: dict.search.title,
    alternates: {
      canonical: `${getServerSideURL()}${locale === 'en' ? '' : `/${locale}`}/search`,
    },
  }
}