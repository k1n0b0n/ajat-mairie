# Contrat : navigation téléphone

Sans JavaScript, par l'attribut HTML `popover`.

## Markup attendu

- Un `<button popovertarget="menu-principal">` « Menu » dans l'en-tête, visible sous 48 rem.
- Un `<nav id="menu-principal" popover aria-label="Navigation principale">` contenant la liste des entrées de `src/lib/nav.ts`.
- Une seule navigation principale dans l'arbre d'accessibilité à la fois : sous 48 rem le bouton ouvre le panneau ; à partir de 48 rem le même `nav` s'affiche en ligne et le bouton est masqué (`display: none`).

## Comportement

| Situation | Résultat |
|---|---|
| Appui sur « Menu » | le panneau s'ouvre sous l'en-tête, pleine largeur, entrées en 2 colonnes |
| Échap, ou clic hors du panneau | le panneau se ferme et le focus revient au bouton |
| Appui sur une entrée | la page s'ouvre ; le panneau est fermé |
| Clavier | Tab traverse les entrées dans l'ordre visuel ; Entrée active le lien |
| Navigateur sans Popover | l'attribut est ignoré, la liste reste affichée (repli sans perte) |
| `prefers-reduced-motion` | aucune animation d'ouverture (aucune n'est prévue) |

## Exigences

- Chaque entrée fait au moins 44 px de haut ; l'entrée de la page courante porte `aria-current="page"` et se distingue par plus que la couleur (trait, graisse).
- Le bouton annonce son état déplié ou replié aux lecteurs d'écran (géré par le navigateur pour `popovertarget`).
- Contrastes selon [design-tokens.md](./design-tokens.md) ; focus visible sur le bouton et sur chaque entrée.
- Tests : `tests/nav-mobile.spec.ts` ouvre le menu au clavier, vérifie la fermeture par Échap et la présence de 8 liens ; axe sans violation.
