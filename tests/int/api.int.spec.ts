import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('exposes a version for every document type', async () => {
    const versions = await payload.findVersions({ collection: 'posts' })
    expect(versions).toBeDefined()
  })

  it('registers the accessibility statement global', async () => {
    const statement = await payload.findGlobal({ slug: 'accessibility-statement', depth: 0 })
    expect(statement).toBeDefined()
  })
})