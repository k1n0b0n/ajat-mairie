# Implementation Plan: Site web de la mairie d'Ajat

**Branch**: `001-site-mairie-ajat` | **Date**: 2026-11-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-site-mairie-ajat/spec.md`

## Summary

Site statique généré par Astro à partir de Markdown et de fichiers YAML versionnés dans Git
(content collections), publié sur GitHub Pages par GitHub Actions. L'édition se fait dans
Pages CMS (formulaires sur le dépôt, `.pages.yml`). Pages CMS n'a ni brouillon, ni relecture,
ni prévisualisation natifs (voir [research.md](./research.md) R3) : le plan les construit avec
**un champ `draft` + une branche de rédaction `redaction` + une pull request automatique vers
`main` protégée, approuvée par un relecteur distinct + un aperçu non indexé du brouillon**.
La CI bloque la fusion si l'accessibilité (axe), Lighthouse, les liens, les images sans
description ou les requêtes tierces échouent.

## Technical Context

**Language/Version**: TypeScript strict (Astro), Node.js LTS actuel ; versions épinglées
(`.nvmrc` + lockfile). Astro : dernière majeure stable au démarrage, mise à jour manuelle.

**Primary Dependencies**: `astro` (sortie `static`), `@astrojs/sitemap`. Aucune bibliothèque UI,
aucun framework CSS. Dev seulement : `@lhci/cli`, `@playwright/test`, `@axe-core/playwright`,
`lychee` (liens), script maison de contrôle du contenu.

**Storage**: fichiers dans Git : Markdown (`actualites`, `pages`, `demarches`, `associations`,
`comptes-rendus`) et YAML (`mairie`, `salle-des-fetes`, `liens`) ; PDF et images dans le dépôt.

**Testing**: CI = build, axe (Playwright) sur toutes les pages, Lighthouse CI mobile (seuil 0,9
par catégorie), liens internes, zéro requête tierce et zéro cookie (Playwright), images sans `alt`,
poids des PDF et images, validation des schémas de contenu (Zod d'Astro, au build).

**Target Platform**: navigateurs actuels, mobile d'abord (320 px) ; GitHub Pages, domaine
personnalisé, HTTPS imposé.

**Project Type**: site web statique (un seul projet).

**Performance Goals**: Lighthouse > 90 sur les 4 catégories en mobile ; zéro JS par défaut ;
HTML + CSS critique d'une page courante < 50 Ko transférés hors images.

**Constraints**: pas de serveur, pas d'en-têtes HTTP personnalisables (GitHub Pages) → CSP par
`<meta>` ; pas de redirections serveur → pages de redirection générées par Astro ; dépôt public
→ aucun secret ni donnée personnelle non publiable.

**Scale/Scope**: ~30 pages, ≤ 5 rédacteurs, ≤ 2 relecteurs, quelques publications par mois,
comptes rendus ~12/an.

## Constitution Check

*GATE: passe avant la recherche, ré-évalué après conception.*

| Principe | Statut | Comment |
|---|---|---|
| I. Accessibilité | ✅ | HTML sémantique, axe bloquant en CI, `alt` obligatoire (contrôle CI), déclaration d'accessibilité en page. L'audit manuel RGAA reste à faire avant ouverture. |
| II. Mobile first | ✅ | CSS mobile d'abord, test Playwright à 320 px (pas de défilement horizontal). |
| III. Performance | ✅ | Zéro JS par défaut, polices système, images optimisées au build ; Lighthouse CI bloquant. |
| IV. Aucun traceur | ✅ | Aucun script tiers ; test Playwright : zéro cookie, zéro domaine externe. Cartes, vidéos : liens, pas d'iframes. |
| V. RGPD | ⚠️ justifié | GitHub Pages est un hébergeur hors UE (« UE de préférence », pas obligatoire). Mentionné dans la politique de confidentialité ; aucun formulaire ; aucun cookie. Voir Complexity Tracking. |
| VI. Statique, maintenance nulle | ✅ | Build reproductible, dépendances épinglées, Dependabot en PR groupées mensuelles. |
| VII. Édition sans compétence technique, avec relecture | ✅ sous conditions | Voir R3-R5 : rédacteurs sans compte GitHub (invitation par courriel) ; relecteurs avec compte GitHub. Aperçu et retour arrière détaillés dans [research.md](./research.md). |
| VIII. Contenu ouvert | ✅ | Markdown/YAML dans Git ; Pages CMS est open source, remplaçable ; aucun format propriétaire. |

**Post-conception** : mêmes résultats ; aucun écart nouveau.

## Project Structure

### Documentation (this feature)

```text
specs/001-site-mairie-ajat/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── content-schemas.md   # champs, validations, états des collections
│   ├── pages-cms-config.md  # contrat de l'interface d'édition (.pages.yml)
│   └── ci-gates.md          # contrôles bloquants et workflows
├── checklists/requirements.md
└── tasks.md                 # /speckit-tasks
```

### Source Code (repository root)

```text
.pages.yml                         # config Pages CMS (collections, champs, médias)
.nvmrc
astro.config.mjs                   # output: 'static', site, redirects
package.json / package-lock.json
public/
├── CNAME                          # domaine personnalisé
├── robots.txt
└── documents/comptes-rendus/      # PDF (via Pages CMS)
src/
├── content.config.ts              # collections + schémas Zod
├── content/
│   ├── actualites/*.md
│   ├── comptes-rendus/*.md        # métadonnées + chemin du PDF
│   ├── demarches/*.md
│   ├── associations/*.md
│   ├── pages/*.md                 # découverte, mentions légales, confidentialité, accessibilité
│   └── donnees/
│       ├── mairie.yml             # horaires, fermetures, téléphone, adresse (source unique)
│       ├── salle-des-fetes.yml
│       └── liens.yml
├── assets/images/                 # images optimisées au build
├── components/                    # .astro uniquement
├── layouts/
├── pages/                         # routes, plan du site, 404
└── styles/global.css
scripts/
├── check-content.mjs              # alt, poids, états, dates
└── check-no-third-party.mjs
tests/
├── a11y.spec.ts
├── no-tracking.spec.ts
└── mobile-320.spec.ts
lighthouserc.json
.github/
├── CODEOWNERS
├── dependabot.yml
└── workflows/
    ├── ci.yml                     # build + contrôles sur PR
    ├── deploy.yml                 # main → GitHub Pages (action officielle Astro)
    ├── pr-redaction.yml           # ouvre/maintient la PR redaction → main
    ├── preview.yml                # aperçu des brouillons, non indexé
    └── nightly.yml                # rebuild quotidien (publications programmées) + liens externes
```

**Structure Decision**: projet unique à la racine ; contenu séparé du code (`src/content/`) pour que
les rédacteurs ne touchent qu'à lui via Pages CMS.

## Complexity Tracking

| Écart / complexité | Pourquoi nécessaire | Alternative plus simple rejetée parce que |
|---|---|---|
| Hébergement GitHub Pages (hors UE) | Gratuit, zéro maintenance, HTTPS, déjà décidé | Hébergeur UE : coût et exploitation ; l'écart est documenté dans la politique de confidentialité |
| Branche `redaction` + PR automatique + aperçu | Pages CMS n'a pas de relecture ni d'aperçu ; la constitution (VII) les exige | Brouillon seul (`draft: true` sur `main`) : pas de seconde personne, donc viole VII |
| Aperçu séparé (hôte non indexé) | GitHub Pages n'héberge qu'un site par dépôt | Pas d'aperçu : relecture à l'aveugle, rejeté ; artefact zip : inutilisable par un non-technicien |
| 5 workflows | Chacun a un rôle distinct (déploiement, contrôle, PR, aperçu, programmation) | Fusionner : workflows opaques et droits excessifs |
