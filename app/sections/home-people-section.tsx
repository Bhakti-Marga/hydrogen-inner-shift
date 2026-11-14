import {useState} from 'react';
import {
  Button,
  Container,
  Reveal,
  Section,
  VideoModal,
  type SectionPadding,
  type VideoModalVideo,
} from '~/ui';

export type HomePeopleSectionProps = {
  heading: string;
  /** Names set in medium weight and underlined at the start of the intro. */
  people: string[];
  /** Continuation after the names, e.g. "bring decades of…". */
  intro: string;
  cta: {label: string; href: string};
  /** Film card: poster image, caption and the film it plays. */
  film: {
    image: {src: string; alt?: string; width: number; height: number};
    label: string;
    video: VideoModalVideo;
  };
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

export function HomePeopleSection({
  heading,
  people,
  intro,
  cta,
  film,
  id,
  padding = 'default',
  className,
}: HomePeopleSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <Container
        size="narrow"
        className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-17"
      >
        <Reveal className="w-full lg:flex-1">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-label={film.label}
            onClick={() => setOpen(true)}
            className="group relative isolate flex aspect-[839/480] w-full items-center justify-center overflow-hidden rounded-media focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <img
              src={film.image.src}
              alt={film.image.alt ?? ''}
              width={film.image.width}
              height={film.image.height}
              loading="lazy"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-slow ease-out-soft group-hover:scale-103 motion-reduce:transition-none motion-safe:group-data-[state=run]/reveal:animate-settle"
            />
            <span
              aria-hidden
              className="flex size-16 items-center justify-center rounded-full bg-white/92 shadow-float transition-transform duration-base ease-out-soft group-hover:scale-108 motion-reduce:transition-none md:size-22"
            >
              <span className="ml-1 border-y-9 border-l-15 border-y-transparent border-l-ink md:ml-1.25 md:border-y-12 md:border-l-20" />
            </span>
            <span
              aria-hidden
              className="absolute bottom-6 left-5 text-pill font-medium text-white md:bottom-6.5 md:left-7"
            >
              {film.label}
            </span>
          </button>
        </Reveal>

        <Reveal
          order={1}
          className="flex flex-col items-start gap-10 lg:w-86 lg:shrink-0"
        >
          <div className="flex flex-col gap-6 font-light">
            <h2 className="text-headline md:text-headline-md">{heading}</h2>
            <p className="text-body-lg text-ink/72">
              {people.map((name, index) => (
                <span key={name}>
                  {index > 0 ? ' and ' : null}
                  <span className="font-medium text-ink underline decoration-from-font underline-offset-2">
                    {name}
                  </span>
                </span>
              ))}{' '}
              {intro}
            </p>
          </div>
          <Button href={cta.href}>{cta.label}</Button>
        </Reveal>
      </Container>

      <VideoModal open={open} onClose={() => setOpen(false)} {...film.video} />
    </Section>
  );
}
