# Contribuer au site de la mairie d'Ajat

Merci de votre intérêt. Ce site est celui d'une petite commune : il doit rester **léger, accessible et sans maintenance**. Toute contribution est jugée à l'aune des [dix principes de la constitution](.specify/memory/constitution.md).

## Selon ce que vous voulez faire

| Je veux… | Voie à suivre |
|---|---|
| Modifier un texte, une actualité, les horaires, un PDF | Passer par **Pages CMS**, sans Git : [guide du rédacteur](docs/aide-redacteur.md). Un relecteur valide ensuite ([guide](docs/aide-relecteur.md)). |
| Signaler une erreur de contenu ou un problème d'affichage | Ouvrir un [ticket](../../issues/new/choose) |
| Corriger un défaut ou ajouter une fonctionnalité | Suivre le flux ci-dessous |
| Signaler une faille de sécurité | **Pas de ticket public** : voir [`SECURITY.md`](SECURITY.md) |

## Flux de travail

`main` est **protégée** : aucun push direct, tout passe par une pull request, et le contrôle `controles` de la CI doit être vert.

1. **Partir de `main`** à jour : `git switch main && git pull`, puis `git switch -c type/sujet-court`.
2. **Installer** : `npm ci` et `npx playwright install chromium`.
3. **Travailler** en gardant les contraintes ci-dessous. Lancer `npm run dev`.
4. **Contrôler** : `npm run check` doit être vert, et `npm run lhci` pour toute modification visible.
5. **Commiter** avec la convention ci-dessous, **pousser** la branche et **ouvrir une PR** (le modèle de PR vous guide).
6. **Attendre la CI**, répondre à la relecture, puis fusionner.

Pour une évolution de fond, commencez par la spécification : [Spec Kit](https://github.com/github/spec-kit) (`/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`). Une nouvelle fonctionnalité sans spécification, plan et tâches ne sera pas fusionnée.

## Les règles qui comptent

- **Aucune nouvelle dépendance ni JavaScript côté visiteur** sans justification écrite dans le plan (principe VI). Les polices restent auto-hébergées.
- **Aucune couleur écrite en dur** hors de [`src/styles/tokens.css`](src/styles/tokens.css) : tout passe par un jeton (le script `check-contrast.mjs` l'impose).
- **Accessibilité** : HTML sémantique, navigation au clavier, texte alternatif sur toute image, contraste AA.
- **Budgets de poids** : accueil ≤ 120 Ko sur téléphone, page de texte ≤ 100 Ko, 10 requêtes, 3 polices ; toute image servie ≤ 200 Ko.
- **Aucun traceur, aucune requête tierce**, aucun secret ni donnée personnelle non publiable dans le dépôt (il est public).
- **Contenu** : les schémas sont dans [`src/content.config.ts`](src/content.config.ts) ; un contenu invalide fait échouer le build.

### Refonte visuelle : audit avant code (principe X)

Toute modification de mise en page, de composant, de palette, de polices ou d'images passe **d'abord** par un audit avec le skill `unslop` (liste de signes de `references/signs.md`), consigné dans `specs/<n>-…/audit-unslop.md`. Sont interdits : les grilles de blocs identiques, les liens répétés dans le contenu principal, les dégradés, les icônes décoratives génériques et le pastiche « vieux parchemin ». Voir [`specs/003-personnalite-du-site/audit-unslop.md`](specs/003-personnalite-du-site/audit-unslop.md) pour un exemple.

## Convention de commits

[Conventional Commits](https://www.conventionalcommits.org/fr/), au mode impératif, en français :

```text
feat: affiche la phrase d'horaires sur l'accueil
fix: corrige le contraste du bouton d'appel en contraste élevé
docs: documente la protection de main
refactor: normalise l'espacement sur l'échelle de 4 px
chore: met à jour les dépendances
```

Types : `feat`, `fix`, `docs`, `refactor`, `test`, `chore`. Un commit = un changement cohérent.

## Relecture

Une PR est relue sur : la conformité à la constitution, les contrôles verts, le rendu (joindre des captures pour tout changement visible, mobile et ordinateur) et l'absence de régression d'accessibilité ou de poids. Un relecteur ne valide pas sa propre PR. Tant que la commune n'a pas deux relecteurs, l'administrateur peut fusionner avec le contournement prévu : [`docs/administration.md`](docs/administration.md) §4.

## Code de conduite

Participer à ce projet implique de respecter le [code de conduite](CODE_OF_CONDUCT.md).
