import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Page } from '../../../payload-types'
import { localePath, safeRevalidatePath, safeRevalidateTag } from '../../../utilities/revalidate'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'

    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? localePath(currentLocale) : localePath(currentLocale, `/${doc.slug}`)

      payload.logger.info(`Revalidating page at path: ${path}`)

      safeRevalidateTag('pages', payload.logger)
      // URL-based purge kept as best effort; tags are the reliable path (see revalidatePost).
      safeRevalidatePath(path, payload.logger)
      safeRevalidateTag(`pages-sitemap_${currentLocale}`, payload.logger)
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath =
        previousDoc.slug === 'home'
          ? localePath(currentLocale)
          : localePath(currentLocale, `/${previousDoc.slug}`)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      safeRevalidateTag('pages', payload.logger)
      safeRevalidatePath(oldPath, payload.logger)
      safeRevalidateTag(`pages-sitemap_${currentLocale}`, payload.logger)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    const path = doc?.slug === 'home' ? localePath(currentLocale) : localePath(currentLocale, `/${doc?.slug}`)
    safeRevalidateTag('pages')
    safeRevalidatePath(path)
    safeRevalidateTag(`pages-sitemap_${currentLocale}`)
  }

  return doc
}
