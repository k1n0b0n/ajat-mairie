# Contrat : composition de l'accueil

Ordre dans le HTML, zones par largeur d'écran. Rien n'y est une grille de blocs identiques, ni une icône de décor.

## Zones

1. **Photo et plaque** : photo pleine largeur (variantes de la spec 002) ; **plaque** pleine ardoise, texte crème, posée en bas à gauche : « Ajat » (nom réel dans la page, `h1`) et « Dordogne » ; crédit de 12 px en bas à droite de la photo, sans bande.
2. **La mairie** (affiche, moment fort 2) : phrase d'horaires, téléphone (`.chiffres`, lien `tel:`), adresse, **un** lien « Tous les horaires » vers `/la-mairie/`.
3. **À la une** : la dernière actualité (titre en lien, date en `.chiffres`, résumé) et **un** lien « Toutes les actualités ».
4. **Le village** : texte de `accueil.yml` et **un** lien vers « Découvrir Ajat ».
5. **Dans la commune** : une phrase de liens, chacun **une fois** : démarches, associations, salle des fêtes, comptes rendus.

## Par largeur

| Largeur | Photo | Zones 2 et 3 | Zones 4 et 5 |
|---|---|---|---|
| 320 à 767 px | ≈ 200 px de haut, plaque réduite | empilées ; l'affiche juste sous la photo | empilées |
| ≥ 768 px | 3:1, pleine largeur | côte à côte, largeurs inégales (≈ 5/12 et 7/12) | côte à côte puis pleine largeur |
| ≥ 1200 px | conteneur de 72 rem | idem | idem |

## Exigences vérifiables

- À 360 × 640 px, la phrase d'horaires et le lien `tel:` sont visibles et leur bas est à moins de 560 px du haut de la page.
- Dans `main`, chaque destination de lien apparaît **une seule fois** ; la navigation, l'en-tête et le pied de page ne sont pas comptés.
- Aucun `<table>`, aucune tuile (`.tuiles`), aucun `svg` décoratif (`aria-hidden`) dans `main`.
- La plaque a un fond opaque et un contraste texte/fond ≥ 4,5 ; aucun `gradient(` dans les styles.
- À 1280 px, `main` occupe plus de 60 % de la largeur (pas de colonne unique de 46 rem).
- Aucun des mots « moderne », « épuré », « premium ».
