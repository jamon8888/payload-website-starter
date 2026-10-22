import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../utilities/revalidate'

/**
 * The footer is rendered in the layout, so it is part of the cached HTML of
 * every page — see the header hook for the tag/per-locale rationale.
 */
export const revalidateFooter: GlobalAfterChangeHook = ({ req: { payload } }) => {
  for (const locale of ['en', 'de', 'fr', 'es']) {
    safeRevalidateTag(`global_footer_${locale}`, payload.logger)
  }
  safeRevalidatePath('/', payload.logger, 'layout')
}
