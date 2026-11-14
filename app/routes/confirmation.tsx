import type {Route} from './+types/confirmation';
import {ConfirmationSection} from '~/sections/confirmation-section';

const TITLE = 'Your request is in — Inner Shift';

const BACKGROUND = '/images/pages/confirmation/background.jpg';

export const meta: Route.MetaFunction = () => [
  {title: TITLE},
  {name: 'robots', content: 'noindex'},
];

export const links: Route.LinksFunction = () => [
  {rel: 'preload', as: 'image', href: BACKGROUND},
];

export default function Confirmation() {
  return (
    <main>
      <ConfirmationSection
        pill={{
          text: 'Thank you!',
          avatar: {src: '/images/pages/confirmation/avatar.jpg'},
        }}
        headline="Your request is in"
        intro="We will reply within two working days."
        programs={{label: 'Explore the programs', href: '/programs'}}
        filmLabel="Watch the film"
        film={{
          src: '/videos/home/founders-film.mp4',
          title: 'Inner Shift — the founders’ film',
          captions: {
            src: '/videos/home/founders-film.en.vtt',
            label: 'English',
            srcLang: 'en',
          },
        }}
        image={{src: BACKGROUND, width: 1455, height: 825}}
      />
    </main>
  );
}
