import {AvatarPill, Button, Reveal, Section, type SectionPadding} from '~/ui';

type Source = {number: string; title: string; detail: string};

export type MissionSourcesSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline starts a new line from the extra-large breakpoint up. */
  heading: string;
  intro: string;
  cta: {label: string; href: string};
  sources: Source[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Introduction beside the seven sources. The introduction stays with its
 * button while the list scrolls. Each note is visible on small screens and
 * fades in on hover or keyboard focus on wide screens.
 */
export function MissionSourcesSection({
  pill,
  heading,
  intro,
  cta,
  sources,
  padding = 'none',
  className,
}: MissionSourcesSectionProps) {
  return (
    <Section
      padding={padding}
      tone="white"
      className={`px-4 py-16 md:px-8 md:py-28 lg:px-10${className ? ` ${className}` : ''}`}
    >
      <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,33rem)_minmax(0,1fr)] xl:gap-20">
        <Reveal className="flex flex-col items-start gap-7 xl:sticky xl:top-8">
          <AvatarPill avatar={pill.avatar} tone="cloud" size="md">
            {pill.text}
          </AvatarPill>
          <h2 className="text-sources font-light text-ink md:text-sources-md">
            {heading.split('\n').map((line, index) => (
              <span key={line}>
                {index > 0 ? (
                  <>
                    <br className="hidden xl:inline" />{' '}
                  </>
                ) : null}
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-sm text-body-lg font-light text-ink/55">{intro}</p>
          <Button href={cta.href} tone="ember" size="md" className="mt-8">
            {cta.label}
          </Button>
        </Reveal>

        <ol>
          {sources.map((source, index) => (
            <Reveal
              key={source.number}
              as="li"
              order={index}
              tabIndex={0}
              className="group relative grid grid-cols-[2.25rem_1fr] items-center gap-x-4 gap-y-1.5 border-t border-ink/10 py-6 outline-none last:border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink xl:grid-cols-[2.75rem_1fr] xl:gap-x-6 xl:py-7"
            >
              <span className="text-card-meta font-medium text-ink/40">{source.number}</span>
              <h3 className="text-card-heading font-medium text-ink xl:pr-72">{source.title}</h3>
              <p className="col-start-2 text-card-body font-light text-ink/55 xl:absolute xl:inset-y-0 xl:right-0 xl:flex xl:w-64 xl:items-center xl:justify-end xl:text-right xl:opacity-0 xl:transition-opacity xl:duration-base motion-reduce:xl:transition-none xl:group-hover:opacity-100 xl:group-focus-within:opacity-100">
                {source.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
