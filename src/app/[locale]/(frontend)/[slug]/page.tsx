import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Locale, locales } from '@/i18n/config'
import { AEOSection } from '@/blocks/AEO'
import { BreadcrumbMarkup } from '@/components/schema'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateStaticParams() {
  // During build, PAYLOAD_SECRET may not be available
  // Return empty params to avoid build failure, rely on ISR for runtime
  if (!process.env.PAYLOAD_SECRET) {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .flatMap(({ slug }) => {
      return locales.map((locale) => ({ locale, slug }))
    })

  return params
}

type Args = {
  params: Promise<{
    locale: Locale
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = `/${locale === 'en' ? '' : locale}/${decodedSlug === 'home' ? '' : decodedSlug}`
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale: locale as Locale,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects locale={locale} url={url} />
  }

  const { hero, layout } = page

  const serverUrl = getServerSideURL()
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const canonicalUrl = `${serverUrl}${localePrefix}/${decodedSlug === 'home' ? '' : decodedSlug}`

  return (
    <article className="pt-16 pb-24">
      {decodedSlug !== 'home' && (
        <BreadcrumbMarkup
          items={[{ name: page.title || decodedSlug, item: canonicalUrl }]}
        />
      )}

      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects locale={locale} disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />

      <AEOSection aeo={page.aeo} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale: locale as Locale,
  })

  return generateMeta({ doc: page, locale })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    locale: locale as 'en' | 'de' | 'fr' | 'es' | 'all',
    fallbackLocale: 'en',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})