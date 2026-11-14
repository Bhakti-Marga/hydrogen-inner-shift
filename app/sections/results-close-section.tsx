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

export type ResultsCloseSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** A newline breaks the heading. */
  heading: string;
  primary: {label: string; href: string};
  filmLabel: string;
  film: VideoModalVideo;
  padding?: SectionPadding;
  className?: string;
};

/** Last invitation on the dark field: one line, then the film. */
export function ResultsCloseSection({
  pill,
  heading,
  primary,
  filmLabel,
  film,
  padding = 'roomy',
  className,
}: ResultsCloseSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Section padding={padding} tone="abyss" className={className}>
      <Reveal className="mx-auto flex max-w-186 flex-col items-center px-6 text-center">
        <AvatarPill avatar={pill.avatar} tone="glass">
          {pill.text}
        </AvatarPill>
        <h2 className="mt-5 text-belief font-light">
          {heading.split('\n').map((line, index) => (
            <span key={line} className="md:block">
              {index > 0 ? <span className="md:hidden"> </span> : null}
              {line}
            </span>
          ))}
        </h2>
        <Button href={primary.href} size="lg" className="mt-5 min-w-84">
          {primary.label}
        </Button>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="mt-5 text-overview underline transition-opacity duration-fast hover:opacity-75"
        >
          {filmLabel}
        </button>
      </Reveal>

      <VideoModal open={open} onClose={() => setOpen(false)} {...film} />
    </Section>
  );
}
