// Poids des images (contracts/assets.md) : toute image servie ≤ 200 Ko, source ≤ 600 Ko (avertissement),
// blason SVG ≤ 20 Ko et sans contenu actif.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';

const KO = 1024;
const erreurs = [];
const avertissements = [];
const echec = (f, m) => erreurs.push(`::error file=${f}::${m}`);
const alerte = (f, m) => avertissements.push(`::warning file=${f}::${m}`);

const tous = (dossier) =>
  existsSync(dossier) ? readdirSync(dossier, { recursive: true, withFileTypes: true }).filter((e) => e.isFile()).map((e) => join(e.parentPath, e.name)) : [];
const estImage = (f) => /\.(avif|webp|jpe?g|png|gif)$/i.test(f);

// 1. Images de dist/ : référencées par une page ou une feuille de style = servies aux visiteurs
const dist = tous('dist');
const references = new Set();
for (const f of dist.filter((x) => /\.(html|css)$/.test(x))) {
  const texte = readFileSync(f, 'utf8');
  for (const m of texte.matchAll(/(?:src|href|content|srcset)=["']([^"']+)["']|url\(["']?([^)"']+)["']?\)/g)) {
    for (const brut of (m[1] ?? m[2]).split(',')) {
      const chemin = brut.trim().split(/\s+/)[0].split('?')[0];
      if (chemin.startsWith('/') && estImage(chemin)) references.add(posix.join('dist', decodeURIComponent(chemin)));
    }
  }
}
for (const f of dist.filter(estImage)) {
  const taille = statSync(f).size;
  if (taille <= 200 * KO) continue;
  const message = `Image de ${(taille / KO).toFixed(0)} Ko (maximum 200 Ko).`;
  if (references.has(posix.normalize(f))) echec(f, `${message} Elle est servie aux visiteurs.`);
  else alerte(f, `${message} Non référencée par une page : à ne pas publier.`);
}

// 2. Sources du dépôt
for (const f of tous('src/assets/images').filter(estImage)) {
  const taille = statSync(f).size;
  if (taille > 600 * KO) alerte(f, `Source de ${(taille / KO).toFixed(0)} Ko : réduire en dessous de 600 Ko.`);
}

// 3. Blason et signature : poids et contenu actif
const svg = [['src/assets/blason-ajat.svg', 20], ['src/assets/signature-clocher.svg', 2]];
for (const [fichier, maxKo] of svg) {
  if (!existsSync(fichier)) continue;
  const taille = statSync(fichier).size;
  if (taille > maxKo * KO) echec(fichier, `SVG de ${(taille / KO).toFixed(1)} Ko (maximum ${maxKo} Ko).`);
  if (/<script|\son[a-z]+\s*=|href\s*=\s*["']?https?:|<image|<foreignObject|javascript:|<!ENTITY/i.test(readFileSync(fichier, 'utf8'))) {
    echec(fichier, 'Contenu actif ou référence externe dans le SVG (script, événement, lien, image intégrée).');
  }
}

for (const a of avertissements) console.log(a);
for (const e of erreurs) console.log(e);
console.log(`check-images : ${erreurs.length} erreur(s), ${avertissements.length} avertissement(s).`);
process.exit(erreurs.length > 0 ? 1 : 0);
