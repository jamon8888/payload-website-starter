import type { GlobalAfterChangeHook } from 'payload'

import { revalidateViaEndpoint, safeRevalidatePath, safeRevalidateTag } from '../../utilities/revalidate'

/**
 * The footer is rendered in the layout, so it is part of the cached HTML of
 * every page — see the header hook for the double-channel rationale.
 */
export const revalidateFooter: GlobalAfterChangeHook = async ({ req: { payload } }) => {
  const tags = ['en', 'de', 'fr', 'es'].map((locale) => `global_footer_${locale}`)

  tags.forEach((tag) => safeRevalidateTag(tag, payload.logger))
  safeRevalidatePath('/')

  await revalidateViaEndpoint(
    { layoutPaths: ['/'], tags },
    payload.logger,
  )
}
