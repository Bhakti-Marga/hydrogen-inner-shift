import {useEffect, useRef, useState} from 'react';
import {
  AvatarPill,
  Container,
  Reveal,
  ScrollChevrons,
  Section,
  type SectionPadding,
} from '~/ui';

/** Matches `--duration-slow` on the strip, plus a little settle time. */
const STRIP_HOLD_MS = 700;

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
  /** Track shift while the pointer is choosing. `null` recentres fully. */
  const [shift, setShift] = useState<number | null>(null);
  const lastIndex = photos.length - 1;
  const trackRef = useRef<HTMLUListElement>(null);
  const openRef = useRef(openIndex);
  // Opening recentres the row. Ignore enters from that slide until the pointer
  // actually moves on, so one hover doesn't open the photo that lands under it.
  const pointer = useRef({x: -1, y: -1});
  const lockedUntil = useRef(0);
  const pending = useRef<{index: number; x: number; y: number} | null>(null);
  const holdTimer = useRef<number | null>(null);
  const pointerFocus = useRef(false);

  useEffect(() => {
    openRef.current = openIndex;
  }, [openIndex]);

  useEffect(() => {
    const frame = trackRef.current?.parentElement;
    if (!frame) return;
    let width = frame.clientWidth;
    const observer = new ResizeObserver(() => {
      if (frame.clientWidth === width) return;
      width = frame.clientWidth;
      setShift(null);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (holdTimer.current != null) window.clearTimeout(holdTimer.current);
    };
  }, []);

  const place = (index: number, button: HTMLButtonElement, clientX: number) => {
    const panel = button.parentElement;
    const track = panel?.parentElement;
    const next =
      panel instanceof HTMLElement && track instanceof HTMLElement
        ? shiftUnderPointer(index, openRef.current, photos.length, track, panel, clientX)
        : null;
    openRef.current = index;
    setShift(next);
    setOpenIndex(index);
    holdStrip();
  };

  const openFully = (index: number) => {
    pending.current = null;
    setShift(null);
    setOpenIndex(index);
    holdStrip();
  };

  const holdStrip = () => {
    lockedUntil.current = performance.now() + STRIP_HOLD_MS;
    if (holdTimer.current != null) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = null;
      const next = pending.current;
      pending.current = null;
      const button = trackRef.current?.querySelectorAll('button')[next?.index ?? -1];
      if (!next || next.index === openRef.current || !(button instanceof HTMLButtonElement)) {
        return;
      }
      pointer.current = {x: next.x, y: next.y};
      place(next.index, button, next.x);
    }, STRIP_HOLD_MS);
  };

  const revealFromPointer = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const x = Math.round(event.clientX);
    const y = Math.round(event.clientY);
    if (performance.now() < lockedUntil.current) {
      const dx = x - pointer.current.x;
      const dy = y - pointer.current.y;
      if (dx * dx + dy * dy >= 24 * 24) {
        pending.current = {index, x, y};
        pointer.current = {x, y};
      }
      return;
    }
    if (pointer.current.x === x && pointer.current.y === y) return;
    pointer.current = {x, y};
    pending.current = null;
    if (index === openIndex) return;
    place(index, event.currentTarget, event.clientX);
  };

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
              onPrevious={() => openFully(Math.max(openIndex - 1, 0))}
              onNext={() => openFully(Math.min(openIndex + 1, lastIndex))}
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
            ref={trackRef}
            className="strip-track h-(--strip-open) transition-[translate] duration-slow ease-out-soft md:h-strip-height-md"
            style={
              {
                '--strip-index': openIndex,
                '--strip-count': photos.length,
                ...(shift != null ? {'--strip-shift': `${shift}px`} : {}),
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
                  onMouseEnter={(event) => revealFromPointer(index, event)}
                  onMouseDown={() => {
                    pointerFocus.current = true;
                  }}
                  onFocus={() => {
                    if (pointerFocus.current) {
                      pointerFocus.current = false;
                      return;
                    }
                    openFully(index);
                  }}
                  onClick={(event) => {
                    // Hover may already have opened this photo under the pointer.
                    // A click still settles the row the way the arrows do.
                    if (event.detail === 0) return;
                    openFully(index);
                  }}
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

/** Shift closest to centre that keeps `clientX` inside the opening panel. */
function shiftUnderPointer(
  index: number,
  openIndex: number,
  count: number,
  track: HTMLElement,
  panel: HTMLElement,
  clientX: number,
) {
  const frame = track.parentElement;
  if (!frame) return null;
  const root = getComputedStyle(document.documentElement);
  const md = window.matchMedia('(min-width: 768px)').matches;
  const closed = parseFloat(
    root.getPropertyValue(
      md ? '--spacing-strip-closed-md' : '--spacing-strip-closed',
    ),
  );
  const gap = parseFloat(root.getPropertyValue('--spacing-strip-gap'));
  const openMax = parseFloat(root.getPropertyValue('--spacing-strip-open-md'));
  if (![closed, gap, openMax].every(Number.isFinite)) return null;

  const width = frame.clientWidth;
  const step = closed + gap;
  /* Phone keeps one side panel; desktop keeps one on each side of the centre. */
  const open = Math.min(openMax, width - (md ? 2 : 1) * step);
  const delta = open - closed;
  const current = readTrackShift(track);
  const maxShift = Math.max(0, (count - 1) * step + open - width);
  const aiming = md ? index * step + open / 2 - width / 2 : index * step;
  const center = Math.min(maxShift, Math.max(0, aiming));
  const panelRect = panel.getBoundingClientRect();
  // Keep the pointer clearly on the picture, not in the gap past its edge.
  const slack = Math.max(0, panelRect.right - clientX - 12);
  const into = Math.max(0, clientX - panelRect.left);

  // A panel to the right grows into the space the previous one gives up, so
  // its right edge only moves when the track does. The fourth photo is the
  // first whose centre sits far enough left to cross that edge.
  const minShift =
    index > openIndex
      ? Math.max(0, current - delta - into)
      : Math.max(0, current - into);
  const maxShiftKept = Math.min(
    maxShift,
    current + slack + (index > openIndex ? 0 : delta),
  );
  if (minShift > maxShiftKept) return Math.floor(Math.min(Math.max(current, 0), maxShift));
  // Floor so subpixel rounding cannot slide the edge past the pointer.
  return Math.floor(Math.min(maxShiftKept, Math.max(minShift, center)));
}

function readTrackShift(track: HTMLElement) {
  const raw = getComputedStyle(track).translate;
  if (!raw || raw === 'none') return 0;
  const x = parseFloat(raw);
  return Number.isFinite(x) ? -x : 0;
}

