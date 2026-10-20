import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidateTag } from '../../utilities/revalidate'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    payload.logger.info(`Revalidating footer for locale: ${currentLocale}`)

    safeRevalidateTag(`global_footer_${currentLocale}`, payload.logger)
  }

  return doc
}
