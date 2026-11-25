# Constitution du site de la mairie d'Ajat

Site public de la mairie d'Ajat (Dordogne), commune rurale. Les principes ci-dessous sont
non négociables : aucune fonctionnalité, aucun choix technique ni aucun délai ne justifie d'y déroger.

## Core Principles

### I. Accessibilité (RGAA / WCAG 2.1 AA)

Chaque page livrée MUST respecter le RGAA et le niveau WCAG AA : HTML sémantique, navigation au
clavier complète, focus visible, contrastes conformes, alternatives textuelles pour tout média,
langue déclarée, zoom à 200 % sans perte d'information.

- Aucune fonctionnalité ne MUST dépendre uniquement de la couleur, de la souris ou de JavaScript.
- Une déclaration d'accessibilité MUST être publiée et tenue à jour.
- Un contrôle automatisé (axe ou équivalent) MUST passer sans erreur avant chaque mise en production.

Justification : le service public s'adresse à tous les habitants, dont beaucoup de personnes âgées
ou en situation de handicap ; c'est aussi une obligation légale.

### II. Mobile first

Les gabarits MUST être conçus d'abord pour un petit écran puis enrichis pour les écrans larges.
Aucun défilement horizontal de la page à 320 px de large ; cibles tactiles d'au moins 44 px ;
informations clés (horaires, contact, démarches) accessibles en un ou deux appuis depuis l'accueil.

Justification : une grande partie des visites vient de téléphones, souvent avec une connexion
rurale médiocre.

### III. Performance (Lighthouse > 90)

Les pages MUST obtenir un score Lighthouse supérieur à 90 sur chacune des catégories Performance,
Accessibilité, Bonnes pratiques et SEO, en profil mobile.

- Les images MUST être redimensionnées, compressées et dotées de dimensions explicites.
- Le JavaScript MUST rester minimal ; toute dépendance front-end MUST être justifiée.
- Aucune police ni ressource chargée depuis un tiers : tout est auto-hébergé.
- Une régression sous le seuil bloque la mise en production.

### IV. Aucun traceur, donc aucun bandeau

Le site MUST NOT déposer de cookie de tracking ni inclure de script, pixel, police, carte ou vidéo
tiers susceptible de tracer le visiteur. Il n'y a donc pas de bandeau de consentement.

- Les mesures d'audience éventuelles MUST être exemptées de consentement et sans cookie
  (ou réalisées uniquement à partir des journaux du serveur).
- Les contenus externes (carte, vidéo) MUST être remplacés par un lien ou une alternative
  statique, sauf solution sans traceur validée explicitement.

Justification : respect de la vie privée des administrés et suppression d'un composant à maintenir.

### V. RGPD et mentions légales conformes

Le site MUST publier des mentions légales et une politique de confidentialité à jour (éditeur,
directeur de la publication, hébergeur, contact, droits des personnes, délégué à la protection des
données ou référent).

- La collecte de données personnelles MUST être réduite au strict nécessaire ; en l'absence de
  formulaire, le site ne collecte rien. Tout formulaire ajouté MUST être spécifié (finalité,
  base légale, durée de conservation) avant d'être développé.
- L'hébergement et tout sous-traitant MUST relever d'un cadre conforme au RGPD (UE de préférence).

### VI. Site statique, maintenance quasi nulle

Le site MUST être entièrement statique (HTML/CSS/JS générés au build) : aucun serveur applicatif,
aucune base de données, aucun runtime à patcher en production.

- La chaîne de build MUST être reproductible depuis le dépôt seul, avec dépendances épinglées.
- Toute dépendance MUST être justifiée ; en cas de doute, ne pas l'ajouter.
- La mise à jour des dépendances MUST rester un travail rare et automatisable, jamais une
  condition de fonctionnement quotidien.

Justification : la commune n'a ni équipe technique ni budget d'exploitation.

### VII. Contenu éditable sans compétence technique, avec relecture

Tout le contenu (textes, images, documents, actualités, horaires, agenda) MUST être modifiable
par un agent ou un élu sans connaître Git, le Markdown ni le code, via une interface dédiée.

- Toute modification MUST passer par un brouillon puis une relecture explicite avant publication ;
  aucune publication directe sans validation.
- Le brouillon MUST être prévisualisable avant relecture.
- Les rôles « rédacteur » et « relecteur / publicateur » MUST être distincts.
- Retour arrière : toute publication MUST pouvoir être annulée en une opération.

### VIII. Contenu ouvert : Markdown dans Git

Le contenu MUST rester en Markdown (avec métadonnées en texte brut) dans le dépôt Git, source de
vérité unique. Aucune dépendance à un outil, un format ou un service propriétaire n'est admise
pour le contenu ni pour sa publication.

- Tout outil d'édition ou d'hébergement MUST être remplaçable sans migration de contenu :
  il lit et écrit les fichiers du dépôt.
- Les outils et bibliothèques MUST être open source, ou à défaut reposer sur des standards ouverts
  sans verrouillage (export complet possible).

### IX. Sobriété numérique (écoconception)

Le site MUST être conçu pour consommer le moins possible de ressources, côté visiteur, réseau
et construction, en s'appuyant sur le RGESN (référentiel général d'écoconception de services
numériques, Arcep, version 2024) comme cadre de bonnes pratiques.

- Chaque page MUST respecter un budget de poids et de requêtes, mesuré sur téléphone et compressé
  comme sur l'hébergement : 120 Ko pour l'accueil, 100 Ko pour une page de texte, 10 requêtes au plus,
  trois fichiers de polices au plus. Un dépassement bloque la mise en production.
- Le site MUST ne lancer aucune animation, vidéo ni son automatiquement, et MUST préférer le contenu
  le plus léger (texte, puis image optimisée, puis audio ou vidéo uniquement si indispensable).
- Toute image MUST être servie aux dimensions affichées et dans un format compressé moderne ;
  tout JavaScript, toute police et toute dépendance ajoutés MUST être justifiés par leur utilité.
- Une déclaration d'écoconception MUST être tenue à jour dans le dépôt (critères tenus ou non,
  limites, mesures de référence) et révisée à chaque changement significatif.

Justification : un site de commune doit rester léger pour les habitants à faible débit, pour les
appareils anciens et pour l'environnement, sans coût d'exploitation supplémentaire. Les budgets
sont mesurables, donc vérifiables en continu.

### X. Identité propre, pas de gabarit

Chaque page MUST appartenir à Ajat et à aucune autre commune : elle s'appuie sur ce qui existe ici
(pierre et chaux du Périgord, blason, photos et textes du village) et non sur une présentation de
gabarit qui conviendrait à n'importe quelle mairie.

- **Test de substitution** : si l'on remplace « Ajat » par le nom d'une autre commune, la page MUST
  cesser de convenir. Chaque type de page MUST porter au moins un élément propre à Ajat (blason,
  photo ou texte local, matières de la palette).
- **Interdits**, contrôlés à chaque revue :
  1. Les grilles ou rangées d'au moins trois blocs de même forme et de même structure (icône, titre,
     texte) servant de composition principale. Une liste de contenus réels (actualités, démarches,
     comptes rendus) reste admise si ses entrées se distinguent par leur contenu, pas par un gabarit.
  2. Les liens répétés : une même destination MUST n'apparaître qu'une fois dans le contenu
     principal d'une page (l'en-tête, la navigation et le pied de page ne sont pas comptés).
  3. Les dégradés : aucun dégradé CSS (`linear-gradient`, `radial-gradient`, `conic-gradient`) ni
     image de dégradé en décor.
  4. Les icônes génériques en décoration : une icône MUST être fonctionnelle (accompagner un libellé
     pour signaler une action ou un état) ; les pictogrammes d'usage courant (horloge, enveloppe,
     maison…) posés comme décor sont interdits.
  5. Le pastiche « vieux parchemin » : textures de papier ou de manuscrit, polices pseudo-anciennes,
     bordures et ornements imitant l'ancien. L'ancienneté se montre par de vraies matières (pierre,
     chaux) et de vraies images, jamais par imitation.
- **Audit avant code** : toute refonte visuelle (nouvelle mise en page, nouveau composant, changement
  de palette, de polices ou d'images) MUST d'abord faire l'objet d'un audit avec le skill `unslop` :
  les signes de sa liste `references/signs.md` sont relevés page par page et consignés dans
  `specs/<n>-…/audit-unslop.md` ; le plan cite les signes relevés et leur traitement ; aucun code
  n'est écrit avant. Un audit qui ne relève aucun signe le dit expressément.
- En cas de conflit, les principes I (accessibilité), III (performance) et IX (sobriété) l'emportent
  sur toute recommandation de l'audit.

Justification : un site de commune rurale qui ressemble à tous les autres perd la confiance des
habitants et ne dit rien du lieu ; l'identité vient de ce qui est propre à Ajat, pas d'un modèle.

## Contraintes techniques et de conformité

- Les principes I à X s'appliquent à toute fonctionnalité, tout gabarit et tout contenu.
- Choix retenus (plan 001) : Astro en mode statique ; édition par Pages CMS (open source) sur une
  branche de rédaction protégée ; hébergement GitHub Pages, hors UE, documenté dans la politique
  de confidentialité. Tout changement de ces choix MUST être justifié au regard des principes ci-dessus.
- Les documents téléchargeables (PDF, etc.) MUST être accessibles et accompagnés de leur titre,
  format et poids.
- Les URL publiées MUST rester stables ; tout déplacement de page MUST créer une redirection.
- Les contenus rédigés MUST être en français clair, sans jargon administratif inutile.

## Processus de développement et contrôles

- Toute modification passe par une branche et une relecture avant fusion sur la branche de production.
- Les contrôles automatisés suivants MUST s'exécuter à chaque proposition de changement et bloquer
  la fusion en cas d'échec : build, accessibilité (axe ou équivalent), Lighthouse (seuil du
  principe III), budgets de poids et de requêtes (principe IX), liens cassés, absence de requête
  vers un domaine tiers.
- Chaque spécification et chaque plan MUST contenir une vérification explicite de conformité à
  cette constitution (« Constitution Check »).
- Toute refonte visuelle MUST être précédée de l'audit `unslop` du principe X ; un plan visuel sans
  `audit-unslop.md` est refusé en revue. Les interdits mesurables (dégradés, destinations répétées
  dans le contenu principal) MUST être contrôlés automatiquement dès la spécification qui met le
  site en conformité (disposition transitoire de la gouvernance).
- Toute complexité supplémentaire (dépendance, script, service) MUST être justifiée par écrit.

## Governance

Cette constitution prévaut sur toute autre pratique du projet. En cas de conflit, elle l'emporte.

- **Amendement** : toute modification est proposée par un changement documenté (motif, impact,
  plan de migration le cas échéant), relu et validé avant fusion, puis la version est incrémentée.
- **Versionnage** (sémantique) : MAJOR pour la suppression ou la redéfinition incompatible d'un
  principe ; MINOR pour l'ajout d'un principe ou d'une section, ou un élargissement matériel ;
  PATCH pour une clarification ou une correction de forme.
- **Conformité** : chaque revue de changement MUST vérifier le respect des principes ; une
  dérogation n'est possible qu'en amendant la constitution, jamais au cas par cas.
- **Disposition transitoire (principe X, adopté le 2026-11-26)** : les pages existantes à cette date ne
  sont pas retirées ; elles MUST être mises en conformité par la première spécification d'identité
  qui suit, audit `unslop` d'abord. Aucune nouvelle page ni aucun nouveau composant ne MUST
  contrevenir au principe X.
- **Revue périodique** : la constitution, la déclaration d'accessibilité et la déclaration
  d'écoconception sont relues au moins une fois par an.

**Version**: 1.2.0 | **Ratified**: 2026-11-25 | **Last Amended**: 2026-11-26
