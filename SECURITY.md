# Politique de sécurité

## Versions concernées

Seule la dernière version publiée, celle de la branche `main` (le site en ligne), reçoit des correctifs.

## Signaler une vulnérabilité

**N'ouvrez pas de ticket public** pour une faille de sécurité.

Utilisez le signalement privé de GitHub : onglet **Security** du dépôt, puis **Report a vulnerability**. Vous y décrivez le problème, l'adresse ou le fichier concerné et, si possible, la manière de le reproduire. Seuls les mainteneurs voient le signalement.

Vous pouvez compter sur un accusé de réception rapide, puis sur un point d'avancement régulier jusqu'à la correction. Merci de ne pas divulguer le problème avant qu'il soit corrigé.

## Ce que ce dépôt contient et ne contient pas

- Le site est **statique** : aucun serveur applicatif, aucune base de données, aucune authentification, aucun formulaire, aucun cookie. La surface d'attaque se limite à des fichiers publiés par GitHub Pages et à la chaîne de publication.
- Le dépôt est **public** : il ne contient aucun secret ni donnée personnelle non publiable. Si vous en découvrez un, signalez-le de la même façon.
- Une politique de sécurité du contenu (CSP) stricte est posée sur chaque page : aucun script, aucune ressource tierce.

## Chaîne de publication

- `main` est protégée : pull request, relecture et contrôle CI obligatoires.
- L'analyse de secrets avec blocage au push et les alertes Dependabot sont activées. Les dépendances sont mises à jour une fois par mois, en une PR groupée.
- Les droits des workflows GitHub Actions sont limités à ce dont chacun a besoin.

## Dépendances

Le site n'embarque aucune dépendance en production (rien ne s'exécute côté serveur ni côté visiteur). Les dépendances de construction sont épinglées dans `package-lock.json`.
