'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Locale, locales, defaultLocale, localeNames } from '@/i18n/config'
import { useTranslations } from 'next-intl'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
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

    router.push(`${prefix}${rest}` || '/')
  }

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLocale(e.target.value as Locale)}
      aria-label={t('ariaLabel')}
      className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeNames[locale]}
        </option>
      ))}
    </select>
  )
}
