import {useEffect, useRef, useState} from 'react';
import {
  AvatarPill,
  Button,
  Container,
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
  /** Still shown before the film loads, on small screens and with reduced motion. */
  poster: {src: string; width: number; height: number};
  facts: string[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Results hero: the same full-bleed film treatment as the homepage, with the
 * reviews reel behind the headline and no program column on the right.
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
      className={`relative isolate flex min-h-svh flex-col justify-end overflow-hidden lg:min-h-173.5 ${className ?? ''}`}
    >
      <BackgroundFilm src={film.src} poster={poster} paused={filmOpen} />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-abyss/50 md:bg-transparent md:bg-linear-to-r md:from-abyss md:from-[13%] md:to-abyss/0 md:to-[95%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-abyss/0 from-35% to-abyss"
      />

      <Container size="narrow" className="pt-32 pb-12">
        <div className="flex max-w-220 flex-col items-start gap-10">
          <div className="motion-safe:animate-fade-in">
            <AvatarPill avatar={pill.avatar} tone="glass" size="sm" entrance="load">
              {pill.text}
            </AvatarPill>
          </div>

          <h1 className="text-banner font-light motion-safe:animate-rise-in md:text-banner-md lg:text-banner-lg">
            {headline.split('\n').map((line, index) => (
              <span key={line} className="lg:block">
                {index > 0 ? <span className="lg:hidden"> </span> : null}
                {line}
              </span>
            ))}
          </h1>

          <div className="flex flex-wrap gap-2 motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-slow)]">
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
          </div>
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
 * reel, so the decorative copy stays silent. Rendered only on the client from
 * `md` up and without reduced motion, so phones and SSR get the poster alone.
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
  const [enabled, setEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else video.play().catch(() => {});
  }, [paused, enabled]);

  return (
    <>
      <img
        src={poster.src}
        alt=""
        width={poster.width}
        height={poster.height}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      {enabled ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster.src}
          aria-hidden
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="absolute inset-0 -z-20 size-full object-cover motion-safe:animate-fade-in"
        />
      ) : null}
    </>
  );
}
