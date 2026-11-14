const PATH = '/images/og.jpg';
const ALT =
  'Leaders in conversation by the fire during an Inner Shift immersion';

type Match = {id: string; data: unknown};

/**
 * The share-card picture. Link crawlers ignore a relative image URL, so the
 * address is built from the origin on the root loader.
 */
export function shareImageMeta(matches: readonly (Match | undefined)[]) {
  const root = matches.find((match) => match?.id === 'root');
  const origin = originOf(root?.data);
  if (!origin) return [];

  const image = `${origin}${PATH}`;
  return [
    {property: 'og:image', content: image},
    {property: 'og:image:alt', content: ALT},
    {property: 'og:image:type', content: 'image/jpeg'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:image', content: image},
  ];
}

function originOf(data: unknown) {
  if (!data || typeof data !== 'object' || !('origin' in data)) return null;
  return typeof data.origin === 'string' ? data.origin : null;
}
