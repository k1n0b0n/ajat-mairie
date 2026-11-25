import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const apercu = process.env.PREVIEW === '1';
  const lignes = apercu
    ? ['User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site).href}`];
  return new Response(`${lignes.join('\n')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
