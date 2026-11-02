type WordmarkProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * INNER SHIFT text wordmark.
 *
 * Letter-spacing is also applied after the last glyph, so the trailing
 * tracking is pulled back with a negative end margin to keep the visible
 * word flush with its container edges.
 */
export function Wordmark({className = '', ...rest}: WordmarkProps) {
  return (
    <span
      className={`inline-block font-inter text-wordmark font-normal uppercase tracking-wordmark me-[calc(-1*var(--tracking-wordmark))] ${className}`}
      {...rest}
    >
      Inner Shift
    </span>
  );
}
