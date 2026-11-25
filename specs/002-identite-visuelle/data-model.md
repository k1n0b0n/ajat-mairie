# Data Model: Identité visuelle

Peu de données : l'identité est surtout du CSS. Deux éléments sont des données éditables.

## Visuel (`src/content/donnees/visuels.yml`, collection `visuels`)

Une entrée `accueil` (la clé sert d'identifiant).

| Champ | Type | Règle |
|---|---|---|
| `image` | texte | obligatoire ; nom ou chemin d'une image de `src/assets/images/` (résolue par nom de fichier, comme `cover.image`) |
| `alt` | texte | obligatoire, 10 à 160 caractères : ce que montre l'image |
| `credit.author` | texte | obligatoire si la licence l'exige |
| `credit.license` | texte | par exemple « CC BY-SA 4.0 » |
| `credit.licenseUrl` | URL https | obligatoire si `credit.license` est renseigné |
| `credit.sourceUrl` | URL https | facultatif : page d'origine de l'image |
| `credit.modified` | booléen | défaut `true` : affiche « recadrée et compressée » |

- Si `credit` est absent, aucun crédit n'est affiché (photo de la mairie sans exigence).
- Si `credit.license` est renseigné sans `credit.author` ni `credit.licenseUrl`, le build échoue (la licence CC BY-SA exige le crédit).

**Valeur initiale** : `Ajat bourg.JPG`, auteur « Père Igor », licence « CC BY-SA 4.0 », `https://creativecommons.org/licenses/by-sa/4.0/deed.fr`, source `https://commons.wikimedia.org/wiki/File:Ajat_bourg.JPG`.

## Jetons de style (`src/styles/tokens.css`)

Variables CSS nommées par rôle, voir [contracts/design-tokens.md](./contracts/design-tokens.md) : `--fond`, `--fond-doux`, `--texte`, `--texte-doux`, `--chene`, `--chene-texte`, `--ocre-texte`, `--ocre-deco`, `--alerte-fond`, `--alerte-bord`, `--focus`, `--bordure-forte`, `--separateur`, plus les variantes sombre et contraste élevé. Règle : aucune couleur écrite en dur dans `global.css` ou dans un composant.

## Ressources statiques

| Ressource | Emplacement | Règle |
|---|---|---|
| Blason | `src/assets/blason-ajat.svg` | SVG sans script ni lien externe ; ≤ 20 Ko |
| Photos | `src/assets/images/` | source ≤ 600 Ko (avertissement au-delà) ; variantes servies ≤ 200 Ko (échec CI) |
| Polices | paquets npm `@fontsource/*` | latin uniquement ; 3 fichiers `.woff2` |

## Relations

`visuels.accueil.image` → fichier de `src/assets/images/` ; le crédit est repris dans la page « Mentions légales » (section « Crédits »), qui liste aussi les photos de la rubrique « Découvrir ».
