import {Eyebrow, Section, Wordmark, type SectionPadding} from '~/ui';

type NotFoundLink = {label: string; href: string};

export type NotFoundSectionProps = {
  eyebrow: string;
  headline: string;
  intro: string;
  links: NotFoundLink[];
  image: {src: string; width: number; height: number};
  padding?: SectionPadding;
  className?: string;
};

/**
 * Full-viewport page for an unknown URL: a landscape, the wordmark, and
 * the main pages so the visitor can continue.
 */
export function NotFoundSection({
  eyebrow,
  headline,
  intro,
  links,
  image,
  padding = 'none',
  className,
}: NotFoundSectionProps) {
  return (
    <Section
      padding={padding}
      tone="abyss"
      className={`relative isolate flex min-h-svh flex-col overflow-hidden${className ? ` ${className}` : ''}`}
    >
      <img
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[center_62%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-[196deg] from-night/10 from-[26%] via-night/34 via-[58%] to-night/78"
      />

      <div className="flex justify-center pt-7">
        <a
          href="/"
          className="text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Wordmark />
        </a>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center md:pb-36">
        <div className="motion-safe:animate-fade-in">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-6 text-banner font-light motion-safe:animate-rise-in md:text-banner-md lg:text-banner-lg">
          {headline}
        </h1>
        <p className="mt-4.5 max-w-xl text-banner-lead font-light text-white/78 motion-safe:animate-rise-in md:text-banner-lead-md">
          {intro}
        </p>
        <nav
          aria-label="Where to go next"
          className="mt-16 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 motion-safe:animate-rise-in motion-safe:[animation-delay:var(--duration-slow)]"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-white/55 pb-0.5 text-program-body leading-tight transition-opacity duration-fast hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </Section>
  );
}
