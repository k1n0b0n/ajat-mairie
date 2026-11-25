# Research: Site web de la mairie d'Ajat

Aucun `NEEDS CLARIFICATION` ne subsiste. La pile est imposée par l'utilisateur ; la recherche porte
sur les écarts entre cette pile et la constitution.

## R1 — Astro statique et content collections

- **Decision**: `output: 'static'`, collections définies dans `src/content.config.ts` avec schémas Zod ;
  le build échoue si un champ obligatoire manque. Collections Markdown via `glob()`, données
  uniques (horaires, salle, liens) via `file()` en YAML.
- **Rationale**: validation à la compilation = filet de sécurité pour des rédacteurs non techniques ;
  zéro JS livré par défaut.
- **Alternatives**: Eleventy (moins de validation de schéma intégrée), Hugo (binaire unique mais
  pile imposée par l'utilisateur).

## R2 — Publications programmées et brouillons dans un site statique

- **Decision**: chaque contenu a `draft: boolean` ; le build de production exclut `draft: true` et
  les dates de publication futures ; un workflow `nightly.yml` reconstruit chaque nuit pour faire
  apparaître les contenus dont la date est arrivée. L'aperçu inclut les brouillons.
- **Rationale**: un site statique ne « sait » pas qu'une date passe ; le rebuild quotidien est le
  moyen le plus simple et sans serveur.
- **Alternatives**: pas de programmation (plus simple, mais l'edge case de la spec resterait
  non couvert).

## R3 — Pages CMS : ce qu'il fait et ne fait pas

Constat (sources : [pagescms.org](https://pagescms.org/), documentation de configuration, et retours
d'usage publics) :

- Il lit `.pages.yml` **par dépôt et par branche**, écrit dans le dépôt Git (content : collections
  et fichiers ; `media` : dossier d'envoi des PDF et images).
- **Pas de brouillon, de relecture, de PR ni d'aperçu natifs.** Un « brouillon » est une convention
  (champ booléen). Par défaut, il peut enregistrer directement sur `main`.
- Les droits se gèrent via GitHub ; des collaborateurs peuvent être invités par courriel.
  Les rôles granulaires par collection sont annoncés « bientôt ».
- Il est open source et auto-hébergeable (conforme au principe VIII).

À vérifier au premier jour de mise en œuvre (non confirmé par la doc officielle lue) :
l'invitation sans compte GitHub, l'écriture sur une branche choisie, `required`/validation de
champs, et le champ `alt` des images.

- **Decision**: ne pas compter sur Pages CMS pour la relecture. Il écrit sur la branche `redaction`
  (branche par défaut des rédacteurs) ; `main` est protégée.
- **Rationale**: la relecture par une personne distincte est une exigence constitutionnelle (VII) ;
  seule la protection de branche GitHub la garantit techniquement.
- **Alternatives**: Decap CMS (flux éditorial natif brouillon → relecture → publié par PR, mais
  il exige un fournisseur OAuth à héberger, donc un petit serveur : contraire à VI) ; Tina (service
  tiers) ; formulaires GitHub Issues (trop technique).

## R4 — Flux brouillon → relecture → publication

1. Le rédacteur ouvre Pages CMS, travaille sur la branche `redaction`, coche « brouillon » tant que
   ce n'est pas prêt.
2. `pr-redaction.yml` ouvre ou met à jour une PR `redaction` → `main` à chaque envoi.
3. `preview.yml` publie l'aperçu de la branche (brouillons inclus) ; son adresse est ajoutée en
   commentaire de la PR.
4. `ci.yml` exécute tous les contrôles bloquants.
5. Un relecteur (membre de `CODEOWNERS`, différent de l'auteur) lit l'aperçu, approuve ou demande
   des modifications (remarque lisible par le rédacteur dans la PR) ; puis fusionne.
6. `deploy.yml` publie sur GitHub Pages.

- **Rationale**: couvre FR-012 à FR-015 avec des outils existants.
- **Contrainte**: les relecteurs (1 à 2 personnes) ont besoin d'un compte GitHub ; les rédacteurs
  éventuellement pas (à confirmer, R3). Une page d'aide en français décrit les 5 clics du relecteur.

## R5 — Retour arrière en une opération (FR-015)

- **Decision**: le bouton « Revert » de GitHub sur la PR fusionnée crée une PR inverse ; un
  relecteur la fusionne. Pour un retrait urgent, un administrateur peut fusionner sans attendre.
- **Alternatives**: aucune plus simple sans serveur.

## R6 — Aperçu des brouillons

- **Decision**: dépôt public séparé `ajat-mairie-apercu` servi par GitHub Pages, alimenté par
  `preview.yml` avec une clé de déploiement limitée à ce dépôt ; pages en `noindex`,
  `robots.txt` en `Disallow: /`, bandeau « APERÇU » sur chaque page.
- **Rationale**: GitHub Pages n'héberge qu'un site par dépôt ; les brouillons sont de toute façon
  déjà visibles dans le dépôt public (voir risque).
- **Risque**: un brouillon n'est pas confidentiel (dépôt public). La page d'aide le dit : ne jamais
  y mettre de donnée non publiable. Aperçu authentifié = serveur, donc écarté.
- **Alternatives**: artefact de CI (zip, inutilisable) ; Netlify/Cloudflare (tiers, hors pile) ;
  dépôt privé (Pages privé payant).

## R7 — Hébergement GitHub Pages et RGPD

- **Decision**: GitHub Pages + domaine personnalisé + HTTPS imposé. L'hébergeur journalise les IP
  (hors UE). Mentionné dans la politique de confidentialité ; aucun cookie ni traceur côté site.
- **Rationale**: principe V dit « UE de préférence » ; l'écart est tracé (Complexity Tracking).
- **Limite technique**: pas d'en-têtes HTTP personnalisés (CSP, HSTS géré par GitHub) → CSP par
  `<meta http-equiv>` ; pas de redirections serveur → `redirects` d'Astro génère des pages de
  redirection (conforme à l'exigence d'URL stables).

## R8 — Qualité automatisée

- **Decision**: Lighthouse CI (`@lhci/cli`, mobile, assertions ≥ 0,9 sur les 4 catégories) ; axe via
  Playwright sur chaque URL du sitemap ; test Playwright qui échoue sur tout cookie ou toute
  requête vers un autre domaine ; `lychee` hors ligne pour les liens internes (bloquant), en
  ligne pour les liens externes (hebdomadaire, non bloquant) ; script maison pour `alt` manquant,
  poids PDF/image, états incohérents.
- **Rationale**: couvre SC-005 à SC-007 et les edge cases de la spec.
- **Limite**: axe détecte ~un tiers des problèmes RGAA ; l'audit manuel avant ouverture reste requis.

## R9 — Recherche et JavaScript

- **Decision**: pas de moteur de recherche ; un **plan du site** (page statique) + navigation à
  deux niveaux max satisfait FR-022 sans JS.
- **Alternatives**: Pagefind (JS + index, utile si > 100 pages ; hors besoin actuel).

## R10 — Dépendances et maintenance

- **Decision**: Dependabot mensuel, PR groupées ; la CI fait office de test de non-régression.
  Aucune dépendance d'exécution (rien ne tourne en production).
- **Rationale**: principe VI.

## Décisions ouvertes (pour toi)

- Nom de domaine (et propriétaire du compte GitHub / de l'organisation).
- Qui sont les relecteurs ? Il faut au moins 2 personnes (absences).
