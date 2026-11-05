import {Reveal, Section, type SectionPadding} from '~/ui';

type QuoteTone = 'ghost' | 'glass' | 'solid' | 'dim';

type Quote = {
  id: string;
  quote: string;
  cite: string;
  tone: QuoteTone;
};

export type AboutQuotesSectionProps = {
  /** Wraps inside a narrow column over the photograph. */
  heading: string;
  image: {src: string; width: number; height: number};
  quotes: Quote[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * A hillside photograph with a heading on the left and a stack of quotes.
 * The middle card is solid; the ones toward the edges fade out.
 */
export function AboutQuotesSection({
  heading,
  image,
  quotes,
  padding = 'none',
  className,
}: AboutQuotesSectionProps) {
  return (
    <Section padding={padding} tone="white" className={`px-2 pt-10 md:px-3 md:pt-16${className ? ` ${className}` : ''}`}>
      <div className="relative overflow-hidden rounded-media">
        <img
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative grid gap-8 px-5 py-10 md:px-10 lg:min-h-200 lg:grid-cols-[20rem_minmax(0,29rem)_1fr] lg:items-start lg:gap-x-24 lg:px-20 lg:py-0">
          <Reveal>
            <h2 className="max-w-80 text-statement font-normal text-white lg:mt-20 lg:max-w-none lg:text-statement-md">
              {heading}
            </h2>
          </Reveal>
          <ul className="flex flex-col gap-4 lg:min-h-200 lg:justify-between lg:gap-5">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

const cardText = {
  solid: 'text-pine',
  glass: 'text-white',
  dim: 'text-white/55',
  ghost: 'text-white/10',
};

const dotSurface = {
  solid: 'bg-ember',
  glass: 'bg-white',
  dim: 'bg-white/55',
  ghost: 'bg-white/10',
};

function QuoteCard({quote}: {quote: Quote}) {
  const faint = quote.tone === 'dim' || quote.tone === 'ghost';

  return (
    <li
      aria-hidden={quote.tone === 'ghost' ? true : undefined}
      className={`relative items-start gap-9 rounded-media px-6 py-7 ${cardText[quote.tone]} ${quote.tone === 'ghost' ? 'hidden lg:flex' : 'flex'}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-media shadow-card ${
          faint ? 'bg-white/10 opacity-10' : quote.tone === 'solid' ? 'bg-white' : 'bg-white/10 backdrop-blur-md'
        }`}
      />
      <span aria-hidden className={`relative mt-1 size-3 shrink-0 rounded-full ${dotSurface[quote.tone]}`} />
      <span className="relative flex min-w-0 flex-col gap-4">
        <span className="text-whisper">{quote.quote}</span>
        <span className="text-cite">{quote.cite}</span>
      </span>
    </li>
  );
}
