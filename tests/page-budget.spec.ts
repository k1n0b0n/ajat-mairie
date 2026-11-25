import { expect, test } from '@playwright/test';
import { mesurerPage } from '../scripts/lib/mesure.mjs';
import { cheminsDuSite } from './helpers/urls';

// Principe IX de la constitution (sobriété numérique) et contracts/ecoconception.md :
// budgets mesurés sur téléphone, texte compressé comme sur l'hébergement.
test.use({ viewport: { width: 360, height: 640 } });

const KO = 1024;
const BUDGET_ACCUEIL = 120 * KO;
const BUDGET_PAGE = 100 * KO;
const MAX_REQUETES = 10;
const MAX_POLICES = 3;
const MAX_OCTETS_POLICES = 400 * KO;

for (const chemin of cheminsDuSite()) {
  test(`budget de poids et de requêtes : ${chemin}`, async ({ page }) => {
    const m = await mesurerPage(page, chemin);
    const budget = chemin === '/' ? BUDGET_ACCUEIL : BUDGET_PAGE;
    const detail = `${(m.total / KO).toFixed(0)} Ko, ${m.requetes} requêtes`;
    expect(m.total, `poids de ${chemin} : ${detail} (limite ${budget / KO} Ko)`).toBeLessThanOrEqual(budget);
    expect(m.requetes, `requêtes de ${chemin} : ${detail}`).toBeLessThanOrEqual(MAX_REQUETES);
    expect(m.polices, 'fichiers de polices').toBeLessThanOrEqual(MAX_POLICES);
    expect(m.octets.police, 'poids des polices').toBeLessThanOrEqual(MAX_OCTETS_POLICES);
    expect(m.scripts, 'scripts').toBe(0);
  });
}
