import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { Locale } from '@/i18n/config'

interface HeaderProps {
  locale?: Locale
}

export async function Header({ locale = 'en' }: HeaderProps) {
  const headerData = await getCachedGlobal('header', locale, 1)()

  return <HeaderClient data={headerData} locale={locale} />
}
