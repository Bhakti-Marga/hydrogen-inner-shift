import {Section, Wordmark, type SectionPadding} from '~/ui';

export type ComingSoonHeroSectionProps = {
  /** First, fully visible part of the headline. */
  headline: string;
  /** Second part of the headline, rendered muted ("below the surface"). */
  mutedHeadline: string;
  eyebrow: string;
  message: string;
  statusLabel: string;
  progressLabel: string;
  image: {
    src: string;
    /** Portrait crop served below the `md` breakpoint. */
    mobileSrc: string;
    alt: string;
    width: number;
    height: number;
  };
  padding?: SectionPadding;
  className?: string;
};

export function ComingSoonHeroSection({
  headline,
  mutedHeadline,
  eyebrow,
  message,
  statusLabel,
  progressLabel,
  image,
  padding = 'none',
  className,
}: ComingSoonHeroSectionProps) {
  return (
    <Section
      padding={padding}
      tone="abyss"
      className={`relative isolate flex min-h-svh flex-col overflow-hidden${className ? ` ${className}` : ''}`}
    >
      <picture className="absolute inset-x-0 top-0 -z-20 h-[64svh] md:inset-0 md:h-full">
        <source media="(max-width: 767px)" srcSet={image.mobileSrc} />
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover object-top motion-safe:animate-hero-settle md:object-[50%_40%]"
        />
      </picture>

      {/* Readability scrims: blend the shorter mobile image into the page,
          fade into deep water at the bottom, and darken the text column on
          wide screens. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[64svh] bg-linear-to-b from-transparent from-55% to-abyss md:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-linear-to-t from-abyss from-35% via-abyss/70 to-transparent md:h-1/2 md:from-10%"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-abyss/60 via-abyss/15 to-transparent md:block"
      />

      <header className="flex items-center justify-between gap-4 px-6 pt-6 md:pt-8 xl:px-10">
        <Wordmark className="shrink-0 whitespace-nowrap motion-safe:animate-fade-in" />
        <p className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/20 bg-abyss/30 px-3 py-2 font-mono text-label uppercase tracking-label backdrop-blur-md motion-safe:animate-fade-in sm:gap-3 sm:px-4">
          <span
            aria-hidden
            className="size-2 rounded-full bg-ember motion-safe:animate-beacon"
          />
          {statusLabel}
        </p>
      </header>

      <div className="flex flex-1 flex-col justify-end px-6 pb-20 pt-24 md:justify-center md:pb-[30svh] xl:px-10">
        <h1 className="max-w-[17ch] text-hero font-medium uppercase md:text-hero-md md:max-w-[21ch]">
          <span className="block motion-safe:animate-rise-in">{headline}</span>{' '}
          <span className="block text-mist motion-safe:animate-sink-in motion-safe:[animation-delay:var(--duration-slow)]">
            {mutedHeadline}
          </span>
        </h1>

        <div className="mt-12 max-w-md motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-page)] md:mt-16">
          <p className="font-mono text-label uppercase tracking-label text-white/70">
            {eyebrow}
          </p>
          <p className="mt-4 text-body text-white/85">{message}</p>

          <div className="mt-10 flex items-center gap-5">
            <div
              aria-hidden
              className="relative h-1 w-[140px] shrink-0 overflow-hidden rounded-full bg-white/25 sm:w-[200px] md:w-[240px]"
            >
              <span className="absolute inset-y-0 left-0 w-3/5 rounded-full bg-white motion-safe:w-2/5 motion-safe:animate-progress-sweep" />
            </div>
            <p className="whitespace-nowrap font-mono text-label-lg uppercase tracking-label text-white">
              {progressLabel}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
