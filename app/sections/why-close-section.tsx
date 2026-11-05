import {AvatarPill, Button, Reveal, Section, type SectionPadding} from '~/ui';

export type WhyCloseSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline breaks the heading from the medium breakpoint up. */
  heading: string;
  cta: {label: string; href: string};
  image: {src: string; width: number; height: number};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** Full-bleed closing colour field, with the last invitation centred on it. */
export function WhyCloseSection({
  pill,
  heading,
  cta,
  image,
  id,
  padding = 'none',
  className,
}: WhyCloseSectionProps) {
  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <div className="relative isolate flex min-h-140 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center text-white md:min-h-174.5">
        <img
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <Reveal className="flex max-w-186.5 flex-col items-center">
          <AvatarPill avatar={pill.avatar} tone="glass">
            {pill.text}
          </AvatarPill>
          <h2 className="mt-8 text-belief font-light">
            {heading.split('\n').map((line, index) => (
              <span key={line} className="md:block">
                {index > 0 ? <span className="md:hidden"> </span> : null}
                {line}
              </span>
            ))}
          </h2>
          <Button href={cta.href} tone="cobalt" size="lg" className="mt-8">
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
