# Validation de l'identité visuelle (quickstart.md)

Exécutée le 2026-11-25 sur la version locale (commit de la phase 6). Elle sera à refaire sur le site publié (T036).

## Critères de succès

| Critère | Résultat | Preuve |
|---|---|---|
| SC-001 contrastes AA | ✅ | `check-contrast` : 32 couples (clair et sombre) ; axe sans violation dans les deux thèmes et en contraste élevé |
| SC-002 accès rapides sans défilement (360 × 640) | ✅ | `tests/home-viewport.spec.ts` : le bas des tuiles est sous 560 px |
| SC-003 un appui vers horaires, actualités, salle | ✅ | même test : destinations vérifiées, ancre `#horaires` atteinte |
| SC-004 Lighthouse > 90 | ✅ | 12 pages, minimum 96, accueil 100/100/96/100 |
| SC-005 images ≤ 200 Ko, accueil < 1 Mo | ✅ | `check-images` 0 erreur ; accueil 72 Ko sur téléphone, 141 Ko sur ordinateur |
| SC-006 aucun domaine tiers, polices comprises | ✅ | `tests/no-tracking.spec.ts` sur toutes les pages |
| SC-007 pas de défilement horizontal à 320 px ni à 200 % | ✅ | `tests/mobile-320.spec.ts` et `tests/text-spacing.spec.ts` |
| SC-008 perception « chaleureux et sérieux » | ⏳ | test auprès de 5 personnes (T038) |
| SC-009 texte lisible en moins de 3 s en connexion lente | ✅ | Lighthouse mobile (150 ms de latence, 1,6 Mbit/s) : FCP maximal 755 ms, CLS 0 |
| SC-010 poids ≤ 120 Ko (accueil) et 100 Ko (page de texte) | ✅ | `tests/page-budget.spec.ts` : 72 Ko et 58 à 80 Ko |
| SC-011 au plus 10 requêtes et 3 polices | ✅ | même test : 6 à 7 requêtes, 3 fichiers de polices |
| SC-012 EcoIndex A ou B | ◐ | 89/100, note A, relevé le 2026-11-25 sur l'accueil (à confirmer) ; reste une page de texte (T043) |

## Parcours du quickstart

- §1 contrôles automatiques : `npm run check` (129 tests) et `npm run lhci` verts.
- §2 accueil sur téléphone : vérifié par tests et captures (360 × 640, 768, 1280, sombre, menu ouvert, image bloquée).
- §3 lisibilité : thème sombre, contraste élevé, espacement imposé (RGAA 10.12), focus clavier : tests et captures.
- §4 cohérence : 12 pages types capturées, encadré de fermeture exceptionnelle contrôlé en clair et en sombre.
- §5 légèreté : budgets, Lighthouse, aucune requête tierce.
- §6 remplacement de la photo : essai réel (changement de `visuels.yml` vers une autre image) : le build réussit, la nouvelle image est servie, le crédit disparaît quand il est absent. L'éditeur Pages CMS reste à tester sur le dépôt réel (T032 de la spec 001).
- §7 avant ouverture : blason (T037) et perception (T038) restent à faire.
