import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL et SITE_BASE permettent le déploiement provisoire sur l'adresse GitHub Pages par défaut.
// Une fois le domaine personnalisé en place (public/CNAME), SITE_BASE n'est plus défini.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://ajat.example',
  base: process.env.SITE_BASE ?? '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  redirects: {},
});
