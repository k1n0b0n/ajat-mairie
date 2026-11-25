import { expect, test } from '@playwright/test';
import { cheminsDuSite } from './helpers/urls';

// RGAA 10.12 / WCAG 1.4.12 : l'utilisateur peut imposer ces espacements sans perte de contenu ni de fonctionnalité.
test.use({ viewport: { width: 320, height: 640 } });

const espacements = `
  * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
  p { margin-bottom: 2em !important; }
`;

for (const chemin of cheminsDuSite()) {
  test(`espacement de texte imposé : aucun débordement sur ${chemin}`, async ({ page }) => {
    await page.goto(chemin);
    await page.addStyleTag({ content: espacements });
    const resultat = await page.evaluate(() => {
      const defilementHorizontal = document.documentElement.scrollWidth > document.documentElement.clientWidth;
      // Texte coupé : un élément qui masque ou défile son contenu et dont le contenu dépasse la boîte
      // Le texte réservé aux lecteurs d'écran (.sr-only) est masqué volontairement : il est exclu.
      const coupes = [...document.querySelectorAll('a, button, summary, h1, h2, h3, p, li, th, td, span, label')].filter((el) => !el.closest('.sr-only')).filter((el) => {
        const s = getComputedStyle(el);
        const masque = s.overflowX !== 'visible' || s.overflowY !== 'visible';
        return masque && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) && el.textContent.trim() !== '';
      }).map((el) => `${el.tagName.toLowerCase()} « ${el.textContent.trim().slice(0, 40)} »`);
      return { defilementHorizontal, coupes };
    });
    expect(resultat.defilementHorizontal, 'défilement horizontal').toBe(false);
    expect(resultat.coupes, 'texte coupé').toEqual([]);
  });
}

test('espacement de texte imposé : le menu reste utilisable', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: espacements });
  await page.getByRole('button', { name: 'Menu' }).click();
  const liens = page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link');
  await expect(liens).toHaveCount(7);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
