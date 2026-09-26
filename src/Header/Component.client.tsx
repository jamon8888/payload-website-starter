'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header } from '@/payload-types'
import { Locale } from '@/i18n/config'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  locale: Locale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  /* `headerTheme` is read from the DOM on the client only, so the attribute is deferred
     past hydration via suppressHydrationWarning rather than a second render of local state */
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header
      className="container relative z-20   "
      suppressHydrationWarning
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <div className="py-8 flex justify-between">
        <Link href={`/${locale === 'en' ? '' : locale}`}>
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} locale={locale} />
      </div>
    </header>
  )
}
