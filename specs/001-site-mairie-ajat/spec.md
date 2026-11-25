# Feature Specification: Site web de la mairie d'Ajat

**Feature Branch**: `001-site-mairie-ajat`

**Created**: 2026-11-25

**Status**: Draft

**Input**: User description: "Site web de la mairie d'Ajat (Dordogne), commune rurale. Habitants : horaires, téléphone et adresse de la mairie ; actualités ; comptes rendus du conseil municipal (PDF) ; démarches courantes et liens utiles ; associations et contacts ; conditions et tarifs de location de la salle des fêtes. Visiteurs : découvrir le village, son patrimoine et ses environs. Rédacteur (conseil municipal) : publier une actualité, ajouter un compte rendu PDF et modifier les horaires depuis un formulaire, sans toucher au code ni à Git ; enregistrer en brouillon et relire avant mise en ligne. Hors périmètre : paiement en ligne, espace citoyen avec comptes, réservation en ligne de la salle, forum."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Joindre la mairie (Priority: P1)

Un habitant arrive sur le site depuis son téléphone et cherche quand la mairie est ouverte, son numéro de téléphone et son adresse.

**Why this priority**: c'est la première raison de visite d'un site de mairie rurale ; à elle seule elle rend le site utile.

**Independent Test**: ouvrir la page d'accueil sur un téléphone et vérifier que les horaires, le téléphone et l'adresse sont visibles sans navigation supplémentaire, le numéro étant appelable d'un appui.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la page d'accueil, **When** la page s'affiche, **Then** les horaires d'ouverture, le téléphone et l'adresse de la mairie sont visibles sans défilement excessif ni clic.
2. **Given** un visiteur sur un téléphone, **When** il appuie sur le numéro, **Then** l'appel est proposé.
3. **Given** une fermeture exceptionnelle publiée, **When** le visiteur consulte les horaires, **Then** la fermeture est signalée clairement avec ses dates.

---

### User Story 2 - Lire les actualités (Priority: P1)

Un habitant consulte les actualités de la commune, de la plus récente à la plus ancienne, et ouvre celle qui l'intéresse.

**Why this priority**: les actualités sont le contenu le plus consulté après les horaires et font vivre le site.

**Independent Test**: publier trois actualités et vérifier qu'elles apparaissent par date décroissante, chacune ouvrable sur sa propre page.

**Acceptance Scenarios**:

1. **Given** plusieurs actualités publiées, **When** le visiteur ouvre la rubrique, **Then** il les voit de la plus récente à la plus ancienne avec titre, date et résumé.
2. **Given** une actualité, **When** le visiteur l'ouvre, **Then** il lit le texte complet et les éventuelles images, avec leur description alternative.
3. **Given** une actualité encore en brouillon, **When** un visiteur consulte le site, **Then** elle n'apparaît nulle part.

---

### User Story 3 - Publier sans compétence technique (Priority: P1)

Une personne du conseil municipal publie une actualité, ajoute un compte rendu en PDF ou modifie les horaires depuis un formulaire, sans toucher au code ni à Git. Elle enregistre d'abord en brouillon ; une autre personne relit puis valide la mise en ligne.

**Why this priority**: sans cela, le site se périme et dépend d'un technicien ; c'est la condition de sa pérennité.

**Independent Test**: confier à une personne non technique la tâche de publier une actualité de bout en bout (rédaction, brouillon, relecture, mise en ligne), sans aide.

**Acceptance Scenarios**:

1. **Given** une personne autorisée, **When** elle remplit le formulaire d'une actualité et enregistre, **Then** le contenu est conservé en brouillon et invisible du public.
2. **Given** un brouillon, **When** le rédacteur demande une relecture, **Then** le relecteur peut le prévisualiser tel qu'il sera publié, puis le valider ou le renvoyer avec une remarque.
3. **Given** un brouillon validé, **When** la publication est confirmée, **Then** le contenu devient visible du public.
4. **Given** un compte rendu en PDF ajouté, **When** il est publié, **Then** il apparaît dans la liste des comptes rendus avec sa date.
5. **Given** de nouveaux horaires publiés, **When** un visiteur ouvre n'importe quelle page qui les affiche, **Then** il voit les horaires à jour partout.
6. **Given** une publication erronée, **When** un relecteur demande son retrait ou le retour à la version précédente, **Then** c'est possible en une seule opération.

---

### User Story 4 - Consulter les comptes rendus du conseil (Priority: P2)

Un habitant retrouve et télécharge les comptes rendus des séances du conseil municipal, au format PDF.

**Why this priority**: obligation de transparence et demande récurrente, mais consultée moins souvent que les horaires.

**Independent Test**: avec plusieurs comptes rendus publiés, retrouver celui d'une séance donnée et l'ouvrir en moins d'une minute.

**Acceptance Scenarios**:

1. **Given** plusieurs comptes rendus publiés, **When** le visiteur ouvre la rubrique, **Then** il les voit classés par date de séance, les plus récents en premier.
2. **Given** un compte rendu, **When** le visiteur le sélectionne, **Then** il voit le titre, la date, le format et le poids du fichier avant de le télécharger.

---

### User Story 5 - Démarches, associations et salle des fêtes (Priority: P2)

Un habitant trouve les démarches courantes et les liens utiles, les associations avec leurs contacts, et les conditions et tarifs de location de la salle des fêtes.

**Why this priority**: informations pratiques fréquemment demandées par téléphone ; leur mise en ligne désengorge le secrétariat.

**Independent Test**: depuis l'accueil, atteindre chacune de ces trois informations en deux appuis au plus.

**Acceptance Scenarios**:

1. **Given** la rubrique des démarches, **When** le visiteur choisit une démarche, **Then** il voit ce qu'il faut faire, les pièces utiles et un lien vers le service officiel concerné.
2. **Given** la liste des associations, **When** le visiteur ouvre l'une d'elles, **Then** il voit son activité et au moins un moyen de la contacter.
3. **Given** la page de la salle des fêtes, **When** le visiteur la consulte, **Then** il voit les conditions de location, les tarifs, la capacité et comment contacter la mairie pour demander une réservation.

---

### User Story 6 - Découvrir le village (Priority: P3)

Un visiteur extérieur découvre Ajat, son patrimoine et ses environs.

**Why this priority**: valorise la commune, mais n'est pas indispensable au service rendu aux habitants.

**Independent Test**: depuis l'accueil, atteindre la présentation du village et du patrimoine en deux appuis au plus.

**Acceptance Scenarios**:

1. **Given** un visiteur sur la rubrique de découverte, **When** il la parcourt, **Then** il trouve une présentation du village, de son patrimoine et des lieux à voir aux alentours, avec des photos décrites.

---

### Edge Cases

- Un compte rendu PDF très volumineux ou non accessible : le rédacteur est prévenu avant publication du poids excessif ; le site indique toujours le poids du fichier.
- Deux personnes modifient le même contenu en même temps : aucune modification n'est perdue silencieusement.
- Une actualité est programmée ou datée dans le futur : elle n'est visible qu'à partir de sa date de publication.
- Aucune actualité ou aucun compte rendu n'existe encore : un message clair remplace une liste vide.
- Une image sans description alternative : le rédacteur ne peut pas valider la publication.
- Le visiteur est sur une connexion lente ou hors ligne : les informations de contact restent lisibles dès le chargement du texte.
- Un lien externe disparaît : les liens cassés sont détectés avant mise en ligne.
- Une page est supprimée ou déplacée : l'ancienne adresse renvoie vers la nouvelle.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le site MUST afficher sur la page d'accueil les horaires d'ouverture, le téléphone et l'adresse de la mairie.
- **FR-002**: Le site MUST permettre d'appeler d'un appui depuis un téléphone et d'ouvrir l'adresse dans une application de cartographie.
- **FR-003**: Le site MUST signaler les fermetures exceptionnelles avec leurs dates.
- **FR-004**: Le site MUST présenter les actualités par date décroissante, chacune avec titre, date, résumé et page complète.
- **FR-005**: Le site MUST présenter les comptes rendus du conseil municipal en PDF, classés par date de séance, avec titre, date, format et poids.
- **FR-006**: Le site MUST présenter les démarches courantes, chacune avec explications, pièces utiles et lien vers le service officiel.
- **FR-007**: Le site MUST présenter une liste de liens utiles.
- **FR-008**: Le site MUST présenter les associations de la commune avec leur activité et leurs contacts.
- **FR-009**: Le site MUST présenter les conditions de location, les tarifs, la capacité de la salle des fêtes et les modalités de contact pour la demander.
- **FR-010**: Le site MUST présenter le village, son patrimoine et ses environs, avec des photos décrites.
- **FR-011**: Les rédacteurs autorisés MUST pouvoir créer et modifier une actualité, ajouter un compte rendu en PDF et modifier les horaires via un formulaire, sans manipuler de code ni Git.
- **FR-012**: Toute modification MUST d'abord être enregistrée en brouillon, invisible du public.
- **FR-013**: Un brouillon MUST pouvoir être prévisualisé tel qu'il sera publié, puis relu et validé par une personne distincte du rédacteur avant mise en ligne.
- **FR-014**: Le relecteur MUST pouvoir refuser un brouillon avec une remarque ; le rédacteur la voit et peut corriger.
- **FR-015**: Une publication MUST pouvoir être retirée ou ramenée à la version précédente en une seule opération.
- **FR-016**: Le formulaire MUST refuser la publication d'une image sans description alternative et prévenir si un fichier est trop volumineux.
- **FR-017**: Les horaires MUST être saisis en un seul endroit et se mettre à jour partout où ils sont affichés.
- **FR-018**: Le site MUST publier les mentions légales, la politique de confidentialité et la déclaration d'accessibilité, accessibles depuis toutes les pages.
- **FR-019**: Le site MUST ne déposer aucun traceur et ne charger aucune ressource d'un domaine tiers, sans bandeau de consentement.
- **FR-020**: Le site MUST respecter les exigences de la constitution du projet en matière d'accessibilité (RGAA / WCAG AA), de mobile first et de performance (Lighthouse > 90).
- **FR-021**: Le contenu MUST rester stocké en Markdown dans Git, lisible et modifiable sans l'interface de rédaction.
- **FR-022**: Le site MUST fournir une navigation identique sur toutes les pages, utilisable au clavier et au toucher, et une recherche ou un plan du site permettant de retrouver une rubrique.

### Hors périmètre

Paiement en ligne, espace citoyen avec comptes, réservation en ligne de la salle des fêtes, forum.

### Key Entities *(include if feature involves data)*

- **Informations de la mairie**: horaires habituels, fermetures exceptionnelles, téléphone, adresse, courriel. Source unique.
- **Actualité**: titre, date, résumé, texte, images avec descriptions, état (brouillon, en relecture, publié).
- **Compte rendu**: titre, date de séance, fichier PDF, état.
- **Démarche**: titre, explications, pièces utiles, lien officiel.
- **Lien utile**: libellé, adresse, thème.
- **Association**: nom, activité, contacts, éventuel site ou page.
- **Salle des fêtes**: conditions, tarifs, capacité, contact pour la demande.
- **Page de découverte**: présentation du village, patrimoine, environs, photos décrites.
- **Rédacteur / relecteur**: personne du conseil autorisée à rédiger, ou à valider et publier.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un visiteur trouve les horaires, le téléphone et l'adresse en moins de 10 secondes depuis l'arrivée sur le site, sur téléphone.
- **SC-002**: Un habitant retrouve un compte rendu de séance donné en moins d'une minute.
- **SC-003**: Une personne sans compétence technique publie une actualité de bout en bout (rédaction, brouillon, relecture, mise en ligne) en moins de 15 minutes, après une prise en main de 30 minutes.
- **SC-004**: Les horaires sont modifiés et visibles en ligne en moins de 10 minutes après la validation.
- **SC-005**: 100 % des pages passent le contrôle d'accessibilité automatisé sans erreur et un audit manuel confirme le niveau AA.
- **SC-006**: Chaque catégorie Lighthouse (performance, accessibilité, bonnes pratiques, SEO) dépasse 90 sur mobile pour toutes les pages types.
- **SC-007**: Aucun cookie ni requête vers un domaine tiers n'est observé sur l'ensemble des pages.
- **SC-008**: Aucune publication n'est visible du public sans validation d'une seconde personne.
- **SC-009**: Les rubriques démarches, associations, salle des fêtes et découverte sont atteignables en deux appuis au plus depuis l'accueil.
- **SC-010**: Le site fonctionne sans intervention technique pendant au moins 12 mois, hors mise à jour du contenu.

## Assumptions

- Le public est surtout composé d'habitants consultant depuis un téléphone, parfois avec une connexion rurale lente, et de personnes âgées.
- Les rédacteurs sont quelques personnes du conseil municipal, avec un ordinateur et une connexion ordinaire ; les comptes de rédaction sont créés par un administrateur technique, hors du site public.
- Les contenus initiaux (textes, photos, PDF, tarifs, contacts des associations) sont fournis par la mairie.
- Le site est en français uniquement.
- La demande de location de la salle se fait par téléphone ou courriel, sans réservation en ligne.
- Le site n'a pas de formulaire de contact public : le contact passe par le téléphone, l'adresse et le courriel affichés. Tout formulaire serait une évolution à spécifier séparément (RGPD).
- Les comptes rendus restent en ligne pour toute la durée du mandat au moins ; les anciens ne sont pas supprimés sans décision.
- L'hébergeur, l'outil d'édition et le générateur du site sont choisis au plan technique, dans le respect de la constitution.
