import {useState} from 'react';
import {
  Container,
  Eyebrow,
  Reveal,
  Section,
  VideoModal,
  type SectionPadding,
  type VideoModalVideo,
} from '~/ui';

export type HomeTestimonial = {
  name: string;
  video: VideoModalVideo;
};

export type HomeTestimonialsSectionProps = {
  quote: string;
  attribution: string;
  /** Featured film behind the image card. */
  feature: {
    image: {src: string; width: number; height: number};
    label: string;
    video: VideoModalVideo;
  };
  listLabel: string;
  /** Hover label before each name, e.g. "Watch:". */
  watchLabel: string;
  testimonials: HomeTestimonial[];
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

export function HomeTestimonialsSection({
  quote,
  attribution,
  feature,
  listLabel,
  watchLabel,
  testimonials,
  id,
  padding = 'roomy-bottom',
  className,
}: HomeTestimonialsSectionProps) {
  const [video, setVideo] = useState<VideoModalVideo>(feature.video);
  const [open, setOpen] = useState(false);

  const play = (next: VideoModalVideo) => {
    setVideo(next);
    setOpen(true);
  };

  return (
    <Section
      id={id}
      padding={padding}
      tone="white"
      className={['max-md:-mt-px', className].filter(Boolean).join(' ')}
    >
      <Container size="narrow" className="flex flex-col gap-6">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-18.5">
          <figure className="flex max-w-173.5 flex-col gap-6 text-center md:text-left">
            <blockquote className="text-testimonial font-light md:text-testimonial-md">
              {quote}
            </blockquote>
            <figcaption className="text-attribution text-ink/55">
              {attribution}
            </figcaption>
          </figure>

          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => play(feature.video)}
            className="group relative isolate order-first -mx-6 flex aspect-[393/332] w-[calc(100%+48px)] shrink-0 items-center justify-center overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:order-none md:mx-0 md:aspect-[497/460] md:w-full md:rounded-media lg:w-124"
          >
            <img
              src={feature.image.src}
              alt=""
              width={feature.image.width}
              height={feature.image.height}
              loading="lazy"
              className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-slow ease-out-soft group-hover:scale-103 motion-reduce:transition-none"
            />
            <span className="flex h-11.25 items-center gap-2.5 rounded-full bg-white/16 px-6 text-pill font-medium text-white ring-1 ring-white/20 backdrop-blur-md transition-colors duration-fast ring-inset group-hover:bg-white/25">
              <span aria-hidden className="text-glyph">
                ▶
              </span>
              {feature.label}
            </span>
          </button>
        </Reveal>

        <Reveal
          order={1}
          className="flex flex-col items-center gap-6 border-t border-ink/9 pt-8 md:flex-row md:items-center md:pt-9"
        >
          <Eyebrow
            tone="ember"
            className="shrink-0 text-center font-semibold md:text-left md:font-medium md:text-ink"
          >
            {listLabel}
          </Eyebrow>
          <ul className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:flex-wrap">
            {testimonials.map((testimonial) => (
              <li key={testimonial.name}>
                <WatchPill
                  name={testimonial.name}
                  watchLabel={watchLabel}
                  onClick={() => play(testimonial.video)}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <VideoModal open={open} onClose={() => setOpen(false)} {...video} />
    </Section>
  );
}

/**
 * Grey name pill that turns ember on hover or focus and grows to the left of
 * the name with "▶ WATCH:", animating its width via a 0fr → 1fr grid column.
 */
function WatchPill({
  name,
  watchLabel,
  onClick,
}: {
  name: string;
  watchLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={`${watchLabel} ${name}`}
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-cloud px-5.5 py-4 text-body font-medium whitespace-nowrap text-ink/60 transition-colors duration-base ease-out-soft hover:bg-ember hover:text-white focus-visible:bg-ember focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember motion-reduce:transition-none md:w-auto md:justify-start md:gap-0 md:py-3.25 md:text-pill"
    >
      <span aria-hidden className="text-glyph text-ember group-hover:text-white group-focus-visible:text-white md:hidden">
        ▶
      </span>
      <span
        aria-hidden
        className="hidden grid-cols-[0fr] transition-[grid-template-columns] duration-base ease-out-soft group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] motion-reduce:transition-none md:grid"
      >
        <span className="flex items-center overflow-hidden">
          <span className="text-glyph">▶</span>
          <span className="pl-2.5 uppercase">{watchLabel}</span>
          <span className="w-1 shrink-0" />
        </span>
      </span>
      {name}
    </button>
  );
}
