import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Page } from '../../../payload-types'
import {
  docRevalidationPaths,
  revalidateViaEndpoint,
  safeRevalidatePath,
  safeRevalidateTag,
} from '../../../utilities/revalidate'

/**
 * Tags are the authoritative purge (`pages` — see revalidatePost for the
 * double-channel rationale). The URL purge covers the ISR cache entries.
 */
const purgePage = async ({
  slugPath,
  currentLocale,
  logger,
}: {
  slugPath: string
  currentLocale: string
  logger: { warn: (message: string) => void }
}): Promise<void> => {
  const paths = docRevalidationPaths(currentLocale, slugPath)

  for (const path of paths) {
    safeRevalidatePath(path, logger)
  }

  safeRevalidateTag('pages', logger)
  safeRevalidateTag(`pages-sitemap_${currentLocale}`, logger)

  await revalidateViaEndpoint(
    {
      paths,
      tags: ['pages', `pages-sitemap_${currentLocale}`],
    },
    logger,
  )
}

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'

    if (doc._status === 'published') {
      const slugPath = doc.slug === 'home' ? '' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at public path: ${slugPath || '/'}`)
      await purgePage({ slugPath, currentLocale, logger: payload.logger })
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const slugPath = previousDoc.slug === 'home' ? '' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at public path: ${slugPath || '/'}`)
      await purgePage({ slugPath, currentLocale, logger: payload.logger })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    const slugPath = doc.slug === 'home' ? '' : `/${doc.slug}`

    await purgePage({
      slugPath,
      currentLocale: locale || 'en',
      logger: payload.logger,
    })
  }

  return doc
}
