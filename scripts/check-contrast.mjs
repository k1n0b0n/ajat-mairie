// Contrastes de la palette (contracts/design-tokens.md) : AA dans les thèmes clair et sombre.
// Échoue aussi si une couleur hexadécimale est écrite en dur hors de src/styles/tokens.css.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const tokens = readFileSync('src/styles/tokens.css', 'utf8');

// Extrait les déclarations --nom: #hex d'un bloc CSS
const lireJetons = (bloc) => Object.fromEntries([...bloc.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]));

const blocSombre = tokens.match(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\}\s*\}/)?.[1];
if (!blocSombre) throw new Error('Bloc sombre introuvable dans src/styles/tokens.css.');
const blocClair = tokens.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
const clair = lireJetons(blocClair);
const sombre = { ...clair, ...lireJetons(blocSombre) };

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const rapport = (a, b) => {
  const [haut, bas] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (haut + 0.05) / (bas + 0.05);
};

// [premier plan, arrière-plan, seuil]
const couples = [
  ['texte', 'fond', 4.5],
  ['texte', 'fond-doux', 4.5],
  ['texte-doux', 'fond', 4.5],
  ['texte-doux', 'fond-doux', 4.5],
  ['chene', 'fond', 4.5],
  ['chene', 'fond-doux', 4.5],
  ['chene-texte', 'chene', 4.5],
  ['ocre-texte', 'fond', 4.5],
  ['ocre-texte', 'fond-doux', 4.5],
  ['texte', 'alerte-fond', 4.5],
  ['alerte-bord', 'fond', 3],
  ['focus', 'fond', 3],
  ['focus', 'fond-doux', 3],
  ['bordure-forte', 'fond', 3],
  ['bordure-forte', 'fond-doux', 3],
  ['ocre-deco', 'fond', 3],
];

let echecs = 0;
for (const [nom, theme] of [['clair', clair], ['sombre', sombre]]) {
  for (const [av, ar, seuil] of couples) {
    if (!theme[av] || !theme[ar]) {
      console.log(`::error file=src/styles/tokens.css::Jeton manquant dans le thème ${nom} : ${!theme[av] ? av : ar}`);
      echecs++;
      continue;
    }
    const r = rapport(theme[av], theme[ar]);
    if (r < seuil) {
      console.log(`::error file=src/styles/tokens.css::Contraste ${r.toFixed(2)} < ${seuil} (${nom}) : ${av} sur ${ar}`);
      echecs++;
    }
  }
}

// Aucune couleur en dur hors des jetons
const fichiersCss = (dossier) =>
  existsSync(dossier) ? readdirSync(dossier, { recursive: true, withFileTypes: true }).filter((e) => e.isFile()).map((e) => join(e.parentPath, e.name)) : [];
const aVerifier = [];
for (const f of fichiersCss('src/styles')) if (f.endsWith('.css') && !f.endsWith('tokens.css')) aVerifier.push([f, readFileSync(f, 'utf8')]);
for (const f of fichiersCss('src/components').concat(fichiersCss('src/layouts'), fichiersCss('src/pages'))) {
  if (!f.endsWith('.astro')) continue;
  const blocs = [...readFileSync(f, 'utf8').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  if (blocs.length) aVerifier.push([f, blocs.join('\n')]);
}
for (const [f, texte] of aVerifier) {
  for (const m of texte.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    console.log(`::error file=${f}::Couleur en dur ${m[0]} : utiliser un jeton de tokens.css.`);
    echecs++;
  }
}

console.log(`check-contrast : ${couples.length * 2} couples vérifiés, ${echecs} erreur(s).`);
process.exit(echecs > 0 ? 1 : 0);
