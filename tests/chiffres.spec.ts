import { expect, test } from '@playwright/test';

// Spec 003, US4 : les chiffres d'affichage sont en Fraunces (aucun zéro barré, Atkinson barre le zéro).
const voixDesChiffres = /Fraunces/;

test('accueil : téléphone, heures et code postal en Fraunces', async ({ page }) => {
  await page.goto('/');
  for (const selecteur of ['a[href^="tel:"]', '#horaires td:not(.ferme)', 'address .chiffres']) {
    const premier = page.locator(selecteur).first();
    await expect(premier, `${selecteur} présent`).toBeVisible();
    expect(await premier.evaluate((el) => getComputedStyle(el).fontFamily), selecteur).toMatch(voixDesChiffres);
  }
});

test('actualité et liste : les dates sont en Fraunces', async ({ page }) => {
  for (const chemin of ['/actualites/', '/actualites/ouverture-du-nouveau-site/']) {
    await page.goto(chemin);
    const date = page.locator('time').first();
    await expect(date).toBeVisible();
    expect(await date.evaluate((el) => getComputedStyle(el).fontFamily), chemin).toMatch(voixDesChiffres);
  }
});
