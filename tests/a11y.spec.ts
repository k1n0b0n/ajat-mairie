import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { cheminsDuSite } from './helpers/urls';

for (const chemin of cheminsDuSite()) {
  test(`accessibilité (axe) ${chemin}`, async ({ page }) => {
    await page.goto(chemin);
    const resultat = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();
    expect(resultat.violations.map((v) => `${v.id} : ${v.nodes.length} élément(s)`)).toEqual([]);
  });
}
