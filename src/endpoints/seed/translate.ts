import type { Locale } from '@/i18n/config'

import { seedDictionaries } from './copy'

/**
 * Fields whose string value is editorial copy and therefore translatable.
 */
const TRANSLATABLE_KEYS = [
  'text',
  'label',
  'title',
  'description',
  'alt',
  'aeoSummary',
  'question',
  'answer',
  'submitButtonLabel',
  'subject',
]

export type MissingTranslations = string[]

/**
 * Walks a seeded document and replaces every translatable string with its
 * translation for the target locale.
 *
 * The seed builders stay in English and the translations live in a single
 * dictionary, so a new piece of content only has to be added to the
 * dictionaries — not to four copies of the builder.
 */
export const translateSeedDoc = <T>(
  doc: T,
  locale: Exclude<Locale, 'all'>,
  onMissing?: (missing: MissingTranslations) => void,
): T => {
  const dictionary = seedDictionaries[locale]
  const missing = new Set<string>()

  const walk = (node: unknown): unknown => {
    if (Array.isArray(node)) {
      return node.map(walk)
    }

    if (!node || typeof node !== 'object') {
      return node
    }

    const result: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(node)) {
      if (typeof value === 'string' && TRANSLATABLE_KEYS.includes(key)) {
        const translation = dictionary[value]

        if (translation === undefined) {
          if (value.trim().length > 1) missing.add(value)
          result[key] = value
        } else {
          result[key] = translation
        }

        continue
      }

      result[key] = walk(value)
    }

    return result
  }

  const translated = walk(doc) as T

  if (missing.size > 0) {
    onMissing?.([...missing])
  }

  return translated
}
