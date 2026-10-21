'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { LOCALE_COOKIE, Locale, locales, defaultLocale, localeNames } from '@/i18n/config'
import { useTranslations } from 'next-intl'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const t = useTranslations('languageSwitcher')

  // Under the `as-needed` URL strategy (see src/proxy.ts) only non-default
  // locales are prefixed. So the first path segment is the current locale only
  // when it is one of the known locales; otherwise the page is default-locale
  // (unprefixed) and the whole path belongs to the route.
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const pathHasLocale = Boolean(firstSegment && locales.includes(firstSegment as Locale))

  const currentLocale: Locale = pathHasLocale ? (firstSegment as Locale) : defaultLocale

  // The route path with any locale prefix stripped, e.g. `/fr/posts` -> ['posts'].
  const pathSegments = pathHasLocale ? segments.slice(1) : segments

  const switchLocale = (locale: Locale) => {
    // Rebuild the URL the same way getLocalizedPath does: default locale is
    // unprefixed, every other locale gets a `/<locale>` prefix.
    const prefix = locale === defaultLocale ? '' : `/${locale}`
    const rest = pathSegments.length ? `/${pathSegments.join('/')}` : ''

    // Remember the choice: the default locale is served from an unprefixed
    // URL, which the proxy resolves with `Accept-Language`. Without the
    // cookie, picking "English" from a browser set to French would land back
    // on the French version.
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`

    // A full document navigation, not a client-side route change: switching
    // locale also switches the rendered tree (the `[locale]` segment), and the
    // RSC request of a soft navigation can be turned down by Vercel's
    // security checkpoint, which then lands the visitor on a challenge page.
    // A hard navigation also guarantees no stale payload from the previous
    // locale is reused.
    window.location.assign(`${prefix}${rest}` || '/')
  }

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLocale(e.target.value as Locale)}
      aria-label={t('ariaLabel')}
      // `text-foreground` is required: over a dark hero the header switches
      // to the dark theme (data-theme="dark"), so the background follows it
      // while the text would otherwise stay the page's dark colour — black on
      // black, i.e. an invisible switcher.
      className="bg-background text-foreground border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeNames[locale]}
        </option>
      ))}
    </select>
  )
}
