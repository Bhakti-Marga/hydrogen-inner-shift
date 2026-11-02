import {cva, type VariantProps} from 'class-variance-authority';

const sectionStyles = cva('w-full', {
  variants: {
    padding: {
      default: 'py-10 md:py-[100px]',
      none: 'py-0',
      'no-top': 'pt-0 pb-10 md:pb-[100px]',
      'no-bottom': 'pb-0 pt-10 md:pt-[100px]',
    },
    tone: {
      default: 'bg-transparent',
      abyss: 'bg-abyss text-white',
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
  return <Tag className={sectionStyles({padding, tone, className})} {...rest} />;
}
