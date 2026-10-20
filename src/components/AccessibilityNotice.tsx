import React from 'react'
import Link from 'next/link'

import type { AccessibilityStatement } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionary'
import { localizedHref } from '@/i18n/path'

/**
 * RGAA 13.3: the accessibility statement of a content must be reachable from
 * the content itself.
 */
export const AccessibilityNotice: React.FC<{
  locale: Locale
  statement: AccessibilityStatement | null
}> = async ({ locale, statement }) => {
  if (!statement) return null

  const { accessibility: a } = await getDictionary(locale)

  const status =
    statement.complianceStatus === 'conformant'
      ? a.fullyCompliant
      : statement.complianceStatus === 'nonConformant'
        ? a.nonCompliant
        : a.partiallyCompliant

  return (
    <aside
      aria-labelledby="accessibility-notice"
      className="mt-12 rounded-lg border border-border bg-muted/40 p-4 text-sm"
    >
      <h2 id="accessibility-notice" className="font-medium">
        {a.contentAccessibility}
      </h2>
      <p className="text-muted-foreground">{status}</p>
      {statement.slug ? (
        <Link
          className="text-primary hover:underline"
          href={localizedHref(locale, `accessibilite/${statement.slug}`)}
        >
          {a.viewStatement}
        </Link>
      ) : null}
    </aside>
  )
}
