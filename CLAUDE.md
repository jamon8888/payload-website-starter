# Payload Website Starter — notes pour Claude Code

Le contexte métier (conventions i18n, SEO/AEO, pipeline qualité, pièges du
projet) est dans [AGENTS.md](./AGENTS.md) — **il fait foi**. Ce fichier ne
contient que ce qui n'est pas déductible du code.

## Machine — à lire avant de lancer quoi que ce soit

- `pnpm` est **cassé sur ce poste** (`ERR_PNPM_PNPM_ENGINE_NO_NATIVE_BINARY`,
  pas de binaire darwin-x64). Utilise `npm` et les binaires locaux :
  - `npm run lint`, `npm run test:int`, `npm run dev`
  - `./node_modules/.bin/tsc --noEmit`
  - `./node_modules/.bin/payload <cmd>`
  - `node --import=tsx/esm scripts/<script>.ts`
- `.env.local` est rempli (pull Vercel) et pointe sur la **base Neon de
  production** : un `seed` ou une migration lancé en local touche la prod.
- Le build Vercel **n'applique pas les migrations** : il faut lancer
  `./node_modules/.bin/payload migrate` à la main.

## Boucle de livraison

```
git add -A && git commit → git push origin main → Vercel déploie (branche main)
```

Après un changement de schéma :
`./node_modules/.bin/payload migrate:create <nom>` puis `payload migrate`
(le `migrate:create` pose une question interactive : Enter = "create column").

## Le customizer (marque, thème, SEO)

Global Payload **`site-settings`** (Admin → Globals → Site settings) :

| Champ | Effet |
|---|---|
| `brandName` (localized) | titres, Open Graph, `og:site_name` |
| `logo` | logo du header (sinon logo Payload) |
| `theme.primaryColor` / `primaryForeground` | `--primary` / `--primary-foreground` (le thème sombre inverse) |
| `theme.radius` | `--radius` (none / sm / md / lg) |
| `theme.fontFamily` | `--font-sans` (geist / system / serif) |
| `theme.defaultTheme` | thème appliqué avant hydratation (light / dark / system) |
| `seo.titleTemplate` | gabarit de titre (`%s` = titre de page, `{site}` = marque) |
| `seo.defaultDescription` (localized) | meta description par défaut |
| `seo.ogImage` | image sociale par défaut |
| `seo.twitterHandle` | carte Twitter/X |

Le thème est injecté en variables CSS dans le layout → **rebrand sans rebuild**,
et la modification invalide tout l'arbre de pages (hook `revalidateSiteSettings`).
Pilotable sans l'admin : `POST /api/globals/site-settings?locale=fr`.
Les couleurs sont assainies avant injection (`sanitizeColor`).

## Le contenu

- Les pages et articles sont seedés en 4 langues. Les traductions vivent dans
  **`src/endpoints/seed/copy.ts`** (dictionnaire EN → FR/DE/ES) et sont
  appliquées par `src/endpoints/seed/translate.ts`.
- Couverture : `node --import=tsx/esm scripts/check-seed-translations.ts`
  (doit rester à 87/87 par langue).
- Le seed est **destructif** : il vide les collections, donc l'article RGAA et
  les déclarations d'accessibilité sont à recréer après.

## Pièges

- Les chemins revalidés sont les chemins **internes** (`/en/posts/...`), pas les
  URLs publiques (`/posts/...`) — cf. `localePath()` dans
  `src/utilities/revalidate.ts`.
- Le cache ISR : une modification de contenu n'apparaît qu'après revalidation
  (ou la fenêtre de 10 min).
- `vercel blob delete-store` est **refusé aux agents** (à faire dans le
  terminal de l'utilisateur).
- Ne jamais éditer `src/payload-types.ts` ni
  `src/app/(payload)/admin/importMap.js` à la main.
