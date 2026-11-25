# Data Model: Site web de la mairie d'Ajat

Tout est fichier dans Git. Les champs « commun » valent pour les collections Markdown.

## Champs communs (actualités, comptes rendus, démarches, associations, pages)

| Champ | Type | Règle |
|---|---|---|
| `title` | texte | obligatoire, 3 à 120 caractères |
| `draft` | booléen | défaut `true` ; exclu de la production si `true` |
| `publishDate` | date | défaut = date de création ; futur ⇒ non publié jusqu'à cette date |
| `updatedDate` | date | facultatif |

## Collections

### Actualité (`src/content/actualites/*.md`)

- `summary` (obligatoire, ≤ 200 car.), corps Markdown.
- `cover` (facultatif) : `image` + `alt` ; `alt` obligatoire si `image` présent.
- Images dans le corps : `![description](…)` ; description vide ⇒ échec CI.
- Tri : `publishDate` décroissant.

### Compte rendu (`src/content/comptes-rendus/*.md`)

- `meetingDate` (obligatoire), `file` (chemin sous `public/documents/comptes-rendus/`, `.pdf` obligatoire),
  `fileSizeKb` calculé au build (non saisi).
- Poids PDF : alerte > 3 Mo, échec > 10 Mo.
- Tri : `meetingDate` décroissant.

### Démarche (`src/content/demarches/*.md`)

- `summary`, `documents` (liste de pièces, facultative), `officialUrl` (URL https, obligatoire),
  `order` (entier, facultatif). Corps = explications.

### Association (`src/content/associations/*.md`)

- `activity` (obligatoire), `contacts` : liste d'au moins 1 entrée `{type: tel|email|adresse|site, value}`.
- Données personnelles : uniquement des contacts que l'association a accepté de publier
  (case « accord obtenu » `consent: true` obligatoire).

### Page (`src/content/pages/*.md`)

- `slug` (facultatif), `kind` : `decouverte` | `legal` | `confidentialite` | `accessibilite` | `libre` (défaut `libre`),
  `description` (≤ 200 car., facultatif), `order` (entier, facultatif). Les pages « Découvrir » sont celles du dossier
  `src/content/pages/decouvrir/`.
- Les pages `legal` et `accessibilite` ne peuvent pas être `draft: true` (échec CI).

## Données uniques (YAML)

### Mairie (`src/content/donnees/mairie.yml`) — source unique des horaires (FR-017)

- `name`, `address` (rue, code postal, commune), `phone`, `email`.
- `hours` : 7 jours, chacun avec 0..n plages `{open: HH:MM, close: HH:MM}` (vide = fermé).
- `closures` : liste `{from: date, to: date, reason: texte}` ; dates passées ignorées à l'affichage.
- `hoursNote` (facultatif).

### Salle des fêtes (`src/content/donnees/salle-des-fetes.yml`)

- `capacity` (entier), `description`, `conditions`, `rates` : liste `{label, amount_eur, unit}`,
  `contact` (renvoie à `mairie` par défaut). Tous facultatifs tant que la mairie ne les a pas fournis :
  la page affiche alors « publiés prochainement ».

### Liens utiles (`src/content/donnees/liens.yml`)

- Liste `{label, url (https), theme}`.

## États d'une publication

```text
draft:true (sur redaction) ──PR ouverte──▶ en relecture (PR + aperçu)
        ▲                                        │
        └──── modifications demandées ◀──────────┤
                                                 ▼ approuvée + fusionnée sur main
                                       draft:false ──▶ publié (visible si publishDate ≤ aujourd'hui)
```

L'état « en relecture » n'est pas un champ : c'est l'existence d'une PR ouverte. Le relecteur ne
change pas `draft` lui-même : le rédacteur le passe à `false` quand il demande la relecture ; la
fusion vaut publication.

## Rôles

| Rôle | Où | Droits |
|---|---|---|
| Rédacteur | Pages CMS | écrit sur `redaction` uniquement |
| Relecteur | GitHub (PR) | approuve et fusionne ; ne peut pas approuver sa propre PR |
| Administrateur technique | GitHub | gère accès, domaine, secrets, dépendances |
