import {AvatarPill, Container, Eyebrow, Reveal, Section, type SectionPadding} from '~/ui';

export type DaySlot = {
  label: string;
  title: string;
  text: string;
};

export type DayQuote = {
  label: string;
  text: string;
  avatar: {src: string; alt?: string; width: number; height: number};
};

export type ProgramsDaySectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline breaks the heading from the md breakpoint up. */
  heading: string;
  slots: DaySlot[];
  image: {src: string; alt?: string; width: number; height: number};
  /** White card overlapping the panel's lower right corner. */
  quote?: DayQuote;
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/**
 * One day inside an immersion: a forest panel with the schedule along the
 * lower half. Inset from the page edges, like the hero.
 */
export function ProgramsDaySection({
  pill,
  heading,
  slots,
  image,
  quote,
  id,
  padding = 'none',
  className,
}: ProgramsDaySectionProps) {
  return (
    <Section
      id={id}
      padding={padding}
      tone="glacier"
      className={`px-3 md:px-6${className ? ` ${className}` : ''}`}
    >
      <div className="relative mb-3 md:mb-6 lg:pb-43.5">
        <div className="relative isolate flex min-h-160 flex-col overflow-hidden rounded-panel text-white lg:min-h-195">
        <img
          src={image.src}
          alt={image.alt ?? ''}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 -z-20 size-full object-cover object-[88%_center] lg:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-pine/30 via-pine/44 via-[48%] to-pine/84"
        />

        <Container
          size="narrow"
          className="relative flex flex-1 flex-col pt-16 pb-12 md:pt-38 md:pb-52"
        >
          <Reveal>
            <AvatarPill avatar={pill.avatar} tone="glass" size="sm">
              {pill.text}
            </AvatarPill>
            <h2 className="mt-6 max-w-155 text-panel font-light md:text-panel-md">
              {heading.split('\n').map((line, index) => (
                <span key={line} className="md:block">
                  {index > 0 ? <span className="md:hidden"> </span> : null}
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <ul className="mt-12 grid border-t border-white/20 pt-9 lg:mt-20 lg:grid-cols-4">
            {slots.map((slot, index) => (
              <Reveal
                key={slot.title}
                as="li"
                order={index}
                className={
                  index > 0
                    ? 'mt-6 border-t border-white/14 pt-6 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8.5'
                    : undefined
                }
              >
                <Eyebrow>{slot.label}</Eyebrow>
                <h3 className="mt-4 text-closing font-medium">{slot.title}</h3>
                <p className="mt-3 max-w-60 text-note text-white/88">{slot.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
        </div>
        {quote ? <FeedbackCard quote={quote} /> : null}
      </div>
    </Section>
  );
}

function FeedbackCard({quote}: {quote: DayQuote}) {
  return (
    <Reveal
      as="article"
      className="relative z-10 mt-4 rounded-media bg-white px-6 pt-8 pb-8 shadow-lift md:px-11.5 md:pt-10.5 md:pb-10 lg:absolute lg:right-16 lg:bottom-0 lg:mt-0 lg:w-150"
    >
      <div className="flex items-center gap-3.5">
        <img
          src={quote.avatar.src}
          alt={quote.avatar.alt ?? ''}
          width={quote.avatar.width}
          height={quote.avatar.height}
          loading="lazy"
          className="size-9.5 shrink-0 rounded-full object-cover"
        />
        <Eyebrow tone="light">{quote.label}</Eyebrow>
      </div>
      <p className="mt-6 text-feedback italic">{quote.text}</p>
    </Reveal>
  );
}
