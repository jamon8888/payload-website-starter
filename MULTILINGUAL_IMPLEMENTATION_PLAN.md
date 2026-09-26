# Multilingual Implementation Plan

**Project**: Payload Website Starter
**Target**: Add multilingual support (i18n + content localization)
**Approach**: Sub-path routing (`/en/...`, `/es/...`, `/fr/...`) with Next.js App Router + Payload CMS localization

---

## 1. Technical Decisions (Confirm Before Starting)

| Decision | Recommendation | Confirmation Needed |
|----------|----------------|---------------------|
| **Locales** | `['en', 'es', 'fr']` (ISO 639-1) | ✅ Add/remove languages |
| **Default locale** | `en` | ✅ |
| **Fallback** | `fallback: true` (show default locale content when translation missing) | ✅ |
| **URL strategy** | Sub-path (`/en/posts/...`) | ✅ |
| **Translation library** | `next-intl` (type-safe, good DX, works with App Router) | ⬜ Confirm or suggest alternative |
| **Status localization** | Enable `experimental.localizeStatus: true` for per-locale publish status | ⬜ Needed? |
| **Admin i18n** | Add `@payloadcms/translations` for admin field labels | ⬜ Optional, separate from frontend |

---

## 2. Implementation Phases

### Phase 1: Payload Configuration & Collections (Foundation)

#### 1.1 Payload Config - `src/payload.config.ts`
- Add `localization` config with locales, defaultLocale, fallback
- Add `experimental.localizeStatus: true` (if per-locale status needed)
- Add `@payloadcms/translations` for admin i18n (optional)

#### 1.2 Regenerate Types
- Run `pnpm generate:types` → updates `src/payload-types.ts`
- Verify `Config['localization']` shows configured locales

#### 1.3 Collection Fields - Mark Fields as Localized

**Pages Collection** (`src/collections/Pages/index.ts`):
- `title` → `localized: true`
- Hero tab: `hero.richText`, `hero.linkGroup`, `hero.media`
- Content tab: `layout` (blocks) → `localized: true` on blocks field
- SEO tab: `meta.title`, `meta.description`, `meta.image` (via SEO plugin fields)

**Posts Collection** (`src/collections/Posts/index.ts`):
- `title` → `localized: true`
- `heroImage` (upload) → consider localized alt/caption
- `content` (richText with blocks) → `localized: true`
- `categories` relationship → `localized: true` (or keep shared)
- SEO tab fields → `localized: true`

**Categories Collection** (`src/collections/Categories.ts`):
- `title` → `localized: true`

**Media Collection** (`src/collections/Media.ts`):
- `alt` → `localized: true`
- `caption` (richText) → `localized: true`

**Globals**:
- Header (`src/Header/config.ts`): `navItems` → `localized: true`
- Footer (`src/Footer/config.ts`): `navItems` → `localized: true`

#### 1.4 Create Migrations
- Run `pnpm payload migrate:create` for schema changes
- Apply migrations: `pnpm payload migrate`

---

### Phase 2: Next.js Routing Restructure

#### 2.1 Create Locale Route Segment
New structure:
```
src/app/
├── [locale]/
│   ├── (frontend)/
│   │   ├── layout.tsx          # Dynamic lang attr, locale-aware metadata
│   │   ├── page.tsx            # Home (redirects to /[locale]/)
│   │   ├── [slug]/page.tsx     # CMS pages
│   │   ├── posts/
│   │   │   ├── page.tsx        # Posts archive
│   │   │   ├── [slug]/page.tsx # Single post
│   │   │   └── page/[pageNumber]/page.tsx
│   │   ├── search/page.tsx
│   │   ├── not-found.tsx       # Translated 404
│   │   └── (sitemaps)/
│   │       ├── pages-sitemap.xml/route.ts
│   │       └── posts-sitemap.xml/route.ts
│   ├── (payload)/              # Admin routes (keep outside locale)
│   └── layout.tsx              # Root layout with locale detection
├── layout.tsx                  # Root: redirect / → /[defaultLocale]/
├── middleware.ts               # NEW: Locale detection + redirect
└── ...
```

#### 2.2 Middleware - `src/middleware.ts` (NEW FILE)
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip admin, api, static files, sitemaps
  if (pathname.startsWith('/admin') || 
      pathname.startsWith('/api') || 
      pathname.startsWith('/_next') ||
      pathname.includes('.') ||
      pathname === '/pages-sitemap.xml' ||
      pathname === '/posts-sitemap.xml') {
    return NextResponse.next()
  }

  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Redirect /something → /en/something
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
}

export const config = {
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
```

#### 2.3 i18n Config - `src/i18n/config.ts` (NEW FILE)
```typescript
export const locales = ['en', 'es', 'fr'] as const
export const defaultLocale = 'en' as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
}
```

#### 2.4 Translation Messages - `src/i18n/messages/` (NEW DIRECTORY)
```
src/i18n/messages/
├── en.json
├── es.json
└── fr.json
```

Content example (`en.json`):
```json
{
  "nav": { "home": "Home", "posts": "Posts", "search": "Search" },
  "posts": { "title": "Posts", "readMore": "Read more" },
  "search": { "title": "Search", "noResults": "No results found.", "placeholder": "Search..." },
  "notFound": { "title": "404", "description": "This page could not be found.", "goHome": "Go home" },
  "pageRange": { "showing": "Showing {{start}} - {{end}} of {{total}} {{type}}", "noResults": "Search produced no results." }
}
```

---

### Phase 3: Content Queries - Thread Locale Through All Fetches

#### 3.1 Utility Functions - Update to Accept Locale

**`src/utilities/getGlobals.ts`**:
```typescript
export const getCachedGlobal = async (slug: string, locale: string, depth = 0) => {
  const payload = await getPayload({ config: configPromise })
  return unstable_cache(
    async () => payload.findGlobal({ slug, locale, fallbackLocale: defaultLocale, depth }),
    [`global_${slug}_${locale}`],
    { tags: [`global_${slug}_${locale}`] }
  )()
}
```

**`src/utilities/getRedirects.ts`**:
```typescript
export const getCachedRedirects = async (locale: string) => {
  const payload = await getPayload({ config: configPromise })
  return unstable_cache(
    async () => payload.find({ collection: 'redirects', locale, fallbackLocale: defaultLocale }),
    [`redirects_${locale}`],
    { tags: [`redirects_${locale}`] }
  )()
}
```

#### 3.2 Page/Post Query Functions - `src/utilities/*.ts`

**`src/utilities/queryPageBySlug.ts`** (and similar):
```typescript
export const queryPageBySlug = async (slug: string, locale: string, draft = false) => {
  const payload = await getPayload({ config: configPromise })
  return payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale,
    fallbackLocale: defaultLocale,
    limit: 1,
    pagination: false,
    draft: draft,
    overrideAccess: draft,
  })
}
```

#### 3.3 Block Components - Pass Locale from Page Props

All block components (`RenderBlocks`, `ArchiveBlock`, `CallToAction`, etc.) need to receive `locale` prop and pass to nested queries.

---

### Phase 4: URL Building Utilities

#### 4.1 Link Component - `src/components/Link/index.tsx`
```typescript
// Update CMSLink to include locale prefix
const href = `/${locale}${relationTo !== 'pages' ? `/${relationTo}` : ''}/${slug}`
```

#### 4.2 Preview Path - `src/utilities/generatePreviewPath.ts`
```typescript
export const generatePreviewPath = (doc: { relationTo: string; slug: string }, locale: string) => {
  const collectionPrefixMap = { posts: '/posts', pages: '' }
  return `/${locale}${collectionPrefixMap[doc.relationTo] || ''}/${doc.slug}`
}
```

#### 4.3 SEO Plugin - `src/plugins/index.ts`
Update `generateURL` and `generateTitle` to accept locale:
```typescript
generateURL: ({ doc, locale }) => `${getServerSideURL()}/${locale}${doc.relationTo === 'posts' ? '/posts' : ''}/${doc.slug}`,
generateTitle: ({ doc, locale }) => `${doc.title} | Payload Website Template (${localeNames[locale]})`,
```

---

### Phase 5: Revalidation - Per-Locale Cache Tags

#### 5.1 Collection Hooks - `src/collections/Pages/hooks/revalidatePage.ts` and `revalidatePost.ts`

```typescript
export const revalidatePage = async ({ doc, req: { payload, locale } }) => {
  if (doc._status === 'published') {
    const path = `/${locale}${doc.slug === 'home' ? '' : `/${doc.slug}`}`
    revalidatePath(path)
    revalidateTag(`pages-sitemap_${locale}`)
    revalidateTag(`global_header_${locale}`)
    revalidateTag(`global_footer_${locale}`)
    revalidateTag(`redirects_${locale}`)
  }
}
```

**Key changes**: 
- Use `locale` from request (available in hooks via `req.locale`)
- Tag cache per locale: `pages-sitemap_en`, `pages-sitemap_es`, etc.
- Revalidate paths with locale prefix

---

### Phase 6: Sitemaps - Per-Locale with hreflang

#### 6.1 Pages Sitemap - `src/app/[locale]/(sitemaps)/pages-sitemap.xml/route.ts`
- Fetch pages with `locale` param
- Generate `<url>` entries with `<xhtml:link rel="alternate" hreflang="..." href="..." />`
- Cache tag: `pages-sitemap_${locale}`

#### 6.2 Posts Sitemap - `src/app/[locale]/(sitemaps)/posts-sitemap.xml/route.ts`
- Same pattern with posts
- Cache tag: `posts-sitemap_${locale}`

#### 6.3 Robots.txt - Update to reference locale-specific sitemaps

---

### Phase 7: Frontend Pages - Adapt to [locale] Segment

#### 7.1 Root Layout - `src/app/[locale]/layout.tsx`
```typescript
import { getDictionary } from '@/i18n/dictionary'
import { Locale } from '@/i18n/config'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const dict = await getDictionary(locale)
  
  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} dict={dict.nav} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict.nav} />
      </body>
    </html>
  )
}
```

#### 7.2 Home Page - `src/app/[locale]/(frontend)/page.tsx`
- Accept `params: { locale }`
- Fetch page with `slug: 'home'` and `locale`
- Pass `locale` to all child components

#### 7.3 CMS Pages - `src/app/[locale]/(frontend)/[slug]/page.tsx`
- `generateStaticParams` fetches all pages for **each locale**
- `page` component receives `params: { locale, slug }`
- Query with locale, render with locale

#### 7.4 Posts Archive - `src/app/[locale]/(frontend)/posts/page.tsx`
- Fetch posts with locale
- Render with translated strings from dictionary

#### 7.5 Single Post - `src/app/[locale]/(frontend)/posts/[slug]/page.tsx`
- `generateStaticParams` per locale
- Query with locale

#### 7.6 Pagination - `src/app/[locale]/(frontend)/posts/page/[pageNumber]/page.tsx`
- Include locale in static params generation

#### 7.7 Search - `src/app/[locale]/(frontend)/search/page.tsx`
- Query search collection with locale
- Use translated strings

#### 7.8 404 - `src/app/[locale]/(frontend)/not-found.tsx`
- Use dictionary for translated strings

---

### Phase 8: Language Switcher Component

#### 8.1 Component - `src/components/LanguageSwitcher/index.tsx` (NEW)
```typescript
'use client'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeNames, defaultLocale } from '@/i18n/config'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = pathname.split('/')[1] // Extract from URL

  const switchLocale = (locale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}/`, `/${locale}/`)
    router.push(newPath)
  }

  return (
    <select value={currentLocale} onChange={(e) => switchLocale(e.target.value as Locale)}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>{localeNames[locale]}</option>
      ))}
    </select>
  )
}
```

#### 8.2 Add to Header - `src/components/Header/index.tsx`
- Import and render `LanguageSwitcher` in nav

---

### Phase 9: Dictionary / Translation System (next-intl)

#### 9.1 Install Dependencies
```bash
pnpm add next-intl
```

#### 9.2 Configuration - `src/i18n/request.ts` (NEW)
```typescript
import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from './config'

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale
  return {
    messages: (await import(`./messages/${validLocale}.json`)).default,
  }
})
```

#### 9.3 Dictionary Hook - `src/i18n/dictionary.ts` (NEW)
```typescript
import { getTranslations } from 'next-intl/server'
import { Locale } from './config'

export async function getDictionary(locale: Locale) {
  const t = await getTranslations({ locale, namespace: '' })
  return {
    nav: { home: t('nav.home'), posts: t('nav.posts'), search: t('nav.search') },
    posts: { title: t('posts.title'), readMore: t('posts.readMore') },
    search: { title: t('search.title'), noResults: t('search.noResults'), placeholder: t('search.placeholder') },
    notFound: { title: t('notFound.title'), description: t('notFound.description'), goHome: t('notFound.goHome') },
    pageRange: { showing: t('pageRange.showing'), noResults: t('pageRange.noResults') },
  }
}
```

#### 9.4 Update Components to Use Dictionary
- Header, Footer, PageRange, Search, not-found, posts archive, etc.
- Replace hardcoded strings with `dict.*` references

---

### Phase 10: Admin Panel i18n (Optional)

#### 10.1 Install Translations Package
```bash
pnpm add @payloadcms/translations
```

#### 10.2 Configure in Payload Config
```typescript
import { en, es, fr } from '@payloadcms/translations/languages'

export default buildConfig({
  i18n: {
    supportedLanguages: { en, es, fr },
    fallbackLanguage: 'en',
  },
  // ... localization config
})
```

#### 10.3 Add Translated Labels to Collections
```typescript
// In Pages collection
labels: {
  singular: { en: 'Page', es: 'Página', fr: 'Page' },
  plural: { en: 'Pages', es: 'Páginas', fr: 'Pages' },
},
admin: {
  group: { en: 'Content', es: 'Contenido', fr: 'Contenu' },
},
fields: [
  {
    name: 'title',
    label: { en: 'Title', es: 'Título', fr: 'Titre' },
    // ...
  }
]
```

---

## 3. File Change Summary

### New Files (~12)
| File | Purpose |
|------|---------|
| `src/middleware.ts` | Locale detection & redirect |
| `src/i18n/config.ts` | Locale constants & types |
| `src/i18n/request.ts` | next-intl server config |
| `src/i18n/dictionary.ts` | Server-side dictionary loader |
| `src/i18n/messages/en.json` | English translations |
| `src/i18n/messages/es.json` | Spanish translations |
| `src/i18n/messages/fr.json` | French translations |
| `src/components/LanguageSwitcher/index.tsx` | Locale selector UI |
| `src/app/[locale]/layout.tsx` | Locale-aware root layout |
| `src/app/[locale]/(frontend)/layout.tsx` | Frontend layout with locale |
| `src/app/[locale]/(frontend)/not-found.tsx` | Translated 404 |
| `src/app/[locale]/(frontend)/page.tsx` | Home page per locale |

### Modified Files (~25)
| File | Changes |
|------|---------|
| `src/payload.config.ts` | Add localization + experimental.localizeStatus |
| `src/collections/Pages/index.ts` | localized: true on fields |
| `src/collections/Posts/index.ts` | localized: true on fields |
| `src/collections/Categories.ts` | localized: true on title |
| `src/collections/Media.ts` | localized: true on alt, caption |
| `src/Header/config.ts` | localized: true on navItems |
| `src/Footer/config.ts` | localized: true on navItems |
| `src/utilities/getGlobals.ts` | Accept locale param, per-locale cache tags |
| `src/utilities/getRedirects.ts` | Accept locale param, per-locale cache tags |
| `src/utilities/queryPageBySlug.ts` | Accept locale, fallbackLocale |
| `src/utilities/queryPostBySlug.ts` | Accept locale, fallbackLocale |
| `src/utilities/queryPosts.ts` | Accept locale |
| `src/utilities/generatePreviewPath.ts` | Include locale in URL |
| `src/components/Link/index.tsx` | Include locale in CMSLink href |
| `src/plugins/index.ts` | Locale-aware generateURL, generateTitle |
| `src/collections/Pages/hooks/revalidatePage.ts` | Per-locale revalidatePath/tags |
| `src/collections/Posts/hooks/revalidatePost.ts` | Per-locale revalidatePath/tags |
| `src/components/Header/index.tsx` | Add LanguageSwitcher, accept locale/dict |
| `src/components/Footer/index.tsx` | Accept locale/dict for translated nav |
| `src/components/PageRange/index.tsx` | Use dictionary for strings |
| `src/blocks/*/Component.tsx` | Accept & pass locale prop |
| `src/app/(frontend)/layout.tsx` → move to `[locale]/` | Restructure |
| All `(frontend)` route pages → move to `[locale]/(frontend)/` | Restructure + accept locale params |
| Sitemap routes → move to `[locale]/(sitemaps)/` | Per-locale sitemaps with hreflang |
| `src/app/layout.tsx` (root) | Minimal: redirect only |

### Deleted/Moved Files
- `src/app/(frontend)/layout.tsx` → moved to `src/app/[locale]/(frontend)/layout.tsx`
- All `(frontend)` route files moved under `[locale]/`

---

## 4. Verification Checklist

After each phase, run:
```bash
# Lint
pnpm lint

# Typecheck
pnpm exec tsc --noEmit

# Integration tests
pnpm test:int

# E2E tests (requires running dev server)
pnpm test:e2e
```

### Manual Verification
- [ ] Visit `/` → redirects to `/en/`
- [ ] Visit `/es/` → Spanish homepage loads
- [ ] Visit `/fr/posts` → French posts archive
- [ ] Language switcher changes URL and content
- [ ] Admin panel shows locale selector for localized fields
- [ ] Create page in English, add Spanish translation, verify both render
- [ ] Sitemaps at `/en/pages-sitemap.xml`, `/es/pages-sitemap.xml` include hreflang
- [ ] Revalidation works per locale (publish Spanish page → only Spanish routes revalidated)
- [ ] Preview mode works with locale parameter

---

## 5. Estimated Effort

| Phase | Complexity | Est. Files | Risk |
|-------|------------|------------|------|
| 1: Payload Config | Low | 6 | Low - well documented |
| 2: Routing Restructure | Medium | 15 | Medium - many file moves |
| 3: Content Queries | Medium | 8 | Medium - threading locale |
| 4: URL Utilities | Low | 3 | Low |
| 5: Revalidation | Medium | 2 | Medium - cache tag strategy |
| 6: Sitemaps | Medium | 2 | Medium - hreflang XML |
| 7: Frontend Pages | High | 12 | High - all pages touch |
| 8: Language Switcher | Low | 2 | Low |
| 9: Translation System | Medium | 5 | Medium - next-intl setup |
| 10: Admin i18n | Low | 3 | Low - optional |

**Total**: ~60 file touches, 3-5 days for full implementation

---

## 6. Rollout Strategy

1. **Feature branch**: `feature/multilingual`
2. **Phase 1-2**: Payload + routing (can test admin immediately)
3. **Phase 3-6**: Data layer + revalidation + sitemaps
4. **Phase 7-9**: Frontend rendering + translations
5. **Phase 10**: Admin polish (optional)
6. **Test thoroughly** on staging with real content
7. **Deploy** with migration script for existing content

---

## 7. Open Questions for You

1. **Which locales exactly?** (e.g., `en`, `es`, `fr`, `de`, `ja`...)
2. **Translation library preference?** `next-intl` recommended, but `paraglide-next`, `next-i18next`, or `lingui` also work
3. **Per-locale publish status needed?** (experimental flag)
4. **Admin panel translations?** (adds `@payloadcms/translations`, translates field labels)
5. **Existing content migration strategy?** (seed data, manual translation, or leave untranslated with fallback)
6. **SEO requirements?** (hreflang, canonical URLs, locale-specific metadata)

---

## 8. Next Steps

Once you confirm the decisions above, I can:
1. Start with **Phase 1** (Payload config + collection fields) - creates immediate visible change in admin
2. Or create a **minimal prototype** with just one extra locale (`es`) and one collection (`Pages`) to validate the approach

Which would you prefer?