import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Post } from '../../../payload-types'
import { locales } from '../../../i18n/config'
import { safeRevalidateDocPath, safeRevalidateTag } from '../../../utilities/revalidate'

/**
 * The archive and the home page embed the post list, so they go stale as soon
 * as a post is published or unpublished. Only the post page itself was
 * revalidated, which left `/posts` serving a stale list until the ISR window
 * expired.
 */
const revalidateArchives = (logger: { warn: (message: string) => void }): void => {
  for (const locale of locales) {
    // Both public and internal forms: the canonical `/posts` of the default
    // locale is rewritten to `/en/posts`, so `revalidatePath('/en/posts')`
    // misses the publicly cached entry.
    safeRevalidateDocPath(locale, '/posts', logger)
    safeRevalidateDocPath(locale, '', logger)
  }
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'

    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at public path: ${path}`)

      safeRevalidateTag('posts', payload.logger)
      safeRevalidateTag('posts-archive', payload.logger)
      // URL-based purge: the ISR cache is keyed by the PUBLIC pathname.
      safeRevalidateDocPath(currentLocale, path, payload.logger)
      safeRevalidateTag(`posts-sitemap_${currentLocale}`, payload.logger)
      revalidateArchives(payload.logger)
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at public path: ${oldPath}`)

      safeRevalidateTag('posts', payload.logger)
      safeRevalidateTag('posts-archive', payload.logger)
      safeRevalidateDocPath(currentLocale, oldPath, payload.logger)
      safeRevalidateTag(`posts-sitemap_${currentLocale}`, payload.logger)
      revalidateArchives(payload.logger)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    const path = `/posts/${doc?.slug}`

    safeRevalidateTag('posts', payload.logger)
    safeRevalidateTag('posts-archive', payload.logger)
    safeRevalidateDocPath(currentLocale, path, payload.logger)
    safeRevalidateTag(`posts-sitemap_${currentLocale}`, payload.logger)
    revalidateArchives(payload.logger)
  }

  return doc
}
