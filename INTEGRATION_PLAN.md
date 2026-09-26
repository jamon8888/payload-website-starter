# Integration Plan: SEO/AEO/GEO + RGAA 4.1.2 Spec

This plan maps the [payloadcms-seo-aeo-rgaa-full-spec.md](../Téléchargements/payloadcms-seo-aeo-rgaa-full-spec.md) to the existing Payload CMS website starter.

---

## Current State Analysis

**Already implemented:**
- ✅ Multilingual setup (fr, en, de, es) with localized fields
- ✅ SEO plugin (@payloadcms/plugin-seo) with meta title, description, image
- ✅ Lexical editor with h2-h4 headings (h1 reserved for template)
- ✅ Link field with label required, internal/external, newTab
- ✅ Media collection with alt (localized, but not required)
- ✅ Robots.txt via next-sitemap (basic, disallows /admin)
- ✅ Sitemap generation via next-sitemap
- ✅ Semantic HTML lang per locale in root layout
- ✅ Header/Footer globals with nav links
- ✅ Form builder plugin
- ✅ Search plugin (posts only)

**Gaps to address:**
- ❌ No RGAA-enforced fields (image role, required alt for informative, decorative handling)
- ❌ No iframe embed field with required title
- ❌ No video/audio fields with required captions/transcripts
- ❌ No accessible data table block
- ❌ Link validation rejecting generic labels ("cliquez ici", etc.)
- ❌ No ARIA-compliant interactive components (modal, accordion, tabs)
- ❌ No skip link in layout
- ❌ No heading hierarchy validation in Lexical
- ❌ No form field accessibility pattern (label/aria-describedby/role=alert)
- ❌ No breadcrumb component with aria-current
- ❌ No Accessibility Statement global
- ❌ No llms.txt route
- ❌ No AI crawler governance in robots.txt
- ❌ No answerBlock/passage-level content field
- ❌ No SpeakableSpecification / HowTo schema
- ❌ No CI pipeline with axe-core, pa11y, Lighthouse

---

## Phase 1: RGAA 4.1.2 — Schema-Level Accessibility Fields

### 1.1 Create Accessible Field Primitives (`src/fields/accessible/`)

| File | Purpose | Spec Ref |
|------|---------|----------|
| `accessibleImage.ts` | Group field: asset + role (informative/decorative) + conditional alt | §1 Images |
| `accessibleEmbed.ts` | Group field: src + required title for iframes | §2 Cadres |
| `accessibleVideo.ts` | Group field: asset + required captions.vtt + transcript + optional audioDescription | §4 Multimédia |
| `accessibleDataTable.ts` | Group field: caption (required) + headerRow[] + rows[][] | §5 Tableaux |
| `accessibleLink.ts` | Enhanced link with beforeValidate hook rejecting generic labels | §6 Liens |
| `accessibleFormField.ts` | Group field: label, name, required, helpText, errorMessage | §11 Formulaires |

**Implementation notes:**
- All fields must be `localized: true` where text content exists
- Use Payload `validate` and `hooks.beforeValidate` for fail-closed constraints
- Export typed interfaces matching the field structure for frontend components

### 1.2 Update Existing Fields

| File | Changes |
|------|---------|
| `src/fields/link.ts` | Integrate `accessibleLink` validation; keep backward compatibility |
| `src/collections/Media.ts` | Make `alt` required; add `role` field (informative/decorative) |
| `src/blocks/MediaBlock/config.ts` | Replace simple upload with `accessibleImage` field |
| `src/fields/defaultLexical.ts` | Add heading hierarchy validation hook (reject h2→h4 jumps) |

---

## Phase 2: RGAA 4.1.2 — Frontend Accessible Components

### 2.1 Create Design System Accessible Components (`src/components/a11y/`)

| Component | Spec Ref | Key Requirements |
|-----------|----------|------------------|
| `SkipLink.tsx` | §8 | Visible on focus, links to `#main-content` |
| `AccessibleImage.tsx` | §1 | Renders `alt="" role="presentation"` for decorative |
| `AccessibleEmbed.tsx` | §2 | `<iframe title={...} loading="lazy" />` |
| `AccessibleVideo.tsx` | §4 | `<video>` with `<track kind="captions">`, transcript toggle, fail-closed if no captions |
| `AccessibleDataTable.tsx` | §5 | `<caption>`, `<th scope="col">`, complex table `headers`/`id` |
| `AccessibleLink.tsx` | §6 | `rel="noopener noreferrer"` for newTab, sr-only "(nouvelle fenêtre)" |
| `Modal.tsx` | §7 | Focus trap, Escape close, ARIA dialog/modal |
| `Accordion.tsx` | §7 | ARIA APG pattern (aria-expanded, keyboard) |
| `Tabs.tsx` | §7 | ARIA APG pattern (aria-selected, tablist/tabpanel) |
| `Breadcrumb.tsx` | §12 | `<nav aria-label="Fil d'Ariane">`, `aria-current="page"` |
| `FormField.tsx` | §11 | `<label htmlFor>`, `aria-describedby` for help/error, `role="alert"` on error |

### 2.2 Update Layout & Global Components

| File | Changes |
|------|---------|
| `src/app/[locale]/layout.tsx` | Add `<a href="#main-content" className="skip-link">Aller au contenu principal</a>` before `<Header>`; ensure `<main id="main-content">` wraps `{children}` |
| `src/Header/Component.tsx` | Wrap nav in `<nav aria-label="Navigation principale">` |
| `src/components/Link/index.tsx` | Use `AccessibleLink` component; pass sr-only new window text |

### 2.3 Update Blocks to Use Accessible Components

| Block | Component Changes |
|-------|-------------------|
| `MediaBlock` | Use `AccessibleImage` |
| `Content` | Use `AccessibleLink` for enableLink |
| `FormBlock` | Ensure form fields use `FormField` pattern |
| `Banner` | Check for decorative vs informative images |

---

## Phase 3: RGAA — Accessibility Statement Global (Legal Requirement)

### 3.1 Create Global Config

**File:** `src/globals/AccessibilityStatement/config.ts`

Fields per spec §Partie B:
- `auditDate` (date, required)
- `referentielVersion` (text, default "RGAA 4.1.2", required)
- `globalComplianceRate` (number 0-100, required)
- `nonConformCriteria[]` (array: criterion, thematic, derogation checkbox, justification localized textarea)
- `contactEmail` (email, required)
- `schemaPluriannuelUrl` (text)
- `planActionAnnuelUrl` (text)

### 3.2 Create Frontend Page

**File:** `src/app/[locale]/accessibilite/page.tsx`
- Fetch global, render with JSON-LD `WebPage` + custom `accessibilitySummary`
- Include `datePublished`/`dateModified` from auditDate/updatedAt

### 3.3 Register Global

Add to `payload.config.ts` globals array.

---

## Phase 4: AEO/GEO 2026 — AI-Optimized Content & Crawlers

### 4.1 Add AEO Fields to Collections

**File:** `src/fields/aeo.ts` (new)
- `aeoSummary` (textarea, maxLength: 250, localized, required) — for llms.txt, SpeakableSpecification
- `answerBlocks` (array, localized) — passage-level Q/A per §Partie C.3
  - `question` (text)
  - `answer` (textarea, maxLength: 300)
  - `sourceLink` (text)

**Integrate into:**
- `src/collections/Pages/index.ts` — add to meta tab or new "AEO" tab
- `src/collections/Posts/index.ts` — same

### 4.2 Dynamic llms.txt Route

**File:** `src/app/llms.txt/route.ts`
- GET handler fetching pages/posts with `aeoSummary`
- Group by locale (generate per-locale or combined)
- Cache with `revalidate` tag on page/post change

### 4.3 Robots.txt with AI Crawler Governance

**Option A:** Extend `next-sitemap.config.cjs` robotsTxtOptions.policies
**Option B:** Create `src/app/robots.txt/route.ts` for dynamic generation (preferred for quarterly updates)

Include userAgents per spec:
- Allow: Googlebot, Bingbot, GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended
- Disallow: CCBot, Bytespider (configurable)
- Sitemap reference

### 4.4 Advanced Schema Markup Components

**File:** `src/components/schema/`
- `SpeakableMarkup.tsx` — JSON-LD `SpeakableSpecification` with cssSelector `.aeo-summary`
- `HowToMarkup.tsx` — For procedural content (detect from answerBlocks or richText)
- `FAQMarkup.tsx` — From `answerBlocks` array
- `BreadcrumbMarkup.tsx` — From Breadcrumb component

Integrate into page layout components.

---

## Phase 5: CI/CD Quality Gates Pipeline

### 5.1 GitHub Actions Workflow

**File:** `.github/workflows/quality-gates.yml`

Jobs per spec §Partie D:
1. `accessibility` — axe-core (wcag2a, wcag2aa, wcag22aa) + pa11y multi-locale
2. `lighthouse` — SEO + AEO (agentic-browsing) + a11y categories
3. `schema-validation` — structured-data-testing-tool for Article, FAQPage, BreadcrumbList
4. `llms-txt` — curl reachability check

### 5.2 Local Dev Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "a11y:axe": "axe http://localhost:3000 --tags wcag2a,wcag2aa,wcag22aa",
    "a11y:pa11y": "for locale in fr en de es; do pa11y http://localhost:3000/$locale --standard WCAG2AA; done",
    "lighthouse:ci": "lhci autorun",
    "schema:validate": "structured-data-testing-tool http://localhost:3000/fr --schemas Article,FAQPage,BreadcrumbList",
    "quality:all": "pnpm a11y:axe && pnpm a11y:pa11y && pnpm lighthouse:ci && pnpm schema:validate"
  }
}
```

### 5.3 Lighthouse Config

**File:** `lighthouserc.json` — configure categories: seo, accessibility, performance, agentic-browsing

---

## Phase 6: Design Token Contrast Enforcement (RGAA §3 Couleurs)

### 6.1 Contrast Check Script

**File:** `scripts/contrast-check.ts`
- Parse Tailwind config / CSS variables for color pairs
- Calculate WCAG contrast ratios
- Fail build if any text/background pair < 4.5:1 (3:1 for large text/UI)

### 6.2 Token Documentation

Ensure `tailwind.config.mjs` colors are the ONLY way to set colors (no arbitrary values in editor).

---

## Implementation Priority & Dependencies

```
Phase 1 (Fields) ──────┐
                       ├─→ Phase 2 (Components) ──→ Phase 3 (Global)
Phase 4 (AEO/GEO) ─────┤
                       └─→ Phase 5 (CI) ← Phase 6 (Contrast)
```

**Critical path:** Phase 1 → Phase 2 → Phase 3 (legal requirement) → Phase 5 (enforcement)

**Can parallelize:** Phase 4 (AEO/GEO) independent of RGAA phases; Phase 6 can run anytime.

---

## Estimated Effort

| Phase | Files New | Files Modified | Complexity |
|-------|-----------|----------------|------------|
| 1. RGAA Fields | 6 | 4 | High |
| 2. RGAA Components | 11 | 5 | High |
| 3. Accessibility Statement | 2 | 1 | Medium |
| 4. AEO/GEO | 4 | 3 | Medium |
| 5. CI Pipeline | 2 | 1 | Medium |
| 6. Contrast Check | 1 | 1 | Low |
| **Total** | **~26** | **~15** | — |

---

## Validation Checklist (from Spec Partie E)

| Domain | Element | Implementation |
|--------|---------|----------------|
| RGAA Images | alt conditional required/vide | Phase 1.1 `accessibleImage` + Phase 1.2 Media |
| RGAA Multimédia | sous-titres + transcription required | Phase 1.1 `accessibleVideo` |
| RGAA Tableaux | caption + scope systématiques | Phase 1.1 `accessibleDataTable` + Phase 2.1 `AccessibleDataTable` |
| RGAA Liens | intitulés génériques rejetés | Phase 1.1 `accessibleLink` + Phase 1.2 link.ts |
| RGAA Structuration | hiérarchie h2-h4 sans saut | Phase 1.2 defaultLexical hook |
| RGAA Formulaires | label/aria-describedby/role=alert | Phase 1.1 `accessibleFormField` + Phase 2.1 `FormField` |
| RGAA Obligatoire | lang dynamique, skip-link | Phase 2.2 layout.tsx |
| Légal FR | déclaration accessibilité | Phase 3 |
| AEO | aeoSummary ≤250 car., localisé, requis | Phase 4.1 |
| AEO | JSON-LD inLanguage | Phase 4.4 schema components |
| GEO | llms.txt dynamique | Phase 4.2 |
| GEO | robots.txt agents IA 2026 | Phase 4.3 |
| CI | axe-core + pa11y + Lighthouse + schema | Phase 5 |

---

## Next Steps

1. **Start Phase 1.1** — Create `src/fields/accessible/` with all 6 field primitives
2. **Run `pnpm generate:types`** after field changes
3. **Build frontend components** (Phase 2) in parallel with field integration
4. **Add Accessibility Statement global** (Phase 3) — legal priority
5. **Implement AEO/GEO** (Phase 4) — can be done in parallel
6. **Set up CI** (Phase 5) — once dev server runs with new components
7. **Add contrast check** (Phase 6) — lightweight, can be last