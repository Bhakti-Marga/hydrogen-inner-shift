import {Container, Reveal, Section, type SectionPadding} from '~/ui';

type Photo = {src: string; alt: string; width: number; height: number};

export type AboutProfileSectionProps = {
  portrait: Photo;
  photo: Photo;
  name: string;
  /** Uppercase line under the name. Named `label` so it is not the ARIA role. */
  label: string;
  paragraphs: string[];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Founder profile: a short biography on a pale panel, beside a portrait that
 * fills the other half.
 */
export function AboutProfileSection({
  portrait,
  photo,
  name,
  label,
  paragraphs,
  padding = 'none',
  className,
}: AboutProfileSectionProps) {
  return (
    <Section padding={padding} tone="white" className={className}>
      <Container className="grid gap-3 pt-16 lg:grid-cols-2 lg:pt-28">
        <Reveal className="flex flex-col bg-cloud px-8 py-10 md:px-10">
          <img
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            className="h-33.5 w-31.25 object-cover object-[center_18%]"
          />
          <h2 className="mt-8 text-approach font-medium text-pine md:text-approach-md">{name}</h2>
          <p className="mt-3 text-role text-clay uppercase">{label}</p>
          <div className="mt-10 flex max-w-134 flex-col gap-6 text-body text-ink/70">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal order={1} className="relative min-h-80 overflow-hidden lg:min-h-166">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            className="absolute inset-0 size-full object-cover motion-safe:group-data-[state=run]/reveal:animate-settle"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
