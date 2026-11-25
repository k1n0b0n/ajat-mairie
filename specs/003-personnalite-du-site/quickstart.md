# Quickstart : valider la personnalité du site

Prérequis : `npm ci`, Chromium de Playwright.

## 1. Contrôles automatiques

```text
npm run check   # build, identité (dégradés, mots), contrastes, images, contenu, tests (accueil, liens, plaque, chiffres, La mairie)
npm run lhci
```

## 2. Accueil sur téléphone (US1, US2)

1. `npm run preview`, `/` à 360 × 640 px : la photo avec la plaque « Ajat », puis la phrase d'horaires, le téléphone et l'adresse sans défiler (SC-005).
2. Appui sur le téléphone : l'appel est proposé.
3. Test de 5 personnes : retrouver quand la mairie est ouverte, le téléphone et l'adresse en moins de 3 secondes (SC-004).

## 3. Accueil sur ordinateur (US3)

1. `/` à 1280 px : composition en plusieurs zones de largeurs inégales, pas de colonne unique, pas de rangée de blocs identiques (SC-007).
2. Compter les liens de `main` : une occurrence par destination (SC-006), dont le test `tests/home-liens.spec.ts`.

## 4. Chiffres (US4)

Captures du téléphone, des horaires, d'une date et du code postal : aucun zéro barré (SC-008).

## 5. Page « La mairie » (US5)

`/la-mairie/` : tableau jour par jour, fermetures, remarque, adresse, accès. Modifier les horaires dans `mairie.yml` : la phrase de l'accueil et le tableau changent ensemble (FR-006).

## 6. Substitution et audit (SC-001, SC-002)

1. `substitution.md` : au moins trois éléments qui ne sont ni le nom ni les coordonnées.
2. Audit `unslop` final de l'accueil, d'une liste et d'un article : aucun signe (`audit-unslop.md`, section « Audit final »).

## 7. Avant ouverture

Photo d'accueil de la mairie, blason confirmé, test de perception, remesure EcoIndex.
