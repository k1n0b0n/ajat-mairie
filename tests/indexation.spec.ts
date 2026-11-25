import { expect, test } from '@playwright/test';

// Le site est non indexable par défaut ; INDEXATION=on au moment du build l'autorise.
const indexable = process.env.INDEXATION === 'on';

test(`indexation ${indexable ? 'autorisée' : 'interdite'} (robots.txt et balise meta)`, async ({ page, request }) => {
  await page.goto('/');
  const balises = page.locator('meta[name="robots"]');
  const robots = await (await request.get('/robots.txt')).text();
  if (indexable) {
    await expect(balises).toHaveCount(0);
    expect(robots).not.toContain('Disallow: /');
    expect(robots).toContain('Sitemap:');
  } else {
    await expect(balises).toHaveAttribute('content', 'noindex, nofollow');
    expect(robots).toContain('Disallow: /');
    expect(robots).not.toContain('Sitemap:');
  }
});
