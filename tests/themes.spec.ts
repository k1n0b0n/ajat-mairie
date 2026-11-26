import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Spec 002, US2 : le site reste conforme en thème sombre et en contraste élevé (mode couleurs forcées).
const pages = ['/', '/actualites/', '/salle-des-fetes/', '/mentions-legales/'];

for (const [nom, options] of [
  ['thème sombre', { colorScheme: 'dark' as const }],
  ['contraste élevé', { forcedColors: 'active' as const }],
]) {
  test.describe(nom, () => {
    test.use(options);

    for (const chemin of pages) {
      test(`axe sans violation sur ${chemin}`, async ({ page }) => {
        await page.goto(chemin);
        const resultat = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
        expect(resultat.violations.map((v) => `${v.id} : ${v.nodes.length} élément(s)`)).toEqual([]);
      });
    }

    test("le bouton Menu, l'affiche de la mairie et le menu restent distinguables et utilisables", async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 640 });
      await page.goto('/');
      await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
      await expect(page.locator('.affiche a[href^="tel:"]')).toBeVisible();
      await page.getByRole('button', { name: 'Menu' }).click();
      await expect(page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link')).toHaveCount(8);
    });
  });
}
