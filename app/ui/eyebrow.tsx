type EyebrowProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'span';
  /** The surface the label sits on. */
  tone?: 'dark' | 'light' | 'ink' | 'bay' | 'ember';
};

const toneClasses = {
  dark: 'text-white/55',
  light: 'text-ink/45',
  ink: 'text-ink',
  bay: 'text-bay',
  ember: 'text-ember',
};

/** Small uppercase label above headings, cards and lists. */
export function Eyebrow({
  as: Tag = 'p',
  tone = 'dark',
  className = '',
  ...rest
}: EyebrowProps) {
  return (
    <Tag
      className={`block text-eyebrow font-medium uppercase ${toneClasses[tone]} ${className}`}
      {...rest}
    />
  );
}
