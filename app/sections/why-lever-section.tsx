import {Reveal, Section, type SectionPadding} from '~/ui';

type LeverPhoto = {src: string; alt: string; width: number; height: number};

export type WhyLeverSectionProps = {
  /** Opening sentence, in full ink. */
  lead: string;
  /** Middle of the line, in muted ink. */
  muted: string;
  /** Closing sentence, in full ink. */
  emphasis: string;
  /**
   * Portrait photos, left to right. The row is centered on the middle one,
   * so the centre three stay put and the outer photos clip as the window
   * narrows. The lean is applied here; the files themselves are flat crops.
   */
  photos: LeverPhoto[];
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** Degrees each photo leans away from the upright centre. */
const FAN_STEP = 3.5;

/** A centred line, then a fanned row of portraits that bleeds off the edges. */
export function WhyLeverSection({
  lead,
  muted,
  emphasis,
  photos,
  id,
  padding = 'roomy',
  className,
}: WhyLeverSectionProps) {
  const center = (photos.length - 1) / 2;

  return (
    <Section id={id} padding={padding} tone="light" className={className}>
      <Reveal className="mx-auto flex w-full max-w-204 flex-col items-center px-6 text-center">
        <h2 className="text-belief">
          <span>{lead} </span>
          <span className="text-ink/40">{muted} </span>
          <span>{emphasis}</span>
        </h2>
      </Reveal>

      <div className="@container mt-14 flex justify-center overflow-hidden py-8 md:mt-16">
        <ul className="fan-fit flex shrink-0 items-end gap-3.5">
          {photos.map((photo, index) => (
            <li
              key={photo.src}
              className="w-49 origin-bottom"
              style={{transform: `rotate(${(index - center) * FAN_STEP}deg)`}}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="aspect-2/3 w-full rounded-tile object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
