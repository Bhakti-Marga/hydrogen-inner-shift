import type {Route} from './+types/[sitemap.xml]';

const PAGE_PATHS = ['/'];

export function loader({request}: Route.LoaderArgs) {
  const {origin} = new URL(request.url);
  const urls = PAGE_PATHS.map(
    (path) => `  <url><loc>${origin}${path}</loc></url>`,
  ).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}
