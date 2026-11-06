import type {Route} from './+types/results';
import {
  CONTACT_FORM_HREF,
  ContactFormModal,
} from '~/components/contact-form-modal';
import {ResultsCloseSection} from '~/sections/results-close-section';
import {ResultsHeroSection} from '~/sections/results-hero-section';
import {ResultsTestimonialsSection} from '~/sections/results-testimonials-section';
import {SiteFooterSection} from '~/sections/site-footer-section';

const TITLE = 'Results — Inner Shift';
const DESCRIPTION =
  'Leaders say what changed, in their own words. Every clip was filmed on the final day of the journey.';

const HERO = '/images/pages/results/hero.jpg';

const REVIEWS_FILM = {
  src: '/videos/home/testimonials/promo.mp4',
  title: 'Inner Shift — participants’ reviews',
};

const FOUNDERS_FILM = {
  src: '/videos/home/founders-film.mp4',
  title: 'Inner Shift — the founders’ film',
  captions: {
    src: '/videos/home/founders-film.en.vtt',
    label: 'English',
    srcLang: 'en',
  },
};

const PILL_AVATAR = {src: '/images/pages/home/hero-pill-avatar.jpg'};

const TESTIMONIALS = [
  {
    slug: 'francesco',
    name: 'Francesco',
    quote:
      '“You are a good leader if you are a good human being.”',
    attribution: 'Francesco Cecchini · Company owner, Italy',
    duration: '0:47',
  },
  {
    slug: 'tommaso',
    name: 'Tommaso',
    quote:
      '“I would recommend this experience to everyone — first of all, to myself.”',
    attribution: 'Tommaso · Startup co-founder, Italy',
    duration: '0:42',
  },
  {
    slug: 'christian',
    name: 'Christian',
    quote:
      '“You have to face what is below the waterline. That is what makes the change.”',
    attribution: 'Christian Jaschke · High-performance coach, Germany',
    duration: '1:04',
  },
  {
    slug: 'gosha',
    name: 'Gosha',
    quote: '“Below the surface is where the real me begins.”',
    attribution: 'Gosha · Organisation development expert',
    duration: '1:03',
  },
  {
    slug: 'josh',
    name: 'Josh',
    quote:
      '“From someone who was very sceptical coming in — give it a shot.”',
    attribution: 'Josh · Tech sales, London',
    duration: '0:47',
  },
  {
    slug: 'shweta',
    name: 'Shweta',
    quote:
      '“I thought I could do everything on my own. The group changes everything.”',
    attribution: 'Shweta Uriel · Adviser to senior leadership, Luxembourg',
    duration: '0:56',
  },
];

export const meta: Route.MetaFunction = () => [
  {title: TITLE},
  {name: 'description', content: DESCRIPTION},
  {property: 'og:title', content: TITLE},
  {property: 'og:description', content: DESCRIPTION},
];

export const links: Route.LinksFunction = () => [
  {rel: 'preload', as: 'image', href: HERO},
];

export default function Results() {
  return (
    <main className="relative bg-abyss text-white">
      <ResultsHeroSection
        pill={{
          text: 'Don’t take our word for it. Take theirs!',
          avatar: PILL_AVATAR,
        }}
        headline={'What changes, in their\nown words.'}
        primaryCta={{
          label: 'Book a discovery call',
          href: CONTACT_FORM_HREF,
        }}
        filmCtaLabel="Watch reviews"
        film={REVIEWS_FILM}
        poster={{src: HERO, width: 1920, height: 906}}
        facts={[
          'Every clip was filmed on the final day of the journey.',
          'About a minute each',
          'Unscripted',
        ]}
      />
      <ResultsTestimonialsSection
        heading="Testimonials"
        intro="Every clip was filmed on the final day of the journey. First take, no briefing."
        testimonials={TESTIMONIALS.map(({slug, name, ...rest}) => ({
          name,
          ...rest,
          image: {
            src: `/images/pages/results/${slug}.jpg`,
            width: 900,
            height: 506,
          },
          video: {
            src: `/videos/results/${slug}.mp4`,
            title: `Inner Shift — ${name}’s testimonial`,
            captions: {
              src: `/videos/home/testimonials/${slug}.en.vtt`,
              label: 'English',
              srcLang: 'en',
            },
          },
        }))}
      />
      <ResultsCloseSection
        pill={{
          text: 'How do we work?',
          avatar: {src: '/images/pages/about/hero-ratna.jpg', alt: 'Ratna Morjaria'},
        }}
        heading={'The best way to understand what\nwe do is to experience a piece of it.'}
        primary={{label: 'Let’s talk', href: CONTACT_FORM_HREF}}
        filmLabel="or Watch a film to learn more"
        film={FOUNDERS_FILM}
      />
      <SiteFooterSection
        links={[
          {label: 'Programs', href: '/programs'},
          {label: 'Approach', href: '/why'},
          {label: 'Results', href: '/results'},
          {label: 'About', href: '/about'},
        ]}
        copyright="© 2026 Inner Shift — Shaping the future of work from the inside out"
      />
      <ContactFormModal />
    </main>
  );
}
