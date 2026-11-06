type HeroMobileBandProps = {
  src: string;
  width: number;
  height: number;
  /** Colour the photograph fades into. Matches the hero surface under the band. */
  tone?: 'abyss' | 'night';
  /** Marks the photograph as the first thing to paint. */
  priority?: boolean;
};

const BAND_FADE = {
  abyss: {
    top: 'bg-linear-to-b from-abyss to-transparent',
    bottom: 'bg-linear-to-b from-transparent from-[29.9%] to-abyss',
  },
  night: {
    top: 'bg-linear-to-b from-night to-transparent',
    bottom: 'bg-linear-to-b from-transparent from-[29.9%] to-night',
  },
} as const;

/**
 * Landscape photograph across the top of a hero on small screens. It fades
 * into the hero colour so the copy sits on a solid field. Hidden from `md` up,
 * where the hero uses its own full-bleed image or film.
 */
export function HeroMobileBand({
  src,
  width,
  height,
  tone = 'abyss',
  priority = false,
}: HeroMobileBandProps) {
  const fade = BAND_FADE[tone];

  return (
    <div aria-hidden className="absolute inset-x-0 top-0 -z-20 h-56 md:hidden">
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        fetchPriority={priority ? 'high' : undefined}
        className="size-full object-cover"
      />
      <div className={`absolute inset-0 ${fade.top}`} />
      <div className={`absolute inset-0 ${fade.bottom}`} />
    </div>
  );
}

/** Hero CTAs. Equal full-width buttons on small screens, a row from `md` up. */
export function HeroActions({children}: {children: React.ReactNode}) {
  return (
    <div className="flex w-full flex-col gap-4 motion-safe:animate-rise motion-safe:[animation-delay:var(--duration-slow)] md:w-auto md:flex-row md:flex-wrap md:gap-2 max-md:[&>a]:w-full max-md:[&>button]:w-full">
      {children}
    </div>
  );
}
