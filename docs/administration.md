# Administration technique

Pour la personne qui installe et entretient le site (une seule fois, puis rarement).
Voir `specs/001-site-mairie-ajat/` pour la conception.

## 1. Dépôts

- **Site** : le dépôt public `ajat-mairie` (branches `main` et `redaction`).
- **Aperçu** : un second dépôt **public** `ajat-mairie-apercu` (même propriétaire), vide au départ. Réglages → Pages → source : branche `main`, dossier racine. Il contient uniquement la version avec brouillons, non indexée.

## 2. Clé de déploiement de l'aperçu (seul secret du projet)

1. Générer une clé dédiée : `ssh-keygen -t ed25519 -N "" -C apercu-deploy -f apercu_deploy`
2. Dépôt `ajat-mairie-apercu` → Réglages → Deploy keys → ajouter `apercu_deploy.pub`, **avec accès en écriture**.
3. Dépôt `ajat-mairie` → Réglages → Secrets and variables → Actions → nouveau secret `APERCU_DEPLOY_KEY` = contenu de `apercu_deploy` (clé privée).
4. Supprimer les deux fichiers de clé locaux.
5. Activer l'aperçu : variable de dépôt `APERCU_ACTIF` = `true` (`gh variable set APERCU_ACTIF --body true`). Tant qu'elle n'existe pas, `preview.yml` ne fait rien.

## 3. Autorisations GitHub Actions

Dépôt `ajat-mairie` → Réglages → Actions → General → Workflow permissions : cocher **Allow GitHub Actions to create and approve pull requests** (nécessaire à `pr-redaction.yml`).
Réglages → Pages → Source : **GitHub Actions**.

## 4. Protection de `main` (obligatoire avant d'inviter quiconque)

Réglages → Rules → Rulesets → nouvelle règle sur `main` :

- Require a pull request before merging, **1 approbation**, **Require review from Code Owners**, **Require approval of the most recent reviewable push**.
- Require status checks to pass : `controles` ; **Require branches to be up to date**.
- Block force pushes. Pas d'exception de contournement, sauf l'administrateur pour un retrait d'urgence.
- Activer **Secret scanning** et les alertes **Dependabot** (Réglages → Code security).
- Créer la branche `redaction` à partir de `main`. Après tout changement de `.pages.yml` sur `main`, la ramener dans `redaction` (Pages CMS lit la configuration par branche).
- `.github/CODEOWNERS` : remplacer le compte provisoire par au moins deux relecteurs.

## 5. Pages CMS

1. Installer l'application GitHub « Pages CMS » sur le dépôt `ajat-mairie` uniquement.
2. Inviter chaque rédacteur par courriel (Collaborators) et lui donner le lien de `docs/aide-redacteur.md`. Si le propriétaire du dépôt change, mettre à jour le lien dans ce guide.
3. Un rédacteur n'a **pas** de droit d'écriture sur `main` : la protection ci-dessus l'en empêche.

## 6. Vérifier avant la mise en service

Dérouler `specs/001-site-mairie-ajat/quickstart.md` §3.

## 7. Transfert à la mise en production

Le dépôt est d'abord sous un compte personnel. Au lancement, le transférer à une organisation GitHub de la mairie (Réglages → Transfer). Après transfert : mettre à jour le lien de `docs/aide-redacteur.md`, réinstaller l'application Pages CMS, recréer le secret `APERCU_DEPLOY_KEY` et déplacer le dépôt d'aperçu, vérifier la protection de `main` et `CODEOWNERS`. L'adresse publique du site ne change pas (domaine personnalisé).
