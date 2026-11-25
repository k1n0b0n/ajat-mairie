# Research: Identité visuelle du site de la mairie d'Ajat

Aucun `NEEDS CLARIFICATION` ne subsiste. Les photos, le blason et les polices ont été vérifiés (licences, taille, contenu réel).

## R1 — Palette et contrastes

- **Decision**: palette « pierre et chaux » avec variante sombre ; tous les couples **calculés** (formule WCAG) :

| Rôle | Clair | Sombre |
|---|---|---|
| Fond (crème / nuit chaude) | `#FBF6EC` | `#1B1812` |
| Fond doux (pierre) | `#EFE6D4` | `#26221A` |
| Texte | `#2A241C` (14,3:1) | `#F1EADB` (14,8:1) |
| Texte secondaire | `#5A5144` (7,2:1) | `#BDB3A0` (8,5:1) |
| Vert chêne (liens, boutons) | `#35542F` (7,9:1) | `#A9C99B` (9,7:1) |
| Ocre (texte d'accent) | `#7A4A06` (6,9:1) | `#E3B05A` (9,0:1) |
| Ocre décoratif (filets, aplats) | `#B9791F` (3,4:1) | `#E3B05A` |
| Encadré d'alerte | fond `#F8E6BA`, texte `#2A241C` (12,4:1), bord `#8A5A00` (5,5:1) | fond `#3A2D12`, bord `#E3B05A` |
| Focus | `#7A2E1A` (8,7:1) | `#FFB4A0` (10,4:1) |
| Bordure de composant (3:1) | `#8A7D63` (3,75:1) | `#8F8570` (4,85:1) |
| Séparateur décoratif | `#B9AC95` | `#5A5242` |

  Les séparateurs décoratifs (2,1:1) ne portent aucune information : ils sont exemptés ; tout contour de composant utilise la bordure à 3:1.
- **Rationale**: ocre et vert chêne sont des teintes sombres et désaturées, donc naturellement AA sur fond crème ; l'ocre vif n'est utilisé qu'en décor.
- **Alternatives**: ocre clair en texte (échoue AA) ; fond blanc pur (moins chaleureux).

## R2 — Typographie

- **Decision**: titres **Fraunces 600** (serif à empattements doux, chaleureux, caractère « pierre taillée ») ; texte **Atkinson Hyperlegible 400 et 700** (conçue pour la basse vision, très lisible). Paquets npm `@fontsource/fraunces` et `@fontsource/atkinson-hyperlegible` (OFL-1.1, v5.3.0), feuilles `latin-400.css`, `latin-600.css`, `latin-700.css` : sous-ensemble latin (couvre le français), `font-display: swap`.
- **Poids mesuré** : Fraunces 600 ≈ 18 Ko ; Atkinson 400 ≈ 17 Ko ; Atkinson 700 ≈ 18 Ko ; **≈ 53 Ko** au total. Préchargement des deux polices critiques (Atkinson 400, Fraunces 600).
- **Replis** : titres `Georgia, "Times New Roman", serif` ; texte `system-ui, "Segoe UI", Roboto, sans-serif`. Pas de saut de mise en page marqué grâce au repli proche et au `swap`.
- **Alternatives**: police variable Fraunces (≈ 100 Ko+) ; Lora, Merriweather, Source Serif (moins de caractère) ; Lexend, Inter (plus froides) ; polices système seules (n'apportent pas d'identité).

## R3 — Photos du village (Wikimedia Commons)

Les cinq fichiers de la catégorie « Ajat » ont été téléchargés et **regardés** :

| Fichier | Auteur, licence | Constat |
|---|---|---|
| `Ajat bourg.JPG` | Père Igor, CC BY-SA 4.0 | **Retenue pour l'accueil** : bourg sur sa colline, église, ciel bleu ; 3264 × 2448 |
| `Ajat bourg (1).JPG` | Père Igor, CC BY-SA 4.0 | Bourg et château, ciel couvert ; **seconde photo** possible |
| `Château d'Ajat.jpg` | GuillaumeG, CC BY-SA 3.0 | Gros plan sur le château ; **page patrimoine** |
| `Eglise24190.JPG` | Maria24190, CC BY-SA 3.0 | Hameau sous la neige ; possible |
| `Le bourg d'Ajat - panoramio.jpg` | marcel ruessaf, CC BY-SA 3.0 | ⚠️ **Écartée : montre un moulin grec bleu et blanc, pas Ajat** (fichier mal décrit sur Commons) |

- **Decision**: visuel d'accueil = `Ajat bourg.JPG`. Aucun texte posé sur la photo : le titre et les accès rapides sont dans des blocs de la palette, donc le contraste ne dépend pas de la photo (FR-003).
- **Traitement**: source recadrée et réduite (≈ 1920 px) dans `src/assets/images/` ; Astro produit au build des variantes AVIF et WebP à plusieurs largeurs ; **chaque fichier servi ≤ 200 Ko**, vérifié en CI.
- **Licence** : CC BY-SA impose le crédit de l'auteur, le lien vers la licence et la mention de toute modification (« recadrée, compressée ») ; les versions adaptées restent sous CC BY-SA. Le crédit est affiché sous le visuel et repris dans les mentions légales.
- **Alternatives**: photo de la mairie (non disponible : on remplacera plus tard) ; illustration (pas de source) ; image sans photo (moins chaleureux).

## R4 — Blason

- **Decision**: `Blason ville fr Ajat (Dordogne).svg` (Wikimedia Commons), 14 Ko, auteur Henry Salomé, **CC BY-SA 3.0 ou GFDL 1.2+**. « Écartelé d'or et d'azur, aux 1 et 4 de trois forces de sable, aux 2 et 3 de trois besants d'argent ». Fichier vérifié (aucun script ni lien externe), affiché dans l'en-tête avec `alt=""` (le nom de la commune est déjà écrit à côté) ; crédit dans les mentions légales.
- ⚠️ **Statut officiel non établi** : la page Commons ne dit pas si ce blason est officiel ou une reconstitution, et rappelle que l'usage de symboles peut être réglementé. **À faire confirmer par la mairie** avant l'ouverture au public.
- **Alternatives**: pas de blason (identité plus pauvre) ; logo à créer (hors périmètre).

## R5 — Composition de l'accueil

- **Decision**: de haut en bas : en-tête (blason, nom, Menu) ; **visuel** pleine largeur (ratio 2:1 sur téléphone, 3:1 sur grand écran) avec crédit en petit sous l'image ; **titre** « Mairie d'Ajat » et phrase d'accroche dans un bloc crème ; **trois accès rapides** en tuiles ; puis coordonnées, horaires, actualités (inchangés).
- **Budget à 360 × 640** : en-tête ≈ 56 px + visuel 180 px + titre ≈ 80 px + tuiles ≈ 96 px ≈ **412 px** : tout est visible sans défilement (SC-002), y compris avec la barre d'adresse du navigateur.
- **Alternatives**: texte superposé à la photo (contraste imprévisible) ; carrousel (JavaScript, lourd, inaccessible).

## R6 — Accès rapides

- **Decision**: trois tuiles de 44 px de haut minimum, icône SVG décorative (`aria-hidden`) + libellé : **Horaires** → ancre `#horaires` de la même page (la section d'horaires reste sur l'accueil, exigence de la spec 001) ; **Actualités** → `/actualites/` ; **Salle des fêtes** → `/salle-des-fetes/`.
- **Rationale**: pas de page « Horaires » séparée : un seul appui suffit et on garde une source unique.
- **Alternatives**: bibliothèque d'icônes (poids, dépendance) ; page dédiée aux horaires (doublon).

## R7 — Navigation téléphone

- **Decision**: attribut HTML **`popover`**, sans JavaScript. Un bouton « Menu » (`popovertarget`) ouvre un panneau plein largeur sous l'en-tête, avec les 8 entrées en grille de 2 colonnes (cibles ≥ 44 px) ; **Échap et clic à l'extérieur le ferment** nativement ; le focus reste logique. À partir de 48 rem, le bouton disparaît et la même navigation s'affiche en ligne.
- **Repli** : un navigateur sans Popover ignore l'attribut et affiche simplement la liste (menu toujours visible, rien de cassé).
- **Rationale**: règle le problème des 3 à 4 lignes de liens sur téléphone, avec le moins de code et aucun JavaScript.
- **Alternatives**: `<details>` (ne se ferme pas à Échap ni au clic extérieur, et masquer son contenu sur grand écran est peu fiable) ; menu « hamburger » JavaScript (viole la règle zéro JS) ; garder la liste actuelle (trop haute).

## R8 — Contrôles automatisés

- **Decision**: `check-contrast.mjs` lit les jetons de `tokens.css` et échoue sous les seuils AA (clair et sombre) ; `check-images.mjs` échoue si une image de `dist/` dépasse 200 Ko et avertit au-delà de 600 Ko pour les sources ; Playwright vérifie que les trois accès rapides sont dans le viewport 360 × 640 et que le menu s'ouvre et se ferme au clavier ; axe, Lighthouse et le test « aucun domaine tiers » existants restent bloquants.
- **Limite** : axe ne mesure pas le texte sur image ; on l'évite par conception (R3).

## R9 — Performance de l'accueil

- **Decision**: image d'accueil en `fetchpriority="high"`, `loading="eager"`, avec `srcset` (480, 768, 1200, 1600 px) et `sizes` ; autres images en `loading="lazy"` ; dimensions explicites (pas de décalage de mise en page) ; 2 polices préchargées.
- **Objectif** : LCP < 2,5 s sur mobile simulé ; accueil < 1 Mo.

## R10 — Remplacer la photo plus tard

- **Decision**: collection de données `visuels` (`src/content/donnees/visuels.yml`) : image, description, crédit. Entrée « Visuel d'accueil » dans Pages CMS (envoi dans `src/assets/images/`). Le guide du rédacteur explique le remplacement en 4 gestes. Une photo de la mairie sans exigence de crédit passe par le même formulaire (crédit facultatif).

## Décisions ouvertes (pour toi)

- **Blason** : l'utilise-t-on tel quel ou la mairie a-t-elle son propre logo ? (R4)
- **Photo d'accueil** : `Ajat bourg.JPG` te convient-elle ? (R3)
