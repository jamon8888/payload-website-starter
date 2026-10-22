import type { GlobalAfterChangeHook } from 'payload'

import { revalidateViaEndpoint, safeRevalidatePath, safeRevalidateTag } from '../../../utilities/revalidate'

/**
 * The site settings carry the theme: they are injected in the layout, so every
 * rendered page has to be regenerated.
 *
 * The invites purge twice: directly (no-op outside Next's request scope) and
 * through the in-scope `/api/revalidate` endpoint (see revalidateViaEndpoint).
 */
export const revalidateSiteSettings: GlobalAfterChangeHook = async ({ req: { payload } }) => {
  const tags = ['global_site-settings', ...['en', 'de', 'fr', 'es'].map((locale) => `global_site-settings_${locale}`)]

  tags.forEach((tag) => safeRevalidateTag(tag, payload.logger))
  safeRevalidatePath('/')

  await revalidateViaEndpoint(
    { layoutPaths: ['/'], tags },
    payload.logger,
  )
}
