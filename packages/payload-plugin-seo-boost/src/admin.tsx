'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'

import { buildSchemaRecommendation, type AnswerBlock } from './schema'

type Dashboard = {
  audit: { averageScore: number; documents: number; errors: number; warnings: number }
  citations: { confirmed: number; lost: number; total: number }
  performance: { averagePosition: number | null; clicks: number; impressions: number }
}

export const SeoBoostDashboard: React.FC = () => {
  const [data, setData] = useState<Dashboard | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch('/api/seo-boost/dashboard')
      .then((response) => (response.ok ? (response.json() as Promise<Dashboard>) : Promise.reject()))
      .then(setData)
      .catch(() => setFailed(true))
  }, [])

  return (
    <section aria-labelledby="seo-boost-title" style={{ marginBlock: '1.5rem' }}>
      <h2 id="seo-boost-title">SEO Boost</h2>
      {failed && <p role="alert">The SEO Boost dashboard could not be loaded.</p>}
      {!data && !failed && <p>Loading editorial metrics…</p>}
      {data && (
        <dl style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}>
          <div><dt>SEO health</dt><dd>{data.audit.averageScore}/100</dd></div>
          <div><dt>Content audited</dt><dd>{data.audit.documents}</dd></div>
          <div><dt>Search clicks</dt><dd>{data.performance.clicks}</dd></div>
          <div><dt>AI citations</dt><dd>{data.citations.confirmed} confirmed</dd></div>
        </dl>
      )}
    </section>
  )
}

export default SeoBoostDashboard

type FieldState = { value?: unknown }
const readField = (fields: unknown, path: string): unknown => (fields as Record<string, FieldState> | undefined)?.[path]?.value

/** An editor-controlled prefill; nothing changes until it is applied and saved. */
export const SeoBoostSchemaGenerator: React.FC = () => {
  const fields = useFormFields((state) => state[0])
  const social = useField<Record<string, unknown>>({ path: 'seoBoost.social' })
  const recommendation = useMemo(() => buildSchemaRecommendation({
    answerBlocks: (readField(fields, 'aeo.answerBlocks') || readField(fields, 'answerBlocks')) as AnswerBlock[],
    canonicalURL: readField(fields, 'seoBoost.canonicalURL') as string,
    description: (readField(fields, 'meta.description') || readField(fields, 'aeo.aeoSummary')) as string,
    image: readField(fields, 'meta.image') || readField(fields, 'heroImage'),
    locale: readField(fields, 'locale') as string,
    publishedAt: readField(fields, 'publishedAt') as string,
    schemaType: readField(fields, 'seoBoost.social.schemaType') as string,
    slug: readField(fields, 'slug') as string,
    title: (readField(fields, 'meta.title') || readField(fields, 'title')) as string,
  }), [fields])
  const apply = () => social.setValue({ ...(social.value || {}), ogTitle: recommendation.ogTitle, ogDescription: recommendation.ogDescription, ogImageURL: recommendation.ogImageURL, schemaType: recommendation.schemaType, schemaJSON: recommendation.schema })
  return <section aria-label="Schema recommendation" style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 8, marginBlock: '1rem', padding: '1rem' }}><strong>Préremplir depuis la page</strong><p>Utilise le titre, la description, le slug, l’image et les réponses déjà saisies. Vérifie les données avant d’enregistrer.</p><button type="button" onClick={apply}>Appliquer la recommandation</button><details><summary>Aperçu JSON-LD</summary><pre style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{JSON.stringify(recommendation.schema, null, 2)}</pre></details></section>
}
