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
import { localizedHref } from '@/i18n/path'
import { AEOSection } from '@/blocks/AEO'
import { BreadcrumbMarkup } from '@/components/schema'
import { Breadcrumb } from '@/components/a11y'
import { AccessibilityNotice } from '@/components/AccessibilityNotice'
import { getAccessibilityStatementForContent } from '@/utilities/getAccessibilityStatements'
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
  const url = localizedHref(locale, decodedSlug === 'home' ? '' : decodedSlug)
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

  const accessibilityStatement = page.id
    ? await getAccessibilityStatementForContent({
        contentID: page.id,
        relationTo: 'pages',
        locale,
      })
    : null

  const serverUrl = getServerSideURL()
  const canonicalUrl = `${serverUrl}${url}`

  return (
    <article className="pt-16 pb-24">
      {decodedSlug !== 'home' && (
        <>
          <BreadcrumbMarkup items={[{ name: page.title || decodedSlug, item: canonicalUrl }]} />

          <div className="container">
            <Breadcrumb className="mb-6" items={[{ label: page.title || decodedSlug }]} />
          </div>
        </>
      )}

      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects locale={locale} disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />

      <AEOSection aeo={page.aeo} />

      <AccessibilityNotice locale={locale} statement={accessibilityStatement} />
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