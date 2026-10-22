import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../../utilities/revalidate'

/**
 * The site-wide accessibility statement feeds `/accessibilite` (read through a
 * per-locale-tagged data cache) — all locales are purged. The per-content
 * statements live in the `accessibility-statements` collection and only read
 * the statement caches indirectly, purging theirs too is cheap and correct.
 */
export const revalidateAccessibilityStatement: GlobalAfterChangeHook = ({
  req: { payload },
}) => {
  for (const locale of ['en', 'de', 'fr', 'es']) {
    safeRevalidateTag(`global_accessibility-statement_${locale}`, payload.logger)
  }
  safeRevalidateTag('accessibility-statements', payload.logger)
  for (const locale of ['en', 'de', 'fr', 'es']) {
    safeRevalidatePath(`/${locale}/accessibilite`, payload.logger)
  }
  safeRevalidatePath('/accessibilite', payload.logger)
}
