import {AvatarPill, Container, Reveal, Section, type SectionPadding} from '~/ui';

type ProofCard = {figure: string; text: string; source: string};

export type WhyProofSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  text: string;
  /** Pale card, lower and to the left of the blue one. */
  typical: ProofCard;
  /** Tall blue card on the right. */
  best: ProofCard;
  /** Ember square bridging the two cards. */
  gap: {figure: string; text: string};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/**
 * Two engagement figures and the gap between them. On a wide screen the
 * blue card is full height, the pale card sits at its foot, and the ember
 * square overlaps both.
 */
export function WhyProofSection({
  pill,
  heading,
  text,
  typical,
  best,
  gap,
  id,
  padding = 'none',
  className,
}: WhyProofSectionProps) {
  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <Container className="pt-16 pb-16 lg:pt-28 lg:pb-28">
        <div className="relative lg:min-h-143.5">
          <Reveal className="max-w-169 lg:max-w-[calc(100%-30rem)]">
            <AvatarPill avatar={pill.avatar} tone="cloud" size="sm">
              {pill.text}
            </AvatarPill>
            <h2 className="mt-8 text-statement lg:text-statement-md">{heading}</h2>
            <p className="mt-5 max-w-97 text-support text-ink/70">{text}</p>
          </Reveal>

          <article className="mt-12 flex flex-col bg-cobalt p-8 text-white lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-113.75 lg:p-12">
            <p className="text-sources font-bold lg:text-sources-md">{best.figure}</p>
            <p className="mt-4 max-w-78 text-support">{best.text}</p>
            <p className="mt-10 text-role text-white/50 uppercase lg:mt-auto">{best.source}</p>
          </article>

          <p className="relative z-10 mt-4 flex flex-col items-center justify-center bg-ember px-5 py-6 text-center text-white lg:absolute lg:top-[44%] lg:left-[58%] lg:mt-0 lg:h-40.25 lg:w-42.5 lg:py-5">
            <span className="text-sources font-bold">{gap.figure}</span>
            <span className="mt-2 max-w-33 text-role">{gap.text}</span>
          </p>

          <article className="mt-4 bg-frost p-8 text-ink lg:absolute lg:bottom-0 lg:left-[30%] lg:mt-0 lg:h-54 lg:w-112.75 lg:p-10">
            <p className="text-sources font-bold lg:text-sources-md">{typical.figure}</p>
            <p className="mt-3 max-w-89 text-support">{typical.text}</p>
            <p className="mt-6 text-source font-medium text-ink/45 uppercase">{typical.source}</p>
          </article>
        </div>
      </Container>
    </Section>
  );
}
