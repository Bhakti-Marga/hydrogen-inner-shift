import {Container, Section, Wordmark, type SectionPadding} from '~/ui';

type NavLink = {label: string; href: string};

export type SiteFooterSectionProps = {
  links: NavLink[];
  copyright: string;
  padding?: SectionPadding;
  className?: string;
};

export function SiteFooterSection({
  links,
  copyright,
  padding = 'none',
  className,
}: SiteFooterSectionProps) {
  return (
    <Section as="footer" padding={padding} tone="white" className={className}>
      <Container
        size="narrow"
        className="flex flex-col gap-6 py-12 md:py-14 lg:flex-row lg:items-center lg:justify-between"
      >
        <a href="/" className="self-start whitespace-nowrap lg:self-auto">
          <Wordmark size="sm" />
        </a>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8.5">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7.5 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-fine text-ink/55 transition-colors duration-fast hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-fine text-ink/40">{copyright}</p>
        </div>
      </Container>
    </Section>
  );
}
