# Contrat : images, polices, blason et crédits

## Images

| Règle | Contrôle |
|---|---|
| Toute image **servie** (`dist/`) ≤ 200 Ko | `scripts/check-images.mjs`, échec |
| Formats servis : AVIF et WebP (JPEG en dernier repli) | revue de `<picture>` |
| Source dans le dépôt ≤ 600 Ko | `scripts/check-images.mjs`, avertissement |
| `alt` renseigné (ou décorative avec `alt=""`) | axe + `check-content.mjs` (C3, C4) |
| Largeur et hauteur renseignées | Lighthouse (décalage de mise en page) |
| `loading="lazy"` sauf le visuel d'accueil | revue |

## Photos retenues (Wikimedia Commons)

| Usage | Fichier d'origine | Auteur | Licence |
|---|---|---|---|
| Accueil | `Ajat bourg.JPG` | Père Igor | CC BY-SA 4.0 |
| Patrimoine | `Château d'Ajat.jpg` | GuillaumeG | CC BY-SA 3.0 |

Écartée : `Le bourg d'Ajat - panoramio.jpg` (ne montre pas Ajat).
Chaque photo est **recadrée et compressée** : la mention « modifiée » est obligatoire (CC BY-SA). Les versions adaptées restent sous CC BY-SA.

## Polices

- `@fontsource/fraunces` : `latin-600.css` ; `@fontsource/atkinson-hyperlegible` : `latin-400.css`, `latin-700.css` ; versions épinglées.
- Aucune URL `fonts.googleapis.com`, `fonts.gstatic.com` ni autre domaine : vérifié par `tests/no-tracking.spec.ts` (aucune requête tierce).
- Préchargement (`<link rel="preload" as="font" type="font/woff2" crossorigin>`) de Atkinson 400 et Fraunces 600 uniquement.

## Blason

- `src/assets/blason-ajat.svg`, copié de Wikimedia Commons (14 Ko), vérifié sans `<script>`, sans `onload` ni référence externe.
- Auteur : Henry Salomé ; licence : CC BY-SA 3.0 ou GFDL 1.2+. Affiché en `<img alt="">` à côté du nom de la commune (décoratif).
- ⚠️ Statut officiel à confirmer par la mairie.

## Crédits (page « Mentions légales », section « Crédits »)

Liste : photos (auteur, licence avec lien, fichier source), blason (auteur, licence), polices (Fraunces et Atkinson Hyperlegible, licence SIL OFL 1.1), textes de « Découvrir Ajat » (Wikipédia, CC BY-SA 4.0). Mise à jour à chaque remplacement d'image.
