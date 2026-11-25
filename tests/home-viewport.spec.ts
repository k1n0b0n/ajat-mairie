import { expect, test } from '@playwright/test';

// Spec 002, US1 : à 360 × 640 px, le visuel, le titre et les trois accès rapides sont visibles sans défilement.
test.use({ viewport: { width: 360, height: 640 } });

test('accueil : visuel et accès rapides visibles sans défilement (360 × 640)', async ({ page }) => {
  await page.goto('/');
  const tuiles = page.getByRole('navigation', { name: 'Accès rapides' }).getByRole('link');
  await expect(tuiles).toHaveCount(3);
  for (const tuile of await tuiles.all()) {
    const boite = await tuile.boundingBox();
    expect(boite, 'tuile visible').not.toBeNull();
    // 560 px : marge pour la barre d'adresse du navigateur sur 640 px de hauteur
    expect(boite!.y + boite!.height).toBeLessThanOrEqual(560);
    expect(boite!.height).toBeGreaterThanOrEqual(44);
  }
  const visuel = page.locator('.hero-visuel img');
  await expect(visuel).toBeVisible();
  expect(await visuel.getAttribute('alt')).toBeTruthy();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('accueil : chaque accès rapide mène à la bonne destination', async ({ page }) => {
  await page.goto('/');
  const tuiles = page.getByRole('navigation', { name: 'Accès rapides' });
  await expect(tuiles.getByRole('link', { name: 'Horaires' })).toHaveAttribute('href', '#horaires');
  await expect(tuiles.getByRole('link', { name: 'Actualités' })).toHaveAttribute('href', '/actualites/');
  await expect(tuiles.getByRole('link', { name: 'Salle des fêtes' })).toHaveAttribute('href', '/salle-des-fetes/');
  await tuiles.getByRole('link', { name: 'Horaires' }).click();
  await expect(page.locator('#horaires')).toBeInViewport();
});

test('accueil : le crédit de la photo est affiché avec ses liens', async ({ page }) => {
  await page.goto('/');
  const credit = page.locator('.credit-photo');
  await expect(credit).toContainText('Père Igor');
  await expect(credit.getByRole('link', { name: 'CC BY-SA 4.0' })).toHaveAttribute('href', /creativecommons\.org/);
  await expect(credit).toContainText('recadrée et compressée');
});
