import assert from 'node:assert/strict'
import test from 'node:test'

import { buildSchemaRecommendation } from '../src/schema'

test('ignores an uninitialised Payload answerBlocks object', () => {
  assert.doesNotThrow(() => buildSchemaRecommendation({ answerBlocks: {} }))
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
