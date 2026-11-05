import {useState} from 'react';
import {
  Button,
  Container,
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
      <img
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_center] lg:object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-abyss/75 via-abyss/50 to-abyss/15 lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-cloud/10 backdrop-blur-frost lg:block"
      />

      <Container className="flex min-h-svh flex-col justify-end gap-10 pt-28 pb-10 lg:min-h-205 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pt-0 lg:pb-24">
        <div className="flex max-w-141 flex-col items-start gap-5.5 lg:mb-15 lg:gap-0">
          <h1 className="text-statement font-light motion-safe:animate-rise-in lg:text-statement-md">
            {headline}
          </h1>
          <p className="max-w-114 text-support motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-fast)] lg:mt-5.5">
            {intro}
          </p>
          <div className="mt-2 flex flex-wrap gap-3.5 motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-slow)] lg:mt-11">
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
          </div>
        </div>

        <ul className="flex w-full flex-col gap-2.25 motion-safe:animate-fade-in motion-safe:[animation-delay:var(--duration-page)] lg:mr-12 lg:w-108.5 lg:shrink-0">
          {people.map((person) => (
            <li
              key={person.name}
              className="flex items-center gap-4 rounded-card bg-night/40 px-6.25 py-7.5 backdrop-blur-frost"
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
                <p className="text-detail font-light">{person.detail}</p>
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
