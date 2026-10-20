import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Post } from '../../../payload-types'
import { safeRevalidatePath, safeRevalidateTag } from '../../../utilities/revalidate'

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

      safeRevalidatePath(path, payload.logger)
      safeRevalidateTag(`posts-sitemap_${currentLocale}`, payload.logger)
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `${localePrefix}/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      safeRevalidatePath(oldPath, payload.logger)
      safeRevalidateTag(`posts-sitemap_${currentLocale}`, payload.logger)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`
    const path = `${localePrefix}/posts/${doc?.slug}`

    safeRevalidatePath(path)
    safeRevalidateTag(`posts-sitemap_${currentLocale}`)
  }

  return doc
}
