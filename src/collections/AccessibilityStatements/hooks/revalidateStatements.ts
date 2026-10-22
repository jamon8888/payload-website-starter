import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../../utilities/revalidate'

/**
 * Per-content accessibility statements: the list powering the registry on
 * `/accessibilite` and every content notice is read through a data cache
 * tagged `accessibility-statements`. Tags are purged on top of the URL purge
 * because the default locale's canonical URLs are rewritten by the proxy and
 * `revalidatePath('/en/...')` cannot reach them.
 */
export const revalidateStatements: CollectionAfterChangeHook = ({ req: { payload, context } }) => {
  if (context.disableRevalidate) return

  safeRevalidateTag('accessibility-statements', payload.logger)
  for (const locale of ['en', 'de', 'fr', 'es']) {
    safeRevalidatePath(`/${locale}/accessibilite`, payload.logger)
  }
  safeRevalidatePath('/accessibilite', payload.logger)
}

export const revalidateStatementDelete: CollectionAfterDeleteHook = ({ req: { payload } }) => {
  safeRevalidateTag('accessibility-statements', payload.logger)
  for (const locale of ['en', 'de', 'fr', 'es']) {
    safeRevalidatePath(`/${locale}/accessibilite`, payload.logger)
  }
  safeRevalidatePath('/accessibilite', payload.logger)
}
