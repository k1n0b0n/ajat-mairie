# Guide du relecteur : valider et publier

Vous relisez ce qu'un rédacteur a préparé, puis vous le mettez en ligne. Il vous faut un compte GitHub (gratuit) avec accès au dépôt.

## Relire et publier
1. Vous recevez un courriel de GitHub : « Contenu à relire ». Ouvrez-le (ou allez dans l'onglet **Pull requests** du dépôt).
2. Dans la page, ouvrez le lien **Aperçu (brouillons inclus)** du commentaire. Attendez 1 à 2 minutes s'il n'est pas à jour. Parcourez les pages modifiées (texte, orthographe, images, PDF, horaires).
3. Vérifiez que les contrôles en bas de la page sont **verts**.
4. Tout est bon : **Files changed**, puis **Review changes**, **Approve**, **Submit review**. Cliquez ensuite sur **Merge pull request**, puis **Confirm merge**.
5. Le site public se met à jour en 2 à 10 minutes.

## Demander une modification
Dans **Review changes**, choisissez **Request changes**, écrivez votre remarque en une ou deux phrases, puis **Submit review**. Le rédacteur la voit, corrige dans Pages CMS, et le contrôle se relance tout seul.

## Annuler une publication
1. Ouvrez la PR déjà fusionnée (onglet **Pull requests**, **Closed**).
2. Cliquez sur **Revert**. GitHub prépare une PR inverse.
3. Approuvez et fusionnez-la comme ci-dessus : le contenu disparaît du site.

## Règles
- Vous ne pouvez pas approuver votre propre modification : une autre personne le fait.
- Un contrôle rouge bloque la fusion : lisez le message (image sans description, PDF trop lourd, etc.) et renvoyez au rédacteur.
- Dans l'aperçu, rien n'est confidentiel : le dépôt est public.
