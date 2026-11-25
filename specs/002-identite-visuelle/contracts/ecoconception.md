# Contrat : écoconception (RGESN)

Cadre de bonnes pratiques, pas d'obligation légale ([research.md](../research.md) R11). Seuls les critères effectivement lus sont cités.

## Budgets (mesurés sur téléphone 360 px, compressés)

| Indicateur | Limite | Aujourd'hui | Contrôle |
|---|---|---|---|
| Poids de l'accueil | ≤ 120 Ko (SC-010) | 79 Ko | `tests/page-budget.spec.ts` |
| Poids d'une page de texte | ≤ 100 Ko (SC-010) | 58 Ko | `tests/page-budget.spec.ts` |
| Requêtes par page | ≤ 10 (SC-011) | 6 à 7 | `tests/page-budget.spec.ts` |
| Fichiers de polices | ≤ 3, ≤ 400 Ko (4.8) | 3 fichiers, 52 Ko | `tests/page-budget.spec.ts` |
| Accueil sur ordinateur | ≤ 150 Ko (objectif T041) | 230 Ko | mesure `scripts/mesure-pages.mjs` |
| Note EcoIndex | A ou B (SC-012) | à mesurer | T044 |

## Correspondance avec les critères du RGESN lus

| Critère | Sujet | État |
|---|---|---|
| 1.3 | Référent identifié | à désigner par la mairie (déclaration) |
| 1.4 | Revue régulière et déclaration | `docs/declaration-ecoconception.md`, révisée à chaque changement significatif |
| 1.6, 4.4 | Pas de collecte ni de contenu tiers sans consentement | conforme : aucun traceur, aucun tiers (test existant) |
| 1.8 | Code ouvert | conforme : dépôt public |
| 2.2, 2.3, 2.5 | Appareils anciens, faible débit, responsive | conforme : zéro JavaScript, pages de 60 à 80 Ko |
| 3.3 | HTTPS et protocoles à jour | conforme sous réserve du certificat de `ajat.kobbo.fr` |
| 4.1 | Pas d'animation ni de vidéo automatique | conforme |
| 4.2 | Pas de défilement infini | conforme |
| 4.5 | Composants natifs plutôt que surcouches | conforme : menu `popover` sans JavaScript |
| 4.8 | Au plus deux polices et quatre variantes (ou ≈ 400 Ko) | conforme : 2 familles, 3 variantes, 52 Ko |

## Limites déclarées

- **Cache** : GitHub Pages impose une durée de cache courte (10 minutes) non configurable ; les visites répétées retéléchargent plus que nécessaire.
- **Hébergement** : source d'énergie des serveurs non maîtrisée.
- **Images** : la photo d'accueil reste le premier poste de poids sur ordinateur.

## Décisions de conception liées

- Direction artistique du visuel d'accueil (T041) ; polices à trois fichiers ; thème sombre automatique par `prefers-color-scheme` ; reconstruction nocturne conditionnelle (T043).
