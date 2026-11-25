import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ChampsCommuns } from './schema-commun';

// En aperçu (PREVIEW=1) les brouillons et les contenus programmés sont visibles.
export const estApercu = process.env.PREVIEW === '1';

export function estPublie(data: Pick<ChampsCommuns, 'draft' | 'publishDate'>, maintenant = new Date()): boolean {
  if (estApercu) return true;
  if (data.draft) return false;
  return data.publishDate === undefined || data.publishDate <= maintenant;
}

export async function getPublies<K extends CollectionKey>(nom: K): Promise<CollectionEntry<K>[]> {
  return getCollection(nom, ({ data }) => estPublie(data as ChampsCommuns)) as Promise<CollectionEntry<K>[]>;
}
