import type { APIRoute } from 'astro';
import { indexable } from '../lib/indexation';

export const GET: APIRoute = ({ site }) => {
  const lignes = !indexable
    ? ['User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site).href}`];
  return new Response(`${lignes.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
