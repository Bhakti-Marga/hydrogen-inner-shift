import {cva, type VariantProps} from 'class-variance-authority';

const buttonStyles = cva(
  'relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full transition-[background-color,color,scale] duration-base ease-out-soft active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none [&>svg]:transition-transform [&>svg]:duration-fast hover:[&>svg]:translate-x-1 focus-visible:[&>svg]:translate-x-1 motion-reduce:[&>svg]:transition-none',
  {
    variants: {
      tone: {
        ember: 'fill-rise bg-ember text-white before:bg-ember-deep',
        glass: 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
        light:
          'fill-rise bg-white text-ink before:bg-ember-deep hover:text-white focus-visible:text-white',
        /** Closing invitation on the about page. */
        cobalt: 'bg-cobalt text-white hover:bg-bay',
      },
      size: {
        /** Standalone closing CTA. */
        lg: 'h-15.75 px-13 text-list font-medium',
        md: 'h-14 px-10 text-body font-medium',
        /** `md` with a trailing icon: tighter sides, 10px gap. */
        'md-icon': 'h-14 gap-2.5 px-7.5 text-body font-medium',
        /** `md` with a trailing 41px arrow badge: 40px label inset, 7px badge inset. */
        'md-badge': 'h-14 gap-7.5 pr-1.75 pl-10 text-body font-medium',
        sm: 'h-10.5 px-5 text-body font-normal',
        /** Form submit on a white card: centred label, trailing arrow, 201px minimum. */
        form: 'h-13.25 min-w-50.25 gap-4.5 px-7.5 text-link font-bold focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2',
      },
    },
    defaultVariants: {
      tone: 'ember',
      size: 'md',
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonStyles>;

type ButtonAsLink = ButtonVariants &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {href: string};

type ButtonAsButton = ButtonVariants &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {href?: undefined};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Pill button. Renders an `<a>` when given `href`, otherwise a `<button>`. */
export function Button({
  tone,
  size,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonStyles({tone, size, className});

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ButtonAsLink)}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
