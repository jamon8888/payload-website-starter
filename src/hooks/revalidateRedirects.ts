import type { CollectionAfterChangeHook } from 'payload'

import { safeRevalidateTag } from '../utilities/revalidate'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload, locale } }) => {
  const currentLocale = locale || 'en'
  payload.logger.info(`Revalidating redirects for locale: ${currentLocale}`)

  safeRevalidateTag(`redirects_${currentLocale}`, payload.logger)

  return doc
}
