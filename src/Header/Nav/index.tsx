'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export const HeaderNav: React.FC<{ data: HeaderType; locale: Locale }> = ({ data, locale }) => {
  const navItems = data?.navItems || []

  return (
    <nav aria-label="Navigation principale" className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} locale={locale} {...link} appearance="link" />
      })}
      <Link href={`/${locale === 'en' ? '' : locale}/search`}>
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
      <LanguageSwitcher />
    </nav>
  )
}
