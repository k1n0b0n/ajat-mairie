// Lance Lighthouse CI (mobile) sur une page par rubrique du sitemap.
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const origine = 'http://127.0.0.1:4322';
const pages = new Map();
for (const f of readdirSync('dist').filter((n) => /^sitemap-\d+\.xml$/.test(n))) {
  const xml = readFileSync(`dist/${f}`, 'utf8');
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const chemin = new URL(loc).pathname;
    const rubrique = chemin.split('/')[1] ?? '';
    if (!pages.has(rubrique)) pages.set(rubrique, chemin);
  }
}

const env = { ...process.env };
env.CHROME_PATH ||= chromium.executablePath();
const args = ['lhci', 'autorun', ...[...pages.values()].map((p) => `--collect.url=${origine}${p}`)];
const r = spawnSync('npx', args, { stdio: 'inherit', env });
process.exit(r.status ?? 1);
