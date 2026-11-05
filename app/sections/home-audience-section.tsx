import {Button, Container, Reveal, Section, type SectionPadding} from '~/ui';

export type HomeAudienceGroup = {
  heading: string;
  /** Numbered rows; the last one is set in italic as the closing line. */
  items: string[];
};

export type HomeAudienceSectionProps = {
  heading: string;
  groups: HomeAudienceGroup[];
  cta: {label: string; href: string};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

export function HomeAudienceSection({
  heading,
  groups,
  cta,
  id,
  padding = 'default',
  className,
}: HomeAudienceSectionProps) {
  return (
    <Section id={id} padding={padding} tone="light" className={className}>
      <Container size="narrow" className="flex flex-col items-start gap-10">
        <Reveal as="h2" className="text-display font-light md:text-display-md">
          {heading}
        </Reveal>

        <div className="grid w-full gap-6 md:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal
              as="article"
              key={group.heading}
              order={index + 1}
              className="rounded-media bg-white px-6 pt-8 pb-10 md:px-12 md:pt-11.5 md:pb-12"
            >
              <h3 className="text-card-heading font-semibold">
                {group.heading}
              </h3>
              <ol className="mt-6">
                {group.items.map((item, index) => (
                  <AudienceRow
                    key={item}
                    index={index}
                    last={index === group.items.length - 1}
                  >
                    {item}
                  </AudienceRow>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Button href={cta.href}>{cta.label}</Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function AudienceRow({
  index,
  last,
  children,
}: {
  index: number;
  last: boolean;
  children: string;
}) {
  return (
    <li
      className={`flex border-t border-ink/9 py-4.5 ${last ? 'border-b' : ''}`}
    >
      <span
        aria-hidden
        className="w-12 shrink-0 pt-0.5 text-fine font-medium text-ink/32 md:w-15.5"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={`text-list ${last ? 'text-ink/85 italic' : ''}`}>
        {children}
      </span>
    </li>
  );
}
