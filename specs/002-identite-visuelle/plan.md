# Implementation Plan: Identité visuelle du site de la mairie d'Ajat

**Branch**: `002-identite-visuelle` | **Date**: 2026-11-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-identite-visuelle/spec.md`, complétée par la demande : photos du village trouvées sur Internet (remplaçables plus tard), blason trouvé sur Internet, navigation téléphone repensée.

## Summary

Habiller le site existant (Astro statique, CSS simple) d'une identité « pierre et chaux du Périgord » : palette crème, pierre, vert chêne et ocre à contrastes AA vérifiés par script ; titres en **Fraunces**, texte en **Atkinson Hyperlegible**, auto-hébergés via les paquets npm Fontsource (≈ 53 Ko au total) ; un **visuel d'accueil** (photo du bourg, licence CC BY-SA, crédit affiché) sans texte posé dessus pour garantir le contraste ; **trois accès rapides** (horaires, actualités, salle des fêtes) visibles sans défilement à 360 × 640 px ; le **blason** d'Ajat dans l'en-tête ; une **navigation téléphone sans JavaScript** fondée sur l'attribut HTML `popover`, qui se déplie en liste sur écran large. Le visuel d'accueil et son crédit sont modifiables dans Pages CMS, pour remplacer la photo plus tard sans toucher au code. La **sobriété numérique** (RGESN, [research.md](./research.md) R11) est intégrée : budgets de poids et de requêtes testés, visuel d'accueil recadré sur grand écran, déclaration d'écoconception, reconstruction nocturne conditionnelle.

## Technical Context

**Language/Version**: TypeScript strict (Astro 7), CSS natif (variables CSS, aucune bibliothèque) ; Node LTS du projet.

**Primary Dependencies**: ajout de `@fontsource/fraunces` et `@fontsource/atkinson-hyperlegible` (licence OFL-1.1, embarquées au build, aucun CDN). Rien d'autre : `sharp` est déjà fourni par Astro (images).

**Storage**: fichiers dans Git : images sources dans `src/assets/images/`, blason SVG dans `src/assets/`, données du visuel d'accueil et de ses crédits dans `src/content/donnees/visuels.yml`.

**Testing**: tests Playwright (accueil à 360 × 640 px, navigation popover au clavier, aucun domaine tiers, axe), script de contrôle des contrastes des jetons de couleur, script de poids des images servies (≤ 200 Ko), Lighthouse CI mobile (> 90).

**Target Platform**: navigateurs actuels (Popover API dans tous les navigateurs courants) ; dégradation propre sans elle : le menu reste simplement affiché.

**Project Type**: site web statique, projet unique (inchangé).

**Performance Goals**: accueil ≤ 120 Ko et page de texte ≤ 100 Ko sur téléphone, 10 requêtes au plus (SC-010, SC-011) ; polices ≈ 52 Ko ; accueil sur ordinateur ≤ 150 Ko ; LCP porté par le visuel d'accueil ; Lighthouse > 90 sur les 4 catégories ; note EcoIndex A ou B (SC-012).

**Constraints**: aucun texte sur la photo ; aucun JavaScript client ; aucune requête hors domaine, polices comprises ; CSP existante conservée (`font-src 'self'`, `img-src 'self' data:`) ; chaque image servie ≤ 200 Ko.

**Scale/Scope**: toutes les pages existantes (22), refonte de la feuille de style et de 6 composants (en-tête, navigation, pied, accueil, accès rapides, visuel) ; 1 photo d'accueil, 2 à 3 photos de patrimoine, 1 blason.

## Constitution Check

*GATE: passe avant la recherche, ré-évalué après conception.*

| Principe | Statut | Comment |
|---|---|---|
| I. Accessibilité | ✅ | Tous les couples de couleurs calculés à AA (R1) ; pas de texte sur image ; focus visible ; `forced-colors` ; zoom 200 %. |
| II. Mobile first | ✅ | Accueil et accès rapides visibles à 360 × 640 px (test Playwright) ; menu téléphone repensé ; cibles ≥ 44 px. |
| III. Performance | ✅ | Budgets de poids et de requêtes testés en CI (R11), polices ≈ 52 Ko, images ≤ 200 Ko, Lighthouse bloquant. Principe de sobriété numérique non inscrit à la constitution : amendement proposé (research.md, décisions ouvertes). |
| IV. Aucun traceur | ✅ | Polices embarquées au build ; images et blason locaux ; aucune requête tierce (test existant). |
| V. RGPD | ✅ | Aucune donnée collectée. Les crédits cités sont des mentions de licence publiques. |
| VI. Statique | ✅ | Aucun serveur, aucun JavaScript client ; deux dépendances de build épinglées. |
| VII. Édition sans compétence technique | ✅ | Photo d'accueil et crédit remplaçables dans Pages CMS (R10). |
| VIII. Contenu ouvert | ✅ | Polices OFL, images CC BY-SA, formats ouverts (AVIF, WebP, SVG). |

**Points de vigilance (hors principes) :** le statut officiel du blason n'est pas établi ; la licence CC BY-SA des photos impose le crédit et la même licence pour les versions adaptées (R3, R4). **Post-conception** : mêmes résultats.

## Project Structure

### Documentation (this feature)

```text
specs/002-identite-visuelle/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── ecoconception.md      # budgets et critères RGESN
│   ├── design-tokens.md      # palette, typographie, espacements, contrastes calculés
│   ├── home-layout.md        # structure et comportements de l'accueil par largeur d'écran
│   ├── navigation-mobile.md  # menu popover, accessibilité, repli
│   └── assets.md             # images, polices, blason, crédits, limites de poids
├── checklists/requirements.md
└── tasks.md                  # /speckit-tasks
```

### Source Code (repository root)

```text
package.json                              # + @fontsource/fraunces, @fontsource/atkinson-hyperlegible
src/
├── styles/
│   ├── tokens.css                        # NOUVEAU : palette clair/sombre/contraste élevé, typo, espacements
│   ├── fonts.css                         # NOUVEAU : import des polices latin (400, 700, 600)
│   └── global.css                        # refonte : composants (boutons, liens, tableaux, encadrés…)
├── assets/
│   ├── blason-ajat.svg                   # NOUVEAU (Wikimedia Commons)
│   └── images/
│       ├── accueil-bourg.jpg             # NOUVEAU : visuel d'accueil (source recadrée)
│       └── chateau-ajat.jpg              # NOUVEAU : page patrimoine
├── content/donnees/visuels.yml           # NOUVEAU : image d'accueil + alt + crédit
├── content.config.ts                     # + collection « visuels »
├── components/
│   ├── Header.astro                      # blason + nom + bouton Menu
│   ├── Nav.astro                         # popover
│   ├── Hero.astro                        # NOUVEAU : visuel + crédit
│   ├── QuickAccess.astro                 # NOUVEAU : 3 accès rapides + icônes SVG décoratives
│   └── Footer.astro                      # blason, liens légaux
├── layouts/Base.astro                    # préchargement des 2 polices critiques
└── pages/index.astro                     # nouvelle composition de l'accueil
scripts/
├── check-contrast.mjs                    # NOUVEAU : contrastes des jetons
├── check-images.mjs                      # NOUVEAU : poids des images servies (dist/)
├── mesure-pages.mjs                      # NOUVEAU : poids et requêtes par page (RGESN)
└── changement-du-jour.mjs                # NOUVEAU : y a-t-il un changement de statut à publier ce soir ?
tests/
├── home-viewport.spec.ts                 # NOUVEAU : accès rapides visibles à 360 × 640
├── nav-mobile.spec.ts                    # NOUVEAU : menu au clavier et au toucher
└── page-budget.spec.ts                   # NOUVEAU : budgets de poids, requêtes et polices
.pages.yml                                # + entrée « Visuel d'accueil »
docs/aide-redacteur.md                    # + « Remplacer la photo d'accueil »
docs/declaration-ecoconception.md         # NOUVEAU : déclaration RGESN et mesures de référence
```

**Structure Decision**: projet unique ; l'identité vit dans trois feuilles de style (jetons, polices, composants) et six composants. Les données du visuel sont éditables via Pages CMS, comme les autres données uniques.

## Complexity Tracking

| Écart / complexité | Pourquoi nécessaire | Alternative plus simple rejetée parce que |
|---|---|---|
| 2 dépendances npm (polices) | Polices à caractère, auto-hébergées et mises à jour sans manipulation de fichiers | Copier les `.woff2` à la main : pas de suivi de version ni de licence |
| Deux navigations dans le HTML (popover + liste) | Aucune n'est affichée à la fois (`display` géré en CSS) ; zéro JavaScript | Un seul menu : trop haut sur téléphone (4 lignes de liens) |
| Script de contrastes | Garantit AA à chaque changement de jeton, sans mesure manuelle | Mesure manuelle : régression silencieuse possible |
