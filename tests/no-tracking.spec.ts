import { expect, test } from '@playwright/test';
import { cheminsDuSite } from './helpers/urls';

for (const chemin of cheminsDuSite()) {
  test(`aucun cookie ni requête tierce ${chemin}`, async ({ page, context, baseURL }) => {
    const origine = new URL(baseURL!).origin;
    const externes: string[] = [];
    const cookiesRecus: string[] = [];
    page.on('request', (r) => {
      if (!r.url().startsWith(origine) && !r.url().startsWith('data:')) externes.push(r.url());
    });
    page.on('response', async (r) => {
      const entetes = await r.allHeaders();
      if (entetes['set-cookie']) cookiesRecus.push(r.url());
    });
    await page.goto(chemin, { waitUntil: 'networkidle' });
    expect(externes, 'requêtes vers un autre domaine').toEqual([]);
    expect(cookiesRecus, 'réponses avec Set-Cookie').toEqual([]);
    expect(await context.cookies(), 'cookies déposés').toEqual([]);
    expect(await page.evaluate(() => document.cookie), 'document.cookie').toBe('');
  });
}
