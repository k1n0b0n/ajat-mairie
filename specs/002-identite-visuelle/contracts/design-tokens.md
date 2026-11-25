# Contrat : jetons de style

Source de vérité : `src/styles/tokens.css`. Toute couleur, taille ou espacement passe par un jeton. Valeurs et ratios : [research.md](../research.md) R1.

## Couleurs (clair / sombre / contraste élevé)

> **Palette remplacée par la spec 003** (`specs/003-personnalite-du-site/contracts/jetons-v3.md`) : le vert chêne et l'ocre cèdent la place à la tuile brune et à l'ardoise, sur des neutres de pierre blonde. Valeurs et rapports : `specs/003-personnalite-du-site/research.md` R3.

| Jeton | Rôle | Couples vérifiés (script) |
|---|---|---|
| `--fond` | fond de page (chaux) | `--texte` ≥ 4,5 ; `--texte-doux` ≥ 4,5 ; `--tuile` ≥ 4,5 |
| `--fond-doux` | blocs, en-tête, pied (pierre blonde) | mêmes couples |
| `--texte` | texte courant | — |
| `--texte-doux` | métadonnées, légendes | — |
| `--tuile` | liens, boutons (fond), signature | `--tuile-texte` sur `--tuile` ≥ 4,5 |
| `--ardoise` | plaque du nom, étiquettes | `--ardoise-texte` sur `--ardoise` ≥ 4,5 |
| `--alerte-fond` / `--alerte-bord` | encadrés d'alerte | `--texte` sur fond ≥ 4,5 ; bord sur `--fond` ≥ 3 |
| `--focus` | contour de focus | ≥ 3 sur `--fond` et `--fond-doux` |
| `--bordure-forte` | contours de composants | ≥ 3 |
| `--separateur` | traits décoratifs | exempté |

Retirés : `--chene`, `--chene-texte`, `--ocre-texte`, `--ocre-deco`.

- **Thème sombre** : redéfinit les mêmes jetons sous `@media (prefers-color-scheme: dark)`.
- **Contraste élevé** (`@media (forced-colors: active)`) : couleurs système, aucun jeton imposé ; bordures de boutons et de tuiles conservées.
- **Règle** : `scripts/check-contrast.mjs` échoue si un couple descend sous son seuil dans l'un des deux thèmes.

## Typographie

| Jeton | Valeur |
|---|---|
| `--police-titre` | `"Fraunces", Georgia, "Times New Roman", serif` (graisse 600) |
| `--police-texte` | `"Atkinson Hyperlegible", system-ui, "Segoe UI", Roboto, sans-serif` (400 et 700) |
| `--taille-base` | 1.0625rem (17 px) sur téléphone ; 1.125rem à partir de 48 rem |
| `--interligne` | 1.6 (texte), 1.2 (titres) |
| Échelle des titres | h1 2rem, h2 1.5rem, h3 1.25rem (téléphone) ; h1 2.5rem à partir de 48 rem |

- Pas d'italique, pas de graisse hors 400, 600 (titres) et 700 (texte), pour limiter le poids.
- Largeur de ligne maximale : 66 caractères (`max-width: 46rem`).

## Espacements, formes

Échelle sur 4 px (spec 003) : `--e1` 0.25rem, `--e2` 0.5rem, `--e3` 0.75rem, `--e4` 1rem, `--e5` 1.5rem, `--e6` 2rem, `--e7` 3rem ; `--espace` = `--e4`, `--espace-s` = `--e2`, `--espace-l` = `--e6` ; `--rayon` 0.5rem. Cibles interactives : hauteur ≥ 2.75rem (44 px).

## Composants à unifier (FR-012)

Boutons (plein tuile, texte crème), liens (tuile, soulignés), tableaux (lignes `--separateur`, en-tête `--fond-doux`), listes de documents, encadré d'alerte (libellé en gras + bord épais, jamais la couleur seule), navigation, pied de page, tuiles d'accès rapide, focus (anneau 3 px `--focus`, décalage 2 px).
