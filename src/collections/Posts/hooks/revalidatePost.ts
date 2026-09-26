import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`

    if (doc._status === 'published') {
      const path = `${localePrefix}/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag(`posts-sitemap_${currentLocale}`, 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `${localePrefix}/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag(`posts-sitemap_${currentLocale}`, 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`
    const path = `${localePrefix}/posts/${doc?.slug}`

    revalidatePath(path)
    revalidateTag(`posts-sitemap_${currentLocale}`, 'max')
  }

  return doc
}
