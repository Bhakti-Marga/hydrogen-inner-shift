import {useState} from 'react';
import {
  AvatarPill,
  Container,
  Reveal,
  ScrollChevrons,
  Section,
  type SectionPadding,
} from '~/ui';

export type HomeNaturePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Horizontal focal point (0–100%) kept in view while the panel is narrow. */
  focusX?: number;
};

export type HomeNatureSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  statement: {
    /** Opening sentence in full ink. */
    lead: string;
    /** Continuation in muted ink. */
    text: string;
  };
  /** Strip panels; exactly one is open at a time. */
  photos: HomeNaturePhoto[];
  /** Index of the panel open on load. */
  initialIndex?: number;
  previousLabel?: string;
  nextLabel?: string;
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

export function HomeNatureSection({
  pill,
  statement,
  photos,
  initialIndex = 1,
  previousLabel = 'Previous photo',
  nextLabel = 'Next photo',
  id,
  padding = 'default',
  className,
}: HomeNatureSectionProps) {
  const [openIndex, setOpenIndex] = useState(initialIndex);
  const lastIndex = photos.length - 1;

  return (
    <Section id={id} padding={padding} tone="light" className={className}>
      <Container size="narrow" className="flex flex-col">
        <Reveal className="flex flex-col">
          <AvatarPill avatar={pill.avatar} tone="white" className="self-start">
            {pill.text}
          </AvatarPill>

          <div className="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 className="max-w-253 text-intro md:text-intro-md">
              <span className="font-semibold">{statement.lead}</span>{' '}
              <span className="font-light text-ink/40">{statement.text}</span>
            </h2>
            <ScrollChevrons
              tone="ember"
              onPrevious={() => setOpenIndex((index) => Math.max(index - 1, 0))}
              onNext={() =>
                setOpenIndex((index) => Math.min(index + 1, lastIndex))
              }
              canPrevious={openIndex > 0}
              canNext={openIndex < lastIndex}
              previousLabel={previousLabel}
              nextLabel={nextLabel}
              className="self-end"
            />
          </div>
        </Reveal>

        <Reveal order={1} className="@container mt-10 overflow-hidden md:mt-16">
          <ul
            className="strip-track h-strip-height transition-[translate] duration-slow ease-out-soft md:h-strip-height-md"
            style={
              {
                '--strip-index': openIndex,
                '--strip-count': photos.length,
              } as React.CSSProperties
            }
          >
            {photos.map((photo, index) => (
              <li
                key={photo.src}
                className={`shrink-0 transition-[width] duration-slow ease-out-soft ${
                  index === openIndex
                    ? 'w-(--strip-open)'
                    : 'w-(--strip-closed)'
                }`}
              >
                <button
                  type="button"
                  aria-label={photo.alt}
                  aria-pressed={index === openIndex}
                  onClick={() => setOpenIndex(index)}
                  className="block size-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ember"
                >
                  <img
                    src={photo.src}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    style={{objectPosition: `${photo.focusX ?? 50}% 50%`}}
                    className="size-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
