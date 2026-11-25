---

description: "Liste des tâches : personnalité du site de la mairie d'Ajat"
---

# Tasks: Personnalité du site de la mairie d'Ajat

**Input**: documents de conception dans `/specs/003-personnalite-du-site/`

**Prerequisites**: plan.md, spec.md, research.md (audit R0, direction R1, décisions R2 à R9), audit-unslop.md, data-model.md, contracts/, quickstart.md

**Tests**: les contrôles (liens uniques, plaque, chiffres, page « La mairie », phrase d'horaires, dégradés et mots interdits) sont des exigences de la spec et de la constitution 1.2.0 (principe X) ; ils s'ajoutent à `npm run check`.

**Organization**: tâches groupées par user story ; les décisions de R2 sont des **valeurs par défaut à confirmer** (accent tuile, chiffres en Fraunces, signature clocher de Saint-Martin, test de substitution renforcé).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallélisable (fichiers différents, aucune dépendance en cours)
- **[Story]**: US1 à US5, selon `spec.md`
- Les chemins sont relatifs à la racine du dépôt

## Règles de travail

- Aucune nouvelle dépendance npm, aucun JavaScript client ajouté, polices auto-hébergées (Fraunces et Atkinson déjà présentes).
- `main` est protégée : travailler sur une branche, ouvrir une PR, fusionner après le contrôle (voir `docs/administration.md` §4).
- Constitution X : aucun code visuel avant l'audit de départ (fait : `audit-unslop.md`) ; l'audit final est T034.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: mettre en place les contrôles du principe X avant de changer le rendu

- [X] T001 [P] Créer `scripts/check-identite.mjs` : échoue si `gradient(` apparaît dans `src/styles/`, `src/components/` ou `src/pages/`, ou si « moderne », « épuré » ou « premium » apparaît dans les textes du site (`src/content/`, `src/components/`, `src/pages/`, `src/lib/`) ; l'ajouter au script `check` de `package.json` après `check-contrast.mjs`
- [X] T002 [P] Créer `src/lib/horaires-phrase.ts` : fonction pure `phraseHoraires(hours, closures, note, maintenant)` selon `contracts/phrase-horaires.md` (regroupement par plages identiques, fermetures à venir, remarque, aucun « ouvert maintenant »), en réutilisant `formaterHeure`, `JOURS` et `fermetures` de `src/lib/hours.ts`
- [X] T003 [P] Créer `tests/horaires-phrase.spec.ts` : cas du contrat (mardi, jeudi, vendredi ; deux groupes ; sept jours ; aucun jour ; fermeture à venir ; remarque) en tests unitaires Playwright sans navigateur

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: nouvelle palette et nouveaux jetons, sans changer la composition ; MUST être terminée avant toute user story

**⚠️ CRITICAL**: aucune user story ne commence avant la fin de cette phase

- [X] T004 Mettre à jour `src/styles/tokens.css` selon `contracts/jetons-v3.md` et `research.md` R3 : remplacer `--chene`, `--chene-texte` par `--tuile`, `--tuile-texte`, ajouter `--ardoise`, `--ardoise-texte`, supprimer `--ocre-texte` et `--ocre-deco`, nouvelles valeurs claires et sombres de `--fond`, `--fond-doux`, `--texte`, `--texte-doux`, `--alerte-*`, `--focus`, `--bordure-forte` ; ajouter `--police-chiffres` et la classe `.chiffres` (Fraunces 600, `lining-nums tabular-nums`) et le conteneur large `--largeur-large: 72rem`
- [X] T005 [P] Mettre à jour `specs/002-identite-visuelle/contracts/design-tokens.md` : tableau des couleurs, renommages et retraits de `contracts/jetons-v3.md`, mention « remplacé par la spec 003 » sur les valeurs de la palette chêne et ocre, jeton `--police-chiffres`
- [X] T006 Mettre à jour `scripts/check-contrast.mjs` : couples du contrat `jetons-v3.md` (y compris `ardoise-texte`/`ardoise`) dans les thèmes clair et sombre, sans le couple `ocre`
- [X] T007 Adapter `src/styles/global.css` aux jetons renommés (`--chene` vers `--tuile`, `--chene-texte` vers `--tuile-texte`), supprimer les règles `ocre` et le filet `main h1::after` (remplacé par la signature en T017), sans autre changement de mise en page ; vérifier `npm run check`

**Checkpoint**: le site garde sa composition, avec la palette pierre, tuile et ardoise ; `npm run check` est vert

---

## Phase 3: User Story 1 - Savoir en trois secondes quand la mairie est ouverte et comment la joindre (Priority: P1) 🎯 MVP

**Goal**: sous la photo, l'affiche « La mairie » donne les horaires en une phrase, le téléphone et l'adresse (FR-002 à FR-006)

**Independent Test**: à 360 × 640 px, la phrase d'horaires et le téléphone sont visibles sans défiler ; l'appel est proposé (`quickstart.md` §2)

- [ ] T008 [US1] Créer `src/components/LaMairie.astro` : affiche « La mairie » avec la phrase de `phraseHoraires` (données de `src/lib/mairie.ts`), le téléphone en lien `tel:` (`.chiffres`), l'adresse, et **un seul** lien « Tous les horaires » vers `/la-mairie/`
- [ ] T009 [US1] Ajouter à `src/styles/global.css` les styles de l'affiche (`.affiche` : bordure forte, fond doux, étiquette en `--ardoise`, téléphone et phrase en gros, sans icône ni dégradé) selon `contracts/accueil-composition.md`
- [ ] T010 [US1] Dans `src/pages/index.astro`, placer `LaMairie` juste sous `Hero` et retirer `ContactBlock` et `Hours` de l'accueil ; réduire la photo mobile à environ 200 px de haut dans `src/styles/global.css` pour que l'affiche tienne dans 560 px à 360 × 640
- [ ] T011 [P] [US1] Mettre à jour `tests/home-viewport.spec.ts` : à 360 × 640 px, la phrase d'horaires et le lien `tel:` sont visibles et leur bas est à moins de 560 px ; le lien « Tous les horaires » pointe vers `/la-mairie/`

**Checkpoint**: US1 est autonome ; l'affiche répond à la première question des habitants

---

## Phase 4: User Story 2 - Reconnaître Ajat au premier regard (Priority: P1)

**Goal**: la photo avec la plaque « Ajat », le détail signature, un texte local et un crédit discret (FR-001, FR-007, FR-011, FR-012, FR-014, FR-017)

**Independent Test**: le test de substitution consigné donne au moins trois éléments hors nom et coordonnées ; la plaque reste lisible AA (`quickstart.md` §6)

- [ ] T012 [US2] Dans `src/components/Hero.astro`, poser la plaque pleine « Ajat » (le nom, en `h1`, et « Dordogne ») en bas à gauche de la photo ; fond `--ardoise`, texte `--ardoise-texte`, aucun dégradé ni voile ; styles `.plaque` dans `src/styles/global.css` ; reporter le `h1` de `src/pages/index.astro` dans la plaque
- [ ] T013 [US2] Restyler `.credit-photo` dans `src/styles/global.css` : texte de 12 px en bas à droite de la photo, sans bande de fond, liens conservés (auteur, licence CC BY-SA, mention de modification, source) selon `contracts/accueil-composition.md`
- [ ] T014 [US2] Dessiner `src/assets/signature-clocher.svg` : silhouette plate du clocher-pignon de l'église Saint-Martin (pignon pointu, deux baies), une couleur, ≤ 2 Ko, sans script ; la vérifier sur capture ; l'utiliser en masque d'un bloc `--tuile` sous les titres (`main h1::after` dans `src/styles/global.css`, data URI), une seule fois par page (`research.md` R7)
- [X] T015 [P] [US2] Déclarer la collection `accueil` (loader `file()`) dans `src/content.config.ts` selon `data-model.md` `Texte de l'accueil.village`, créer `src/content/donnees/accueil.yml` (reformulation du texte « Le village d'Ajat », château et église) et ajouter l'entrée « Texte de l'accueil » à `.pages.yml`
- [ ] T016 [P] [US2] Créer `tests/identite.spec.ts` : sur `/`, la plaque contient « Ajat », son fond est opaque, le contraste texte/fond est au moins 4,5, aucun élément de `main` n'a de `background-image` en dégradé, le crédit de la photo est présent (auteur, licence, source)
- [ ] T017 [US2] Rédiger `specs/003-personnalite-du-site/substitution.md` : test de substitution de l'accueil, au moins trois éléments qui ne sont ni le nom ni des coordonnées (photo du bourg, blason, signature clocher, texte local, matières de la palette) et la preuve qu'ils deviennent faux pour un autre village

**Checkpoint**: US1 et US2 fonctionnent séparément ; l'accueil dit Ajat dès la photo

---

## Phase 5: User Story 3 - Un accueil qui respire sur ordinateur et qui ne se répète pas (Priority: P2)

**Goal**: composition en zones inégales sur toute la largeur, liens uniques, plus de tuiles ni d'icônes de décor, listes et articles sans gabarit (FR-008 à FR-010)

**Independent Test**: à 1280 px, plusieurs zones côte à côte ; dans `main`, chaque destination une seule fois (`quickstart.md` §3)

- [ ] T018 [US3] Créer `src/components/AlaUne.astro` : la dernière actualité (titre en lien, date en `.chiffres`, résumé) et **un** lien « Toutes les actualités » ; créer `src/components/DansLaCommune.astro` : une phrase avec les liens démarches, associations, salle des fêtes et comptes rendus, chacun une fois, sans bouton ni icône
- [ ] T019 [US3] Recomposer `src/pages/index.astro` selon `contracts/accueil-composition.md` : conteneur `--largeur-large`, zones `LaMairie` et `AlaUne` côte à côte (≈ 5/12 et 7/12), puis « Le village » (texte de la collection `accueil` et **un** lien vers `/decouvrir/`), puis `DansLaCommune` ; styles de la grille de zones dans `src/styles/global.css`
- [ ] T020 [US3] Supprimer `src/components/QuickAccess.astro`, la section « Infos pratiques » de l'accueil et les règles `.tuiles`, `.acces-rapide` de `src/styles/global.css` ; plus aucune icône décorative hors fonction (le bouton Menu garde la sienne)
- [ ] T021 [P] [US3] Créer `tests/home-liens.spec.ts` : dans `main` de `/`, chaque destination de lien apparaît une seule fois (navigation, en-tête et pied de page exclus), aucune `.tuiles`, aucun `svg[aria-hidden]` ni `table` dans `main`, et à 1280 px `main` occupe plus de 60 % de la largeur
- [ ] T022 [P] [US3] Restyler les listes (`.liste-documents`, `.actualite` dans `src/styles/global.css` et `src/components/NewsCard.astro`) en lignes séparées par des filets, avec la date ou le type en marge sur ordinateur, au lieu de cartes de fond identiques ; une liste se distingue par son contenu
- [ ] T023 [P] [US3] Retoucher l'article (`src/pages/actualites/[...slug].astro` et `src/pages/[...slug].astro`) : date en marge sur ordinateur, mesure de lecture soignée, lien de retour une seule fois, plus de vide sous le texte
- [ ] T024 [P] [US3] Mettre l'en-tête sur une seule rangée sur ordinateur (`src/components/Header.astro`, `src/components/Nav.astro`, `src/styles/global.css`) : marque à gauche, entrées à droite, graisse de navigation allégée, hauteur réduite

**Checkpoint**: US1 à US3 fonctionnent ; l'accueil et les pages de contenu n'ont plus de signe de gabarit

---

## Phase 6: User Story 4 - Des chiffres lisibles sans effet technique (Priority: P2)

**Goal**: les chiffres d'affichage n'ont pas de zéro barré (FR-013)

**Independent Test**: sur captures, aucun zéro barré sur le téléphone, les horaires, les dates et le code postal (`quickstart.md` §4)

- [ ] T025 [US4] Appliquer la classe `.chiffres` (Fraunces) au téléphone, aux heures, aux dates et au code postal dans `src/components/LaMairie.astro`, `ContactBlock.astro`, `Hours.astro`, `NewsCard.astro`, `src/pages/actualites/[...slug].astro` et `src/pages/comptes-rendus/index.astro` ; vérifier que Fraunces n'a pas de zéro barré
- [X] T026 [P] [US4] Créer `tests/chiffres.spec.ts` : les liens `tel:`, les éléments `time` et le code postal de l'accueil et de `/la-mairie/` ont la police calculée Fraunces (classe `.chiffres`)
- [ ] T027 [US4] Capturer le téléphone, les horaires, une date et le code postal en clair et en sombre, vérifier qu'aucun zéro n'est barré (SC-008) ; si la limite de `research.md` R6 gêne (un zéro dans une phrase), la consigner et proposer une police de texte à héberger sans paquet npm

**Checkpoint**: US1 à US4 fonctionnent

---

## Phase 7: User Story 5 - Les horaires complets sur leur page (Priority: P3)

**Goal**: le tableau détaillé vit sur la page « La mairie » (FR-005, FR-006)

**Independent Test**: depuis l'accueil, un lien mène au tableau ; l'accueil n'en contient plus (`quickstart.md` §5)

- [ ] T028 [US5] Créer `src/pages/la-mairie.astro` : titre, coordonnées (`ContactBlock`), tableau jour par jour (`Hours`) avec fermetures exceptionnelles et remarque, adresse et lien vers la carte, à partir de `mairie.yml`
- [ ] T029 [US5] Ajouter « La mairie : horaires et accès » à `liensPied` de `src/lib/nav.ts` et à `src/pages/plan-du-site.astro` ; vérifier que `/la-mairie/` est dans le sitemap
- [ ] T030 [P] [US5] Créer `tests/la-mairie.spec.ts` : `/la-mairie/` contient un tableau de sept jours, les fermetures et l'adresse ; `/` n'a pas de tableau ; la phrase de l'accueil et le tableau reflètent la même saisie (comparer les jours ouverts)

**Checkpoint**: toutes les user stories fonctionnent

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: audit final, validations et mise en ligne

- [ ] T031 [P] Mettre à jour `docs/declaration-ecoconception.md` (mesures après refonte) et `docs/contenus-a-fournir.md` (texte « Le village » à valider par la mairie, signature et palette)
- [ ] T032 Exécuter `npm run check` et `npm run lhci` ; mesurer le poids avec `node scripts/mesure-pages.mjs` : accueil ≤ 120 Ko sur téléphone, 10 requêtes, Lighthouse > 90 (SC-003, SC-011)
- [ ] T033 Prendre des captures de l'accueil, d'une liste et d'un article (360 px et 1280 px, clair et sombre, menu ouvert), les relire et corriger les défauts
- [ ] T034 Refaire l'audit `unslop` (liste de signes de `references/signs.md`) de l'accueil, d'une liste et d'un article et l'ajouter à `specs/003-personnalite-du-site/audit-unslop.md` sous « Audit final » : aucun signe relevé (SC-002, FR-016) ; sinon corriger et refaire
- [ ] T035 Exécuter `quickstart.md` en entier et consigner les résultats dans `specs/003-personnalite-du-site/validation.md` (SC-001 à SC-011)
- [ ] T036 Ouvrir la PR, vérifier le contrôle de la CI, fusionner, puis vérifier le site déployé sur `ajat.kobbo.fr` (accueil, `/la-mairie/`, plaque, phrase, chiffres)
- [ ] T037 Test de perception auprès de 5 personnes : retrouver en moins de 3 secondes quand la mairie est ouverte, le téléphone et l'adresse (SC-004) ; noter les résultats dans `validation.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: aucune dépendance ; T001 à T003 sont indépendantes
- **Foundational (Phase 2)**: aucune dépendance sur Setup, mais BLOQUE toutes les user stories ; T004 avant T005 à T007
- **User Stories (Phases 3 à 7)**: dépendent de Foundational ; US1 utilise T002 de Setup
- **Polish (Phase 8)**: dépend des stories voulues

### User Story Dependencies

- **US1 (P1)**: après Foundational et T002 ; aucune autre dépendance
- **US2 (P1)**: après Foundational ; T012 modifie `Hero.astro` et `index.astro` après US1 (T010)
- **US3 (P2)**: dépend de US1 (T008, T010) et US2 (T012) pour la recomposition de `index.astro`
- **US4 (P2)**: après US1 (la classe `.chiffres` s'applique aux composants créés) ; T025 touche des composants de US3
- **US5 (P3)**: après US1 ; T028 réutilise `ContactBlock` et `Hours`
- Les tâches qui modifient `src/styles/global.css`, `src/pages/index.astro` ou `src/content.config.ts` ne sont jamais parallèles entre elles

### Within Each User Story

- Composants avant pages, styles après les composants qu'ils habillent
- Test de la story après sa mise en œuvre
- Capture de validation en fin de story

### Parallel Opportunities

- Phase 1 : T001, T002, T003 ensemble
- Phase 2 : T005 en parallèle de T006 après T004
- US1 : T011 en parallèle de T009 ; US2 : T015, T016 ensemble
- US3 : T021, T022, T023, T024 ensemble après T019 et T020
- US4 : T026 en parallèle de T025 ; US5 : T030 en parallèle de T029
- Polish : T031 en parallèle de T032

---

## Parallel Example: Phase 1

```text
Task: "Créer scripts/check-identite.mjs"
Task: "Créer src/lib/horaires-phrase.ts"
Task: "Créer tests/horaires-phrase.spec.ts"
```

---

## Implementation Strategy

### MVP First (US1 seule)

1. Phase 1 : Setup (contrôles et phrase d'horaires)
2. Phase 2 : Foundational (palette pierre, tuile, ardoise)
3. Phase 3 : US1 (affiche « La mairie » sous la photo)
4. **STOP et VALIDER** : l'accueil à 360 × 640 px, `npm run check`
5. PR, fusion, vérification en ligne

### Incremental Delivery

1. Setup + Foundational : nouvelle palette, aucun changement de composition
2. US1 : l'information utile en tête
3. US2 : Ajat reconnaissable (plaque, signature, texte local)
4. US3 : accueil large, liens uniques, listes et articles sans gabarit
5. US4 puis US5 : chiffres, page « La mairie »
6. Polish : audit final sans signe, validations, mise en ligne

---

## Notes

- Une PR par phase ou par groupe de phases ; `main` est protégée
- Les décisions de `research.md` R2 sont des valeurs par défaut : les changer avant T004 si besoin
- Les tâches T017, T033, T034, T036 et T037 demandent une observation, un audit ou une action humaine
