import {data} from 'react-router';
import type {Route} from './+types/$';
import {shareImageMeta} from '~/lib/share-image';
import {NotFoundSection} from '~/sections/not-found-section';

const TITLE = 'Page not found — Inner Shift';
const BACKGROUND = '/images/pages/404/background.jpg';

export function loader() {
  return data(null, {status: 404});
}

export const meta: Route.MetaFunction = ({matches}) => [
  ...shareImageMeta(matches),
  {title: TITLE},
  {name: 'robots', content: 'noindex'},
];

export const links: Route.LinksFunction = () => [
  {rel: 'preload', as: 'image', href: BACKGROUND},
];

export default function CatchAllPage() {
  return (
    <main>
      <NotFoundSection
        eyebrow="404"
        headline="This page isn’t here"
        intro="The link may have changed. These will get you back."
        links={[
          {label: 'Homepage', href: '/'},
          {label: 'Programs', href: '/programs'},
          {label: 'Mission', href: '/mission'},
          {label: 'About', href: '/about'},
          {label: 'Why', href: '/why'},
          {label: 'Results', href: '/results'},
        ]}
        image={{src: BACKGROUND, width: 1920, height: 1275}}
      />
    </main>
  );
}
