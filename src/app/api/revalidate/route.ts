import { NextRequest } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Cache invalidation endpoint.
 *
 * The Payload hooks run the CMS write OUTSIDE of Next.js' request scope
 * (`getPayload` boots Payload in local mode), where `revalidatePath` and
 * `revalidateTag` are silently inert — the ISR cache entry is never
 * invalidated. So the hooks also POST here: this route handler runs INSIDE
 * the request scope, where the invalidation is effective (this is the
 * "configure the content source to trigger a webhook that calls
 * revalidateTag" pattern from the Next.js caching guide).
 *
 * Body: { secret, tags?: string[], paths?: string[] }
 */
export async function POST(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const previewSecret = process.env.PREVIEW_SECRET

  if (!previewSecret || secret !== previewSecret) {
    return Response.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
  }

  let payload: { tags?: string[]; paths?: string[]; layoutPaths?: string[] } = {}

  try {
    payload = await req.json()
  } catch {
    return Response.json({ revalidated: false, message: 'Invalid body' }, { status: 400 })
  }

  const tags = payload.tags ?? []
  const paths = payload.paths ?? []
  const layoutPaths = payload.layoutPaths ?? []

  if (tags.length === 0 && paths.length === 0 && layoutPaths.length === 0) {
    return Response.json({ revalidated: false, message: 'Nothing to revalidate' }, { status: 400 })
  }

  for (const tag of tags) {
    // `{ expire: 0 }`: the next request blocks on fresh data instead of
    // serving stale content while a background fetch runs.
    revalidateTag(tag, { expire: 0 })
  }

  for (const path of paths) {
    revalidatePath(path)
  }

  for (const path of layoutPaths) {
    revalidatePath(path, 'layout')
  }

  // The payload instance might not be needed here but booting it warms the
  // runtime so the following regeneration is faster.
  try {
    await getPayload({ config: configPromise })
  } catch {
    // Warming failure must not fail the purge.
  }

  return Response.json({ revalidated: true, now: Date.now(), tags, paths })
}
