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

## Contraintes techniques et de conformité

- Les principes I à VIII s'appliquent à toute fonctionnalité, tout gabarit et tout contenu.
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
  principe III), liens cassés, absence de requête vers un domaine tiers.
- Chaque spécification et chaque plan MUST contenir une vérification explicite de conformité à
  cette constitution (« Constitution Check »).
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
- **Revue périodique** : la constitution et la déclaration d'accessibilité sont relues au moins
  une fois par an.

**Version**: 1.0.1 | **Ratified**: 2026-11-25 | **Last Amended**: 2026-11-25
