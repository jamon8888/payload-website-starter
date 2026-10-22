import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Post } from '../../../payload-types'
import { locales } from '../../../i18n/config'
import {
  docRevalidationPaths,
  revalidateViaEndpoint,
  safeRevalidatePath,
  safeRevalidateTag,
} from '../../../utilities/revalidate'

const purgePost = async ({
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

  safeRevalidateTag('posts', logger)
  safeRevalidateTag('posts-archive', logger)
  safeRevalidateTag(`posts-sitemap_${currentLocale}`, logger)

  const archivePaths = locales.flatMap((locale) => [
    ...docRevalidationPaths(locale, '/posts'),
    ...docRevalidationPaths(locale, ''),
  ])

  await revalidateViaEndpoint(
    {
      paths: [...paths, ...archivePaths].filter((path, index, all) => all.indexOf(path) === index),
      tags: ['posts', 'posts-archive', `posts-sitemap_${currentLocale}`],
    },
    logger,
  )
}

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'

    if (doc._status === 'published') {
      payload.logger.info(`Revalidating post at public path: /posts/${doc.slug}`)
      await purgePost({
        slugPath: `/posts/${doc.slug}`,
        currentLocale,
        logger: payload.logger,
      })
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old post at public path: /posts/${previousDoc.slug}`)
      await purgePost({
        slugPath: `/posts/${previousDoc.slug}`,
        currentLocale,
        logger: payload.logger,
      })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { payload, context, locale },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    payload.logger.info(`Revalidating deleted post at public path: /posts/${doc.slug}`)
    await purgePost({
      slugPath: `/posts/${doc.slug}`,
      currentLocale: locale || 'en',
      logger: payload.logger,
    })
  }

  return doc
}
