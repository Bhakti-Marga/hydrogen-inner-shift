import {useEffect, useRef, useState} from 'react';
import {
  AvatarPill,
  Button,
  Container,
  HeroActions,
  HeroMobileBand,
  Section,
  VideoModal,
  type SectionPadding,
} from '~/ui';

type HeroLink = {label: string; href: string};

export type ResultsHeroSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline breaks the headline from the large breakpoint up. */
  headline: string;
  primaryCta: HeroLink;
  filmCtaLabel: string;
  film: {
    src: string;
    title: string;
  };
  /**
   * Landscape band on small screens. From `md` up it is the still behind the
   * film when motion is reduced.
   */
  poster: {src: string; width: number; height: number};
  facts: string[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Results hero: the homepage film treatment without the program column.
 * On small screens it uses the same landscape band and full-width actions.
 * From `md` up the reviews reel sits behind the headline.
 */
export function ResultsHeroSection({
  pill,
  headline,
  primaryCta,
  filmCtaLabel,
  film,
  poster,
  facts,
  padding = 'none',
  className,
}: ResultsHeroSectionProps) {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <Section
      padding={padding}
      tone="abyss"
      className={`relative isolate flex flex-col overflow-hidden md:min-h-[calc(100svh+4rem)] md:justify-end ${className ?? ''}`}
    >
      <HeroMobileBand
        src={poster.src}
        width={poster.width}
        height={poster.height}
        priority
      />
      <BackgroundFilm src={film.src} poster={poster} paused={filmOpen} />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-abyss/50 md:block md:bg-transparent md:bg-linear-to-r md:from-abyss md:from-[13%] md:to-abyss/0 md:to-[95%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-b from-abyss/0 from-35% to-abyss md:block"
      />

      <Container size="narrow" className="pt-58 pb-12 md:pt-48 md:pb-28">
        <div className="flex max-w-220 flex-col items-start gap-10">
          <AvatarPill avatar={pill.avatar} tone="glass" size="sm" entrance="load">
            {pill.text}
          </AvatarPill>

          <h1 className="text-banner font-light motion-safe:animate-rise-in md:text-banner-md lg:text-banner-lg">
            {headline.split('\n').map((line, index) => (
              <span key={line} className="lg:block">
                {index > 0 ? <span className="lg:hidden"> </span> : null}
                {line}
              </span>
            ))}
          </h1>

          <HeroActions>
            <Button href={primaryCta.href} tone="ember">
              {primaryCta.label}
            </Button>
            <Button
              tone="glass"
              className="gap-2.5"
              aria-haspopup="dialog"
              onClick={() => setFilmOpen(true)}
            >
              <span aria-hidden className="text-glyph">
                ▶
              </span>
              {filmCtaLabel}
            </Button>
          </HeroActions>
        </div>

        <ul className="mt-16 grid border-t border-white/14 text-attribution text-white/82 motion-safe:animate-fade-in motion-safe:[animation-delay:var(--duration-page)] sm:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {facts.map((fact, index) => (
            <li
              key={fact}
              className={`flex items-center py-5 ${index > 0 ? 'border-t border-white/14 sm:border-t-0 sm:border-l sm:pl-8' : ''}`}
            >
              {fact}
            </li>
          ))}
        </ul>
      </Container>

      <VideoModal
        open={filmOpen}
        onClose={() => setFilmOpen(false)}
        src={film.src}
        title={film.title}
      />
    </Section>
  );
}

/**
 * Muted, looping reviews film behind the hero. Captions are burnt into this
 * reel, so the decorative copy stays silent. The film is in the first HTML
 * from `md` up (a `<source media>` keeps phones off it). Phones get the
 * landscape band instead, so this still is only the reduced-motion poster.
 */
function BackgroundFilm({
  src,
  poster,
  paused,
}: {
  src: string;
  poster: ResultsHeroSectionProps['poster'];
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
