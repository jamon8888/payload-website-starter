import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`

    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? `${localePrefix}/` : `${localePrefix}/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag(`pages-sitemap_${currentLocale}`, 'max')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? `${localePrefix}/` : `${localePrefix}/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag(`pages-sitemap_${currentLocale}`, 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    const localePrefix = currentLocale === 'en' ? '' : `/${currentLocale}`
    const path = doc?.slug === 'home' ? `${localePrefix}/` : `${localePrefix}/${doc?.slug}`
    revalidatePath(path)
    revalidateTag(`pages-sitemap_${currentLocale}`, 'max')
  }

  return doc
}
