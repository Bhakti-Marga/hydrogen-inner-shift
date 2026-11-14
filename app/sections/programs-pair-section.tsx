import {Container, Reveal, Section, type SectionPadding} from '~/ui';

type ProgramImage = {src: string; alt?: string; width: number; height: number};

export type ProgramCard = {
  /** Small uppercase badge, e.g. "Flagship". */
  label: string;
  /** Medium-weight opening, followed by a lighter line. */
  title: string;
  subtitle: string;
  description: string;
  /** Flagship: a divided row. Taster: a dashed list. */
  facts: string[];
  image: ProgramImage;
};

export type ProgramsPairSectionProps = {
  heading: string;
  flagship: ProgramCard;
  taster: ProgramCard;
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** The two ways in: flagship photo card beside the shorter taster card. */
export function ProgramsPairSection({
  heading,
  flagship,
  taster,
  id,
  padding = 'default',
  className,
}: ProgramsPairSectionProps) {
  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <Container size="narrow" className="flex flex-col gap-10">
        <Reveal as="h2" className="text-display font-light md:text-display-md">
          {heading}
        </Reveal>

        <div className="grid items-stretch gap-6 lg:grid-cols-[723fr_517fr]">
          <FlagshipCard program={flagship} />
          <TasterCard program={taster} />
        </div>
      </Container>
    </Section>
  );
}

function FlagshipCard({program}: {program: ProgramCard}) {
  return (
    <Reveal
      as="article"
      order={1}
      className="relative isolate flex flex-col overflow-hidden rounded-media bg-depth text-white lg:min-h-157 lg:justify-end"
    >
      <img
        src={program.image.src}
        alt={program.image.alt ?? ''}
        width={program.image.width}
        height={program.image.height}
        loading="lazy"
        className="h-52 w-full object-cover object-center lg:absolute lg:-top-px lg:-left-[4%] lg:-z-10 lg:h-[85%] lg:w-[130%] lg:max-w-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-depth/0 from-[19.92%] to-depth to-[85.89%]"
      />

      <div className="flex flex-col p-6 md:p-12">
        <Badge>{program.label}</Badge>
        <h3 className="mt-6 max-w-125 text-program md:text-program-md">
          <span className="font-medium">{program.title}</span>{' '}
          <span className="font-light text-white/80">{program.subtitle}</span>
        </h3>
        <p className="mt-6 max-w-130 text-program-body font-light text-white/74">
          {program.description}
        </p>

        <ul className="mt-7 grid border-t border-white/22 pt-5 sm:grid-cols-3">
          {program.facts.map((fact) => (
            <li
              key={fact}
              className="py-1.5 text-attribution text-white/88 sm:border-l sm:border-white/16 sm:px-6.5 sm:first:border-l-0 sm:first:pl-0"
            >
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function TasterCard({program}: {program: ProgramCard}) {
  return (
    <Reveal
      as="article"
      order={2}
      className="flex flex-col overflow-hidden rounded-media bg-cloud"
    >
      <div className="relative h-55.5 shrink-0">
        <img
          src={program.image.src}
          alt={program.image.alt ?? ''}
          width={program.image.width}
          height={program.image.height}
          loading="lazy"
          className="size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-abyss/40" />
        <Badge className="absolute bottom-4 left-6 md:left-11">
          {program.label}
        </Badge>
      </div>

      <div className="flex grow flex-col p-6 md:p-11">
        <h3 className="text-program md:text-program-compact-md">
          <span className="block font-medium">{program.title}</span>
          <span className="block font-light text-ink/70">{program.subtitle}</span>
        </h3>
        <p className="mt-5 text-program-body font-light text-ink/78">
          {program.description}
        </p>
        <ul className="mt-6 flex flex-col gap-2.5">
          {program.facts.map((fact) => (
            <li key={fact} className="flex gap-3.5 text-attribution">
              <span aria-hidden className="text-ink/40">
                —
              </span>
              <span className="text-ink/85">{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function Badge({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex h-8 items-center self-start rounded-full bg-white/16 px-4.5 text-source font-medium text-white uppercase ring-1 ring-white/14 backdrop-blur-md ring-inset ${className}`}
    >
      {children}
    </p>
  );
}
