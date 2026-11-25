# Contrat : interface d'édition (`.pages.yml`)

Ce que l'éditeur doit offrir au rédacteur. Les clés exactes sont à valider contre la documentation
Pages CMS à la première tâche (voir [research.md](../research.md) R3).

## Collections et fichiers exposés

| Entrée | Type | Source | Champs visibles |
|---|---|---|---|
| Actualités | collection | `src/content/actualites` | titre, résumé, image + description, texte, date, brouillon |
| Comptes rendus | collection | `src/content/comptes-rendus` | titre, date de séance, fichier PDF, brouillon |
| Démarches | collection | `src/content/demarches` | titre, résumé, pièces, lien officiel, texte |
| Associations | collection | `src/content/associations` | nom, activité, contacts, accord de publication |
| Pages | collection | `src/content/pages` | titre, texte (pages légales : lecture seule du type) |
| Horaires et contact | fichier | `donnees/mairie.yml` | horaires par jour, fermetures, téléphone, adresse |
| Salle des fêtes | fichier | `donnees/salle-des-fetes.yml` | capacité, conditions, tarifs |
| Liens utiles | fichier | `donnees/liens.yml` | libellé, adresse, thème |

## Exigences

- Libellés et aides **en français** ; aucun terme technique (« frontmatter », « slug », « YAML »).
- Champs obligatoires marqués comme tels ; `draft` présenté comme « Brouillon (ne pas publier) ».
- Médias : PDF → `public/documents/comptes-rendus`, images → `src/assets/images` ; URL écrite
  cohérente avec le build.
- Le rédacteur n'a **pas** accès aux fichiers de code, aux workflows ni à `.pages.yml`.
- Branche d'écriture : `redaction`. Écriture directe sur `main` impossible (protection GitHub).
- Les commits portent le nom du rédacteur (« Modifie {chemin} par {nom} »).

## Aide intégrée

Une page d'aide en français (dépôt, `docs/aide-redacteur.md`, exportable en PDF) explique :
écrire une actualité, ajouter un compte rendu, changer les horaires, demander une relecture,
lire la remarque d'un relecteur. Côté relecteur : ouvrir l'aperçu, approuver, fusionner, annuler.
