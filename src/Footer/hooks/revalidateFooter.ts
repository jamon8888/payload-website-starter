import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context, locale } }) => {
  if (!context.disableRevalidate) {
    const currentLocale = locale || 'en'
    payload.logger.info(`Revalidating footer for locale: ${currentLocale}`)

    revalidateTag(`global_footer_${currentLocale}`, 'max')
  }

  return doc
}
