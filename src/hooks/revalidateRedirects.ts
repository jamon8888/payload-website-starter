import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload, locale } }) => {
  const currentLocale = locale || 'en'
  payload.logger.info(`Revalidating redirects for locale: ${currentLocale}`)

  revalidateTag(`redirects_${currentLocale}`, 'max')

  return doc
}
