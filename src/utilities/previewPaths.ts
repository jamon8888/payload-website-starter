import { locales } from '@/i18n/config'

/**
 * The draft preview lives under `/preview` (and `/<locale>/preview` for the
 * other locales), because the public routes are statically rendered and cannot
 * read the draft mode.
 *
 * These helpers translate a public path to its preview counterpart and back.
 */
const splitPath = (path: string) => {
  const segments = path.split('/').filter(Boolean)
  const hasLocale = locales.includes(segments[0] as (typeof locales)[number])

  return {
    hasLocale,
    locale: hasLocale ? segments[0] : null,
    rest: hasLocale ? segments.slice(1) : segments,
  }
}

export const buildPreviewPath = (path: string): string => {
  const { hasLocale, locale, rest } = splitPath(path)

  const segments = ['preview', ...rest].join('/')

  return `/${hasLocale ? `${locale}/` : ''}${segments}`.replace(/\/$/, '') || '/preview'
}

export const buildPublicPath = (path: string): string => {
  const { hasLocale, locale, rest } = splitPath(path)

  const segments = rest.filter((segment) => segment !== 'preview').join('/')

  return `/${hasLocale ? `${locale}/` : ''}${segments}`.replace(/\/$/, '') || '/'
}
