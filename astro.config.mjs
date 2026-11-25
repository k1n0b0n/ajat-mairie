import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domaine provisoire : ajat.kobbo.fr (voir public/CNAME). Pour en changer, modifier public/CNAME et la valeur par défaut ci-dessous.
// SITE_URL et SITE_BASE servent uniquement à l'aperçu des brouillons (dépôt séparé).
export default defineConfig({
  site: process.env.SITE_URL || 'https://ajat.kobbo.fr',
  base: process.env.SITE_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  redirects: {},
});
