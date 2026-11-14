import {Fragment, useEffect, useRef, useState} from 'react';
import {
  ArrowBadge,
  AvatarPill,
  Button,
  Container,
  Eyebrow,
  HeroActions,
  HeroMobileBand,
  Section,
  VideoModal,
  type SectionPadding,
} from '~/ui';

type HeroLink = {label: string; href: string};

export type HeroProgram = {
  /** Small uppercase label, e.g. "Flagship". */
  label: string;
  /** Bold part of the card title. */
  title: string;
  /** Regular-weight continuation of the title. */
  subtitle: string;
  /** Revealed on hover or focus. */
  description: string;
  /** Short facts in a row under the description, e.g. "6–12 leaders". */
  details: string[];
  /** Arrow badge colour; `cobalt` stays glass until the card is active. */
  accent: 'ember' | 'cobalt';
  href: string;
};

export type HomeHeroSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  headline: string;
  intro: {
    /** Bold opening sentence. */
    lead: string;
    text: string;
  };
  primaryCta: HeroLink;
  filmCtaLabel: string;
  film: {
    src: string;
    title: string;
    /** Omit when the words are already burnt into the picture. */
    captions?: {src: string; label: string; srcLang: string};
  };
  /** Silent loop behind the copy. The modal plays `film`. */
  backgroundSrc: string;
  /** Still shown before the film loads, on small screens and with reduced motion. */
  poster: {src: string; width: number; height: number};
  programsLabel: string;
  programs: HeroProgram[];
  facts: string[];
  padding?: SectionPadding;
  className?: string;
};

export function HomeHeroSection({
  pill,
  headline,
  intro,
  primaryCta,
  filmCtaLabel,
  film,
  backgroundSrc,
  poster,
  programsLabel,
  programs,
  facts,
  padding = 'none',
  className,
}: HomeHeroSectionProps) {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <Section
      padding={padding}
      tone="abyss"
      className={`relative isolate flex flex-col overflow-hidden md:min-h-[calc(100svh+4rem)] md:justify-end ${className ?? ''}`}
    >
      <HeroMobileBand
        src="/images/pages/home/hero-band-mobile.jpg"
        width={800}
        height={458}
      />
      <BackgroundFilm src={backgroundSrc} poster={poster} paused={filmOpen} />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-abyss/50 md:block md:bg-transparent md:bg-linear-to-r md:from-abyss md:from-[21.6%] md:to-abyss/0 md:to-[97.8%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-b from-abyss/0 from-[29.9%] to-abyss md:block"
      />

      <Container className="pt-58 pb-12 md:pt-48 md:pb-28">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex max-w-2xl flex-col items-start gap-8 md:gap-10">
            <div className="max-w-full">
              <AvatarPill avatar={pill.avatar} tone="glass" entrance="load">
                {pill.text}
              </AvatarPill>
            </div>

            <div className="flex flex-col gap-4 motion-safe:animate-rise-in">
              <h1 className="text-hero font-medium uppercase md:text-hero-md">
                {headline}
              </h1>
              <p className="text-hero-intro font-light md:text-body-lg">
                <span className="font-bold">{intro.lead}</span>{' '}
                <span className="block text-white/60 md:inline">{intro.text}</span>
              </p>
            </div>

            <HeroActions>
              <Button href={primaryCta.href} tone="ember">
                {primaryCta.label}
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

          <div className="flex w-full flex-col gap-2 motion-safe:animate-rise motion-safe:[animation-delay:var(--duration-page)] lg:w-125">
            <Eyebrow>{programsLabel}</Eyebrow>
            <ul className="flex flex-col gap-2">
              {programs.map((program) => (
                <li key={program.label}>
                  <ProgramCard program={program} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-10 flex flex-col gap-2 border-y border-white/25 py-5.5 text-body motion-safe:animate-fade-in motion-safe:[animation-delay:var(--duration-page)] md:mt-16 md:flex-row md:flex-wrap md:items-center md:gap-x-10 md:border-b-0 md:pt-5.5 md:pb-0">
          {facts.map((fact, index) => (
            <Fragment key={fact}>
              {index > 0 ? (
                <li aria-hidden className="hidden text-xl leading-none md:list-item">
                  ·
                </li>
              ) : null}
              <li>
                <span aria-hidden className="md:hidden">
                  {'· '}
                </span>
                {fact}
              </li>
            </Fragment>
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

/**
 * Program link card that turns white and reveals its description and facts on
 * hover or keyboard focus. The column is bottom-aligned, so it grows upwards.
 */
function ProgramCard({program}: {program: HeroProgram}) {
  return (
    <a
      href={program.href}
      className="group flex min-h-30 items-center justify-between bg-white/10 p-6 backdrop-blur-glass transition-colors duration-[var(--duration-slow)] ease-out-soft hover:bg-white hover:text-abyss focus-visible:bg-white focus-visible:text-abyss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none md:min-h-0 md:items-start [--tw-duration:var(--duration-slow)]"
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex flex-col gap-1">
          <Eyebrow
            as="span"
            className="transition-colors duration-[var(--duration-slow)] group-hover:text-pebble group-focus-visible:text-pebble"
          >
            {program.label}
          </Eyebrow>
          <span className="flex flex-col text-card-title md:block">
            <span className="font-semibold text-card-lead md:text-card-title">
              {program.title}
            </span>
            <span className="max-md:block md:ml-1">{program.subtitle}</span>
          </span>
        </span>

        <span className="hidden md:grid md:grid-rows-[0fr] md:transition-[grid-template-rows] md:duration-[var(--duration-slow)] md:ease-out-soft md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
          <span className="flex flex-col gap-6 overflow-hidden">
            <span className="mt-6 text-card-body font-light">
              {program.description}
            </span>
            <span className="flex items-center justify-between gap-4 border-t-[0.5px] border-abyss/20 pt-3.5 text-card-meta font-medium">
              {program.details.map((detail) => (
                <span key={detail}>{detail}</span>
              ))}
            </span>
          </span>
        </span>
      </span>

      {program.accent === 'ember' ? (
        <ArrowBadge tone="ember" />
      ) : (
        <ArrowBadge
          tone="glass"
          className="transition-colors duration-[var(--duration-slow)] group-hover:bg-cobalt group-focus-visible:bg-cobalt"
        />
      )}
    </a>
  );
}

/**
 * Muted, looping, caption-free film behind the hero from `md` up. Phones get
 * the still band at the top of the section, and never download the film. The
 * film is in the first HTML (a `<source media>` keeps it off phones) so a
 * still is not painted in front of it while JavaScript starts.
 */
function BackgroundFilm({
  src,
  poster,
  paused,
}: {
  src: string;
  poster: HomeHeroSectionProps['poster'];
  paused: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else video.play().catch(() => {});
  }, [paused]);

  return (
    <>
      <img
        src={poster.src}
        alt=""
        width={poster.width}
        height={poster.height}
        className="absolute inset-0 -z-20 hidden size-full object-cover motion-reduce:md:block"
      />
      <video
        ref={videoRef}
        aria-hidden
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="pointer-events-none absolute inset-0 -z-20 hidden size-full object-cover motion-safe:md:block"
      >
        <source
          src={src}
          type="video/mp4"
          media="(min-width: 768px) and (prefers-reduced-motion: no-preference)"
        />
      </video>
    </>
  );
}
