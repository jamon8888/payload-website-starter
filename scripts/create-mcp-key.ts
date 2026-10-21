import dotenv from 'dotenv'
import { randomBytes } from 'node:crypto'

dotenv.config({ path: '.env.local' })

/**
 * Creates an MCP API key with the capabilities of the `site-settings` global
 * and the content collections. The key acts as its owner (the user below),
 * and its access control is enforced by Payload on every call.
 */
const run = async () => {
  const { createLocalReq, getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  const payload = await getPayload({ config })

  const users = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: 'demo-author@example.com' } },
  })

  const user = users.docs[0]

  if (!user) {
    console.log('NO_USER')
    process.exit(1)
  }

  const req = await createLocalReq({ user }, payload)

  // clean up the previous keys of that user
  const existing = await payload.find({
    collection: 'payload-mcp-api-keys',
    limit: 50,
    overrideAccess: true,
    where: { user: { equals: user.id } },
  })

  for (const doc of existing.docs) {
    await payload.delete({ collection: 'payload-mcp-api-keys', id: doc.id, overrideAccess: true })
  }

  // The key is generated here and stored encrypted by Payload; the plugin
  // looks it up through its HMAC index, so the raw value is the Bearer token.
  const rawKey = `MCP-${randomBytes(32).toString('hex')}`

  const created = await payload.create({
    collection: 'payload-mcp-api-keys',
    depth: 0,
    overrideAccess: true,
    data: {
      label: 'Claude Code',
      description: 'MCP client for the site assistant',
      user: user.id,
      apiKey: rawKey,
      enableAPIKey: true,
      posts: { find: true, create: true, update: true, delete: true },
      pages: { find: true, create: true, update: true, delete: true },
      categories: { find: true, create: true, update: true, delete: true },
      accessibilityStatements: { find: true, create: true, update: true, delete: true },
      media: { find: true, update: true },
      users: { find: true },
      siteSettings: { find: true, update: true },
      header: { find: true, update: true },
      footer: { find: true, update: true },
      accessibilityStatement: { find: true, update: true },
    },
  })

  const key = rawKey
  console.log('KEY=' + key)
  console.log('id=' + created.id)

  process.exit(0)
}

run()
