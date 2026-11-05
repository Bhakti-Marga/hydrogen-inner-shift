import {AvatarPill, Container, Reveal, Section, type SectionPadding} from '~/ui';

type Photo = {src: string; alt: string; width: number; height: number};

type Step = {
  title: string;
  text: string;
  image: Photo;
};

export type AboutTogetherSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  steps: [Step, Step, Step];
  padding?: SectionPadding;
  className?: string;
};

/**
 * Three photographs in a row: structure, then depth, then the change that
 * holds. A cobalt disc sits on each seam.
 */
export function AboutTogetherSection({
  pill,
  heading,
  steps,
  padding = 'none',
  className,
}: AboutTogetherSectionProps) {
  return (
    <Section padding={padding} tone="white" className={className}>
      <Container className="flex flex-col items-center pt-16 pb-16 md:pt-24 md:pb-24">
        <Reveal>
          <AvatarPill avatar={pill.avatar} tone="cloud">
            {pill.text}
          </AvatarPill>
        </Reveal>
        <Reveal order={1}>
          <h2 className="mt-6 text-center text-program font-normal text-pine">{heading}</h2>
        </Reveal>

        <ul className="relative mt-10 grid w-full gap-1.5 lg:mt-12 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} as="li" order={index} className="bg-cloud">
              <img
                src={step.image.src}
                alt={step.image.alt}
                width={step.image.width}
                height={step.image.height}
                loading="lazy"
                className="aspect-[455/300] w-full object-cover motion-safe:group-data-[state=run]/reveal:animate-settle"
              />
              <div className="relative px-8 py-8 md:px-9">
                {index < 2 ? <SeamMark>{index === 0 ? '+' : '→'}</SeamMark> : null}
                <h3 className="text-program font-normal text-pine">{step.title}</h3>
                <p className="mt-2 text-support text-pine">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Cobalt disc centred on the gap, level with the card title. */
function SeamMark({children}: {children: string}) {
  return (
    <span
      aria-hidden
      className="absolute top-4.5 right-0 z-10 hidden size-15 translate-x-[calc(50%+0.1875rem)] items-center justify-center rounded-full bg-cobalt text-white lg:flex"
    >
      <span
        className={`font-times text-taster-md leading-none font-bold tracking-normal${children === '→' ? ' -translate-y-0.5' : ''}`}
      >
        {children}
      </span>
    </span>
  );
}
