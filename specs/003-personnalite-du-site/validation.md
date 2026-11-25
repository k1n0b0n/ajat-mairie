# Validation de la personnalité du site (quickstart.md)

Exécutée le 2026-11-26 sur la version locale (commit de la passe 8). À refaire sur le site publié (T036).

| Critère | Résultat | Preuve |
|---|---|---|
| SC-001 test de substitution (au moins 3 éléments) | ✅ | `substitution.md` : 5 éléments hors nom et coordonnées |
| SC-002 audit unslop sans signe | ✅ | `audit-unslop.md`, « Audit final » : 0 signe sur 19 au départ |
| SC-003 `npm run check` vert | ✅ | 152 tests, contrastes, identité, images, contenu |
| SC-004 5 personnes retrouvent horaires, téléphone, adresse en moins de 3 s | ⏳ | test humain (T037) |
| SC-005 phrase, téléphone et adresse sans défilement à 360 × 640 | ✅ | `tests/home-viewport.spec.ts` (560 px) |
| SC-006 0 destination répétée dans `main` | ✅ | `tests/home-liens.spec.ts` |
| SC-007 composition sur la largeur à 1280 px | ✅ | même fichier : conteneur de 72 rem, deux zones côte à côte inégales |
| SC-008 aucun zéro barré (téléphone, horaires, dates, code postal) | ✅ | `tests/chiffres.spec.ts` (Fraunces) et captures |
| SC-009 contraste du nom ≥ 4,5 quelle que soit la photo | ✅ | `tests/identite.spec.ts` : plaque opaque, contraste calculé, indépendante de la photo |
| SC-010 aucun mot « moderne », « épuré », « premium » | ✅ | `scripts/check-identite.mjs` |
| SC-011 budgets de la constitution | ✅ | accueil 72 Ko sur téléphone et 124 Ko sur ordinateur, 7 requêtes, 2 à 3 polices, Lighthouse minimum 96 sur 13 pages |

Parcours du quickstart : §1 contrôles verts ; §2 accueil sur téléphone (captures à 360 px, clair et sombre) ; §3 ordinateur à 1280 px ; §4 chiffres ; §5 page « La mairie » (`tests/la-mairie.spec.ts`) ; §6 substitution et audit ; §7 restes : photo de la mairie, blason confirmé, test de perception.
