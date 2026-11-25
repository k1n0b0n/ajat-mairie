import { expect, test } from '@playwright/test';

// Spec 003, US1 : à 360 × 640 px, la phrase d'horaires et le téléphone sont visibles juste sous la photo.
test.use({ viewport: { width: 360, height: 640 } });

test('accueil : horaires en une phrase, téléphone et adresse visibles sans défilement (360 × 640)', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const phrase = page.locator('.affiche-horaires');
  const telephone = page.locator('.affiche a[href^="tel:"]');
  await expect(phrase).toBeVisible();
  await expect(telephone).toBeVisible();
  // 560 px : marge pour la barre d'adresse du navigateur sur 640 px de hauteur
  for (const element of [phrase, telephone]) {
    const boite = (await element.boundingBox())!;
    expect(boite.y + boite.height).toBeLessThanOrEqual(560);
  }
  expect(((await telephone.boundingBox())!).height).toBeGreaterThanOrEqual(44);
  expect(await phrase.textContent()).toMatch(/^Ouverte /);
  const visuel = page.locator('.hero-visuel img');
  await expect(visuel).toBeVisible();
  expect(await visuel.getAttribute('alt')).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ajat');
});

test('accueil : un seul lien mène au détail des horaires', async ({ page }) => {
  await page.goto('/');
  const lien = page.locator('main a[href="/la-mairie/"]');
  await expect(lien).toHaveCount(1);
  await lien.click();
  await expect(page).toHaveURL(/\/la-mairie\/$/);
});

test('accueil : le crédit de la photo est affiché avec ses liens', async ({ page }) => {
  await page.goto('/');
  const credit = page.locator('.credit-photo');
  await expect(credit).toContainText('Père Igor');
  await expect(credit.getByRole('link', { name: 'CC BY-SA 4.0' })).toHaveAttribute('href', /creativecommons\.org/);
  await expect(credit).toContainText('recadrée et compressée');
});
