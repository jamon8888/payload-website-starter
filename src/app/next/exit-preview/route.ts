import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { buildPublicPath } from '@/utilities/previewPaths'

/**
 * Leaves the draft preview: the draft mode is disabled and the visitor is
 * sent back to the public URL of the same content.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const draft = await draftMode()
  draft.disable()

  const path = req.nextUrl.searchParams.get('path')

  if (path) {
    redirect(buildPublicPath(path))
  }

  return new Response('Draft mode is disabled')
}
