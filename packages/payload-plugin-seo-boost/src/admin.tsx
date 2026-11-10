'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'

import { buildSchemaRecommendation, type AnswerBlock } from './schema'
import type { SeoBoostSuggestion } from './nim'

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

export const NimAPIKeyField: React.FC = () => {
  const field = useField<string>({ path: 'nimAPIKey' })
  return <label htmlFor="seo-boost-nim-api-key" style={{ display: 'grid', gap: '0.5rem' }}><span>NVIDIA NIM API key</span><input autoComplete="new-password" id="seo-boost-nim-api-key" onChange={(event) => field.setValue(event.target.value)} placeholder="nvapi-…" type="password" value={field.value || ''} /><small>Cette clé n’est transmise qu’à l’API serveur de Payload.</small></label>
}

/** An editor-controlled prefill; nothing changes until it is applied and saved. */
export const SeoBoostSchemaGenerator: React.FC = () => {
  const fields = useFormFields((state) => state[0])
  const seoBoost = useField<Record<string, unknown>>({ path: 'seoBoost' })
  const [aiError, setAIError] = useState<string | null>(null)
  const [aiRecommendation, setAIRecommendation] = useState<SeoBoostSuggestion | null>(null)
  const [citationMessage, setCitationMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
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
  const apply = () => seoBoost.setValue({ ...(seoBoost.value || {}), social: { ...((seoBoost.value?.social as Record<string, unknown>) || {}), ogTitle: recommendation.ogTitle, ogDescription: recommendation.ogDescription, ogImageURL: recommendation.ogImageURL, schemaType: recommendation.schemaType, schemaJSON: recommendation.schema } })
  const requestAI = async () => {
    setAIError(null); setIsLoading(true)
    try {
      const response = await fetch('/api/seo-boost/suggest', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ document: { answerBlocks: readField(fields, 'aeo.answerBlocks') || readField(fields, 'answerBlocks'), canonicalURL: readField(fields, 'seoBoost.canonicalURL'), description: readField(fields, 'meta.description') || readField(fields, 'aeo.aeoSummary'), image: readField(fields, 'meta.image') || readField(fields, 'heroImage'), locale: readField(fields, 'locale'), publishedAt: readField(fields, 'publishedAt'), schemaType: readField(fields, 'seoBoost.social.schemaType'), slug: readField(fields, 'slug'), title: readField(fields, 'meta.title') || readField(fields, 'title') } }) })
      const data = await response.json() as { message?: string; suggestion?: SeoBoostSuggestion }
      if (!response.ok || !data.suggestion) throw new Error(data.message || 'La suggestion IA a échoué.')
      setAIRecommendation(data.suggestion)
    } catch (error) { setAIError(error instanceof Error ? error.message : 'La suggestion IA a échoué.') } finally { setIsLoading(false) }
  }
  const applyAI = () => aiRecommendation && seoBoost.setValue({ ...(seoBoost.value || {}), canonicalURL: aiRecommendation.canonicalURL, focusKeyword: aiRecommendation.focusKeyword, robots: aiRecommendation.robots, secondaryKeywords: aiRecommendation.secondaryKeywords.map((keyword) => ({ keyword })), social: { ...((seoBoost.value?.social as Record<string, unknown>) || {}), ...aiRecommendation.social, schemaJSON: aiRecommendation.social.schema, schemaTypes: Array.isArray((aiRecommendation.social.schema as { '@graph'?: unknown[] })['@graph']) ? (aiRecommendation.social.schema as { '@graph': Array<{ '@type'?: string }> })['@graph'].map((node) => node['@type']).filter((type): type is string => typeof type === 'string') : [aiRecommendation.social.schemaType] } })
  const createCitations = async () => { const match = window.location.pathname.match(/\/collections\/([^/]+)\/([^/]+)/); if (!match || !aiRecommendation?.citationSuggestions.length) return setCitationMessage('Enregistrez d’abord cette page.'); const response = await fetch('/api/seo-boost/citations', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: match[1], contentID: match[2], suggestions: aiRecommendation.citationSuggestions }) }); const data = await response.json() as { created?: number; message?: string }; setCitationMessage(response.ok ? `${data.created || 0} citation(s) suggérée(s) créée(s).` : data.message || 'Création impossible.') }
  return <section aria-label="Schema recommendation" style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 8, marginBlock: '1rem', padding: '1rem' }}><strong>Préremplir depuis la page</strong><p>Utilise le titre, la description, le slug, l’image et les réponses déjà saisies. Vérifie les données avant d’enregistrer.</p><button type="button" onClick={apply}>Appliquer la recommandation</button><button type="button" disabled={isLoading} onClick={() => void requestAI()} style={{ marginInlineStart: '0.5rem' }}>{isLoading ? 'Analyse avec Mistral…' : 'Proposer avec Mistral'}</button>{aiError && <p role="alert">{aiError}</p>}{aiRecommendation && <div style={{ marginBlockStart: '1rem' }}><p><strong>Proposition IA :</strong> {aiRecommendation.focusKeyword || 'mot-clé à préciser'} — schéma {aiRecommendation.social.schemaType}</p><button type="button" onClick={applyAI}>Appliquer tous les champs IA</button>{aiRecommendation.citationSuggestions.length > 0 && <button type="button" onClick={() => void createCitations()} style={{ marginInlineStart: '0.5rem' }}>Créer les citations IA suggérées</button>}{citationMessage && <p>{citationMessage}</p>}</div>}<details><summary>Aperçu JSON-LD</summary><pre style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{JSON.stringify(aiRecommendation?.social.schema || recommendation.schema, null, 2)}</pre></details></section>
}
