import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import React from 'react'
import { Locale } from '@/i18n/config'

interface HeaderProps {
  locale?: Locale
}

export async function Header({ locale = 'en' }: HeaderProps) {
  const headerData = await getCachedGlobal('header', locale, 1)()
  const settings = await getSiteSettings(locale)

  return (
    <HeaderClient
      brandName={settings.brandName}
      data={headerData}
      locale={locale}
      logo={settings.logo}
    />
  )
}
