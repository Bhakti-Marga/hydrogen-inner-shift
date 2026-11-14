import {AvatarPill, Button, Reveal, Section, type SectionPadding} from '~/ui';

export type MissionCloseSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  cta: {label: string; href: string};
  email: {label: string; href: string};
  image: {src: string; alt?: string; width: number; height: number};
  padding?: SectionPadding;
  className?: string;
};

/** Closing photograph, inset from the page edges, with the last invitation centred on it. */
export function MissionCloseSection({
  pill,
  heading,
  cta,
  email,
  image,
  padding = 'none',
  className,
}: MissionCloseSectionProps) {
  return (
    <Section
      padding={padding}
      tone="white"
      className={`px-3 md:px-6${className ? ` ${className}` : ''}`}
    >
      <Reveal className="relative isolate flex min-h-140 flex-col items-center justify-center overflow-hidden rounded-panel px-6 py-20 text-center text-white md:min-h-180">
        <img
          src={image.src}
          alt={image.alt ?? ''}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover motion-safe:group-data-[state=run]/reveal:animate-settle"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-night/16 bg-radial-[85%_70%_at_50%_56%] from-night/62 to-night/0 to-78%"
        />

        <AvatarPill avatar={pill.avatar} tone="glass" size="sm">
          {pill.text}
        </AvatarPill>
        <h2 className="mt-7.25 max-w-142 text-display font-light md:text-display-lg">
          {heading}
        </h2>
        <Button href={cta.href} size="lg" className="mt-9.25">
          {cta.label}
        </Button>
        <a href={email.href} className="mt-5.5 text-link text-white/85">
          {email.label}
        </a>
      </Reveal>
    </Section>
  );
}
