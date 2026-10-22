import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'
import { Locale } from '@/i18n/config'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
    locale?: Locale
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs, locale = 'en' } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    // Tagged `posts-archive` and purged by the post hooks: the cache key
    // embeds the categories so each block instance has its own entry.
    const getCachedPosts = unstable_cache(
      async (limit: number, categoriesJson: string) => {
        const payload = await getPayload({ config: configPromise })

        return payload.find({
          collection: 'posts',
          locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
          fallbackLocale: 'en',
          draft: false,
          depth: 1,
          limit,
          ...(categoriesJson
            ? {
                where: {
                  categories: {
                    in: JSON.parse(categoriesJson),
                  },
                },
              }
            : {}),
        })
      },
      ['archive-block', locale, String(id ?? '')],
      { tags: ['posts-archive'] },
    )

    posts = (await getCachedPosts(limit, JSON.stringify(flattenedCategories ?? []))).docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} locale={locale} />
    </div>
  )
}
