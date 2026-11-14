import {useLocation} from 'react-router';
import {CONTACT_FORM_HREF} from '~/components/contact-form-modal';
import {SiteHeaderSection} from '~/sections/site-header-section';

const LINKS = [
  {label: 'Programs', href: '/programs'},
  {label: 'Mission', href: '/mission'},
  {label: 'About us', href: '/about'},
  {label: 'Why', href: '/why'},
  {label: 'Results', href: '/results'},
];

/** Photo pages float the header. The others are a white bar. */
const OVERLAY = new Set(['/', '/programs', '/about', '/results']);

/** Pages without this header (confirmation, 404) stay bare. */
const PAGES = new Set([
  '/',
  '/programs',
  '/mission',
  '/about',
  '/why',
  '/results',
]);

/**
 * One header for the whole visit. Rebuilding it per page made the links jump:
 * the bar padding and the consultation label differ between pages.
 */
export function SiteHeader() {
  const {pathname} = useLocation();
  if (!PAGES.has(pathname)) return null;

  const onPhoto = OVERLAY.has(pathname);

  return (
    <SiteHeaderSection
      tone={onPhoto ? 'overlay' : 'solid'}
      ctaTone={onPhoto ? 'light' : 'ember'}
      className={onPhoto ? 'absolute inset-x-0 top-0 z-10' : undefined}
      links={LINKS.map((link) => ({
        ...link,
        current: link.href === pathname,
      }))}
      cta={{
        label:
          pathname === '/mission' || pathname === '/programs'
            ? 'Start a conversation'
            : 'Book a consultation',
        href: CONTACT_FORM_HREF,
      }}
    />
  );
}
