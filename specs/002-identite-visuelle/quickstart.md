# Quickstart : valider l'identité visuelle

Prérequis : dépendances installées (`npm ci`), Chromium de Playwright (`npx playwright install chromium`).

## 1. Contrôles automatiques

```text
npm run check   # build, contenu, contrastes, poids des images, axe, 320 px, aucun tiers, accueil 360 × 640, menu
npm run lhci    # 4 catégories > 90 sur toutes les pages types
```

Attendu : tout vert ; `check-contrast` affiche les ratios clair et sombre ; `check-images` liste chaque image servie ≤ 200 Ko.

## 2. Accueil sur téléphone (US1)

1. `npm run preview`, ouvrir `/` à 360 × 640 px.
2. Visuel du bourg, titre, **trois tuiles** visibles sans défilement (SC-002).
3. « Horaires » descend sur la section d'horaires ; « Actualités » et « Salle des fêtes » ouvrent leurs pages (SC-003).
4. Bloquer le chargement de l'image (outils du navigateur) : le bloc pierre reste, le reste est intact.

## 3. Lisibilité (US2)

1. Zoom 200 % et fenêtre à 320 px : rien de coupé, pas de défilement horizontal (SC-007).
2. Navigation au clavier : focus visible partout, menu ouvert puis fermé par Échap.
3. Thème sombre du système, puis mode contraste élevé : tout reste lisible.
4. `npm run check` : ratios AA des jetons (SC-001).

## 4. Cohérence (US3)

Comparer côte à côte accueil, actualités, une actualité, comptes rendus, démarches, salle des fêtes, plan du site, 404 : mêmes couleurs, titres, boutons, encadrés. Ajouter une fermeture exceptionnelle (encadré d'alerte) et vérifier libellé + bord.

## 5. Légèreté (US4)

1. Lighthouse mobile sur `/` : > 90 partout, LCP < 2,5 s (SC-004).
2. Onglet Réseau, connexion lente simulée : texte lisible avant l'image, polices servies par le site, **aucun domaine tiers** (SC-006, SC-009).
3. Budgets (SC-010, SC-011) : accueil ≤ 120 Ko et page de texte ≤ 100 Ko sur téléphone, 10 requêtes au plus, 3 fichiers de polices ; aucune image > 200 Ko (`tests/page-budget.spec.ts`).
4. `node scripts/mesure-pages.mjs` : tableau de poids par page, à comparer à `docs/declaration-ecoconception.md`.
5. Note EcoIndex de l'accueil et d'une page de texte : A ou B (SC-012).

## 6. Remplacement de la photo (R10)

Dans Pages CMS : « Visuel d'accueil », envoyer une nouvelle image, renseigner la description et le crédit, enregistrer ; l'aperçu montre la nouvelle photo et son crédit.

## 7. Avant ouverture au public

- Blason : confirmation par la mairie (R4). Crédits à jour dans les mentions légales.
- Test de perception auprès de 5 personnes (SC-008).
