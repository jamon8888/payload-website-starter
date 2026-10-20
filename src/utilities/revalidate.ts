import { revalidatePath, revalidateTag } from 'next/cache.js'

type Logger = {
  warn: (message: string) => void
}

/**
 * Next.js cache invalidation only works inside a request or render context.
 *
 * Payload also runs outside of Next — CLI scripts, cron jobs, seed scripts — and
 * there `revalidatePath`/`revalidateTag` throw an "Invariant: static generation
 * store missing" error, which would abort the whole write operation. Cache
 * invalidation is best-effort in that context, so failures are logged instead of
 * thrown: the content is already persisted, only the cache is stale.
 */
export const safeRevalidatePath = (path: string, logger?: Logger): void => {
  try {
    revalidatePath(path)
  } catch (error) {
    logger?.warn(`Could not revalidate path "${path}": ${(error as Error).message}`)
  }
}

export const safeRevalidateTag = (tag: string, logger?: Logger): void => {
  try {
    revalidateTag(tag, 'max')
  } catch (error) {
    logger?.warn(`Could not revalidate tag "${tag}": ${(error as Error).message}`)
  }
}
