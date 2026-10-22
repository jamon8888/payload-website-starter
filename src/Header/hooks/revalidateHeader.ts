import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../utilities/revalidate'

/**
 * The header is rendered in the layout, so it is part of the cached HTML of
 * every page: its data cache is tagged per locale
 * (`global_header_<locale>`), so all locales are purged. The layout purge
 * regenerates the pages themselves (among them the canonical, unrewritten
 * URLs of the default locale, which `revalidatePath('/en/...')` cannot reach).
 */
export const revalidateHeader: GlobalAfterChangeHook = ({ req: { payload } }) => {
  for (const locale of ['en', 'de', 'fr', 'es']) {
    safeRevalidateTag(`global_header_${locale}`, payload.logger)
  }
  safeRevalidatePath('/', payload.logger, 'layout')
}
