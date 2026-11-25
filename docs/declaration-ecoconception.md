# Déclaration d'écoconception

Site de la mairie d'Ajat. Cadre : [RGESN](https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/) (Référentiel général d'écoconception de services numériques, Arcep, version 2024). Application volontaire : le RGESN n'est pas une obligation légale pour une commune de cette taille. Seuls les critères effectivement relus sont cités ; le détail est dans `specs/002-identite-visuelle/contracts/ecoconception.md`.

**Dernière mise à jour :** 2026-11-25. **À réviser** à chaque changement significatif du site (critère 1.4) et au moins une fois par an.

## Périmètre

Le site public `ajat.kobbo.fr` (domaine provisoire) : site statique Astro, sans serveur applicatif, sans base de données, sans JavaScript côté visiteur, publié sur GitHub Pages.

## Référent

À désigner par la mairie (critère 1.3) : une personne chargée de relire cette déclaration. **Non renseigné à ce jour.**

## Mesures de référence

Mesurées avec `node scripts/mesure-pages.mjs` (Playwright, texte compressé comme sur GitHub Pages) au premier chargement, sans cache.

| Page | Requêtes | Téléphone 360 px | Ordinateur 1280 px |
|---|---|---|---|
| Accueil | 7 | 72 Ko | 141 Ko |
| Actualités | 6 | 58 Ko | 58 Ko |
| Démarches | 6 | 59 Ko | 59 Ko |
| Salle des fêtes | 6 | 58 Ko | 58 Ko |
| Patrimoine (avec photo) | 7 | 80 Ko | 105 Ko |
| Mentions légales | 6 | 59 Ko | 59 Ko |

Avant l'optimisation du visuel d'accueil (T041), l'accueil pesait 79 Ko sur téléphone et 230 Ko sur ordinateur. Les polices (52 Ko) représentent près de 90 % du poids d'une page de texte ; le HTML et le CSS en pèsent 3 à 5.

## Budgets contrôlés à chaque proposition de changement

Test `tests/page-budget.spec.ts` (constitution, principe IX) : accueil 120 Ko au plus, page de texte 100 Ko au plus, 10 requêtes au plus, 3 fichiers de polices au plus (400 Ko), aucun script. Chaque image servie pèse 200 Ko au plus (`scripts/check-images.mjs`).

## Critères du RGESN

| Critère | Sujet | État |
|---|---|---|
| 1.3 | Référent identifié | **Non tenu** : à désigner |
| 1.4 | Revue régulière et déclaration | Tenu par ce document |
| 1.6, 4.4 | Pas de collecte ni de contenu tiers sans consentement | Tenu : aucun traceur, aucun tiers |
| 1.8 | Code ouvert | Tenu : dépôt public |
| 2.2, 2.3, 2.5 | Appareils anciens, faible débit, responsive | Tenu : zéro JavaScript, pages de 60 à 80 Ko, mobile d'abord |
| 3.3 | HTTPS et protocoles à jour | Tenu : HTTPS obligatoire, certificat Let's Encrypt renouvelé automatiquement, redirection de HTTP vers HTTPS |
| 4.1 | Pas d'animation ni de vidéo automatique | Tenu |
| 4.2 | Pas de défilement infini | Tenu |
| 4.5 | Composants natifs plutôt que surcouches | Tenu : menu `popover` sans JavaScript |
| 4.8 | Au plus deux polices et quatre variantes | Tenu : 2 familles, 3 variantes, 52 Ko |

## Choix de conception en faveur de la sobriété

- Visuel d'accueil recadré par proportions d'écran, en AVIF puis WebP, plusieurs largeurs ; photos d'illustration chargées à la demande.
- Thème sombre automatique selon le système (économie d'énergie sur les écrans qui s'y prêtent).
- Reconstruction nocturne conditionnelle : elle ne tourne que si un contenu change de statut (`scripts/changement-du-jour.mjs`).

## Limites connues

- **Cache** : GitHub Pages impose une durée de cache de 10 minutes, non configurable ; les visites répétées retéléchargent plus que nécessaire.
- **Hébergement** : la source d'énergie des serveurs de GitHub n'est pas maîtrisée par la commune.
- **Polices** : 52 Ko par première visite ; des polices système seules les supprimeraient, au prix de l'identité visuelle.
- **Photo d'accueil** : premier poste de poids sur ordinateur (≈ 85 Ko).

## À mesurer

- Note **EcoIndex** de l'accueil et d'une page de texte, une fois le site accessible publiquement (objectif A ou B) : à consigner ici.
