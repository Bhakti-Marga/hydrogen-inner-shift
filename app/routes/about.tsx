import type {Route} from './+types/about';
import {shareImageMeta} from '~/lib/share-image';
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
import {RATNA_AVATAR, AVISH_AVATAR} from '~/lib/founder-avatars';

const TITLE = 'About us — Inner Shift';
const DESCRIPTION =
  'Meet the two founders who built Inner Shift for the part of leadership you cannot see from the outside.';

const HERO = '/images/pages/about/hero.jpg';

const FOUNDERS_FILM = {
  src: '/videos/home/founders-film.mp4',
  title: 'Inner Shift — the founders’ film',
  captions: {
    src: '/videos/home/founders-film.en.vtt',
    label: 'English',
    srcLang: 'en',
  },
};

export const meta: Route.MetaFunction = ({matches}) => [
  ...shareImageMeta(matches),
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
        cta={{label: 'Book a 90 min free consultation', href: CONTACT_FORM_HREF}}
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
            detail: 'Leadership transformation & nature-based development',
            avatar: {
              src: '/images/pages/about/hero-avish.jpg',
              width: 160,
              height: 160,
            },
          },
        ]}
      />
      <AboutProfileSection
        people={[
          {
            portrait: {
              src: '/images/pages/about/ratna-portrait.jpg',
              alt: '',
              width: 400,
              height: 600,
            },
            name: 'Ratna Morjaria',
            labels: ['Co-founder', 'Transformation & leadership consultant'],
            links: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/ratna-morjaria',
              },
              {
                label: 'Below the Waterline on Spotify',
                href: 'https://open.spotify.com/show/6OKTP6yQpdyFgviUBeDgy3',
              },
              {
                label: 'Below the Waterline on Apple Podcasts',
                href: 'https://podcasts.apple.com/us/podcast/below-the-waterline/id1894043420',
              },
            ],
            paragraphs: [
              'Ratna spent her career on the operational and compliance side of the chemical industry — safety, environmental standards, culture change, the systems that keep a large organisation running without anyone noticing they’re there. As Global Culture Director, she led culture transformation across five regions. Again and again she saw the same pattern: teams had the strategy, the skills and the frameworks, yet what held them back lay below the surface — in beliefs, assumptions and unspoken stories about trust and belonging. That human gap is what she now works on through Inner Shift, helping leadership teams make the invisible visible and build the foundation that holds under real operational pressure, not just in a workshop.',
            ],
          },
          {
            portrait: {
              src: '/images/pages/about/avish-portrait.jpg',
              alt: '',
              width: 400,
              height: 600,
              objectPosition: 'center 22%',
            },
            name: 'Avish Lallbahadoor',
            labels: [
              'Founder',
              'Leadership transformation',
              'Nature-based development',
            ],
            links: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/avish-lallbahadoor',
              },
            ],
            quote:
              '“In the quiet intensity of the wild, we discover what we’re truly capable of – and bring that resilience back into every aspect of life.”',
            paragraphs: [
              'With a background in investment and risk analysis in banking, Avish brings an analytical perspective to leadership facilitation. A facilitator and seasoned wilderness guide, he bridges the gap between high-stakes strategic thinking and the raw, grounding lessons of the natural environment – helping people challenge assumptions, shift perspectives and grow as leaders.',
              'Driven by deep curiosity and a desire to push his boundaries, he has led solo expeditions and walked long-distance trails across three continents, often in challenging conditions and extreme weather. He uses nature as a mirror, helping senior leaders build resilience, adaptability and emotional intelligence under pressure. His approach combines reflection and purposeful challenge, creating space for people to test what they take for granted and expand what they believe is possible.',
              'In his free time, he travels, picks up new outdoor skills and shares his love of nature with his wife.',
            ],
          },
        ]}
      />
      <AboutQuotesSection
        heading="We take work seriously. And people in it."
        image={{src: '/images/pages/about/hillside.jpg', width: 2791, height: 1600}}
        quotes={[
          {
            id: 'eliel-moura',
            quote:
              'Ratna is the kind of person who makes you change the way you used to do things as a professional. She makes you believe in something bigger than ordinary life and rethink your purpose.',
            cite: 'Eliel Moura, Quality & HSE Manager LATAM, Syensqo, Brazil',
          },
          {
            id: 'daran-janecek',
            quote:
              'What I really appreciate about her skills is how she motivates, influences and challenges the status quo. She is able to navigate the system successfully, add value to the business and achieve its targets.',
            cite: 'Daran Janecek, Global EHS Director, Kindeva Drug Delivery, United States',
          },
          {
            id: 'roberto-arraya',
            quote:
              'Ratna is as exemplary as it gets. Simply put, she just gets it. She understands people. She understands the need for change. She understands company culture and effortlessly relates it to leadership performance.',
            cite: 'Roberto Arraya, Senior Systems Engineer, Emerson, Germany',
          },
          {
            id: 'kelly-lanz',
            quote:
              'She sees people not for who they are, but for who they can become, and is always ready and willing to take on the next challenge that comes her way. She has the ability to engage all types of people and create meaningful connections that build group cohesion.',
            cite: 'Kelly Lanz, Founder, The Lanz Connection, United States',
          },
          {
            id: 'yash-pankhania',
            quote:
              'The quality of the facilitation and delivery was incredible. Each module was thoughtfully structured, taking us on a journey rather than simply delivering information. Avish constantly engaged us, asked questions and encouraged us to reflect, so we always felt involved rather than being spoken at.',
            cite: 'Yash Pankhania, Sales Specialist, IBM, United Kingdom',
          },
          {
            id: 'hitesh-jogia',
            quote:
              'Avish was incredibly supportive throughout the transformation process and created a safe and encouraging space for meaningful conversations.',
            cite: 'Hitesh Jogia, Senior Chartered Financial Planner, United Kingdom',
          },
          {
            id: 'shraddha-oril',
            quote:
              'A special thank you to Avish for creating such a safe, warm and genuine space throughout the programme. I truly appreciated the support, the openness and the way he guided us through the experience — a meaningful and transformative journey.',
            cite: 'Shraddha Oril, Expert Accountant, Luxembourg',
          },
        ]}
      />
      <AboutTogetherSection
        pill={{text: 'How we work together?', avatar: AVISH_AVATAR}}
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
        pill={{text: 'What changes when we do this?', avatar: RATNA_AVATAR}}
        heading="Frameworks are easy to claim. What actually changes when a team does this work — that's harder to fake, and easier to see."
        quotes={[
          {
            quote:
              '“As one of the CEO’s responsible globally for media and communication across a diverse, international team, I had the opportunity to collaborate with Ratna.”',
            body: 'Within just a few sessions, we created an environment of trust, awareness, and open communication, bridging cultural and linguistic differences between remote and on-site teams. Ratna guided us through deep practices of listening, feedback, empowerment, and transformation, using models such as the iceberg principle to reveal what drives human interaction beneath the surface. What stood out most to me was how Ratna embodies the essence of putting humans first. She brings together knowledge, compassion, and structure in a truly unique and extraordinary way, enabling people and organizations to connect and grow authentically.',
            cite: 'Jan Philip Zehner',
          },
        ]}
      />
      <AboutCloseSection
        pill={{text: 'Come see how we work', avatar: AVISH_AVATAR}}
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
