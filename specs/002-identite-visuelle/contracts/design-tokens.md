# Contrat : jetons de style

Source de vérité : `src/styles/tokens.css`. Toute couleur, taille ou espacement passe par un jeton. Valeurs et ratios : [research.md](../research.md) R1.

## Couleurs (clair / sombre / contraste élevé)

| Jeton | Rôle | Couples vérifiés (script) |
|---|---|---|
| `--fond` | fond de page (crème) | `--texte` ≥ 4,5 ; `--texte-doux` ≥ 4,5 ; `--chene` ≥ 4,5 |
| `--fond-doux` | blocs, en-tête, pied (pierre) | mêmes couples |
| `--texte` | texte courant | — |
| `--texte-doux` | métadonnées, légendes | — |
| `--chene` | liens, boutons (fond), accents | texte du bouton `--fond` ≥ 4,5 |
| `--ocre-texte` | accent textuel (étiquettes) | ≥ 4,5 sur `--fond` et `--fond-doux` |
| `--ocre-deco` | filets, aplats sans information | ≥ 3 (décoratif) |
| `--alerte-fond` / `--alerte-bord` | encadrés d'alerte | `--texte` sur fond ≥ 4,5 ; bord sur `--fond` ≥ 3 |
| `--focus` | contour de focus | ≥ 3 sur `--fond` et `--fond-doux` |
| `--bordure-forte` | contours de composants | ≥ 3 |
| `--separateur` | traits décoratifs | exempté |

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

`--espace` 1rem ; `--espace-s` 0.5rem ; `--espace-l` 2rem ; `--rayon` 0.5rem. Cibles interactives : hauteur ≥ 2.75rem (44 px).

## Composants à unifier (FR-012)

Boutons (plein chêne, texte crème), liens (chêne, soulignés), tableaux (lignes `--separateur`, en-tête `--fond-doux`), listes de documents, encadré d'alerte (libellé en gras + bord épais, jamais la couleur seule), navigation, pied de page, tuiles d'accès rapide, focus (anneau 3 px `--focus`, décalage 2 px).
