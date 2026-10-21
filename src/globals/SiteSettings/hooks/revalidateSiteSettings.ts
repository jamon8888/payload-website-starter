import type { GlobalAfterChangeHook } from 'payload'

import { safeRevalidatePath, safeRevalidateTag } from '../../../utilities/revalidate'

/**
 * The site settings carry the theme: they are injected in the layout, so every
 * rendered page has to be regenerated. `revalidatePath('/', 'layout')` drops the
 * whole tree below the root layout.
 */
export const revalidateSiteSettings: GlobalAfterChangeHook = ({
  req: { payload },
}) => {
  safeRevalidateTag('global_site-settings', payload.logger)
  safeRevalidatePath('/', payload.logger, 'layout')
}
