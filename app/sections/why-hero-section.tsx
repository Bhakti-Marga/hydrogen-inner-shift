import {Button, Container, Section, type SectionPadding} from '~/ui';

type HeroLink = {label: string; href: string};

type HeroPhoto = {src: string; alt: string; width: number; height: number};

type HeroStat = {figure: string; text: string};

export type WhyHeroSectionProps = {
  /** Centred headline. */
  headline: string;
  intro: string;
  cta: HeroLink;
  /**
   * Five photographs, left to right. Each frame is the same size; the lean
   * and the drop belong to the slot, so the centre one stays highest.
   */
  photos: HeroPhoto[];
  stats: HeroStat[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Lean (degrees) and downward shift for each slot, left to right.
 * Later photos paint over earlier ones. The fourth leans the other way
 * so its bottom-right corner stays visible under the fifth.
 */
const SLOTS = [
  {rotate: 1.57, drop: '5%'},
  {rotate: -1.84, drop: '7%'},
  {rotate: 6.32, drop: '4%'},
  {rotate: -3.71, drop: '7%'},
  {rotate: 1.38, drop: '2%'},
];

/**
 * Why hero: a centred statement, then five overlapping photographs and a
 * row of figures on the same white field.
 */
export function WhyHeroSection({
  headline,
  intro,
  cta,
  photos,
  stats,
  padding = 'none',
  className,
}: WhyHeroSectionProps) {
  return (
    <Section padding={padding} tone="white" className={className}>
      <Container className="flex flex-col items-center pt-16 pb-24 text-center lg:pt-20 lg:pb-36">
        <h1 className="max-w-213.5 text-statement font-normal motion-safe:animate-rise-in lg:text-statement-md">
          {headline}
        </h1>
        <p className="mt-4 max-w-143 text-body-lg motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-fast)]">
          {intro}
        </p>
        <div className="mt-7 motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-slow)]">
          <Button href={cta.href} tone="ember" size="md-badge">
            {cta.label}
            <ArrowBadge />
          </Button>
        </div>

        <ul className="mt-14 flex w-full items-start justify-center py-4 lg:mt-16">
          {photos.map((photo, index) => {
            const slot = SLOTS[index] ?? SLOTS[2];
            return (
              <li
                key={photo.src}
                className="-ml-[3.2%] w-[19.5%] border-2 border-white first:ml-0 sm:border-4"
                style={{
                  transform: `translateY(${slot.drop}) rotate(${slot.rotate}deg)`,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="aspect-[257/248] w-full object-cover"
                />
              </li>
            );
          })}
        </ul>

        <ul className="mt-12 grid w-full max-w-230 text-left sm:mt-16 sm:grid-cols-3">
          {stats.map((stat) => (
            <li
              key={stat.figure}
              className="border-t border-ink/15 py-6 first:border-t-0 sm:border-t-0 sm:px-8 sm:py-10 sm:[&:not(:first-child)]:border-l"
            >
              <p className="text-statement font-bold lg:text-statement-md">{stat.figure}</p>
              <p className="mt-3 max-w-64 text-support font-light text-ink/65">{stat.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** White disc with the up-right arrow, sitting on the ember consultation button. */
function ArrowBadge() {
  return (
    <svg
      aria-hidden
      width="41"
      height="42"
      viewBox="0 0 41 42"
      fill="none"
      className="shrink-0"
    >
      <rect width="41" height="42" rx="20.5" className="fill-white" />
      <path
        d="M15.7888 25.7117L25.2112 16.2883M15.7888 16.2883H25.2112V25.7117"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-ink"
      />
    </svg>
  );
}
