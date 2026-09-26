'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Locale, locales, localeNames } from '@/i18n/config'
import { useTranslations } from 'next-intl'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('languageSwitcher')

  // Extract current locale from pathname
  const currentLocale = (pathname.split('/')[1] as Locale) || 'en'

  const switchLocale = (locale: Locale) => {
    // Replace the locale in the pathname
    const newPath = pathname.replace(`/${currentLocale}/`, `/${locale}/`).replace(`/${currentLocale}$`, `/${locale}`)
    router.push(newPath)
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