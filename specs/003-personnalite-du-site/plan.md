# Implementation Plan: Personnalité du site de la mairie d'Ajat

**Branch**: `003-personnalite-du-site` | **Date**: 2026-11-26 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-personnalite-du-site/spec.md`, audit [audit-unslop.md](./audit-unslop.md) et direction [research.md](./research.md) (R1 à R9).

## Summary

Faire de l'accueil, puis des listes et des articles, un site qui ne pourrait être que celui d'Ajat. Après l'audit `unslop` (19 signes relevés, constitution 1.2.0 principe X), la direction est : accueillant, solide, fier ; monde de la pierre blonde, de la tuile brune, de l'ardoise du château et du panneau d'affichage. Mise en œuvre sans dépendance ni JavaScript ajoutés : nouvelle palette de jetons (pierre, tuile, ardoise), chiffres d'affichage en Fraunces (plus de zéro barré), accueil pleine largeur en zones inégales, photo avec une plaque « Ajat » pleine (pas de dégradé), affiche « La mairie » avec les horaires en une phrase, tableau détaillé déplacé sur une page « La mairie », signature : le clocher de Saint-Martin. Les décisions de R2 sont des **valeurs par défaut à confirmer**.

## Technical Context

**Language/Version**: TypeScript strict (Astro 7), CSS natif ; Node LTS du projet.

**Primary Dependencies**: aucune nouvelle ; Fraunces et Atkinson Hyperlegible (déjà installées) restent les seules polices, auto-hébergées.

**Storage**: fichiers dans Git : horaires inchangés dans `mairie.yml` ; nouveau `src/content/donnees/accueil.yml` (texte « Le village ») ; SVG de signature dans `src/assets/`.

**Testing**: Playwright (accueil 360 × 640, liens uniques, tuiles absentes, plaque, chiffres, page « La mairie », phrase d'horaires), `check-identite.mjs` (dégradés, mots interdits), `check-contrast.mjs` (nouveaux jetons), puis les contrôles existants.

**Target Platform**: navigateurs actuels, mobile d'abord ; GitHub Pages.

**Project Type**: site web statique, projet unique.

**Performance Goals**: accueil ≤ 120 Ko sur téléphone (72 Ko aujourd'hui), 10 requêtes au plus, Lighthouse > 90.

**Constraints**: AA partout, aucun dégradé, aucune icône décorative, aucun JavaScript client, aucune nouvelle dépendance, polices auto-hébergées, une occurrence par destination de lien dans le contenu principal.

**Scale/Scope**: l'accueil (refonte complète), une page nouvelle (« La mairie »), les composants partagés de liste, d'article, d'en-tête et de pied de page.

## Constitution Check

*GATE: passe avant la recherche, ré-évalué après conception.*

| Principe | Statut | Comment |
|---|---|---|
| I. Accessibilité | ✅ | Nouvelle palette calculée AA (R3) ; plaque pleine donc contraste indépendant de la photo ; phrase d'horaires lisible par lecteur d'écran ; tests axe existants. |
| II. Mobile first | ✅ | Phrase et téléphone sous la photo à 360 × 640 (test mis à jour). |
| III. Performance | ✅ | Lighthouse bloquant, aucun JavaScript. |
| IV. Aucun traceur | ✅ | Rien de tiers ajouté. |
| V. RGPD | ✅ | Aucune donnée collectée. |
| VI. Statique | ✅ | Aucune dépendance ni serveur. |
| VII. Édition sans compétence technique | ✅ | Horaires inchangés (une saisie) ; texte « Le village » éditable dans Pages CMS. |
| VIII. Contenu ouvert | ✅ | Markdown et YAML dans Git. |
| IX. Sobriété numérique | ✅ | Budgets inchangés ; un SVG de 2 Ko ; le tableau quitte l'accueil. |
| X. Identité propre | ✅ après mise en œuvre | Audit de départ fait ; aucune grille de blocs identiques, aucun lien répété, aucun dégradé, aucune icône de décor, pas de pastiche ; test de substitution renforcé ; audit final obligatoire (T034). Les pages existantes sont mises en conformité par cette spécification (disposition transitoire). |

**Post-conception** : mêmes résultats ; l'audit final devra ne relever aucun signe.

## Project Structure

### Documentation (this feature)

```text
specs/003-personnalite-du-site/
├── plan.md
├── research.md                  # R0 audit, R1 direction, R2 à R9 décisions
├── audit-unslop.md              # audit de départ (constitution) ; audit final ajouté en T034
├── data-model.md
├── quickstart.md
├── substitution.md              # test de substitution consigné (T018)
├── contracts/
│   ├── accueil-composition.md
│   ├── phrase-horaires.md
│   └── jetons-v3.md
├── checklists/requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── styles/
│   ├── tokens.css               # nouvelle palette, plus de vert chêne ni d'ocre
│   └── global.css               # accueil large, plaque, affiche, listes en filets, .chiffres, signature
├── assets/signature-clocher.svg # NOUVEAU : clocher de Saint-Martin
├── content/donnees/accueil.yml  # NOUVEAU : texte « Le village »
├── content.config.ts            # + collection « accueil »
├── lib/horaires-phrase.ts       # NOUVEAU : phrase d'horaires
├── components/
│   ├── Hero.astro               # plaque « Ajat », crédit discret
│   ├── LaMairie.astro           # NOUVEAU : affiche
│   ├── AlaUne.astro             # NOUVEAU : dernière actualité
│   ├── DansLaCommune.astro      # NOUVEAU : phrase de liens, un par destination
│   ├── QuickAccess.astro        # SUPPRIMÉ
│   └── Header.astro, Footer.astro, NewsCard.astro, ContactBlock.astro, Hours.astro  # chiffres, une rangée
├── pages/
│   ├── index.astro              # recomposé
│   └── la-mairie.astro          # NOUVEAU : tableau, fermetures, accès
scripts/check-identite.mjs       # NOUVEAU
scripts/check-contrast.mjs       # couples mis à jour
tests/
├── home-viewport.spec.ts        # mis à jour
├── home-liens.spec.ts           # NOUVEAU
├── identite.spec.ts             # NOUVEAU : plaque, pas de dégradé
├── chiffres.spec.ts             # NOUVEAU
├── la-mairie.spec.ts            # NOUVEAU
└── horaires-phrase.spec.ts      # NOUVEAU : tests unitaires de la phrase
.pages.yml                       # + « Texte de l'accueil »
```

**Structure Decision**: projet unique ; aucune nouvelle dépendance. Les composants de l'accueil sont séparés pour qu'aucun ne soit un gabarit répété.

## Complexity Tracking

Aucun écart à la constitution à justifier. Un risque connu : si les chiffres en Fraunces ne conviennent pas, il faudra héberger une nouvelle police de texte (R6).
