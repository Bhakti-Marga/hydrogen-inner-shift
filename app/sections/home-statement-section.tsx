import {Fragment} from 'react';
import {
  ArrowRightIcon,
  Button,
  Container,
  Reveal,
  Section,
  type SectionPadding,
} from '~/ui';

export type HomeStatementSectionProps = {
  statement: {
    /** Opening sentence in full white. */
    lead: string;
    /** Continuation in muted white. */
    text: string;
  };
  cta: {label: string; href: string};
  /** The usual question (small, muted) set against ours (large, right-aligned). */
  contrast: {theirs: string; ours: string};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

export function HomeStatementSection({
  statement,
  cta,
  contrast,
  id,
  padding = 'snug',
  className,
}: HomeStatementSectionProps) {
  return (
    <Section id={id} padding={padding} tone="abyss" className={className}>
      <Container size="narrow" className="flex flex-col gap-14 md:gap-20">
        <div className="flex flex-col items-start gap-7">
          <h2 className="max-w-293.5 text-statement md:text-statement-md">
            <span className="sr-only">{`${statement.lead} ${statement.text}`}</span>
            <span aria-hidden>
              <span className="font-normal">
                <BrightenWords text={statement.lead} />
              </span>{' '}
              <span className="font-light text-white/60">
                <BrightenWords text={statement.text} />
              </span>
            </span>
          </h2>
          <Reveal className="w-full md:w-auto">
            <Button
              href={cta.href}
              tone="light"
              size="md-icon"
              className="w-full md:w-auto"
            >
              {cta.label}
              <ArrowRightIcon />
            </Button>
          </Reveal>
        </div>

        <Reveal className="flex flex-col items-center gap-6 border-t border-white/25 pt-10 text-center md:flex-row md:items-start md:justify-between md:gap-16 md:pt-8 md:text-left">
          <p className="max-w-85.5 text-aside font-light text-white italic md:text-white/52">
            <MobileQuoteBreak text={contrast.theirs} />
          </p>
          <p className="max-w-164.5 text-aside md:text-right md:text-quote-md">
            <MobileQuoteBreak text={contrast.ours} />
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Puts the quoted question on its own line below `md`. */
function MobileQuoteBreak({text}: {text: string}) {
  return text.split('“').map((part, index) =>
    index === 0 ? (
      part
    ) : (
      <Fragment key={index}>
        <br className="md:hidden" />
        {`“${part}`}
      </Fragment>
    ),
  );
}

/** One `scroll-brighten` span per word, so each line lights up as it rises. */
function BrightenWords({text}: {text: string}) {
  let offset = 0;
  return text.split(' ').map((word) => {
    const start = offset;
    offset += word.length + 1;
    return (
      <Fragment key={start}>
        {start > 0 ? ' ' : null}
        <span className="scroll-brighten">{word}</span>
      </Fragment>
    );
  });
}
