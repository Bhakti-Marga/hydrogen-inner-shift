type ArrowBadgeProps = {
  tone?: 'ember' | 'glass';
  className?: string;
};

const toneClasses = {
  ember: 'bg-ember',
  glass: 'bg-white/14',
};

const arrowClasses =
  'absolute inset-0 flex items-center justify-center transition-transform duration-base ease-out-soft motion-reduce:transition-none';

/**
 * Decorative 40px round badge with an up-right arrow, for link cards. On the
 * card's `group` hover or focus the arrow leaves top-right and a copy enters
 * from bottom-left.
 */
export function ArrowBadge({tone = 'ember', className = ''}: ArrowBadgeProps) {
  return (
    <span
      aria-hidden
      className={`relative size-10 shrink-0 overflow-hidden rounded-full text-sm text-white ${toneClasses[tone]} ${className}`}
    >
      <span
        className={`${arrowClasses} group-hover:translate-x-full group-hover:-translate-y-full group-focus-visible:translate-x-full group-focus-visible:-translate-y-full`}
      >
        ↗
      </span>
      <span
        className={`${arrowClasses} -translate-x-full translate-y-full group-hover:translate-0 group-focus-visible:translate-0`}
      >
        ↗
      </span>
    </span>
  );
}
