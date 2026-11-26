# Research : personnalité du site de la mairie d'Ajat

L'audit (R0) et la direction (R1) précèdent tout choix technique (constitution 1.2.0, principe X). **Les quatre points de R1 n'ont pas reçu de réponse** : R2 retient par défaut les recommandations afin de produire le plan et les tâches ; chacune se change avant l'implémentation, au prix d'une retouche de R3 à R7.

## R0. Audit unslop de l'accueil, d'une liste et d'un article

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

## R1. Direction en cinq lignes (à valider)

- **Produit** : le site de la mairie d'Ajat, 307 habitants en Dordogne ; il sert d'abord ses habitants, souvent âgés, qui veulent savoir quand et comment joindre la mairie, puis les visiteurs du village.
- **Caractère** : accueillant, solide, fier de son village ; ni moderne, ni épuré, ni premium. Des titres à empattements robustes (Fraunces, déjà installée), les chiffres d'affichage dans cette même voix pour supprimer le zéro barré sans nouvelle dépendance, un texte courant très lisible, des polices toujours auto-hébergées.
- **Monde** : la pierre calcaire blonde, les toits de tuiles brunes, l'ardoise du château, l'église Saint-Martin, le panneau d'affichage de la mairie ; surfaces en neutres chauds teintés pierre blonde, un seul accent tiré de la tuile brune, plus de vert chêne en surface.
- **Moments** (deux au plus) : la photo du bourg avec « Ajat » posé sur une plaque pleine, à la façon d'un panneau et sans dégradé (principe X) ; le bloc « La mairie » traité comme une affiche du panneau d'affichage : une phrase d'horaires, le téléphone et l'adresse. Tout le reste reste calme.
- **Signature** (un seul, utilisé une fois par page) : trois pistes, **recommandation B**. A. Les trois forces (cisailles) du blason en séparateur ; dépend du statut encore non confirmé du blason. **B. Le clocher-pignon de l'église Saint-Martin, silhouette plate en brun tuile, qui remplace le filet ocre** : lisible dès l'écran, propre à Ajat, sans lien avec le blason. C. Les trois besants du blason en points de liste ; trop discret.

### Points à valider avant d'écrire les jetons
1. **Accent** : brun tuile à la place du vert chêne, avec le vert gardé seulement pour un éventuel état « ouverte » ?
2. **Chiffres** : chiffres d'affichage en Fraunces (aucune nouvelle dépendance), texte courant en Atkinson (le zéro barré y reste dans les phrases, par exemple une année) ; ou changer aussi la police du texte, ce qui demande d'héberger de nouveaux fichiers de police sans paquet npm ?
3. **Signature** : B (clocher Saint-Martin), A (forces du blason) ou autre ?
4. **Test de substitution renforcé** : au moins trois éléments qui ne sont ni le nom ni des coordonnées ?

## R2. Décisions retenues par défaut (à confirmer)

| Point | Retenu | Pourquoi |
|---|---|---|
| 1. Accent | **brun tuile** à la place du vert chêne ; plus de vert en surface | la tuile est dans le paysage et sur la photo ; le vert chêne n'évoquait rien de local |
| 2. Chiffres | **Fraunces** pour tous les chiffres d'affichage (téléphone, horaires, dates, code postal) ; texte courant en Atkinson | aucune nouvelle dépendance ni fichier : Fraunces 600 est déjà chargée ; le zéro barré ne reste que dans les phrases |
| 3. Signature | **B, le clocher-pignon de l'église Saint-Martin**, silhouette plate | indépendante du statut du blason, lisible en petit |
| 4. Test de substitution | **renforcé** : au moins trois éléments qui ne sont ni le nom ni des coordonnées | l'ancien test passait sur la lettre |

## R3. Palette « pierre, tuile, ardoise »

Contrastes calculés (formule WCAG) ; tous les couples de texte passent AA :

| Rôle | Clair | Sombre |
|---|---|---|
| Fond (chaux, pierre claire) | `#f7f1e4` | `#1c1812` |
| Fond doux (pierre blonde) | `#e9ddc3` | `#272118` |
| Texte | `#2a2319` (13,8) | `#f1eadb` (14,8) |
| Texte doux | `#5b503e` (7,0) | `#bdb3a0` (8,5) |
| Tuile (accent : liens, boutons, signature) | `#8b3a1f` (6,9 sur fond ; 5,7 sur fond doux) | `#e39a74` (7,7) |
| Texte sur tuile | `#fbf6ec` (7,2) | `#1c1812` (7,7) |
| Ardoise (plaque du nom, étiquettes) | `#2e3640`, texte `#fbf6ec` (11,4) | `#3a4652`, texte `#f1eadb` (8,1) |
| Alerte | fond `#f5e1b8`, bord `#8a5a00` (5,3) | fond `#3a2d12`, bord `#e3b05a` (8,9) |
| Focus | `#214e7e` (7,6) | `#9cc4f0` (9,7) |
| Bordure de composant (3:1) | `#7e6f52` (4,4 ; 3,6 sur fond doux) | `#8f8570` (4,8) |

Retirés : `--chene`, `--chene-texte`, `--ocre-texte`, `--ocre-deco`. L'ardoise et la tuile ne se superposent jamais (1,6:1) : le texte de la plaque est crème.

## R4. Composition de l'accueil

- **Ordinateur** (conteneur large de 72 rem) : photo pleine largeur avec la plaque « Ajat » ; dessous, deux zones côte à côte de largeurs différentes, **La mairie** (affiche) à gauche, **À la une** (dernière actualité) à droite ; puis **Le village** (texte local et un lien vers « Découvrir Ajat ») ; puis une phrase de liens courants (démarches, associations, salle des fêtes, comptes rendus), une fois chacun. Aucune grille de blocs identiques, aucune icône.
- **Téléphone** : photo basse (environ 200 px) avec la plaque, puis l'affiche « La mairie » : phrase d'horaires et téléphone visibles à 360 × 640 px sans défilement ; le reste s'empile.
- **Liens** : une seule occurrence par destination dans le contenu principal ; la navigation n'est pas comptée (principe X).
- **Plaque** : bloc plein ardoise, texte crème, posé sur la photo (bas gauche) ; le contraste ne dépend pas de la photo ; aucun dégradé.
- **Crédit** : texte de 12 px en bas à droite de la photo, sans bande.

## R5. Phrase d'horaires

Fonction pure `phraseHoraires(hours, closures, note)` : regroupe les jours aux plages identiques, ordre de la semaine ; « le » devant chaque jour ; plages « de 9 h à 12 h et de 14 h à 17 h ». Exemple pour les données actuelles : « Ouverte le mardi, le jeudi et le vendredi, de 14 h à 17 h. » Fermeture à venir ou en cours : ajoutée en fin de phrase avec ses dates. Aucun « ouvert maintenant » (site statique). Détail et cas limites : [contracts/phrase-horaires.md](./contracts/phrase-horaires.md).

## R6. Chiffres sans zéro barré

Classe `.chiffres` : Fraunces 600, `font-variant-numeric: lining-nums tabular-nums`, appliquée au téléphone, aux heures, aux dates et au code postal. Aucune dépendance : Fraunces est déjà préchargée. Contrôle : test Playwright sur la police calculée des éléments concernés et revue de captures. **Retour d'usage (2026-11-26)** : le numéro de téléphone en Fraunces gras était peu lisible (chiffres serrés). Comparaison de trois rendus : police du système en 700, espacée, retenue (zéro ordinaire, aucun octet de police en plus) ; Atkinson 700 écartée (zéro barré). Classe `.numero`, jeton `--police-numero`. Les dates et la phrase d'horaires restent en Fraunces.

**Limite** : un « 0 » dans une phrase de texte courant (une année) reste en Atkinson ; si ce n'est pas acceptable, il faut une nouvelle police de texte (fichiers hébergés, sans paquet npm).

## R7. Détail signature : le clocher de Saint-Martin

Silhouette plate d'un clocher-pignon (pignon pointu, deux baies), tracée une fois en SVG (≤ 2 Ko, une seule couleur), utilisée **une fois par page, sous le titre**, à la place du filet ocre : masque appliqué à un bloc de couleur tuile, aucune requête de plus ni JavaScript. Remplace aussi toute autre décoration de titre.

## R8. Contrôles

`scripts/check-identite.mjs` : aucun dégradé (`gradient(`) dans les styles, composants et pages ; aucun des mots « moderne », « épuré », « premium » dans les textes du site. `tests/home-liens.spec.ts` : une occurrence par destination dans `main` ; pas de tuiles. Tests de chiffres, de plaque et de page « La mairie ». `check-contrast.mjs` mis à jour pour les nouveaux jetons.

## R9. Impact sur les budgets

Aucune dépendance ni police ajoutée ; HTML et CSS de l'accueil à peu près inchangés ; un SVG de 2 Ko ; le tableau d'horaires quitte l'accueil (moins de DOM). Budget attendu : accueil ≤ 120 Ko sur téléphone (72 Ko aujourd'hui).
