import { describe, it, expect } from 'vitest'

import { locales, defaultLocale } from '@/i18n/config'
import en from '@/i18n/messages/en.json'
import fr from '@/i18n/messages/fr.json'
import de from '@/i18n/messages/de.json'
import es from '@/i18n/messages/es.json'

const catalogues: Record<string, Record<string, unknown>> = { en, fr, de, es }

/** Flattens a nested message object into dotted keys, for parity comparison. */
const flatten = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flatten(value as Record<string, unknown>, path))
    } else {
      acc[path] = String(value)
    }

    return acc
  }, {})
}

const flattened = Object.fromEntries(
  Object.entries(catalogues).map(([locale, messages]) => [locale, flatten(messages)]),
)

describe('i18n configuration', () => {
  it('exposes a message catalogue for every configured locale', () => {
    for (const locale of locales) {
      expect(catalogues[locale], `missing catalogue for ${locale}`).toBeDefined()
    }
  })

  it('has a default locale inside the locale list', () => {
    expect(locales).toContain(defaultLocale)
  })
})

describe('i18n message catalogues', () => {
  // The German catalogue existed but /de/accessibilite used inline per-locale
  // maps that only had en/es/fr keys, so German rendered `undefined`.
  it('keeps identical key sets across all locales', () => {
    const reference = Object.keys(flattened.en).sort()

    for (const locale of locales) {
      expect(Object.keys(flattened[locale]).sort(), `${locale} key set`).toEqual(reference)
    }
  })

  it('has no empty message values', () => {
    for (const locale of locales) {
      for (const [key, value] of Object.entries(flattened[locale])) {
        expect(value, `${locale}.${key}`).not.toBe('')
      }
    }
  })

  it('translates the accessibility statement into every locale', () => {
    const expected: Record<string, string> = {
      en: 'Accessibility Statement',
      fr: "Déclaration d'accessibilité",
      de: 'Erklärung zur Barrierefreiheit',
      es: 'Declaración de accesibilidad',
    }

    for (const locale of locales) {
      expect(flattened[locale]['accessibility.title'], locale).toBe(expected[locale])
      expect(flattened[locale]['accessibility.metaTitle'], locale).toBe(expected[locale])
    }
  })

  it('translates the skip link, which was previously hardcoded to French', () => {
    const expected: Record<string, string> = {
      en: 'Skip to main content',
      fr: 'Aller au contenu principal',
      de: 'Zum Hauptinhalt springen',
      es: 'Saltar al contenido principal',
    }

    for (const locale of locales) {
      expect(flattened[locale]['a11y.skipToContent'], locale).toBe(expected[locale])
    }
  })

  it('translates the navigation landmark labels', () => {
    const expected: Record<string, string> = {
      en: 'Main navigation',
      fr: 'Navigation principale',
      de: 'Hauptnavigation',
      es: 'Navegación principal',
    }

    for (const locale of locales) {
      expect(flattened[locale]['a11y.mainNavigation'], locale).toBe(expected[locale])
      expect(flattened[locale]['a11y.footerNavigation'], locale).not.toBe(expected[locale])
    }
  })

  it('keeps the ICU placeholder names identical across locales', () => {
    const placeholders = (value: string) =>
      (value.match(/\{\{(\w+)\}\}/g) ?? []).map((m) => m.slice(2, -2)).sort()

    for (const key of Object.keys(flattened.en)) {
      const reference = placeholders(flattened.en[key])

      for (const locale of locales) {
        expect(placeholders(flattened[locale][key]), `${locale}.${key}`).toEqual(reference)
      }
    }
  })
})