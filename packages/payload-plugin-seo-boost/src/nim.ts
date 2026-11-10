import type { SchemaRecommendation, SchemaSource } from './schema'

export const NIM_DEFAULT_MODEL = 'mistralai/mistral-large-4-1t-a52b'
export const NIM_DEFAULT_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions'
export type SeoBoostSuggestion = { canonicalURL: string; focusKeyword: string; robots: 'index-follow' | 'noindex-follow' | 'noindex-nofollow'; secondaryKeywords: string[]; social: SchemaRecommendation }
export type NimSettings = { apiKey?: string | null; baseURL?: string | null; model?: string | null }
type NimResponse = { choices?: Array<{ message?: { content?: string | null } }> }
const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const types = new Set(['WebPage', 'Article', 'Organization', 'LocalBusiness', 'Product', 'Service', 'FAQPage', 'Event'])
const robots = new Set<SeoBoostSuggestion['robots']>(['index-follow', 'noindex-follow', 'noindex-nofollow'])
export const parseSeoBoostSuggestion = (content: string): SeoBoostSuggestion => {
  const raw = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  let data: Record<string, unknown>
  try { data = JSON.parse(raw) as Record<string, unknown> } catch { throw new Error('La réponse IA ne contient pas de JSON exploitable.') }
  const social = data.social && typeof data.social === 'object' ? data.social as Record<string, unknown> : {}
  const schemaType = clean(social.schemaType)
  const robot = clean(data.robots) as SeoBoostSuggestion['robots']
  const schema = social.schemaJSON
  if (!types.has(schemaType) || !robots.has(robot) || !schema || typeof schema !== 'object' || Array.isArray(schema)) throw new Error('La réponse IA est invalide.')
  return { canonicalURL: clean(data.canonicalURL), focusKeyword: clean(data.focusKeyword), robots: robot, secondaryKeywords: [...new Set(Array.isArray(data.secondaryKeywords) ? data.secondaryKeywords.map(clean).filter(Boolean) : [])].slice(0, 8), social: { ogTitle: clean(social.ogTitle), ogDescription: clean(social.ogDescription).slice(0, 200), ogImageURL: clean(social.ogImageURL), schema: schema as Record<string, unknown>, schemaType } }
}
export const suggestSeoBoost = async ({ apiKey, baseURL = NIM_DEFAULT_BASE_URL, fetcher = fetch, model = NIM_DEFAULT_MODEL, source }: NimSettings & { fetcher?: typeof fetch; source: SchemaSource }): Promise<SeoBoostSuggestion> => {
  if (!clean(apiKey)) throw new Error('La clé API NVIDIA NIM doit être renseignée dans SEO Boost settings.')
  const response = await fetcher(clean(baseURL) || NIM_DEFAULT_BASE_URL, { method: 'POST', headers: { Accept: 'application/json', Authorization: `Bearer ${clean(apiKey)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: clean(model) || NIM_DEFAULT_MODEL, messages: [{ role: 'user', content: `Tu es un assistant SEO éditorial francophone. À partir uniquement de ces données, retourne seulement un JSON avec focusKeyword, secondaryKeywords, canonicalURL, robots (index-follow, noindex-follow ou noindex-nofollow) et social (ogTitle, ogDescription, ogImageURL, schemaType parmi WebPage, Article, Organization, LocalBusiness, Product, Service, FAQPage, Event, schemaJSON avec @context et le même @type). N'invente jamais de coordonnées, avis, tarifs, qualifications, résultats médicaux, disponibilité ou faits absents. Données: ${JSON.stringify(source)}` }], max_tokens: 2200, stream: false, temperature: 0.2 }) })
  if (!response.ok) { const detail = (await response.text()).replace(/nvapi-[A-Za-z0-9_-]+/g, '[secret removed]').replace(/\s+/g, ' ').slice(0, 400); throw new Error(`NVIDIA NIM a refusé la demande (${response.status})${detail ? ` : ${detail}` : '.'}`) }
  const content = clean((await response.json() as NimResponse).choices?.[0]?.message?.content)
  if (!content) throw new Error('NVIDIA NIM n’a retourné aucune recommandation exploitable.')
  return parseSeoBoostSuggestion(content)
}
