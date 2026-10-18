'use client'

import { useEffect } from 'react'

import type { Theme } from '../types'
import { getImplicitPreference, themeLocalStorageKey } from '../shared'

/**
 * Re-applies `data-theme` to `<html>` whenever the locale changes.
 *
 * The theme is normally set pre-paint by the `beforeInteractive` InitTheme
 * script, but that only runs on a hard load. A client-side locale switch
 * re-renders the `[locale]` layout and React rebuilds `<html>` without the
 * imperatively-set `data-theme` attribute, silently reverting dark-mode users
 * to the light theme. Keying this effect on `locale` re-applies the stored
 * (or implicit) preference after every switch. It renders nothing.
 */
export const ThemeApplier: React.FC<{ locale: string }> = ({ locale }) => {
  useEffect(() => {
    const stored = window.localStorage.getItem(themeLocalStorageKey)
    const theme: Theme | null =
      stored === 'dark' || stored === 'light' ? stored : getImplicitPreference()

    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [locale])

  return null
}
