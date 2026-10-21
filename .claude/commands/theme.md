---
description: Change le thème ou la marque du site via l'API (customizer)
---

Applique un changement de thème / marque sur le site en production, via
l'API du global `site-settings` (pas de redéploiement nécessaire).

1. Récupère un cookie de session :
   `POST https://payload-website-starter-snowy-gamma.vercel.app/api/users/login`
   avec `{ "email": "demo-author@example.com", "password": "password" }`.

2. Lis l'état courant :
   `GET /api/globals/site-settings?locale=fr&depth=1`.

3. Applique la modification (ne change que les champs demandés, le reste est
   conservé) :
   `POST /api/globals/site-settings?locale=<locale>&draft=false` avec le corps
   `{ "theme": { "primaryColor": "...", "primaryForeground": "...", "radius":
   "md", "fontFamily": "geist", "defaultTheme": "system" } }`
   ou `{ "brandName": "..." }`, `{ "seo": { "titleTemplate": "%s | {site}" } }`.

4. Vérifie : le HTML doit contenir `<style id="site-theme">` avec les nouvelles
   variables, et le `<title>` doit refléter la marque.

Contraintes :
- les couleurs acceptées sont limited à `[a-zA-Z0-9#%.,()\-_\s]` (assainissement
  automatique) ;
- le thème sombre inverse la couleur primaire ;
- chaque changement invalide tout le cache des pages (le hook
  `revalidateSiteSettings` fait `revalidatePath('/', 'layout')`).
