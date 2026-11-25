# Feature Specification: Personnalité du site de la mairie d'Ajat

**Feature Branch**: `003-personnalite-du-site`

**Created**: 2026-11-26

**Status**: Draft

**Input**: User description: "Personnalité du site de la mairie d'Ajat. Le site actuel ressemble à un gabarit : une colonne étroite, un titre posé sous la photo, des boutons beiges identiques, les mêmes liens répétés trois fois, un tableau d'horaires de 7 lignes dont 4 « Fermé », des chiffres au zéro barré qui font technique. Direction : accueillant, solide, fier de son village ; les mots « moderne », « épuré » et « premium » sont interdits. Univers : pierre calcaire blonde du Périgord, toits de tuiles brunes, le château et l'église, le panneau d'affichage de la mairie. Moments forts (deux au maximum) : la photo du village avec le nom de la commune posé dessus, et un bloc « La mairie » lisible en 3 secondes (ouvert quand, téléphone, adresse). Détail signature : un seul élément tiré d'Ajat, utilisé avec retenue (à proposer au plan). Attendus : l'accueil utilise la largeur sur ordinateur ; sur téléphone, horaires et téléphone juste sous la photo ; horaires en une phrase sur l'accueil, tableau détaillé sur sa page ; hors navigation, chaque lien une seule fois sur l'accueil ; chiffres d'affichage sans zéro barré ; crédit photo discret. Succès : test de substitution (au moins trois éléments de l'accueil deviennent faux pour un autre village), audit unslop sans aucun signe, npm run check vert."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Savoir en trois secondes quand la mairie est ouverte et comment la joindre (Priority: P1)

Un habitant arrive sur l'accueil, le plus souvent depuis un téléphone. Juste sous la photo du village, il lit en une phrase quand la mairie est ouverte, voit le numéro de téléphone et l'adresse, sans défiler ni chercher dans un tableau.

**Why this priority**: c'est la raison de visite numéro un d'un site de mairie rurale, et le défaut le plus visible aujourd'hui : un tableau de 7 lignes dont 4 « Fermé » cache l'information utile.

**Independent Test**: ouvrir l'accueil sur un téléphone de 360 × 640 px ; sans défiler, lire les jours et heures d'ouverture, le téléphone et l'adresse, et demander à 5 personnes de les retrouver en moins de 3 secondes.

**Acceptance Scenarios**:

1. **Given** un visiteur sur téléphone (360 × 640 px), **When** l'accueil s'affiche, **Then** les horaires d'ouverture en une phrase, le téléphone et l'adresse sont visibles juste sous la photo, sans défilement.
2. **Given** des horaires où plusieurs jours partagent les mêmes plages, **When** la phrase est affichée, **Then** elle regroupe ces jours (par exemple « mardi, jeudi et vendredi, de 14 h à 17 h ») au lieu d'énumérer les sept jours.
3. **Given** une fermeture exceptionnelle à venir, **When** la phrase des horaires est affichée, **Then** la fermeture est signalée à côté, avec ses dates, en plus du libellé et pas seulement par la couleur.
4. **Given** une mairie fermée tous les jours (horaires vides), **When** l'accueil s'affiche, **Then** le bloc le dit clairement et invite à téléphoner, sans phrase vide.
5. **Given** le bloc « La mairie », **When** le visiteur appuie sur le numéro de téléphone, **Then** l'appel est proposé.

---

### User Story 2 - Reconnaître Ajat au premier regard (Priority: P1)

Une personne ouvre l'accueil et comprend tout de suite que c'est le site du village d'Ajat : la photo du village occupe l'écran avec le nom de la commune posé dessus, dans l'univers de la pierre blonde, des tuiles brunes, du château et de l'église.

**Why this priority**: c'est le sujet de la fonctionnalité. Un site qui conviendrait à n'importe quelle commune ne dit rien du lieu.

**Independent Test**: faire le test de substitution : remplacer mentalement « Ajat » par un autre village et compter les éléments de l'accueil qui deviennent faux ; il y en a au moins trois.

**Acceptance Scenarios**:

1. **Given** l'accueil, **When** il s'affiche, **Then** le nom « Ajat » est posé sur la photo du village et reste lisible au niveau AA, quelle que soit la zone de la photo qu'il recouvre.
2. **Given** l'accueil, **When** on le regarde en entier, **Then** il n'y a que deux moments forts : la photo avec le nom, et le bloc « La mairie ». Tout le reste reste calme.
3. **Given** l'accueil, **When** on repère ce qui vient d'Ajat, **Then** on y trouve au moins : la photo du bourg, le nom et le blason, les coordonnées et horaires de la mairie, le détail signature, et un texte local (château, église ou bourg).
4. **Given** un autre village, **When** on remplace le nom, **Then** au moins trois éléments de l'accueil deviennent faux.
5. **Given** l'accueil, **When** on lit ses textes, **Then** ni « moderne », ni « épuré », ni « premium » n'y figurent.

---

### User Story 3 - Un accueil qui respire sur ordinateur et qui ne se répète pas (Priority: P2)

Sur un grand écran, l'accueil occupe la largeur disponible au lieu de rester dans une colonne étroite. Les raccourcis et les listes ne répètent pas les liens déjà présents dans la navigation ni entre eux, et ne forment pas une rangée de boutons identiques.

**Why this priority**: c'est le sentiment de gabarit le plus fort aujourd'hui (colonne étroite, trois liens répétés, boutons beiges identiques) ; il demande une recomposition de la page, après les deux premières histoires.

**Independent Test**: ouvrir l'accueil à 1280 px de large, puis compter les liens hors navigation : chaque destination n'apparaît qu'une fois.

**Acceptance Scenarios**:

1. **Given** un écran de 1280 px, **When** l'accueil s'affiche, **Then** la composition s'étend sur la largeur (plusieurs zones côte à côte) et non dans une colonne unique de 46 rem.
2. **Given** l'accueil, **When** on liste ses liens hors en-tête, navigation et pied de page, **Then** chaque destination n'apparaît qu'une fois.
3. **Given** l'accueil, **When** on le compare à la rangée de trois tuiles identiques actuelle, **Then** il n'y a plus de rangée ni de grille de blocs de même forme et de même structure.
4. **Given** l'accueil, **When** on cherche des icônes de décoration, **Then** il n'y en a aucune ; une icône n'existe que pour une fonction.
5. **Given** un écran de 768 px (tablette), **When** l'accueil s'affiche, **Then** la composition reste lisible et ne passe pas brutalement de la colonne unique à la grande largeur.

---

### User Story 4 - Des chiffres lisibles sans effet technique (Priority: P2)

Une personne âgée lit le téléphone, les horaires et les dates ; les chiffres sont nets, avec un zéro ordinaire, sans zéro barré qui donne une impression de code informatique.

**Why this priority**: c'est un défaut ressenti partout (téléphone, horaires, dates, code postal), simple à constater et qui pèse sur le caractère « accueillant ».

**Independent Test**: relire sur captures le numéro de téléphone, les horaires, une date et le code postal : aucun zéro n'est barré.

**Acceptance Scenarios**:

1. **Given** le numéro de téléphone affiché, **When** on le regarde, **Then** aucun zéro n'est barré.
2. **Given** des horaires, des dates et un code postal, **When** on les regarde, **Then** aucun zéro n'est barré.
3. **Given** la lisibilité pour la basse vision, **When** la forme des chiffres change, **Then** les zéros et la lettre O restent distinguables et les principes d'accessibilité restent tenus.

---

### User Story 5 - Les horaires complets sur leur page (Priority: P3)

Une personne qui veut le détail jour par jour, les fermetures et les remarques ouvre une page « La mairie » qui garde le tableau complet, avec les coordonnées et l'accès.

**Why this priority**: l'accueil n'a plus besoin du tableau, mais le détail doit rester accessible et cité une seule fois.

**Independent Test**: depuis l'accueil, atteindre le tableau détaillé des horaires en un appui, et vérifier que le tableau n'apparaît plus sur l'accueil.

**Acceptance Scenarios**:

1. **Given** l'accueil, **When** le visiteur veut le détail des horaires, **Then** un seul lien l'amène sur la page « La mairie ».
2. **Given** la page « La mairie », **When** elle s'affiche, **Then** elle contient le tableau jour par jour, les fermetures exceptionnelles, les remarques, le téléphone, l'adresse et l'accès.
3. **Given** une modification des horaires, **When** elle est publiée, **Then** la phrase de l'accueil et le tableau de la page « La mairie » se mettent à jour ensemble, à partir d'une seule saisie.

---

### Edge Cases

- La photo d'accueil est remplacée par une autre, très claire, très sombre ou très chargée : le nom posé dessus reste lisible au niveau AA.
- La photo ne se charge pas : le nom de la commune, le bloc « La mairie » et le reste de l'accueil restent lisibles sur un fond de la palette.
- Les horaires sont vides, ou la mairie n'est ouverte qu'un jour : la phrase s'accorde et reste correcte.
- Les horaires comportent deux plages dans une même journée, ou des jours aux plages différentes : la phrase reste une phrase lisible, pas une liste de sept éléments.
- Une fermeture exceptionnelle est en cours, ou vient de se terminer : la phrase la signale tant qu'elle est à venir ou en cours, puis elle disparaît.
- Écran très étroit (320 px) ou zoom à 200 % : rien n'est coupé, pas de défilement horizontal.
- Le nom de la commune, très long ou dans une police de repli : il passe à la ligne sans sortir de son bloc.
- Un visiteur n'utilise que le clavier ou un lecteur d'écran : le bloc « La mairie » et ses liens restent atteignables et compris dans le bon ordre.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: L'accueil MUST afficher le nom de la commune posé sur la photo du village, avec un contraste de niveau AA quelle que soit la photo, sans dégradé (principe X de la constitution).
- **FR-002**: L'accueil MUST proposer un bloc « La mairie » qui donne, en une lecture de trois secondes, quand la mairie est ouverte, son téléphone et son adresse.
- **FR-003**: Sur un téléphone de 360 × 640 px, les horaires, le téléphone et l'adresse MUST être visibles juste sous la photo, sans défilement.
- **FR-004**: Les horaires de l'accueil MUST tenir en une seule phrase construite à partir de la saisie des horaires (jours regroupés par plages identiques), et MUST signaler une fermeture exceptionnelle à venir ou en cours.
- **FR-005**: Le tableau détaillé des horaires MUST ne plus figurer sur l'accueil ; il MUST rester sur une page « La mairie », avec les fermetures, les remarques, le téléphone, l'adresse et l'accès.
- **FR-006**: La phrase de l'accueil et le tableau de la page « La mairie » MUST provenir de la même saisie des horaires, sans double saisie.
- **FR-007**: L'accueil MUST ne comporter que deux moments forts (la photo avec le nom, le bloc « La mairie ») ; le reste MUST rester sobre.
- **FR-008**: Sur ordinateur, l'accueil MUST utiliser la largeur disponible, avec une composition en plusieurs zones et non une colonne étroite unique.
- **FR-009**: Hors en-tête, navigation et pied de page, chaque destination de lien MUST n'apparaître qu'une seule fois sur l'accueil.
- **FR-010**: L'accueil MUST ne comporter aucune grille ni rangée de trois blocs ou plus de même forme et de même structure, aucun dégradé, aucune icône de décoration et aucun pastiche d'ancien (principe X).
- **FR-011**: Le caractère MUST être « accueillant, solide, fier de son village », tiré de l'univers de la pierre calcaire blonde, des toits de tuiles brunes, du château, de l'église et du panneau d'affichage de la mairie ; les mots « moderne », « épuré » et « premium » MUST ne figurer dans aucun texte du site.
- **FR-012**: L'accueil MUST contenir un détail signature unique, tiré d'Ajat et utilisé avec retenue ; le plan en propose le choix.
- **FR-013**: Les chiffres d'affichage (téléphone, horaires, dates, code postal) MUST ne pas avoir de zéro barré, tout en gardant les zéros et la lettre O distinguables.
- **FR-014**: Le crédit de la photo MUST rester présent (auteur, licence CC BY-SA, mention de modification, lien vers la source) tout en étant discret.
- **FR-015**: Le site MUST conserver les engagements des principes I à IX de la constitution : accessibilité AA, mobile first, budgets de poids et de requêtes, aucun traceur, aucun JavaScript non justifié, scripts de contrôle verts.
- **FR-016**: Un audit `unslop` de l'accueil actuel MUST être réalisé et consigné **avant** toute écriture de code, puis refait à la fin : le dernier audit MUST ne relever aucun signe (principe X, audit avant code).
- **FR-017**: Le test de substitution MUST être consigné pour l'accueil : la liste des éléments qui deviennent faux si l'on remplace « Ajat » par un autre village, d'au moins trois éléments.

### Key Entities *(include if feature involves data)*

- **Phrase d'horaires**: texte court dérivé des horaires et des fermetures de la mairie ; jamais saisi à la main ; regroupe les jours aux plages identiques.
- **Page « La mairie »**: coordonnées, tableau jour par jour, fermetures, remarques et accès ; source unique des horaires déjà saisis.
- **Moment fort**: un des deux éléments riches de l'accueil (photo avec le nom ; bloc « La mairie »).
- **Détail signature**: élément graphique ou textuel unique, propre à Ajat, repris avec retenue.
- **Test de substitution**: liste consignée des éléments de l'accueil propres à Ajat, avec la preuve qu'ils deviennent faux pour un autre village.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Au test de substitution, au moins trois éléments de l'accueil (par exemple la photo du bourg, le nom et le blason, les coordonnées de la mairie, le détail signature) deviennent faux si l'on remplace « Ajat » par un autre village.
- **SC-002**: Le dernier audit `unslop` de l'accueil ne relève plus aucun signe, alors que l'audit de départ en relevait.
- **SC-003**: `npm run check` reste vert : contrastes, images, contenu, budgets de poids, accessibilité, aucun traceur.
- **SC-004**: Sur 5 personnes, au moins 4 retrouvent en moins de 3 secondes quand la mairie est ouverte, le téléphone et l'adresse depuis l'accueil sur téléphone.
- **SC-005**: Sur un téléphone de 360 × 640 px, les horaires en une phrase, le téléphone et l'adresse sont visibles sans défilement.
- **SC-006**: Sur l'accueil, hors en-tête, navigation et pied de page, 0 destination de lien n'apparaît plus d'une fois.
- **SC-007**: À 1280 px, la composition de l'accueil occupe la largeur (plusieurs zones côte à côte) et ne laisse pas de colonne unique étroite.
- **SC-008**: Sur captures, 0 zéro barré sur le téléphone, les horaires, les dates et le code postal.
- **SC-009**: Le texte posé sur la photo atteint un contraste d'au moins 4,5 pour 1 avec la photo actuelle et avec deux photos de test, l'une très claire et l'autre très sombre.
- **SC-010**: 0 occurrence de « moderne », « épuré » ou « premium » dans les textes du site.
- **SC-011**: Le site reste dans les budgets de la constitution : accueil 120 Ko au plus sur téléphone, 10 requêtes au plus, trois fichiers de polices au plus, Lighthouse supérieur à 90.

## Assumptions

- Les horaires, l'adresse et le courriel restent ceux de `mairie.yml`, encore à confirmer par la mairie ; la fonctionnalité n'en change pas le contenu.
- La photo d'accueil et son crédit sont ceux de la spec 002 (« Ajat bourg », CC BY-SA 4.0), remplaçables plus tard par une photo de la mairie.
- Le blason reste celui de Wikimedia Commons tant que la mairie ne confirme pas ou ne fournit pas son logo.
- L'accueil n'affiche pas « ouverte maintenant » : le site est statique, une indication calculée à la construction serait fausse en cours de journée ; la phrase donne les jours et heures d'ouverture.
- Une page « La mairie » est créée pour porter le tableau détaillé : aujourd'hui le tableau n'existe que sur l'accueil.
- La forme des chiffres (zéro ordinaire) peut conduire à changer la police du texte ; le plan tranche, sans perdre en lisibilité pour la basse vision.
- Le détail signature est proposé au plan, avec trois pistes et une recommandation (par exemple un élément du blason, du château ou de l'église) ; il reste unique.
- L'audit `unslop` de départ est le premier livrable du plan (`audit-unslop.md`), avant tout code, comme l'exige la constitution 1.2.0.
- Les contenus des autres pages (démarches, actualités, comptes rendus, etc.) ne sont pas refaits ici ; la mise en conformité du principe X sur ces pages est traitée par le plan si elle touche les composants partagés (cartes, listes).
- Les principes de la constitution (accessibilité, mobile first, performance, aucun traceur, sobriété, identité propre) s'appliquent sans exception.
