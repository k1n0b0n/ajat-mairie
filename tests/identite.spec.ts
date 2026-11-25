import { expect, test } from '@playwright/test';

// Spec 003, US2 : l'accueil dit Ajat ; le nom posé sur la photo reste lisible AA, sans dégradé (principe X).
const luminance = ([r, g, b]: number[]) => {
  const [R, G, B] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R! + 0.7152 * G! + 0.0722 * B!;
};
const rapport = (a: number[], b: number[]) => {
  const [haut, bas] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (haut! + 0.05) / (bas! + 0.05);
};
const rvb = (css: string) => css.match(/\d+(\.\d+)?/g)!.slice(0, 4).map(Number);

test('la plaque « Ajat » est opaque, lisible AA et posée sur la photo', async ({ page }) => {
  await page.goto('/');
  const plaque = page.locator('.plaque');
  await expect(plaque.getByRole('heading', { level: 1 })).toHaveText('Ajat');
  const { fond, texte } = await plaque.evaluate((el) => ({
    fond: getComputedStyle(el).backgroundColor,
    texte: getComputedStyle(el.querySelector('h1')!).color,
  }));
  const [r, g, b, alpha = 1] = rvb(fond);
  expect(alpha, 'fond opaque : le contraste ne dépend pas de la photo').toBe(1);
  expect(rapport([r!, g!, b!], rvb(texte).slice(0, 3))).toBeGreaterThanOrEqual(4.5);
  // posée sur la photo : la plaque est contenue dans la figure du visuel
  const [boitePlaque, boiteVisuel] = [(await plaque.boundingBox())!, (await page.locator('.hero-visuel').boundingBox())!];
  expect(boitePlaque.y).toBeGreaterThanOrEqual(boiteVisuel.y);
  expect(boitePlaque.y + boitePlaque.height).toBeLessThanOrEqual(boiteVisuel.y + boiteVisuel.height);
});

test("aucun dégradé dans le contenu de l'accueil", async ({ page }) => {
  await page.goto('/');
  const avecDegrade = await page.locator('main *').evaluateAll((els) =>
    els.filter((el) => /gradient/.test(getComputedStyle(el).backgroundImage)).map((el) => el.className || el.tagName),
  );
  expect(avecDegrade).toEqual([]);
});

test("les éléments propres à Ajat sont présents sur l'accueil", async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-visuel img')).toHaveAttribute('alt', /Ajat/);
  await expect(page.locator('header img[src*="blason"]')).toHaveCount(1);
  await expect(page.locator('.village')).toContainText('Saint-Martin');
  expect(await page.locator('.affiche-horaires').textContent()).toMatch(/^Ouverte /);
});
