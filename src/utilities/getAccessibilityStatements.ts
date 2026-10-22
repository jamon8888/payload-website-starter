import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'

import type { AccessibilityStatement } from '@/payload-types'
import type { Locale } from '@/i18n/config'

const fetchAccessibilityStatements = async (locale: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'accessibility-statements',
    locale: locale as 'en' | 'de' | 'fr' | 'es',
    fallbackLocale: 'en',
    draft: false,
    depth: 1,
    pagination: false,
    sort: '-auditDate',
  })

  return result.docs
}

// Tagged `accessibility-statements`: the revalidate hooks of the collection
// and of the site-wide global purge it (URL-based revalidation misses the
// canonical, rewritten URLs of the default locale).
const cachedAccessibilityStatements = unstable_cache(
  fetchAccessibilityStatements,
  ['accessibility-statements'],
  { tags: ['accessibility-statements'] },
)

/**
 * Published accessibility statements, one per audited content. They power the
 * registry on `/accessibilite` and the notice displayed on the content itself.
 */
export const getAccessibilityStatements = cache(async (locale: Locale) =>
  cachedAccessibilityStatements(locale),
)

/**
 * The statement that applies to a given content, if there is one.
 */
export const getAccessibilityStatementForContent = cache(
  async ({
    contentID,
    relationTo,
    locale,
  }: {
    contentID: number | string
    relationTo: 'pages' | 'posts'
    locale: Locale
  }): Promise<AccessibilityStatement | null> => {
    const statements = await getAccessibilityStatements(locale)

    const match = statements.find((statement) => {
      const content = statement.content

      if (!content || typeof content !== 'object') return false
      if (!('relationTo' in content) || !('value' in content)) return false
      if (content.relationTo !== relationTo) return false

      const value = content.value
      const id =
        value && typeof value === 'object' && 'id' in value ? value.id : (value as number | string)

      return id !== undefined && String(id) === String(contentID)
    })

    return match ?? null
  },
)
