import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4321' },
  // --ignore-lock : sans lui, Astro met le serveur en arrière-plan quand il détecte un agent.
  // `npm run check` construit le site avant de lancer les tests ; ici on ne fait que servir dist/.
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock',
    url: 'http://127.0.0.1:4321/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
