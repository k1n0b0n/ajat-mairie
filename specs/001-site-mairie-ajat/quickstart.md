# Quickstart : valider le site de bout en bout

Prérequis : Node.js LTS (voir `.nvmrc`), dépôt cloné, dépendances installées (`npm ci`).
Chaque scénario renvoie à la spec ; les commandes existent une fois les tâches réalisées.

## 1. Construire et contrôler en local

```text
npm run build        # attendu : 0 erreur de schéma (contracts/content-schemas.md)
npm run check        # attendu : check-content, axe, mobile 320, aucun traceur, liens
npm run lhci         # attendu : 4 catégories ≥ 0,9 en mobile
```

## 2. Parcours habitant (User Stories 1, 2, 4, 5, 6)

1. `npm run preview`, ouvrir l'accueil à 360 px de large.
2. Horaires, téléphone et adresse visibles sans clic ; le numéro déclenche un appel (SC-001).
3. Actualités : liste décroissante ; une actualité `draft: true` est absente.
4. Comptes rendus : date, format et poids visibles avant téléchargement (SC-002).
5. Démarches, associations, salle des fêtes, découverte : atteintes en ≤ 2 appuis (SC-009).
6. Navigateur : onglet Réseau et Cookies vides de tout domaine tiers (SC-007).

## 3. Parcours rédacteur → relecteur (User Story 3)

1. Rédacteur : dans Pages CMS, créer une actualité en brouillon sur `redaction`.
2. Vérifier : la PR s'ouvre toute seule, l'aperçu est commenté dedans, le site public est inchangé.
3. Rédacteur : décocher « Brouillon » pour demander la relecture.
4. Relecteur (autre personne) : ouvrir l'aperçu, demander une modification ; le rédacteur lit la remarque.
5. Relecteur : approuver puis fusionner ; vérifier la publication sous 10 minutes (SC-004).
6. Vérifier que l'auteur ne peut pas approuver sa propre PR (SC-008).
7. Annuler : « Revert » puis fusionner ; la page disparaît (FR-015).
8. Mesurer le temps total pour une personne non technique (SC-003, cible 15 min).

## 4. Cas limites

- Image sans description ⇒ CI rouge. PDF > 10 Mo ⇒ CI rouge.
- Actualité datée dans 2 jours ⇒ absente aujourd'hui, présente après le rebuild nocturne.
- Horaires modifiés dans `mairie.yml` ⇒ mis à jour partout.
- Liste vide ⇒ message explicite.

## 5. Avant ouverture au public

- Audit manuel RGAA (clavier, lecteur d'écran) et déclaration d'accessibilité renseignée.
- Mentions légales et politique de confidentialité relues (hébergeur GitHub mentionné).
- Domaine personnalisé et HTTPS imposé activés.
