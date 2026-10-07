import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { Locale } from '@/i18n/config'

export async function getRedirects(locale: Locale, depth = 1) {
  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
    fallbackLocale: 'en',
    depth,
    limit: 0,
    pagination: false,
  })

  return redirects
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects' and locale.
 *
 * Cache all redirects together to avoid multiple fetches.
 */
export const getCachedRedirects = (locale: Locale) =>
  unstable_cache(async () => getRedirects(locale), ['redirects', locale], {
    tags: [`redirects_${locale}`],
  })
