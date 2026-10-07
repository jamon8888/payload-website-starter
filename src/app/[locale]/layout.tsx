import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { SkipLink } from '@/components/a11y'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Locale, locales } from '@/i18n/config'
import { getServerSideURL } from '@/utilities/getURL'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const { isEnabled } = await draftMode()

  // next-intl requires the locale to be validated before it is used anywhere.
  if (!locales.includes(locale)) {
    notFound()
  }

  // Pin the request locale so server components (useTranslations) resolve the
  // right catalog instead of falling back to the default locale.
  setRequestLocale(locale)

  // Load this locale's message catalog directly. getMessages() reads the request
  // locale, which does not reliably propagate to every server component under
  // RSC/Turbopack (some resolve it as `undefined` and fall back to English).
  // Passing the catalog explicitly keeps client components in the right language.
  const messages = (await import(`../../i18n/messages/${locale}.json`)).default

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang={locale} suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <SkipLink locale={locale} />
            <Header locale={locale} />
            <main id="main-content">{children}</main>
            <Footer locale={locale} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}