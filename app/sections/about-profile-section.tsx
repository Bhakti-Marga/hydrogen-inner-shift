import {Container, Reveal, Section, type SectionPadding} from '~/ui';

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, when the crop should not sit at the centre. */
  objectPosition?: string;
};

type FounderProfile = {
  portrait: Photo;
  photo: Photo;
  name: string;
  /** Uppercase lines under the name. */
  labels: string[];
  quote?: string;
  paragraphs: string[];
};

export type AboutProfileSectionProps = {
  people: FounderProfile[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Two founder columns. On large screens each rests on a photograph; hover or
 * keyboard focus fades that photograph away to show the biography. Below that,
 * the biography is open and the cover photograph is omitted.
 */
export function AboutProfileSection({
  people,
  padding = 'none',
  className,
}: AboutProfileSectionProps) {
  return (
    <Section padding={padding} tone="white" className={className}>
      <Container className="grid gap-3 pt-16 lg:grid-cols-2 lg:pt-28">
        {people.map((person, index) => (
          <FounderCard key={person.name} person={person} order={index} />
        ))}
      </Container>
    </Section>
  );
}

function FounderCard({person, order}: {person: FounderProfile; order: number}) {
  return (
    <Reveal
      as="article"
      order={order}
      tabIndex={0}
      onMouseDown={(event) => {
        if (window.matchMedia('(hover: hover)').matches) event.preventDefault();
      }}
      className="group/profile relative flex min-h-80 flex-col overflow-hidden focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-inset lg:min-h-166"
    >
      <img
        src={person.photo.src}
        alt={person.photo.alt}
        width={person.photo.width}
        height={person.photo.height}
        loading="lazy"
        style={
          person.photo.objectPosition
            ? {objectPosition: person.photo.objectPosition}
            : undefined
        }
        className="hidden object-cover motion-reduce:transition-none lg:absolute lg:inset-0 lg:z-10 lg:block lg:h-full lg:w-full lg:transition-opacity lg:duration-[var(--duration-reveal)] lg:ease-out-soft lg:[--tw-duration:var(--duration-reveal)] lg:[--tw-ease:var(--ease-out-soft)] lg:group-focus-within/profile:opacity-0 lg:group-focus-visible/profile:opacity-0 lg:group-hover/profile:opacity-0 motion-safe:group-data-[state=run]/reveal:animate-settle"
      />
      <div className="flex flex-1 flex-col bg-cloud px-8 py-10 md:px-10">
        <div className="flex flex-1 flex-col motion-reduce:transition-none lg:translate-y-3 lg:transition-transform lg:duration-[var(--duration-reveal)] lg:ease-out-soft lg:[--tw-duration:var(--duration-reveal)] lg:[--tw-ease:var(--ease-out-soft)] lg:group-focus-within/profile:translate-y-0 lg:group-focus-visible/profile:translate-y-0 lg:group-hover/profile:translate-y-0">
          <img
            src={person.portrait.src}
            alt=""
            width={person.portrait.width}
            height={person.portrait.height}
            style={
              person.portrait.objectPosition
                ? {objectPosition: person.portrait.objectPosition}
                : undefined
            }
            className="h-33.5 w-31.25 object-cover object-[center_18%]"
          />
          <h2 className="mt-8 text-approach font-medium text-pine md:text-approach-md">
            {person.name}
          </h2>
          <p className="mt-3 text-role text-clay uppercase">
            {person.labels.map((label) => (
              <span key={label} className="block">
                {label}
              </span>
            ))}
          </p>
          {person.quote ? (
            <p className="mt-10 max-w-134 text-body text-ink/80 italic">{person.quote}</p>
          ) : null}
          <div
            className={`${person.quote ? 'mt-6' : 'mt-10'} flex max-w-134 flex-col gap-6 text-body text-ink/70`}
          >
            {person.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
