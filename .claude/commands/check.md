---
description: Vérifie la qualité avant de pousser (types, lint, tests, accessibilité, SEO)
---

Passe les contrôles de qualité du projet avant un push.

1. Types + lint :
   `npm exec tsc -- --noEmit` puis `npm run lint` (0 erreur attendue ; les
   warnings `any` préexistants sont tolérés).

2. Tests d'intégration : `npm run test:int` (la base est la prod Neon, le
   premier boot peut dépasser le timeout de 10 s → `--hookTimeout=120000`).

3. Accessibilité et SEO sur le site en production (ou `npm run dev` en local) :
   - `PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ./node_modules/.bin/pa11y --standard WCAG2AA <url>`
   - le JSON-LD : `node scripts/check-jsonld.mjs` après `npm run schema:validate`
   - Lighthouse : `npm run lighthouse:ci` (a11y ≥ 0.9, SEO ≥ 0.9)

4. Multi-langue : vérifie que `/`, `/fr`, `/de`, `/es` renvoient 200, avec le
   bon `lang` et un contenu traduit (pas de repli sur l'anglais), et que
   `llms.txt` contient une section par locale.

5. Rapporte les résultats, sans pousser si quelque chose casse.
