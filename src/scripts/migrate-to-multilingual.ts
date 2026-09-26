/**
 * Migration Script: Convert existing content to multilingual format
 * 
 * This script helps migrate existing single-language content to the new multilingual format.
 * It should be run after enabling localization in Payload config.
 * 
 * Usage:
 * npx tsx src/scripts/migrate-to-multilingual.ts
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { locales, defaultLocale, Locale } from '@/i18n/config'

interface MigrationOptions {
  dryRun?: boolean
  collections?: string[]
  verbose?: boolean
}

async function migrateToMultilingual(options: MigrationOptions = {}) {
  const { dryRun = false, collections = ['pages', 'posts', 'categories', 'media'], verbose = true } = options
  
  const payload = await getPayload({ config })
  
  console.log('🚀 Starting multilingual migration...')
  console.log(`📋 Options: dryRun=${dryRun}, collections=${collections.join(', ')}`)
  
  if (dryRun) {
    console.log('⚠️  DRY RUN MODE - No changes will be saved')
  }

  try {
    // Migrate each collection
    for (const collectionSlug of collections) {
      console.log(`\n📦 Migrating collection: ${collectionSlug}`)
      await migrateCollection(payload, collectionSlug, { dryRun, verbose })
    }

    // Migrate globals
    console.log('\n🌐 Migrating globals...')
    await migrateGlobals(payload, { dryRun, verbose })

    console.log('\n✅ Migration completed successfully!')
    
    if (dryRun) {
      console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.')
    }
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

async function migrateCollection(
  payload: any,
  collectionSlug: string,
  options: { dryRun: boolean; verbose: boolean }
) {
  const { dryRun, verbose } = options
  
  // Get all documents
  const docs = await payload.find({
    collection: collectionSlug,
    limit: 0,
    pagination: false,
    depth: 0,
  })

  console.log(`   Found ${docs.docs.length} documents`)

  for (const doc of docs.docs) {
    if (verbose) {
      console.log(`   📄 Processing: ${doc.title || doc.slug || doc.id}`)
    }

    // Check if already localized (has locale-specific fields)
    const needsMigration = checkNeedsMigration(doc, collectionSlug)
    
    if (!needsMigration) {
      if (verbose) console.log(`   ⏭️  Already localized, skipping`)
      continue
    }

    // Create localized version
    const localizedData = createLocalizedData(doc, collectionSlug)
    
    if (dryRun) {
      console.log(`   🔍 Would update: ${doc.id}`)
      if (verbose) console.log(`   📝 New data:`, JSON.stringify(localizedData, null, 2))
    } else {
      await payload.update({
        collection: collectionSlug,
        id: doc.id,
        data: localizedData,
        locale: defaultLocale,
        fallbackLocale: defaultLocale,
      })
      console.log(`   ✅ Updated: ${doc.id}`)
    }
  }
}

function checkNeedsMigration(doc: any, collectionSlug: string): boolean {
  // Check if title is already an object (localized)
  if (doc.title && typeof doc.title === 'object' && doc.title.en) {
    return false // Already localized
  }
  
  // Check for other localized fields
  const localizedFields = getLocalizedFields(collectionSlug)
  
  for (const field of localizedFields) {
    if (doc[field] && typeof doc[field] === 'object' && doc[field].en) {
      return false
    }
  }
  
  return true // Needs migration
}

function getLocalizedFields(collectionSlug: string): string[] {
  const fieldMap: Record<string, string[]> = {
    pages: ['title', 'hero.richText', 'layout'],
    posts: ['title', 'content', 'heroImage', 'relatedPosts', 'categories'],
    categories: ['title'],
    media: ['alt', 'caption'],
  }
  return fieldMap[collectionSlug] || []
}

function createLocalizedData(doc: any, collectionSlug: string): any {
  const localizedFields = getLocalizedFields(collectionSlug)
  const result: any = { ...doc }
  
  for (const field of localizedFields) {
    if (doc[field] !== undefined && doc[field] !== null) {
      // Convert string to localized object with default locale
      if (typeof doc[field] === 'string' || typeof doc[field] === 'number') {
        result[field] = {
          en: doc[field],
          es: doc[field], // Will need manual translation
          fr: doc[field],
        }
      } else if (Array.isArray(doc[field])) {
        // For arrays like layout blocks, wrap each item
        result[field] = doc[field].map((item: any) => localizeBlock(item))
      } else if (typeof doc[field] === 'object') {
        // For nested objects like hero
        result[field] = localizeObject(doc[field])
      }
    }
  }
  
  return result
}

function localizeObject(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj
  
  const result: any = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' || typeof value === 'number') {
      result[key] = {
        en: value,
        es: value,
        fr: value,
      }
    } else if (Array.isArray(value)) {
      result[key] = value.map(localizeObject)
    } else if (typeof value === 'object' && value !== null) {
      result[key] = localizeObject(value)
    } else {
      result[key] = value
    }
  }
  
  return result
}

function localizeBlock(block: any): any {
  // Localize block fields that are known to be localized
  const localizedBlock = { ...block }
  
  if (block.richText) {
    localizedBlock.richText = localizeObject(block.richText)
  }
  
  if (block.columns) {
    localizedBlock.columns = block.columns.map((col: any) => ({
      ...col,
      richText: col.richText ? localizeObject(col.richText) : undefined,
    }))
  }
  
  if (block.content) {
    localizedBlock.content = localizeObject(block.content)
  }
  
  if (block.introContent) {
    localizedBlock.introContent = localizeObject(block.introContent)
  }
  
  if (block.links) {
    localizedBlock.links = block.links.map((link: any) => ({
      ...link,
      link: {
        ...link.link,
        label: typeof link.link?.label === 'string' 
          ? { en: link.link.label, es: link.link.label, fr: link.link.label }
          : link.link.label,
      },
    }))
  }
  
  return localizedBlock
}

async function migrateGlobals(
  payload: any,
  options: { dryRun: boolean; verbose: boolean }
) {
  const { dryRun, verbose } = options
  const globals = ['header', 'footer']
  
  for (const globalSlug of globals) {
    if (verbose) console.log(`   🌐 Processing global: ${globalSlug}`)
    
    const global = await payload.findGlobal({ slug: globalSlug, depth: 0 })
    
    if (!global) {
      console.log(`   ⏭️  Global not found: ${globalSlug}`)
      continue
    }
    
    const needsMigration = checkGlobalNeedsMigration(global)
    
    if (!needsMigration) {
      if (verbose) console.log(`   ⏭️  Already localized, skipping`)
      continue
    }
    
    const localizedData = createLocalizedGlobalData(global)
    
    if (dryRun) {
      console.log(`   🔍 Would update global: ${globalSlug}`)
    } else {
      await payload.updateGlobal({
        slug: globalSlug,
        data: localizedData,
        locale: defaultLocale,
        fallbackLocale: defaultLocale,
      })
      console.log(`   ✅ Updated global: ${globalSlug}`)
    }
  }
}

function checkGlobalNeedsMigration(global: any): boolean {
  if (global.navItems && Array.isArray(global.navItems)) {
    for (const item of global.navItems) {
      if (item.link?.label && typeof item.link.label === 'string') {
        return true
      }
    }
  }
  return false
}

function createLocalizedGlobalData(global: any): any {
  const result = { ...global }
  
  if (global.navItems && Array.isArray(global.navItems)) {
    result.navItems = global.navItems.map((item: any) => ({
      ...item,
      link: {
        ...item.link,
        label: item.link?.label 
          ? { en: item.link.label, es: item.link.label, fr: item.link.label }
          : item.link?.label,
      },
    }))
  }
  
  return result
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const verbose = args.includes('--verbose')
  
  migrateToMultilingual({ dryRun, verbose })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error)
      process.exit(1)
    })
}

export { migrateToMultilingual }