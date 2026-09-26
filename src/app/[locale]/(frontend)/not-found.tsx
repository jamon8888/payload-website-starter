import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n/dictionary'
import { Locale } from '@/i18n/config'

interface NotFoundProps {
  params: Promise<{ locale: Locale }>
}

export default async function NotFound({ params }: NotFoundProps) {
  const { locale } = await params
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