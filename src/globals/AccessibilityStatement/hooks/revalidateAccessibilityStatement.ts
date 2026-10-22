import type { GlobalAfterChangeHook } from 'payload'

import {
  docRevalidationPaths,
  revalidateViaEndpoint,
  safeRevalidatePath,
  safeRevalidateTag } from '../../../utilities/revalidate'

/**
 * The site-wide accessibility statement feeds `/accessibilite` — purged
 * through the per-locale data cache tags (all locales) and the statement
 * pages themselves, directly and via the in-scope endpoint (see
 * revalidateSiteSettings).
 */
export const revalidateAccessibilityStatement: GlobalAfterChangeHook = async ({
  req: { payload },
}) => {
  const locales = ['en', 'de', 'fr', 'es']
  const tags = locales.map((locale) => `global_accessibility-statement_${locale}`)
  tags.push('accessibility-statements')

  const paths = locales.flatMap((locale) => docRevalidationPaths(locale, '/accessibilite'))

  tags.forEach((tag) => safeRevalidateTag(tag, payload.logger))
  safeRevalidatePath('/accessibilite')

  await revalidateViaEndpoint({ paths, tags }, payload.logger)
}
