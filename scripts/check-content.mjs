// Contrôles de contenu hors schéma (contracts/content-schemas.md : C4, C5, C6, C7, C10).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { parse } from 'yaml';

const MO = 1024 * 1024;
const racine = 'src/content';
const erreurs = [];
const avertissements = [];

const echec = (fichier, message) => erreurs.push({ fichier, message });
const alerte = (fichier, message) => avertissements.push({ fichier, message });

function fichiers(dossier, extension) {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && extname(e.name) === extension)
    .map((e) => join(e.parentPath, e.name));
}

function lire(fichier) {
  const texte = readFileSync(fichier, 'utf8');
  const m = texte.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { donnees: parse(m[1]) ?? {}, corps: m[2] } : { donnees: {}, corps: texte };
}

const slugs = new Map();
for (const fichier of fichiers(racine, '.md')) {
  const { donnees, corps } = lire(fichier);
  const collection = fichier.split('/')[2];

  // C4 : image Markdown sans description
  for (const m of corps.matchAll(/!\[([^\]]*)\]\([^)]*\)/g)) {
    if (!m[1].trim()) echec(fichier, 'Image sans description alternative (C4).');
  }

  // C5 : compte rendu avec un PDF existant
  if (collection === 'comptes-rendus') {
    const f = donnees.file;
    if (typeof f !== 'string' || extname(f).toLowerCase() !== '.pdf') echec(fichier, 'Le champ « file » doit désigner un fichier .pdf (C5).');
    else if (!existsSync(join('public', f))) echec(fichier, `PDF introuvable : public${f} (C5).`);
  }

  // C7 : pages légales et déclaration d'accessibilité toujours publiées
  if (collection === 'pages' && ['legal', 'accessibilite'].includes(donnees.kind) && donnees.draft !== false) {
    echec(fichier, 'Une page légale ou la déclaration d’accessibilité ne peut pas rester en brouillon (C7).');
  }

  // C10 : slugs uniques dans une collection
  const slug = donnees.slug ?? basename(fichier, '.md');
  const cle = `${collection}/${slug}`;
  if (slugs.has(cle)) echec(fichier, `Adresse en double avec ${slugs.get(cle)} (C10).`);
  else slugs.set(cle, fichier);
}

// C6 : poids des PDF
for (const fichier of fichiers('public/documents', '.pdf')) {
  const taille = statSync(fichier).size;
  if (taille > 10 * MO) echec(fichier, `PDF de ${(taille / MO).toFixed(1)} Mo : maximum 10 Mo (C6).`);
  else if (taille > 3 * MO) alerte(fichier, `PDF de ${(taille / MO).toFixed(1)} Mo : au-delà de 3 Mo, compresser si possible (C6).`);
}

for (const a of avertissements) console.log(`::warning file=${a.fichier}::${a.message}`);
for (const e of erreurs) console.log(`::error file=${e.fichier}::${e.message}`);
console.log(`check-content : ${erreurs.length} erreur(s), ${avertissements.length} avertissement(s).`);
process.exit(erreurs.length > 0 ? 1 : 0);
