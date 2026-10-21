import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'
import { locales, defaultLocale } from './config'

/**
 * The `as-needed` URL strategy is implemented by hand in `src/proxy.ts`, so
 * next-intl's own locale detection cannot infer the locale from the pathname
 * (the request is rewritten to `/<locale>/...` only after the proxy ran).
 * The proxy therefore sets `X-NEXT-INTL-LOCALE` on every request, and it is
 * the source of truth for the server side.
 *
 * Without it, every `useTranslations` call of a client component rendered by a
 * server component silently falls back to English.
 */
export const LOCALE_HEADER = 'X-NEXT-INTL-LOCALE'

export default getRequestConfig(async ({ locale }) => {
  const headerStore = await headers()
  const headerLocale = headerStore.get(LOCALE_HEADER)
  const candidate = headerLocale || locale
  const validLocale = locales.includes(candidate as string)
    ? (candidate as string)
    : defaultLocale

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  }
})
