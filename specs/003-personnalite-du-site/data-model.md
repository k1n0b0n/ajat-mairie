# Data Model : personnalité du site

Les horaires, fermetures, coordonnées restent dans `src/content/donnees/mairie.yml` (spec 001, `Mairie.*`) : aucune saisie en plus.

## Phrase d'horaires (dérivée, jamais saisie)

Calculée au build par `phraseHoraires()` à partir de `Mairie.hours`, `Mairie.closures` et `Mairie.hoursNote` ; règles dans [contracts/phrase-horaires.md](./contracts/phrase-horaires.md). Aucun champ nouveau.

## Texte de l'accueil (`src/content/donnees/accueil.yml`, collection `accueil`)

Une entrée `accueil` :

| Champ | Type | Règle |
|---|---|---|
| `village` | texte | obligatoire, 60 à 320 caractères : deux ou trois phrases sur Ajat (le bourg, l'église, le château), sans les mots « moderne », « épuré » ni « premium » |

**Valeur initiale** : reformulation de la page « Le village d'Ajat » (Wikipédia, CC BY-SA, déjà créditée dans les mentions légales).

## Page « La mairie » (`src/pages/la-mairie.astro`)

Pas de donnée propre : rend les coordonnées, le tableau jour par jour, les fermetures, la remarque et l'accès à partir de `mairie.yml`.

## Éléments de composition

| Élément | Source | Règle |
|---|---|---|
| Plaque | nom de la commune (`Mairie.name`) et « Dordogne » | texte réel dans la page, fond plein |
| Signature | `src/assets/signature-clocher.svg` | une couleur, ≤ 2 Ko, une fois par page |
| Chiffres d'affichage | téléphone, heures, dates, code postal | classe `.chiffres` |
