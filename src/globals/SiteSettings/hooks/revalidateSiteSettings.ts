import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../../utilities/revalidate'

/**
 * The site settings carry the theme: they are injected in the layout, so every
 * rendered page has to be regenerated.
 *
 * The data cache is tagged per locale (`global_site-settings_<locale>`), so
 * every locale's tag is purged — no-locale tags silently miss the caches
 * (`getCachedGlobal` always appends the locale).
 */
export const revalidateSiteSettings: GlobalAfterChangeHook = ({ req: { payload } }) => {
  for (const locale of ['en', 'de', 'fr', 'es']) {
    safeRevalidateTag(`global_site-settings_${locale}`, payload.logger)
  }
  // getSiteSettings caches with a no-locale tag (the locale is a cache arg).
  safeRevalidateTag('global_site-settings', payload.logger)
  safeRevalidatePath('/', payload.logger, 'layout')
}
