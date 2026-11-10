import type { CollectionConfig, Config, Endpoint, Field, Plugin } from 'payload'

export type SeoBoostPluginOptions = {
  /** Payload collection slugs that receive the SEO Boost editor tab. */
  collections: string[]
  /** Disable this when the host uses a custom API route or dashboard layout. */
  dashboard?: boolean
}

type AuditableDocument = {
  title?: string | null
  meta?: { title?: string | null; description?: string | null } | null
  seoBoost?: { focusKeyword?: string | null } | null
}

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

const seoBoostFields: Field[] = [
  { name: 'focusKeyword', type: 'text', label: 'Focus keyword' },
  {
    name: 'secondaryKeywords',
    type: 'array',
    label: 'Secondary keywords',
    fields: [{ name: 'keyword', type: 'text', required: true }],
  },
  { name: 'canonicalURL', type: 'text', label: 'Canonical URL override' },
  {
    name: 'robots',
    type: 'select',
    label: 'Robots preference',
    defaultValue: 'index-follow',
    options: [
      { label: 'Index, follow', value: 'index-follow' },
      { label: 'No index, follow', value: 'noindex-follow' },
      { label: 'No index, no follow', value: 'noindex-nofollow' },
    ],
  },
  {
    name: 'social',
    type: 'group',
    label: 'Social & structured data',
    fields: [
      { name: 'ogTitle', type: 'text', label: 'Open Graph title' },
      { name: 'ogDescription', type: 'textarea', label: 'Open Graph description', maxLength: 200 },
      { name: 'ogImageURL', type: 'text', label: 'Open Graph image URL' },
      {
        name: 'schemaType',
        type: 'select',
        defaultValue: 'WebPage',
        options: ['WebPage', 'Article', 'Organization', 'LocalBusiness', 'Product', 'Service', 'FAQPage', 'Event'],
      },
      { name: 'schemaJSON', type: 'json', label: 'JSON-LD (review before publishing)' },
    ],
  },
]

const addTab = (collection: CollectionConfig): CollectionConfig => ({
  ...collection,
  fields: collection.fields.some((field) => field.type === 'tabs')
    ? collection.fields.map((field) => {
        if (field.type !== 'tabs' || field.tabs.some((tab) => 'name' in tab && tab.name === 'seoBoost')) return field
        return {
          ...field,
          tabs: [...field.tabs, { name: 'seoBoost', label: 'SEO Boost', fields: seoBoostFields }],
        }
      })
    : [
        {
          type: 'tabs',
          tabs: [
            { label: 'Content', fields: collection.fields },
            { name: 'seoBoost', label: 'SEO Boost', fields: seoBoostFields },
          ],
        },
      ],
})

const monitoringCollections = (relationTo: string[]): CollectionConfig[] => [
  {
    slug: 'seo-metrics',
    labels: { singular: 'SEO metric', plural: 'SEO metrics' },
    access: { create: authenticated, delete: authenticated, read: authenticated, update: authenticated },
    admin: { defaultColumns: ['date', 'provider', 'clicks', 'impressions', 'averagePosition'] },
    fields: [
      { name: 'content', type: 'relationship', relationTo: relationTo as never, required: true },
      { name: 'date', type: 'date', required: true },
      {
        name: 'provider',
        type: 'select',
        required: true,
        defaultValue: 'manual',
        options: ['manual', 'google-search-console', 'bing-webmaster-tools'],
      },
      { name: 'clicks', type: 'number', required: true, defaultValue: 0, min: 0 },
      { name: 'impressions', type: 'number', required: true, defaultValue: 0, min: 0 },
      { name: 'averagePosition', type: 'number', min: 0 },
    ],
  },
  {
    slug: 'ai-citations',
    labels: { singular: 'AI citation', plural: 'AI citations' },
    access: { create: authenticated, delete: authenticated, read: authenticated, update: authenticated },
    admin: { defaultColumns: ['platform', 'status', 'query', 'observedAt'] },
    fields: [
      { name: 'content', type: 'relationship', relationTo: relationTo as never, required: true },
      {
        name: 'platform',
        type: 'select',
        required: true,
        options: ['chatgpt', 'perplexity', 'google-ai-overviews', 'copilot', 'other'],
      },
      { name: 'query', type: 'text', required: true },
      { name: 'citedURL', type: 'text' },
      { name: 'evidenceURL', type: 'text' },
      { name: 'observedAt', type: 'date', required: true },
      {
        name: 'status',
        type: 'select',
        required: true,
        defaultValue: 'confirmed',
        options: ['confirmed', 'suspected', 'lost'],
      },
    ],
  },
]

const score = (document: AuditableDocument): number => {
  const title = document.meta?.title?.trim() || document.title?.trim() || ''
  const description = document.meta?.description?.trim() || ''
  const focusKeyword = document.seoBoost?.focusKeyword?.trim() || ''
  return Math.max(0, 100 - (title ? 0 : 35) - (description ? 0 : 35) - (focusKeyword ? 0 : 15))
}

const dashboardEndpoint = (collections: string[]): Endpoint => ({
  path: '/seo-boost/dashboard',
  method: 'get',
  handler: async (req) => {
    if (!req.user) return Response.json({ message: 'Authentication required.' }, { status: 401 })

    const [content, metrics, citations] = await Promise.all([
      Promise.all(
        collections.map((collection) =>
          req.payload.find({ collection: collection as never, depth: 0, limit: 500, overrideAccess: false, req }),
        ),
      ),
      req.payload.find({ collection: 'seo-metrics' as never, depth: 0, limit: 500, overrideAccess: false, req }),
      req.payload.find({ collection: 'ai-citations' as never, depth: 0, limit: 500, overrideAccess: false, req }),
    ])

    const documents = content.flatMap((result) => result.docs) as AuditableDocument[]
    const metricDocs = metrics.docs as Array<{ clicks?: number; impressions?: number; averagePosition?: number }>
    const citationDocs = citations.docs as Array<{ status?: string }>
    const positions = metricDocs.filter((metric) => typeof metric.averagePosition === 'number')
    const scores = documents.map(score)

    return Response.json({
      audit: {
        averageScore: scores.length ? Math.round(scores.reduce((total, value) => total + value, 0) / scores.length) : 0,
        documents: documents.length,
        errors: documents.filter((document) => !(document.meta?.title || document.title) || !document.meta?.description).length,
        warnings: documents.filter((document) => !document.seoBoost?.focusKeyword).length,
      },
      performance: {
        clicks: metricDocs.reduce((total, metric) => total + (metric.clicks || 0), 0),
        impressions: metricDocs.reduce((total, metric) => total + (metric.impressions || 0), 0),
        averagePosition: positions.length
          ? Math.round((positions.reduce((total, metric) => total + (metric.averagePosition || 0), 0) / positions.length) * 10) / 10
          : null,
      },
      citations: {
        confirmed: citationDocs.filter((citation) => citation.status === 'confirmed').length,
        lost: citationDocs.filter((citation) => citation.status === 'lost').length,
        total: citationDocs.length,
      },
    })
  },
})

/** Adds Payload configuration only. The host project owns and reviews its database migration. */
export const seoBoostPlugin = (options: SeoBoostPluginOptions): Plugin => (config: Config): Config => {
  if (!options.collections?.length) throw new Error('seoBoostPlugin requires at least one collection slug.')

  const available = new Set((config.collections || []).map((collection) => collection.slug))
  const missing = options.collections.filter((slug) => !available.has(slug))
  if (missing.length) throw new Error(`seoBoostPlugin cannot find configured collection(s): ${missing.join(', ')}`)
  for (const slug of ['seo-metrics', 'ai-citations']) {
    if (available.has(slug)) throw new Error(`seoBoostPlugin cannot add collection "${slug}" because it already exists.`)
  }

  return {
    ...config,
    collections: [
      ...(config.collections || []).map((collection) =>
        options.collections.includes(collection.slug) ? addTab(collection) : collection,
      ),
      ...monitoringCollections(options.collections),
    ],
    endpoints: [...(config.endpoints || []), dashboardEndpoint(options.collections)],
    admin:
      options.dashboard === false
        ? config.admin
        : {
            ...config.admin,
            components: {
              ...config.admin?.components,
              beforeDashboard: [
                ...(config.admin?.components?.beforeDashboard || []),
                'payload-plugin-seo-boost/admin#SeoBoostDashboard',
              ],
            },
          },
  }
}
