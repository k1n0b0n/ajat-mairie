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

### État appliqué (2026-11-25)

Règle « Protection de main » (ruleset GitHub n° 28117604), active :

- pull request obligatoire, 1 approbation, revue des propriétaires de code, approbation de la dernière modification, approbations obsolètes écartées ;
- contrôle `controles` (CI) obligatoire, branche à jour avant fusion ;
- suppression et réécriture de l'historique interdites ;
- **contournement** : le rôle « admin » du dépôt peut fusionner **sa propre PR** sans l'approbation d'un autre relecteur (mode « via pull request » : jamais de push direct). Il est nécessaire tant que la mairie n'a pas deux relecteurs.

**Contribuer** : travailler sur une branche, ouvrir une PR vers `main`, attendre le contrôle, puis fusionner (`gh pr merge --admin --merge` pour l'administrateur). Pages CMS écrit sur `redaction`, dont la PR s'ouvre toute seule.

**Retirer le contournement** dès que deux relecteurs ont un compte : `gh api -X PUT repos/<propriétaire>/ajat-mairie/rulesets/28117604 --input règle.json` avec `"bypass_actors": []`, ou dans Réglages → Rules → Rulesets. Mettre aussi leurs comptes dans `.github/CODEOWNERS`.

## 5. Pages CMS

1. Installer l'application GitHub « Pages CMS » sur le dépôt `ajat-mairie` uniquement.
2. Inviter chaque rédacteur par courriel (Collaborators) et lui donner le lien de `docs/aide-redacteur.md`. Si le propriétaire du dépôt change, mettre à jour le lien dans ce guide.
3. Un rédacteur n'a **pas** de droit d'écriture sur `main` : la protection ci-dessus l'en empêche.

## 6. Vérifier avant la mise en service

Dérouler `specs/001-site-mairie-ajat/quickstart.md` §3.

## 7. Changer ou supprimer une adresse (redirections)

GitHub Pages n'a pas de redirections serveur. Pour déplacer ou renommer une page, ne jamais laisser l'ancienne adresse sans réponse : ajouter une entrée dans `redirects` de `astro.config.mjs` (par exemple `'/ancienne-page/': '/nouvelle-page/'`). Astro génère une page de redirection à cette adresse.

## 8. Transfert à la mise en production

Le dépôt est d'abord sous un compte personnel. Au lancement, le transférer à une organisation GitHub de la mairie (Réglages → Transfer). Après transfert : mettre à jour le lien de `docs/aide-redacteur.md`, réinstaller l'application Pages CMS, recréer le secret `APERCU_DEPLOY_KEY` et déplacer le dépôt d'aperçu, vérifier la protection de `main` et `CODEOWNERS`. L'adresse publique du site ne change pas (domaine personnalisé).

## 9. Domaine personnalisé

Domaine provisoire : `ajat.kobbo.fr` (fichier `public/CNAME` et `site` dans `astro.config.mjs`). La zone DNS de `kobbo.fr` est chez Scaleway (serveurs `ns0.online.net` et `ns1.online.net`).

1. **Vérifier le domaine** au niveau du compte ou de l'organisation GitHub (Réglages → Pages → Add a domain, enregistrement TXT `_github-pages-challenge-<compte>`), avant tout enregistrement CNAME : cela empêche un tiers de reprendre le sous-domaine si Pages est un jour désactivé.
2. **Enregistrement DNS** : `ajat` en CNAME vers `<propriétaire>.github.io.` (aujourd'hui `k1n0b0n.github.io.` ; après transfert du dépôt, le nom de l'organisation).
3. **Activer Pages** : source « GitHub Actions », puis le domaine personnalisé, puis **Enforce HTTPS** quand le certificat est émis.
4. Réactiver `deploy.yml` et `nightly.yml` (`gh workflow enable`).
5. Changer de domaine plus tard : modifier `public/CNAME` et la valeur par défaut de `site`, mettre à jour l'enregistrement DNS, ressaisir le domaine dans Pages.

## 10. Indexation par les moteurs de recherche

Tant que le domaine est provisoire, le site n'est **pas indexable** : balise `noindex, nofollow` sur chaque page, `robots.txt` en `Disallow: /` et aucun sitemap annoncé. C'est le comportement par défaut, même sans configuration.

Pour l'autoriser (au passage au vrai domaine) : `gh variable set INDEXATION --body on`, puis relancer le déploiement (`gh workflow run deploy.yml`). Pour la couper de nouveau : `gh variable delete INDEXATION`, puis redéployer. Après activation, les moteurs mettent quelques jours à semaines à réindexer le site.
