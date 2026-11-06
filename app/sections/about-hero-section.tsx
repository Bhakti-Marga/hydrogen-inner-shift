import {useState} from 'react';
import {
  Button,
  Container,
  HeroActions,
  HeroMobileBand,
  Section,
  VideoModal,
  type SectionPadding,
  type VideoModalVideo,
} from '~/ui';

type HeroLink = {label: string; href: string};

type HeroPerson = {
  name: string;
  detail: string;
  avatar: {src: string; width: number; height: number};
};

export type AboutHeroSectionProps = {
  /** Light headline. Wraps inside the left column. */
  headline: string;
  intro: string;
  cta: HeroLink;
  filmCtaLabel: string;
  film: VideoModalVideo;
  image: {src: string; width: number; height: number};
  people: HeroPerson[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * About hero: a forest photograph, frosted on the left so the headline can
 * sit on it, with the two founders named in cards over the sharp half.
 * On small screens the photograph is a landscape band across the top and the
 * copy sits on the solid field underneath.
 */
export function AboutHeroSection({
  headline,
  intro,
  cta,
  filmCtaLabel,
  film,
  image,
  people,
  padding = 'none',
  className,
}: AboutHeroSectionProps) {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <Section
      padding={padding}
      tone="abyss"
      className={`relative isolate overflow-hidden${className ? ` ${className}` : ''}`}
    >
      <HeroMobileBand
        src={image.src}
        width={image.width}
        height={image.height}
        priority
      />
      <img
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        fetchPriority="high"
        className="absolute inset-0 -z-20 hidden size-full object-cover object-[70%_center] md:block lg:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-abyss/75 via-abyss/50 to-abyss/15 md:block lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-cloud/10 backdrop-blur-frost lg:block"
      />

      <Container className="flex flex-col justify-end gap-10 pt-58 pb-10 md:min-h-svh md:pt-28 lg:min-h-205 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pt-0 lg:pb-24">
        <div className="flex max-w-141 flex-col items-start gap-5.5 lg:mb-15 lg:gap-0">
          <h1 className="text-statement font-light motion-safe:animate-rise-in lg:text-statement-md">
            {headline}
          </h1>
          <p className="max-w-114 text-support motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-fast)] lg:mt-5.5">
            {intro}
          </p>
          <div className="mt-2 w-full lg:mt-11">
            <HeroActions>
              <Button href={cta.href} tone="light" size="md-badge">
                {cta.label}
                <ConsultationArrow />
              </Button>
              <Button
                tone="glass"
                aria-haspopup="dialog"
                onClick={() => setFilmOpen(true)}
              >
                {filmCtaLabel}
              </Button>
            </HeroActions>
          </div>
        </div>

        {/* Frost stays un-animated. An opacity fade on this list makes the blur
            sample a flat panel, then snap to the photo once the fade ends. */}
        <ul className="flex w-full flex-col gap-2.25 lg:mr-12 lg:w-108.5 lg:shrink-0">
          {people.map((person) => (
            <li
              key={person.name}
              className="flex items-center gap-4 rounded-card bg-white/10 px-6.25 py-7.5 backdrop-blur-frost md:bg-night/40"
            >
              <img
                src={person.avatar.src}
                alt=""
                width={person.avatar.width}
                height={person.avatar.height}
                className="size-13 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-card-title font-normal tracking-normal">{person.name}</p>
                <p className="text-detail font-light whitespace-pre-line">{person.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <VideoModal
        open={filmOpen}
        onClose={() => setFilmOpen(false)}
        src={film.src}
        title={film.title}
        captions={film.captions}
      />
    </Section>
  );
}

/** Ember disc with the up-right arrow from the consultation button. */
function ConsultationArrow() {
  return (
    <svg
      aria-hidden
      width="41"
      height="42"
      viewBox="0 0 41 42"
      fill="none"
      className="shrink-0"
    >
      <rect width="41" height="42" rx="20.5" className="fill-ember" />
      <path
        d="M15.7888 25.7117L25.2112 16.2883M15.7888 16.2883H25.2112V25.7117"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-white"
      />
    </svg>
  );
}
