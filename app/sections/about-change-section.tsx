import {AvatarPill, Container, CountUp, Reveal, Section, type SectionPadding} from '~/ui';

type Quote = {
  quote: string;
  body: string;
  cite: string;
};

type Stat = {
  /** Shown as-is when `count` is omitted, for figures like 0.92. */
  label: string;
  count?: number;
  suffix?: string;
  text?: string;
};

export type AboutChangeSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  quotes: Quote[];
  stats: Stat[];
  padding?: SectionPadding;
  className?: string;
};

/** What changes: two accounts, then the figures underneath. */
export function AboutChangeSection({
  pill,
  heading,
  quotes,
  stats,
  padding = 'none',
  className,
}: AboutChangeSectionProps) {
  return (
    <Section padding={padding} tone="light" className={className}>
      <Container className="flex flex-col items-center pt-16 pb-16 md:pt-24 md:pb-20">
        <Reveal>
          <AvatarPill avatar={pill.avatar} tone="white">
            {pill.text}
          </AvatarPill>
        </Reveal>
        <Reveal order={1}>
          <h2 className="mt-6 max-w-200 text-center text-program font-normal text-pine">{heading}</h2>
        </Reveal>

        <ul className="mt-12 grid w-full gap-0.5 md:mt-14 md:grid-cols-2">
          {quotes.map((quote, index) => (
            <Reveal key={quote.cite} as="li" order={index} className="bg-white px-8 py-10 md:px-11 md:py-12">
              <p className="text-mosaic text-pine lg:text-mosaic-lg">{quote.quote}</p>
              <p className="mt-6 text-support text-pine">{quote.body}</p>
              <p className="mt-8 text-detail text-pine/60 uppercase">{quote.cite}</p>
            </Reveal>
          ))}
        </ul>

        <ul className="mt-0.5 grid w-full grid-cols-2 gap-0.5 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              as="li"
              order={index}
              className="flex min-h-57.5 flex-col items-center justify-center bg-white px-4 py-8 text-center"
            >
              <p className="text-sources font-medium text-pine md:text-sources-md">
                {stat.count !== undefined ? (
                  <CountUp value={stat.count} suffix={stat.suffix} />
                ) : (
                  stat.text
                )}
              </p>
              <p className="mt-2 max-w-48 text-detail text-pine/60 uppercase">{stat.label}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
