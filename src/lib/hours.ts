// Mise en forme des horaires et des fermetures. Calculé au build : le site est statique,
// donc aucune information « ouvert maintenant » (elle serait fausse dès la page chargée).

export const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const;
export type Jour = (typeof JOURS)[number];

export interface Plage {
  open: string;
  close: string;
}

export interface LigneHoraire {
  jour: Jour;
  ferme: boolean;
  texte: string;
}

export interface Fermeture {
  from: Date;
  to: Date;
  reason: string;
}

// « 09:00 » → « 9 h », « 14:30 » → « 14 h 30 »
export function formaterHeure(h: string): string {
  const heures = Number(h.slice(0, 2));
  const minutes = h.slice(3);
  return minutes === '00' ? `${heures} h` : `${heures} h ${minutes}`;
}

export function formaterPlages(plages: Plage[]): string {
  if (plages.length === 0) return 'Fermé';
  return [...plages]
    .sort((a, b) => a.open.localeCompare(b.open))
    .map((p) => `de ${formaterHeure(p.open)} à ${formaterHeure(p.close)}`)
    .join(' et ');
}

export function lignesHoraires(hours: Record<Jour, Plage[]>): LigneHoraire[] {
  return JOURS.map((jour) => ({ jour, ferme: hours[jour].length === 0, texte: formaterPlages(hours[jour]) }));
}

// Date du jour à Paris, au format AAAA-MM-JJ
export function aujourdhui(maintenant = new Date()): string {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(maintenant);
}

const iso = (d: Date): string => d.toISOString().slice(0, 10);

// Fermetures en cours ou à venir : les dates passées sont ignorées.
export function fermetures(liste: Fermeture[], maintenant = new Date()): Fermeture[] {
  const jourCourant = aujourdhui(maintenant);
  return liste.filter((f) => iso(f.to) >= jourCourant).sort((a, b) => a.from.getTime() - b.from.getTime());
}

const dateLongue = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formaterPeriode(f: Fermeture): string {
  return iso(f.from) === iso(f.to)
    ? `le ${dateLongue.format(f.from)}`
    : `du ${dateLongue.format(f.from)} au ${dateLongue.format(f.to)}`;
}

// « 05 53 00 00 00 » → « +33553000000 » pour un lien tel:
export function telephoneInternational(numero: string): string {
  return `+33${numero.replace(/\s/g, '').slice(1)}`;
}
