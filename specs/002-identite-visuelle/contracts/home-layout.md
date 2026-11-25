# Contrat : page d'accueil

## Structure (ordre dans le HTML)

1. Lien d'évitement, en-tête (blason, nom de la commune, bouton « Menu »).
2. `main` :
   1. **Visuel d'accueil** : une image (`<picture>`, AVIF puis WebP), sa description alternative, le crédit en petit dessous.
   2. **Titre** `h1` « Mairie d'Ajat » et une phrase d'accroche, dans un bloc `--fond`.
   3. **Accès rapides** : `nav` « Accès rapides » avec 3 liens-tuiles.
   4. Contact (téléphone en bouton), puis **horaires** (`id="horaires"`), puis infos pratiques, puis dernières actualités (contenu de la spec 001, inchangé).
3. Pied de page.

## Comportement par largeur d'écran

| Largeur | Visuel | Accès rapides | Navigation |
|---|---|---|---|
| 320 à 479 px | ratio 2:1, pleine largeur | 3 tuiles en ligne (icône au-dessus du libellé) | bouton « Menu » (popover) |
| 480 à 767 px | ratio 2:1 | 3 tuiles en ligne, plus larges | bouton « Menu » |
| ≥ 768 px | ratio 3:1, hauteur plafonnée | 3 tuiles en ligne, libellé à côté de l'icône | liste en ligne, sans bouton |

## Exigences vérifiables

- À 360 × 640 px, le bas des trois tuiles est à moins de 560 px du haut de la page (test Playwright).
- Aucun texte ne chevauche l'image ; l'image n'a aucune fonction de fond.
- Chaque tuile : lien d'au moins 44 px de haut, libellé texte, icône `aria-hidden`. Destinations : `#horaires`, `/actualites/`, `/salle-des-fetes/`.
- Image d'accueil : `fetchpriority="high"`, `loading="eager"`, `width`/`height` renseignés ; variantes ≤ 200 Ko.
- Image absente ou en échec : le bloc `--fond-doux` s'affiche à la place, le reste de la page est identique (US1, scénarios 4 et 5).
- Crédit : « Photo : {auteur}, {licence}, {recadrée et compressée} » avec liens vers la licence et la source ; absent si `credit` est absent.
