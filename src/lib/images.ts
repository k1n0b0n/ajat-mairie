import type { ImageMetadata } from 'astro';

// Images de couverture : dossier src/assets/images (optimisées au build).
// Pages CMS écrit un chemin dont seule la fin est fiable : on retrouve l'image par son nom de fichier.
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}', { eager: true });

export function resoudreImage(reference: string): ImageMetadata {
  const nom = reference.split('/').pop();
  const trouve = Object.entries(images).find(([chemin]) => chemin.split('/').pop() === nom);
  if (!trouve) throw new Error(`Image de couverture introuvable : « ${reference} » (attendue dans src/assets/images/).`);
  return trouve[1].default;
}
