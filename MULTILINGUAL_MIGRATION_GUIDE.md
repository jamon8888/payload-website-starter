# Multilingual Migration Guide

This guide explains how to migrate existing content to the new multilingual format after enabling localization.

## Prerequisites

1. Payload config has localization enabled with locales: `['en', 'es', 'fr']`
2. Collections/globals have `localized: true` on relevant fields
3. Database is backed up (run `pg_dump` or equivalent)

## Migration Strategies

### Strategy 1: Automated Migration Script (Recommended)

Run the migration script to automatically convert existing single-language content to multilingual format.

```bash
# Dry run first to see what would change
npx tsx src/scripts/migrate-to-multilingual.ts --dry-run --verbose

# Apply changes
npx tsx src/scripts/migrate-to-multilingual.ts --verbose
```

**What it does:**
- Converts string fields to localized objects: `"Title"` → `{ en: "Title", es: "Title", fr: "Title" }`
- Handles nested objects (hero, layout blocks, etc.)
- Migrates globals (header, footer navigation)
- Preserves existing content as default locale (English)

### Strategy 2: Manual Migration via Admin UI

For smaller datasets or when you need precise control:

1. Go to each document in admin panel
2. Switch locale selector to each language
3. Enter translations for each field
4. Save

### Strategy 3: Fresh Seed with Multilingual Content

For new projects or when you can reset data:

```bash
# Reset database and seed with multilingual content
npx payload migrate:run --file=src/endpoints/seed/multilingual-seed.ts
```

## Post-Migration Steps

### 1. Translate Content

After migration, all content exists in English. You need to translate:

- **Via Admin UI**: Switch locale selector (top-right) and edit each document
- **Via API**: Use PATCH requests with locale parameter
- **Bulk**: Use the translations API or direct database updates

### 2. Verify Frontend

Test each locale:

```bash
# Start dev server
pnpm dev

# Test locales
curl http://localhost:3000/en/
curl http://localhost:3000/es/
curl http://localhost:3000/fr/
curl http://localhost:3000/en/posts
curl http://localhost:3000/es/posts
```

### 3. Check Sitemaps

```bash
curl http://localhost:3000/en/pages-sitemap.xml
curl http://localhost:3000/es/pages-sitemap.xml
curl http://localhost:3000/fr/pages-sitemap.xml
```

### 4. Admin Panel

- Verify locale selector appears in admin toolbar
- Check that field labels show in selected language
- Test creating new content in different locales

## Field Migration Details

### Simple Fields (title, alt, etc.)

```json
// Before
{ "title": "Hello World" }

// After
{ "title": { "en": "Hello World", "es": "Hola Mundo", "fr": "Bonjour le monde" } }
```

### Rich Text Fields

```json
// Before
{ "richText": { "root": { "children": [...] } } }

// After
{ "richText": { 
  "en": { "root": { "children": [...] } },
  "es": { "root": { "children": [...] } },
  "fr": { "root": { "children": [...] } }
}}
```

### Blocks (layout, hero, etc.)

```json
// Before
{ "layout": [{ "blockType": "content", "columns": [...] }] }

// After  
{ "layout": {
  "en": [{ "blockType": "content", "columns": [...] }],
  "es": [{ "blockType": "content", "columns": [...] }],
  "fr": [{ "blockType": "content", "columns": [...]}]
}}
```

### Relationship Fields

For `relatedPosts`, `categories`, etc.:
- The relationship IDs stay the same
- Each locale can have different relationships
- Migration preserves existing relationships in default locale

## Troubleshooting

### "Field not found" errors
Ensure all fields marked `localized: true` in collection config match the fields being migrated.

### Locale not appearing in admin
- Check `localization.locales` in payload.config.ts
- Restart dev server
- Clear browser cache

### Sitemaps not generating per locale
- Verify sitemap routes are under `[locale]/(sitemaps)/`
- Check that `generateStaticParams` includes locale

### Preview not working
- Ensure `generatePreviewPath` includes locale
- Check preview secret matches

## Rollback Plan

If issues arise:

1. Restore database from backup
2. Revert Payload config localization changes
3. Revert collection field `localized: true` changes
4. Re-run migrations in reverse order

## Performance Notes

- Migration time depends on content volume
- For large datasets, consider batching updates
- Use `dryRun` first to estimate time
- Monitor database connections during migration

## API Usage After Migration

### Fetching localized content

```typescript
// Get page in Spanish
const page = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  locale: 'es',
  fallbackLocale: 'en',
})
```

### Creating localized content

```typescript
// Create post with Spanish content
await payload.create({
  collection: 'posts',
  locale: 'es',
  data: {
    title: { en: 'Title', es: 'Título', fr: 'Titre' },
    content: { es: spanishRichText },
    // ...
  }
})
```

### Updating specific locale

```typescript
// Update only Spanish title
await payload.update({
  collection: 'posts',
  id: '123',
  locale: 'es',
  data: { title: 'Nuevo Título' }
})
```