import {Container, Eyebrow, Reveal, Section, type SectionPadding} from '~/ui';

type ImmersionImage = {src: string; alt?: string; width: number; height: number};

export type ImmersionCard = {
  /** Frosted label over the photograph. */
  badge: string;
  /** Uppercase line under the photograph. */
  label: string;
  title: string;
  description: string;
  /** Follows the semibold "You leave with:". */
  outcome: string;
  image: ImmersionImage;
};

export type ProgramsImmersionsSectionProps = {
  eyebrow: string;
  /** A newline breaks the heading from the md breakpoint up. */
  heading: string;
  cards: ImmersionCard[];
  quote: string;
  attribution: string;
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** Three white cards — beliefs, values, identity — and a participant line. */
export function ProgramsImmersionsSection({
  eyebrow,
  heading,
  cards,
  quote,
  attribution,
  id,
  padding = 'roomy',
  className,
}: ProgramsImmersionsSectionProps) {
  return (
    <Section id={id} padding={padding} tone="glacier" className={className}>
      <Container size="narrow">
        <Reveal>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-display font-light md:text-display-md">
            {heading.split('\n').map((line, index) => (
              <span key={line} className="md:block">
                {index > 0 ? <span className="md:hidden"> </span> : null}
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal
              key={card.title}
              as="article"
              order={index}
              className="flex flex-col overflow-hidden rounded-tile bg-white"
            >
              <div className="relative h-57">
                <img
                  src={card.image.src}
                  alt={card.image.alt ?? ''}
                  width={card.image.width}
                  height={card.image.height}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <p className="absolute top-4.5 left-4.5 inline-flex h-8 items-center rounded-full bg-night/38 px-4 text-source font-medium text-white uppercase backdrop-blur-md">
                  {card.badge}
                </p>
              </div>
              <div className="flex flex-col px-6 pt-8 pb-14 md:px-9 md:pb-15.5">
                <Eyebrow tone="light">{card.label}</Eyebrow>
                <h3 className="mt-4 text-layer font-medium md:text-layer-md">
                  {card.title}
                </h3>
                <p className="mt-5 text-answer font-light text-ink/82">
                  {card.description}
                </p>
                <p className="mt-5 text-answer text-ink/82">
                  <span className="font-semibold">You leave with:</span>{' '}
                  <span className="font-light">{card.outcome}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-136 text-center md:mt-20">
          <p className="text-pull italic">{quote}</p>
          <Eyebrow tone="light" className="mt-5 text-center">
            {attribution}
          </Eyebrow>
        </Reveal>
      </Container>
    </Section>
  );
}
