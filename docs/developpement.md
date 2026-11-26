# Guide de développement

Pour contribuer au code. Le flux Git et les règles à respecter sont dans [`CONTRIBUTING.md`](../CONTRIBUTING.md) ; la vue d'ensemble technique est dans [`architecture.md`](architecture.md).

## Installation

```bash
git clone git@github.com:k1n0b0n/ajat-mairie.git
cd ajat-mairie
nvm use            # ou toute installation de Node ≥ 22.23.4 (CI : version de .nvmrc)
npm ci
npx playwright install chromium
```

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement, rechargement à chaud (`http://localhost:4321`) |
| `npm run build` | Construit le site dans `dist/` ; valide tous les contenus |
| `npm run preview` | Sert `dist/` (après un build) |
| `npm run check` | **Build + contrôles + tests** : à lancer avant chaque PR |
| `npm run lhci` | Lighthouse mobile sur une page par rubrique (nécessite `dist/`) |
| `node scripts/mesure-pages.mjs` | Poids et requêtes par page type, téléphone et ordinateur |
| `node scripts/changement-du-jour.mjs` | Dit si un contenu change de statut dans les dernières 24 à 48 h |
| `npx playwright test tests/a11y.spec.ts` | Un seul fichier de tests |
| `npx playwright test -g "plaque"` | Les tests dont le titre contient « plaque » |

Variables utiles : `PREVIEW=1 npm run build` (brouillons visibles), `INDEXATION=on npm run build` (version indexable).

## Ajouter une page

1. Créer `src/pages/ma-page.astro` avec le gabarit `Base` (`<Base titre="…" description="…">`). Ajouter `large` pour la pleine largeur.
2. L'ajouter à la navigation : `src/lib/nav.ts` (`navPrincipale` pour le menu, `liensPied` pour le pied de page).
3. C'est tout pour les tests : toutes les pages du sitemap passent automatiquement par axe, le test 320 px, le test « aucun traceur » et les budgets de poids.

## Ajouter une collection de contenu

1. Déclarer le schéma et le loader dans `src/content.config.ts`, en réutilisant `schemaCommun` pour `title`, `draft`, `publishDate`.
2. Créer le dossier sous `src/content/` (avec un `.gitkeep` s'il est vide).
3. Créer les pages de liste et de détail ; filtrer par `getPublies('ma-collection')`.
4. Ajouter l'entrée dans `.pages.yml` (libellés en français, champs obligatoires, pas de jargon). **Mettre entre guillemets toute valeur qui contient « : »** (une description par exemple), sinon le fichier devient invalide pour Pages CMS.
5. Ajouter les règles de contrôle utiles dans `scripts/check-content.mjs`.
6. Documenter l'usage dans `docs/aide-redacteur.md` si les rédacteurs y touchent.

## Modifier le style

- **Aucune couleur, taille d'espacement ou police en dur** : tout passe par les jetons de [`src/styles/tokens.css`](../src/styles/tokens.css). `scripts/check-contrast.mjs` refuse une couleur hexadécimale hors de ce fichier.
- Changer une couleur : modifier `tokens.css` (clair **et** sombre), vérifier avec `node scripts/check-contrast.mjs`, puis reporter la valeur dans le contrat de jetons de la spécification concernée.
- Espacements : utiliser `--e1` à `--e7` (échelle de 4 px).
- **Contraste élevé** : le bloc `@media (forced-colors: active)` doit rester **à la fin** de `global.css`. Les fonds posés en couleur (ardoise, tuile) sont remplacés par le navigateur : prévoir des couleurs système (`Canvas`, `CanvasText`, `LinkText`) pour le texte qui les recouvre.
- **Chiffres** : `.chiffres` (Fraunces) pour les dates, heures et code postal ; `.numero` (police du système) pour le téléphone.
- Interdits du principe X : pas de dégradé, pas d'icône de décor, pas de grille de blocs identiques, pas de lien répété dans le contenu principal.

## Ajouter une image

1. Déposer la source dans `src/assets/images/` (≤ 600 Ko, recadrée et réduite : 1920 px de large suffisent).
2. La référencer **par son nom de fichier** (`visuels.yml`, `cover` d'une page ou d'une actualité), avec une description alternative et son crédit si une licence l'exige.
3. Dans un composant, utiliser `<Picture>` ou `getImage()` (AVIF puis WebP) ; fixer `width` pour l'image de repli.
4. `npm run check` vérifie que chaque fichier servi pèse ≤ 200 Ko.

## Écrire des tests

- Les tests sont dans `tests/` (Playwright). Pour tester toutes les pages : `cheminsDuSite()` (`tests/helpers/urls.ts`).
- Attendre les polices avant de mesurer une mise en page : `await page.evaluate(() => document.fonts.ready)`. Sans cela, les polices de repli (plus larges, notamment sous Linux en CI) faussent les positions.
- Les tests unitaires sans navigateur (par exemple `horaires-phrase.spec.ts`) importent directement les fichiers de `src/lib/`.
- Le serveur de test est lancé avec `--ignore-lock` (voir `playwright.config.ts`).

## Dépannage

| Symptôme | Cause et remède |
|---|---|
| Un contenu ou une collection « introuvable » en dev | Le serveur de développement est resté lancé avant le changement de `content.config.ts` : l'arrêter et le relancer |
| Une image n'apparaît pas | Vider le cache du navigateur ; vérifier que le nom de fichier existe dans `src/assets/images/` |
| `astro dev` ou `astro preview` « déjà lancé » ou passe en arrière-plan | Ajouter `--ignore-lock`, ou `astro dev stop` |
| Test d'accueil qui échoue seulement en CI | Polices de repli plus larges sous Linux : attendre `document.fonts.ready` |
| Axe signale un contraste de 1,07 en contraste élevé | Un fond en couleur est remplacé par le navigateur : ajouter des couleurs système dans le bloc `forced-colors` |
| `.pages.yml` refusé par Pages CMS | Une valeur contient « : » sans guillemets |
| « La collection … est vide » au build | Avertissement normal tant qu'une collection n'a aucun contenu publié |
| Une PR est rouge à cause d'un seuil de poids | Voir `node scripts/mesure-pages.mjs` et la déclaration d'écoconception |

## Publier

Toute modification passe par une PR vers `main`. À la fusion, `deploy.yml` publie le site (les changements de documentation seule ne redéploient pas). Après un changement de `.pages.yml`, ramener `main` dans la branche `redaction`.
