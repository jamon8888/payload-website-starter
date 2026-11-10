# payload-plugin-seo-boost

Champs éditoriaux SEO et registres privés d'observations pour Payload CMS 3.
Le paquet ne se connecte jamais à une base, ne crée aucune donnée et n'applique
aucune migration pendant son installation.

## Construire et installer

Depuis ce dépôt :

```bash
pnpm --filter payload-plugin-seo-boost pack
```

Installe ensuite l'archive générée dans le projet Payload hôte :

```bash
pnpm add ./payload-plugin-seo-boost-0.2.0.tgz
```

Ajoute le plugin après les collections concernées et après le plugin SEO officiel :

```ts
import { seoBoostPlugin } from 'payload-plugin-seo-boost'

plugins: [seoBoostPlugin({ collections: ['pages', 'posts'] })]
```

La migration est générée, relue et testée dans le projet hôte :

```bash
pnpm payload generate:types
pnpm payload migrate:create
pnpm payload migrate
```

In the **SEO Boost** tab, “Préremplir depuis la page” proposes Open Graph
values and JSON-LD from title, meta description (or AEO summary), slug/canonical
URL, image, publication date and Q&A blocks already present in the form. It
never invents local-business facts, reviews, ratings or an address; the editor
must explicitly apply and save the recommendation.

## Recommandations NVIDIA NIM

Le plugin crée le Global **SEO Boost settings**. Un utilisateur Payload autorisé y saisit la clé NVIDIA NIM dans un champ masqué, puis choisit le modèle (par défaut `mistralai/mistral-large-4-1t-a52b`). Le bouton **Proposer avec Mistral** demande à l’API serveur les mots-clés, canonical, robots, Open Graph, type de schéma et JSON-LD ; aucune valeur n’est sauvegardée avant application explicite et enregistrement. La clé ne passe jamais au navigateur. `NVIDIA_API_KEY` reste un repli serveur ; ne jamais versionner une clé exposée.

En production : sauvegarder PostgreSQL, déployer une release vérifiée, appliquer
la migration une seule fois, puis basculer le trafic. Ne pas utiliser de schéma
automatique, de commande de seed ou de migration `down` comme procédure
d'installation.
