// Dit si un contenu change de statut dans les dernières 24 à 48 h, donc si la reconstruction nocturne
// est utile : actualité ou page programmée qui devient visible, fermeture exceptionnelle qui expire.
// Écrit « a_faire=true|false » dans $GITHUB_OUTPUT (workflow nightly.yml) et sur la sortie standard.
import { appendFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const parisIso = (date) => new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(date);
const maintenant = process.env.NOW ? new Date(process.env.NOW) : new Date();
const aujourdhui = parisIso(maintenant);
const hier = parisIso(new Date(maintenant.getTime() - 24 * 3600 * 1000));
// Fenêtre de deux jours : une nuit manquée ne fait rater aucun changement.
const dansLaFenetre = (valeur) => {
  if (!valeur) return false;
  const jour = valeur instanceof Date ? valeur.toISOString().slice(0, 10) : String(valeur).slice(0, 10);
  return jour === aujourdhui || jour === hier;
};

const changements = [];

const fichiers = (dossier) =>
  existsSync(dossier) ? readdirSync(dossier, { recursive: true, withFileTypes: true }).filter((e) => e.isFile() && e.name.endsWith('.md')).map((e) => join(e.parentPath, e.name)) : [];

for (const fichier of fichiers('src/content')) {
  const m = readFileSync(fichier, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const donnees = m ? (parse(m[1]) ?? {}) : {};
  if (donnees.draft === false && dansLaFenetre(donnees.publishDate)) changements.push(`${fichier} : publication le ${String(donnees.publishDate).slice(0, 10)}`);
}

// Fermeture exceptionnelle : elle disparaît le lendemain de sa date de fin (« to » est inclus)
const mairie = 'src/content/donnees/mairie.yml';
if (existsSync(mairie)) {
  const fermetures = parse(readFileSync(mairie, 'utf8'))?.mairie?.closures ?? [];
  for (const f of fermetures) if (dansLaFenetre(f.to)) changements.push(`${mairie} : fermeture « ${f.reason} » terminée le ${String(f.to).slice(0, 10)}`);
}

const aFaire = changements.length > 0;
for (const c of changements) console.log(`changement : ${c}`);
console.log(`a_faire=${aFaire}`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `a_faire=${aFaire}\n`);
