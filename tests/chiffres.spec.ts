import { expect, test } from '@playwright/test';

// Spec 003, US4 : les chiffres d'affichage sont en Fraunces (aucun zéro barré, Atkinson barre le zéro).
const voixDesChiffres = /Fraunces/;

test('accueil : téléphone, heures et code postal en Fraunces', async ({ page }) => {
  await page.goto('/');
  for (const selecteur of ['.affiche-horaires', 'address .chiffres']) {
    const premier = page.locator(selecteur).first();
    await expect(premier, `${selecteur} présent`).toBeVisible();
    expect(await premier.evaluate((el) => getComputedStyle(el).fontFamily), selecteur).toMatch(voixDesChiffres);
  }
});

test('le numéro de téléphone est dans une police lisible, sans zéro barré', async ({ page }) => {
  for (const chemin of ['/', '/la-mairie/']) {
    await page.goto(chemin);
    const famille = await page.locator('a[href^="tel:"]').first().evaluate((el) => getComputedStyle(el).fontFamily);
    expect(famille, chemin).toMatch(/system-ui/);
    expect(famille, chemin).not.toMatch(/Atkinson/);
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
