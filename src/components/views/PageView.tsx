import React from 'react'

import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Locale } from '@/i18n/config'

import { AEOSection } from '@/blocks/AEO'
import { AccessibilityNotice } from '@/components/AccessibilityNotice'
import { Breadcrumb } from '@/components/a11y'
import { BreadcrumbMarkup } from '@/components/schema'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { getAccessibilityStatementForContent } from '@/utilities/getAccessibilityStatements'
import { getServerSideURL } from '@/utilities/getURL'
import { localizedHref } from '@/i18n/path'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'

import { HeaderTheme } from '@/components/HeaderTheme'

type Props = {
  page: RequiredDataFromCollectionSlug<'pages'>
  locale: Locale
  /** The slug the page was requested with. */
  slug: string
  /** `true` in the preview route, where the draft version is rendered. */
  draft?: boolean
}

/**
 * Rendering of a page, shared by the public (static) route and the preview
 * (dynamic) route.
 */
export const PageView: React.FC<Props> = async ({ draft = false, locale, page, slug }) => {
  const { hero, layout } = page

  const accessibilityStatement = page.id
    ? await getAccessibilityStatementForContent({
        contentID: page.id,
        relationTo: 'pages',
        locale,
      })
    : null

  const serverUrl = getServerSideURL()
  const url = localizedHref(locale, slug === 'home' ? '' : slug)
  const canonicalUrl = `${serverUrl}${url}`

  return (
    <article className="pt-16 pb-24">
      {slug !== 'home' && (
        <>
          <BreadcrumbMarkup items={[{ name: page.title || slug, item: canonicalUrl }]} />

          <div className="container">
            <Breadcrumb className="mb-6" items={[{ label: page.title || slug }]} />
          </div>
        </>
      )}

      <HeaderTheme theme="light" />
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
