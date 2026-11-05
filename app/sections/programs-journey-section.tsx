import {Container, Eyebrow, Reveal, Section, type SectionPadding} from '~/ui';

export type JourneyStep = {
  /** Two-digit label, e.g. "01". */
  number: string;
  title: string;
  text: string;
};

export type ProgramsJourneySectionProps = {
  eyebrow: string;
  heading: string;
  steps: JourneyStep[];
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** Numbered path from discovery through the three immersions to integration. */
export function ProgramsJourneySection({
  eyebrow,
  heading,
  steps,
  id,
  padding = 'roomy',
  className,
}: ProgramsJourneySectionProps) {
  return (
    <Section
      id={id}
      padding={padding}
      tone="soot"
      className={className}
    >
      <Container size="narrow">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-display font-light md:text-display-md">
            {heading}
          </h2>
        </Reveal>

        <ol className="mt-14 border-b border-white/14 lg:mt-16">
          {steps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              order={index}
              className="grid grid-cols-[4.625rem_1fr] items-center gap-x-8 gap-y-4 border-t border-white/14 py-8 lg:grid-cols-[4.625rem_minmax(0,1fr)_minmax(0,31.25rem)] lg:gap-x-16 lg:py-10.5"
            >
              <span className="grid size-18.5 place-items-center rounded-full bg-ash text-question font-medium text-soot">
                {step.number}
              </span>
              <h3 className="text-step font-medium md:text-step-md">{step.title}</h3>
              <p className="col-span-2 text-program-body font-light text-white/62 lg:col-span-1">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
