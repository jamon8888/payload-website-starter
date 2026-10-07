/**
 * Migration Script: backfill existing content into every enabled locale.
 *
 * Before Payload handled localization, content was stored as flat scalars /
 * plain arrays. Once a field is marked `localized: true`, that data only lives
 * in the default locale's rows and every other locale falls back to it.
 *
 * This script copies the existing default-locale value into every configured
 * locale so editors start from a complete baseline instead of silent fallbacks.
 * Translations still have to be done by a human — it just removes the gap.
 *
 * Usage:
 *   pnpm migrate:multilingual            # apply
 *   pnpm migrate:multilingual:dry        # report only
 */

import { getPayload } from 'payload'
import config from '@payload-config'

import { locales, defaultLocale } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

const COLLECTIONS = ['pages', 'posts', 'categories', 'media'] as const
const GLOBALS = ['header', 'footer'] as const

type Options = {
  dryRun: boolean
  verbose: boolean
}

async function migrateToMultilingual({ dryRun, verbose }: Options) {
  const payload = await getPayload({ config })

  console.log('Starting multilingual backfill...')
  console.log(`Locales: ${locales.join(', ')} (default: ${defaultLocale})`)

  if (dryRun) {
    console.log('DRY RUN MODE — no changes will be saved')
  }

  for (const collection of COLLECTIONS) {
    await migrateCollection(payload, collection, { dryRun, verbose })
  }

  for (const global of GLOBALS) {
    await migrateGlobal(payload, global, { dryRun, verbose })
  }

  console.log(dryRun ? '\nDry run complete.' : '\nMigration completed.')
}

/**
 * Writes the document once per locale, so Payload creates the row for each one.
 * Passing a single update with a per-locale object map does not work: the local
 * API expects flat data scoped to the given locale.
 */
async function writeAllLocales(
  payload: any,
  target: { collection?: string; global?: string },
  id: string | number,
  data: Record<string, unknown>,
  { dryRun }: Options,
) {
  for (const locale of locales) {
    if (dryRun) continue

    if (target.collection) {
      await payload.update({
        collection: target.collection,
        id,
        data,
        locale: locale as Locale,
        fallbackLocale: false,
      })
    } else {
      await payload.updateGlobal({
        slug: target.global,
        data,
        locale: locale as Locale,
        fallbackLocale: false,
      })
    }
  }
}

async function migrateCollection(
  payload: any,
  collection: string,
  options: Options,
): Promise<void> {
  const { dryRun, verbose } = options

  // `locale: 'all'` is read-only: it returns one row per locale, which is how we
  // can tell already-migrated documents from ones that only have the default.
  const result = await payload.find({
    collection,
    locale: 'all' as const,
    limit: 1000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })

  const alreadyLocalized = new Set<string>()

  for (const row of result.docs) {
    const base = row.localizedData
      ? (row.localizedData as Record<string, unknown>)
      : (row as Record<string, unknown>)

    if (isLocalizedValue(base.title)) {
      alreadyLocalized.add(String(row.id))
    }
  }

  console.log(
    `\n${collection}: ${result.totalDocs ?? result.docs.length} docs, ` +
      `${alreadyLocalized.size} already localized`,
  )

  for (const row of result.docs) {
    const doc = (row.localizedData ?? row) as Record<string, any>

    if (alreadyLocalized.has(String(row.id))) {
      if (verbose) console.log(`  skipping ${row.id} (already localized)`)
      continue
    }

    // Write the same flat data into each locale.
    const data = stripLocalizedWrappers(doc)

    if (verbose) {
      console.log(`  ${dryRun ? 'would update' : 'updating'} ${row.id}`)
    }

    await writeAllLocales(payload, { collection }, row.id as string, data, options)
  }
}

async function migrateGlobal(
  payload: any,
  global: string,
  options: Options,
): Promise<void> {
  const { dryRun, verbose } = options

  const found = await payload.findGlobal({
    slug: global,
    locale: 'all' as const,
    depth: 0,
    overrideAccess: true,
  })

  const doc = (found?.localizedData ?? found) as Record<string, any> | null

  if (!doc) {
    console.log(`\n${global}: not found, skipping`)
    return
  }

  if (isLocalizedValue(doc.navItems)) {
    console.log(`\n${global}: already localized, skipping`)
    return
  }

  if (verbose) {
    console.log(`  ${dryRun ? 'would update' : 'updating'} global ${global}`)
  }

  await writeAllLocales(payload, { global }, global, stripLocalizedWrappers(doc), options)
}

/** `locale: 'all'` may hand back either a flat doc or one keyed by locale. */
function isLocalizedValue(value: unknown): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  const keys = Object.keys(value as Record<string, unknown>)

  return keys.length > 0 && keys.every((key) => locales.includes(key as Locale))
}

/** Removes `localizedData` / `locale` bookkeeping Payload adds to `all` reads. */
function stripLocalizedWrappers(doc: Record<string, any>): Record<string, unknown> {
  const {
    localizedData: _localizedData,
    locale: _locale,
    ...rest
  } = doc

  return rest
}

const args = process.argv.slice(2)
const options: Options = {
  dryRun: args.includes('--dry-run'),
  verbose: args.includes('--verbose'),
}

migrateToMultilingual(options)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })