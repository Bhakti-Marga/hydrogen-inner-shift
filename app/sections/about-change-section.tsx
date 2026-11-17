import {AvatarPill, Container, Reveal, Section, type SectionPadding} from '~/ui';

type Quote = {
  quote: string;
  body: string;
  cite: string;
};

export type AboutChangeSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  quotes: Quote[];
  padding?: SectionPadding;
  className?: string;
};

/** What changes, in the words of people who have done the work. */
export function AboutChangeSection({
  pill,
  heading,
  quotes,
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
            <Reveal
              key={quote.cite}
              as="li"
              order={index}
              className={`bg-white px-8 py-10 md:px-11 md:py-12${quotes.length === 1 ? ' md:col-span-2' : ''}`}
            >
              <p className="text-mosaic text-pine lg:text-mosaic-lg">{quote.quote}</p>
              <p className="mt-6 text-support text-pine">{quote.body}</p>
              <p className="mt-8 text-detail text-pine/60 uppercase">{quote.cite}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
