import {AvatarPill, Reveal, Section, type SectionPadding} from '~/ui';

type Person = {
  name: string;
  role: string;
  bio: string;
  quote: string;
  note: string;
  image: {src: string; alt: string; width: number; height: number};
};

export type MissionTeamSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  people: Person[];
  padding?: SectionPadding;
  className?: string;
};

/** Founder portraits, each with a short bio and a line in their own words. */
export function MissionTeamSection({
  pill,
  heading,
  people,
  padding = 'none',
  className,
}: MissionTeamSectionProps) {
  return (
    <Section
      padding={padding}
      tone="white"
      className={`px-4 py-16 md:px-8 md:py-28 lg:px-10${className ? ` ${className}` : ''}`}
    >
      <Reveal>
        <AvatarPill avatar={pill.avatar} tone="cloud" size="md">
          {pill.text}
        </AvatarPill>
        <h2 className="mt-6 max-w-3xl text-sources font-light text-ink md:text-sources-md">
          {heading}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-8">
        {people.map((person, index) => (
          <Reveal key={person.name} order={index} className="flex flex-col gap-6">
            <div className="relative aspect-square overflow-hidden rounded-panel">
              <img
                src={person.image.src}
                alt={person.image.alt}
                width={person.image.width}
                height={person.image.height}
                loading="lazy"
                className="absolute inset-0 size-full object-cover motion-safe:group-data-[state=run]/reveal:animate-settle"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-b from-night/0 via-night/30 via-50% to-night/70"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-3 px-6 pb-8 md:px-9">
                <p className="text-layer font-medium text-white">{person.name}</p>
                <span className="rounded-full bg-white/14 px-4 py-2 text-eyebrow font-medium text-white uppercase ring-1 ring-white/18 ring-inset backdrop-blur-md">
                  {person.role}
                </span>
              </div>
            </div>
            <p className="max-w-lg text-body-lg font-light text-ink/70">{person.bio}</p>
            <p className="max-w-md text-banner-lead text-ink italic md:text-banner-lead-md">
              {person.quote}
            </p>
            <p className="text-eyebrow font-medium text-ink/35 uppercase">{person.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
