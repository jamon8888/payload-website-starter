import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

/**
 * Full seed (4 locales, media included). Destructive: it empties the
 * collections before recreating them.
 */
const run = async () => {
  const { createLocalReq, getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { seed } = await import('../src/endpoints/seed')

  const payload = await getPayload({ config })

  const users = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: 'demo-author@example.com' } },
  })

  const user = users.docs[0]

  if (!user) {
    console.log('NO_USER: seed the database from the admin panel first')
    process.exit(1)
  }

  const req = await createLocalReq({ user }, payload)

  try {
    await seed({ payload, req })
    console.log('SEED_OK')
  } catch (error) {
    const err = error as { message?: string; data?: unknown }
    console.log('SEED_FAILED:', err.message)
    console.log(JSON.stringify(err.data, null, 2)?.slice(0, 800))
    process.exit(1)
  }

  process.exit(0)
}

run()
