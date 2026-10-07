import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache.js'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    payload.logger.info(`Revalidating header for locale: ${currentLocale}`)

    revalidateTag(`global_header_${currentLocale}`, 'max')
  }

  return doc
}
