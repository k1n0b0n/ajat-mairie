---

description: "Liste des tâches : site web de la mairie d'Ajat"
---

# Tasks: Site web de la mairie d'Ajat

**Input**: documents de conception dans `/specs/001-site-mairie-ajat/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: les contrôles de CI (axe, mobile 320 px, aucun traceur, Lighthouse, contenu) sont des exigences du plan et de la constitution, pas des tests optionnels : ils sont créés en Phase 2 et s'appliquent à toutes les pages.

**Organization**: tâches groupées par user story. Les contraintes de champs sont citées par référence à `data-model.md` (`Entité.champ`), jamais recopiées.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallélisable (fichiers différents, aucune dépendance en cours)
- **[Story]**: US1 à US6, selon `spec.md`
- Les chemins sont relatifs à la racine du dépôt

## Blocages hors code (à lever par la mairie)

- **Nom de domaine** et propriétaire du compte GitHub / de l'organisation (T067-T069).
- **Relecteurs** : au moins 2 personnes avec un compte GitHub (T018, T037).
- **Contenu initial** fourni par la mairie : horaires, contacts, PDF, tarifs, associations (T019, T044, T053, T058).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: initialisation du projet et de la chaîne d'outils

- [X] T001 Initialiser le projet Astro en `output: 'static'` à la racine : `package.json`, `astro.config.mjs` (avec `@astrojs/sitemap`), `tsconfig.json` en mode strict, `.nvmrc` (Node LTS) ; épingler les versions et committer `package-lock.json`
- [X] T002 [P] Créer `.gitignore` (`node_modules`, `dist`, `.astro`, `.lighthouseci`, `test-results`) et `public/robots.txt` (autoriser tout, référencer `sitemap-index.xml`)
- [X] T003 [P] Créer `.github/dependabot.yml` : npm et GitHub Actions, mensuel, mises à jour groupées
- [X] T004 Installer en dépendances de développement `@playwright/test`, `@axe-core/playwright`, `@lhci/cli` et définir les scripts `build`, `preview`, `check`, `lhci` dans `package.json` (voir `quickstart.md` §1)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: socle commun (mise en page, accessibilité de base, contrôles de CI, déploiement) qui MUST être terminé avant toute user story

**⚠️ CRITICAL**: aucune user story ne commence avant la fin de cette phase

- [X] T005 Créer `src/content.config.ts` avec le schéma commun cité par `data-model.md` `Champs communs.title`, `Champs communs.draft`, `Champs communs.publishDate`, `Champs communs.updatedDate`, et `src/lib/published.ts` qui exclut `draft: true` et les `publishDate` futures, sauf si la variable `PREVIEW=1` est définie (aperçu) ; voir R2 dans `research.md`
- [X] T006 [P] Créer `src/styles/global.css` : mobile first, polices système, jetons de couleurs à contraste AA, focus visible, cibles tactiles ≥ 44 px, `prefers-reduced-motion`, zoom à 200 % sans perte
- [X] T007 [P] Créer `src/layouts/Base.astro` : `lang="fr"`, viewport, CSP par `<meta http-equiv>` (aucune source tierce), lien d'évitement, repères `header`/`nav`/`main`/`footer`, et en mode `PREVIEW=1` un bandeau « APERÇU » + `noindex`
- [X] T008 [P] Créer `src/components/Header.astro`, `src/components/Nav.astro` (deux niveaux au plus, sans JavaScript, utilisable au clavier et au toucher) et `src/components/Footer.astro` (liens vers mentions légales, confidentialité, accessibilité, plan du site)
- [X] T009 [P] Créer `src/pages/404.astro` en français avec liens vers l'accueil et le plan du site
- [X] T010 Créer `playwright.config.ts` (build puis `astro preview`) et `tests/helpers/urls.ts` qui lit toutes les URLs du sitemap
- [X] T011 [P] Créer `tests/a11y.spec.ts` : axe sur chaque URL du sitemap, 0 violation (SC-005)
- [X] T012 [P] Créer `tests/no-tracking.spec.ts` : échoue sur tout cookie ou toute requête vers un autre domaine, sur chaque URL (SC-007, FR-019)
- [X] T013 [P] Créer `tests/mobile-320.spec.ts` : aucun défilement horizontal à 320 px (constitution II)
- [X] T014 [P] Créer `lighthouserc.json` : profil mobile, assertions ≥ 0,9 sur performance, accessibilité, bonnes pratiques et SEO (SC-006)
- [X] T015 [P] Créer `scripts/check-content.mjs` appliquant `contracts/content-schemas.md` C4 (image Markdown sans description), C5 (PDF existant et en `.pdf`), C6 (PDF > 3 Mo : avertissement, > 10 Mo : échec), C7 (pages légales non brouillon), C10 (slugs uniques) ; doit passer quand les dossiers de contenu sont vides
- [X] T016 Créer `.github/workflows/ci.yml` : sur PR vers `main`, build, `scripts/check-content.mjs`, tests Playwright, Lighthouse CI, `lychee` hors ligne sur les liens internes (voir `contracts/ci-gates.md`)
- [X] T017 [P] Créer `.github/workflows/deploy.yml` : sur push `main`, action officielle Astro (`withastro/action`) puis `actions/deploy-pages`, avec les droits `pages: write` et `id-token: write`
- [X] T018 [P] Créer `.github/CODEOWNERS` : `src/content/**` et `public/documents/**` appartiennent aux relecteurs (comptes à fournir par la mairie)

**Checkpoint**: le socle compile, déploie une page vide et la CI est verte

---

## Phase 3: User Story 1 - Joindre la mairie (Priority: P1) 🎯 MVP

**Goal**: horaires, téléphone et adresse visibles dès l'accueil sur téléphone (FR-001 à FR-003, FR-017)

**Independent Test**: ouvrir l'accueil à 360 px ; horaires, téléphone et adresse visibles sans clic, numéro appelable, fermeture exceptionnelle signalée (`quickstart.md` §2)

- [X] T019 [P] [US1] Créer `src/content/donnees/mairie.yml` avec les valeurs fournies par la mairie, conformes à `data-model.md` `Mairie.name`, `Mairie.address`, `Mairie.phone`, `Mairie.email`, `Mairie.hours`, `Mairie.closures`, `Mairie.hoursNote`
- [X] T020 [US1] Déclarer la collection `mairie` (loader `file()`) dans `src/content.config.ts` selon `data-model.md` `Mairie.hours` (rejette `close` ≤ `open` et les plages qui se chevauchent, C9) et `Mairie.closures`
- [X] T021 [P] [US1] Créer `src/lib/hours.ts` : mise en forme des horaires, indication ouvert/fermé du jour, fermetures en cours ou à venir (dates passées ignorées), sans JavaScript côté client
- [X] T022 [P] [US1] Créer `src/components/ContactBlock.astro` : téléphone en lien `tel:`, adresse avec lien vers un service de cartographie (aucune iframe), courriel
- [X] T023 [US1] Créer `src/components/Hours.astro` utilisant `src/lib/hours.ts` et affichant une fermeture exceptionnelle de façon visible, jamais par la seule couleur
- [X] T024 [US1] Créer `src/pages/index.astro` : bloc contact et horaires en tête de page, avant tout autre contenu

**Checkpoint**: US1 est autonome ; le site peut être déployé comme première version utile (MVP)

---

## Phase 4: User Story 2 - Lire les actualités (Priority: P1)

**Goal**: liste et pages des actualités, par date décroissante, brouillons invisibles (FR-004)

**Independent Test**: avec trois actualités publiées et une en brouillon, la liste est décroissante, chaque actualité s'ouvre, le brouillon est absent

- [X] T025 [US2] Déclarer la collection `actualites` dans `src/content.config.ts` selon `data-model.md` `Actualité.summary` et `Actualité.cover` (`alt` obligatoire si `image` présent, C3)
- [X] T026 [P] [US2] Créer `src/content/actualites/ouverture-du-nouveau-site.md` (première actualité réelle, `draft: false`)
- [X] T027 [P] [US2] Créer `src/components/NewsCard.astro` : titre, date, résumé
- [X] T028 [US2] Créer `src/pages/actualites/index.astro` : tri décroissant via `src/lib/published.ts`, message explicite si la liste est vide
- [X] T029 [US2] Créer `src/pages/actualites/[...slug].astro` : texte complet, image de couverture avec son `alt`, date de publication
- [X] T030 [US2] Ajouter à `src/pages/index.astro` les trois dernières actualités, après le bloc contact

**Checkpoint**: US1 et US2 fonctionnent séparément

---

## Phase 5: User Story 3 - Publier sans compétence technique (Priority: P1)

**Goal**: rédaction par formulaire, brouillon, relecture par une personne distincte, aperçu, retour arrière (FR-011 à FR-017)

**Independent Test**: une personne non technique publie une actualité de bout en bout en moins de 15 minutes après 30 minutes de prise en main (`quickstart.md` §3, SC-003, SC-008)

**Dépend de**: US1 (`mairie.yml`) et US2 (collection `actualites`)

- [X] T031 [US3] Créer `.pages.yml` selon `contracts/pages-cms-config.md` : `media` (PDF vers `public/documents/comptes-rendus`, images vers `src/assets/images`), collection Actualités et fichier Horaires et contact, libellés français sans terme technique, champs obligatoires, `draft` présenté comme « Brouillon (ne pas publier) », message de commit « Modifie {chemin} par {nom} »
- [ ] T032 [US3] Vérifier sur le dépôt réel les points « à vérifier » de `research.md` R3 : invitation d'un rédacteur sans compte GitHub, écriture sur la branche `redaction`, champs obligatoires, saisie du `alt` des images ; consigner le résultat dans `research.md` R3 et adapter `.pages.yml` ou le plan si un point échoue
- [X] T033 [P] [US3] Créer `.github/workflows/pr-redaction.yml` : sur push `redaction`, ouvre ou met à jour la PR vers `main` (droit `pull-requests: write`)
- [X] T034 [P] [US3] Créer `.github/workflows/preview.yml` : build avec `PREVIEW=1` (brouillons inclus, `noindex`, `robots.txt` en `Disallow: /`), publication sur le dépôt d'aperçu par clé de déploiement, adresse commentée dans la PR (R6)
- [X] T035 [P] [US3] Créer `.github/workflows/nightly.yml` : reconstruction et déploiement quotidiens (publications programmées, R2) et vérification hebdomadaire non bloquante des liens externes
- [X] T036 [US3] Rédiger `docs/administration.md` pour l'administrateur technique : création du dépôt d'aperçu et de sa clé de déploiement (seul secret Actions), invitation des rédacteurs, autorisation aux Actions de créer des PR
- [ ] T037 [US3] Appliquer et documenter dans `docs/administration.md` la protection de `main` de `contracts/ci-gates.md` : PR obligatoire, 1 approbation hors auteur, revue des propriétaires de code, contrôles requis, pas de push direct ; activer l'analyse de secrets et les alertes Dependabot ; créer la branche `redaction`
- [X] T038 [P] [US3] Rédiger le guide d'**une page** pour la personne du conseil dans `docs/aide-redacteur.md` : se connecter à Pages CMS, publier une actualité, ajouter un PDF, corriger une publication ; langage simple, une page A4 imprimable, aucun terme technique, y compris la mention que le brouillon n'est pas confidentiel (dépôt public)
- [X] T039 [P] [US3] Rédiger `docs/aide-relecteur.md` : ouvrir l'aperçu, demander une modification, approuver, fusionner, annuler avec « Revert » (R4, R5)
- [ ] T040 [US3] Exécuter le parcours rédacteur → relecteur de `quickstart.md` §3 avec une personne non technique, chronométrer (SC-003), vérifier SC-004 et SC-008, puis corriger `docs/aide-redacteur.md` d'après ses difficultés

**Checkpoint**: US1, US2 et US3 fonctionnent ; le site est maintenable par la mairie

---

## Phase 6: User Story 4 - Consulter les comptes rendus (Priority: P2)

**Goal**: liste des comptes rendus PDF, avec date, format et poids (FR-005)

**Independent Test**: avec plusieurs comptes rendus, retrouver la séance voulue et l'ouvrir en moins d'une minute (SC-002)

- [X] T041 [US4] Déclarer la collection `comptes-rendus` dans `src/content.config.ts` selon `data-model.md` `CompteRendu.meetingDate` et `CompteRendu.file` ; `CompteRendu.fileSizeKb` est calculé, non saisi
- [X] T042 [P] [US4] Créer `src/lib/pdf-size.ts` qui calcule `CompteRendu.fileSizeKb` au build à partir du PDF de `public/documents/comptes-rendus/`
- [X] T043 [P] [US4] Créer `src/pages/comptes-rendus/index.astro` : tri par `meetingDate` décroissant, titre, date, format et poids affichés avant le lien de téléchargement, message si liste vide
- [ ] T044 [P] [US4] Ajouter les premiers comptes rendus fournis par la mairie : `src/content/comptes-rendus/*.md` et PDF dans `public/documents/comptes-rendus/`
- [X] T045 [US4] Ajouter la collection Comptes rendus à `.pages.yml` (champ fichier PDF, `CompteRendu.meetingDate` obligatoire)

**Checkpoint**: US4 testable seule

---

## Phase 7: User Story 5 - Démarches, associations et salle des fêtes (Priority: P2)

**Goal**: démarches, liens utiles, associations, salle des fêtes (FR-006 à FR-009)

**Independent Test**: depuis l'accueil, atteindre chacune de ces rubriques en deux appuis au plus (SC-009)

- [ ] T046 [US5] Déclarer la collection `demarches` dans `src/content.config.ts` selon `data-model.md` `Démarche.summary`, `Démarche.documents`, `Démarche.officialUrl` (https, C2), `Démarche.order`
- [ ] T047 [US5] Déclarer la collection `associations` dans `src/content.config.ts` selon `data-model.md` `Association.activity`, `Association.contacts` (≥ 1 entrée) et `Association.consent` (doit valoir `true`, C8)
- [ ] T048 [US5] Déclarer les collections `salle-des-fetes` et `liens` (loader `file()`) dans `src/content.config.ts` selon `data-model.md` `Salle des fêtes.capacity`, `Salle des fêtes.description`, `Salle des fêtes.conditions`, `Salle des fêtes.rates`, `Salle des fêtes.contact` et `Liens utiles.label`, `Liens utiles.url`, `Liens utiles.theme`
- [ ] T049 [P] [US5] Créer `src/pages/demarches/index.astro` et `src/pages/demarches/[...slug].astro` : explications, pièces utiles, lien vers le service officiel
- [ ] T050 [P] [US5] Créer `src/pages/associations/index.astro` et `src/pages/associations/[...slug].astro` : activité et contacts
- [ ] T051 [P] [US5] Créer `src/pages/salle-des-fetes.astro` : conditions, tarifs, capacité, et contact de la mairie pour demander la location (pas de réservation en ligne)
- [ ] T052 [P] [US5] Créer `src/pages/liens-utiles.astro`, groupés par `Liens utiles.theme`
- [ ] T053 [US5] Ajouter le contenu initial fourni par la mairie : `src/content/demarches/*.md`, `src/content/associations/*.md` (avec accord de publication), `src/content/donnees/salle-des-fetes.yml`, `src/content/donnees/liens.yml`
- [ ] T054 [US5] Ajouter démarches, associations, salle des fêtes et liens utiles à `.pages.yml` (libellés français, `Association.consent` présenté comme « J'ai l'accord de l'association »)
- [ ] T055 [US5] Mettre à jour `src/components/Nav.astro` et `src/pages/index.astro` pour que chaque rubrique soit à deux appuis au plus depuis l'accueil

**Checkpoint**: US1 à US5 fonctionnent

---

## Phase 8: User Story 6 - Découvrir le village (Priority: P3)

**Goal**: présentation du village, du patrimoine et des environs (FR-010)

**Independent Test**: depuis l'accueil, atteindre la présentation en deux appuis au plus ; les photos ont une description

- [ ] T056 [US6] Déclarer la collection `pages` dans `src/content.config.ts` selon `data-model.md` `Page.slug` et `Page.kind` (une page `legal` ou `accessibilite` ne peut pas être en brouillon, C7)
- [ ] T057 [P] [US6] Créer `src/pages/[...slug].astro` qui affiche les pages de la collection `pages` avec le gabarit de lecture
- [ ] T058 [P] [US6] Ajouter le contenu fourni par la mairie : `src/content/pages/village.md`, `patrimoine.md`, `environs.md` (`Page.kind` = `decouverte`) et photos optimisées dans `src/assets/images/`, avec leur description alternative
- [ ] T059 [US6] Ajouter la collection Pages à `.pages.yml` en masquant le type des pages légales
- [ ] T060 [US6] Ajouter l'entrée « Découvrir Ajat » dans `src/components/Nav.astro`

**Checkpoint**: toutes les user stories fonctionnent

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: conformité légale, qualité finale et mise en ligne

- [ ] T061 [P] Rédiger `src/content/pages/mentions-legales.md` (`Page.kind` = `legal` : éditeur, directeur de la publication, hébergeur GitHub, contact) (FR-018)
- [ ] T062 [P] Rédiger `src/content/pages/confidentialite.md` (`Page.kind` = `confidentialite` : aucun cookie ni traceur, aucune donnée collectée, hébergeur hors UE et journaux d'IP, droits des personnes, référent)
- [ ] T063 [P] Rédiger `src/content/pages/accessibilite.md` (`Page.kind` = `accessibilite` : déclaration RGAA, état de conformité, contact, voies de recours)
- [ ] T064 [P] Créer `src/pages/plan-du-site.astro` : toutes les rubriques et pages, sans JavaScript (FR-022)
- [ ] T065 Configurer dans `astro.config.mjs` la table `redirects` (anciennes URL vers nouvelles, pages de redirection générées) et documenter la règle « tout déplacement crée une redirection » dans `docs/administration.md`
- [ ] T066 Exécuter `npm run lhci` et corriger jusqu'à ≥ 0,9 sur les quatre catégories en mobile (images, CSS critique, aucun JavaScript inutile)
- [ ] T067 Choisir et réserver le nom de domaine (décision en attente, `research.md` « Décisions ouvertes »), créer `public/CNAME` contenant uniquement ce domaine, et renseigner `site` dans `astro.config.mjs`
- [ ] T068 Transférer le dépôt à l'organisation GitHub de la mairie (docs/administration.md §7), réactiver les workflows `deploy.yml` et `nightly.yml` (`gh workflow enable`), puis configurer le domaine personnalisé : enregistrements DNS vers GitHub Pages (A/AAAA pour l'apex, CNAME pour `www`), domaine saisi dans Settings → Pages, vérification du domaine au niveau du compte GitHub pour éviter une reprise par un tiers, puis activation de « Enforce HTTPS » une fois le certificat émis ; consigner la procédure dans `docs/administration.md`
- [ ] T069 Vérifier le domaine : redirection HTTP vers HTTPS, apex et `www`, déploiement par `deploy.yml` sans perdre le `CNAME`, aucune erreur de contenu mixte
- [ ] T070 Réaliser l'audit manuel RGAA (clavier seul, lecteur d'écran, zoom 200 %) et compléter l'état de conformité dans `src/content/pages/accessibilite.md`
- [ ] T071 Exécuter l'intégralité de `quickstart.md` (§1 à §5) et cocher chaque critère SC-001 à SC-010
- [ ] T072 Mettre à jour `.specify/memory/constitution.md` : retirer `TODO(EDITING_TOOL)` (Pages CMS retenu, avec branche `redaction`), passer la version à 1.0.1

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: aucune dépendance
- **Foundational (Phase 2)**: dépend de Setup ; BLOQUE toutes les user stories
- **User Stories (Phases 3 à 8)**: dépendent de Foundational ; ordre de priorité P1 → P2 → P3
- **Polish (Phase 9)**: dépend des stories voulues ; T067 à T069 (domaine) exigent un premier déploiement réussi (T017) et la décision de domaine

### User Story Dependencies

- **US1 (P1)**: après Foundational, aucune dépendance
- **US2 (P1)**: après Foundational, indépendante
- **US3 (P1)**: dépend de US1 (T019, `mairie.yml`) et de US2 (T025, collection) pour `.pages.yml`
- **US4, US5 (P2)**: après Foundational, indépendantes ; chacune ajoute son entrée à `.pages.yml` (après T031)
- **US6 (P3)**: après Foundational, indépendante
- Les tâches qui modifient `src/content.config.ts`, `.pages.yml`, `src/components/Nav.astro` ou `src/pages/index.astro` ne sont jamais parallèles entre elles

### Within Each User Story

- Schéma de collection avant le contenu et les pages
- Données et bibliothèques avant composants, composants avant pages
- Chaque story est validée par son test indépendant avant de passer à la suivante

### Parallel Opportunities

- Phase 1 : T002, T003
- Phase 2 : T006 à T009 ; T011 à T015 ; T017, T018
- US1 : T019, T021, T022 ; US2 : T026, T027 ; US3 : T033 à T035, T038, T039
- US4 : T042 à T044 ; US5 : T049 à T052 ; US6 : T057, T058
- Polish : T061 à T064
- US4, US5 et US6 peuvent être menées en parallèle par des personnes différentes après Foundational

---

## Parallel Example: User Story 3

```text
# Après T031 et T032, lancer ensemble :
Task: "Créer .github/workflows/pr-redaction.yml"
Task: "Créer .github/workflows/preview.yml"
Task: "Créer .github/workflows/nightly.yml"
Task: "Rédiger docs/aide-redacteur.md"
Task: "Rédiger docs/aide-relecteur.md"
```

---

## Implementation Strategy

### MVP First (US1 seule)

1. Phase 1 : Setup
2. Phase 2 : Foundational (CI verte, déploiement d'une page)
3. Phase 3 : US1
4. **STOP et VALIDER** : l'accueil à 360 px, Lighthouse > 90, axe sans violation
5. Mettre en ligne sur l'adresse GitHub Pages par défaut (sans domaine) pour relecture par la mairie

### Incremental Delivery

1. Setup + Foundational → socle prêt
2. US1 → MVP en ligne
3. US2 puis US3 → la mairie devient autonome pour publier (T040 valide le flux)
4. US4, US5, US6 → un incrément chacune
5. Polish : pages légales, audit RGAA, domaine personnalisé, puis ouverture publique

### Règles

- Ne jamais ouvrir le site au public avant T061 à T063, T070 et T069
- Commit après chaque tâche ou groupe logique ; toute PR passe par `ci.yml`

---

## Notes

- [P] = fichiers différents, aucune dépendance
- [Story] relie chaque tâche à `spec.md`
- Les tâches T032, T036, T037, T040, T068 et T070 demandent une action manuelle ou une personne tierce
