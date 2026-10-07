import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

/**
 * next-intl reads the active locale from this request header on the server.
 * Its own middleware normally sets it, but this project implements `as-needed`
 * URL rewriting by hand (see below), so we have to set it ourselves —
 * without it every `getTranslations` call silently falls back to `en`.
 */
const LOCALE_HEADER = 'X-NEXT-INTL-LOCALE'

/**
 * Locale prefixing follows next-intl's `as-needed` strategy: the default locale
 * (`en`) lives at the bare path, every other locale is prefixed (`/fr/...`).
 * This keeps internal links — which build unprefixed URLs for `en` — canonical,
 * and avoids two valid URLs for the same English page.
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip admin, api, static files, sitemaps, robots, favicon
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next') ||
    pathname.startsWith('/graphql') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // `split('/')` on `/en/posts` yields a leading empty string, which would
  // shadow the locale segment — drop it before comparing.
  const [segment, ...rest] = pathname.replace(/^\//, '').split('/')

  const hasLocale = locales.some(
    (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // `Accept-Language` only gets a say when the URL carries no locale at all.
  const locale = hasLocale
    ? segment
    : negotiateLocale(request.headers.get('accept-language'))

  const headers = new Headers(request.headers)
  headers.set(LOCALE_HEADER, locale)

  if (hasLocale) {
    if (segment === defaultLocale) {
      // Canonicalise `/en/...` to `/...` with a permanent redirect.
      const target = rest.length ? `/${rest.join('/')}` : '/'
      return NextResponse.redirect(new URL(target, request.url), 308)
    }

    return NextResponse.next({ request: { headers } })
  }

  // No locale in the URL. Every page lives under `/[locale]`, so unprefixed
  // paths are *rewritten* onto the resolved locale rather than redirected —
  // the visitor stays on the URL that `getLocalizedPath` and the
  // canonical/hreflang tags already point at.
  const target = new URL(request.url)
  target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  return NextResponse.rewrite(target, { request: { headers } })
}

/**
 * Picks the best supported locale from an `Accept-Language` header,
 * defaulting to the site default when nothing matches.
 */
function negotiateLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const qParam = params.find((p) => p.trim().startsWith('q='))
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1

      return { tag: tag.toLowerCase(), q: Number.isNaN(q) ? 0 : q }
    })
    .filter(({ tag }) => Boolean(tag))
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    if (locales.includes(tag)) return tag

    // Handle regional variants such as `de-DE` or `fr-CA`.
    const base = tag.split('-')[0]
    if (locales.includes(base)) return base
  }

  return defaultLocale
}

export const config = {
  matcher: ['/((?!admin|api|_next|next|graphql|.*\\..*).*)'],
}
