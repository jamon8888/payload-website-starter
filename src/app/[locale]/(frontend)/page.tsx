import PageTemplate, { generateMetadata } from './[slug]/page'

/**
 * The home route re-exports the `[slug]` page, but Next.js only honours the
 * segment config declared **in this file** — without `force-static` here, the
 * layout's `draftMode()` would keep the home server-rendered on demand.
 */
export const dynamic = 'force-static'
export const revalidate = 600

export default PageTemplate

export { generateMetadata }