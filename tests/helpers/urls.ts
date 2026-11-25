import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Chemins de toutes les pages du sitemap (dist/ doit avoir été construit), plus la page 404.
export function cheminsDuSite(): string[] {
  const dist = join(process.cwd(), 'dist');
  if (!existsSync(dist)) throw new Error('dist/ introuvable : lancer `npm run build` avant les tests.');
  const chemins = new Set<string>(['/404.html']);
  for (const fichier of readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f))) {
    const xml = readFileSync(join(dist, fichier), 'utf8');
    for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) chemins.add(new URL(loc!).pathname);
  }
  return [...chemins].sort();
}
