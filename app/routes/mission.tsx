import type {Route} from './+types/mission';
import {
  CONTACT_FORM_HREF,
  ContactFormModal,
} from '~/components/contact-form-modal';
import {MissionApproachSection} from '~/sections/mission-approach-section';
import {MissionCloseSection} from '~/sections/mission-close-section';
import {MissionHeroSection} from '~/sections/mission-hero-section';
import {MissionSourcesSection} from '~/sections/mission-sources-section';
import {MissionStatementSection} from '~/sections/mission-statement-section';
import {MissionTeamSection} from '~/sections/mission-team-section';
import {SiteFooterSection} from '~/sections/site-footer-section';
import {SiteHeaderSection} from '~/sections/site-header-section';

const TITLE = 'Mission — Inner Shift';
const DESCRIPTION =
  'We work on the source of how people lead: who they are being, and how they understand themselves and each other.';

const FIRE = '/images/pages/mission/mosaic-fire.jpg';

export const meta: Route.MetaFunction = () => [
  {title: TITLE},
  {name: 'description', content: DESCRIPTION},
  {property: 'og:title', content: TITLE},
  {property: 'og:description', content: DESCRIPTION},
];

export const links: Route.LinksFunction = () => [
  {rel: 'preload', as: 'image', href: FIRE},
  {rel: 'preload', as: 'image', href: '/images/pages/mission/mosaic-mug.jpg'},
];

export default function Mission() {
  return (
    <main className="min-h-svh bg-white text-ink">
      <SiteHeaderSection
        tone="solid"
        ctaTone="ember"
        links={[
          {label: 'Programs', href: '/programs'},
          {label: 'Mission', href: '/mission', current: true},
          {label: 'About us', href: '/about'},
          {label: 'Why', href: '/why'},
          {label: 'Results', href: '/results'},
        ]}
        cta={{label: 'Start a conversation', href: CONTACT_FORM_HREF}}
      />
      <MissionHeroSection
        fire={{
          src: FIRE,
          alt: 'Friends and a dog gathered around a fire pit at dusk',
          width: 750,
          height: 1125,
        }}
        mug={{
          src: '/images/pages/mission/mosaic-mug.jpg',
          alt: 'A woman holding a mug beside a campfire',
          width: 896,
          height: 1344,
        }}
        flask={{
          src: '/images/pages/mission/mosaic-flask.jpg',
          alt: 'Coffee poured from a flask into a cup on a mossy stump',
          width: 735,
          height: 1056,
        }}
        runners={{
          src: '/images/pages/mission/mosaic-runners.jpg',
          alt: 'Four people running together on a sunlit trail',
          width: 1199,
          height: 978,
        }}
        stepOut={{title: 'STEP OUT', text: 'Leave the familiar environment'}}
        terrain="Terrain changes people faster than talk does"
        mirror="Use nature as your mirror"
      />
      <MissionStatementSection
        avatar={{
          src: '/images/pages/mission/statement-avatar.jpg',
          width: 331,
          height: 329,
        }}
        quote="We create transformative experiences that enable people to live, lead and relate with greater clarity!"
        cta={{label: 'Let’s talk', href: CONTACT_FORM_HREF}}
        statement="To help leaders, teams and organisations unlock their fullest potential through a deeper understanding of themselves and each other."
      />
      <MissionApproachSection
        image={{
          src: '/images/pages/mission/approach-lake.jpg',
          alt: 'Four people raising mugs toward the sun beside an alpine lake',
          width: 1200,
          height: 1800,
        }}
        label="Our Approach"
        statement="Most development programs focus on skills, behaviors and tools. Inner Shift focuses on the source."
        dismissed="“What should I do?”"
        question="“Who am I being?”"
        text="Skills sit above the waterline, where everyone can see them. What drives them sits below, that is where we work."
      />
      <MissionSourcesSection
        pill={{
          text: 'What we draw on?',
          avatar: {src: '/images/pages/mission/statement-avatar.jpg'},
        }}
        heading={'Modern science and\ntimeless wisdom,\ntranslated into\npractical application\nat work.'}
        intro="Seven sources, one discipline: everything we use has to survive contact with a real leadership team."
        cta={{label: 'Start the conversation', href: CONTACT_FORM_HREF}}
        sources={[
          {
            number: '01',
            title: 'Modern psychology',
            detail: 'How beliefs form — and how they change.',
          },
          {
            number: '02',
            title: 'Neuroscience',
            detail: 'What happens in the brain when defences drop.',
          },
          {
            number: '03',
            title: 'Emotional intelligence',
            detail: 'Reading yourself before reading the room.',
          },
          {
            number: '04',
            title: 'Conscious leadership',
            detail: 'Leading awake, not on autopilot.',
          },
          {
            number: '05',
            title: 'Mindfulness',
            detail: 'Attention, trained like a muscle.',
          },
          {
            number: '06',
            title: 'Nature-based learning',
            detail: 'The setting that breaks the habits. Our home ground.',
          },
          {
            number: '07',
            title: 'Timeless wisdom traditions',
            detail: 'Old questions that still do the work.',
          },
        ]}
      />
      <MissionTeamSection
        pill={{
          text: 'Meet the team',
          avatar: {src: '/images/pages/mission/statement-avatar.jpg'},
        }}
        heading="People who walk it with you"
        people={[
          {
            name: 'Ratna Morjaria',
            role: 'Co-founder',
            bio: 'Decades of leadership and culture-change work across sectors and continents. Ratna designs and holds the journey — and trains the facilitators who carry it.',
            quote: '“When a leader speaks from the heart, everything changes.”',
            note: 'Portrait to come',
            image: {
              src: '/images/pages/mission/ratna.jpg',
              alt: 'Ratna Morjaria seated on a sofa, smiling',
              width: 853,
              height: 853,
            },
          },
          {
            name: 'Avish Lallbahadoor',
            role: 'Co-founder',
            bio: 'A background in leadership, transformation and nature-based learning. Avish brings the structure, the science and the calm that make the deep work safe.',
            quote: '“The work is not to become someone else. It is to lead from who you already are.”',
            note: 'Portrait to come',
            image: {
              src: '/images/pages/mission/avish.jpg',
              alt: 'Avish Lallbahadoor sitting on steps, looking aside',
              width: 1400,
              height: 1400,
            },
          },
        ]}
      />
      <MissionCloseSection
        pill={{
          text: 'Ready when you are',
          avatar: {src: '/images/pages/mission/statement-avatar.jpg'},
        }}
        heading="Who could your leaders become?"
        cta={{label: 'Let’s talk', href: CONTACT_FORM_HREF}}
        email={{label: 'hello@innershift.com', href: 'mailto:hello@innershift.com'}}
        image={{
          src: '/images/pages/mission/close.jpg',
          alt: 'Two people in Inner Shift hoodies talking',
          width: 2784,
          height: 1574,
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
