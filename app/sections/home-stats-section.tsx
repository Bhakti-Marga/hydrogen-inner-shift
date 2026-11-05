import {
  AvatarPill,
  Container,
  CountUp,
  Reveal,
  Section,
  type SectionPadding,
} from '~/ui';

export type HomeStat = {
  /** Whole number that counts up from 0, e.g. `10` for "$10T". */
  value: number;
  prefix?: string;
  suffix?: string;
  text: string;
  source: string;
};

export type HomeStatsSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  stats: HomeStat[];
  closing: string;
  source: {label: string; linkLabel: string; href: string};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

export function HomeStatsSection({
  pill,
  stats,
  closing,
  source,
  id,
  padding = 'roomy',
  className,
}: HomeStatsSectionProps) {
  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <Container size="narrow" className="flex flex-col gap-10">
        <Reveal className="self-start">
          <AvatarPill avatar={pill.avatar} tone="cloud">
            {pill.text}
          </AvatarPill>
        </Reveal>

        <ul className="grid gap-2 md:grid-cols-3 md:gap-6">
          {stats.map((stat, index) => (
            <Reveal
              as="li"
              key={stat.text}
              order={index}
              className="flex min-h-68 flex-col bg-frost px-8 pt-11.5 pb-9.5"
            >
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-stat-md font-light"
              />
              <p className="mt-3.5 max-w-75 text-stat-body text-ink/72">
                {stat.text}
              </p>
              <p className="mt-auto pt-6 text-source font-medium text-ink/38 uppercase">
                {stat.source}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="text-closing italic">{closing}</p>
          <p className="text-caption text-ink/50">
            {source.label}{' '}
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="border-b border-ink/35 transition-colors duration-fast hover:border-ink hover:text-ink"
            >
              {source.linkLabel}
            </a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
