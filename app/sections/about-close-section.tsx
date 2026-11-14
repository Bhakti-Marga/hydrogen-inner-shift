import {useState} from 'react';
import {
  AvatarPill,
  Button,
  Reveal,
  Section,
  VideoModal,
  type SectionPadding,
  type VideoModalVideo,
} from '~/ui';

export type AboutCloseSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline breaks the heading from the medium breakpoint up. */
  heading: string;
  cta: {label: string; href: string};
  filmLabel: string;
  film: VideoModalVideo;
  image: {src: string; width: number; height: number};
  padding?: SectionPadding;
  className?: string;
};

/** Full-bleed closing colour field, with the last invitation centred on it. */
export function AboutCloseSection({
  pill,
  heading,
  cta,
  filmLabel,
  film,
  image,
  padding = 'none',
  className,
}: AboutCloseSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Section padding={padding} tone="white" className={className}>
      <div className="relative isolate flex min-h-140 flex-col items-center justify-center overflow-hidden px-6 py-20 text-center text-white md:min-h-174.5">
        <img
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <Reveal className="flex flex-col items-center">
          <AvatarPill avatar={pill.avatar} tone="glass" size="md">
            {pill.text}
          </AvatarPill>
          <h2 className="mt-6 max-w-186 text-belief font-light">
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 text-overview underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {filmLabel}
          </button>
        </Reveal>
      </div>
      <VideoModal open={open} onClose={() => setOpen(false)} {...film} />
    </Section>
  );
}
