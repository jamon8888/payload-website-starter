import { Locale, defaultLocale } from './config'

/**
 * Build a locale-prefixed href following the `as-needed` URL strategy (see
 * `src/proxy.ts`): the default locale (`en`) is served unprefixed, every other
 * locale gets a `/<locale>` prefix.
 *
 * Passing the prefix through a ternary like `/${locale === 'en' ? '' : locale}/search`
 * yields a double slash for the default locale (`//search`), which browsers treat
 * as a protocol-relative URL and navigate away from the site entirely. Compose the
 * segments instead so the result is always a well-formed path.
 *
 *   localizedHref('en', 'search')            -> '/search'
 *   localizedHref('fr', 'search')            -> '/fr/search'
 *   localizedHref('en')                      -> '/'
 *   localizedHref('de')                      -> '/de'
 *   localizedHref('en', 'posts/my-post')     -> '/posts/my-post'
 */
export const localizedHref = (locale: Locale, path?: string): string => {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  const suffix = path ? (path.startsWith('/') ? path : `/${path}`) : ''

  return `${prefix}${suffix}` || '/'
}
