import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

/**
 * Fallback site description. Also used as the `meta[name=description]` value by
 * `generateMeta`, so every page ships a description even before an editor has
 * filled one in — Lighthouse and most crawlers treat a missing one as a defect.
 */
export const defaultDescription = 'An open-source website built with Payload and Next.js.'

/** Fallback site name, used for Open Graph and JSON-LD publisher. */
export const defaultSiteName = 'Payload Website Template'

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  siteName: string = defaultSiteName,
): Metadata['openGraph'] => {
  const defaultImages = [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ]

  return {
    type: 'website',
    description: defaultDescription,
    siteName,
    title: siteName,
    ...og,
    images: og?.images ? og.images : defaultImages,
  }
}
