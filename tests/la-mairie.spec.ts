import { expect, test } from '@playwright/test';

// Spec 003, US5 : le tableau détaillé vit sur la page « La mairie », pas sur l'accueil.
test("la page La mairie contient le tableau de sept jours, le téléphone et l'adresse", async ({ page }) => {
  await page.goto('/la-mairie/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('La mairie');
  await expect(page.locator('#horaires tbody tr')).toHaveCount(7);
  await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
  await expect(page.locator('address')).toContainText('Ajat');
});

test("la phrase de l'accueil et le tableau partagent la même saisie", async ({ page }) => {
  await page.goto('/la-mairie/');
  const ouverts = await page.locator('#horaires tbody tr').evaluateAll((lignes) =>
    lignes.filter((l) => !l.querySelector('td.ferme')).map((l) => l.querySelector('th')!.textContent!.trim().toLowerCase()),
  );
  await page.goto('/');
  const phrase = (await page.locator('.affiche-horaires').textContent())!;
  for (const jour of ouverts) expect(phrase, jour).toContain(jour);
  expect(ouverts.length).toBeGreaterThan(0);
});

test("l'accueil n'a plus de tableau d'horaires", async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('table')).toHaveCount(0);
});
