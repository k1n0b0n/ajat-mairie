# Contrat : phrase d'horaires

`phraseHoraires(hours, closures, note, maintenant)` renvoie une phrase (texte seul) ; `src/lib/horaires-phrase.ts`.

## Règles

1. Regrouper les jours qui ont **exactement les mêmes plages** ; conserver l'ordre de la semaine ; ignorer les jours fermés.
2. Un groupe : « le mardi, le jeudi et le vendredi, de 14 h à 17 h » ; plusieurs plages : « de 9 h à 12 h et de 14 h à 17 h ».
3. Un seul jour : « le mardi ». Tous les jours ouverts avec les mêmes plages : « tous les jours ».
4. Plusieurs groupes : séparés par des points-virgules, par exemple « le lundi, de 9 h à 12 h ; le mardi et le jeudi, de 9 h à 12 h et de 14 h à 17 h ».
5. La phrase commence par « Ouverte » et finit par un point ; elle ne dit jamais « ouvert maintenant ».
6. Aucun jour ouvert : « Fermée tous les jours. Appelez pour prendre rendez-vous. »
7. Fermeture à venir ou en cours (`closures`, dates passées ignorées) : « Fermée du 24 au 31 décembre 2026 (congés). » ajoutée après la phrase, avec ses dates.
8. Remarque (`hoursNote`) : ajoutée telle quelle après la phrase.
9. Les heures sont au format « 14 h » ou « 14 h 30 », comme aujourd'hui (`formaterHeure`).

## Exemples

| Données | Phrase |
|---|---|
| mardi, jeudi, vendredi 14:00-17:00 | Ouverte le mardi, le jeudi et le vendredi, de 14 h à 17 h. |
| lundi 9:00-12:00 ; mardi et jeudi 9:00-12:00 et 14:00-17:00 | Ouverte le lundi, de 9 h à 12 h ; le mardi et le jeudi, de 9 h à 12 h et de 14 h à 17 h. |
| lundi à vendredi 8:30-12:00 | Ouverte le lundi, le mardi, le mercredi, le jeudi et le vendredi, de 8 h 30 à 12 h. |
| les sept jours 9:00-12:00 | Ouverte tous les jours, de 9 h à 12 h. |
| aucun jour | Fermée tous les jours. Appelez pour prendre rendez-vous. |
