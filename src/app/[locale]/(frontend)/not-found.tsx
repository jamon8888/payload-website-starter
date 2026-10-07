import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n/dictionary'
import { Locale, defaultLocale } from '@/i18n/config'

interface NotFoundProps {
  params: Promise<{ locale: Locale }>
}

export default async function NotFound({ params }: NotFoundProps) {
  // During static generation the not-found boundary can render without route
  // params, so fall back to the default locale instead of throwing.
  const { locale } = (await params) ?? { locale: defaultLocale }
  const dict = await getDictionary(locale)

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>{dict.notFound.title}</h1>
        <p className="mb-4">{dict.notFound.description}</p>
      </div>
      <Button asChild variant="default">
        <Link href={`/${locale === 'en' ? '' : locale}`}>{dict.notFound.goHome}</Link>
      </Button>
    </div>
  )
}