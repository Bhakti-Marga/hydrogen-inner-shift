import {useState} from 'react';
import {
  Container,
  Reveal,
  Section,
  VideoModal,
  type SectionPadding,
  type VideoModalVideo,
} from '~/ui';

export type ResultsTestimonial = {
  name: string;
  quote: string;
  attribution: string;
  /** Clock time shown on the card, e.g. "0:47". */
  duration: string;
  image: {src: string; width: number; height: number};
  video: VideoModalVideo;
};

export type ResultsTestimonialsSectionProps = {
  heading: string;
  intro: string;
  testimonials: ResultsTestimonial[];
  padding?: SectionPadding;
  className?: string;
};

/** Six landscape reviews, each opening the horizontal film. */
export function ResultsTestimonialsSection({
  heading,
  intro,
  testimonials,
  padding = 'none',
  className,
}: ResultsTestimonialsSectionProps) {
  const [video, setVideo] = useState<VideoModalVideo>(testimonials[0].video);
  const [open, setOpen] = useState(false);

  return (
    <Section
      padding={padding}
      tone="abyss"
      className={`pt-16 md:pt-28${className ? ` ${className}` : ''}`}
    >
      <Container size="narrow">
        <Reveal className="flex max-w-xl flex-col gap-4">
          <h2 className="text-sources font-light md:text-sources-md">{heading}</h2>
          <p className="text-note text-white/55">{intro}</p>
        </Reveal>

        <ul className="mt-10 grid gap-x-6.5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.name}>
              <Reveal as="article" order={index % 3} className="flex flex-col">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Watch ${testimonial.name}’s testimonial`}
                  onClick={() => {
                    setVideo(testimonial.video);
                    setOpen(true);
                  }}
                  className="group relative isolate aspect-[404/252.5] w-full overflow-hidden rounded-media focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <img
                    src={testimonial.image.src}
                    alt=""
                    width={testimonial.image.width}
                    height={testimonial.image.height}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-slow ease-out-soft group-hover:scale-103 motion-reduce:transition-none motion-safe:group-data-[state=run]/reveal:animate-settle"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-5 left-5 flex size-13.5 items-center justify-center rounded-full bg-white/94 shadow-float"
                  >
                    <span className="ml-0.5 border-y-8 border-l-13 border-y-transparent border-l-ink" />
                  </span>
                  <span className="absolute right-4 bottom-5 flex h-8 items-center rounded-full bg-abyss/55 px-3.5 text-fine font-medium backdrop-blur-md">
                    {testimonial.duration}
                  </span>
                </button>
                <blockquote className="mt-6 text-question-md font-medium">
                  {testimonial.quote}
                </blockquote>
                <p className="mt-3.5 text-caption text-white/55">
                  {testimonial.attribution}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      <VideoModal open={open} onClose={() => setOpen(false)} {...video} />
    </Section>
  );
}
