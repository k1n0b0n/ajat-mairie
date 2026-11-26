# Contrat : jetons de style, version 3

Remplace les jetons de couleur de [../../002-identite-visuelle/contracts/design-tokens.md](../../002-identite-visuelle/contracts/design-tokens.md) (mis à jour en T002). Valeurs et rapports : [research.md](../research.md) R3.

## Renommages et retraits

| Avant (002) | Après (003) |
|---|---|
| `--chene` | `--tuile` (accent : liens, boutons, signature) |
| `--chene-texte` | `--tuile-texte` |
| `--ocre-texte`, `--ocre-deco` | **supprimés** (le filet ocre est remplacé par la signature) |
| — | `--ardoise`, `--ardoise-texte` (plaque du nom, étiquettes) |
| `--fond`, `--fond-doux`, `--texte`, `--texte-doux`, `--alerte-fond`, `--alerte-bord`, `--focus`, `--bordure-forte`, `--separateur` | conservés, valeurs de R3 |

## Chiffres

`--police-chiffres` : `var(--police-numero)` (police du système ; Fraunces n'est plus utilisée pour les chiffres : `unicode-range` sans U+0030-0039 dans `src/styles/fonts.css`) ; classe `.chiffres` : `font-family: var(--police-chiffres)`, `font-weight: 600`, `font-variant-numeric: lining-nums tabular-nums`.

## Couples vérifiés par `scripts/check-contrast.mjs` (clair et sombre)

Texte/fond et fond doux ≥ 4,5 ; texte doux/fond et fond doux ≥ 4,5 ; `tuile`/fond et fond doux ≥ 4,5 ; `tuile-texte`/`tuile` ≥ 4,5 ; `ardoise-texte`/`ardoise` ≥ 4,5 ; texte/alerte-fond ≥ 4,5 ; alerte-bord/fond ≥ 3 ; focus/fond et fond doux ≥ 3 ; bordure-forte/fond et fond doux ≥ 3.

Aucune couleur en dur hors de `tokens.css` (règle existante).
