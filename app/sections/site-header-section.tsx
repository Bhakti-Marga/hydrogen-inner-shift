import {useEffect, useId, useRef, useState} from 'react';
import {Button, Container, Section, Wordmark, type SectionPadding} from '~/ui';

type NavLink = {label: string; href: string; current?: boolean};

export type SiteHeaderSectionProps = {
  links: NavLink[];
  cta: NavLink;
  /** `overlay` sits on photography. `solid` is a white bar with ink type. */
  tone?: 'overlay' | 'solid';
  ctaTone?: 'light' | 'ember';
  menuLabel?: string;
  padding?: SectionPadding;
  className?: string;
};

export function SiteHeaderSection({
  links,
  cta,
  tone = 'overlay',
  ctaTone = 'light',
  menuLabel = 'Menu',
  padding = 'none',
  className,
}: SiteHeaderSectionProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const onPhoto = tone === 'overlay';

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)');
    const close = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', close);
    return () => desktop.removeEventListener('change', close);
  }, []);

  return (
    <Section
      as="header"
      padding={padding}
      tone={onPhoto ? 'default' : 'white'}
      className={`motion-safe:animate-fade-in${onPhoto ? ' text-white' : ''}${className ? ` ${className}` : ''}`}
    >
      <Container
        className={`relative flex items-center justify-between gap-6 ${onPhoto ? 'pt-4.5' : 'py-5'}`}
      >
        <a href="/" className="whitespace-nowrap">
          <Wordmark />
        </a>

        <div className="flex items-center gap-6 lg:gap-10">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-10 lg:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={link.current ? 'page' : undefined}
                className={`whitespace-nowrap text-body transition-opacity duration-fast hover:opacity-70${link.current ? ' border-b border-current' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:block">
            <Button href={cta.href} tone={ctaTone} size="sm">
              {cta.label}
            </Button>
          </div>
          <button
            type="button"
            aria-label={menuLabel}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            className="-m-2 p-2 transition-opacity duration-fast hover:opacity-70 lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>

      </Container>
      <MobileMenu
        id={menuId}
        label={menuLabel}
        open={menuOpen}
        ctaHref={cta.href}
        onClose={() => setMenuOpen(false)}
      />
    </Section>
  );
}

const MENU_ITEMS: MenuItem[] = [
  {
    index: '01',
    label: 'Programs',
    href: '/programs',
    image: '/images/menu/menu-programmes.jpg',
    featured: true,
    chips: [
      {label: 'The Full Journey', href: '/programs#programs'},
      {label: 'The Day Immersion', href: '/programs#day'},
    ],
  },
  {
    index: '02',
    label: 'Results',
    href: '/results',
    image: '/images/menu/menu-results.jpg',
  },
  {
    index: '03',
    label: 'Why Inner Shift',
    href: '/why',
    image: '/images/menu/menu-why.jpg',
  },
  {
    index: '04',
    label: 'Mission',
    href: '/mission',
    image: '/images/menu/menu-mission.jpg',
  },
  {
    index: '05',
    label: 'About us',
    href: '/about',
    image: '/images/menu/menu-results.jpg',
  },
];

type MenuItem = {
  index: string;
  label: string;
  href: string;
  image: string;
  featured?: boolean;
  chips?: {label: string; href: string}[];
};

function MobileMenu({
  id,
  label,
  open,
  ctaHref,
  onClose,
}: {
  id: string;
  label: string;
  open: boolean;
  ctaHref: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-label={label}
      onClose={onClose}
      className="menu-panel flex-col text-white opacity-0 transition-[opacity,display,overlay] transition-discrete duration-base ease-out-soft open:flex open:opacity-100 starting:open:opacity-0 motion-reduce:transition-none backdrop:bg-transparent"
    >
      <div className="flex items-center justify-between px-5 pt-4.5">
        <a href="/" className="py-2" onClick={onClose}>
          <Wordmark size="sm" />
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-10.5 place-items-center rounded-full border border-white/28 transition-colors duration-fast hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CloseIcon />
        </button>
      </div>

      <nav aria-label={label} className="min-h-0 flex-1 overflow-y-auto px-5 pt-11 pb-32">
        <ul className="flex flex-col gap-3">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <MenuCard item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute inset-x-0 bottom-0 bg-abyss px-6 pt-4 pb-8">
        <Button
          href={ctaHref}
          tone="ember"
          size="md"
          className="w-full font-semibold"
          onClick={onClose}
        >
          Book a discovery call →
        </Button>
      </div>
    </dialog>
  );
}

function MenuCard({item}: {item: MenuItem}) {
  const photo = (
    <img
      src={item.image}
      alt=""
      className="absolute inset-0 size-full object-cover"
    />
  );
  const shade = (
    <span className="absolute inset-0 bg-linear-to-r from-abyss/78 from-[8%] to-abyss/18 to-3/4" />
  );

  if (item.featured) {
    return (
      <div className="relative h-menu-feature overflow-hidden rounded-menu">
        {photo}
        {shade}
        <a
          href={item.href}
          className="absolute inset-0 flex items-end px-5.5 pb-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="flex items-baseline gap-2">
            <span className="text-menu-index font-medium text-white/55">
              {item.index}
            </span>
            <span className="text-menu-title font-medium">{item.label}</span>
          </span>
        </a>
        <span
          aria-hidden
          className="pointer-events-none absolute top-4 right-4 grid size-9.5 place-items-center rounded-full bg-white/16 text-body backdrop-blur-sm"
        >
          ↗
        </span>
        <div className="absolute bottom-5 left-5.5 flex gap-2">
          {item.chips?.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="inline-flex h-7 items-center rounded-full bg-white/16 px-3.5 text-menu-chip font-medium backdrop-blur-sm transition-colors duration-fast hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {chip.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className="relative flex h-menu-card items-center gap-2 overflow-hidden rounded-menu px-5.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {photo}
      {shade}
      <span className="relative text-menu-index font-medium text-white/55">
        {item.index}
      </span>
      <span className="relative text-menu-title font-medium">{item.label}</span>
      <span
        aria-hidden
        className="relative ml-auto grid size-9.5 shrink-0 place-items-center rounded-full bg-white/16 text-body backdrop-blur-sm"
      >
        ↗
      </span>
    </a>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="28.1624"
      height="14.5354"
      viewBox="0 0 28.1624 14.5354"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M27.7081 0.908463H0.454232C0.333762 0.908463 0.218226 0.860607 0.133041 0.775422C0.0478561 0.690237 0 0.574701 0 0.454232C0 0.333762 0.0478561 0.218226 0.133041 0.133041C0.218226 0.0478561 0.333762 0 0.454232 0H27.7081C27.8286 0 27.9441 0.0478561 28.0293 0.133041C28.1145 0.218226 28.1624 0.333762 28.1624 0.454232C28.1624 0.574701 28.1145 0.690237 28.0293 0.775422C27.9441 0.860607 27.8286 0.908463 27.7081 0.908463Z"
        fill="currentColor"
      />
      <path
        d="M27.7081 7.72193H0.454232C0.333762 7.72193 0.218226 7.67408 0.133041 7.58889C0.0478561 7.50371 0 7.38817 0 7.2677C0 7.14723 0.0478561 7.03169 0.133041 6.94651C0.218226 6.86132 0.333762 6.81347 0.454232 6.81347H27.7081C27.8286 6.81347 27.9441 6.86132 28.0293 6.94651C28.1145 7.03169 28.1624 7.14723 28.1624 7.2677C28.1624 7.38817 28.1145 7.50371 28.0293 7.58889C27.9441 7.67408 27.8286 7.72193 27.7081 7.72193Z"
        fill="currentColor"
      />
      <path
        d="M27.7081 14.5354H0.454232C0.333762 14.5354 0.218226 14.4875 0.133041 14.4024C0.0478561 14.3172 0 14.2016 0 14.0812C0 13.9607 0.0478561 13.8452 0.133041 13.76C0.218226 13.6748 0.333762 13.6269 0.454232 13.6269H27.7081C27.8286 13.6269 27.9441 13.6748 28.0293 13.76C28.1145 13.8452 28.1624 13.9607 28.1624 14.0812C28.1624 14.2016 28.1145 14.3172 28.0293 14.4024C27.9441 14.4875 27.8286 14.5354 27.7081 14.5354Z"
        fill="currentColor"
      />
    </svg>
  );
}
