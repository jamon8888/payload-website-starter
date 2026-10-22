import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../utilities/revalidate'

/**
 * The header is rendered in the layout, so it is part of the cached HTML of
 * every page: purging its data cache is not enough, the pages themselves have
 * to be regenerated. `revalidatePath('/', 'layout')` drops the whole tree
 * (every locale).
 */
export const revalidateHeader: GlobalAfterChangeHook = ({
  req: { payload, locale },
}) => {
  const currentLocale = locale || 'en'

  safeRevalidateTag(`global_header_${currentLocale}`, payload.logger)
  safeRevalidatePath('/', payload.logger, 'layout')
}
