// Tableau de poids et de requêtes par page type, sur téléphone (360 px) et ordinateur (1280 px).
// Usage : npm run build && node scripts/mesure-pages.mjs   (voir docs/declaration-ecoconception.md)
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { mesurerPage } from './lib/mesure.mjs';

const PORT = 4398;
const pages = ['/', '/actualites/', '/demarches/', '/salle-des-fetes/', '/decouvrir/patrimoine/', '/mentions-legales/'];
const ecrans = [
  ['téléphone 360 px', { width: 360, height: 640 }],
  ['ordinateur 1280 px', { width: 1280, height: 800 }],
];
const ko = (n) => `${(n / 1024).toFixed(0)}`.padStart(4);

const serveur = spawn('npx', ['astro', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--ignore-lock'], { stdio: 'ignore' });
try {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${PORT}/`)).ok) break;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  const navigateur = await chromium.launch();
  for (const [nom, viewport] of ecrans) {
    console.log(`\n${nom}`);
    console.log('page'.padEnd(26), 'req', ' total', ' html', '  css', 'polices', 'images');
    for (const chemin of pages) {
      const page = await navigateur.newPage({ viewport });
      const m = await mesurerPage(page, `http://127.0.0.1:${PORT}${chemin}`);
      console.log(chemin.padEnd(26), String(m.requetes).padStart(3), `${ko(m.total)} Ko`.padStart(6), ko(m.octets.html), ko(m.octets.css), ko(m.octets.police).padStart(7), ko(m.octets.image).padStart(6));
      await page.close();
    }
  }
  await navigateur.close();
} finally {
  serveur.kill();
}
