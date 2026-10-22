import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import {
  docRevalidationPaths,
  revalidateViaEndpoint,
  safeRevalidatePath,
  safeRevalidateTag,
} from '../../../utilities/revalidate'

/**
 * Per-content accessibility statements — see the global hook. The list and
 * every content notice are read through a data cache tagged
 * `accessibility-statements`.
 */
const purge = async ({
  logger,
}: {
  logger: { warn: (message: string) => void }
}): Promise<void> => {
  const paths = ['en', 'de', 'fr', 'es'].flatMap((locale) =>
    docRevalidationPaths(locale, '/accessibilite'),
  )

  for (const path of paths) {
    safeRevalidatePath(path)
  }

  safeRevalidateTag('accessibility-statements')

  await revalidateViaEndpoint({ paths, tags: ['accessibility-statements'] }, logger)
}

export const revalidateStatements: CollectionAfterChangeHook = async ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    await purge({ logger: payload.logger })
  }
}

export const revalidateStatementDelete: CollectionAfterDeleteHook = async ({
  req: { payload },
}) => {
  await purge({ logger: payload.logger })
}
