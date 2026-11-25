# Feature Specification: Identité visuelle du site de la mairie d'Ajat

**Feature Branch**: `002-identite-visuelle`

**Created**: 2026-11-25

**Status**: Draft

**Input**: User description: "Identité visuelle du site de la mairie d'Ajat. Ton : chaleureux, rural, sobre, institutionnel sans être froid. Inspiration : pierre et chaux du Périgord, tons ocre, vert chêne, crème. Une typographie à caractère pour les titres, une police lisible pour le texte. Page d'accueil avec un grand visuel du village, accès rapide aux horaires, à l'actualité et à la salle des fêtes. Contraintes : contraste WCAG AA, mobile first, aucune police chargée depuis un CDN, aucune image lourde (WebP/AVIF, moins de 200 Ko)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Une première impression qui donne envie de rester, et l'essentiel à portée de main (Priority: P1)

Un habitant ou un visiteur arrive sur la page d'accueil, le plus souvent depuis un téléphone. Il voit tout de suite un grand visuel du village qui montre où il est, sent un ton chaleureux et sérieux, et trouve en un geste les trois choses qu'il vient le plus souvent chercher : les horaires d'ouverture, l'actualité et la salle des fêtes.

**Why this priority**: l'accueil est la porte d'entrée du site ; c'est là que se jouent la confiance et la rapidité d'accès. Cette seule histoire change déjà la perception du site.

**Independent Test**: ouvrir l'accueil sur un téléphone de 360 × 640 px. Le visuel du village, le titre et les trois accès rapides sont visibles sans défilement, et chaque accès mène à la bonne page en un appui.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page d'accueil, **When** la page s'affiche, **Then** il voit un grand visuel du village et le nom de la commune, dans les tons de l'identité (pierre, chaux, ocre, vert chêne, crème).
2. **Given** un visiteur sur un téléphone de 360 × 640 px, **When** la page s'affiche, **Then** les trois accès rapides (horaires, actualités, salle des fêtes) sont visibles sans faire défiler la page.
3. **Given** un visiteur qui appuie sur « Horaires », **When** la page s'ouvre, **Then** il voit les horaires d'ouverture de la mairie sans autre navigation ; « Actualités » mène à la liste des actualités et « Salle des fêtes » à la page de la salle.
4. **Given** un visuel d'accueil qui ne se charge pas, **When** la page s'affiche, **Then** le titre, les accès rapides et les coordonnées de la mairie restent lisibles, sur un fond de la palette.
5. **Given** un visiteur qui n'a pas de photo disponible pour l'accueil, **When** la page s'affiche, **Then** elle reste soignée, avec un fond de la palette à la place du visuel.

---

### User Story 2 - Un texte confortable à lire par tout le monde (Priority: P1)

Une personne âgée, une personne malvoyante ou quelqu'un qui lit en plein soleil sur son téléphone lit les pages du site sans effort : le texte est net, assez grand, bien contrasté, et la hiérarchie des titres se repère d'un coup d'œil.

**Why this priority**: le public de la commune est en grande partie âgé, et l'accessibilité est un principe non négociable du projet. Une belle identité illisible serait un échec.

**Independent Test**: parcourir l'accueil, une actualité, les horaires et la salle des fêtes avec un zoom à 200 % et sur un écran de 320 px de large, puis mesurer les contrastes ; tout reste lisible et utilisable.

**Acceptance Scenarios**:

1. **Given** n'importe quelle page, **When** un contrôle de contraste est effectué, **Then** tout texte et tout élément d'interface respecte le niveau AA (4,5 pour 1 pour le texte courant, 3 pour 1 pour le grand texte et les composants d'interface).
2. **Given** du texte placé sur le visuel d'accueil, **When** la photo change, **Then** le texte reste conforme au niveau AA, quelle que soit la zone de l'image qu'il recouvre.
3. **Given** un zoom du navigateur à 200 %, **When** la page est consultée, **Then** aucun texte n'est coupé, rien ne se chevauche et il n'y a pas de défilement horizontal.
4. **Given** un visiteur qui navigue au clavier, **When** il passe d'un lien à l'autre, **Then** l'élément actif est toujours bien visible, dans le style de l'identité.
5. **Given** un visiteur qui a activé un mode de contraste élevé de son système, **When** il consulte le site, **Then** les textes, liens et boutons restent distinguables.

---

### User Story 3 - Une identité cohérente sur tout le site (Priority: P2)

Un habitant passe de l'accueil aux actualités, aux comptes rendus, aux démarches et aux pages légales. Partout, il reconnaît le même site : mêmes couleurs, mêmes titres, mêmes boutons, mêmes encadrés.

**Why this priority**: la cohérence renforce la confiance et évite l'impression d'un site bricolé, mais elle vient après la lisibilité et l'accueil.

**Independent Test**: comparer côte à côte toutes les pages types du site (accueil, liste, article, tableau d'horaires, page légale, page introuvable) : mêmes couleurs, mêmes familles de caractères, mêmes styles de liens, boutons et encadrés.

**Acceptance Scenarios**:

1. **Given** toutes les pages du site, **When** on les compare, **Then** elles utilisent la même palette, la même typographie de titres et la même typographie de texte.
2. **Given** les éléments récurrents (boutons, liens, tableaux, listes de documents, encadrés d'alerte, pied de page), **When** on les compare d'une page à l'autre, **Then** leur apparence est identique.
3. **Given** un encadré d'information important (par exemple une fermeture exceptionnelle), **When** il s'affiche, **Then** il se distingue du reste par plus que la couleur (libellé, forme ou icône) et reste conforme au niveau AA.
4. **Given** un visiteur dont le système est réglé sur un thème sombre, **When** il consulte le site, **Then** l'identité reste reconnaissable et conforme au niveau AA.

---

### User Story 4 - Un site qui reste rapide malgré le visuel (Priority: P3)

Un habitant en zone rurale, avec une connexion lente, ouvre le site. Le visuel d'accueil ne ralentit pas la page et le texte apparaît tout de suite, même si les polices ou l'image tardent.

**Why this priority**: indispensable à la qualité du site, mais c'est une contrainte sur les autres histoires plus qu'une valeur visible en soi.

**Independent Test**: charger l'accueil sur une connexion mobile lente simulée ; le texte est lisible immédiatement, le visuel arrive ensuite, et les mesures de performance restent au niveau exigé.

**Acceptance Scenarios**:

1. **Given** une connexion mobile lente, **When** la page se charge, **Then** le texte est lisible avant la fin du chargement du visuel et sans saut de mise en page.
2. **Given** les polices de l'identité, **When** elles ne sont pas disponibles ou tardent, **Then** le site s'affiche avec des polices de remplacement proches, sans casser la mise en page.
3. **Given** l'ensemble des images du site, **When** on mesure leur poids, **Then** aucune ne dépasse 200 Ko.

---

### Edge Cases

- La photo d'accueil est très claire, très sombre ou très chargée : le texte placé dessus doit rester lisible.
- La photo d'accueil change plus tard : l'identité ne dépend pas d'une photo en particulier.
- Une image est servie à une taille d'écran très petite (320 px) ou très grande (écran large) : le visuel reste net, bien cadré et sans déformation.
- Une police personnalisée ne se charge pas : le texte reste lisible avec une police de remplacement.
- Le visiteur désactive les animations dans son système : aucune animation n'est requise pour comprendre ou utiliser le site.
- Le visiteur imprime une page : le texte reste lisible et les éléments décoratifs ne gênent pas.
- Le titre de la commune ou d'une actualité est très long : il passe à la ligne sans être coupé ni déborder.
- Aucune actualité n'est publiée : l'accès rapide « Actualités » reste utile et mène à une page claire.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le site MUST suivre une identité visuelle unique, inspirée de la pierre et de la chaux du Périgord : une palette de tons ocre, vert chêne, crème et pierre, chaleureuse et sobre.
- **FR-002**: La palette MUST définir des couleurs distinctes pour le fond, le texte, les liens, les boutons, les encadrés d'alerte et les éléments décoratifs, chacune avec un rôle précis et réutilisé partout.
- **FR-003**: Tout texte et tout élément d'interface MUST respecter au minimum le niveau AA de contraste (4,5 pour 1 pour le texte courant, 3 pour 1 pour le grand texte et les composants d'interface), y compris le texte placé sur une image.
- **FR-004**: Le site MUST utiliser une typographie à caractère pour les titres et une typographie très lisible pour le texte courant, avec une taille de base confortable sur téléphone.
- **FR-005**: Les polices MUST être servies par le site lui-même ; aucune police MUST être chargée depuis un service tiers.
- **FR-006**: Le site MUST rester lisible et mis en page correctement lorsque les polices de l'identité ne sont pas disponibles, grâce à des polices de remplacement proches.
- **FR-007**: La page d'accueil MUST présenter un grand visuel du village, accompagné du nom de la commune.
- **FR-008**: Le visuel d'accueil MUST avoir une description alternative qui dit ce qu'il montre, ou être déclaré décoratif s'il n'apporte aucune information.
- **FR-009**: La page d'accueil MUST proposer trois accès rapides visibles : horaires, actualités et salle des fêtes, chacun avec un libellé explicite et menant directement à la page correspondante.
- **FR-010**: Sur un téléphone de 360 × 640 px, le visuel, le nom de la commune et les trois accès rapides MUST être visibles sans défilement.
- **FR-011**: La page d'accueil MUST rester présentable sans visuel (image absente ou en échec de chargement), avec un fond issu de la palette.
- **FR-012**: Les éléments récurrents (boutons, liens, tableaux, listes de documents, encadrés d'alerte, navigation, pied de page) MUST avoir une apparence identique sur toutes les pages.
- **FR-013**: Aucune information MUST être transmise uniquement par la couleur ; les encadrés importants MUST se distinguer aussi par un libellé, une forme ou une icône.
- **FR-014**: Le focus clavier MUST être visible partout, dans le style de l'identité, et conforme au niveau AA.
- **FR-015**: Le site MUST rester utilisable à un zoom de 200 % et à 320 px de large, sans défilement horizontal ni texte coupé.
- **FR-016**: L'identité MUST s'adapter aux préférences du visiteur : thème sombre, contraste élevé et réduction des animations, sans perdre sa lisibilité ni ses contrastes.
- **FR-017**: Toute image du site MUST peser 200 Ko au plus, être dans un format moderne compressé (WebP ou AVIF) et être servie à plusieurs tailles pour ne pas charger sur mobile une image conçue pour grand écran.
- **FR-018**: Le visuel d'accueil MUST indiquer son auteur et sa licence lorsqu'elles l'exigent, dans un endroit accessible du site.
- **FR-019**: Le site MUST conserver ses engagements existants : aucun cookie ni traceur, aucune ressource tierce, aucun JavaScript non justifié, et des scores Lighthouse supérieurs à 90.
- **FR-020**: L'identité visuelle MUST s'appliquer à toutes les pages existantes sans en modifier le contenu ni l'organisation de l'information.

### Key Entities *(include if feature involves data)*

- **Palette**: ensemble de couleurs nommées par rôle (fond, texte, texte secondaire, lien, bouton, alerte, accent, bordure), avec une variante pour le thème sombre.
- **Typographie**: deux rôles, titres et texte courant, chacun avec ses caractéristiques (taille, graisses, interlignage) et sa police de remplacement.
- **Visuel d'accueil**: image du village avec sa description alternative, son auteur, sa licence et ses déclinaisons de tailles.
- **Accès rapide**: raccourci de l'accueil, avec un libellé, une destination et un signe distinctif (forme ou icône).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100 % des couples texte/fond et des éléments d'interface du site atteignent au moins le niveau AA de contraste, vérifié par un contrôle automatique sur toutes les pages et une relecture manuelle du texte placé sur le visuel d'accueil.
- **SC-002**: Sur un téléphone de 360 × 640 px, les trois accès rapides sont visibles sans défilement dès l'ouverture de l'accueil.
- **SC-003**: Un visiteur atteint les horaires, l'actualité ou la salle des fêtes en un seul appui depuis l'accueil, en moins de 5 secondes.
- **SC-004**: Les quatre catégories Lighthouse (performance, accessibilité, bonnes pratiques, SEO) restent supérieures à 90 en mobile sur toutes les pages types.
- **SC-005**: 100 % des images pèsent 200 Ko ou moins, et l'accueil complet se charge en moins de 1 Mo, polices et visuel compris.
- **SC-006**: Aucune requête vers un domaine tiers n'est observée sur l'ensemble des pages, polices comprises.
- **SC-007**: Aucune page n'a de défilement horizontal à 320 px de large ni à un zoom de 200 %.
- **SC-008**: Parmi au moins 5 habitants ou élus interrogés, au moins 4 décrivent le site comme « accueillant » ou « chaleureux » et en même temps « sérieux » ou « fiable ».
- **SC-009**: Sur une connexion mobile lente simulée, le texte de l'accueil est lisible en moins de 3 secondes, sans saut de mise en page à l'arrivée des polices ou du visuel.

## Assumptions

- La mairie fournit une photo du village pour l'accueil, ou une photo sous licence libre est retenue avec mention de l'auteur ; tant que ce n'est pas fait, l'accueil utilise un fond de la palette (FR-011).
- Aucun logo ni blason n'est créé dans cette fonctionnalité ; si la mairie en fournit un, il pourra s'ajouter à l'en-tête sans changer le reste.
- Les polices retenues ont une licence qui permet de les héberger sur le site, et seules les graisses et les caractères nécessaires au français sont fournis.
- Le thème sombre déjà présent est conservé et adapté à la nouvelle palette (US3, scénario 4).
- Les contenus, l'organisation des rubriques et les fonctionnalités du site (spec 001) ne changent pas ; seule leur présentation évolue.
- La navigation principale compte aujourd'hui huit entrées ; sa présentation sur téléphone peut évoluer pour libérer de la place au visuel, sans supprimer d'entrée.
- Le test de perception (SC-008) se fait de manière informelle, auprès d'élus et d'habitants volontaires.
- Les principes de la constitution (accessibilité, mobile first, performance, aucun traceur, site statique) s'appliquent sans exception.
