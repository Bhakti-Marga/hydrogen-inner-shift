import {AvatarPill, Reveal, Section, type SectionPadding} from '~/ui';

export type WhyUnderneathSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  text: string;
  image: {src: string; alt: string; width: number; height: number};
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

/**
 * Full-width iceberg: the line about working underneath sits on the dark
 * water, with the ice itself kept to the right.
 */
export function WhyUnderneathSection({
  pill,
  heading,
  text,
  image,
  id,
  padding = 'none',
  className,
}: WhyUnderneathSectionProps) {
  return (
    <Section id={id} padding={padding} className={className}>
      <div className="relative mx-auto w-[calc(100%-24px)] max-w-355 overflow-hidden rounded-media">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative flex min-h-120 flex-col justify-end px-6 pt-24 pb-10 sm:px-12 lg:min-h-167 lg:px-20 lg:pt-48 lg:pb-28">
          <Reveal>
            <AvatarPill avatar={pill.avatar} tone="glass">
              {pill.text}
            </AvatarPill>
          </Reveal>
          <Reveal
            as="h2"
            order={1}
            className="mt-8 max-w-139 text-statement font-light text-white lg:text-statement-md"
          >
            {heading}
          </Reveal>
          <Reveal order={2}>
            <p className="mt-5 max-w-162 text-body-lg text-white">{text}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
