import { expect, test } from '@playwright/test';

// Constitution, principe X : une même destination n'apparaît qu'une fois dans le contenu principal de l'accueil
// (l'en-tête, la navigation et le pied de page ne sont pas comptés), aucune tuile, aucune icône de décor.
test('accueil : chaque destination de lien une seule fois dans main', async ({ page }) => {
  await page.goto('/');
  const destinations = await page.locator('main a[href]').evaluateAll((liens) =>
    liens.map((a) => {
      const u = new URL((a as HTMLAnchorElement).href);
      return u.protocol === 'http:' || u.protocol === 'https:' ? u.origin + u.pathname + u.search + u.hash : u.href;
    }),
  );
  const doublons = destinations.filter((d, i) => destinations.indexOf(d) !== i);
  expect(doublons, 'destinations répétées').toEqual([]);
});

test('accueil : ni tuiles, ni icônes de décor, ni tableau dans main', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main .tuiles')).toHaveCount(0);
  await expect(page.locator('main svg[aria-hidden="true"]')).toHaveCount(0);
  await expect(page.locator('main table')).toHaveCount(0);
});

test('accueil : à 1280 px, le contenu occupe la largeur', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const largeur = (await page.locator('main > .conteneur-large').boundingBox())!.width;
  expect(largeur).toBeGreaterThan(1280 * 0.6);
  const zones = page.locator('.zones > *');
  await expect(zones).toHaveCount(2);
  const [a, b] = [(await zones.nth(0).boundingBox())!, (await zones.nth(1).boundingBox())!];
  expect(Math.abs(a.y - b.y), 'zones côte à côte').toBeLessThan(40);
  expect(Math.abs(a.width - b.width), 'largeurs inégales').toBeGreaterThan(40);
});
