import {useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import {BhaktiHubPixel} from '~/components/bhakti-hub-pixel';
import {SiteHeader} from '~/components/site-header';
import favicon from '~/assets/brand/favicon.png';
import tailwindStyles from '~/styles/tailwind.css?url';

/**
 * The stylesheet is added in the Layout component to prevent a bug in
 * development HMR updates ("failed to execute 'insertBefore' on 'Node'").
 * https://github.com/remix-run/remix/issues/9242
 */
export function links() {
  return [
    {
      rel: 'preload',
      href: '/fonts/inter/inter-latin-wght-normal.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {rel: 'icon', type: 'image/png', href: favicon},
  ];
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0c182e" />
        <link rel="stylesheet" href={tailwindStyles}></link>
        <Meta />
        <Links />
      </head>
      <body className="bg-abyss text-white antialiased">
        {children}
        <ScrollRestoration nonce={nonce} />
        <BhaktiHubPixel />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <SiteHeader />
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <main className="flex min-h-svh flex-col items-start justify-center gap-4 px-6 xl:px-10">
      <p className="text-eyebrow font-medium uppercase text-mist">
        Error {errorStatus}
      </p>
      <h1 className="text-hero uppercase md:text-hero-md">
        Something went wrong
      </h1>
      {errorMessage && (
        <pre className="max-w-full overflow-x-auto font-mono text-sm text-mist">
          {errorMessage}
        </pre>
      )}
    </main>
  );
}
