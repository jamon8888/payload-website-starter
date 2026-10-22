import { revalidatePath, revalidateTag } from 'next/cache.js'

type Logger = {
  warn: (message: string) => void
}

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
