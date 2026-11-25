# Contrat : contrôles de CI et workflows

## Contrôles bloquants (`ci.yml`, sur toute PR vers `main`)

| Contrôle | Outil | Seuil | Critère de spec |
|---|---|---|---|
| Build + schémas de contenu | `astro build` | 0 erreur | FR-016, C1-C10 |
| Contenu : alt, PDF, états | `scripts/check-content.mjs` | 0 erreur | FR-016 |
| Accessibilité | axe via Playwright, toutes les URLs du sitemap | 0 violation | SC-005 |
| Mobile 320 px | Playwright | pas de défilement horizontal | constitution II |
| Lighthouse mobile | `@lhci/cli` | ≥ 0,9 sur performance, accessibilité, bonnes pratiques, SEO | SC-006 |
| Aucun traceur | Playwright | 0 cookie, 0 requête hors domaine | SC-007, FR-019 |
| Liens internes | `lychee` hors ligne | 0 lien cassé | edge case liens |

## Workflows

| Fichier | Déclencheur | Rôle | Droits |
|---|---|---|---|
| `ci.yml` | PR vers `main` | contrôles ci-dessus | lecture |
| `deploy.yml` | push sur `main` | build + action officielle Astro → GitHub Pages | `pages: write`, `id-token: write` |
| `pr-redaction.yml` | push sur `redaction` | ouvre/maintient la PR `redaction` → `main` | `pull-requests: write` |
| `preview.yml` | push sur `redaction` | build avec brouillons, `noindex`, publie sur le dépôt d'aperçu, commente la PR | clé de déploiement du dépôt d'aperçu |
| `nightly.yml` | quotidien + manuel | rebuild/déploiement (publications programmées) ; liens externes en non bloquant, hebdo | idem `deploy.yml` |

## Protection de `main` (réglage GitHub, hors code)

- PR obligatoire, 1 approbation minimum, approbation de l'auteur de la dernière modification exclue.
- Revue des propriétaires de code (`.github/CODEOWNERS` : `src/content/**` → relecteurs).
- Contrôles de `ci.yml` requis ; branche à jour avant fusion ; pas de push direct, y compris admins.
- Exception d'urgence : un administrateur peut contourner, tracé dans l'historique.

## Dépôt public : garde-fous

- Aucun secret dans le dépôt ; seule la clé de déploiement de l'aperçu est un secret Actions.
- Analyse de secrets et alertes Dependabot activées.
- `consent: true` sur toute donnée de contact d'association (data-model).
