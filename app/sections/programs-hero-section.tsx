import {
  AvatarPill,
  Button,
  HeroActions,
  HeroMobileBand,
  Section,
  type SectionPadding,
} from '~/ui';

type HeroLink = {label: string; href: string};

export type ProgramsHeroSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline breaks the headline from the large breakpoint up. */
  headline: string;
  intro: string;
  primaryCta: HeroLink;
  secondaryCta: HeroLink;
  image: {src: string; width: number; height: number};
  facts: string[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Programs hero. On small screens it is full width: a landscape photograph
 * across the top, then full-width actions on the solid field. From `md` up it
 * is a photo panel inset from the page edges, with the headline over the
 * forest and a facts row along the bottom.
 */
export function ProgramsHeroSection({
  pill,
  headline,
  intro,
  primaryCta,
  secondaryCta,
  image,
  facts,
  padding = 'none',
  className,
}: ProgramsHeroSectionProps) {
  return (
    <Section
      padding={padding}
      tone="white"
      className={`md:px-6${className ? ` ${className}` : ''}`}
    >
      <div className="relative isolate mb-3 flex flex-col overflow-hidden bg-night text-white md:mb-6 md:min-h-180 md:rounded-panel lg:min-h-192">
        <HeroMobileBand
          src={image.src}
          width={image.width}
          height={image.height}
          tone="night"
          priority
        />
        <img
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          fetchPriority="high"
          className="absolute inset-0 -z-20 hidden size-full object-cover md:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-linear-to-b from-night/10 from-[12.8%] via-night/34 via-[54.7%] to-night/90 to-[84.9%] md:block"
        />

        <div className="mx-auto flex w-full max-w-narrow flex-1 flex-col px-6 pt-58 md:px-8 md:pt-20 lg:pt-40 xl:px-0">
          <div className="flex max-w-220 flex-col gap-10">
            <div className="flex flex-col gap-5.5">
              <AvatarPill
                avatar={pill.avatar}
                tone="glass"
                size="sm"
                entrance="load"
                className="self-start"
              >
                {pill.text}
              </AvatarPill>
              <div className="flex flex-col gap-5.5 motion-safe:animate-rise-in">
                <h1 className="text-banner font-light md:text-banner-md lg:text-banner-lg">
                  {headline.split('\n').map((line, index) => (
                    <span key={line} className="lg:block">
                      {index > 0 ? <span className="lg:hidden"> </span> : null}
                      {line}
                    </span>
                  ))}
                </h1>
                <p className="max-w-130 text-banner-lead font-light text-white/78 md:text-banner-lead-md">
                  {intro}
                </p>
              </div>
            </div>

            <HeroActions>
              <Button href={primaryCta.href} tone="ember">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} tone="glass">
                {secondaryCta.label}
              </Button>
            </HeroActions>
          </div>

          <ul className="mt-10 grid grid-cols-2 border-t border-white/22 motion-safe:animate-fade-in motion-safe:[animation-delay:var(--duration-page)] md:mt-auto lg:grid-cols-4">
            {facts.map((fact, index) => (
              <li key={fact} className={factItemClass(index)}>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/** Equal columns; a hairline divides each one from the column on its left. */
function factItemClass(index: number) {
  return [
    'flex items-center border-white/16 py-5 text-link text-white/88 lg:py-7.5',
    index % 2 === 1 ? 'border-l pl-6 lg:pl-8.5' : '',
    index >= 2 ? 'border-t lg:border-t-0' : '',
    index > 0 ? 'lg:border-l lg:pl-8.5' : '',
  ]
    .filter(Boolean)
    .join(' ');
}
