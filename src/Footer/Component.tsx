import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

interface FooterProps {
  locale?: Locale
}

export async function Footer({ locale = 'en' }: FooterProps) {
  const footerData = await getCachedGlobal('footer', locale, 1)()

  const navItems = footerData?.navItems || []
  const { a11y, footer } = await getDictionary(locale)
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href={localePrefix || '/'}>
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav aria-label={a11y.footerNavigation} className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} locale={locale} {...link} />
            })}
          </nav>
        </div>

        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} {footer.rights}
        </p>
      </div>
    </footer>
  )
}
