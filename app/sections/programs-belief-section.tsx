import {AvatarPill, Reveal, Section, type SectionPadding} from '~/ui';

type BeliefImage = {src: string; alt?: string; width: number; height: number};

export type ProgramsBeliefSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  /** Opening sentence, in full ink. */
  lead: string;
  /** Continuation, in muted ink. */
  text: string;
  /**
   * Portrait photos, left to right. The row is centered on the middle one,
   * so the centre three stay put and the outer photos clip as the window
   * narrows. The lean is applied here; the files themselves are flat crops.
   */
  photos: BeliefImage[];
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/** Degrees each photo leans away from the upright centre. */
const FAN_STEP = 3.5;

/** A centred line, then a fanned row of portraits that bleeds off the edges. */
export function ProgramsBeliefSection({
  pill,
  lead,
  text,
  photos,
  id,
  padding = 'roomy',
  className,
}: ProgramsBeliefSectionProps) {
  const center = (photos.length - 1) / 2;

  return (
    <Section id={id} padding={padding} tone="glacier" className={className}>
      <Reveal className="mx-auto flex w-full max-w-172 flex-col items-center text-center">
        <AvatarPill avatar={pill.avatar} tone="white">
          {pill.text}
        </AvatarPill>
        <h2 className="mt-10 text-belief">
          <span>{lead} </span>
          <span className="text-ink/40">{text}</span>
        </h2>
      </Reveal>

      <div className="mt-14 flex justify-center overflow-hidden py-8 md:mt-16">
        <ul className="flex shrink-0 items-end gap-3.5">
          {photos.map((photo, index) => (
            <li
              key={photo.src}
              className="w-49 origin-bottom"
              style={{transform: `rotate(${(index - center) * FAN_STEP}deg)`}}
            >
              <img
                src={photo.src}
                alt={photo.alt ?? ''}
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
