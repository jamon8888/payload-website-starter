import { revalidatePath, revalidateTag } from 'next/cache.js'

type Logger = {
  warn: (message: string) => void
}

const internalBaseUrl = (): string =>
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  ''

/**
 * Every frontend route lives under `src/app/[locale]/`, so the *internal* path
 * always carries the locale segment — English is served from the unprefixed
 * URL through the proxy rewrite, but the rendered page (and therefore its
 * cache entry) is `/en/...`.
 *
 * `revalidatePath` works on internal paths, so revalidating `/posts` would
 * silently do nothing for the default locale.
 */
export const localePath = (locale: string, path = ''): string => `/${locale}${path}`

/**
 * Next.js cache invalidation only works inside a request or render context.
 *
 * Payload also runs outside of Next — CLI scripts, cron jobs, seed scripts — and
 * there `revalidatePath`/`revalidateTag` throw an "Invariant: static generation
 * store missing" error, which would abort the whole write operation. Cache
 * invalidation is best-effort in that context, so failures are logged instead of
 * thrown: the content is already persisted, only the cache is stale.
 */
export const safeRevalidatePath = (
  path: string,
  logger?: Logger,
  type?: 'layout' | 'page',
): void => {
  try {
    revalidatePath(path, type)
  } catch (error) {
    logger?.warn(`Could not revalidate path "${path}": ${(error as Error).message}`)
  }
}

/**
 * Purges a content path in BOTH forms the cache may be keyed by:
 *
 * - for the default locale, the canonical public path (`/posts/x`) — the ISR
 *   cache entry — because the proxy rewrites it to the internal `/en/posts/x`
 *   and `revalidatePath('/en/...')` silently misses it;
 * - for the other locales the public path IS the prefixed path.
 *
 * The `path` is the locale-less content path ("" for the home page, "/posts/x"
 * for a post).
 */
export const docRevalidationPaths = (locale: string, path: string): string[] => {
  const joined = path.replace(/\/$/, '')

  if (locale === 'en') {
    return [joined || '/', `/en${joined || ''}`]
  }

  return [`/${locale}${joined}`]
}

export const safeRevalidateDocPath = (
  locale: string,
  path: string,
  logger?: Logger,
): void => {
  for (const candidate of docRevalidationPaths(locale, path)) {
    safeRevalidatePath(candidate, logger)
  }
}

export const safeRevalidateTag = (tag: string, logger?: Logger): void => {
  try {
    // `{ expire: 0 }` = blocking revalidation: the next request waits for the
    // fresh data instead of serving stale content while it regenerates in
    // the background. The default `revalidateTag(tag)` behaves like this, but
    // the two-argument form is the current API — and a named profile such as
    // `'max'` would publicly serve stale content for the whole SWR window.
    revalidateTag(tag, { expire: 0 })
  } catch (error) {
    logger?.warn(`Could not revalidate tag "${tag}": ${(error as Error).message}`)
  }
}

/**
 * Queue-shaped invalidation for outside-Next contexts.
 *
 * The Payload hooks run the write outside of Next.js' request scope, where
 * `revalidatePath`/`revalidateTag` are silently inert: the ISR cache entry is
 * never invalidated (a purge inside a hook "succeeds", yet the page keeps
 * serving its stale, cached copy). The direct calls are kept as best effort,
 * and the invalidation ALSO goes through the in-scope `/api/revalidate`
 * endpoint, where it is actually applied (the "content webhook →
 * revalidateTag" pattern from the Next.js caching guide).
 */
export const revalidateViaEndpoint = async (
  {
    paths = [],
    tags = [],
    layoutPaths = [],
  }: { paths?: string[]; tags?: string[]; layoutPaths?: string[] },
  logger?: Logger,
): Promise<void> => {
  const base = internalBaseUrl()
  const secret = process.env.PREVIEW_SECRET

  if (!base || !secret) {
    // Self-hosted / offline contexts: no endpoint to call, the direct calls
    // above are the only mechanism (and they work inside a request scope).
    return
  }

  const url = `${base.replace(/\/$/, '')}/api/revalidate?secret=${encodeURIComponent(secret)}`

  try {
    const started = Date.now()
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags, paths, layoutPaths }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      logger?.warn(
        `The revalidate endpoint returned ${res.status} (${Date.now() - started}ms): ${body.slice(0, 300)}`,
      )
    }
  } catch (error) {
    logger?.warn(`Could not reach the revalidate endpoint: ${(error as Error).message}`)
  }
}
