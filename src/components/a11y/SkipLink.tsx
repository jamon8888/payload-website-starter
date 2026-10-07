import React from 'react'

import { getTranslations } from 'next-intl/server'
import { Locale } from '@/i18n/config'

export const SkipLink: React.FC<{ locale: Locale }> = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: 'a11y' })

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {t('skipToContent')}
    </a>
  )
}
