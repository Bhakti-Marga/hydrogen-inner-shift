import {Button, Eyebrow, Reveal, Section, type SectionPadding} from '~/ui';

export type MissionStatementSectionProps = {
  avatar: {src: string; width: number; height: number};
  quote: string;
  cta: {label: string; href: string};
  /** Page heading. */
  statement: string;
  padding?: SectionPadding;
  className?: string;
};

/**
 * Quote card beside the mission statement. The avatar sits on the card's
 * top-left corner, and the statement is the page heading.
 */
export function MissionStatementSection({
  avatar,
  quote,
  cta,
  statement,
  padding = 'none',
  className,
}: MissionStatementSectionProps) {
  return (
    <Section
      padding={padding}
      tone="white"
      className={`px-4 pt-6 pb-16 md:px-8 md:pt-10 md:pb-28 lg:px-10${className ? ` ${className}` : ''}`}
    >
      <div className="grid items-start gap-10 lg:grid-cols-[24.5rem_minmax(0,1fr)] lg:gap-32">
        <Reveal>
          <div className="relative">
            <img
              src={avatar.src}
              alt=""
              width={avatar.width}
              height={avatar.height}
              className="absolute top-0 left-0 z-10 size-13 -translate-x-4 -translate-y-1 rounded-full object-cover"
            />
            <div className="flex min-h-56 flex-col items-start justify-center gap-6 rounded-media bg-haze py-8 pr-8 pl-18">
              <p className="text-body font-medium text-pine">{quote}</p>
              <Button href={cta.href} tone="ember" size="md">
                {cta.label}
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal order={1} className="flex flex-col gap-6 lg:max-w-200 lg:pt-1">
          <Eyebrow tone="bay">Our Mission</Eyebrow>
          <h1 className="text-statement font-light text-pine md:text-statement-md">{statement}</h1>
        </Reveal>
      </div>
    </Section>
  );
}
