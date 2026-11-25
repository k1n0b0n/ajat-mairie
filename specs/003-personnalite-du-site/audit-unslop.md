# Audit unslop (principe X)

Audit de départ de l'accueil, d'une liste et d'un article, consigné avant tout code. La direction qui en découle est dans [research.md](./research.md) (R1). L'audit final, qui doit ne relever aucun signe, sera ajouté en fin de spécification.

## Audit de départ

**Méthode** : skill `unslop`, liste de signes de `references/signs.md` (toutes les catégories) passée sur le serveur de dev
(`npm run dev`), pages `/` (accueil), `/demarches/` (liste) et `/actualites/ouverture-du-nouveau-site/` (article), à 1280 px et
360 px, thème clair, plus des mesures sur le DOM et le CSS (liens du contenu principal, largeur de colonne, motifs CSS).
Constitution 1.2.0, principe X : cet audit précède tout code. **19 signes relevés** (A = accueil, L = liste, R = article).

### Mise en page et hero
1. **Tout empilé dans une colonne étroite** (A, L, R) : colonne de 736 px sur 1280 px, soit 22 % de marge vide de chaque côté ; l'accueil ne profite pas de la largeur → plusieurs zones sur l'accueil, mesure de lecture gardée pour l'article.
2. **Titre posé sous la photo, pas dans elle** (A) : le h1 « Mairie d'Ajat » vient après une bande de crédit beige → le nom sur la photo (moment fort 1).
3. **Titre qui irait à n'importe quelle commune** (A) : h1 « Mairie d'Ajat » et accroche « Horaires, démarches, actualités et vie de la commune d'Ajat, en Dordogne », qui énumère les rubriques de la navigation → dire ce qu'est Ajat.
4. **Le nom répété quatre fois** (A) : en-tête, h1, première ligne du bloc d'adresse, pied de page « Mairie d'Ajat · Dordogne ».
5. **Trois boutons sous le hero** (A) : les tuiles Horaires, Actualités et Salle des fêtes → pas de boutons ; le moment fort « La mairie » les remplace.
6. **Rien ne passe avant le reste** (A) : toutes les sections ont le même poids (h2 + bloc) ; le téléphone, seul élément coloré, vient après deux titres et une rangée de boutons → une hiérarchie : photo, puis bloc « La mairie », le reste calme.

### Composants
7. **Blocs égaux côte à côte ou empilés** : 3 tuiles identiques (A), 4 barres identiques « Infos pratiques » (A), 5 cartes identiques (L), cartes d'actualité du même gabarit (A) → aucune grille de blocs de même forme (principe X) ; une liste se distingue par son contenu.
8. **Liens répétés** (A) : `/actualites/` ×2 et `/salle-des-fetes/` ×2 dans le contenu principal, plus la navigation (trois fois en tout) ; démarches, associations et comptes rendus : navigation + « Infos pratiques » → une occurrence par destination hors navigation.
9. **Icônes génériques en décoration** (A) : horloge, journal et maison dans les tuiles → aucune icône de décor.
10. **Tableau de 7 lignes dont 4 « Fermé »** (A) : l'information utile est noyée → une phrase ; le tableau reste sur sa page.
11. **Crédit photo en bande beige pleine largeur** (A) : trois liens sur une bande de 24 à 48 px entre la photo et le titre → discret.
12. **En-tête sur deux rangées** (A, L, R) : la marque seule en haut, huit entrées en gras égales dessous, soit 120 px avant tout contenu sur ordinateur → plus sobre.

### Typographie et chiffres
13. **Chiffres au zéro barré** (A, R) : Atkinson donne « 05 53 05 25 28 », « 24210 » et « 25 novembre 2026 » un air de code ; la police est choisie pour la basse vision, le caractère est technique → chiffres d'affichage dans une autre voix.
14. **Graisse 700 sur tout ce qui est cliquable ou étiqueté** (A, L, R) : navigation, liens de liste, tuiles, en-têtes de tableau (9 règles) ; la hiérarchie vient de la graisse plutôt que de la taille et de la couleur → quelques graisses, hiérarchie par la taille.
15. **Même filet ocre sous chaque h1** (A, L, R) : décor identique partout, sans lien avec Ajat → remplacé par le détail signature, utilisé une fois.

### Couleur et signature
16. **Palette sans lien avec le lieu** (A, L, R) : crème, vert chêne, ocre ; ni la pierre blonde ni la tuile brune n'y apparaissent, seule la photo porte Ajat → une rampe neutre teintée pierre blonde, un accent tiré de la tuile brune.
17. **Composition de gabarit « mairie »** (A) : photo, titre, accroche, boutons puis sections empilées ; il suffit de changer le nom pour qu'elle convienne à une autre commune → composition propre à Ajat.

### Pages liste et article
18. **Article** (R) : titre, date, trois paragraphes ; colonne vide à droite et vide sous le texte ; aucun élément local hors blason de l'en-tête → un repère propre à Ajat, une mesure de lecture soignée.
19. **Liste** (L) : cartes de même gabarit empilées, sans repère de date, de lieu ni de type, et un lien isolé « Voir aussi les liens utiles » → liste par entrées différenciées par leur contenu.

### Non relevés (à garder)
Aucun dégradé (0 `gradient(` dans le CSS), aucune lueur ni ombre colorée (3 `box-shadow` en repère de page courante), aucun emoji, aucun texte en dégradé, aucune animation, aucun point d'exclamation, aucun mot d'accroche creux (« révolutionnaire »…), aucune étiquette en capitales espacées. À garder : la vraie photo du bourg, le blason, Fraunces pour les titres, le contraste AA vérifié par script, les jetons de couleur, la phrase unique de crédit.

### Test de substitution de l'accueil actuel
Éléments propres à Ajat : la photo, le blason, le nom, le téléphone et l'adresse (cinq). Éléments qui survivent tels quels dans n'importe quelle commune : accroche, tuiles, tableau des horaires, « Infos pratiques », bloc d'actualités (cinq blocs sur huit). Le test de la spec passe sur la lettre mais seules la photo et le blason portent un caractère : **proposition de le renforcer** en exigeant au moins trois éléments qui ne sont ni le nom ni des coordonnées.

## Audit final

Refait après la mise en œuvre (passes espacement, couleur, icônes, textes, typographie, mise en page, détails, visuels), avec la même liste de signes de `references/signs.md`, sur l'accueil, une liste (`/demarches/`) et un article (`/actualites/ouverture-du-nouveau-site/`), à 360 px et 1280 px, en clair et en sombre pour l'accueil. **Aucun signe relevé** (0 sur 19 au départ).

| Catégorie | Constat | Preuve |
|---|---|---|
| Surfaces et couleur | aucun dégradé, aucune lueur ni ombre colorée, aucune bordure vive ; trois rôles de texte, un accent (tuile) | `scripts/check-identite.mjs`, `scripts/check-contrast.mjs` |
| Typographie | Fraunces pour les titres et les chiffres d'affichage, Atkinson pour le texte ; aucune capitale espacée, aucun italique ; plus de zéro barré sur les chiffres d'affichage | `tests/chiffres.spec.ts`, captures |
| Icônes | aucune icône de décor ; seule l'icône du bouton « Menu » reste, avec son libellé | `tests/home-liens.spec.ts` |
| Espacement | échelle de 4 px (`--e1` à `--e7`) | passe 1 |
| Textes | pas de titre générique : « Ajat », « Dordogne », « La mairie », phrase d'horaires, texte local ; aucun des mots interdits | `scripts/check-identite.mjs` |
| Composants | plus de tuiles, de barres ni de cartes identiques ; listes en filets ; affiche, une et village de formes différentes | `tests/home-liens.spec.ts` |
| Hero et mise en page | accueil en zones inégales sur 72 rem, nom sur la photo, une seule occurrence par destination de lien | `tests/home-liens.spec.ts`, `tests/identite.spec.ts` |
| Visuels | une vraie photo du bourg ; crédit en pastille discrète | captures |
| Animation | aucune | — |
| Signature | le clocher de Saint-Martin, une fois sous chaque titre de page | captures |

**Points de vigilance, pas des signes** : l'accent tuile sert aussi à tous les liens ; la graisse 700 reste sur les boutons et les en-têtes de tableau ; un « 0 » dans une phrase de texte courant (une année) reste en Atkinson (research.md R6).
