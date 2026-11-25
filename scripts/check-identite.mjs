// Principe X de la constitution (identité propre, pas de gabarit) : interdits mesurables.
// - aucun dégradé CSS dans les styles, composants et pages ;
// - aucun des mots « moderne », « épuré », « premium » dans les textes du site.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const fichiers = (dossier, extensions) =>
  existsSync(dossier)
    ? readdirSync(dossier, { recursive: true, withFileTypes: true })
        .filter((e) => e.isFile() && extensions.some((x) => e.name.endsWith(x)))
        .map((e) => join(e.parentPath, e.name))
    : [];

const erreurs = [];

// 1. Dégradés : fonctions CSS et images de dégradé
const styles = [...fichiers('src/styles', ['.css']), ...fichiers('src/components', ['.astro']), ...fichiers('src/layouts', ['.astro']), ...fichiers('src/pages', ['.astro'])];
for (const f of styles) {
  const texte = readFileSync(f, 'utf8');
  const m = texte.match(/(linear|radial|conic)-gradient\(/);
  if (m) erreurs.push(`::error file=${f}::Dégradé interdit (${m[0]}…) : principe X, pas de dégradé.`);
}

// 2. Mots interdits dans les textes du site
const textes = [
  ...fichiers('src/content', ['.md', '.yml']),
  ...fichiers('src/components', ['.astro']),
  ...fichiers('src/pages', ['.astro']),
  ...fichiers('src/layouts', ['.astro']),
  ...fichiers('src/lib', ['.ts']),
];
for (const f of textes) {
  const m = readFileSync(f, 'utf8').match(/\b(moderne|modernes|épuré|épurée|épurés|premium)\b/i);
  if (m) erreurs.push(`::error file=${f}::Mot interdit « ${m[0]} » : le caractère du site ne s'en réclame pas.`);
}

for (const e of erreurs) console.log(e);
console.log(`check-identite : ${styles.length} fichiers de style et ${textes.length} fichiers de texte contrôlés, ${erreurs.length} erreur(s).`);
process.exit(erreurs.length > 0 ? 1 : 0);
