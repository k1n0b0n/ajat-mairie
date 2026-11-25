// Mesure du poids d'une page comme sur l'hébergement : le texte est compté compressé (gzip),
// les polices et les images tels quels. Utilisé par tests/page-budget.spec.ts et scripts/mesure-pages.mjs.
import { gzipSync } from 'node:zlib';

const TEXTE = /html|css|javascript|json|xml|svg/;

export async function mesurerPage(page, url) {
  const lectures = [];
  const octets = { html: 0, css: 0, police: 0, image: 0, script: 0, autre: 0 };
  const nombre = { police: 0, script: 0 };
  let requetes = 0;

  page.on('response', (reponse) => {
    lectures.push(
      (async () => {
        let corps;
        try {
          corps = await reponse.body();
        } catch {
          return;
        }
        const type = reponse.headers()['content-type'] ?? '';
        const taille = TEXTE.test(type) ? gzipSync(corps).length : corps.length;
        const cle = type.includes('html') ? 'html' : type.includes('css') ? 'css' : type.includes('font') ? 'police' : type.includes('image') ? 'image' : type.includes('javascript') ? 'script' : 'autre';
        octets[cle] += taille;
        if (cle === 'police' || cle === 'script') nombre[cle]++;
        requetes++;
      })(),
    );
  });

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  await Promise.all(lectures);
  const total = Object.values(octets).reduce((a, b) => a + b, 0);
  return { requetes, total, octets, polices: nombre.police, scripts: nombre.script };
}
