import type {Route} from './+types/_index';
import {ComingSoonHeroSection} from '~/sections/coming-soon-hero-section';

const TITLE = 'Inner Shift — Leadership programs below the waterline';
const DESCRIPTION =
  'Everything visible in your team is driven by what stays below the surface. The new Inner Shift website is coming soon.';

export const meta: Route.MetaFunction = () => [
  {title: TITLE},
  {name: 'description', content: DESCRIPTION},
  {property: 'og:title', content: TITLE},
  {property: 'og:description', content: DESCRIPTION},
];

export const links: Route.LinksFunction = () => [
  {
    rel: 'preload',
    as: 'image',
    href: '/images/pages/home/hero-iceberg-mobile.jpg',
    media: '(max-width: 767px)',
  },
  {
    rel: 'preload',
    as: 'image',
    href: '/images/pages/home/hero-iceberg.jpg',
    media: '(min-width: 768px)',
  },
];

export default function Homepage() {
  return (
    <main>
      <ComingSoonHeroSection
        headline="Everything visible in your team is driven by"
        mutedHeadline="what stays below the surface"
        eyebrow="Below the waterline leadership programs"
        message="The Inner Shift website is launching soon."
        statusLabel="Coming soon"
        progressLabel="Work in progress"
        image={{
          src: '/images/pages/home/hero-iceberg.jpg',
          mobileSrc: '/images/pages/home/hero-iceberg-mobile.jpg',
          alt: 'An iceberg with a small peak above the waterline and a much larger mass hidden below the surface',
          width: 2144,
          height: 1747,
        }}
      />
    </main>
  );
}
