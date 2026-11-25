// Phrase d'horaires de l'accueil (spec 003, contracts/phrase-horaires.md) : dérivée des horaires saisis,
// jamais écrite à la main. Fonction pure : aucune dépendance à Astro.
import { JOURS, aujourdhui, formaterHeure, fermetures, type Fermeture, type Jour, type Plage } from './hours';

const dateJour = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', timeZone: 'UTC' });
const dateMois = new Intl.DateTimeFormat('fr-FR', { month: 'long', timeZone: 'UTC' });
const dateComplete = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const liste = (elements: string[]): string =>
  elements.length <= 1 ? (elements[0] ?? '') : `${elements.slice(0, -1).join(', ')} et ${elements[elements.length - 1]}`;

const plagesEnTexte = (plages: Plage[]): string =>
  [...plages]
    .sort((a, b) => a.open.localeCompare(b.open))
    .map((p) => `de ${formaterHeure(p.open)} à ${formaterHeure(p.close)}`)
    .join(' et ');

// « le 24 décembre 2026 », « du 24 au 31 décembre 2026 », « du 24 décembre 2026 au 3 janvier 2027 »
function periode(f: Fermeture): string {
  const [debut, fin] = [f.from, f.to];
  if (debut.getTime() === fin.getTime()) return `le ${dateComplete.format(debut)}`;
  const memeMois = dateMois.format(debut) === dateMois.format(fin) && debut.getUTCFullYear() === fin.getUTCFullYear();
  return memeMois
    ? `du ${dateJour.format(debut)} au ${dateComplete.format(fin)}`
    : `du ${dateComplete.format(debut)} au ${dateComplete.format(fin)}`;
}

export function phraseHoraires(
  hours: Record<Jour, Plage[]>,
  closures: Fermeture[] = [],
  note?: string,
  maintenant: Date = new Date(),
): string {
  // Regroupe les jours qui ont exactement les mêmes plages, dans l'ordre de la semaine
  const groupes = new Map<string, { jours: Jour[]; plages: Plage[] }>();
  for (const jour of JOURS) {
    const plages = hours[jour];
    if (plages.length === 0) continue;
    const cle = plagesEnTexte(plages);
    const groupe = groupes.get(cle);
    if (groupe) groupe.jours.push(jour);
    else groupes.set(cle, { jours: [jour], plages });
  }

  let phrase: string;
  if (groupes.size === 0) {
    phrase = 'Fermée tous les jours. Appelez pour prendre rendez-vous.';
  } else {
    const morceaux = [...groupes.entries()].map(([texte, groupe]) => {
      const jours = groupe.jours.length === JOURS.length ? 'tous les jours' : liste(groupe.jours.map((j) => `le ${j}`));
      return `${jours}, ${texte}`;
    });
    phrase = `Ouverte ${morceaux.join(' ; ')}.`;
  }

  for (const f of fermetures(closures, maintenant)) {
    phrase += ` Fermée ${periode(f)} (${f.reason}).`;
  }
  if (note) phrase += ` ${note}`;
  return phrase;
}

export { aujourdhui };
