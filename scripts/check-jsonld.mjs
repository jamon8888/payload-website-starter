import assert from 'node:assert/strict'

/**
 * Minimal JSON-LD assertions for schema types the `sdtt` presets do not cover
 * (FAQPage, BreadcrumbList, WebPage). `pnpm schema:validate` pairs this with
 * `sdtt --presets Article` for the richer Article checks.
 */
/** @type {{ url: string; types: string[] }[]} */

const checks = [
  {
    url: 'http://127.0.0.1:3000/fr/posts/digital-horizons',
    types: ['Article', 'FAQPage', 'BreadcrumbList'],
  },
  {
    url: 'http://127.0.0.1:3000/fr/accessibilite',
    types: ['WebPage'],
  },
]

const run = async () => {
  let failures = 0

  for (const { url, types } of checks) {
    const response = await fetch(url)

    assert.equal(response.status, 200, `${url} responded ${response.status}`)

    const html = await response.text()
    const blocks = [
      ...html.matchAll(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g,
      ),
    ]

    const found = []

    for (const [, raw] of blocks) {
      try {
        const parsed = JSON.parse(raw)
        const nodes = Array.isArray(parsed) ? parsed : [parsed]

        for (const node of nodes) {
          if (node?.['@type']) found.push(node['@type'])
        }
      } catch {
        // A malformed block is reported below as a missing type.
      }
    }

    const missing = types.filter((type) => !found.includes(type))

    if (missing.length) {
      failures += missing.length
      console.error(`✕ ${url} is missing JSON-LD: ${missing.join(', ')}`)
    } else {
      console.log(`✓ ${url} emits ${types.join(', ')}`)
    }
  }

  if (failures) {
    process.exit(1)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
