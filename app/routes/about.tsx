import type {Route} from './+types/about';
import {
  CONTACT_FORM_HREF,
  ContactFormModal,
} from '~/components/contact-form-modal';
import {AboutChangeSection} from '~/sections/about-change-section';
import {AboutCloseSection} from '~/sections/about-close-section';
import {AboutHeroSection} from '~/sections/about-hero-section';
import {AboutProfileSection} from '~/sections/about-profile-section';
import {AboutQuotesSection} from '~/sections/about-quotes-section';
import {AboutTogetherSection} from '~/sections/about-together-section';
import {SiteFooterSection} from '~/sections/site-footer-section';

const TITLE = 'About us — Inner Shift';
const DESCRIPTION =
  'Meet the two founders who built Inner Shift for the part of leadership you cannot see from the outside.';

const HERO = '/images/pages/about/hero.jpg';
const AVATAR = {src: '/images/pages/about/hero-ratna.jpg'};

const FOUNDERS_FILM = {
  src: '/videos/home/founders-film.mp4',
  title: 'Inner Shift — the founders’ film',
  captions: {
    src: '/videos/home/founders-film.en.vtt',
    label: 'English',
    srcLang: 'en',
  },
};

export const meta: Route.MetaFunction = () => [
  {title: TITLE},
  {name: 'description', content: DESCRIPTION},
  {property: 'og:title', content: TITLE},
  {property: 'og:description', content: DESCRIPTION},
];

export const links: Route.LinksFunction = () => [
  {rel: 'preload', as: 'image', href: HERO},
];

export default function About() {
  return (
    <main className="relative min-h-svh bg-white text-white">
      <AboutHeroSection
        headline="Two very different paths. One shared belief: the hard part of leadership was never the part you can see."
        intro="We couldn't find anyone building leadership work for that hidden layer — so we built it ourselves. This is who's actually running it."
        cta={{label: 'Book a consultation', href: CONTACT_FORM_HREF}}
        filmCtaLabel="Watch the film"
        film={FOUNDERS_FILM}
        image={{src: HERO, width: 1669, height: 942}}
        people={[
          {
            name: 'Ratna Morjaria',
            detail: 'Culture change · 5 regions · chemical industry',
            avatar: {
              src: '/images/pages/about/hero-ratna.jpg',
              width: 160,
              height: 160,
            },
          },
          {
            name: 'Avish Lallbahadoor',
            detail: 'Culture change · 5 regions · chemical industry',
            avatar: {
              src: '/images/pages/about/hero-avish.jpg',
              width: 160,
              height: 160,
            },
          },
        ]}
      />
      <AboutProfileSection
        portrait={{
          src: '/images/pages/about/ratna-portrait.jpg',
          alt: '',
          width: 400,
          height: 600,
        }}
        photo={{
          src: '/images/pages/about/ratna-sofa.jpg',
          alt: 'Ratna Morjaria seated on a sofa in a green dress, holding a notebook',
          width: 783,
          height: 769,
        }}
        name="Ratna Morjaria"
        label="Transformation & Leadership Consultant"
        paragraphs={[
          "Ratna spent her career on the operational and compliance side of the chemical industry — safety, environmental standards, culture change, the systems that keep a large organisation running without anyone noticing they're there. As Global Culture Director, she led culture transformation across five regions. She's a Certified Culture Design Consultant.",
          "As founder of Dharma Awakenings, she's since brought that approach to clients across a range of industries — helping organisations strengthen the human foundation everything else, technology included, depends on. Her approach connects strategy, culture, and human potential, bringing the architecture that helps a team navigate real operational pressure, not just a workshop.",
        ]}
      />
      <AboutQuotesSection
        heading="We take work seriously. And people in it."
        image={{src: '/images/pages/about/hillside.jpg', width: 2791, height: 1600}}
        quotes={[
          {
            id: 'ghost-top',
            tone: 'ghost',
            quote:
              "An incredible understanding of the factors that drive human behaviour — pragmatic solutions that make a real difference in the organisations she's worked with.",
            cite: 'Katja Kelm, Senior Energy Manager (ISO 50001)',
          },
          {
            id: 'since-2018',
            tone: 'glass',
            quote:
              "Since 2018, we've built and facilitated culture change projects together at plants across the US, Singapore, Germany, and Belgium.",
            cite: 'Katja Kelm, Senior Energy Manager (ISO 50001)',
          },
          {
            id: 'psychological-safety',
            tone: 'solid',
            quote:
              'Ratna creates psychological safety where people can question their identity and beliefs without judgment — the inner work that changes everything.',
            cite: 'Katja Kelm, Senior Energy Manager (ISO 50001)',
          },
          {
            id: 'understanding',
            tone: 'dim',
            quote:
              "An incredible understanding of the factors that drive human behaviour — pragmatic solutions that make a real difference in the organisations she's worked with.",
            cite: 'Katja Kelm, Senior Energy Manager (ISO 50001)',
          },
          {
            id: 'ghost-bottom',
            tone: 'ghost',
            quote:
              "An incredible understanding of the factors that drive human behaviour — pragmatic solutions that make a real difference in the organisations she's worked with.",
            cite: 'Katja Kelm, Senior Energy Manager (ISO 50001)',
          },
        ]}
      />
      <AboutTogetherSection
        pill={{text: 'How we work together?', avatar: AVATAR}}
        heading="Neither of us runs this alone"
        steps={[
          {
            title: 'Structure',
            text: 'Structure without depth is just another framework nobody uses under pressure.',
            image: {
              src: '/images/pages/about/pair-structure.jpg',
              alt: 'A facilitator marking a pyramid of team dynamics on a flip chart',
              width: 1100,
              height: 616,
            },
          },
          {
            title: 'Depth',
            text: "Depth without structure doesn't hold once people are back at their desks.",
            image: {
              src: '/images/pages/about/pair-depth.jpg',
              alt: 'A man standing with his eyes closed, two people quiet behind him outdoors',
              width: 1100,
              height: 619,
            },
          },
          {
            title: 'Change that holds',
            text: 'Both facilitators are present throughout every block — delivery adapts to the room, but neither of us runs this alone.',
            image: {
              src: '/images/pages/about/pair-change.jpg',
              alt: 'Two people embracing, with others standing nearby beside a bookshelf',
              width: 1100,
              height: 619,
            },
          },
        ]}
      />
      <AboutChangeSection
        pill={{text: 'What changes when we do this?', avatar: AVATAR}}
        heading="Frameworks are easy to claim. What actually changes when a team does this work — that's harder to fake, and easier to see."
        quotes={[
          {
            quote:
              '“Without it, it would have been difficult — or people may not even have wanted that.”',
            body: 'Over a course of multiple 2-day workshops, you created appetite and “getting started” for a new vibe, a new possible culture. On top, you created an atmosphere of people talking to each other — who normally don’t talk so easily together. What stood out for me was your ability to function as a connector, bringing different characters together.',
            cite: 'Fabian Leuzinger, CEO, Wahledmühle',
          },
          {
            quote:
              '“A business performance assurance coach, not just a personal development tool.”',
            body: 'Not just a personal development tool but a business performance assurance coach for me. All this I do with the safety of feeling of not being judged. I see this impacting performance of my business.',
            cite: 'Vijaykumar Rangaraju, Chief Mission Officer, ProClime Services',
          },
        ]}
        stats={[
          {text: '100,000+', label: 'Individuals assessed'},
          {count: 39, label: 'Organisations'},
          {count: 15, suffix: '+', label: 'Countries'},
          {text: '0.92', label: 'Reliability coefficient, core assessment'},
        ]}
      />
      <AboutCloseSection
        pill={{text: 'Come see how we work', avatar: AVATAR}}
        heading={'The best way to understand what\nwe do is to experience a piece of it.'}
        cta={{label: 'Book a free consultation →', href: CONTACT_FORM_HREF}}
        filmLabel="or Watch a film to learn more"
        film={FOUNDERS_FILM}
        image={{src: '/images/pages/about/invite.jpg', width: 2880, height: 1400}}
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
