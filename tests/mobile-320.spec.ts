import { expect, test } from '@playwright/test';
import { cheminsDuSite } from './helpers/urls';

test.use({ viewport: { width: 320, height: 640 } });

for (const chemin of cheminsDuSite()) {
  test(`pas de défilement horizontal à 320 px ${chemin}`, async ({ page }) => {
    await page.goto(chemin);
    const { largeurContenu, largeurFenetre } = await page.evaluate(() => ({
      largeurContenu: document.documentElement.scrollWidth,
      largeurFenetre: document.documentElement.clientWidth,
    }));
    expect(largeurContenu).toBeLessThanOrEqual(largeurFenetre);
  });
}
