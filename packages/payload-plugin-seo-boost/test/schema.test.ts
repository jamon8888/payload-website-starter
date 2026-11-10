import assert from 'node:assert/strict'
import test from 'node:test'

import { buildSchemaRecommendation } from '../src/schema'
import { parseSeoBoostSuggestion } from '../src/nim'

test('ignores an uninitialised Payload answerBlocks object', () => {
  assert.doesNotThrow(() => buildSchemaRecommendation({ answerBlocks: {} }))
})

test('accepts a valid NIM SEO proposal', () => {
  const result = parseSeoBoostSuggestion(JSON.stringify({ focusKeyword: 'hypnose', secondaryKeywords: ['hypnose paris', 'hypnose paris'], canonicalURL: '', robots: 'index-follow', social: { ogTitle: 'Hypnose', ogDescription: 'Description', ogImageURL: '', schemaType: 'Service', schemaJSON: { '@context': 'https://schema.org', '@type': 'Service' } } }))
  assert.deepEqual(result.secondaryKeywords, ['hypnose paris'])
})

test('uses valid answer blocks for an FAQPage schema', () => {
  const result = buildSchemaRecommendation({
    answerBlocks: [{ question: 'Comment prendre rendez-vous ?', answer: 'En ligne ou par téléphone.' }],
    schemaType: 'FAQPage',
    title: 'Questions fréquentes',
  })

  assert.deepEqual(result.schema.mainEntity, [
    {
      '@type': 'Question',
      name: 'Comment prendre rendez-vous ?',
      acceptedAnswer: { '@type': 'Answer', text: 'En ligne ou par téléphone.' },
    },
  ])
})
