type WordmarkProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** `md`: header logo (18px). `sm`: footer (11px, semibold). */
  size?: 'md' | 'sm';
};

const sizeClasses = {
  md: 'text-wordmark font-normal',
  sm: 'text-wordmark-sm font-semibold',
};

/**
 * INNER SHIFT text wordmark.
 *
 * Letter-spacing is also applied after the last glyph, so the trailing
 * tracking is pulled back with a negative end margin to keep the visible
 * word flush with its container edges.
 */
export function Wordmark({
  size = 'md',
  className = '',
  ...rest
}: WordmarkProps) {
  return (
    <span
      className={`inline-block font-inter uppercase tracking-wordmark me-[calc(-1*var(--tracking-wordmark))] ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      Inner Shift
    </span>
  );
}
