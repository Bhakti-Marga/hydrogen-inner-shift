import {cva, type VariantProps} from 'class-variance-authority';

const sectionStyles = cva('w-full', {
  variants: {
    padding: {
      default: 'py-10 md:py-[100px]',
      snug: 'py-16 md:py-28',
      roomy: 'py-20 md:py-40',
      /** Follows a `roomy` section of the same tone: bottom padding only. */
      'roomy-bottom': 'pt-0 pb-20 md:pb-40',
      none: 'py-0',
      'no-top': 'pt-0 pb-10 md:pb-[100px]',
      'no-bottom': 'pb-0 pt-10 md:pt-[100px]',
    },
    tone: {
      default: 'bg-transparent',
      abyss: 'bg-abyss text-white',
      light: 'bg-cloud text-ink',
      white: 'bg-white text-ink',
      /** Charcoal field for the journey steps. */
      soot: 'bg-soot text-white',
      /** Pale field behind the immersion cards. */
      glacier: 'bg-glacier text-ink',
    },
  },
  defaultVariants: {
    padding: 'default',
    tone: 'default',
  },
});

type SectionElement = 'section' | 'header' | 'footer' | 'article' | 'div';

export type SectionPadding = NonNullable<
  VariantProps<typeof sectionStyles>['padding']
>;

type SectionProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionStyles> & {
    as?: SectionElement;
  };

export function Section({
  as: Tag = 'section',
  padding,
  tone,
  className,
  ...rest
}: SectionProps) {
  return (
    <Tag className={sectionStyles({padding, tone, className})} {...rest} />
  );
}
