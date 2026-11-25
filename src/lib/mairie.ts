import { getEntry } from 'astro:content';

export async function getMairie() {
  const entree = await getEntry('mairie', 'mairie');
  if (!entree) throw new Error('src/content/donnees/mairie.yml : entrée « mairie » introuvable.');
  return entree.data;
}
