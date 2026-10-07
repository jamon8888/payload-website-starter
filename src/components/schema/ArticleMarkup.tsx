import React from 'react'

import { getServerSideURL } from '@/utilities/getURL'
import { defaultSiteName } from '@/utilities/mergeOpenGraph'

interface ArticleMarkupProps {
  headline: string
  description?: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  authorUrl?: string
  /** Canonical, absolute URL of the article. */
  url: string
  keywords?: string
  section?: string
}

/** Fallbacks so a post without a hero image or author still emits valid Article markup. */
const SITE_NAME = defaultSiteName

export const ArticleMarkup: React.FC<ArticleMarkupProps> = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  url,
  keywords,
  section,
}) => {
  if (!headline || !url) return null

  const serverUrl = getServerSideURL()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image || `${serverUrl}/website-template-OG.webp`,
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': authorName ? 'Person' : 'Organization',
      name: authorName || SITE_NAME,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${serverUrl}/favicon.svg`,
      },
    },
    ...(keywords && { keywords }),
    ...(section && { articleSection: section }),
    ...(description && { speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.aeo-summary'] } }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
