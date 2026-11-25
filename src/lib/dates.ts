import type { ChampsCommuns } from './schema-commun';

const dateLongue = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formaterDate = (d: Date): string => dateLongue.format(d);
export const dateIso = (d: Date): string => d.toISOString().slice(0, 10);

// Date de référence d'un contenu : publication, sinon dernière mise à jour.
export const dateDe = (data: Pick<ChampsCommuns, 'publishDate' | 'updatedDate'>): Date | undefined =>
  data.publishDate ?? data.updatedDate;

// Tri du plus récent au plus ancien ; les contenus sans date en dernier.
export const parDateDecroissante = <T extends { data: Pick<ChampsCommuns, 'publishDate' | 'updatedDate'> }>(a: T, b: T): number =>
  (dateDe(b.data)?.getTime() ?? 0) - (dateDe(a.data)?.getTime() ?? 0);
