import {Container, Reveal, Section, type SectionPadding} from '~/ui';

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, when the crop should not sit at the centre. */
  objectPosition?: string;
};

type FounderLink = {
  label: string;
  href: string;
};

type FounderProfile = {
  portrait: Photo;
  name: string;
  /** Uppercase lines under the name. */
  labels: string[];
  links?: FounderLink[];
  quote?: string;
  paragraphs: string[];
};

export type AboutProfileSectionProps = {
  people: FounderProfile[];
  padding?: SectionPadding;
  className?: string;
};

/** Two founder columns, each with its biography always open. */
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
      className="flex min-h-80 flex-col lg:min-h-166"
    >
      <div className="flex flex-1 flex-col bg-cloud px-8 py-10 md:px-10">
        <div className="flex flex-1 flex-col">
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
          {person.links?.length ? (
            <ul className="mt-6 flex flex-col items-start gap-2">
              {person.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-pine/35 text-role text-pine uppercase transition-colors duration-fast hover:border-pine"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
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
