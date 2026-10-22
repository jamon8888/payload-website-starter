import type { GlobalAfterChangeHook } from 'payload'

import { revalidateViaEndpoint, safeRevalidatePath, safeRevalidateTag } from '../../utilities/revalidate'

/**
 * The header is rendered in the layout, so it is part of the cached HTML of
 * every page. Purged through the per-locale data cache tags AND the whole
 * layout tree, both directly and via the in-scope `/api/revalidate` endpoint
 * (see revalidateSiteSettings).
 */
export const revalidateHeader: GlobalAfterChangeHook = async ({ req: { payload } }) => {
  const tags = ['en', 'de', 'fr', 'es'].map((locale) => `global_header_${locale}`)

  tags.forEach((tag) => safeRevalidateTag(tag, payload.logger))
  safeRevalidatePath('/')

  await revalidateViaEndpoint(
    { layoutPaths: ['/'], tags },
    payload.logger,
  )
}
