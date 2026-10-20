import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidateTag } from '../../utilities/revalidate'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    payload.logger.info(`Revalidating header for locale: ${currentLocale}`)

    safeRevalidateTag(`global_header_${currentLocale}`, payload.logger)
  }

  return doc
}
