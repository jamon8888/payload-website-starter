import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../utilities/revalidate'

/**
 * The footer is rendered in the layout, so it is part of the cached HTML of
 * every page — see the header hook.
 */
export const revalidateFooter: GlobalAfterChangeHook = ({
  req: { payload, locale },
}) => {
  const currentLocale = locale || 'en'

  safeRevalidateTag(`global_footer_${currentLocale}`, payload.logger)
  safeRevalidatePath('/', payload.logger, 'layout')
}
