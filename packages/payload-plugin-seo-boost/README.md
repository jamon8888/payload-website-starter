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
pnpm add ./payload-plugin-seo-boost-0.1.0.tgz
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

En production : sauvegarder PostgreSQL, déployer une release vérifiée, appliquer
la migration une seule fois, puis basculer le trafic. Ne pas utiliser de schéma
automatique, de commande de seed ou de migration `down` comme procédure
d'installation.
