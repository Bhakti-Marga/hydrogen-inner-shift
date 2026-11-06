import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Reveal, Section, type SectionPadding} from '~/ui';

type QuoteTone = 'ghost' | 'glass' | 'solid' | 'dim';

export type AboutQuote = {
  id: string;
  quote: string;
  cite: string;
};

export type AboutQuotesSectionProps = {
  /** Wraps inside a narrow column over the photograph. */
  heading: string;
  image: {src: string; width: number; height: number};
  quotes: AboutQuote[];
  padding?: SectionPadding;
  className?: string;
};

/** How far a review can sit from the highlighted one before it fades out. */
const NEIGHBOURS = 2;
/** Movement before a press becomes a drag, so a click still highlights a card. */
const DRAG_THRESHOLD = 8;

/** Loop an index so the reel has no first or last position. */
function wrapIndex(index: number, count: number) {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

/** Shortest signed distance around the loop. Negative means the card sits above. */
function signedOffset(index: number, active: number, count: number) {
  if (count === 0) return 0;
  let delta = index - active;
  const half = count / 2;
  if (delta > half) delta -= count;
  if (delta < -half) delta += count;
  return delta;
}

function toneFor(offset: number): QuoteTone {
  if (offset === 0) return 'solid';
  if (offset === -1) return 'glass';
  if (offset === 1) return 'dim';
  return 'ghost';
}

function readTranslate(track: HTMLElement) {
  const match = /(-?[\d.]+)px\s*$/.exec(track.style.translate);
  return match ? Number(match[1]) : 0;
}

/** Translate that puts `item` in the vertical centre of `frame`. */
function centeredTranslate(frame: HTMLElement, track: HTMLElement, item: HTMLElement) {
  const frameRect = frame.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const delta = itemRect.top + itemRect.height / 2 - (frameRect.top + frameRect.height / 2);
  return readTranslate(track) - delta;
}

function slotElement(track: HTMLElement, slot: number) {
  return track.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
}

function nearestSlot(frame: HTMLElement, track: HTMLElement) {
  const mid = frame.getBoundingClientRect().top + frame.clientHeight / 2;
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  track.querySelectorAll<HTMLElement>('[data-slot]').forEach((item) => {
    const rect = item.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - mid);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = Number(item.dataset.slot);
    }
  });
  return best;
}

function applyTranslate(track: HTMLElement, y: number, animate: boolean) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!animate || reduce) {
    track.style.transition = 'none';
    track.style.translate = `0 ${y}px`;
    return;
  }
  // Commit the dragged position, then ease to the next one.
  track.style.transition = '';
  void track.offsetHeight;
  track.style.translate = `0 ${y}px`;
}

/**
 * A hillside photograph with a heading and a looping reel of reviews.
 * The centred review is solid; neighbours fade toward the edges.
 * Drag the stack or click a card. The page scroll is left alone.
 */
export function AboutQuotesSection({
  heading,
  image,
  quotes,
  padding = 'none',
  className,
}: AboutQuotesSectionProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef(0);
  const suppressClick = useRef(false);
  const [active, setActive] = useState(0);
  activeRef.current = active;
  const count = quotes.length;

  const focusSlot = (slot: number, animate: boolean) => {
    const frame = frameRef.current;
    const track = trackRef.current;
    const item = track ? slotElement(track, slot) : null;
    const index = wrapIndex(slot, count);
    activeRef.current = index;
    setActive(index);
    if (!frame || !track || !item) return;
    applyTranslate(track, centeredTranslate(frame, track, item), animate);
  };

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track || count === 0) return;
    const item = slotElement(track, count + activeRef.current);
    if (!item) return;
    applyTranslate(track, centeredTranslate(frame, track, item), false);
  }, [count]);

  useEffect(() => {
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!frame || !track || count < 2) return;

    const recenterClone = () => {
      const slot = nearestSlot(frame, track);
      if (slot >= count && slot < count * 2) return;
      const item = slotElement(track, count + wrapIndex(slot, count));
      if (!item) return;
      applyTranslate(track, centeredTranslate(frame, track, item), false);
    };

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'translate' || event.target !== track) return;
      recenterClone();
    };

    let drag: {id: number; startY: number; origin: number; moved: boolean} | null = null;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.button !== 0) return;
      drag = {id: event.pointerId, startY: event.clientY, origin: readTranslate(track), moved: false};
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const delta = event.clientY - drag.startY;
      if (!drag.moved) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return;
        drag.moved = true;
        frame.setPointerCapture(event.pointerId);
      }
      applyTranslate(track, drag.origin + delta, false);
      const index = wrapIndex(nearestSlot(frame, track), count);
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const moved = drag.moved;
      drag = null;
      if (!moved) return;
      // Swallow only the click that follows this drag. A captured pointer may
      // never emit that click, so clear the flag on the next turn either way.
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
      const slot = nearestSlot(frame, track);
      const index = wrapIndex(slot, count);
      const item = slotElement(track, slot);
      activeRef.current = index;
      setActive(index);
      if (!item) return;
      applyTranslate(track, centeredTranslate(frame, track, item), true);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const step =
        event.key === 'ArrowDown' || event.key === 'ArrowRight'
          ? 1
          : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
            ? -1
            : 0;
      if (!step || !(event.target instanceof Node) || !frame.contains(event.target)) return;
      event.preventDefault();
      const index = wrapIndex(activeRef.current + step, count);
      const item = slotElement(track, count + index);
      activeRef.current = index;
      setActive(index);
      if (!item) return;
      applyTranslate(track, centeredTranslate(frame, track, item), true);
    };

    const onResize = () => {
      const item = slotElement(track, count + activeRef.current);
      if (!item || drag) return;
      applyTranslate(track, centeredTranslate(frame, track, item), false);
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(frame);
    frame.addEventListener('pointerdown', onPointerDown);
    frame.addEventListener('pointermove', onPointerMove);
    frame.addEventListener('pointerup', onPointerUp);
    frame.addEventListener('pointercancel', onPointerUp);
    frame.addEventListener('keydown', onKeyDown);
    track.addEventListener('transitionend', onTransitionEnd);
    return () => {
      observer.disconnect();
      frame.removeEventListener('pointerdown', onPointerDown);
      frame.removeEventListener('pointermove', onPointerMove);
      frame.removeEventListener('pointerup', onPointerUp);
      frame.removeEventListener('pointercancel', onPointerUp);
      frame.removeEventListener('keydown', onKeyDown);
      track.removeEventListener('transitionend', onTransitionEnd);
    };
  }, [count]);

  const current = quotes[active];

  return (
    <Section
      padding={padding}
      tone="white"
      className={`px-2 pt-10 md:px-3 md:pt-16${className ? ` ${className}` : ''}`}
    >
      <div className="relative overflow-hidden rounded-media">
        <img
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative grid gap-8 px-5 py-10 md:px-10 lg:min-h-200 lg:grid-cols-[20rem_minmax(0,29rem)_1fr] lg:items-start lg:gap-x-24 lg:px-20 lg:py-0">
          <Reveal>
            <h2 className="max-w-80 text-statement font-normal text-white lg:mt-20 lg:max-w-none lg:text-statement-md">
              {heading}
            </h2>
          </Reveal>
          <div
            ref={frameRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Reviews"
            className="h-128 min-h-0 min-w-0 touch-pan-y cursor-grab select-none overflow-hidden lg:h-200"
          >
            {current ? (
              <p className="sr-only" aria-live="polite">
                {`${current.quote} ${current.cite}. Review ${active + 1} of ${count}.`}
              </p>
            ) : null}
            <ul
              ref={trackRef}
              className="flex flex-col gap-4 motion-safe:transition-[translate] motion-safe:duration-slow motion-safe:ease-out-soft lg:gap-5"
            >
              {[0, 1, 2].map((copy) =>
                quotes.map((quote, index) => {
                  const slot = copy * count + index;
                  return (
                    <li key={`${copy}-${quote.id}`} data-slot={slot} className="w-full">
                      <QuoteCard
                        quote={quote}
                        tone={toneFor(signedOffset(index, active, count))}
                        current={copy === 1 && index === active}
                        tabIndex={copy === 1 ? undefined : -1}
                        onClick={() => {
                          if (suppressClick.current) {
                            suppressClick.current = false;
                            return;
                          }
                          focusSlot(slot, true);
                        }}
                      />
                    </li>
                  );
                }),
              )}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

const cardText = {
  solid: 'text-pine',
  glass: 'text-white',
  dim: 'text-white/55',
  ghost: 'text-white/10',
};

const dotSurface = {
  solid: 'bg-ember',
  glass: 'bg-white',
  dim: 'bg-white/55',
  ghost: 'bg-white/10',
};

function QuoteCard({
  quote,
  tone,
  current,
  tabIndex,
  onClick,
}: {
  quote: AboutQuote;
  tone: QuoteTone;
  current: boolean;
  tabIndex?: number;
  onClick: () => void;
}) {
  const faint = tone === 'dim' || tone === 'ghost';

  return (
    <button
      type="button"
      tabIndex={tabIndex}
      aria-current={current ? 'true' : undefined}
      onClick={onClick}
      className={`relative flex w-full cursor-grab items-start gap-9 rounded-media px-6 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember ${cardText[tone]}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-media bg-white shadow-card motion-safe:transition-opacity motion-safe:duration-slow motion-safe:ease-out-soft ${
          tone === 'solid' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <span
        aria-hidden
        className={`absolute inset-0 rounded-media bg-white/10 shadow-card motion-safe:transition-opacity motion-safe:duration-slow motion-safe:ease-out-soft ${
          tone === 'glass' ? 'opacity-100 backdrop-blur-md' : faint ? 'opacity-10' : 'opacity-0'
        }`}
      />
      <span aria-hidden className={`relative mt-1 size-3 shrink-0 rounded-full ${dotSurface[tone]}`} />
      <span className="relative flex min-w-0 flex-col gap-4">
        <span className="text-whisper">{quote.quote}</span>
        <span className="text-cite">{quote.cite}</span>
      </span>
    </button>
  );
}
