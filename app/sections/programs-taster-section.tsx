import {AvatarPill, Button, Reveal, Section, type SectionPadding} from '~/ui';

export type ProgramsTasterSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** First line of the title, in medium. */
  title: string;
  /** Second line, in light. */
  titleRest: string;
  text: string;
  facts: string[];
  /** Italic line under the facts. */
  note: string;
  cta: {label: string; href: string};
  image: {src: string; alt?: string; width: number; height: number};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/**
 * The one-day taster: a frosted card over a photograph, inset like the
 * example-day panel.
 */
export function ProgramsTasterSection({
  pill,
  title,
  titleRest,
  text,
  facts,
  note,
  cta,
  image,
  id,
  padding = 'none',
  className,
}: ProgramsTasterSectionProps) {
  return (
    <Section
      id={id}
      padding={padding}
      tone="glacier"
      className={`px-3 pb-16 md:px-6 md:pb-32${className ? ` ${className}` : ''}`}
    >
      <div className="relative flex min-h-160 items-center overflow-hidden rounded-panel lg:min-h-190">
        <img
          src={image.src}
          alt={image.alt ?? ''}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-pine/34 to-pine/6 to-60%"
        />

        <Reveal className="relative m-3 w-full max-w-150 rounded-sheet bg-sheet/62 p-6 shadow-sheet ring-1 ring-white/35 ring-inset backdrop-blur-sheet sm:m-6 sm:p-10 lg:m-0 lg:ml-14 lg:p-12.5">
          <AvatarPill avatar={pill.avatar} tone="dusk" size="sm">
            {pill.text}
          </AvatarPill>
          <h2 className="mt-7 text-taster md:mt-8 md:text-taster-md">
            <span className="block font-medium">{title}</span>
            <span className="block font-light">{titleRest}</span>
          </h2>
          <p className="mt-5 text-answer text-ink/80">{text}</p>
          <ul className="mt-6 flex flex-col gap-2 border-t border-ink/14 pt-5 sm:flex-row sm:items-center">
            {facts.map((fact, index) => (
              <li
                key={fact}
                className={`text-card-body font-medium text-ink/85 ${index > 0 ? 'sm:border-l sm:border-ink/14 sm:pl-6' : ''}`}
              >
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-question text-ink/90 italic">{note}</p>
          <Button href={cta.href} size="md" className="mt-6">
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
