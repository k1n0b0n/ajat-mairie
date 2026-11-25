---

description: "Liste des tâches : identité visuelle du site de la mairie d'Ajat"
---

# Tasks: Identité visuelle du site de la mairie d'Ajat

**Input**: documents de conception dans `/specs/002-identite-visuelle/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: les contrôles (contrastes, poids des images, accueil à 360 × 640 px, menu, thèmes, poids de page) sont des exigences du plan et de la constitution, pas des tests optionnels. Les contrôles de la spec 001 (axe, 320 px, aucun traceur, Lighthouse) restent actifs.

**Organization**: tâches groupées par user story. Les contraintes de champs sont citées par référence à `data-model.md` (`Entité.champ`).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallélisable (fichiers différents, aucune dépendance en cours)
- **[Story]**: US1 à US4, selon `spec.md`
- Les chemins sont relatifs à la racine du dépôt

## Blocages hors code

- **Blason** : confirmation de son statut officiel par la mairie, ou logo fourni (T037).
- **Photo d'accueil** : `Ajat bourg.JPG` retenue ; à remplacer plus tard par une photo de la mairie via Pages CMS (T020).
- **Test de perception** auprès de 5 personnes (T038).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: dépendances et ressources de base

- [ ] T001 Installer en versions exactes `@fontsource/fraunces` et `@fontsource/atkinson-hyperlegible` (5.3.0) dans `package.json` et committer `package-lock.json`
- [ ] T002 [P] Préparer les ressources visuelles depuis Wikimedia Commons, téléchargées dans un dossier temporaire hors du dépôt (fichiers non fiables) : `src/assets/images/accueil-bourg.jpg` (de `Ajat_bourg.JPG`, recadrée et réduite à ≈ 1920 px, source ≤ 600 Ko), `src/assets/images/chateau-ajat.jpg` (de `Château_d'Ajat.jpg`, même traitement) et `src/assets/blason-ajat.svg` (de `Blason_ville_fr_Ajat_(Dordogne).svg`, après vérification : aucun `<script>`, aucun `onload`, aucune référence externe, ≤ 20 Ko) ; sources et licences dans `contracts/assets.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: jetons de style, polices et contrôles automatiques, nécessaires à toutes les stories

**⚠️ CRITICAL**: aucune user story ne commence avant la fin de cette phase

- [ ] T003 Créer `src/styles/tokens.css` : jetons de couleur, typographie et espacements de `contracts/design-tokens.md`, avec les valeurs de `research.md` R1 pour le clair, le sombre (`prefers-color-scheme: dark`) et un bloc `forced-colors`
- [ ] T004 Créer `src/styles/fonts.css` (import de `@fontsource/fraunces/latin-600.css`, `@fontsource/atkinson-hyperlegible/latin-400.css` et `latin-700.css`) et, dans `src/layouts/Base.astro`, importer `tokens.css` et `fonts.css` et précharger Atkinson 400 et Fraunces 600 (`<link rel="preload" as="font" type="font/woff2" crossorigin>` avec l'URL obtenue par `?url`)
- [ ] T005 Refondre `src/styles/global.css` pour qu'il ne contienne plus aucune couleur en dur : tout passe par les jetons ; appliquer `--police-titre` aux titres et `--police-texte` au corps, avec les tailles et interlignes du contrat ; conserver le focus visible et les cibles ≥ 2.75rem
- [ ] T006 [P] Créer `scripts/check-contrast.mjs` : lit `src/styles/tokens.css`, calcule les rapports de contraste des couples de `contracts/design-tokens.md` dans les thèmes clair et sombre (4,5 pour le texte, 3 pour les composants), échoue sous le seuil, et échoue aussi si une couleur hexadécimale apparaît hors de `tokens.css` dans `src/styles/` et `src/components/`
- [ ] T007 [P] Créer `scripts/check-images.mjs` : échoue si une image de `dist/` (AVIF, WebP, JPEG, PNG) dépasse 200 Ko, avertit si une source de `src/assets/images/` dépasse 600 Ko, échoue si `src/assets/blason-ajat.svg` dépasse 20 Ko ou contient un `<script>` ou une référence externe (`contracts/assets.md`)
- [ ] T008 Mettre à jour le script `check` de `package.json` : build, `scripts/check-contrast.mjs`, `scripts/check-images.mjs`, `scripts/check-content.mjs`, puis Playwright

**Checkpoint**: le site garde son contenu, rendu avec la nouvelle palette et les nouvelles polices ; `npm run check` est vert

---

## Phase 3: User Story 1 - Première impression et accès rapides (Priority: P1) 🎯 MVP

**Goal**: accueil avec grand visuel du village, blason, trois accès rapides visibles sans défilement, navigation téléphone repensée (FR-007 à FR-011, FR-018)

**Independent Test**: ouvrir `/` à 360 × 640 px ; visuel, titre et trois tuiles visibles sans défilement, chaque tuile mène à la bonne page, le menu s'ouvre et se ferme (`quickstart.md` §2)

- [ ] T009 [US1] Déclarer la collection `visuels` (loader `file()`) dans `src/content.config.ts` selon `data-model.md` `Visuel.image`, `Visuel.alt`, `Visuel.credit.author`, `Visuel.credit.license`, `Visuel.credit.licenseUrl`, `Visuel.credit.sourceUrl`, `Visuel.credit.modified`, avec la règle : `credit.license` sans `credit.author` ni `credit.licenseUrl` fait échouer le build
- [ ] T010 [US1] Créer `src/content/donnees/visuels.yml` avec l'entrée `accueil` et la valeur initiale de `data-model.md` (`Ajat bourg.JPG`, Père Igor, CC BY-SA 4.0)
- [ ] T011 [P] [US1] Créer `src/components/Hero.astro` : `<Picture>` d'Astro (AVIF puis WebP, largeurs 480, 768, 1200, 1600, `sizes` adapté), `fetchpriority="high"`, `loading="eager"`, dimensions renseignées, résolution de l'image par `src/lib/images.ts`, crédit sous l'image selon `contracts/home-layout.md`, bloc `--fond-doux` si l'image est absente
- [ ] T012 [P] [US1] Créer `src/components/QuickAccess.astro` : `nav` « Accès rapides » avec trois tuiles (Horaires `#horaires`, Actualités `/actualites/`, Salle des fêtes `/salle-des-fetes/` via `src/lib/url.ts`), icône SVG en ligne décorative (`aria-hidden`), libellé texte, hauteur ≥ 2.75rem
- [ ] T013 [P] [US1] Réécrire `src/components/Nav.astro` selon `contracts/navigation-mobile.md` : `<nav id="menu-principal" popover>` listant `src/lib/nav.ts`, `aria-current`, une seule navigation exposée à la fois
- [ ] T014 [P] [US1] Réécrire `src/components/Header.astro` : blason `src/assets/blason-ajat.svg` en `alt=""` à côté du nom de la commune, bouton « Menu » (`popovertarget="menu-principal"`) visible sous 48 rem
- [ ] T015 [US1] Ajouter `id="horaires"` à la section de `src/components/Hours.astro` (cible de la tuile « Horaires »)
- [ ] T016 [US1] Recomposer `src/pages/index.astro` : `Hero`, titre `h1` et phrase d'accroche, `QuickAccess`, puis contact, horaires, infos pratiques et dernières actualités existants
- [ ] T017 [US1] Ajouter à `src/styles/global.css` les styles de l'en-tête, du panneau de menu (2 colonnes, plein largeur), du visuel (ratio 2:1, puis 3:1 dès 48 rem), du crédit et des tuiles, selon `contracts/home-layout.md`
- [ ] T018 [P] [US1] Créer `tests/home-viewport.spec.ts` : à 360 × 640 px, le bas des trois tuiles est dans le viewport, les liens ont les bonnes destinations et le visuel a un `alt` (SC-002, SC-003)
- [ ] T019 [P] [US1] Créer `tests/nav-mobile.spec.ts` : à 360 px, le menu s'ouvre au clavier, contient 8 liens, se ferme avec Échap et le focus revient au bouton ; à 1024 px, la liste est visible sans bouton
- [ ] T020 [US1] Ajouter l'entrée « Visuel d'accueil » à `.pages.yml` (fichier `src/content/donnees/visuels.yml`, image envoyée dans `src/assets/images/`, description, crédit facultatif) et la section « Remplacer la photo d'accueil » (4 gestes) à `docs/aide-redacteur.md`
- [ ] T021 [US1] Ajouter la section « Crédits » à `src/content/pages/mentions-legales.md` : photos (auteur, licence avec lien, fichier source, mention « recadrée et compressée »), blason (Henry Salomé, CC BY-SA 3.0 ou GFDL), polices (Fraunces et Atkinson Hyperlegible, SIL OFL 1.1)
- [ ] T022 [US1] Valider US1 (`quickstart.md` §2) : captures d'écran de l'accueil à 360 × 640, 768 et 1280 px, image bloquée, menu ouvert ; corriger les défauts

**Checkpoint**: US1 est autonome ; l'accueil est déployable comme première version de l'identité

---

## Phase 4: User Story 2 - Un texte confortable à lire par tout le monde (Priority: P1)

**Goal**: lisibilité et accessibilité visuelle partout : contrastes, zoom, focus, thèmes et contraste élevé (FR-003, FR-004, FR-014 à FR-016)

**Independent Test**: parcourir accueil, actualité, horaires et salle des fêtes à 200 % et à 320 px, en thème sombre et en contraste élevé, au clavier (`quickstart.md` §3)

- [ ] T023 [US2] Ajouter à `src/styles/global.css` et `src/styles/tokens.css` le bloc `@media (forced-colors: active)` (bordures de boutons, tuiles et menu conservées, focus visible), le respect de `prefers-reduced-motion` et la vérification du focus sur le bouton Menu, les tuiles et chaque entrée de menu
- [ ] T024 [P] [US2] Créer `tests/themes.spec.ts` : axe sur l'accueil et une page de contenu en `colorScheme: 'dark'` puis en `forcedColors: 'active'`, 0 violation
- [ ] T025 [US2] Valider US2 (`quickstart.md` §3) : relecture au clavier, zoom 200 %, thème sombre et contraste élevé ; vérifier à l'œil le texte et les tuiles sur toutes les pages types et corriger

**Checkpoint**: US1 et US2 fonctionnent séparément

---

## Phase 5: User Story 3 - Une identité cohérente sur tout le site (Priority: P2)

**Goal**: mêmes couleurs, titres, boutons et encadrés sur toutes les pages (FR-012, FR-013, FR-020)

**Independent Test**: comparer côte à côte toutes les pages types (`quickstart.md` §4)

- [ ] T026 [US3] Mettre en forme dans `src/styles/global.css` les composants récurrents selon `contracts/design-tokens.md` : boutons, liens, tableaux d'horaires et de tarifs, listes de documents, cartes d'actualité, encadré d'alerte (libellé « Fermeture exceptionnelle » en gras + bord épais), page 404 et plan du site
- [ ] T027 [US3] Mettre à jour `src/components/Footer.astro` : blason, liens légaux, lien « Crédits » vers la section de `/mentions-legales/`
- [ ] T028 [US3] Ajouter un `cover` facultatif (image, description et crédit) à la collection `pages` de `src/content.config.ts`, l'afficher dans `src/pages/[...slug].astro` avec `<Picture>`, et documenter `Page.cover` dans `specs/002-identite-visuelle/data-model.md`
- [ ] T029 [US3] Ajouter la photo du château (`src/assets/images/chateau-ajat.jpg`, GuillaumeG, CC BY-SA 3.0, recadrée et compressée) comme `cover` de `src/content/pages/decouvrir/patrimoine.md`, et la citer dans la section « Crédits » de `src/content/pages/mentions-legales.md`
- [ ] T030 [US3] Valider US3 (`quickstart.md` §4) : captures de toutes les pages types, comparaison, ajout d'une fermeture exceptionnelle de test (libellé + bord), correction des écarts

**Checkpoint**: US1 à US3 fonctionnent

---

## Phase 6: User Story 4 - Un site qui reste rapide malgré le visuel (Priority: P3)

**Goal**: images ≤ 200 Ko, polices légères, aucun domaine tiers, Lighthouse > 90 (FR-017, FR-019, SC-004 à SC-006, SC-009)

**Independent Test**: Lighthouse mobile et chargement en connexion lente simulée (`quickstart.md` §5)

- [ ] T031 [US4] Régler la qualité et les largeurs des variantes de `src/components/Hero.astro` et de la couverture de `src/pages/[...slug].astro` jusqu'à ce que `scripts/check-images.mjs` soit vert (toute image servie ≤ 200 Ko), en gardant la netteté
- [ ] T032 [P] [US4] Créer `tests/home-weight.spec.ts` : la somme des octets transférés par l'accueil (polices et visuel compris) est inférieure à 1 Mo (SC-005) ; aucune requête hors domaine (SC-006)
- [ ] T033 [US4] Exécuter `npm run lhci` sur toutes les pages types ; corriger jusqu'à > 90 sur les quatre catégories en mobile, LCP < 2,5 s (préchargement, tailles d'image, décalages de mise en page)

**Checkpoint**: toutes les user stories fonctionnent

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: documentation, déploiement et validations humaines

- [ ] T034 [P] Mettre à jour `docs/contenus-a-fournir.md` : confirmer le blason ou fournir un logo, fournir une photo d'accueil de la mairie (remplacement par Pages CMS), vérifier les crédits
- [ ] T035 Exécuter `quickstart.md` en entier (§1 à §6) et cocher chaque critère SC-001 à SC-007 et SC-009
- [ ] T036 Pousser `main` et vérifier le site déployé sur `ajat.kobbo.fr` : accueil, menu téléphone, polices servies par le domaine, aucun domaine tiers, `noindex` toujours présent
- [ ] T037 Faire confirmer par la mairie le statut officiel du blason (ou récupérer son logo) et, selon la réponse, adapter `src/assets/blason-ajat.svg` et la section « Crédits »
- [ ] T038 Réaliser le test de perception de SC-008 auprès de 5 habitants ou élus et noter les résultats

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: aucune dépendance
- **Foundational (Phase 2)**: dépend de Setup ; BLOQUE toutes les user stories
- **User Stories (Phases 3 à 6)**: dépendent de Foundational ; ordre de priorité P1 → P2 → P3
- **Polish (Phase 7)**: dépend des stories voulues ; T036 exige que les workflows de déploiement soient actifs

### User Story Dependencies

- **US1 (P1)**: après Foundational, aucune dépendance
- **US2 (P1)**: après Foundational ; ses validations (T025) s'appliquent mieux après US1
- **US3 (P2)**: après Foundational ; T027 et T029 réutilisent le blason et les crédits de US1 (T002, T021)
- **US4 (P3)**: après US1 (le visuel d'accueil existe) ; T031 et T033 mesurent le résultat final
- Les tâches qui modifient `src/styles/global.css`, `src/content.config.ts` ou `src/content/pages/mentions-legales.md` ne sont jamais parallèles entre elles

### Within Each User Story

- Schéma et données avant composants, composants avant pages
- Styles après les composants qu'ils habillent
- Validation visuelle (captures) en fin de story

### Parallel Opportunities

- Phase 1 : T002 en parallèle de T001
- Phase 2 : T006 et T007 après T003
- US1 : T011 à T014 ensemble ; T018 et T019 ensemble
- US2 : T024 en parallèle de T023 ; US4 : T032 en parallèle de T031
- Polish : T034 en parallèle de T035

---

## Parallel Example: User Story 1

```text
# Après T009 et T010, lancer ensemble :
Task: "Créer src/components/Hero.astro"
Task: "Créer src/components/QuickAccess.astro"
Task: "Réécrire src/components/Nav.astro"
Task: "Réécrire src/components/Header.astro"
```

---

## Implementation Strategy

### MVP First (US1 seule)

1. Phase 1 : Setup (dépendances et ressources)
2. Phase 2 : Foundational (jetons, polices, contrôles)
3. Phase 3 : US1 (accueil, blason, accès rapides, menu)
4. **STOP et VALIDER** : accueil à 360 × 640 px, menu, contrastes, Lighthouse
5. Pousser et regarder sur `ajat.kobbo.fr`

### Incremental Delivery

1. Setup + Foundational : le site change de palette et de polices
2. US1 : accueil et navigation (MVP visuel)
3. US2 : lisibilité sur tous les thèmes
4. US3 : cohérence de tous les composants et photo du patrimoine
5. US4 : réglage du poids et de la performance
6. Polish : documentation, déploiement, validations humaines

---

## Notes

- [P] = fichiers différents, aucune dépendance
- Les photos sont sous CC BY-SA : toujours créditer, mentionner la modification et ne jamais retirer le crédit
- `Le bourg d'Ajat - panoramio.jpg` est écartée (ne montre pas Ajat)
- Les tâches T022, T025, T030, T035, T036, T037 et T038 demandent une observation humaine ou une action extérieure
