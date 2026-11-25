type ScrollChevronsProps = {
  onPrevious: () => void;
  onNext: () => void;
  canPrevious?: boolean;
  canNext?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  /** `light`: white square, ink chevron. `ember`: ember square, white chevron. */
  tone?: 'light' | 'ember';
  /** Softens the square corners. */
  rounded?: boolean;
  /** Stacks the buttons with up / down chevrons, for vertical reels. */
  vertical?: boolean;
  className?: string;
};

const toneClasses = {
  light: 'bg-white text-abyss focus-visible:outline-white',
  ember: 'bg-ember text-white focus-visible:outline-ember',
};

/** The drawn chevron points left; these turn it to face each way. */
const chevronTurn = {
  left: undefined,
  right: '-scale-x-100',
  up: 'rotate-90',
  down: '-rotate-90',
};

/** Square 40px previous / next buttons for carousels and horizontal scrollers. */
export function ScrollChevrons({
  onPrevious,
  onNext,
  canPrevious = true,
  canNext = true,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  tone = 'light',
  rounded = false,
  vertical = false,
  className = '',
}: ScrollChevronsProps) {
  const toneClass = `${toneClasses[tone]}${rounded ? ' rounded-chevron' : ''}`;
  return (
    <div className={`flex items-center gap-1.25${vertical ? ' flex-col' : ''} ${className}`}>
      <ChevronButton
        label={previousLabel}
        disabled={!canPrevious}
        onClick={onPrevious}
        toneClass={toneClass}
        direction={vertical ? 'up' : 'left'}
      />
      <ChevronButton
        label={nextLabel}
        disabled={!canNext}
        onClick={onNext}
        toneClass={toneClass}
        direction={vertical ? 'down' : 'right'}
      />
    </div>
  );
}

function ChevronButton({
  label,
  disabled,
  onClick,
  toneClass,
  direction,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  toneClass: string;
  direction: keyof typeof chevronTurn;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-10 shrink-0 items-center justify-center transition-opacity duration-fast hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default disabled:opacity-40 ${toneClass}`}
    >
      <svg
        aria-hidden
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className={chevronTurn[direction]}
      >
        <path
          d="M23.5552 12.8894L16.4448 20.0002L23.5552 27.1106"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
