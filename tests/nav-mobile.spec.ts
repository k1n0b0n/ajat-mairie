import { expect, test } from '@playwright/test';

// Spec 002, contrat navigation-mobile.md : menu « popover » sans JavaScript.
test.describe('téléphone (360 px)', () => {
  test.use({ viewport: { width: 360, height: 640 } });

  test('le menu s’ouvre au clavier, contient 8 liens et se ferme avec Échap', async ({ page }) => {
    await page.goto('/');
    const menu = page.getByRole('navigation', { name: 'Navigation principale' });
    await expect(menu).toBeHidden();

    const bouton = page.getByRole('button', { name: 'Menu' });
    await bouton.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link')).toHaveCount(8);

    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.closest('nav#menu-principal') !== null)).toBe(true);

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
  });

  test('les entrées du menu font au moins 44 px de haut', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    for (const lien of await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link').all()) {
      expect((await lien.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('un appui hors du panneau le ferme', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    const menu = page.getByRole('navigation', { name: 'Navigation principale' });
    await expect(menu).toBeVisible();
    await page.mouse.click(180, 630);
    await expect(menu).toBeHidden();
  });
});

test.describe('écran large (1024 px)', () => {
  test.use({ viewport: { width: 1024, height: 768 } });

  test('la liste est affichée en ligne, sans bouton Menu', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
    const menu = page.getByRole('navigation', { name: 'Navigation principale' });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link')).toHaveCount(8);
  });
});
