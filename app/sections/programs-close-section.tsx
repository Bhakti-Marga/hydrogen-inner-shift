import {AvatarPill, Button, Reveal, Section, type SectionPadding} from '~/ui';

export type ProgramsCloseSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline breaks the heading. */
  heading: string;
  primary: {label: string; href: string};
  secondary: {label: string; href: string};
  image: {src: string; alt?: string; width: number; height: number};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** Full-bleed closing photograph, with the last invitation centred on it. */
export function ProgramsCloseSection({
  pill,
  heading,
  primary,
  secondary,
  image,
  id,
  padding = 'none',
  className,
}: ProgramsCloseSectionProps) {
  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <div className="relative isolate flex min-h-140 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center text-white md:min-h-174.5">
        <img
          src={image.src}
          alt={image.alt ?? ''}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-night/45 via-night/68 to-night/55"
        />
        <Reveal className="flex flex-col items-center">
          <AvatarPill avatar={pill.avatar} tone="glass" size="md">
            {pill.text}
          </AvatarPill>
          <h2 className="mt-5 max-w-156 text-belief font-light">
            {heading.split('\n').map((line, index) => (
              <span key={line} className="md:block">
                {index > 0 ? <span className="md:hidden"> </span> : null}
                {line}
              </span>
            ))}
          </h2>
          <Button href={primary.href} size="lg" className="mt-5">
            {primary.label}
          </Button>
          <a
            href={secondary.href}
            className="mt-5 text-overview font-medium underline"
          >
            {secondary.label}
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
