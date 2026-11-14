import {AvatarPill, Button, Reveal, Section, type SectionPadding} from '~/ui';

export type HomeCtaSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  primary: {label: string; href: string};
  secondary: {label: string; href: string};
  image: {src: string; alt?: string; width: number; height: number};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** Closing panel: full-width photo card, inset 24px, with centred copy. */
export function HomeCtaSection({
  pill,
  heading,
  primary,
  secondary,
  image,
  id,
  padding = 'none',
  className,
}: HomeCtaSectionProps) {
  return (
    <Section
      id={id}
      padding={padding}
      tone="white"
      className={`px-3 md:px-6 ${className ?? ''}`}
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
          className="absolute inset-0 -z-10 bg-umber/16 bg-radial-[85%_70%_at_50%_56%] from-umber/62 to-umber/0 to-78%"
        />

        <AvatarPill avatar={pill.avatar} tone="glass" size="sm">
          {pill.text}
        </AvatarPill>
        <h2 className="mt-7.25 max-w-142 text-display font-light md:text-display-lg">
          {heading}
        </h2>
        <Button href={primary.href} size="lg" className="mt-9.25">
          {primary.label}
        </Button>
        <a
          href={secondary.href}
          className="mt-5.5 border-b border-white/80 pb-0.5 text-link transition-opacity duration-fast hover:opacity-75"
        >
          {secondary.label}
        </a>
      </Reveal>
    </Section>
  );
}
