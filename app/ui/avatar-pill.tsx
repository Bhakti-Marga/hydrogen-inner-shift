import {cva, type VariantProps} from 'class-variance-authority';

const pillStyles = cva(
  'inline-flex max-w-full items-center rounded-full',
  {
    variants: {
      /** The surface the pill sits on. */
      tone: {
        dark: 'bg-haze text-white backdrop-blur-lg',
        /** Over photography: translucent white with a hairline ring. */
        glass: 'bg-white/15 text-white ring-1 ring-white/12 ring-inset backdrop-blur-lg',
        cloud: 'bg-cloud text-ink',
        white: 'bg-white text-ink',
        /** On a pale card: a translucent ink wash. */
        soft: 'bg-ink/10 text-ink backdrop-blur-lg',
        /** Day-immersion pill: dusk at 10%, no blur of its own. */
        dusk: 'bg-dusk/10 text-ink',
      },
      /** `--pill-closed` is the min height, so the opening starts as a circle. */
      size: {
        md: 'min-h-15 gap-5 py-1 pr-9 pl-1 text-body [--pill-closed:--spacing(15)]',
        sm: 'min-h-11 gap-2.5 py-1 pr-5 pl-2 text-pill [--pill-closed:--spacing(11)]',
      },
      /** When the pill opens out from its avatar: with the surrounding `<Reveal>`, or on page load. */
      entrance: {
        reveal: 'motion-safe:group-data-[state=run]/reveal:animate-pill-open',
        load: 'motion-safe:animate-pill-open',
      },
    },
    defaultVariants: {tone: 'dark', size: 'md', entrance: 'reveal'},
  },
);

const avatarSizes = {md: 'size-13', sm: 'size-7.5'};

const textEntrance = {
  reveal: 'motion-safe:group-data-[state=run]/reveal:animate-pill-text',
  load: 'motion-safe:animate-pill-text',
};

type AvatarPillProps = VariantProps<typeof pillStyles> & {
  avatar: {src: string; alt?: string};
  children: React.ReactNode;
  /**
   * Below this breakpoint the avatar stays a little inside the capsule on the
   * left, top and bottom. The pill still opens; the photo does not resize.
   */
  flushBelow?: 'md';
  className?: string;
};

/** Round avatar plus a short line of text in a frosted pill. */
export function AvatarPill({
  avatar,
  tone,
  size,
  entrance,
  flushBelow,
  children,
  className,
}: AvatarPillProps) {
  const flush = flushBelow === 'md';

  return (
    <p
      className={pillStyles({
        tone,
        size,
        entrance,
        className: `${flush ? 'max-md:pl-2 max-md:[--pill-closed:calc(--spacing(2)+--spacing(16))]' : ''}${className ? ` ${className}` : ''}`,
      })}
    >
      <img
        src={avatar.src}
        alt={avatar.alt ?? ''}
        width={53}
        height={53}
        className={`shrink-0 rounded-full object-cover ${
          flush ? 'max-md:size-16 md:size-13' : avatarSizes[size ?? 'md']
        }`}
      />
      <span
        className={`font-medium ${textEntrance[entrance ?? 'reveal']}${flush ? ' max-md:min-w-0' : ''}`}
      >
        {children}
      </span>
    </p>
  );
}
