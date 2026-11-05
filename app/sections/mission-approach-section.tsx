import {Reveal, Section, type SectionPadding} from '~/ui';

type ApproachImage = {src: string; alt: string; width: number; height: number};

export type MissionApproachSectionProps = {
  image: ApproachImage;
  label: string;
  /** Centred on the blue card over the photograph. */
  statement: string;
  /** The small struck-through question above the real one. */
  dismissed: string;
  question: string;
  text: string;
  padding?: SectionPadding;
  className?: string;
};

/**
 * Lake photograph with the approach card over it, and the question the work
 * actually asks, on the pale field beside the photo.
 */
export function MissionApproachSection({
  image,
  label,
  statement,
  dismissed,
  question,
  text,
  padding = 'none',
  className,
}: MissionApproachSectionProps) {
  return (
    <Section
      padding={padding}
      tone="white"
      className={`px-4 md:px-8 lg:px-10${className ? ` ${className}` : ''}`}
    >
      <div className="bg-haze lg:grid lg:grid-cols-[801fr_579fr]">
        <div className="relative aspect-[801/671]">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute top-[12%] right-6 bottom-[12%] left-6 flex flex-col bg-cobalt px-6 py-8 text-center text-white md:right-auto md:left-[32%] md:h-[74%] md:w-[36%]">
            <p className="text-eyebrow font-medium text-white uppercase">{label}</p>
            <p className="flex flex-1 items-center justify-center text-approach font-semibold md:text-approach-md">
              {statement}
            </p>
          </div>
        </div>

        <Reveal className="flex flex-col items-center justify-center gap-6 px-6 py-14 text-center md:px-12 md:py-20">
          <p className="relative text-aside text-ink/42 italic">
            {dismissed}
            <span
              aria-hidden
              className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 -rotate-2 bg-ink/40"
            />
          </p>
          <h2 className="text-being font-medium text-ink md:text-being-md">{question}</h2>
          <p className="max-w-88 text-water font-light text-pine md:text-water-md">{text}</p>
        </Reveal>
      </div>
    </Section>
  );
}
