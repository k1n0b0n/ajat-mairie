# Contrat : schémas de contenu

Source de vérité = `src/content.config.ts` (Zod), décrite par [data-model.md](../data-model.md).
Ce contrat fixe ce que le build **doit refuser**.

| # | Condition | Résultat |
|---|---|---|
| C1 | Champ obligatoire absent ou hors limites | build en échec, message nommant le fichier et le champ |
| C2 | `officialUrl`, `liens[].url` non `https://` | échec |
| C3 | `cover.image` sans `cover.alt` | échec |
| C4 | Image Markdown sans description | échec (`check-content.mjs`) |
| C5 | Compte rendu sans PDF existant, ou fichier non `.pdf` | échec |
| C6 | PDF > 10 Mo | échec ; > 3 Mo : avertissement dans la PR |
| C7 | Page `legal` ou `accessibilite` avec `draft: true` | échec |
| C8 | Association sans contact ou sans `consent: true` | échec |
| C9 | `hours` : `close` ≤ `open`, plages qui se chevauchent | échec |
| C10 | Deux contenus avec le même `slug` | échec |

Règles d'affichage (production) :

- `draft: true` ou `publishDate` > date du build ⇒ absent du site, du sitemap et des flux.
- Liste vide ⇒ message explicite (« Aucune actualité pour le moment »), jamais une page vide.
- Les horaires sont lus uniquement depuis `mairie.yml`, jamais recopiés dans du Markdown.
