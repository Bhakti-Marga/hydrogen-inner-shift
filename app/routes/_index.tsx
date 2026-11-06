import type {Route} from './+types/_index';
import {
  CONTACT_FORM_HREF,
  ContactFormModal,
} from '~/components/contact-form-modal';
import {HomeAudienceSection} from '~/sections/home-audience-section';
import {HomeCtaSection} from '~/sections/home-cta-section';
import {HomeFaqSection} from '~/sections/home-faq-section';
import {HomeHeroSection} from '~/sections/home-hero-section';
import {HomeNatureSection} from '~/sections/home-nature-section';
import {HomePeopleSection} from '~/sections/home-people-section';
import {HomeProgramsSection} from '~/sections/home-programs-section';
import {HomeStatementSection} from '~/sections/home-statement-section';
import {HomeStatsSection} from '~/sections/home-stats-section';
import {HomeTestimonialsSection} from '~/sections/home-testimonials-section';
import {SiteFooterSection} from '~/sections/site-footer-section';

const TITLE = 'Inner Shift — Shaping the future of work from the inside out';
const DESCRIPTION =
  'Help leaders and teams unlock their full potential by working on the human gap that skills training never reaches.';

const POSTER = '/images/pages/home/hero-founders.jpg';

const TESTIMONIALS = [
  {name: 'Josh', slug: 'josh'},
  {name: 'Shweta', slug: 'shweta'},
  {name: 'Gosha', slug: 'gosha'},
  {name: 'Francesco', slug: 'francesco'},
  {name: 'Christian', slug: 'christian'},
  {name: 'Tommaso', slug: 'tommaso'},
];

const PILL_AVATAR = {src: '/images/pages/home/hero-pill-avatar.jpg'};

const FOUNDERS_FILM = {
  src: '/videos/home/founders-film.mp4',
  title: 'Inner Shift — the founders’ film',
  captions: {
    src: '/videos/home/founders-film.en.vtt',
    label: 'English',
    srcLang: 'en',
  },
};

const FAQS = [
  {
    question: 'Where does it take place, and how long are we away?',
    answer:
      'Immersions take place in nature at [location]. The full journey is three residential immersions within six months, with timing agreed with you, and follow-through for a year. Shorter formats run from 90 minutes to two days.',
  },
  {
    question: 'Can it be done indoors?',
    answer:
      'Yes, for shorter formats. Taster sessions and half-day workshops can take place indoors, at your office or a venue of your choice, with time outside where possible. Nature stays at the heart of the full journey, because stepping out of familiar surroundings is what loosens familiar patterns.',
  },
  {
    question: 'Do I need to be fit or outdoorsy?',
    answer:
      '[Add the level of walking and time outdoors, and how you adapt for different needs.]',
  },
  {
    question: 'Is what I share kept confidential?',
    answer:
      'Yes. Everything shared in the group is held in confidence. [Add what, if anything, you share with a sponsoring organisation, for example overall themes but never individual content.]',
  },
  {
    question: 'What does it cost?',
    answer:
      'Every journey is shaped around you, so we discuss investment once we have spoken and understand what you need.',
  },
  {
    question: 'How do you measure results?',
    answer:
      'Participants give feedback after each immersion. We are also introducing a before-and-after measurement tool, so you can see the change across the journey.',
  },
];

const NATURE_PHOTOS = [
  {
    slug: 'hearth',
    alt: 'A participant smiling by firelight',
    width: 935,
    height: 941,
  },
  {
    slug: 'gaze',
    alt: 'A participant listening in the forest',
    width: 1138,
    height: 1144,
  },
  {
    slug: 'trail',
    alt: 'Participants walking a forest trail',
    width: 930,
    height: 939,
  },
  {
    slug: 'bottle',
    alt: 'An Inner Shift water bottle on a tree stump',
    width: 925,
    height: 943,
  },
  {
    slug: 'writing-pair',
    alt: 'Two participants writing in notebooks on the forest floor',
    width: 1118,
    height: 1153,
    focusX: 90,
  },
  {
    slug: 'flipchart',
    alt: 'A facilitator speaking beside a flip chart',
    width: 924,
    height: 940,
  },
  {
    slug: 'tarp',
    alt: 'A participant pitching a tarp shelter between trees',
    width: 913,
    height: 942,
  },
  {
    slug: 'hands',
    alt: 'Two hands meeting palm to palm in firelight',
    width: 912,
    height: 941,
  },
  {
    slug: 'writing',
    alt: 'A participant writing in a notebook outdoors',
    width: 925,
    height: 942,
  },
  {
    slug: 'board',
    alt: 'Sticky notes being placed on a grid board',
    width: 930,
    height: 940,
  },
];

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
    href: '/images/pages/home/hero-band-mobile.jpg',
    media: '(max-width: 767px)',
  },
  {rel: 'preload', as: 'image', href: POSTER, media: '(min-width: 768px)'},
];

export default function Homepage() {
  return (
    <main className="relative">
      <HomeHeroSection
        pill={{
          text: 'For aspiring executives, founders and leadership teams',
          avatar: PILL_AVATAR,
        }}
        headline="Shaping the future of work from the inside out"
        intro={{
          lead: 'Felt from the first day. Built to last.',
          text: 'A journey in nature of up to six months, for leaders stepping up to executive level, entrepreneurs and the teams around them.',
        }}
        primaryCta={{label: 'Start the conversation', href: CONTACT_FORM_HREF}}
        filmCtaLabel="Watch the film"
        film={FOUNDERS_FILM}
        poster={{src: POSTER, width: 1918, height: 1100}}
        programsLabel="Our programs:"
        programs={[
          {
            label: 'Flagship',
            title: 'Full Immersion.',
            subtitle: 'Six months.',
            description:
              'A six-month arc for leadership teams — discovery, three nature immersions and a year of integration. It changes what happens above and below the waterline.',
            details: ['6–12 leaders', '3 × 4 days in nature', '6 months'],
            accent: 'ember',
            href: '/programs',
          },
          {
            label: 'Taster',
            title: 'Day Immersion.',
            subtitle: 'A taste of the work.',
            description:
              'For teams who want to feel the work before committing to the full journey.',
            details: ['6–12 leaders', '1 full day', 'In nature, near you'],
            accent: 'cobalt',
            href: '/programs',
          },
        ]}
        facts={[
          'Small groups of 6 to 12',
          'Three immersions, paced around you',
          'In nature',
        ]}
      />
      <HomeStatementSection
        id="why"
        statement={{
          lead: 'The leadership crisis is not what you think.',
          text: 'It is neither a skills gap nor a technology gap. It is a human gap, and it is the one nobody is training for.',
        }}
        cta={{label: 'Request a quote', href: CONTACT_FORM_HREF}}
        contrast={{
          theirs: 'Most programs ask: “What skills should a leader develop?”',
          ours: 'We begin by asking: “What prevents a leader from accessing their full potential?”',
        }}
      />
      <HomeStatsSection
        pill={{
          text: 'Did you know the cost of staying at the surface?',
          avatar: PILL_AVATAR,
        }}
        stats={[
          {
            prefix: '$',
            value: 10,
            suffix: 'T',
            text: 'Lost productivity from low engagement, about 9% of global GDP.',
            source: 'Gallup.com/workplace',
          },
          {
            value: 20,
            suffix: '%',
            text: 'Global employee engagement, the lowest level since 2020.',
            source: 'Gallup.com/workplace',
          },
          {
            value: 22,
            suffix: '%',
            text: 'Manager engagement in 2025, down from 31% in 2022.',
            source: 'Gallup.com/workplace',
          },
        ]}
        closing="That is the human gap, and no amount of strategy will close it."
        source={{
          label: 'Source:',
          linkLabel: 'Gallup, State of the Global Workplace 2026',
          href: 'https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx',
        }}
      />
      <HomeTestimonialsSection
        id="results"
        quote="“Going forward, I plan to encourage my fellow leaders to bring more humanness and connection into our leadership approach”"
        attribution="— Participant, Full Journey 2025"
        feature={{
          image: {
            src: '/images/pages/home/testimonial-card.jpg',
            width: 1000,
            height: 926,
          },
          label: 'Watch full testimonial',
          video: {
            src: '/videos/home/testimonials/promo.mp4',
            title: 'Inner Shift — participants’ testimonials',
          },
        }}
        listLabel="Watch full testimonials:"
        watchLabel="Watch:"
        testimonials={TESTIMONIALS.map(({name, slug}) => ({
          name,
          video: {
            src: `/videos/home/testimonials/${slug}.mp4`,
            title: `Inner Shift — ${name}’s testimonial`,
            captions: {
              src: `/videos/home/testimonials/${slug}.en.vtt`,
              label: 'English',
              srcLang: 'en',
            },
            orientation: 'portrait',
          },
        }))}
      />
      <HomeAudienceSection
        heading="Who it is for"
        groups={[
          {
            heading: 'Leaders & entrepreneurs who…',
            items: [
              'Are stepping up to executive leadership',
              'Have built a business and now need to lead it differently',
              'Feel successful, but know they could lead more fully',
              'Want to lead from who they are, not who they think they should be',
            ],
          },
          {
            heading: 'Leadership teams who…',
            items: [
              'Have a strategy but struggle to align around it',
              'Keep repeating the same patterns',
              'Are navigating significant change',
              'Need more honest conversations',
              'Want to become a more effective leadership team',
              'Know another workshop isn’t the answer',
            ],
          },
        ]}
        cta={{
          label: 'Book a discovery call',
          href: CONTACT_FORM_HREF,
        }}
      />
      <HomeProgramsSection
        id="programs"
        heading="Our programs"
        flagship={{
          label: 'Flagship',
          title: 'Full Immersion.',
          subtitle: 'Dive into the full depth of the work.',
          description:
            'Discovery, three residential immersions of four days each in nature, and integration support long after. For leadership teams ready to commit to real change.',
          facts: [
            '3 immersions × 4 days',
            '6–12 senior leaders',
            'Up to 6 months, plus integration',
          ],
          link: {label: 'Explore the Full Immersion', href: '/programs'},
          image: {
            src: '/images/pages/home/program-flagship.jpg',
            width: 1030,
            height: 768,
          },
        }}
        taster={{
          id: 'programs-taster',
          label: 'Taster',
          title: 'Day immersion.',
          subtitle: 'Get a taste of the work.',
          description:
            'For teams who want to feel the work before committing to the full journey. Same facilitators, same honesty — one day instead of six months.',
          facts: [
            '1 full day in nature',
            'Your whole leadership team',
            'No further commitment',
          ],
          link: {label: 'See the taster', href: '/programs'},
          image: {
            src: '/images/pages/home/program-taster.jpg',
            width: 1034,
            height: 444,
          },
        }}
      />
      <HomeNatureSection
        pill={{text: 'Why nature?', avatar: PILL_AVATAR}}
        statement={{
          lead: 'Habits live in familiar places. Nature breaks them.',
          text: 'In the office, everyone plays their role. Out here, the roles fall away, and the conversations you’ve been avoiding finally happen.',
        }}
        photos={NATURE_PHOTOS.map(({slug, ...photo}) => ({
          src: `/images/pages/home/nature-${slug}.jpg`,
          ...photo,
        }))}
      />
      <HomePeopleSection
        id="about"
        heading="People who walk it with you"
        people={['Ratna Morjaria', 'Avish Lallbahadoor']}
        intro="bring decades of leadership and culture-change experience to every journey."
        cta={{label: 'Meet the team', href: '/about'}}
        film={{
          image: {
            src: '/images/pages/home/people-founders.jpg',
            alt: 'Co-founders Avish Lallbahadoor and Ratna Morjaria in conversation',
            width: 1668,
            height: 943,
          },
          label: 'Watch: in their own words · 2:24',
          video: FOUNDERS_FILM,
        }}
      />
      <HomeFaqSection
        pill={{
          text: 'We’re here to answer your questions',
          avatar: PILL_AVATAR,
        }}
        heading="What people ask before the first call"
        faqs={FAQS}
      />
      <HomeCtaSection
        id="contact"
        pill={{text: 'Ready when you are', avatar: PILL_AVATAR}}
        heading="The shift starts with just one conversation."
        primary={{label: 'Let’s talk', href: CONTACT_FORM_HREF}}
        secondary={{label: 'Explore the programs', href: '/programs'}}
        image={{
          src: '/images/pages/home/cta-fireside.jpg',
          width: 2784,
          height: 1440,
        }}
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
