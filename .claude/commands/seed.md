---
description: Rejoue le seed complet (4 langues) puis recrée le contenu de démonstration
---

Rejoue le seed complet du site (destructif) et restaure le contenu de
démonstration. **Demande confirmation à l'utilisateur avant d'effacer.**

1. Vérifie l'environnement :
   `set -a; source .env.local; set +a` puis
   `node --import=tsx/esm scripts/run-seed.ts` (crée le script s'il n'existe pas :
   il doit charger `dotenv` sur `.env.local`, appeler `getPayload` + `createLocalReq`
   avec l'utilisateur `demo-author@example.com`, puis `seed({ payload, req })`).

2. Si le seed échoue sur `delete from "pages"` : c'est un deadlock transitoire
   du `deleteMany` parallèle → relance une fois.

3. Recrée l'article RGAA multilingue (4 locales, slug
   `rgaa-accessible-content`) : titre, hero, contenu richText avec un bloc
   `mediaBlock` au format `image { asset, role, alt }`, un `banner`, un lien
   externe, `aeo.aeoSummary` (≤250 car.) et 2 `answerBlocks` (≤300 car.).

4. Recrée les deux déclarations d'accessibilité (`accessibility-statements`) :
   une pour l'article RGAA (slug `rgaa-accessible-content`, taux 88 %), une
   pour la page Contact (slug `page-contact`, taux 100 %).

5. Reindexe la recherche : `POST /api/search/reindex` avec
   `{"collections":["posts"]}` et un cookie de session.

6. Force la revalidation du cache ISR (les pages 404 en cache après le seed) :
   PATCH chaque post et chaque page dans les 4 locales (le hook
   `revalidatePost`/`revalidatePage` revalide les chemins internes).

7. Vérifie : `/`, `/fr`, `/de`, `/es`, `/posts`, `/fr/posts/<slug>`,
   `/accessibilite` → 200 et du contenu traduit.
