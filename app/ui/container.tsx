type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** `content` is 1320px (60px margins at 1440); `narrow` is 1264px (88px). */
  size?: 'content' | 'narrow';
};

const sizeClasses = {
  content: 'max-w-content',
  narrow: 'max-w-narrow',
};

/**
 * Centered content column.
 *
 * The gutter is an outside margin (`width: calc(100% - gutter)` + `mx-auto`),
 * not internal padding, so the Container's box is exactly the visible column:
 * 24px each side on small screens, 60px from `xl`, absorbed by the centering
 * margins once the viewport is wider than the column.
 */
export function Container({
  size = 'content',
  className = '',
  ...rest
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-[calc(100%-48px)] xl:w-[calc(100%-120px)] ${sizeClasses[size]} ${className}`}
      {...rest}
    />
  );
}
