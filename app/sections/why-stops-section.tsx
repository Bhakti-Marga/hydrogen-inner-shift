import {AvatarPill, Container, Reveal, Section, type SectionPadding} from '~/ui';

export type WhyStopsSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** Opening sentence, in full ink. */
  lead: string;
  /** Continuation, in muted ink. */
  text: string;
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** A short pill beside the line about where leadership development stops. */
export function WhyStopsSection({
  pill,
  lead,
  text,
  id,
  padding = 'none',
  className,
}: WhyStopsSectionProps) {
  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <Container className="flex flex-col items-start gap-8 pt-10 pb-16 lg:flex-row lg:gap-20 lg:pt-16 lg:pb-28">
        <Reveal className="shrink-0">
          <AvatarPill avatar={pill.avatar} tone="cloud">
            {pill.text}
          </AvatarPill>
        </Reveal>
        <Reveal as="h2" className="text-statement lg:text-statement-md">
          <span className="font-medium">{lead} </span>
          <span className="font-light text-ink/40">{text}</span>
        </Reveal>
      </Container>
    </Section>
  );
}
