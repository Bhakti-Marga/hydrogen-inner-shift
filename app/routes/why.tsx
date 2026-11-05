import type {Route} from './+types/why';
import {
  CONTACT_FORM_HREF,
  ContactFormModal,
} from '~/components/contact-form-modal';
import {SiteFooterSection} from '~/sections/site-footer-section';
import {SiteHeaderSection} from '~/sections/site-header-section';
import {WhyCloseSection} from '~/sections/why-close-section';
import {WhyHeroSection} from '~/sections/why-hero-section';
import {WhyLeverSection} from '~/sections/why-lever-section';
import {WhyProofSection} from '~/sections/why-proof-section';
import {WhyStopsSection} from '~/sections/why-stops-section';
import {WhyUnderneathSection} from '~/sections/why-underneath-section';

const AVATAR = {src: '/images/pages/home/hero-pill-avatar.jpg'};

const TITLE = 'Why — Inner Shift';
const DESCRIPTION =
  'The leadership crisis is a human gap: what prevents leaders and teams from using the potential they already have.';

export const meta: Route.MetaFunction = () => [
  {title: TITLE},
  {name: 'description', content: DESCRIPTION},
  {property: 'og:title', content: TITLE},
  {property: 'og:description', content: DESCRIPTION},
];

export default function Why() {
  return (
    <main className="min-h-svh bg-white text-ink">
      <SiteHeaderSection
        tone="solid"
        ctaTone="ember"
        links={[
          {label: 'Programs', href: '/programs'},
          {label: 'Mission', href: '/mission'},
          {label: 'About us', href: '/about'},
          {label: 'Why', href: '/why', current: true},
          {label: 'Results', href: '/results'},
        ]}
        cta={{label: 'Book a consultation', href: CONTACT_FORM_HREF}}
      />
      <WhyHeroSection
        headline="It's not a skills gap. It's a human gap."
        intro="Global engagement has fallen for two years running. Manager engagement is falling faster — down from 27% to 22% in the last year alone. The people meant to bring teams to life are running out of it themselves."
        cta={{label: 'Book a consultation', href: CONTACT_FORM_HREF}}
        photos={[
          {
            src: '/images/pages/why/polaroid-laptop.jpg',
            alt: 'A man in a grey blazer with a laptop, seated against an orange wall',
            width: 900,
            height: 504,
          },
          {
            src: '/images/pages/why/polaroid-hike.jpg',
            alt: 'Four hikers paused among boulders, one standing on the rock',
            width: 681,
            height: 900,
          },
          {
            src: '/images/pages/why/polaroid-presenter.jpg',
            alt: 'A man presenting to a seated group, holding a tablet',
            width: 600,
            height: 900,
          },
          {
            src: '/images/pages/why/polaroid-woods.jpg',
            alt: 'A group sitting on logs in a forest, talking over papers',
            width: 675,
            height: 900,
          },
          {
            src: '/images/pages/why/polaroid-table.jpg',
            alt: 'Colleagues around a table, one leaning in with a pencil',
            width: 900,
            height: 900,
          },
        ]}
        stats={[
          {
            figure: '2 yrs',
            text: 'Consecutive decline in global employee engagement',
          },
          {
            figure: '27→22%',
            text: 'Manager engagement, in the last year alone',
          },
          {
            figure: '$10T',
            text: 'Lost to low engagement in 2025 — 9% of global GDP',
          },
        ]}
      />
      <WhyStopsSection
        pill={{text: 'Where it stops?', avatar: AVATAR}}
        lead="Most leadership development stops at what's visible."
        text="New frameworks, new habits, new language. It works for a few weeks. Then the old pattern comes back, because nothing underneath ever moved."
      />
      <WhyUnderneathSection
        pill={{text: 'What we work on instead...', avatar: AVATAR}}
        heading="We work at what's underneath."
        text="The beliefs, the blind spots, the identity a leader has built their career around. Change that, and the change holds, not just in the room, but in how someone leads for years afterward. That shows up as retention, as how a team performs under pressure, as results, not just a better conversation in a workshop."
        image={{
          src: '/images/pages/why/underneath.jpg',
          alt: 'An iceberg, most of it below the waterline, in a dark blue sea',
          width: 998,
          height: 469,
        }}
      />
      <WhyProofSection
        pill={{text: 'We have the proof', avatar: AVATAR}}
        heading="This is fixable. The best-led organisations already prove it."
        text="That's not luck. It's proof this is fixable: a gap between where most teams sit and where they could, not a ceiling."
        typical={{
          figure: '20%',
          text: 'Global employee engagement — the lowest level since 2020, declining for two years running.',
          source: 'Average manager engagement',
        }}
        best={{
          figure: '79%',
          text: 'Manager engagement — down from 30% in 2022. The people responsible for engagement are disengaging themselves.',
          source: "Inside the world's best-led organisations",
        }}
        gap={{
          figure: '≈ 4×',
          text: 'gap between where most teams sit and where they could',
        }}
      />
      <WhyLeverSection
        lead="Leadership is the one lever nothing else replaces."
        muted="Not more tools, not more frameworks. The return shows up"
        emphasis="everywhere your business depends on people."
        photos={[
          {
            src: '/images/pages/why/lever-hike.jpg',
            alt: 'Two hikers walking up a grassy slope',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/why/lever-mug.jpg',
            alt: 'A woman in an orange sweater resting her chin on her hand',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/why/lever-laugh.jpg',
            alt: 'Two women laughing together',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/why/lever-highfive.jpg',
            alt: 'A high five, one person in a purple jacket',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/why/lever-sofa.jpg',
            alt: 'Two people on an orange sofa, one working on a laptop',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/why/lever-map.jpg',
            alt: 'Four people looking at a map outdoors',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/why/lever-nametag.jpg',
            alt: 'People seated together, one wearing a name tag',
            width: 400,
            height: 600,
          },
        ]}
      />
      <WhyCloseSection
        pill={{
          text: "Let's take a look at where your team's own gap sits...",
          avatar: AVATAR,
        }}
        heading={'The fastest way to see where that lever sits\nin your own team is a conversation, not another framework.'}
        cta={{label: 'Book a free 30min Discovery Call →', href: CONTACT_FORM_HREF}}
        image={{src: '/images/pages/why/close.jpg', width: 2880, height: 1400}}
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
