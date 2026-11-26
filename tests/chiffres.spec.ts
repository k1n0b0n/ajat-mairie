import { expect, test } from '@playwright/test';

// Spec 003, US4 : les chiffres d'affichage sont dans la police du système (Fraunces n'est jamais utilisée pour les chiffres, Atkinson barre le zéro).
const voixDesChiffres = /system-ui/;

test('accueil : téléphone, heures et code postal dans la police du système', async ({ page }) => {
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

test('actualité et liste : les dates sont dans la police du système', async ({ page }) => {
  for (const chemin of ['/actualites/', '/actualites/ouverture-du-nouveau-site/']) {
    await page.goto(chemin);
    const date = page.locator('time').first();
    await expect(date).toBeVisible();
    expect(await date.evaluate((el) => getComputedStyle(el).fontFamily), chemin).toMatch(voixDesChiffres);
  }
});

test("Fraunces ne couvre pas les chiffres 0 à 9, nulle part sur le site", async ({ page }) => {
  await page.goto('/');
  const plage = await page.evaluate(() => {
    const regles = [...document.styleSheets].flatMap((f) => [...f.cssRules]).filter((r) => r instanceof CSSFontFaceRule && /Fraunces/.test(r.style.fontFamily));
    return regles.map((r) => r.style.getPropertyValue('unicode-range'));
  });
  expect(plage.length).toBeGreaterThan(0);
  for (const p of plage) expect(p).not.toMatch(/U\+0000-00FF|U\+0030/i);
});
