import type {Route} from './+types/programs';
import {
  CONTACT_FORM_HREF,
  ContactFormModal,
} from '~/components/contact-form-modal';
import {ProgramsBeliefSection} from '~/sections/programs-belief-section';
import {ProgramsCloseSection} from '~/sections/programs-close-section';
import {ProgramsDaySection} from '~/sections/programs-day-section';
import {ProgramsHeroSection} from '~/sections/programs-hero-section';
import {ProgramsImmersionsSection} from '~/sections/programs-immersions-section';
import {ProgramsJourneySection} from '~/sections/programs-journey-section';
import {ProgramsPairSection} from '~/sections/programs-pair-section';
import {ProgramsTasterSection} from '~/sections/programs-taster-section';
import {SiteFooterSection} from '~/sections/site-footer-section';
const TITLE = 'Programs — Inner Shift';
const DESCRIPTION =
  'Leadership programs for teams: a first taste of the work, or a full journey through the beliefs, values and identity that shape how they lead.';

const HERO = '/images/pages/programs/hero.jpg';

export const meta: Route.MetaFunction = () => [
  {title: TITLE},
  {name: 'description', content: DESCRIPTION},
  {property: 'og:title', content: TITLE},
  {property: 'og:description', content: DESCRIPTION},
];

export const links: Route.LinksFunction = () => [
  {rel: 'preload', as: 'image', href: HERO},
];

export default function Programs() {
  return (
    <main className="min-h-svh bg-white text-ink">
      <ProgramsHeroSection
        pill={{
          text: 'Ready for the Full program?',
          avatar: {src: '/images/pages/home/hero-pill-avatar.jpg'},
        }}
        headline="Three immersions. One team. Paced around you."
        intro="We take your leadership team into nature three times within six months, four days at a time. In between, we hold the thread, and afterwards, we stay with you for a year."
        primaryCta={{label: 'Start the conversation', href: CONTACT_FORM_HREF}}
        secondaryCta={{label: 'Learn more ↓', href: '#programs'}}
        image={{src: HERO, width: 2721, height: 1536}}
        facts={[
          '6 to 12 senior leaders',
          '3 immersions × 4 days',
          'Residential, in nature',
          'Up to six months, shaped with you',
        ]}
      />
      <ProgramsPairSection
        id="programs"
        heading="Two programs"
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
          image: {
            src: '/images/pages/programs/flagship.jpg',
            alt: 'Participants writing in a forest beside a tarp shelter',
            width: 1900,
            height: 1072,
          },
        }}
        taster={{
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
          image: {
            src: '/images/pages/home/program-taster.jpg',
            alt: 'A facilitator marking a pyramid on a flip chart',
            width: 1034,
            height: 444,
          },
        }}
      />
      <ProgramsJourneySection
        eyebrow="How it happens"
        heading="Full journey. Step by step"
        steps={[
          {
            number: '01',
            title: 'Discovery',
            text: 'Before the first immersion, we meet the team, listen and understand where it stands today — a 360 assessment and quiet one-to-one conversations, so we start from observed patterns, not self-reported sentiment.',
          },
          {
            number: '02',
            title: 'Immersion 1: Beliefs',
            text: 'The team steps out into nature and surfaces the assumptions shaping how it works.',
          },
          {
            number: '03',
            title: 'Immersion 2: Values',
            text: 'The team returns, reflects on what it tested at work, and aligns around what truly matters.',
          },
          {
            number: '04',
            title: 'Immersion 3: Identity',
            text: 'The deepest layer: who each leader is being, and who the team chooses to become.',
          },
          {
            number: '05',
            title: 'Integration',
            text: 'After the last immersion, we help the team embed the change at work — a 90-day roadmap the team co-creates and owns, and the same 360 repeated, so the shift is measured, not remembered.',
          },
        ]}
      />
      <ProgramsImmersionsSection
        eyebrow="Three Immersions · Four Days Each"
        heading={'Each one goes a layer deeper\nbelow the waterline.'}
        cards={[
          {
            badge: 'Above the waterline',
            label: 'Immersion 1 · 4 days in nature',
            title: 'Beliefs',
            description:
              'The assumptions that quietly drive the team — surfaced, and tested for real.',
            outcome: 'trust that is felt, not performed.',
            image: {
              src: '/images/pages/programs/beliefs.jpg',
              alt: 'Hands placing a sticky note on a planning sheet',
              width: 811,
              height: 424,
            },
          },
          {
            badge: 'At the waterline',
            label: 'Immersion 2 · 4 days in nature',
            title: 'Values',
            description:
              'What truly matters — named, and lined up with daily action.',
            outcome: 'accountability experienced as care, not control.',
            image: {
              src: '/images/pages/programs/values.jpg',
              alt: 'A facilitator in an Inner Shift hoodie at a laptop by the window',
              width: 811,
              height: 424,
            },
          },
          {
            badge: 'Below the waterline',
            label: 'Immersion 3 · 4 days in nature',
            title: 'Identity',
            description:
              'Who each leader is being — and who the team chooses to become.',
            outcome: 'a shared identity, and a 90-day roadmap.',
            image: {
              src: '/images/pages/programs/identity.jpg',
              alt: 'A man sitting on stone steps',
              width: 811,
              height: 424,
            },
          },
        ]}
        quote="“Listening to the shadow of another participant, I saw my own shadow clearer than ever before. A mirror.”"
        attribution="Participant · Immersion 1"
      />
      <ProgramsDaySection
        pill={{
          text: 'An example day',
          avatar: {src: '/images/pages/home/hero-pill-avatar.jpg'},
        }}
        heading={'What a single day inside an\nimmersion looks like'}
        slots={[
          {
            label: 'Morning',
            title: 'A walk, in silence',
            text: 'Arrive in the place and leave the office behind.',
          },
          {
            label: 'Late morning',
            title: 'Circle work',
            text: 'Honest conversation as a team, guided by the facilitators.',
          },
          {
            label: 'Afternoon',
            title: 'Solo time',
            text: 'Time in nature to reflect and journal.',
          },
          {
            label: 'Evening',
            title: 'A shared meal',
            text: 'And reflection on what the day revealed.',
          },
        ]}
        image={{
          src: '/images/pages/programs/example-day.jpg',
          alt: 'A man resting against a tree in a forest, a backpack beside him',
          width: 2773,
          height: 1560,
        }}
        quote={{
          label: 'From participant feedback',
          text: '“I normally have a very active mind, constantly thinking about different things: ideas, plans, what needs to be done next. But in that moment, there was nothing. Just stillness. It was beautiful. … I was just there, completely present.”',
          avatar: {
            src: '/images/pages/programs/feedback-avatar.jpg',
            alt: 'A participant',
            width: 152,
            height: 152,
          },
        }}
      />
      <ProgramsBeliefSection
        pill={{
          text: 'We believe that...',
          avatar: {src: '/images/pages/home/hero-pill-avatar.jpg'},
        }}
        lead="When a leader speaks from the heart, everything changes."
        text="Not because of what they say, but because of the presence they hold."
        photos={[
          {
            src: '/images/pages/programs/belief-hoodie.jpg',
            alt: 'A woman in an Inner Shift hoodie',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/programs/belief-listen.jpg',
            alt: 'A man in a black shirt looking aside',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/programs/belief-circle.jpg',
            alt: 'Two people seated together, one with a hand on her chest',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/programs/belief-hands.jpg',
            alt: 'Hands resting on a chest, with bracelets and a ring',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/programs/belief-embrace.jpg',
            alt: 'Two people embracing, one in an Inner Shift hoodie',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/programs/belief-gesture.jpg',
            alt: 'A woman gesturing as she speaks',
            width: 400,
            height: 600,
          },
          {
            src: '/images/pages/programs/belief-presence.jpg',
            alt: 'A man with his eyes closed',
            width: 400,
            height: 600,
          },
        ]}
      />
      <ProgramsTasterSection
        id="day"
        pill={{
          text: 'Need more time?',
          avatar: {src: '/images/pages/home/hero-pill-avatar.jpg'},
        }}
        title="Try One Day Immersion,"
        titleRest="to get the taste of it."
        text="A single day in nature, shaped around your team's real material — a walk in silence, circle work, solo time, and a shared table at the end. You leave with a felt sense of how your team actually talks, and an honest read on whether the full journey is right for you."
        facts={['1 full day · in nature', '6–12 leaders', 'No further commitment']}
        note="Commitment: six months → one day."
        cta={{label: 'Plan a taster day', href: CONTACT_FORM_HREF}}
        image={{
          src: '/images/pages/programs/taster-day.jpg',
          alt: 'A woman in profile, gesturing as she speaks',
          width: 2784,
          height: 1578,
        }}
      />
      <ProgramsCloseSection
        pill={{
          text: 'Ready when you are',
          avatar: {src: '/images/pages/home/hero-pill-avatar.jpg'},
        }}
        heading={'You’ve felt the shape of it.\nThe rest is one conversation.'}
        primary={{label: 'Let’s talk', href: CONTACT_FORM_HREF}}
        secondary={{
          label: 'Download the Full Programme Overview',
          href: CONTACT_FORM_HREF,
        }}
        image={{
          src: '/images/pages/programs/close.jpg',
          width: 2880,
          height: 1400,
        }}
      />
      <SiteFooterSection
        links={[
          {label: 'Programs', href: '/programs'},
          {label: 'Approach', href: '/why'},
          {label: 'Results', href: '/results'},
          {label: 'About', href: '/about'},
        ]}
        copyright="© 2026 Inner Shift — The Full Journey"
      />
      <ContactFormModal />
    </main>
  );
}
